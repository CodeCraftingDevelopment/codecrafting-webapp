"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  const { children, ...rest } = props;

  return (
    <SessionProvider>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...rest}>{children}</ColorModeProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
