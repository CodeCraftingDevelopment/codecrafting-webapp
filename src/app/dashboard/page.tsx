import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { requireAuth } from "@/lib/auth/guards";

/**
 * Page Dashboard - Exemple de page protégée
 * Accessible uniquement aux utilisateurs authentifiés
 */
export default async function DashboardPage() {
  // Vérifie l'authentification et redirige vers /login si nécessaire
  const session = await requireAuth();

  return (
    <Container maxW="4xl" py={16}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading size="2xl" mb={4}>
            Dashboard
          </Heading>
          <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }}>
            Bienvenue sur votre espace personnel
          </Text>
        </Box>

        <Box
          p={8}
          borderRadius="xl"
          border="1px solid"
          borderColor="blue.100"
          bg="whiteAlpha.800"
          _dark={{
            bg: "blackAlpha.500",
            borderColor: "blue.800",
          }}
        >
          <VStack gap={4} align="start">
            <Heading size="lg">Informations de session</Heading>

            <Box>
              <Text fontWeight="bold">Nom:</Text>
              <Text>{session.user.name}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Email:</Text>
              <Text>{session.user.email}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Rôle:</Text>
              <Text textTransform="capitalize">{session.user.role}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">ID:</Text>
              <Text fontFamily="mono" fontSize="sm">
                {session.user.id}
              </Text>
            </Box>
          </VStack>
        </Box>

        {session.user.role === "admin" && (
          <Box
            p={8}
            borderRadius="xl"
            border="1px solid"
            borderColor="purple.100"
            bg="purple.50"
            _dark={{
              bg: "purple.900",
              borderColor: "purple.700",
            }}
          >
            <Heading size="md" mb={2}>
              🔐 Accès Admin
            </Heading>
            <Text>
              Vous avez accès aux fonctionnalités d&apos;administration.
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
}
