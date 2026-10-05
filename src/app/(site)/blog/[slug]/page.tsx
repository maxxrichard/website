import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/queries";
import { renderMarkdown, formatDate } from "@/lib/markdown";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getBlogPostBySlug(slug);
  if (!p) notFound();
  return (
    <article className="blog active" data-page="blog">
      <Link href="/blog" className="back-link">← Back to blog</Link>
      <header><h2 className="h2 article-title">{p.title}</h2></header>
      <div className="detail-meta">
        <time dateTime={p.publishedAt}>{formatDate(p.publishedAt, { year: "numeric", month: "long", day: "numeric" })}</time>
        {p.readingMinutes ? <span>{p.readingMinutes} min read</span> : null}
        {p.tags && <span>{p.tags}</span>}
        {p.externalUrl && <a href={p.externalUrl} target="_blank" rel="noreferrer">Read on original site ↗</a>}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {p.coverImage && <img className="detail-cover" src={p.coverImage} alt={p.title} />}
      <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.contentMarkdown) }} />
    </article>
  );
}
