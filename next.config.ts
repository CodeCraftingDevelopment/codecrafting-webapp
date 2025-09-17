import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "standalone",  // 🔥 utile pour Docker
};

export default nextConfig;
