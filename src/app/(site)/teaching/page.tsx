import { getTeaching } from "@/lib/queries";

export const metadata = { title: "Teaching" };

export default async function TeachingPage() {
  const items = await getTeaching();
  return (
    <article className="teaching active" data-page="teaching">
      <header><h2 className="h2 article-title">Teaching</h2></header>
      {items.length === 0 ? <p className="empty-state">No teaching entries yet.</p> : (
        <ul className="teaching-list">
          {items.map((t) => (
            <li className="teaching-item" key={t.id}>
              <span className="teaching-term">{t.term}</span>
              <h3 className="teaching-course">{t.url ? <a href={t.url} target="_blank" rel="noreferrer">{t.course}</a> : t.course}</h3>
              <span className="teaching-role">{t.role}{t.institution ? ` · ${t.institution}` : ""}</span>
              {t.description && <p className="teaching-desc">{t.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
