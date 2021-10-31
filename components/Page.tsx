import { motion } from "framer-motion";
import Head from "next/head";
import React from "react";
import { APP_TITLE } from "../lib/constants";
import { GetPageData } from "../utils/PageHelper";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Page: React.FC = ({ children }) => {
  const data = GetPageData();

  return (
    <>
      <Head>
        <title>
          {`${APP_TITLE}`}
          {data?.title && ` | ${data.title}`}
        </title>
      </Head>
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
      >
        {children}
      </motion.main>
    </>
  );
};

export default Page;
