import { getProfile, getEducation, getExperience } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const [profile, edu, exp] = await Promise.all([getProfile(), getEducation(), getExperience()]);
  return (
    <>
      <section className="container about-top">
        <div>
          <h1 className="h-lg">About Me</h1>
          <div className="prose serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile?.aboutPageMarkdown ?? profile?.aboutMarkdown) }} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {profile?.aboutPageImage && <img src={profile.aboutPageImage} alt={`${profile.fullName} giving a talk`} />}
      </section>

      <section className="section gray">
        <div className="container cv-grid">
          <h2 className="h-lg">Education</h2>
          <div className="cv-list">
            {edu.map((e) => (
              <div key={e.id}>
                <div className="cv-years">{e.startYear} - {e.endYear ?? "Present"}</div>
                <div className="cv-title">{e.degree}</div>
                <div className="cv-org">{e.institution}{e.location ? `, ${e.location}` : ""}
                  {e.thesis && <div style={{ marginTop: 6, fontSize: 16 }}>Thesis: {e.thesis} {e.thesisUrl && <a className="underline" href={e.thesisUrl} target="_blank" rel="noreferrer">[Paper]</a>} {e.codeUrl && <a className="underline" href={e.codeUrl} target="_blank" rel="noreferrer">[Code]</a>}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cv-grid">
          <h2 className="h-lg">Experience</h2>
          <div className="cv-list">
            {exp.map((x) => (
              <div key={x.id}>
                <div className="cv-years">{x.startDate} - {x.endDate ?? "Present"}</div>
                <div className="cv-title">{x.role}</div>
                <div className="cv-org">{x.organizationUrl ? <a href={x.organizationUrl} target="_blank" rel="noreferrer">{x.organization}</a> : x.organization}{x.location ? `, ${x.location}` : ""}
                  {x.description && <div style={{ marginTop: 6, fontSize: 16 }}>{x.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
