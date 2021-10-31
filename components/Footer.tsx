import React, { FC, ReactNode } from "react";
import { Box, Container, Stack, Text } from "@chakra-ui/react";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import SocialButton from "./SocialButton";

const Footer: FC = () => {
  const fullYear = new Date().getFullYear();
  return (
    <Box borderTop="1px solid black">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", sm: "row" }}
        spacing={4}
        justify={{ base: "center", sm: "space-between" }}
        align={{ base: "center", sm: "center" }}
      >
        <Text>© {fullYear}. Made by Jorrin Kievit</Text>
        <Stack direction="row" spacing={6}>
          <SocialButton
            aria-label="Github"
            href="https://github.com/JorrinKievit"
            icon={<FaGithub />}
          />
          <SocialButton
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/JorrinKievit/"
            icon={<FaLinkedin />}
            colorScheme="linkedin"
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
