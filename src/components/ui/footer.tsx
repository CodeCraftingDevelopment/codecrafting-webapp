"use client";

import { Box, Container, Flex, Text, Link as ChakraLink, HStack, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function Footer() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const linkColor = useColorModeValue("blue.600", "blue.300");

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com", icon: "💼" },
    { name: "GitHub", href: "https://github.com", icon: "🐙" },
    { name: "Twitter", href: "https://twitter.com", icon: "🐦" },
    { name: "Instagram", href: "https://instagram.com", icon: "📷" },
  ];

  const legalLinks = [
    { name: "Conditions générales", href: "/cgu" },
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "Mentions légales", href: "/legal" },
  ];

  return (
    <Box
      as="footer"
      mt="auto"
      py={8}
      bg={bgColor}
      borderTop="1px"
      borderColor={borderColor}
      backdropFilter="blur(10px)"
    >
      <Container maxW="6xl">
        <VStack gap={6} align="stretch">
          {/* Section réseaux sociaux */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "flex-start" }}
            gap={6}
          >
            <VStack align={{ base: "center", md: "flex-start" }} gap={2}>
              <Text fontWeight="bold" fontSize="lg">
                Codecrafting
              </Text>
              <Text fontSize="sm" color={textColor}>
                Créer des expériences numériques exceptionnelles
              </Text>
            </VStack>

            <VStack align={{ base: "center", md: "flex-end" }} gap={3}>
              <Text fontWeight="semibold" fontSize="sm">
                Suivez-nous
              </Text>
              <HStack gap={4}>
                {socialLinks.map((social) => (
                  <ChakraLink
                    key={social.name}
                    href={social.href}
                    isExternal
                    fontSize="2xl"
                    transition="transform 0.2s ease"
                    _hover={{
                      transform: "translateY(-2px) scale(1.1)",
                    }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </ChakraLink>
                ))}
              </HStack>
            </VStack>
          </Flex>

          {/* Section liens légaux */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={4}
            pt={4}
            borderTop="1px"
            borderColor={borderColor}
          >
            <Text fontSize="sm" color={textColor}>
              © {new Date().getFullYear()} Codecrafting. Tous droits réservés.
            </Text>

            <HStack
              gap={4}
              flexWrap="wrap"
              justify={{ base: "center", md: "flex-end" }}
            >
              {legalLinks.map((link) => (
                <ChakraLink
                  key={link.name}
                  as={NextLink}
                  href={link.href}
                  fontSize="sm"
                  color={linkColor}
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  {link.name}
                </ChakraLink>
              ))}
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
