"use client";

import { Box, Heading, Text, Button, VStack, Container, Link as ChakraLink } from "@chakra-ui/react";
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
      >
        Codecrafting.fr
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
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Codecrafting : le numérique accessible au quotidien
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            _dark={{ color: "gray.300" }}
            maxW="3xl"
            mx="auto"
            mb={2}
          >
            Solutions digitales sur mesure pour petites structures.
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            _dark={{ color: "gray.300" }}
            maxW="3xl"
            mx="auto"
          >
            Codecrafting accompagne particuliers et petites entreprises dans la création d’outils web, mobiles ou bureautiques qui simplifient le quotidien. Chaque projet est conçu pour être durable, clair et facile à prendre en main.
          </Text>
        </Box>

        <Box
          animation={`${fadeInUp} 0.8s ease-out 0.2s backwards`}
          display="flex"
          gap={4}
          justifyContent="center"
          flexWrap="wrap"
        >
          <ChakraLink as={NextLink} href="/contact" _hover={{ textDecoration: "none" }}>
            <Button
              size="lg"
              colorScheme="blue"
              px={8}
              py={6}
              fontSize="lg"
              borderRadius="xl"
              boxShadow="lg"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              transition="all 0.3s ease"
            >
              Nous contacter
            </Button>
          </ChakraLink>
          <ChakraLink as={NextLink} href="/about" _hover={{ textDecoration: "none" }}>
            <Button
              size="lg"
              variant="outline"
              colorScheme="blue"
              px={8}
              py={6}
              fontSize="lg"
              borderRadius="xl"
              _hover={{
                transform: "translateY(-2px)",
                bg: "blue.50",
                _dark: { bg: "blue.900" },
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
          bg="whiteAlpha.700"
          _dark={{ bg: "blackAlpha.500", borderColor: "blue.800" }}
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="blue.100"
        >
          <Heading size="md" mb={4}>
            Prestations proposées
          </Heading>
          <VStack align="stretch" gap={3} textAlign="left" color="gray.600" _dark={{ color: "gray.300" }}>
            <Text as="span">
              • Applications web personnalisées : vitrines, portails clients et back-office adaptés à vos usages.
            </Text>
            <Text as="span">
              • Applications mobiles légères : PWA ou apps natives pour fournir des services de proximité.
            </Text>
            <Text as="span">
              • Outils bureautiques sur mesure : automatisations, tableaux de bord et scripts pour gagner du temps.
            </Text>
            <Text as="span">
              • Maintenance et amélioration continue : corrections, optimisations et veille technique.
            </Text>
            <Text as="span">
              • Accompagnement digital : conseils, formations courtes et intégration d’outils existants.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
