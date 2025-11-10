import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { BackgroundShapes } from "@/components/ui/background-shapes";
import { ParticleNetwork } from "@/components/ui/particle-network";
import React from "react";
import { Fira_Code } from "next/font/google";

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
    <html suppressHydrationWarning className={firaCode.className}>
      <body
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Provider>
          <ParticleNetwork />
          <BackgroundShapes />
          <header>
            <Header />
          </header>
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
