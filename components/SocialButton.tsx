import React from "react";
import { IconButton, IconButtonProps, Link } from "@chakra-ui/react";

interface SocialButtonProps {
  href: string;
}

const SocialButton = ({
  icon,
  href,
  "aria-label": ariaLabel,
  colorScheme,
}: IconButtonProps & SocialButtonProps) => {
  return (
    <IconButton
      icon={icon}
      colorScheme={colorScheme}
      size="lg"
      aria-label={ariaLabel}
      fontSize="lg"
      rounded="full"
      cursor="pointer"
      as={Link}
      href={href}
      alignItems="center"
      justifyContent="center"
      isExternal
      _hover={{
        opacity: "0.8",
      }}
      {...(!colorScheme && { bg: "blackAlpha.300" })}
    />
  );
};

export default SocialButton;
