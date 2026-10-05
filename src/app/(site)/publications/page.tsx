import { getPublications } from "@/lib/queries";
import { renderAuthors } from "@/lib/markdown";
import PublicationEntry from "@/components/PublicationEntry";

export const metadata = { title: "Publications" };

export default async function PublicationsPage() {
  const pubs = await getPublications();
  const years = Array.from(new Set(pubs.map((p) => p.year))).sort((a, b) => b - a);
  return (
    <section className="pubs-wrap">
      <h1 className="h-xl">Publications</h1>
      {years.map((y) => (
        <div className="pub-year-block" key={y}>
          <h2 className="pub-year">{y}</h2>
          {pubs.filter((p) => p.year === y).map((p) => <PublicationEntry key={p.id} pub={p} authorsHtml={renderAuthors(p.authors)} />)}
        </div>
      ))}
      {pubs.length === 0 && <p>No publications yet.</p>}
    </section>
  );
}
