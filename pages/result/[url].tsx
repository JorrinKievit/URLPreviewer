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
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import Page from "../../components/Page";
import ErrorAlert from "../../components/ErrorAlert";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";

const ResultPage: NextPage = () => {
  const router = useRouter();
  const handle = useFullScreenHandle();

  const toggleFullScreen = () => {
    handle.active ? handle.exit() : handle.enter();
  };

  const { isLoading, error, data } = useQuery<GetPreviewURLData, ErrorData>(
    "PreviewURLData",
    ({ signal }) =>
      axios.get(
        router.query.url
          ? `/api/get_preview_image/${encodeURIComponent(
              router.query.url as string
            )}`
          : "",
        {
          signal,
        }
      )
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
                      <Box
                        position="relative"
                        w="full"
                        h={
                          handle.active
                            ? "full"
                            : { base: 220, sm: 350, md: 400 }
                        }
                      >
                        <Image
                          src={`data:image/png;base64,${data?.image}`}
                          alt="image"
                          layout="fill"
                        />
                        <Icon
                          as={
                            handle.active
                              ? AiOutlineFullscreenExit
                              : AiOutlineFullscreen
                          }
                          right="0"
                          top="0"
                          position="absolute"
                          w={10}
                          h={10}
                          mr={2}
                          mt={2}
                          onClick={toggleFullScreen}
                          color="blue.500"
                        />
                      </Box>
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
