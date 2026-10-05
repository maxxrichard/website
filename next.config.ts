import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Docker/VPS; Vercel uses its own build output.
  output: process.env.VERCEL ? undefined : "standalone",
  serverExternalPackages: ["@libsql/client"],
  images: { unoptimized: true },
  experimental: { serverActions: { bodySizeLimit: "20mb" } },
};

export default nextConfig;
