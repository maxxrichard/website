import Link from "next/link";
import { getCounts, getMessages, getNews } from "@/lib/queries";
import { resourceList } from "@/lib/resources";

export default async function Dashboard() {
  const [counts, msgs, latestNews] = await Promise.all([getCounts(), getMessages(), getNews({ publishedOnly: false, limit: 5 })]);
  const stats = [
    ["Publications", counts.publications, "/admin/publications"], ["Projects", counts.projects, "/admin/projects"], ["News", counts.news, "/admin/news"],
    ["Blog posts", counts.blog, "/admin/blog"], ["Press", counts.press, "/admin/press"], ["Teaching", counts.teaching, "/admin/teaching"],
    ["Messages", counts.messages, "/admin/messages"], ["Unread messages", counts.unreadMessages, "/admin/messages"],
  ] as const;
  return (
    <>
      <div className="adm-header"><div><h1>Dashboard</h1><p>Manage everything that appears on the website.</p></div>
        <Link href="/" target="_blank" className="adm-btn">View website ↗</Link></div>
      <div className="adm-stats">
        {stats.map(([l, n, href]) => <Link key={l} href={href} className="adm-stat"><div className="n">{n}</div><div className="l">{l}</div></Link>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
        <section className="adm-card">
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Quick add</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {resourceList.map((r) => <Link key={r.key} href={`/admin/${r.key}/new`} className="adm-btn adm-btn-sm">+ {r.singular}</Link>)}
          </div>
        </section>
        <section className="adm-card">
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Latest messages</h2>
          {msgs.length === 0 ? <p className="adm-muted">No messages yet.</p> : msgs.slice(0, 5).map((m) => (
            <div key={m.id} className="adm-msg" style={{ padding: "10px 0" }}>
              <div className="meta"><strong style={{ color: "var(--adm-text)" }}>{m.fullName}</strong><span>{m.email}</span><span>{new Date(m.createdAt).toLocaleString()}</span>{!m.read && <span className="adm-badge off">new</span>}</div>
              <div className="body" style={{ margin: "4px 0 0" }}>{m.message.slice(0, 160)}{m.message.length > 160 ? "…" : ""}</div>
            </div>
          ))}
        </section>
        <section className="adm-card">
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Latest news items</h2>
          {latestNews.map((n) => <div key={n.id} style={{ padding: "6px 0", fontSize: 14 }}><span className="adm-muted">{n.date}</span> · <Link href={`/admin/news/${n.id}`}>{n.title}</Link></div>)}
        </section>
      </div>
    </>
  );
}
