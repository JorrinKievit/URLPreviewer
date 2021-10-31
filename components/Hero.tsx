import { Container, Stack, Box, Heading } from "@chakra-ui/layout";
import {
  Input,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { ChangeEvent, FC, useState } from "react";

interface FormValues {
  url: string;
}

const Hero: FC = () => {
  const router = useRouter();

  const initialValues: FormValues = { url: "" };

  const validateURL = (value: FormValues) => (!value ? "URL is required!" : "");

  const handleSubmit = (
    values: FormValues,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    actions.setSubmitting(false);
    router.push(`/result/${encodeURIComponent(values.url)}`);
  };

  return (
    <Container maxW="3xl">
      <Stack
        as={Box}
        textAlign="center"
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight="110%"
        >
          Preview any{" "}
          <Text as="span" color="blue.400">
            URL
          </Text>
        </Heading>
        <Text color="gray.500">
          Tired of getting rick rolled? Don&apos;t trust your friends sending
          these sketchy links? Get a free preview of the website by pasting the
          URL in the bar below!
        </Text>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(props) => (
            <Form>
              <Stack
                direction="column"
                spacing={3}
                align="center"
                alignSelf="center"
                position="relative"
                width="full"
              >
                <Field name="url" validate={validateURL}>
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl
                      id="url"
                      isInvalid={form.errors.url && form.touched.url}
                    >
                      <Input
                        {...field}
                        placeholder="https://bit.ly/3pXdbFL"
                        size="lg"
                        type="url"
                      />
                      <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  colorScheme="blue"
                  rounded="full"
                  size="lg"
                  type="submit"
                  isLoading={props.isSubmitting}
                >
                  Preview
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
};

export default Hero;
