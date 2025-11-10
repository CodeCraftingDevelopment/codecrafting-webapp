"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  SimpleGrid,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
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

export default function AboutPage() {
  return (
    <Container maxW="6xl" py={{ base: 16, md: 24 }}>
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        color="gray.600"
        _dark={{ color: "gray.300" }}
        textAlign="center"
        maxW="3xl"
        mx="auto"
        mb={0}
        animation={`${fadeInUp} 0.6s ease-out`}
      >
        Après plus de cinq ans d’expérience en entreprise, je propose une
        assistance informatique qui s’appuie sur mes acquis techniques et mon
        regard opérationnel. Autodidacte depuis le lycée, passé par l’industrie
        et l’aéronautique avant de me consacrer pleinement au logiciel, je
        conçois et fais évoluer des applications en React, C#, Java ou Python,
        en pilotant chaque étape : cadrage, développement, intégration et
        transfert de compétences.
      </Text>
      <VStack
        gap={{ base: 5, md: 6 }}
        align="stretch"
        animation={`${fadeInUp} 0.6s ease-out`}
      >
        <Box textAlign="center">
          <Heading
            as="h1"
            size={{ base: "2xl", md: "4xl" }}
            mb={4}
            bgGradient="linear(to-r, purple.400, pink.500)"
            bgClip="text"
            fontWeight="extrabold"
          >
            À propos de Codecrafting
          </Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mt={8}>
          <Box
            p={8}
            borderRadius="2xl"
            bg="whiteAlpha.700"
            _dark={{ bg: "blackAlpha.500", borderColor: "purple.800" }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="purple.100"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "xl",
            }}
          >
            <Heading
              size="md"
              mb={4}
              color="purple.600"
              _dark={{ color: "purple.300" }}
            >
              Ma mission
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              Comprendre vos besoins, vous aider au quotidien et concevoir des
              solutions numériques utiles, évolutives et faciles à prendre en
              main. Chaque projet est construit en étroite collaboration pour
              rester aligné sur vos priorités.
            </Text>
          </Box>

          <Box
            p={8}
            borderRadius="2xl"
            bg="whiteAlpha.700"
            _dark={{ bg: "blackAlpha.500", borderColor: "pink.800" }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="pink.100"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "xl",
            }}
          >
            <Heading
              size="md"
              mb={4}
              color="pink.600"
              _dark={{ color: "pink.300" }}
            >
              Mon expertise
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              Assistance informatique, petits développements web, mobiles et
              bureau, automatisations et accompagnement numérique. Un
              interlocuteur unique pour vous aider au quotidien ou concrétiser
              vos projets.
            </Text>
          </Box>

          <Box
            p={8}
            borderRadius="2xl"
            bg="whiteAlpha.700"
            _dark={{ bg: "blackAlpha.500", borderColor: "blue.800" }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="blue.100"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "xl",
            }}
          >
            <Heading
              size="md"
              mb={4}
              color="blue.600"
              _dark={{ color: "blue.300" }}
            >
              Technologies
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              React, C#, Java, Python… Un socle polyvalent pour répondre à des
              besoins web, bureau ou mobile et intégrer vos outils existants.
            </Text>
          </Box>

          <Box
            p={8}
            borderRadius="2xl"
            bg="whiteAlpha.700"
            _dark={{ bg: "blackAlpha.500", borderColor: "green.800" }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="green.100"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "xl",
            }}
          >
            <Heading
              size="md"
              mb={4}
              color="green.600"
              _dark={{ color: "green.300" }}
            >
              Mes valeurs
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              Transparence, pédagogie et sens du service. Je privilégie des
              solutions accessibles, documentées et durables pour que vous
              restiez autonome après la livraison.
            </Text>
          </Box>
        </SimpleGrid>

        <ChakraLink
          as={NextLink}
          href="/contact"
          _hover={{ textDecoration: "none" }}
        >
          <Box
            mt={8}
            p={8}
            borderRadius="2xl"
            bg="whiteAlpha.700"
            _dark={{ bg: "blackAlpha.500", borderColor: "purple.800" }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="purple.100"
            textAlign="center"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <Heading size="lg" mb={4}>
              Envie d'aller plus loin ?
            </Heading>
            <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }}>
              Parlons de vos idées et voyons comment Codecrafting peut vous
              accompagner en assistance informatique et dans la création ou
              l'amélioration de vos outils numériques.
            </Text>
          </Box>
        </ChakraLink>
      </VStack>
    </Container>
  );
}
