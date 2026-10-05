import { getPress } from "@/lib/queries";
import { formatDate, toYouTubeEmbed } from "@/lib/markdown";

export const metadata = { title: "Press" };

export default async function PressPage() {
  const items = await getPress();
  return (
    <article className="press active" data-page="press">
      <header><h2 className="h2 article-title">Press Release</h2></header>
      {items.length === 0 ? <p className="empty-state">No press coverage yet.</p> : (
        <section className="blog-posts">
          <ul className="blog-posts-list">
            {items.map((p) => {
              const embed = toYouTubeEmbed(p.videoUrl);
              return (
                <li className="blog-post-item" key={p.id}>
                  <div>
                    <figure className="blog-banner-box">
                      {embed ? (
                        <div className="video">
                          <iframe src={embed} title={p.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                      ) : p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.title} loading="lazy" />
                      ) : <div className="blog-placeholder">▶</div>}
                    </figure>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <p className="blog-category">{p.outlet}</p>
                        <span className="dot" />
                        <time dateTime={p.date}>{formatDate(p.date)}</time>
                      </div>
                      <h3 className="h3 blog-item-title">{p.title}</h3>
                      <p className="blog-text">{p.description}</p>
                      {p.url && <a className="blog-external" href={p.url} target="_blank" rel="noreferrer">Read / watch the coverage ↗</a>}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </article>
  );
}
