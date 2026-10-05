import { getNews } from "@/lib/queries";
import { formatDateDots, renderMarkdown } from "@/lib/markdown";

export const metadata = { title: "News" };

export default async function NewsPage() {
  const items = await getNews({ publishedOnly: true });
  return (
    <section className="container section two-col news-home">
      <div data-reveal><p className="eyebrow">Updates</p><h1 className="h-lg" style={{ marginTop: 10 }}>News</h1></div>
      <div className="news-list">
        {items.map((n, i) => (
          <div className="news-row" key={n.id} data-reveal style={{ ["--i" as string]: Math.min(i, 5) }}>
            <time dateTime={n.date}>{formatDateDots(n.date)}</time>
            <div>
              {n.url ? <a className="link-u" href={n.url} target="_blank" rel="noreferrer">{n.title}</a> : n.title}<span className="cat">{n.category}</span>
              {n.bodyMarkdown && <div className="prose" style={{ fontSize: 17, marginTop: 6 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(n.bodyMarkdown) }} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
