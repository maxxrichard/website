import { getProfile, getTeaching } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";

export const metadata = { title: "Teaching" };

export default async function TeachingPage() {
  const [profile, items] = await Promise.all([getProfile(), getTeaching()]);
  return (
    <section className="container teaching-wrap">
      <div data-reveal>
        <p className="eyebrow" style={{ textAlign: "center" }}>Courses &amp; seminars</p>
        <h1 className="h-xl" style={{ marginTop: 10 }}>Teaching</h1>
        {profile?.teachingIntro && <div className="intro serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile.teachingIntro) }} />}
      </div>
      <div className="teaching-grid">
        {items.map((t, i) => {
          const terms = (t.terms ?? t.term).split(",").map((s) => s.trim()).filter(Boolean);
          return (
            <article className="course" key={t.id} data-reveal style={{ ["--i" as string]: i % 3 }}>
              {t.image && (
                <div className="course-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image} alt={t.course} loading="lazy" />
                </div>
              )}
              <div className="course-body">
                <h2 className="course-title">{t.url ? <a className="link-u" href={t.url} target="_blank" rel="noreferrer">{t.course}</a> : t.course}</h2>
                {t.description && <p className="course-text">{t.description}</p>}
                <div className="course-terms">{terms.map((term) => <span className="pill static" key={term}>{term}</span>)}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
