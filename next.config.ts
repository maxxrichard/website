import type { NextConfig } from "next";

/**
 * Canonical host redirect. The site is reachable both as "maxxrichard.com" and
 * "www.maxxrichard.com"; search engines then index two copies and split the ranking
 * between them. Whichever host SITE_URL names is the canonical one and the other
 * host redirects to it permanently. No SITE_URL (local dev) → no redirect.
 *
 * Not applied on Vercel: there the redirect is configured on the domain itself
 * (Project → Settings → Domains, "Redirect to …"). Doing both would loop forever
 * whenever SITE_URL and the Vercel domain settings disagree on the www prefix.
 */
function canonicalHostRedirects() {
  if (process.env.VERCEL) return [];
  const raw = (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
  if (!raw) return [];
  let url: URL;
  try { url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`); } catch { return []; }
  const host = url.hostname;
  if (host === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return [];
  const other = host.startsWith("www.") ? host.slice(4) : `www.${host}`;
  return [{
    source: "/:path*",
    has: [{ type: "host" as const, value: other }],
    destination: `${url.protocol}//${host}/:path*`,
    permanent: true,
  }];
}

const nextConfig: NextConfig = {
  // Standalone output for Docker/VPS; Vercel uses its own build output.
  output: process.env.VERCEL ? undefined : "standalone",
  serverExternalPackages: ["@libsql/client"],
  images: { unoptimized: true },
  experimental: { serverActions: { bodySizeLimit: "20mb" } },
  async redirects() {
    return [
      ...canonicalHostRedirects(),
      { source: "/press", destination: "/media", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/blog/:slug", destination: "/blogs/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
