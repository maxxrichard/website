import { getProjects, getResearchAreas } from "@/lib/queries";
import ProjectGrid from "@/components/ProjectGrid";
import { areaIcons } from "@/components/Icons";

export const metadata = { title: "Research" };

export default async function ResearchPage() {
  const [projects, areas] = await Promise.all([getProjects(), getResearchAreas()]);
  return (
    <article className="portfolio active" data-page="research">
      <header><h2 className="h2 article-title">Research</h2></header>
      {areas.length > 0 && (
        <section className="service" style={{ marginBottom: 35 }}>
          <h3 className="h3 service-title">Research Interests</h3>
          <ul className="service-list">
            {areas.map((a) => { const Icon = areaIcons[a.icon] ?? areaIcons.flask; return (
              <li className="service-item" key={a.id}>
                <div className="service-icon-box"><Icon /></div>
                <div className="service-content-box">
                  <h4 className="h4 service-item-title">{a.title}</h4>
                  <p className="service-item-text">{a.description}</p>
                </div>
              </li>); })}
          </ul>
        </section>
      )}
      <h3 className="h3 service-title">Projects</h3>
      <ProjectGrid projects={projects} />
    </article>
  );
}
