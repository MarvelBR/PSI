import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/PSI",
  assetPrefix: "/PSI/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;