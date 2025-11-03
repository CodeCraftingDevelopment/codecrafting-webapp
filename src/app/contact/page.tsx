import { Box, Heading, Text, VStack, Link as ChakraLink, Button } from "@chakra-ui/react";
import NextLink from "next/link";

export default function ContactPage() {
  return (
    <Box
      as="main"
      maxW="4xl"
      mx="auto"
      py={16}
      px={{ base: 4, md: 8 }}
    >
      <VStack gap={8} align="stretch">
        <Heading as="h1" size="2xl">
          Contact
        </Heading>
        <Text fontSize="lg">
          Vous pouvez nous joindre à tout moment pour discuter de vos projets, poser des questions ou demander un
          devis. Nous vous répondrons dans les plus brefs délais.
        </Text>
        <VStack gap={4} align="stretch">
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Email
            </Heading>
            <ChakraLink href="mailto:contact@codecrafting.dev" color="blue.500">
              contact@codecrafting.dev
            </ChakraLink>
          </Box>
          <Box>
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
