"use client";

import { FormEvent, useState } from "react";
import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Field } from "@chakra-ui/react/field";
import { Heading } from "@chakra-ui/react/heading";
import { Input } from "@chakra-ui/react/input";
import { Text } from "@chakra-ui/react/text";
import { VStack } from "@chakra-ui/react/stack";
import { Link as ChakraLink } from "@chakra-ui/react/link";
import { AlertDescription, AlertRoot } from "@chakra-ui/react/alert";
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

export default function LoginPage() {
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
    <Box
      as="main"
      mx="auto"
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 8 }}
      animation={`${fadeInUp} 0.6s ease-out`}
    >
      <form onSubmit={handleSubmit} noValidate>
        <VStack gap={6} align="stretch">
          <Heading
            as="h1"
            size="xl"
            textAlign="center"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            Connexion
          </Heading>
          <Text fontSize="md" textAlign="center" color="gray.600" _dark={{ color: "gray.300" }}>
            Accède à ton espace en renseignant ton email et ton mot de passe.
          </Text>

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

          <Text fontSize="sm" textAlign="center" color="gray.500" _dark={{ color: "gray.400" }}>
            Pas encore de compte ? Contacte-nous pour activer ton accès.
          </Text>

          <ChakraLink
            as={NextLink}
            href="/"
            textAlign="center"
            color="blue.500"
            _hover={{ color: "blue.600" }}
          >
            Retour à l&apos;accueil
          </ChakraLink>
        </VStack>
      </form>
    </Box>
  );
}
