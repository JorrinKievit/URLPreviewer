// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import { GetPreviewImageData } from "../../../lib/types";

type ErrorData = {
  error: unknown;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetPreviewImageData | ErrorData>
) => {
  const { url } = req.query;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url as string, { waitUntil: "networkidle2" });
    const title = await page.title();
    const pageURL = page.url();

    const image: Buffer = (await page.screenshot({ type: "png" })) as Buffer;
    const b64Image = image.toString("base64");
    await browser.close();

    res.status(200).json({ image: b64Image, title: title, url: pageURL });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default handler;
