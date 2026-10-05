import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) notFound();
  return (
    <article className="portfolio active" data-page="research">
      <Link href="/research" className="back-link">← Back to research</Link>
      <header><h2 className="h2 article-title">{p.title}</h2></header>
      <div className="detail-meta">
        <span>{p.category}</span>
        {p.status && <span>{p.status}</span>}
        {(p.startYear || p.endYear) && <span>{p.startYear}{p.endYear ? ` — ${p.endYear}` : " — Present"}</span>}
        {p.partners && <span>Partners: {p.partners}</span>}
        {p.url && <a href={p.url} target="_blank" rel="noreferrer">Project page ↗</a>}
        {p.codeUrl && <a href={p.codeUrl} target="_blank" rel="noreferrer">Code ↗</a>}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {p.image && <img className="detail-cover" src={p.image} alt={p.title} />}
      {p.summary && <p className="prose" style={{ color: "var(--white-2)", marginBottom: 20 }}>{p.summary}</p>}
      <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.contentMarkdown) }} />
    </article>
  );
}
