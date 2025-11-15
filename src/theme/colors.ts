// src/theme/colors.ts
// Palette de couleurs basée sur le logo Codecraft (#00bece)
// Compatible avec Chakra UI v3.27.1

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Couleurs principales basées sur #00bece (cyan)
        primary: {
          50: { value: "#e6f9fb" },
          100: { value: "#ccf3f7" },
          200: { value: "#99e7ef" },
          300: { value: "#66dae7" },
          400: { value: "#33cedf" },
          500: { value: "#00bece" }, // Couleur du logo
          600: { value: "#00a9b8" },
          700: { value: "#0094a2" },
          800: { value: "#007f8c" },
          900: { value: "#006a76" },
        },

        // Couleurs secondaires (orange corail pour contraster)
        secondary: {
          50: { value: "#fff5f2" },
          100: { value: "#ffe8e0" },
          200: { value: "#ffccc0" },
          300: { value: "#ffaf9f" },
          400: { value: "#ff927f" },
          500: { value: "#ff6b35" },
          600: { value: "#e85a2b" },
          700: { value: "#d14921" },
          800: { value: "#ba3817" },
          900: { value: "#a3270d" },
        },

        // Couleurs neutres (gris)
        neutral: {
          50: { value: "#f9fafb" },
          100: { value: "#f3f4f6" },
          200: { value: "#e5e7eb" },
          300: { value: "#d1d5db" },
          400: { value: "#9ca3af" },
          500: { value: "#6b7280" },
          600: { value: "#4b5563" },
          700: { value: "#374151" },
          800: { value: "#1f2937" },
          900: { value: "#111827" },
        },

        // Couleurs sémantiques
        success: {
          50: { value: "#f0fdf4" },
          100: { value: "#dcfce7" },
          200: { value: "#bbf7d0" },
          300: { value: "#86efac" },
          400: { value: "#4ade80" },
          500: { value: "#22c55e" },
          600: { value: "#16a34a" },
          700: { value: "#15803d" },
          800: { value: "#166534" },
          900: { value: "#14532d" },
        },

        warning: {
          50: { value: "#fffbeb" },
          100: { value: "#fef3c7" },
          200: { value: "#fde68a" },
          300: { value: "#fcd34d" },
          400: { value: "#fbbf24" },
          500: { value: "#f59e0b" },
          600: { value: "#d97706" },
          700: { value: "#b45309" },
          800: { value: "#92400e" },
          900: { value: "#78350f" },
        },

        error: {
          50: { value: "#fef2f2" },
          100: { value: "#fee2e2" },
          200: { value: "#fecaca" },
          300: { value: "#fca5a5" },
          400: { value: "#f87171" },
          500: { value: "#ef4444" },
          600: { value: "#dc2626" },
          700: { value: "#b91c1c" },
          800: { value: "#991b1b" },
          900: { value: "#7f1d1d" },
        },

        info: {
          50: { value: "#ecfeff" },
          100: { value: "#cffafe" },
          200: { value: "#a5f3fc" },
          300: { value: "#67e8f9" },
          400: { value: "#22d3ee" },
          500: { value: "#06b6d4" },
          600: { value: "#0891b2" },
          700: { value: "#0e7490" },
          800: { value: "#155e75" },
          900: { value: "#164e63" },
        },
      },
    },
    semanticTokens: {
      colors: {
        // Text
        text: {
          primary: { 
            value: { 
              base: "{colors.neutral.900}", 
              _dark: "{colors.neutral.50}" 
            } 
          },
          secondary: { 
            value: { 
              base: "{colors.neutral.600}", 
              _dark: "{colors.neutral.400}" 
            } 
          },
          muted: { 
            value: { 
              base: "{colors.neutral.500}", 
              _dark: "{colors.neutral.500}" 
            } 
          },
          inverse: { 
            value: { 
              base: "{colors.neutral.50}", 
              _dark: "{colors.neutral.900}" 
            } 
          },
        },

        // Background
        bg: {
          primary: { 
            value: { 
              base: "{colors.neutral.50}", 
              _dark: "{colors.neutral.900}" 
            } 
          },
          secondary: { 
            value: { 
              base: "white", 
              _dark: "{colors.neutral.800}" 
            } 
          },
          tertiary: { 
            value: { 
              base: "{colors.neutral.100}", 
              _dark: "{colors.neutral.700}" 
            } 
          },
        },

        // Cards
        card: {
          bg: { 
            value: { 
              base: "whiteAlpha.800", 
              _dark: "blackAlpha.500" 
            } 
          },
          border: { 
            value: { 
              base: "{colors.neutral.200}", 
              _dark: "{colors.neutral.700}" 
            } 
          },
          shadow: { 
            value: { 
              base: "{colors.neutral.200}", 
              _dark: "{colors.neutral.900}" 
            } 
          },
        },

        // Links
        link: {
          color: { 
            value: { 
              base: "{colors.primary.500}", 
              _dark: "{colors.primary.400}" 
            } 
          },
          hover: { 
            value: { 
              base: "{colors.primary.600}", 
              _dark: "{colors.primary.300}" 
            } 
          },
          visited: { 
            value: { 
              base: "{colors.primary.700}", 
              _dark: "{colors.primary.500}" 
            } 
          },
        },

        // Boutons
        button: {
          primary: {
            bg: { 
              value: { 
                base: "{colors.primary.500}", 
                _dark: "{colors.primary.600}" 
              } 
            },
            hover: { 
              value: { 
                base: "{colors.primary.600}", 
                _dark: "{colors.primary.700}" 
              } 
            },
            text: { 
              value: { 
                base: "white", 
                _dark: "white" 
              } 
            },
          },
          secondary: {
            bg: { 
              value: { 
                base: "{colors.secondary.500}", 
                _dark: "{colors.secondary.600}" 
              } 
            },
            hover: { 
              value: { 
                base: "{colors.secondary.600}", 
                _dark: "{colors.secondary.700}" 
              } 
            },
            text: { 
              value: { 
                base: "white", 
                _dark: "white" 
              } 
            },
          },
          ghost: {
            bg: { 
              value: { 
                base: "transparent", 
                _dark: "transparent" 
              } 
            },
            hover: { 
              value: { 
                base: "{colors.primary.50}", 
                _dark: "{colors.primary.900}" 
              } 
            },
            text: { 
              value: { 
                base: "{colors.primary.600}", 
                _dark: "{colors.primary.400}" 
              } 
            },
          },
        },

        // Formulaires
        input: {
          bg: { 
            value: { 
              base: "whiteAlpha.800", 
              _dark: "blackAlpha.500" 
            } 
          },
          border: { 
            value: { 
              base: "{colors.neutral.300}", 
              _dark: "{colors.neutral.600}" 
            } 
          },
          focus: { 
            value: { 
              base: "{colors.primary.500}", 
              _dark: "{colors.primary.400}" 
            } 
          },
          placeholder: { 
            value: { 
              base: "{colors.neutral.400}", 
              _dark: "{colors.neutral.500}" 
            } 
          },
        },

        // Headers et navigation
        header: {
          bg: { 
            value: { 
              base: "white", 
              _dark: "{colors.neutral.900}" 
            } 
          },
          border: { 
            value: { 
              base: "{colors.neutral.200}", 
              _dark: "{colors.neutral.700}" 
            } 
          },
        },
        nav: {
          link: { 
            value: { 
              base: "{colors.neutral.700}", 
              _dark: "{colors.neutral.300}" 
            } 
          },
          linkHover: { 
            value: { 
              base: "{colors.primary.600}", 
              _dark: "{colors.primary.400}" 
            } 
          },
        },

        // États
        hover: {
          bg: { 
            value: { 
              base: "{colors.primary.50}", 
              _dark: "{colors.primary.900}" 
            } 
          },
        },
        active: {
          bg: { 
            value: { 
              base: "{colors.primary.100}", 
              _dark: "{colors.primary.800}" 
            } 
          },
        },
        disabled: {
          text: { 
            value: { 
              base: "{colors.neutral.400}", 
              _dark: "{colors.neutral.600}" 
            } 
          },
          bg: { 
            value: { 
              base: "{colors.neutral.100}", 
              _dark: "{colors.neutral.800}" 
            } 
          },
        },

        // Bordures
        border: {
          light: { 
            value: { 
              base: "{colors.neutral.200}", 
              _dark: "{colors.neutral.700}" 
            } 
          },
          medium: { 
            value: { 
              base: "{colors.neutral.300}", 
              _dark: "{colors.neutral.600}" 
            } 
          },
          dark: { 
            value: { 
              base: "{colors.neutral.400}", 
              _dark: "{colors.neutral.500}" 
            } 
          },
        },

        // Focus et accessibilité
        focus: {
          default: { 
            value: { 
              base: "{colors.primary.500}", 
              _dark: "{colors.primary.400}" 
            } 
          },
          ring: { 
            value: { 
              base: "{colors.primary.500}", 
              _dark: "{colors.primary.400}" 
            } 
          },
        },

        // Overlays et modals
        overlay: {
          bg: { 
            value: { 
              base: "rgba(0, 0, 0, 0.4)", 
              _dark: "rgba(0, 0, 0, 0.6)" 
            } 
          },
          backdrop: { 
            value: { 
              base: "{colors.neutral.900}", 
              _dark: "{colors.neutral.900}" 
            } 
          },
        },

        // Dividers
        divider: {
          bg: { 
            value: { 
              base: "{colors.neutral.200}", 
              _dark: "{colors.neutral.700}" 
            } 
          },
        },

        // Code et préformatés
        code: {
          bg: { 
            value: { 
              base: "{colors.neutral.100}", 
              _dark: "{colors.neutral.800}" 
            } 
          },
          text: { 
            value: { 
              base: "{colors.primary.600}", 
              _dark: "{colors.primary.400}" 
            } 
          },
        },
        pre: {
          bg: { 
            value: { 
              base: "{colors.neutral.900}", 
              _dark: "{colors.neutral.900}" 
            } 
          },
          text: { 
            value: { 
              base: "{colors.neutral.100}", 
              _dark: "{colors.neutral.200}" 
            } 
          },
        },

        // Badges et tags
        badge: {
          primary: {
            bg: { 
              value: { 
                base: "{colors.primary.100}", 
                _dark: "{colors.primary.900}" 
              } 
            },
            text: { 
              value: { 
                base: "{colors.primary.800}", 
                _dark: "{colors.primary.200}" 
              } 
            },
          },
          secondary: {
            bg: { 
              value: { 
                base: "{colors.secondary.100}", 
                _dark: "{colors.secondary.900}" 
              } 
            },
            text: { 
              value: { 
                base: "{colors.secondary.800}", 
                _dark: "{colors.secondary.200}" 
              } 
            },
          },
          success: {
            bg: { 
              value: { 
                base: "{colors.success.100}", 
                _dark: "{colors.success.900}" 
              } 
            },
            text: { 
              value: { 
                base: "{colors.success.800}", 
                _dark: "{colors.success.200}" 
              } 
            },
          },
          warning: {
            bg: { 
              value: { 
                base: "{colors.warning.100}", 
                _dark: "{colors.warning.900}" 
              } 
            },
            text: { 
              value: { 
                base: "{colors.warning.800}", 
                _dark: "{colors.warning.200}" 
              } 
            },
          },
          error: {
            bg: { 
              value: { 
                base: "{colors.error.100}", 
                _dark: "{colors.error.900}" 
              } 
            },
            text: { 
              value: { 
                base: "{colors.error.800}", 
                _dark: "{colors.error.200}" 
              } 
            },
          },
        },

        // Notifications et toasts
        toast: {
          success: {
            bg: { 
              value: { 
                base: "{colors.success.500}", 
                _dark: "{colors.success.600}" 
              } 
            },
            text: { 
              value: { 
                base: "white", 
                _dark: "white" 
              } 
            },
          },
          error: {
            bg: { 
              value: { 
                base: "{colors.error.500}", 
                _dark: "{colors.error.600}" 
              } 
            },
            text: { 
              value: { 
                base: "white", 
                _dark: "white" 
              } 
            },
          },
          warning: {
            bg: { 
              value: { 
                base: "{colors.warning.500}", 
                _dark: "{colors.warning.600}" 
              } 
            },
            text: { 
              value: { 
                base: "{colors.neutral.900}", 
                _dark: "{colors.neutral.900}" 
              } 
            },
          },
          info: {
            bg: { 
              value: { 
                base: "{colors.info.500}", 
                _dark: "{colors.info.600}" 
              } 
            },
            text: { 
              value: { 
                base: "white", 
                _dark: "white" 
              } 
            },
          },
        },

        // Skeleton loading
        skeleton: {
          bg: { 
            value: { 
              base: "{colors.neutral.200}", 
              _dark: "{colors.neutral.700}" 
            } 
          },
          highlight: { 
            value: { 
              base: "{colors.neutral.100}", 
              _dark: "{colors.neutral.600}" 
            } 
          },
        },

        // Ombres
        shadow: {
          sm: { 
            value: { 
              base: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", 
              _dark: "0 1px 2px 0 rgba(0, 0, 0, 0.2)" 
            } 
          },
          md: { 
            value: { 
              base: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", 
              _dark: "0 4px 6px -1px rgba(0, 0, 0, 0.3)" 
            } 
          },
          lg: { 
            value: { 
              base: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
              _dark: "0 10px 15px -3px rgba(0, 0, 0, 0.4)" 
            } 
          },
        },
      },
    },
  },
})

// Configuration du thème complet
export const theme = createSystem(defaultConfig, config)

// Export par défaut
export default theme