import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/queries";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL ?? "http://localhost:3000";
  const posts = await getBlogPosts().catch(() => []);
  const statics = ["", "/about", "/research", "/publications", "/teaching", "/media", "/blogs", "/contact", "/news"].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));
  return [
    ...statics,
    ...posts.filter((p) => !p.externalUrl).map((p) => ({ url: `${base}/blogs/${p.slug}`, lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date() })),
  ];
}
