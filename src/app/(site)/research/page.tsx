import { getProfile, getProjects } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";

export const metadata = { title: "Research" };

export default async function ResearchPage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  return (
    <section className="container research-grid">
      <div>
        <h1 className="h-xl">Research<br />Projects</h1>
        {profile?.researchIntro && <div className="intro serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile.researchIntro) }} />}
      </div>
      <div>
        {projects.map((p) => (
          <article className="project" key={p.id} id={p.slug}>
            <h2 className="project-title">{p.title}</h2>
            <p className="project-text">
              {p.summary}{" "}
              {p.url && <a href={p.url} target="_blank" rel="noreferrer">More info</a>}
            </p>
            {p.contentMarkdown && <div className="project-more prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.contentMarkdown) }} />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {p.image && <img src={p.image} alt={p.title} loading="lazy" />}
          </article>
        ))}
      </div>
    </section>
  );
}
