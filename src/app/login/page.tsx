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
`;

export default function LoginPage() {
  const helperText = "text.secondary";
  const mutedText = "text.muted";

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);


    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });


      if (result?.error) {
        setError("Email ou mot de passe invalide.");
        return;
      }

      router.push("/");
    } catch (submissionError) {
      setError("Une erreur inattendue est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleSubmitting(true);
    setError(null);

    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      setError("Erreur lors de la connexion Google. Veuillez réessayer.");
      setIsGoogleSubmitting(false);
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
            Connexion
          </Text>
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

            {/* Formulaire Credentials */}
            <form onSubmit={handleSubmit} noValidate>
              <VStack gap={6} align="stretch">
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
                bg="button.primary.bg"
                color="button.primary.text"
                size="lg"
                mt={4}
                loading={isSubmitting}
                loadingText="Connexion en cours"
                _hover={{
                  bg: "button.primary.hover",
                }}
              >
                Se connecter
              </Button>
            </form>

            {/* Séparateur */}
            <VStack gap={2}>
              <Box
                as="hr"
                borderColor="gray.200"
                _dark={{ borderColor: "gray.600" }}
              />
              <Text fontSize="sm" color={mutedText}>
                ou
              </Text>
              <Box
                as="hr"
                borderColor="gray.200"
                _dark={{ borderColor: "gray.600" }}
              />
            </VStack>

            {/* Bouton de connexion Google */}
            <Button
              onClick={handleGoogleSignIn}
              bg="white"
              color="gray.700"
              border="1px solid"
              borderColor="gray.300"
              size="lg"
              loading={isGoogleSubmitting}
              loadingText="Connexion Google en cours"
              _hover={{
                bg: "gray.50",
                borderColor: "gray.400",
              }}
              _dark={{
                bg: "gray.800",
                color: "white",
                borderColor: "gray.600",
                _hover: {
                  bg: "gray.700",
                  borderColor: "gray.500",
                },
              }}
            >
              Se connecter avec Google
            </Button>

            <VStack gap={2} textAlign="center">
              <Text fontSize="sm" color={mutedText}>
                Pas encore de compte ?
              </Text>
              <ChakraLink
                as={NextLink}
                href="/register"
                color="blue.500"
                _hover={{ color: "blue.600" }}
                _dark={{ color: "blue.300", _hover: { color: "blue.200" } }}
              >
                Créer un compte
              </ChakraLink>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
