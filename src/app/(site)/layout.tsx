import "../vcard.css";
import "../site.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getProfile, getSocialLinks } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [profile, socials] = await Promise.all([getProfile(), getSocialLinks()]);
  if (!profile) {
    return (
      <main style={{ color: "#ddd", padding: 40, fontFamily: "sans-serif" }}>
        <h1>Site not initialised</h1>
        <p>Run <code>npm run setup</code> to create and seed the database, then reload.</p>
      </main>
    );
  }
  return (
    <main>
      <Sidebar profile={profile} socials={socials} />
      <div className="main-content">
        <Navbar />
        {children}
        <footer className="site-footer">
          {profile.footerText ?? `© ${new Date().getFullYear()} ${profile.fullName}`}
        </footer>
      </div>
    </main>
  );
}
