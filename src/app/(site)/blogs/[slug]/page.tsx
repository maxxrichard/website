import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/queries";
import { renderMarkdown, formatDateDots } from "@/lib/markdown";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBlogPostBySlug(slug).catch(() => null);
  if (!p) return { title: "Post not found" };
  const description = p.excerpt || undefined;
  return {
    title: p.title,
    description,
    alternates: { canonical: `/blogs/${p.slug}` },
    openGraph: { type: "article", title: p.title, description, publishedTime: p.publishedAt, images: p.coverImage ? [p.coverImage] : undefined },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getBlogPostBySlug(slug);
  if (!p) notFound();
  return (
    <article className="article-wrap">
      <Link href="/blogs" className="link-u" style={{ fontFamily: "var(--sans)", fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase" }}>← All posts</Link>
      <div className="meta">{p.source ?? "Blog"} · {formatDateDots(p.publishedAt)}{p.readingMinutes ? ` · ${p.readingMinutes} min read` : ""}</div>
      <h1 className="h-lg">{p.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {p.coverImage && <img className="cover" src={p.coverImage} alt={p.title} />}
      <div className="prose serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.contentMarkdown) }} />
      {p.externalUrl && <p style={{ marginTop: 30 }}><a className="btn" href={p.externalUrl} target="_blank" rel="noreferrer">Read on {p.source ?? "original site"} <span className="arr">→</span></a></p>}
    </article>
  );
}
