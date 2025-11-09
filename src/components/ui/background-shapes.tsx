"use client";

import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  50% { transform: translate(-40px, 40px) rotate(180deg) scale(1.1); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, 30px) rotate(90deg); }
  75% { transform: translate(-30px, -20px) rotate(270deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

export function BackgroundShapes() {
  const shape1Color = useColorModeValue(
    "rgba(37, 99, 235, 0.45)",
    "rgba(59, 130, 246, 0.25)"
  );
  const shape2Color = useColorModeValue(
    "rgba(239, 246, 255, 0.50)",
    "rgba(241, 245, 249, 0.15)"
  );
  const shape3Color = useColorModeValue(
    "rgba(220, 38, 38, 0.44)",
    "rgba(239, 68, 68, 0.24)"
  );
  const shape4Color = useColorModeValue(
    "rgba(37, 99, 235, 0.42)",
    "rgba(59, 130, 246, 0.22)"
  );

  return (
    <Box
      position="fixed"
      inset={0}
      overflow="hidden"
      pointerEvents="none"
      zIndex={-1}
      opacity={0.6}
    >
      {/* Cercle flottant 1 */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width={{ base: "120px", md: "200px" }}
        height={{ base: "120px", md: "200px" }}
        borderRadius="full"
        bg={shape1Color}
        filter="blur(40px)"
        animation={`${float1} 20s ease-in-out infinite`}
      />

      {/* Rectangle arrondi 1 */}
      <Box
        position="absolute"
        top="60%"
        right="10%"
        width={{ base: "150px", md: "250px" }}
        height={{ base: "100px", md: "180px" }}
        borderRadius="3xl"
        bg={shape2Color}
        filter="blur(50px)"
        animation={`${float2} 25s ease-in-out infinite`}
      />

      {/* Cercle flottant 2 */}
      <Box
        position="absolute"
        bottom="15%"
        left="15%"
        width={{ base: "100px", md: "180px" }}
        height={{ base: "100px", md: "180px" }}
        borderRadius="full"
        bg={shape3Color}
        filter="blur(45px)"
        animation={`${float3} 18s ease-in-out infinite`}
      />

      {/* Rectangle arrondi 2 */}
      <Box
        position="absolute"
        top="30%"
        right="25%"
        width={{ base: "130px", md: "220px" }}
        height={{ base: "90px", md: "160px" }}
        borderRadius="2xl"
        bg={shape4Color}
        filter="blur(55px)"
        animation={`${pulse} 15s ease-in-out infinite`}
      />

      {/* Cercle flottant 3 */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width={{ base: "180px", md: "300px" }}
        height={{ base: "180px", md: "300px" }}
        borderRadius="full"
        bg={shape1Color}
        filter="blur(60px)"
        animation={`${float1} 30s ease-in-out infinite reverse`}
      />
    </Box>
  );
}
