// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorData, GetPreviewImageData } from "../../../lib/types";
import chromium from "chrome-aws-lambda";
import { parser } from "html-metadata-parser";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetPreviewImageData | ErrorData>
) => {
  const { height, width, url } = req.query;
  let browser = null;

  const extraArgs = [
    "--disable-setuid-sandbox",
    "--ignore-certificate-errors",
    '--proxy-server="direct://"',
    "--proxy-bypass-list=*",
  ];

  const args = chromium.args.concat(extraArgs);

  try {
    browser = await chromium.puppeteer.launch({
      args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    );
    page.setViewport({
      width: parseInt(width as string),
      height: parseInt(height as string),
    });
    await page.goto(url as string);

    const image: Buffer = (await page.screenshot({ type: "png" })) as Buffer;
    const b64Image = image.toString("base64");

    const metaData = await parser(url as string);
    const metaObject = {
      title:
        (metaData.meta?.title ? metaData.meta.title : metaData.og?.title) ??
        "Not set by requested page",
      description:
        (metaData.meta?.description
          ? metaData.meta.description
          : metaData.og?.description) ?? "Not set by requested page",
      url:
        (metaData.meta?.url ? metaData.meta?.url : metaData.og?.url) ??
        (url as string),
      site_name: metaData.og?.site_name ?? "Not set by requested page",
    };

    res.status(200).json({
      image: b64Image,
      title: metaObject.title,
      description: metaObject.description,
      url: metaObject.url,
      site_name: metaObject.site_name,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    if (!browser !== null) await browser?.close();
  }
};

export default handler;
