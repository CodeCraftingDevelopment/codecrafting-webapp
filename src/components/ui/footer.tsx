"use client";

import { Box, Container, Flex, Text, Link as ChakraLink, HStack, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function Footer() {
  const footerBg = useColorModeValue("chakra-body-bg", "chakra-body-bg");
  const borderColor = "chakra-border-color";
  const headingColor = useColorModeValue("chakra-body-text", "chakra-body-text");
  const mutedTextColor = useColorModeValue("chakra-subtle-text", "chakra-subtle-text");
  const linkColor = useColorModeValue("blue.500", "blue.300");
  const iconHoverBg = useColorModeValue("blue.50", "blue.900");

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
      bg={footerBg}
      color={headingColor}
      borderTop="1px"
      borderColor={borderColor}
      shadow="md"
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
                Codecrafting.fr
              </Text>
              <Text fontSize="sm" color={mutedTextColor}>
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
                    target="_blank"
                    rel="noopener noreferrer"
                    fontSize="2xl"
                    transition="transform 0.2s ease, background-color 0.2s ease"
                    color={linkColor}
                    rounded="full"
                    px={2}
                    py={1}
                    _hover={{
                      transform: "translateY(-2px) scale(1.1)",
                      bg: iconHoverBg,
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
            <Text fontSize="sm" color={mutedTextColor}>
              © {new Date().getFullYear()} Codecrafting.fr Tous droits réservés.
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
                  fontWeight="medium"
                  color={linkColor}
                  _hover={{ textDecoration: "underline" }}
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
