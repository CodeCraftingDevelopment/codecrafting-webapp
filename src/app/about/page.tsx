"use client";

import { Box, Heading, Text, VStack, Container, SimpleGrid } from "@chakra-ui/react";
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
      <VStack
        gap={8}
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
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            _dark={{ color: "gray.300" }}
            maxW="3xl"
            mx="auto"
          >
            Nous sommes une équipe passionnée de développeurs et designers
            dédiés à créer des expériences numériques exceptionnelles.
          </Text>
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
            <Heading size="md" mb={4} color="purple.600" _dark={{ color: "purple.300" }}>
              Notre Mission
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              Transformer vos idées en solutions digitales innovantes et performantes.
              Nous croyons en la puissance du code élégant et du design intuitif.
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
            <Heading size="md" mb={4} color="pink.600" _dark={{ color: "pink.300" }}>
              Notre Expertise
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              Développement web et mobile, architecture cloud, design UI/UX,
              et conseil en transformation digitale. Plus de 10 ans d'expérience.
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
            <Heading size="md" mb={4} color="blue.600" _dark={{ color: "blue.300" }}>
              Technologies
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              React, Next.js, TypeScript, Node.js, Python, AWS, Docker,
              et bien d'autres technologies modernes pour vos projets.
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
            <Heading size="md" mb={4} color="green.600" _dark={{ color: "green.300" }}>
              Nos Valeurs
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              Excellence technique, innovation continue, collaboration étroite
              avec nos clients, et engagement pour la qualité à chaque étape.
            </Text>
          </Box>
        </SimpleGrid>

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
        >
          <Heading size="lg" mb={4}>
            Prêt à démarrer votre projet ?
          </Heading>
          <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }}>
            Contactez-nous dès aujourd'hui pour discuter de vos besoins
            et découvrir comment nous pouvons vous aider à réussir.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
