"use client";

import { Box, Heading, Text, VStack, Link as ChakraLink, Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import NextLink from "next/link";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function ContactPage() {
  return (
    <Box
      as="main"
      maxW="4xl"
      mx="auto"
      py={16}
      px={{ base: 4, md: 8 }}
      animation={`${fadeInUp} 0.6s ease-out`}
    >
      <VStack gap={8} align="stretch">
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          Contact
        </Heading>
        <Text fontSize="lg">
          Vous pouvez nous joindre à tout moment pour discuter de vos projets, poser des questions ou demander un
          devis. Nous vous répondrons dans les plus brefs délais.
        </Text>
        <VStack gap={4} align="stretch">
          <Box
            p={6}
            borderRadius="xl"
            bg="whiteAlpha.700"
            _dark={{ bg: "blackAlpha.500", borderColor: "blue.800" }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="blue.100"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <Heading as="h2" size="md" mb={2}>
              Email
            </Heading>
            <ChakraLink
              href="mailto:contact@codecrafting.dev"
              color="blue.500"
              _hover={{ color: "blue.600" }}
            >
              contact@codecrafting.dev
            </ChakraLink>
          </Box>
          <Box
            p={6}
            borderRadius="xl"
            bg="whiteAlpha.700"
            _dark={{ bg: "blackAlpha.500", borderColor: "blue.800" }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="blue.100"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <Heading as="h2" size="md" mb={2}>
              Téléphone
            </Heading>
            <Text>+33 1 23 45 67 89</Text>
          </Box>
        </VStack>
        <Box>
          <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
            <Button colorScheme="blue">Retour à l&apos;accueil</Button>
          </ChakraLink>
        </Box>
      </VStack>
    </Box>
  );
}
