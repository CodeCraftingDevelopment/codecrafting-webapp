"use client";

import {
  Box,
  Button,
  Link as ChakraLink,
  Drawer,
  Flex,
  Heading,
  IconButton,
  Menu,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  FiHome,
  FiLogOut,
  FiMenu,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";
import { CodecraftLogo } from "@/components/images/svg/CodecraftLogo";
import { ColorModeButton } from "@/components/ui/color-mode";

// Configuration de la navigation publique
const navigationItems = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

// Composant Logo
function Logo() {
  return (
    <ChakraLink
      as={NextLink}
      href="/"
      aria-label="Retour à l'accueil"
      display="inline-flex"
      flexShrink={0}
      _focus={{ outline: "none", boxShadow: "none" }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "focus.default",
        outlineOffset: "2px",
        borderRadius: "md",
      }}
    >
      <Box p={1}>
        <CodecraftLogo width={120} height={120} />
      </Box>
    </ChakraLink>
  );
}

// Composant Actions (icônes utilisateur et thème)
function HeaderActions() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <Flex gap={2} alignItems="center">
      {isAuthenticated && session?.user ? (
        <Menu.Root positioning={{ placement: "bottom-start" }}>
          <Menu.Trigger asChild>
            <Button variant="ghost" size="lg" px={3} _hover={{ bg: "hover.bg" }}>
              <Flex alignItems="center" gap={2}>
                <FiUser />
                <Text fontSize="sm" fontWeight="medium">
                  {session.user.name ?? session.user.email}
                </Text>
              </Flex>
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="dashboard" asChild>
                <ChakraLink as={NextLink} href="/dashboard" display="flex" _hover={{ bg: "hover.bg" }}>
                  <Flex alignItems="center" gap={2}>
                    <FiHome />
                    <Text>Dashboard</Text>
                  </Flex>
                </ChakraLink>
              </Menu.Item>

              {session.user.role === "admin" && (
                <Menu.Item value="admin" asChild>
                  <ChakraLink as={NextLink} href="/admin" display="flex" _hover={{ bg: "hover.bg" }}>
                    <Flex alignItems="center" gap={2}>
                      <FiShield />
                      <Text>Administration</Text>
                    </Flex>
                  </ChakraLink>
                </Menu.Item>
              )}

              <Menu.Separator />

              <Menu.Item value="logout" onClick={() => signOut()} _hover={{ bg: "hover.bg" }}>
                <Flex alignItems="center" gap={2}>
                  <FiLogOut />
                  <Text>Se déconnecter</Text>
                </Flex>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      ) : (
        <IconButton
          aria-label="Se connecter"
          variant="ghost"
          size="xl"
          onClick={() => signIn(undefined, { callbackUrl: "/" })}
          _hover={{ bg: "hover.bg" }}
        >
          <FiUser />
        </IconButton>
      )}
      <ColorModeButton
        aria-label="Basculer entre le mode clair et sombre"
        variant="ghost"
        size="xl"
        _hover={{ bg: "hover.bg" }}
      />
    </Flex>
  );
}

// Composant Navigation
function Navigation() {
  return (
    <Flex
      as="nav"
      aria-label="Navigation principale"
      gap={{ base: 2, sm: 4, md: 8 }}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      w="full"
      flexDirection={{ base: "column", sm: "row" }}
    >
      {navigationItems.map((item) => (
        <ChakraLink
          key={item.href}
          as={NextLink}
          href={item.href}
          px={4}
          py={2}
          borderRadius="md"
          textAlign="center"
          _hover={{
            textDecoration: "none",
            bg: "hover.bg",
          }}
        >
          {item.label}
        </ChakraLink>
      ))}
    </Flex>
  );
}

