// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorData, GetPreviewImageData } from "../../../lib/types";
import Pageres from "pageres";
import { parser } from "html-metadata-parser";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetPreviewImageData | ErrorData | any>
) => {
  console.log(req.query);
  const { height, width, url } = req.query;

  let base64Image = "";

  // try {
  await new Pageres({ delay: 2 })
    .src(url as string, [`${width}x${height}`], { crop: true })
    .run()
    .then((stream) => {
      base64Image = stream[0].toString("base64");
    });

  const metaData = await parser(url as string);

  const metaObject = {
    title:
      (metaData.meta?.title ? metaData.meta.title : metaData.og?.title) ??
      "Not set by requested page",
    description:
      (metaData.meta?.description
        ? metaData.meta.description
        : metaData.og?.description) ?? "Not set by requested page",
    url: (metaData.meta?.url ? metaData.meta?.url : metaData.og?.url) ?? url,
    site_name: metaData.og?.site_name ?? "Not set by requested page",
  };

  res.status(200).json({
    image: base64Image,
    title: metaObject.title,
    description: metaObject.description,
    url: metaObject.url,
    site_name: metaObject.site_name,
  });
  // } catch (error) {
  // res.status(500).json({ error });
  // }
};

export default handler;
