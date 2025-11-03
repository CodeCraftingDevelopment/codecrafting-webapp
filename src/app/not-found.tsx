import { Box, Button, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

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
    >
      <Heading size="2xl">Page introuvable</Heading>
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
