import { getNews } from "@/lib/queries";
import { formatDateDots, renderMarkdown } from "@/lib/markdown";

export const metadata = { title: "News" };

export default async function NewsPage() {
  const items = await getNews({ publishedOnly: true });
  return (
    <section className="container section two-col news-home">
      <h1 className="h-lg">News</h1>
      <div className="news-list">
        {items.map((n) => (
          <div className="news-row" key={n.id}>
            <b>{formatDateDots(n.date)}</b> - {n.url ? <a className="news-link" href={n.url} target="_blank" rel="noreferrer">{n.title}</a> : n.title}
            {n.bodyMarkdown && <div className="prose" style={{ fontSize: 17, marginTop: 6 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(n.bodyMarkdown) }} />}
          </div>
        ))}
      </div>
    </section>
  );
}
