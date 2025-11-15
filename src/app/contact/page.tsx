"use client";

import {
  Box,
  Button,
  Link as ChakraLink,
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

export default function ContactPage() {
  return (
    <Box
      as="main"
      maxW="4xl"
      mx="auto"
      py={16}
      px={{ base: 4, md: 8 }}
      animation={`${fadeInUp} 0.6s ease-out`}
    >
      <VStack gap={8} align="stretch">
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, primary.400, secondary.500)"
          bgClip="text"
        >
          Contact
        </Heading>
        <Text fontSize="lg" color="text.secondary">
          Besoin d’aide en assistance informatique ou sur une application web,
          mobile ou bureautique&nbsp;? Écrivez-moi&nbsp;: je vous réponds sous
          48&nbsp;heures pour définir les prochaines étapes.
        </Text>
        <VStack gap={4} align="stretch">
          <Box
            p={6}
            borderRadius="xl"
            bg="card.bg"
            _dark={{ bg: "card.bg" }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="card.border"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <Heading as="h2" size="md" mb={2}>
              Email
            </Heading>
            <ChakraLink
              href="mailto:contact@codecrafting.fr"
              color="link.color"
              _hover={{ color: "link.hover" }}
            >
              contact@codecrafting.fr
            </ChakraLink>
          </Box>
          <Box
            p={6}
            borderRadius="xl"
            bg="card.bg"
            _dark={{ bg: "card.bg" }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="card.border"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <Heading as="h2" size="md" mb={2}>
              Téléphone
            </Heading>
            <Text color="text.secondary">
              Disponible sur rendez-vous. Proposez un créneau par mail et je
              vous rappelle pour un échange.
            </Text>
          </Box>
          <Box
            p={6}
            borderRadius="xl"
            bg="card.bg"
            _dark={{ bg: "card.bg" }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="card.border"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <Heading as="h2" size="md" mb={2}>
              Préparer notre échange
            </Heading>
            <Text color="text.secondary">
              Quelques lignes sur votre activité, les objectifs visés et les
              échéances suffisent. J’arrive au rendez-vous avec des premières
              pistes techniques adaptées.
            </Text>
          </Box>
        </VStack>
        <Text fontSize="md" color="text.muted">
          Basé en France, je travaille à distance et peux intervenir en journée
          ou en soirée selon vos contraintes.
        </Text>
        <Box>
          <ChakraLink
            as={NextLink}
            href="/"
            _hover={{ textDecoration: "none" }}
          >
            <Button
              bg="button.primary.bg"
              color="button.primary.text"
              _hover={{
                bg: "button.primary.hover",
              }}
            >
              Retour à l&apos;accueil
            </Button>
          </ChakraLink>
        </Box>
      </VStack>
    </Box>
  );
}
