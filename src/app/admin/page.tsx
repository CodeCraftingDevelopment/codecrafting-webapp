import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { requireAdmin } from "@/lib/auth/guards";

/**
 * Page Admin - Exemple de page protégée par rôle
 * Accessible uniquement aux utilisateurs avec le rôle "admin"
 */
export default async function AdminPage() {
  // Vérifie l'authentification ET le rôle admin
  // Redirige vers /login si non authentifié
  // Redirige vers / si authentifié mais pas admin
  const session = await requireAdmin();

  return (
    <Container maxW="4xl" py={16}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading size="2xl" mb={4}>
            🔐 Administration
          </Heading>
          <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }}>
            Espace réservé aux administrateurs
          </Text>
        </Box>

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
          <VStack gap={4} align="start">
            <Heading size="lg">Bienvenue, {session.user.name}</Heading>

            <Text>Vous êtes connecté en tant qu&apos;administrateur.</Text>

            <Box mt={4}>
              <Text fontWeight="bold" mb={2}>
                Fonctionnalités admin disponibles:
              </Text>
              <VStack align="start" gap={2} pl={4}>
                <Text>• Gestion des utilisateurs</Text>
                <Text>• Configuration du système</Text>
                <Text>• Accès aux statistiques</Text>
                <Text>• Modération du contenu</Text>
              </VStack>
            </Box>
          </VStack>
        </Box>

        <Box p={6} borderRadius="lg" bg="blue.50" _dark={{ bg: "blue.900" }}>
          <Text fontSize="sm" color="blue.800" _dark={{ color: "blue.200" }}>
            💡 <strong>Note:</strong> Cette page utilise la fonction{" "}
            <code>requireAdmin()</code> pour vérifier automatiquement
            l&apos;authentification et le rôle admin.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
