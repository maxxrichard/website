import { getPublications } from "@/lib/queries";
import { renderAuthors } from "@/lib/markdown";
import PublicationList from "@/components/PublicationList";

export const metadata = { title: "Publications" };

export default async function PublicationsPage() {
  const pubs = await getPublications();
  const items = pubs.map((p) => ({ ...p, authorsHtml: renderAuthors(p.authors) }));
  return (
    <article className="publications active" data-page="publications">
      <header><h2 className="h2 article-title">Publications</h2></header>
      <PublicationList items={items} />
    </article>
  );
}
