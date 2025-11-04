"use client";

import { Box, Container, Flex, Grid, GridItem, Text, Link as ChakraLink } from "@chakra-ui/react";
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
      py={{ base: 4, md: 5 }}
      bg={footerBg}
      color={headingColor}
      borderTop="1px"
      borderColor={borderColor}
      shadow="md"
    >
      <Container maxW="6xl">
        <Grid
          templateColumns="repeat(12, 1fr)"
          templateRows="auto"
          gap={{ base: 2, md: 4 }}
        >
          <GridItem
            colSpan={{ base: 12, md: 6 }}
            display="flex"
            flexDirection="column"
            gap={0.5}
            alignItems={{ base: "center", md: "flex-start" }}
          >
            <Text fontWeight="bold" fontSize="lg">
              Codecrafting.fr
            </Text>
            <Text fontSize="sm" color={mutedTextColor}>
              Concevoir des outils digitaux adaptés à vos besoins
            </Text>
          </GridItem>

          <GridItem
            colSpan={{ base: 12, md: 6 }}
            display="flex"
            flexDirection="column"
            gap={1}
            alignItems={{ base: "center", md: "flex-end" }}
          >
            <Text fontWeight="semibold" fontSize="sm">
              Suivez-nous
            </Text>
            <Flex gap={2} wrap="wrap" justify={{ base: "center", md: "flex-end" }}>
              {socialLinks.map((social) => (
                <ChakraLink
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  fontSize="xl"
                  transition="transform 0.2s ease, background-color 0.2s ease"
                  color={linkColor}
                  rounded="full"
                  px={1}
                  py={0.5}
                  _hover={{
                    transform: "translateY(-2px) scale(1.1)",
                    bg: iconHoverBg,
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </ChakraLink>
              ))}
            </Flex>
          </GridItem>

          <GridItem colSpan={12} pt={1} borderTop="1px" borderColor={borderColor}>
            <Grid
              templateColumns="repeat(12, 1fr)"
              gap={{ base: 1, md: 2.5 }}
              alignItems="center"
            >
              <GridItem
                colSpan={{ base: 12, md: 6 }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Text fontSize="sm" color={mutedTextColor}>
                  © {new Date().getFullYear()} Codecrafting.fr Tous droits réservés.
                </Text>
              </GridItem>

              <GridItem
                colSpan={{ base: 12, md: 6 }}
                display="flex"
                justifyContent={{ base: "center", md: "flex-end" }}
              >
                <Flex gap={3} wrap="wrap" justify="flex-end">
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
                </Flex>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
