"use client";

import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export default function Home() {
  return (
    <Container maxW="6xl" py={{ base: 16, md: 24 }}>
      <Text
        fontWeight="bold"
        fontSize={{ base: "xl", md: "2xl" }}
        textAlign="center"
        mb={3}
        color="text.title"
      >
        Assistance informatique et solutions digitales sur mesure pour
        particuliers et petites structures.
      </Text>
      <VStack
        gap={8}
        align="stretch"
        textAlign="center"
        animation={`${fadeIn} 0.8s ease-out`}
      >
        <Box animation={`${fadeInUp} 0.6s ease-out`}>
          <Heading
            as="h1"
            size={{ base: "2xl", md: "4xl" }}
            mb={2}
            bgGradient="linear(to-r, primary.400, secondary.500)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Codecrafting : le numérique accessible au quotidien
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="text.secondary"
            maxW="3xl"
            mx="auto"
          >
            Codecrafting accompagne particuliers et petites entreprises en
            assistance informatique et dans la création d’outils web, mobiles ou
            bureautiques qui simplifient le quotidien. Chaque projet est conçu
            pour être durable, clair et facile à prendre en main.
          </Text>
        </Box>

        <Box
          animation={`${fadeInUp} 0.8s ease-out 0.2s backwards`}
          display="flex"
          gap={4}
          justifyContent="center"
          flexWrap="wrap"
        >
          <ChakraLink
            as={NextLink}
            href="/contact"
            _hover={{ textDecoration: "none" }}
          >
            <Button
              size="lg"
              bg="button.primary.bg"
              color="button.primary.text"
              px={8}
              py={6}
              fontSize="lg"
              borderRadius="xl"
              boxShadow="lg"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
                bg: "button.primary.hover",
              }}
              transition="all 0.3s ease"
            >
              Nous contacter
            </Button>
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/about"
            _hover={{ textDecoration: "none" }}
          >
            <Button
              size="lg"
              variant="outline"
              bg="button.ghost.bg"
              color="button.primary.bg"
              borderColor="button.primary.bg"
              px={8}
              py={6}
              fontSize="lg"
              borderRadius="xl"
              _hover={{
                transform: "translateY(-2px)",
                bg: "button.primary.bg",
                color: "button.primary.text",
                borderColor: "button.primary.hover",
              }}
              transition="all 0.3s ease"
            >
              En savoir plus
            </Button>
          </ChakraLink>
        </Box>

        <Box
          animation={`${fadeInUp} 1s ease-out 0.4s backwards`}
          mt={8}
          p={8}
          borderRadius="2xl"
          bg="card.bg"
          _dark={{ bg: "card.bg" }}
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="card.border"
        >
          <Heading size="md" mb={4}>
            Prestations proposées
          </Heading>
          <VStack
            align="stretch"
            gap={3}
            textAlign="left"
            color="text.secondary"
          >
            <Text as="span">
              • Assistance informatique de proximité : dépannage, configuration,
              aide et conseils au quotidien.
            </Text>
            <Text as="span">
              • Applications web personnalisées : vitrines simples, espaces
              clients sécurisés et outils d’administration alignés sur vos
              habitudes de travail.
            </Text>
            <Text as="span">
              • Applications mobiles légères : PWA ou apps natives pour fournir
              des services de proximité.
            </Text>
            <Text as="span">
              • Applications bureautiques sur mesure : automatisations, tableaux
              de bord et scripts pour gagner du temps.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
