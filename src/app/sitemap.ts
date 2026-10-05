import type { MetadataRoute } from "next";
import { getProjects, getBlogPosts } from "@/lib/queries";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL ?? "http://localhost:3000";
  const [projects, posts] = await Promise.all([getProjects().catch(() => []), getBlogPosts().catch(() => [])]);
  const statics = ["", "/news", "/research", "/publications", "/blog", "/teaching", "/press", "/contact"].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));
  return [
    ...statics,
    ...projects.map((p) => ({ url: `${base}/research/${p.slug}`, lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date() })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date() })),
  ];
}
