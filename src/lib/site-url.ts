/**
 * Public site URL, tolerant of common misconfiguration:
 * - adds https:// when the scheme is missing ("www.example.com")
 * - falls back to Vercel's deployment URL, then to localhost
 * Never throws, so a bad value cannot break the build.
 */
export function siteUrl(): URL {
  const candidates = [process.env.SITE_URL, process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL, process.env.VERCEL_URL, "http://localhost:3000"];
  for (const raw of candidates) {
    const v = raw?.trim();
    if (!v) continue;
    const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
    try { return new URL(withScheme); } catch { /* try next */ }
  }
  return new URL("http://localhost:3000");
}

export function siteOrigin(): string {
  return siteUrl().origin;
}
