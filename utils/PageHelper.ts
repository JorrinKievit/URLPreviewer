import { useRouter } from "next/dist/client/router";

export const PAGE_DATA: IPAGE_DATA = {
  "/result": {
    title: "Result",
  },
  "/result/[url]": {
    title: "Result",
  },
  default: {
    title: "",
  },
};

export interface PageData {
  title: string;
}
export interface IPAGE_DATA {
  [x: string]: PageData;
}
export default PAGE_DATA;

export const GetPageData = (): PageData => {
  const { pathname } = useRouter();
  return PAGE_DATA[pathname as keyof typeof PAGE_DATA] ?? PAGE_DATA["default"];
};
