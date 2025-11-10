"use client";

import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useRequireAuth } from "@/lib/auth/hooks";

/**
 * Exemple de composant client protégé
 * 
 * Ce composant utilise le hook useRequireAuth() pour vérifier l'authentification.
 * Si l'utilisateur n'est pas authentifié, il sera automatiquement redirigé vers /login.
 * 
 * Pour utiliser ce composant:
 * 1. Renommez ce fichier en supprimant ".example"
 * 2. Importez-le dans votre page: import ProtectedComponent from "@/components/auth/ProtectedComponent"
 * 3. Utilisez-le: <ProtectedComponent />
 */
export default function ProtectedComponent() {
  const { session, status } = useRequireAuth();

  // Affichage pendant le chargement
  if (status === "loading") {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>Vérification de l'authentification...</Text>
      </Box>
    );
  }

  // Si pas de session (ne devrait pas arriver car useRequireAuth redirige)
  if (!session) {
    return null;
  }

  // Contenu protégé
  return (
    <VStack gap={4} align="stretch">
      <Heading size="lg">Composant protégé</Heading>
      
      <Box
        p={6}
        borderRadius="lg"
        border="1px solid"
        borderColor="blue.200"
        bg="blue.50"
        _dark={{
          bg: "blue.900",
          borderColor: "blue.700",
        }}
      >
        <Text fontWeight="bold" mb={2}>
          Informations utilisateur:
        </Text>
        <VStack align="start" gap={2}>
          <Text>Nom: {session.user.name}</Text>
          <Text>Email: {session.user.email}</Text>
          <Text>Rôle: {session.user.role}</Text>
        </VStack>
      </Box>

      <Box
        p={4}
        borderRadius="md"
        bg="green.50"
        _dark={{ bg: "green.900" }}
      >
        <Text fontSize="sm">
          ✅ Ce composant est uniquement visible par les utilisateurs authentifiés.
        </Text>
      </Box>
    </VStack>
  );
}
