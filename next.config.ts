import type { NextConfig } from "next";

const isStaging = process.env.NEXT_PUBLIC_ENV === 'staging';
const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "standalone",  // 🔥 utile pour Docker
    productionBrowserSourceMaps: isStaging,
    typescript : {
        tsconfigPath: isStaging || isDevelopment ? './tsconfig.json' : './tsconfig.prod.json',
    }
};

export default nextConfig;
