import { Box, Container, Link, Stack } from "@chakra-ui/layout";
import {
  Tbody,
  Td,
  Tr,
  Icon,
  Tooltip,
  Progress,
  Button,
} from "@chakra-ui/react";
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

  const { isLoading, error, data, refetch, isRefetching } = useQuery<
    GetPreviewURLData,
    ErrorData
  >(["PreviewURLData", router.query.url], () =>
    fetch(
      router.query.url
        ? `/api/get_preview_image/${encodeURIComponent(
            router.query.url as string
          )}?height=${document.documentElement.clientHeight}&width=${
            document.documentElement.clientWidth
          }`
        : ""
    ).then((res) => res.json())
  );

  console.log(isLoading, isRefetching);
  return (
    <Page>
      <AnimatePresence exitBeforeEnter>
        <Container maxW="3xl" h="full">
          {isLoading && !data && router.query.url ? (
            <Progress size="lg" isIndeterminate top="50%" />
          ) : error && !data && router.query.url ? (
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

                <Button
                  colorScheme="blue"
                  isLoading={isRefetching}
                  loadingText="Loading..."
                  onClick={
                    refetch as React.MouseEventHandler<HTMLButtonElement>
                  }
                >
                  Refresh
                </Button>

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
                      <Td>Site name</Td>
                      <Td>{data?.site_name}</Td>
                    </Tr>
                    <Tr>
                      <Td>Title</Td>
                      <Td>{data?.title}</Td>
                    </Tr>
                    <Tr>
                      <Td>Description</Td>
                      <Td>{data?.description}</Td>
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
                          h={{
                            base: handle.active
                              ? "full"
                              : document.documentElement.clientHeight,
                            md: handle.active
                              ? "full"
                              : document.documentElement.clientHeight / 2,
                          }}
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
