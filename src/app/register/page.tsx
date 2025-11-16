"use client";

import { Box } from "@chakra-ui/react";
import { AlertDescription, AlertRoot } from "@chakra-ui/react/alert";
import { Button } from "@chakra-ui/react/button";
import { Container } from "@chakra-ui/react/container";
import { Field } from "@chakra-ui/react/field";
import { Input } from "@chakra-ui/react/input";
import { Link as ChakraLink } from "@chakra-ui/react/link";
import { VStack } from "@chakra-ui/react/stack";
import { Text } from "@chakra-ui/react/text";
import { keyframes } from "@emotion/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { type FormEvent, useState } from "react";

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

export default function RegisterPage() {
  const helperText = "text.secondary";
  const mutedText = "text.muted";

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): string | null => {
    if (!name.trim()) {
      return "Le nom est requis.";
    }

    if (!email.trim()) {
      return "L'email est requis.";
    }

    if (!password) {
      return "Le mot de passe est requis.";
    }

    if (password.length < 6) {
      return "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (password !== confirmPassword) {
      return "Les mots de passe ne correspondent pas.";
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Veuillez entrer une adresse email valide.";
    }

    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Appel à l'API d'inscription
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || "Une erreur est survenue lors de l'inscription.",
        );
        return;
      }

      // Inscription réussie, on connecte automatiquement l'utilisateur
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          "Inscription réussie mais erreur lors de la connexion automatique. Veuillez vous connecter manuellement.",
        );
        return;
      }

      router.push("/");
    } catch (submissionError) {
      console.error("Erreur lors de la soumission:", submissionError);
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
          <Text
            fontWeight="bold"
            fontSize={{ base: "xl", md: "2xl" }}
            textAlign="center"
          >
            Inscription
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} color={helperText}>
            Crée ton compte pour accéder à toutes les fonctionnalités de
            CodeCrafting.
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
          borderColor="card.border"
          bg="card.bg"
          _dark={{
            bg: "card.bg",
            borderColor: "card.border",
            boxShadow: "xl",
          }}
          boxShadow="2xl"
          backdropFilter="blur(18px)"
          transition="all 0.3s ease"
          _hover={{ transform: "translateY(-2px)", boxShadow: "3xl" }}
        >
          <VStack gap={6} align="stretch">
            {error && (
              <AlertRoot status="error" borderRadius="md">
                <AlertDescription>{error}</AlertDescription>
              </AlertRoot>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <VStack gap={6} align="stretch">
                <Field.Root>
                  <Field.Label htmlFor="name" fontWeight="medium" mb={1}>
                    Nom
                  </Field.Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Jean Dupont"
                    autoComplete="name"
                    required
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label htmlFor="email" fontWeight="medium" mb={1}>
                    Email
                  </Field.Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="jean@exemple.com"
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
                    autoComplete="new-password"
                    required
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label
                    htmlFor="confirmPassword"
                    fontWeight="medium"
                    mb={1}
                  >
                    Confirmer le mot de passe
                  </Field.Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="********"
                    autoComplete="new-password"
                    required
                  />
                </Field.Root>
              </VStack>

              <Button
                type="submit"
                bg="button.primary.bg"
                color="button.primary.text"
                size="lg"
                mt={4}
                loading={isSubmitting}
                loadingText="Inscription en cours"
                _hover={{
                  bg: "button.primary.hover",
                }}
              >
                S'inscrire
              </Button>
            </form>

            <VStack gap={2} textAlign="center">
              <Text fontSize="sm" color={mutedText}>
                Déjà un compte ?
              </Text>
              <ChakraLink
                as={NextLink}
                href="/login"
                color="blue.500"
                _hover={{ color: "blue.600" }}
                _dark={{ color: "blue.300", _hover: { color: "blue.200" } }}
              >
                Se connecter
              </ChakraLink>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
