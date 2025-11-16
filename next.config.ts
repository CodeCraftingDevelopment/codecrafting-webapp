import type { NextConfig } from "next";

const isStaging = process.env.NEXT_PUBLIC_ENV === "staging";
const isDevelopment = process.env.NEXT_PUBLIC_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone", // 🔥 utile pour Docker
  productionBrowserSourceMaps: isStaging,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  typescript: {
    tsconfigPath:
      isStaging || isDevelopment ? "./tsconfig.json" : "./tsconfig.prod.json",
  },
  // 🔒 Headers de sécurité
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Content-Security-Policy",
                  value:
                    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://accounts.google.com https://oauth2.googleapis.com;",
                },
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains; preload",
                },
              ]
            : []),
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "X-RateLimit-Limit",
            value: "100",
          },
          {
            key: "X-RateLimit-Remaining",
            value: "99",
          },
          {
            key: "X-RateLimit-Reset",
            value: new Date(Date.now() + 60 * 1000).toISOString(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
