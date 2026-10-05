import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/queries";
import { renderMarkdown, formatDateDots } from "@/lib/markdown";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getBlogPostBySlug(slug);
  if (!p) notFound();
  return (
    <article className="article-wrap">
      <Link href="/blogs" className="underline" style={{ fontSize: 16 }}>← All posts</Link>
      <div className="meta" style={{ marginTop: 30 }}>{p.source ?? "Blog"}, {formatDateDots(p.publishedAt)}{p.readingMinutes ? ` · ${p.readingMinutes} min read` : ""}</div>
      <h1 className="h-lg">{p.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {p.coverImage && <img className="cover" src={p.coverImage} alt={p.title} />}
      <div className="prose serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.contentMarkdown) }} />
      {p.externalUrl && <p style={{ marginTop: 30 }}><a className="btn" href={p.externalUrl} target="_blank" rel="noreferrer">Read on {p.source ?? "original site"}</a></p>}
    </article>
  );
}
