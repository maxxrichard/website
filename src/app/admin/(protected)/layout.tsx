import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { getCounts } from "@/lib/queries";
import { isEphemeral } from "@/db";
import { resourceList } from "@/lib/resources";
import { logout } from "../login/actions";
import "../admin.css";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  const counts = await getCounts();
  const countFor: Record<string, number> = {
    publications: counts.publications, projects: counts.projects, news: counts.news, blog: counts.blog, press: counts.press, teaching: counts.teaching,
  };
  const content = resourceList.filter((r) => ["publications", "projects", "news", "blog", "press", "teaching"].includes(r.key));
  const about = resourceList.filter((r) => ["education", "experience", "research-areas", "social-links"].includes(r.key));
  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <Link href="/admin" className="adm-brand">⚙ Site Admin</Link>
        <nav className="adm-nav">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/messages">Messages {counts.unreadMessages > 0 && <span className="adm-count">{counts.unreadMessages}</span>}</Link>
          <div className="adm-nav-group">Content</div>
          {content.map((r) => <Link key={r.key} href={`/admin/${r.key}`}>{r.label} <span className="adm-count">{countFor[r.key] ?? ""}</span></Link>)}
          <div className="adm-nav-group">About me</div>
          <Link href="/admin/profile">Profile &amp; settings</Link>
          {about.map((r) => <Link key={r.key} href={`/admin/${r.key}`}>{r.label}</Link>)}
          <div className="adm-nav-group">Site</div>
          <a href="/" target="_blank" rel="noreferrer">View website ↗</a>
          <form action={logout}><button className="adm-btn adm-btn-sm" style={{ marginTop: 10, marginLeft: 12 }}>Log out ({session.email})</button></form>
        </nav>
      </aside>
      <main className="adm-main">
        {isEphemeral && (
          <div className="adm-warning">
            <strong>Temporary database.</strong> This host has a read-only filesystem, so the site is running from a copy of the
            seed content in temporary storage. Edits made here will be lost when the server restarts. For permanent storage set
            <code> DATABASE_URL</code> (and <code>DATABASE_AUTH_TOKEN</code>) to a Turso/libSQL database — see README, section 6.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
