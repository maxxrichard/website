import Link from "next/link";
import { getProfile, getSocialLinks, getPublications, getNews, getProjects, getTeaching } from "@/lib/queries";
import { renderMarkdown, renderAuthors, formatDateDots } from "@/lib/markdown";
import SocialIcons from "@/components/SocialIcons";
import StatsStrip from "@/components/StatsStrip";

export default async function HomePage() {
  const [profile, socials, pubs, news, projects, teaching] = await Promise.all([
    getProfile(), getSocialLinks(), getPublications(), getNews({ publishedOnly: true }), getProjects(), getTeaching(),
  ]);
  if (!profile) return null;
  const recent = pubs.filter((p) => p.highlight).slice(0, 3);
  const poster = profile.heroImage ?? "/images/site/hero-poster.jpg";
  const firstYear = Math.min(...pubs.map((p) => p.year), new Date().getFullYear());
  const stats = [
    { label: "Publications", value: pubs.length },
    { label: "Research projects", value: projects.length },
    { label: "Courses taught", value: teaching.length },
    { label: "Years of research", value: Math.max(1, new Date().getFullYear() - firstYear + 1), suffix: "+" },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          {profile.heroVideo
            ? <video src={profile.heroVideo} poster={poster} autoPlay muted loop playsInline preload="metadata" />
            // eslint-disable-next-line @next/next/no-img-element
            : <img src={poster} alt="" />}
        </div>
        <div className="container hero-content">
          <h1 className="hero-name">{profile.fullName}</h1>
          <p className="hero-sub">{profile.heroSubtitle ?? profile.jobTitle}</p>
          <SocialIcons socials={socials} />
          {profile.heroTagline && <p className="hero-tagline">{profile.heroTagline}</p>}
          {profile.heroText && <p className="hero-text">{profile.heroText}</p>}
        </div>
        <div className="scroll-cue" aria-hidden="true" />
      </section>

      <div className="container"><StatsStrip stats={stats} /></div>

      <section className="section">
        <div className="container two-col about-home">
          <div className="portrait-wrap" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="portrait" src={profile.avatar ?? "/images/site/portrait.jpg"} alt={profile.fullName} />
          </div>
          <div data-reveal style={{ ["--i" as string]: 1 }}>
            <p className="eyebrow">Profile</p>
            <h2 className="h-lg" style={{ marginTop: 10 }}>About Me</h2>
            <div className="prose serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile.aboutMarkdown) }} />
            <div className="btn-row"><Link href="/about" className="btn">Discover More <span className="arr">→</span></Link></div>
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="section paper">
          <div className="container two-col pubs-home">
            <div data-reveal>
              <p className="eyebrow">Selected work</p>
              <h2 className="h-lg" style={{ marginTop: 10 }}>Recent<br />Publications</h2>
            </div>
            <div>
              {recent.map((p, i) => (
                <div className="home-pub" key={p.id} data-reveal style={{ ["--i" as string]: i + 1 }}>
                  <span className="pub-authors" dangerouslySetInnerHTML={{ __html: renderAuthors(p.authors) }} /> ({p.year}). <span className="pub-title">{p.title}.</span>{" "}
                  <span className="pub-venue">{p.venue.replace(/\.$/, "")}</span>
                </div>
              ))}
              <Link href="/publications" className="btn" data-reveal style={{ ["--i" as string]: 4 }}>Explore All Publications <span className="arr">→</span></Link>
            </div>
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="section">
          <div className="container two-col news-home">
            <div data-reveal>
              <p className="eyebrow">Updates</p>
              <h2 className="h-lg" style={{ marginTop: 10 }}>News</h2>
            </div>
            <div className="news-list">
              {news.map((n, i) => (
                <div className="news-row" key={n.id} data-reveal style={{ ["--i" as string]: Math.min(i, 5) }}>
                  <time dateTime={n.date}>{formatDateDots(n.date)}</time>
                  <div>{n.url ? <a className="link-u" href={n.url} target="_blank" rel="noreferrer">{n.title}</a> : n.title}<span className="cat">{n.category}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