// Composant Menu Burger pour mobile
function MenuBurger() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <IconButton
        aria-label="Ouvrir le menu"
        variant="ghost"
        size="2xl"
        onClick={() => setIsOpen(true)}
        h={28}
        w={28}
        bg="transparent"
        _hover={{
          bg: "hover.bg",
        }}
        _active={{
          bg: "hover.bg",
        }}
      >
        <FiMenu size={56} />
      </IconButton>

      <Drawer.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="end"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Flex justifyContent="space-between" alignItems="center">
                <Drawer.Title>Menu</Drawer.Title>
                <Drawer.CloseTrigger asChild>
                  <IconButton
                    aria-label="Fermer le menu"
                    variant="ghost"
                    size="sm"
                    bg="transparent"
                    _hover={{ bg: "hover.bg" }}
                    _active={{ bg: "hover.bg" }}
                  >
                    <FiX size={20} />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Flex>
            </Drawer.Header>

            <Drawer.Body>
              <VStack gap={4} alignItems="stretch">
                {/* Section Navigation */}
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    mb={2}
                    color="text.muted"
                  >
                    Navigation
                  </Text>
                  <VStack gap={2} alignItems="stretch">
                    {navigationItems.map((item) => (
                      <ChakraLink
                        key={item.href}
                        as={NextLink}
                        href={item.href}
                        px={4}
                        py={3}
                        borderRadius="md"
                        onClick={handleClose}
                        fontSize="md"
                        fontWeight="medium"
                        transition="all 0.2s"
                        _hover={{
                          textDecoration: "none",
                          bg: "hover.bg",
                          transform: "translateX(4px)",
                          color: "text.primary",
                        }}
                      >
                        {item.label}
                      </ChakraLink>
                    ))}
                  </VStack>
                </Box>

                <Separator />

                {/* Section Utilisateur */}
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    mb={2}
                    color="text.muted"
                  >
                    Compte
                  </Text>
                  <VStack gap={2} alignItems="stretch">
                    {isAuthenticated && session?.user ? (
                      <>
                        <Box px={4} py={2}>
                          <Text fontSize="sm" fontWeight="medium">
                            {session.user.name ?? session.user.email}
                          </Text>
                        </Box>

                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          onClick={handleClose}
                          asChild
                          _hover={{
                            bg: "hover.bg",
                          }}
                        >
                          <ChakraLink
                            as={NextLink}
                            href="/dashboard"
                            display="flex"
                          >
                            <Flex alignItems="center" gap={2}>
                              <FiHome />
                              <Text>Dashboard</Text>
                            </Flex>
                          </ChakraLink>
                        </Button>

                        {session.user.role === "admin" && (
                          <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            onClick={handleClose}
                            asChild
                            _hover={{
                              bg: "hover.bg",
                            }}
                          >
                            <ChakraLink
                              as={NextLink}
                              href="/admin"
                              display="flex"
                            >
                              <Flex alignItems="center" gap={2}>
                                <FiShield />
                                <Text>Administration</Text>
                              </Flex>
                            </ChakraLink>
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          onClick={() => {
                            handleClose();
                            signOut();
                          }}
                          _hover={{
                            bg: "hover.bg",
                          }}
                        >
                          <Flex alignItems="center" gap={2}>
                            <FiLogOut />
                            <Text>Se déconnecter</Text>
                          </Flex>
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => {
                          handleClose();
                          signIn(undefined, { callbackUrl: "/" });
                        }}
                        _hover={{
                          bg: "hover.bg",
                        }}
                      >
                        <Flex alignItems="center" gap={2}>
                          <FiUser />
                          <Text>Se connecter</Text>
                        </Flex>
                      </Button>
                    )}
                  </VStack>
                </Box>

                <Separator />

                {/* Section Thème */}
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    mb={2}
                    color="text.muted"
                  >
                    Apparence
                  </Text>
                  <Flex px={4} py={2}>
                    <ColorModeButton
                      aria-label="Basculer entre le mode clair et sombre"
                      variant="ghost"
                      size="lg"
                      bg="transparent"
                      _hover={{ bg: "hover.bg" }}
                      _active={{ bg: "hover.bg" }}
                    />
                  </Flex>
                </Box>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
}

// Composant Header principal
export default function Header() {
  return (
    <Box
      as="header"
      shadow="md"
      bg="header.bg"
      borderBottom="1px"
      borderColor="header.border"
      p={{ base: 2, md: 3 }}
    >
      {/* Layout Mobile (base) : Logo à gauche + Menu burger à droite */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        display={{ base: "flex", md: "none" }}
      >
        <Logo />
        <MenuBurger />
      </Flex>

      {/* Layout Desktop (md+) : Logo sur 2 lignes avec titre/icônes puis liens */}
      <Flex direction="column" gap={3} display={{ base: "none", md: "flex" }}>
        {/* Ligne 1 : Logo + Titre + Icônes */}
        <Flex justifyContent="space-between" alignItems="center" gap={4}>
          <Logo />
          <Heading
            as="h1"
            size="4xl"
            textAlign="center"
            flexGrow={1}
            fontWeight="bold"
          >
            CodeCrafting
          </Heading>
          <HeaderActions />
        </Flex>

        {/* Ligne 2 : Navigation centrée horizontalement */}
        <Navigation />
      </Flex>
    </Box>
  );
}
