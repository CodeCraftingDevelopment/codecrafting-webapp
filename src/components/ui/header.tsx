import { CodecraftLogo } from "@/components/images/svg/CodecraftLogo";
import { Box, Flex, Grid, GridItem, Text, Link as ChakraLink } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import NextLink from "next/link";

const gridItemBaseProps = {
  overflow: "hidden" as const,
};

const navLinkBaseProps = {
  textAlign: "center" as const,
  p: 2,
  borderRadius: "md",
  _hover: {
    textDecoration: "none",
    bg: "blackAlpha.100",
    _dark: {
      bg: "whiteAlpha.100",
    },
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "blue.500",
    outlineOffset: "2px",
  },
};

const navigationItems = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
    return (
        <header role="banner">
            <Grid
                templateColumns="repeat(12, 1fr)"
                templateRows="repeat(2, auto)"
                gap={2}
                p={2}
                shadow="md"
                bg="chakra-body-bg"
                borderBottom="1px"
                borderColor="chakra-border-color"
            >
                <GridItem
                    {...gridItemBaseProps}
                    rowSpan={2}
                    colSpan={{base: 12, sm: 2, md: 1, lg: 1}}
                    minW={120}
                    mx={{base: "auto", sm: "0"}}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <ChakraLink
                        as={NextLink}
                        href="/"
                        aria-label="Retour à l'accueil"
                        display="inline-flex"
                        _focus={{boxShadow: "0 0 0 3px var(--chakra-colors-blue-500)", outline: "none"}}
                    >
                        <Box p={3}>
                            <CodecraftLogo width={110} height={110}/>
                        </Box>
                    </ChakraLink>
                </GridItem>

                <GridItem
                    {...gridItemBaseProps}
                    colSpan={{base: 12, sm: 10, md: 9, lg: 9}}
                    rowSpan={1}
                    p={2}
                    display="flex"
                    alignItems="center"
                >
                    <Flex as="div" role="status" gap={4} flexWrap="wrap">
                        <Text>Environnement : {process.env.NEXT_PUBLIC_ENV ?? "développement"}</Text>
                    </Flex>
                </GridItem>

                <GridItem
                    {...gridItemBaseProps}
                    colSpan={{base: 12, sm: 10, md: 2, lg: 2}}
                    rowSpan={1}
                    p={2}
                    display="flex"
                    alignItems="center"
                    justifyContent={{base: "center", sm: "flex-end"}}
                >
                    <ColorModeButton
                        aria-label="Basculer entre le mode clair et sombre"
                        padding={0}
                        margin={0}
                        size="2xs"
                    />
                </GridItem>

                <GridItem
                    {...gridItemBaseProps}
                    as="nav"
                    aria-label="Navigation principale"
                    colSpan={{base: 12, sm: 12, md: 11, lg: 11}}
                    rowSpan={1}
                    p={2}
                >
                    <Grid
                        as="ul"
                        listStyleType="none"
                        templateColumns="repeat(12, 1fr)"
                        templateRows="repeat(1, 1fr)"
                        gap={{base: 2, sm: 2, md: 8, lg: 8}}
                        m="0"
                        p="0"
                    >
                        {navigationItems.map((item) => (
                            <GridItem as="li" key={item.href} colSpan={{base: 12, sm: 4, md: 4, lg: 4}}>
                                <ChakraLink
                                    as={NextLink}
                                    href={item.href}
                                    {...navLinkBaseProps}
                                    display="block"
                                >
                                    {item.label}
                                </ChakraLink>
                            </GridItem>
                        ))}
                    </Grid>
                </GridItem>
            </Grid>
        </header>
    )
}