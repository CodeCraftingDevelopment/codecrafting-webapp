"use client";

import { Box, Button, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import NextLink from "next/link";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export default function NotFound() {
  return (
    <Box
      as="main"
      minH="70vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      gap={6}
      px={4}
      animation={`${fadeIn} 0.5s ease-out`}
    >
      <Heading
        size="2xl"
        bgGradient="linear(to-r, red.400, orange.500)"
        bgClip="text"
      >
        Page introuvable
      </Heading>
      <Text fontSize="lg" maxW="lg">
        La page que vous cherchez n&apos;existe pas ou a été déplacée. Vérifiez l&apos;adresse ou revenez à
        l&apos;accueil pour continuer votre navigation.
      </Text>
      <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
        <Button colorScheme="blue" size="md">
          Retour à l&apos;accueil
        </Button>
      </ChakraLink>
    </Box>
  );
}
