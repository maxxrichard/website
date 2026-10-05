import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Docker/VPS; Vercel uses its own build output.
  output: process.env.VERCEL ? undefined : "standalone",
  serverExternalPackages: ["@libsql/client"],
  images: { unoptimized: true },
  experimental: { serverActions: { bodySizeLimit: "20mb" } },
  async redirects() {
    return [
      { source: "/press", destination: "/media", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/blog/:slug", destination: "/blogs/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
