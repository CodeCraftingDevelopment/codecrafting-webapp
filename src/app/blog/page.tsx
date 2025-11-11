"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
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

export default function BlogPage() {
  return (
    <Container maxW="6xl" py={{ base: 16, md: 24 }}>
      <VStack gap={8} align="stretch" animation={`${fadeInUp} 0.6s ease-out`}>
        <Box textAlign="center">
          <Heading
            as="h1"
            size={{ base: "2xl", md: "4xl" }}
            mb={4}
            bgGradient="linear(to-r, teal.400, cyan.500)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Blog
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            _dark={{ color: "gray.300" }}
            maxW="3xl"
            mx="auto"
          >
            Découvrez nos articles et actualités
          </Text>
        </Box>

        <Box
          p={8}
          borderRadius="2xl"
          bg="whiteAlpha.700"
          _dark={{ bg: "blackAlpha.500", borderColor: "teal.800" }}
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="teal.100"
          textAlign="center"
        >
          <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }}>
            Le blog est en cours de construction. Revenez bientôt pour découvrir nos articles !
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
