import Link from "next/link";
import { getProfile, getSocialLinks, getPublications, getNews } from "@/lib/queries";
import { renderMarkdown, renderAuthors, formatDateDots } from "@/lib/markdown";
import SocialIcons from "@/components/SocialIcons";

export default async function HomePage() {
  const [profile, socials, pubs, news] = await Promise.all([getProfile(), getSocialLinks(), getPublications(), getNews({ publishedOnly: true })]);
  if (!profile) return null;
  const recent = pubs.filter((p) => p.highlight).slice(0, 3);
  const heroImg = profile.heroImage ?? "/images/site/hero.jpg";

  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          {profile.heroVideo
            ? <video src={profile.heroVideo} poster={heroImg} autoPlay muted loop playsInline />
            // eslint-disable-next-line @next/next/no-img-element
            : <img src={heroImg} alt="" />}
        </div>
        <div className="container hero-content">
          <h1 className="hero-name">{profile.fullName}</h1>
          <p className="hero-sub">{profile.heroSubtitle ?? profile.jobTitle}</p>
          <SocialIcons socials={socials} />
          {profile.heroTagline && <p className="hero-tagline">{profile.heroTagline}</p>}
          {profile.heroText && <p className="hero-text">{profile.heroText}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container two-col about-home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="portrait" src={profile.avatar ?? "/images/site/portrait.jpg"} alt={profile.fullName} />
          <div>
            <h2 className="h-lg">About Me</h2>
            <div className="prose serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile.aboutMarkdown) }} />
            <div className="btn-row"><Link href="/about" className="btn">Discover More</Link></div>
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="section" style={{ paddingTop: 20 }}>
          <div className="container two-col pubs-home">
            <h2 className="h-lg">Recent<br />Publications</h2>
            <div>
              {recent.map((p) => (
                <p className="home-pub" key={p.id}>
                  <span className="pub-authors" dangerouslySetInnerHTML={{ __html: renderAuthors(p.authors) }} /> ({p.year}). {p.title}. <span className="pub-venue">{p.venue.replace(/\.$/, "")}</span>
                </p>
              ))}
              <Link href="/publications" className="btn">Explore All Publications</Link>
            </div>
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="section gray" style={{ background: "var(--white)" }}>
          <div className="container two-col news-home">
            <h2 className="h-lg">News</h2>
            <div className="news-list">
              {news.map((n) => (
                <p className="news-row" key={n.id}>
                  <b>{formatDateDots(n.date)}</b> - {n.url ? <a className="news-link" href={n.url} target="_blank" rel="noreferrer">{n.title}</a> : n.title}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
