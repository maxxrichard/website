import Link from "next/link";
import { getBlogPosts } from "@/lib/queries";
import { formatDate } from "@/lib/markdown";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <article className="blog active" data-page="blog">
      <header><h2 className="h2 article-title">Blog</h2></header>
      {posts.length === 0 ? <p className="empty-state">No posts yet.</p> : (
        <section className="blog-posts">
          <ul className="blog-posts-list">
            {posts.map((p) => (
              <li className="blog-post-item" key={p.id}>
                <Link href={`/blog/${p.slug}`}>
                  <figure className="blog-banner-box">
                    {p.coverImage
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={p.coverImage} alt={p.title} loading="lazy" />
                      : <div className="blog-placeholder">✎</div>}
                  </figure>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <p className="blog-category">{p.tags?.split(",")[0]?.trim() || "Blog"}</p>
                      <span className="dot" />
                      <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                      {p.readingMinutes ? <><span className="dot" /><span>{p.readingMinutes} min read</span></> : null}
                    </div>
                    <h3 className="h3 blog-item-title">{p.title}</h3>
                    <p className="blog-text">{p.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
