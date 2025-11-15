"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { theme } from "@/theme/colors";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  const { children, ...rest } = props;

  return (
    <SessionProvider>
      <ChakraProvider value={theme}>
        <ColorModeProvider {...rest}>{children}</ColorModeProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
