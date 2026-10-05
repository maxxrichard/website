import Link from "next/link";
import { getProfile, getEducation, getExperience, getResearchAreas, getNews } from "@/lib/queries";
import { renderMarkdown, formatDate } from "@/lib/markdown";
import { areaIcons, IoBookOutline, IoBriefcaseOutline, IoNewspaperOutline } from "@/components/Icons";

export const metadata = { title: "About" };

export default async function HomePage() {
  const [profile, edu, exp, areas, recentNews] = await Promise.all([
    getProfile(), getEducation(), getExperience(), getResearchAreas(), getNews({ publishedOnly: true, limit: 4 }),
  ]);

  return (
    <article className="about active" data-page="home">
      <header><h2 className="h2 article-title">About Me</h2></header>

      <section className="about-text" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile?.aboutMarkdown) }} />

      {areas.length > 0 && (
        <section className="service">
          <h3 className="h3 service-title">What I&apos;m doing</h3>
          <ul className="service-list">
            {areas.map((a) => {
              const Icon = areaIcons[a.icon] ?? areaIcons.flask;
              return (
                <li className="service-item" key={a.id}>
                  <div className="service-icon-box"><Icon /></div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">{a.title}</h4>
                    <p className="service-item-text">{a.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {edu.length > 0 && (
        <section className="timeline">
          <div className="title-wrapper">
            <div className="icon-box"><IoBookOutline /></div>
            <h3 className="h3">Education</h3>
          </div>
          <ol className="timeline-list">
            {edu.map((e) => (
              <li className="timeline-item" key={e.id}>
                <h4 className="h4 timeline-item-title">{e.degree} - <i>{e.institution}{e.location ? `, ${e.location}` : ""}</i></h4>
                <span>{e.startYear}{e.endYear ? ` — ${e.endYear}` : " — Present"}</span>
                <p className="timeline-text">
                  {e.thesis && (<><b>Thesis:</b> {e.thesis}{" "}
                    {e.thesisUrl && <a className="publication-links" href={e.thesisUrl} target="_blank" rel="noreferrer">[Paper]</a>}
                    {e.codeUrl && <a className="publication-links" href={e.codeUrl} target="_blank" rel="noreferrer">[Github]</a>}<br /></>)}
                  {e.coursework && (<><b>Selected Coursework:</b> {e.coursework}<br /></>)}
                  {e.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {exp.length > 0 && (
        <section className="timeline">
          <div className="title-wrapper">
            <div className="icon-box"><IoBriefcaseOutline /></div>
            <h3 className="h3">Experience</h3>
          </div>
          <ol className="timeline-list">
            {exp.map((x) => (
              <li className="timeline-item" key={x.id}>
                <h4 className="h4 timeline-item-title">{x.role} - <i>{x.organizationUrl ? <a href={x.organizationUrl} target="_blank" rel="noreferrer" style={{ display: "inline" }}>{x.organization}</a> : x.organization}{x.location ? `, ${x.location}` : ""}</i></h4>
                <span>{x.startDate}{x.endDate ? ` — ${x.endDate}` : " — Present"}</span>
                {x.description && <p className="timeline-text">{x.description}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {recentNews.length > 0 && (
        <section className="timeline home-news">
          <div className="title-wrapper">
            <div className="icon-box"><IoNewspaperOutline /></div>
            <h3 className="h3">Recent News</h3>
          </div>
          <ol className="timeline-list">
            {recentNews.map((n) => (
              <li className="timeline-item" key={n.id}>
                <h4 className="h4 timeline-item-title">{n.title}</h4>
                <span>{formatDate(n.date)}</span>
                <div className="timeline-text news-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(n.bodyMarkdown) }} />
              </li>
            ))}
          </ol>
          <Link href="/news" className="more-link">All news →</Link>
        </section>
      )}
    </article>
  );
}
