import { Box, Flex } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import type React from "react";
import { BackgroundShapes } from "@/components/ui/background-shapes";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { ParticleNetwork } from "@/components/ui/particle-network";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "Codecrafting",
  description: "Codecrafting website",
};

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-firacode",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html
      suppressHydrationWarning
      className={`${firaCode.className} light`}
      lang={"fr"}
    >
      <body>
        <Provider>
          <Flex direction="column" minH="100vh">
            <ParticleNetwork />
            <BackgroundShapes />
            <Box as="header">
              <Header />
            </Box>
            <Box as="main" flex={1}>
              {children}
            </Box>
            <Footer />
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
