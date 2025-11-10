"use client";

import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

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

export default function LegalPage() {
  return (
    <Container maxW="4xl" py={{ base: 16, md: 24 }}>
      <VStack gap={6} align="stretch" animation={`${fadeInUp} 0.6s ease-out`}>
        <Heading
          as="h1"
          size={{ base: "xl", md: "2xl" }}
          bgGradient="linear(to-r, orange.400, red.500)"
          bgClip="text"
        >
          Mentions Légales
        </Heading>

        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </Text>

        <Box
          p={6}
          borderRadius="xl"
          bg="whiteAlpha.700"
          _dark={{ bg: "blackAlpha.500", borderColor: "orange.800" }}
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="orange.100"
        >
          <VStack gap={4} align="stretch">
            <Box>
              <Heading as="h2" size="md" mb={2}>
                Éditeur du site
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                <strong>Raison sociale :</strong> CodeCrafting
                <br />
                <strong>Forme juridique :</strong> [SARL, SAS, etc.]
                <br />
                <strong>Capital social :</strong> [montant] euros
                <br />
                <strong>Siège social :</strong> [Adresse complète]
                <br />
                <strong>RCS :</strong> [Ville] [Numéro]
                <br />
                <strong>SIRET :</strong> [Numéro SIRET]
                <br />
                <strong>Email :</strong> contact@codecrafting.fr
                <br />
                <strong>Téléphone :</strong> [À compléter]
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Directeur de la publication
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Christophe Pauliac
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Hébergement
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                <strong>Hébergeur :</strong> [Nom de l'hébergeur]
                <br />
                <strong>Adresse :</strong> [Adresse de l'hébergeur]
                <br />
                <strong>Téléphone :</strong> [Numéro de téléphone]
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Propriété intellectuelle
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                L'ensemble de ce site relève de la législation française et
                internationale sur le droit d'auteur et la propriété
                intellectuelle. Tous les droits de reproduction sont réservés, y
                compris pour les documents téléchargeables et les
                représentations iconographiques et photographiques.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Crédits
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                <strong>Conception et développement :</strong> Codecrafting
                <br />
                <strong>Framework :</strong> Next.js, React, Chakra UI
                <br />
                <strong>Hébergement :</strong> LWS
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Limitation de responsabilité
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Les informations contenues sur ce site sont aussi précises que
                possible et le site est périodiquement remis à jour, mais peut
                toutefois contenir des inexactitudes, des omissions ou des
                lacunes. Si vous constatez une lacune, erreur ou ce qui paraît
                être un dysfonctionnement, merci de bien vouloir le signaler par
                email à contact@codecrafting.fr.
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
