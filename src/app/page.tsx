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
            mb={4}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Bienvenue sur Codecrafting
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            _dark={{ color: "gray.300" }}
            maxW="3xl"
            mx="auto"
          >
            Créons ensemble des expériences numériques exceptionnelles.
            Du code élégant, des designs modernes et des solutions innovantes.
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
            Nos services
          </Heading>
          <Text color="gray.600" _dark={{ color: "gray.300" }}>
            Développement web moderne, applications mobiles, design UI/UX,
            et bien plus encore. Nous transformons vos idées en réalité.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
