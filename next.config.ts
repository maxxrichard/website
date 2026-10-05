import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@libsql/client"],
  images: { unoptimized: true },
  experimental: { serverActions: { bodySizeLimit: "20mb" } },
};

export default nextConfig;
