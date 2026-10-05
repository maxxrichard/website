import Link from "next/link";
import { getProfile, getBlogPosts } from "@/lib/queries";
import { renderMarkdown, formatDateDots } from "@/lib/markdown";

export const metadata = { title: "Blogs" };

export default async function BlogsPage() {
  const [profile, posts] = await Promise.all([getProfile(), getBlogPosts()]);
  return (
    <section className="list-wrap">
      <h1 className="h-xl">Blog Posts</h1>
      {profile?.blogIntro && <div className="intro serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile.blogIntro) }} />}
      <hr className="list-divider" />
      <div className="media-list">
        {posts.map((p) => {
          const href = p.externalUrl ?? `/blogs/${p.slug}`;
          const external = Boolean(p.externalUrl);
          return (
            <article className="media-item" key={p.id}>
              <div className="media-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.coverImage && <img src={p.coverImage} alt={p.title} loading="lazy" />}
              </div>
              <div>
                <div className="media-meta">{p.source ?? "Blog"}, {formatDateDots(p.publishedAt)}</div>
                <h2 className="media-title">
                  {external ? <a href={href} target="_blank" rel="noreferrer" className="link">{p.title}</a> : <Link href={href} className="link">{p.title}</Link>}
                </h2>
                <p className="media-text" style={{ textAlign: "left" }}>{p.excerpt}</p>
              </div>
            </article>
          );
        })}
        {posts.length === 0 && <p style={{ padding: "40px 0" }}>No posts yet.</p>}
      </div>
      <div className="after-list" />
    </section>
  );
}
