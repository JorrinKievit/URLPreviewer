import { HeadingProps, Heading, TableProps, Table } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FullScreenProps, FullScreen } from "react-full-screen";

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.message = await res.json();
    throw error;
  }

  return res.json();
};

export const variants = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export const MotionHeading = motion<HeadingProps>(Heading);
export const MotionTable = motion<TableProps>(Table);
export const MotionFullscreen = motion<FullScreenProps & any>(FullScreen);

export const APP_TITLE = "URLPreviewer - A simple way to preview a URL";
