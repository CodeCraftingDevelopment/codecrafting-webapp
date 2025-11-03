"use client";

import { Box, Heading, Text, VStack, Container } from "@chakra-ui/react";
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

export default function CGUPage() {
  return (
    <Container maxW="4xl" py={{ base: 16, md: 24 }}>
      <VStack
        gap={6}
        align="stretch"
        animation={`${fadeInUp} 0.6s ease-out`}
      >
        <Heading
          as="h1"
          size={{ base: "xl", md: "2xl" }}
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          Conditions Générales d'Utilisation
        </Heading>

        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </Text>

        <Box
          p={6}
          borderRadius="xl"
          bg="whiteAlpha.700"
          _dark={{ bg: "blackAlpha.500", borderColor: "blue.800" }}
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="blue.100"
        >
          <VStack gap={4} align="stretch">
            <Box>
              <Heading as="h2" size="md" mb={2}>
                1. Objet
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir
                les modalités et conditions d'utilisation des services proposés sur le site
                Codecrafting, ainsi que de définir les droits et obligations des parties dans ce cadre.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                2. Mentions légales
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Le site Codecrafting est édité par [Nom de votre société], [forme juridique]
                au capital de [montant] euros, immatriculée au RCS de [ville] sous le numéro [numéro],
                dont le siège social est situé [adresse].
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                3. Accès au site
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet.
                Tous les frais supportés par l'utilisateur pour accéder au service (matériel informatique,
                logiciels, connexion Internet, etc.) sont à sa charge.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                4. Propriété intellectuelle
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                L'ensemble des contenus présents sur le site (textes, images, graphismes, logo, icônes, etc.)
                sont la propriété exclusive de Codecrafting, à l'exception des marques, logos ou contenus
                appartenant à d'autres sociétés partenaires ou auteurs.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                5. Responsabilité
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Codecrafting ne pourra être tenu responsable des dommages directs et indirects causés
                au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation
                d'un matériel ne répondant pas aux spécifications, soit de l'apparition d'un bug ou d'une incompatibilité.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                6. Droit applicable
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Les présentes CGU sont régies par le droit français. En cas de litige, et après l'échec
                de toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents.
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
