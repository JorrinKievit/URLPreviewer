import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Hero from "../components/Hero";
import Page from "../components/Page";

const Home: NextPage = () => {
  return (
    <Page>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="title"
          content="URLPreviewer - A simple way to preview a URL"
        />
        <meta name="description" content="A simple way to preview a URL" />
        <meta name="keywords" content="preview,url,easy,simple,peeker" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Jorrin Kievit" />
      </Head>

      <Hero />
    </Page>
  );
};

export default Home;
