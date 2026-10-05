import { getProfile, getEducation, getExperience } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const [profile, edu, exp] = await Promise.all([getProfile(), getEducation(), getExperience()]);
  return (
    <>
      <section className="container about-top">
        <div data-reveal>
          <p className="eyebrow">About</p>
          <h1 className="h-lg" style={{ marginTop: 10 }}>About Me</h1>
          <div className="prose serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile?.aboutPageMarkdown ?? profile?.aboutMarkdown) }} />
        </div>
        {profile?.aboutPageImage && (
          <div className="img-frame" data-reveal style={{ ["--i" as string]: 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.aboutPageImage} alt={`${profile.fullName} giving a talk`} />
          </div>
        )}
      </section>

      <section className="section paper">
        <div className="container cv-grid">
          <div data-reveal><p className="eyebrow">Academic path</p><h2 className="h-lg" style={{ marginTop: 10 }}>Education</h2></div>
          <div className="cv-list">
            {edu.map((e, i) => (
              <div className="cv-item" key={e.id} data-reveal style={{ ["--i" as string]: i }}>
                <div className="cv-years">{e.startYear} – {e.endYear ?? "Present"}</div>
                <div>
                  <h3 className="cv-title">{e.degree}</h3>
                  <div className="cv-org">{e.institution}{e.location ? `, ${e.location}` : ""}</div>
                  {e.thesis && <div className="cv-note">Thesis: {e.thesis} {e.thesisUrl && <a className="link-u" href={e.thesisUrl} target="_blank" rel="noreferrer">[Paper]</a>} {e.codeUrl && <a className="link-u" href={e.codeUrl} target="_blank" rel="noreferrer">[Code]</a>}</div>}
                  {e.description && <div className="cv-note">{e.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cv-grid">
          <div data-reveal><p className="eyebrow">Positions</p><h2 className="h-lg" style={{ marginTop: 10 }}>Experience</h2></div>
          <div className="cv-list">
            {exp.map((x, i) => (
              <div className="cv-item" key={x.id} data-reveal style={{ ["--i" as string]: i }}>
                <div className="cv-years">{x.startDate} – {x.endDate ?? "Present"}</div>
                <div>
                  <h3 className="cv-title">{x.role}</h3>
                  <div className="cv-org">{x.organizationUrl ? <a className="link-u" href={x.organizationUrl} target="_blank" rel="noreferrer">{x.organization}</a> : x.organization}{x.location ? `, ${x.location}` : ""}</div>
                  {x.description && <div className="cv-note">{x.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
