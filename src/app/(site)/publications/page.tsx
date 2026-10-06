import { getPublications } from "@/lib/queries";
import { renderAuthors } from "@/lib/markdown";
import PublicationsBrowser from "@/components/PublicationsBrowser";

export const metadata = { title: "Publications", description: "Publications by Maxx Richard Rahman: papers, theses, posters and code.", alternates: { canonical: "/publications" } };

export default async function PublicationsPage() {
  const pubs = await getPublications();
  const items = pubs.map((p) => ({ ...p, authorsHtml: renderAuthors(p.authors) }));
  return (
    <section className="pubs-wrap">
      <div className="page-head" data-reveal>
        <p className="eyebrow">Research output</p>
        <h1 className="h-xl" style={{ marginTop: 10 }}>Publications</h1>
        <p className="lead">Peer-reviewed papers, book chapters and theses. Filter by type or year, search, open abstracts, and copy a citation with one click.</p>
      </div>
      <PublicationsBrowser items={items} />
    </section>
  );
}
