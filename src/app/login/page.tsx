"use client";

import { FormEvent, useState } from "react";
import { Button } from "@chakra-ui/react/button";
import { Field } from "@chakra-ui/react/field";
import { Heading } from "@chakra-ui/react/heading";
import { Input } from "@chakra-ui/react/input";
import { Text } from "@chakra-ui/react/text";
import { VStack } from "@chakra-ui/react/stack";
import { Link as ChakraLink } from "@chakra-ui/react/link";
import { Container } from "@chakra-ui/react/container";
import { useColorModeValue } from "@/components/ui/color-mode";
import { AlertDescription, AlertRoot } from "@chakra-ui/react/alert";
import { keyframes } from "@emotion/react";
import NextLink from "next/link";
import {Box} from "@chakra-ui/react";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
`;

export default function LoginPage() {
  const cardBg = useColorModeValue("whiteAlpha.800", "blackAlpha.500");
  const cardBorder = useColorModeValue("blue.100", "blue.800");
  const helperText = useColorModeValue("gray.600", "gray.300");
  const mutedText = useColorModeValue("gray.500", "gray.400");
  const linkColor = useColorModeValue("blue.500", "blue.300");
  const linkHover = useColorModeValue("blue.600", "blue.200");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: appeler ici votre API d'authentification.
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (submissionError) {
      setError("Une erreur inattendue est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      as="main"
      maxW="4xl"
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 8 }}
    >
      <VStack gap={10} align="stretch" animation={`${fadeInUp} 0.6s ease-out`}>
        <VStack gap={3} textAlign="center" maxW="2xl" mx="auto">
          <Heading
            as="h1"
            size={{ base: "2xl", md: "3xl" }}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            Connexion
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={helperText}>
            Accède à ton espace en renseignant ton email et ton mot de passe.
          </Text>
        </VStack>

        <Box
          w="full"
          maxW="md"
          mx="auto"
          px={{ base: 6, md: 8 }}
          py={{ base: 8, md: 10 }}
          borderRadius="2xl"
          border="1px solid"
          borderColor={cardBorder}
          bg={cardBg}
          boxShadow="2xl"
          backdropFilter="blur(18px)"
          transition="all 0.3s ease"
          _hover={{ transform: "translateY(-2px)", boxShadow: "3xl" }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <VStack gap={6} align="stretch">
              {error && (
                <AlertRoot status="error" borderRadius="md">
                  <AlertDescription>{error}</AlertDescription>
                </AlertRoot>
              )}

              <VStack gap={4} align="stretch">
                <Field.Root>
                  <Field.Label htmlFor="email" fontWeight="medium" mb={1}>
                    Email
                  </Field.Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="tu@exemple.com"
                    autoComplete="email"
                    required
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label htmlFor="password" fontWeight="medium" mb={1}>
                    Mot de passe
                  </Field.Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="********"
                    autoComplete="current-password"
                    required
                  />
                </Field.Root>
              </VStack>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                loading={isSubmitting}
                loadingText="Connexion en cours"
              >
                Se connecter
              </Button>

              <VStack gap={2} textAlign="center">
                <Text fontSize="sm" color={mutedText}>
                  Pas encore de compte ? Contacte-nous pour activer ton accès.
                </Text>
                <ChakraLink
                  as={NextLink}
                  href="/"
                  color={linkColor}
                  _hover={{ color: linkHover }}
                >
                  Retour à l&apos;accueil
                </ChakraLink>
              </VStack>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}
