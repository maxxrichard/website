import { getProfile, getProjects } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";
import ResearchNav from "@/components/ResearchNav";

export const metadata = { title: "Research", description: "Research projects of Maxx Richard Rahman: anomaly detection, LLMs, anti-doping and healthcare analytics.", alternates: { canonical: "/research" } };

export default async function ResearchPage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  return (
    <section className="container research-grid">
      <aside className="research-side" data-reveal>
        <p className="eyebrow">Research</p>
        <h1 className="h-xl" style={{ marginTop: 10 }}>Research<br />Projects</h1>
        {profile?.researchIntro && <div className="intro serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile.researchIntro) }} />}
        <ResearchNav items={projects.map((p) => ({ slug: p.slug, title: p.title }))} />
      </aside>
      <div>
        {projects.map((p, i) => (
          <article className="project" key={p.id} id={p.slug} data-reveal>
            <h2 className="project-title"><span className="num">{String(i + 1).padStart(2, "0")}</span>{p.title}</h2>
            <p className="project-text">{p.summary}</p>
            {p.contentMarkdown && <div className="project-more prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.contentMarkdown) }} />}
            {p.url && <a className="project-link" href={p.url} target="_blank" rel="noreferrer">More info <span className="arr">→</span></a>}
            {p.image && (
              <a className="img-frame" href={p.url ?? p.image} target="_blank" rel="noreferrer" tabIndex={-1}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} loading="lazy" />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
