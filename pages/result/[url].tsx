import { Box, Container, Link, Stack } from "@chakra-ui/layout";
import { Tbody, Td, Tr, Icon, Tooltip, Progress } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React from "react";
import {
  itemVariants,
  MotionBox,
  MotionHeading,
  MotionTable,
  variants,
} from "../../lib/constants";
import {
  ErrorData,
  GetPreviewImageData as GetPreviewURLData,
} from "../../lib/types";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Page from "../../components/Page";
import ErrorAlert from "../../components/ErrorAlert";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";

const ResultPage: NextPage = () => {
  const router = useRouter();
  const handle = useFullScreenHandle();

  const toggleFullScreen = () => {
    handle.active ? handle.exit() : handle.enter();
  };

  const { isLoading, error, data } = useQuery<GetPreviewURLData, ErrorData>(
    "PreviewURLData",
    () =>
      fetch(
        router.query.url
          ? `/api/get_preview_image/${encodeURIComponent(
              router.query.url as string
            )}`
          : ""
      ).then((res) => res.json())
  );

  return (
    <Page>
      <AnimatePresence exitBeforeEnter>
        <Container maxW="3xl" h="full">
          {isLoading ? (
            <Progress size="lg" isIndeterminate top="50%" />
          ) : error ? (
            <ErrorAlert />
          ) : (
            <motion.div
              key="results"
              initial="hidden"
              animate="show"
              variants={variants}
            >
              <Stack spacing={6} my={4} h="full">
                <MotionHeading variants={itemVariants}>
                  Results for{" "}
                  <Link
                    color="blue.400"
                    isExternal
                    href={router.query.url ? (router.query.url as string) : "#"}
                  >
                    {router.query.url}
                  </Link>
                </MotionHeading>

                <MotionTable variant="simple" variants={itemVariants}>
                  <Tbody>
                    <Tr>
                      <Td>Full URL</Td>
                      <Td>
                        <Link
                          color="blue.400"
                          isExternal
                          href={
                            router.query.url
                              ? (router.query.url as string)
                              : "#"
                          }
                        >
                          {data?.url}
                        </Link>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Title of page</Td>
                      <Td>{data?.title ? data?.title : "N/A"}</Td>
                    </Tr>
                  </Tbody>
                </MotionTable>

                {data?.image && (
                  <MotionBox variants={itemVariants}>
                    <FullScreen handle={handle}>
                      <Tooltip
                        label="Click to view the image in fullscreen!"
                        hasArrow
                      >
                        <Box
                          position="relative"
                          w="full"
                          h={
                            handle.active
                              ? "full"
                              : { base: 220, sm: 350, md: 400 }
                          }
                          onClick={toggleFullScreen}
                        >
                          <Image
                            src={`data:image/png;base64,${data?.image}`}
                            alt="image"
                            layout="fill"
                          />
                        </Box>
                      </Tooltip>
                    </FullScreen>
                  </MotionBox>
                )}
              </Stack>
            </motion.div>
          )}
        </Container>
      </AnimatePresence>
    </Page>
  );
};

export default ResultPage;
