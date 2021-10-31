import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React, { FC } from "react";

const ErrorAlert: FC = () => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Unknown error
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        An unknown error has occured, please return to the main page and try
        again.
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
