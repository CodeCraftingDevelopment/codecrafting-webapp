import { CodecraftLogo } from "@/components/images/svg/CodecraftLogo";
import { Box, Flex, Link as ChakraLink, IconButton, Heading } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import NextLink from "next/link";
import { FiUser } from "react-icons/fi";

// Configuration de la navigation
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
                outlineColor: "blue.500", 
                outlineOffset: "2px", 
                borderRadius: "md" 
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
    return (
        <Flex gap={2} alignItems="center">
            <IconButton
                aria-label="Se connecter"
                variant="ghost"
                size="xl"
            >
                <FiUser />
            </IconButton>
            <ColorModeButton
                aria-label="Basculer entre le mode clair et sombre"
                variant="ghost"
                size="xl"
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
                        bg: "blackAlpha.100",
                        _dark: {
                            bg: "whiteAlpha.100",
                        },
                    }}
                >
                    {item.label}
                </ChakraLink>
            ))}
        </Flex>
    );
}

// Composant Header principal
export default function Header() {
    return (
        <Box
            as="header"
            role="banner"
            shadow="md"
            bg="chakra-body-bg"
            borderBottom="1px"
            borderColor="chakra-border-color"
            p={{ base: 2, md: 3 }}
        >
            {/* Layout Mobile (base) : Logo / Icônes / Liens en colonnes */}
            <Flex
                direction="column"
                alignItems="center"
                gap={3}
                display={{ base: "flex", md: "none" }}
            >
                {/* Ligne 1 : Logo centré */}
                <Logo />
                
                {/* Ligne 2 : Icônes centrées */}
                <HeaderActions />
                
                {/* Ligne 3 : Liens en colonne */}
                <Navigation />
            </Flex>

            {/* Layout Moyen écran (md+) : Logo sur 2 lignes avec titre/icônes puis liens */}
            <Flex
                direction="column"
                gap={3}
                display={{ base: "none", md: "flex" }}
            >
                {/* Ligne 1 : Logo + Titre + Icônes */}
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                >
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