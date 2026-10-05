import { getNews } from "@/lib/queries";
import { renderMarkdown, formatDate } from "@/lib/markdown";

export const metadata = { title: "News" };

export default async function NewsPage() {
  const items = await getNews({ publishedOnly: true });
  return (
    <article className="news active" data-page="news">
      <header><h2 className="h2 article-title">News</h2></header>
      {items.length === 0 ? <p className="empty-state">No news yet.</p> : (
        <ul className="news-list">
          {items.map((n) => (
            <li className="news-item" key={n.id}>
              <div>
                <time className="news-date" dateTime={n.date}>{formatDate(n.date)}</time>
                <span className="news-cat">{n.category}</span>
              </div>
              <div>
                <h3 className="news-title">{n.url ? <a href={n.url} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>{n.title}</a> : n.title}</h3>
                <div className="news-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(n.bodyMarkdown) }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
