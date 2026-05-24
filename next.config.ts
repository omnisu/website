import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  experimental: {
    viewTransition: true,
    optimizePackageImports: ["@base-ui/react", "lucide-react"]
  },

  images: {
    unoptimized: true,
  }
};

export default nextConfig;
