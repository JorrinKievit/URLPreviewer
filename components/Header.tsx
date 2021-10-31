import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Container, Flex, Text, Link, Heading } from "@chakra-ui/layout";
import React, { FC } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import NextLink from "next/link";

const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      as={Flex}
      maxW={"6xl"}
      py={4}
      spacing={4}
      justify="space-between"
      align="center"
    >
      <NextLink href="/" scroll={false} passHref>
        <Link _hover={{ textDecoration: "none" }}>
          <Flex>
            <Heading color="blue.400">URL</Heading>
            <Heading>Previewer</Heading>
          </Flex>
        </Link>
      </NextLink>
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        aria-label="themeToggle"
      />
    </Container>
  );
};

export default Header;
