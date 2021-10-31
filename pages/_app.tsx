import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/constants";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} resetCSS>
        <header>
          <Header />
        </header>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component
            {...pageProps}
            canonical={router.route}
            key={router.route}
          />
        </AnimatePresence>
        <footer>
          <Footer />
        </footer>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

export { getServerSideProps } from "../components/Chakra";
