import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  allowedDevOrigins: ["172.16.1.7"],
};

export default nextConfig;
