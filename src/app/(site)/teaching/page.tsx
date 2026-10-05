import { getProfile, getTeaching } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";

export const metadata = { title: "Teaching" };

export default async function TeachingPage() {
  const [profile, items] = await Promise.all([getProfile(), getTeaching()]);
  return (
    <section className="container teaching-wrap">
      <h1 className="h-xl">Teaching</h1>
      {profile?.teachingIntro && <div className="intro serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile.teachingIntro) }} />}
      <div className="teaching-grid">
        {items.map((t) => {
          const terms = (t.terms ?? t.term).split(",").map((s) => s.trim()).filter(Boolean);
          return (
            <article className="course" key={t.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {t.image && <img src={t.image} alt={t.course} loading="lazy" />}
              <h2 className="course-title">{t.url ? <a href={t.url} target="_blank" rel="noreferrer">{t.course}</a> : t.course}</h2>
              {t.description && <p className="course-text">{t.description}</p>}
              <div className="course-terms">{terms.map((term) => <span className="pill static" key={term}>{term}</span>)}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
