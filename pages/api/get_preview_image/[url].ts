import chromium from "chrome-aws-lambda";

const handler = async (req: any, res: any) => {
  const { url } = req.query;
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url as string, { waitUntil: "networkidle2" });
    const title = await page.title();
    const pageURL = page.url();

    const image: Buffer = (await page.screenshot({ type: "png" })) as Buffer;
    const b64Image = image.toString("base64");

    res.status(200).json({ image: b64Image, title: title, url: pageURL });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    if (browser !== null) await browser.close();
  }
};

export default handler;
