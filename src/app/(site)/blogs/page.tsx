import Link from "next/link";
import { getProfile, getBlogPosts } from "@/lib/queries";
import { renderMarkdown, formatDateDots } from "@/lib/markdown";

export const metadata = { title: "Blogs", description: "Blog posts by Maxx Richard Rahman.", alternates: { canonical: "/blogs" } };

export default async function BlogsPage() {
  const [profile, posts] = await Promise.all([getProfile(), getBlogPosts()]);
  return (
    <section className="list-wrap">
      <div data-reveal>
        <p className="eyebrow">Writing</p>
        <h1 className="h-xl" style={{ marginTop: 10 }}>Blog Posts</h1>
        {profile?.blogIntro && <div className="intro serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile.blogIntro) }} />}
      </div>
      <div className="media-list">
        {posts.map((p) => {
          const href = p.externalUrl ?? `/blogs/${p.slug}`;
          const external = Boolean(p.externalUrl);
          return (
            <article className="media-item" key={p.id} data-reveal>
              <div className="media-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.coverImage && <img src={p.coverImage} alt={p.title} loading="lazy" />}
              </div>
              <div>
                <div className="media-meta">{p.source ?? "Blog"} · {formatDateDots(p.publishedAt)}{p.readingMinutes ? ` · ${p.readingMinutes} min read` : ""}</div>
                <h2 className="media-title">
                  {external ? <a href={href} target="_blank" rel="noreferrer">{p.title}</a> : <Link href={href}>{p.title}</Link>}
                </h2>
                <p className="media-text">{p.excerpt}</p>
                {external ? <a className="btn" href={href} target="_blank" rel="noreferrer" style={{ marginTop: 22 }}>Read on {p.source ?? "the original site"} <span className="arr">→</span></a>
                  : <Link className="btn" href={href} style={{ marginTop: 22 }}>Read post <span className="arr">→</span></Link>}
              </div>
            </article>
          );
        })}
        {posts.length === 0 && <p className="empty">No posts yet.</p>}
      </div>
      <div className="after-list" />
    </section>
  );
}
