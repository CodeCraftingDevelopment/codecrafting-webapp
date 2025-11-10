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

export default function PrivacyPage() {
  return (
    <Container maxW="4xl" py={{ base: 16, md: 24 }}>
      <VStack gap={6} align="stretch" animation={`${fadeInUp} 0.6s ease-out`}>
        <Heading
          as="h1"
          size={{ base: "xl", md: "2xl" }}
          bgGradient="linear(to-r, green.400, teal.500)"
          bgClip="text"
        >
          Politique de Confidentialité
        </Heading>

        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </Text>

        <Box
          p={6}
          borderRadius="xl"
          bg="whiteAlpha.700"
          _dark={{ bg: "blackAlpha.500", borderColor: "green.800" }}
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="green.100"
        >
          <VStack gap={4} align="stretch">
            <Box>
              <Heading as="h2" size="md" mb={2}>
                1. Collecte des données
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Codecrafting collecte des données personnelles uniquement
                lorsque vous nous les fournissez volontairement, notamment via
                nos formulaires de contact. Ces données incluent votre nom,
                adresse email, et tout autre information que vous choisissez de
                partager.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                2. Utilisation des données
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Les données collectées sont utilisées uniquement pour répondre à
                vos demandes, améliorer nos services, et vous tenir informé de
                nos actualités si vous y avez consenti. Nous ne vendons ni ne
                louons vos données personnelles à des tiers.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                3. Cookies
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Notre site utilise des cookies pour améliorer votre expérience
                de navigation. Les cookies sont de petits fichiers stockés sur
                votre appareil qui nous aident à comprendre comment vous
                utilisez notre site. Vous pouvez configurer votre navigateur
                pour refuser les cookies.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                4. Sécurité des données
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Nous mettons en œuvre des mesures de sécurité techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles contre tout accès non autorisé, modification,
                divulgation ou destruction.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                5. Vos droits
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Conformément au RGPD, vous disposez d'un droit d'accès, de
                rectification, d'effacement, de limitation du traitement, de
                portabilité et d'opposition concernant vos données personnelles.
                Pour exercer ces droits, contactez-nous à
                contact@codecrafting.fr.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                6. Conservation des données
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Vos données personnelles sont conservées uniquement pendant la
                durée nécessaire aux finalités pour lesquelles elles ont été
                collectées, ou conformément aux obligations légales.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                7. Contact
              </Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Pour toute question concernant cette politique de
                confidentialité ou le traitement de vos données personnelles,
                vous pouvez nous contacter à l'adresse : contact@codecrafting.fr
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
