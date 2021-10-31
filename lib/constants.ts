import { HeadingProps, Heading, TableProps, Table } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FullScreenProps, FullScreen } from "react-full-screen";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
