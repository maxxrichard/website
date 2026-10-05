import "../site.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import BackToTop from "@/components/BackToTop";
import { getProfile, getSocialLinks } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [profile, socials] = await Promise.all([getProfile(), getSocialLinks()]);
  if (!profile) {
    return (
      <main style={{ padding: 40, fontFamily: "sans-serif" }}>
        <h1>Site not initialised</h1>
        <p>Run <code>npm run setup</code> to create and seed the database, then reload.</p>
      </main>
    );
  }
  return (
    <>
      <Header logo={profile.logo} name={profile.fullName} />
      <main>{children}</main>
      <Footer profile={profile} socials={socials} />
      <Reveal />
      <BackToTop />
    </>
  );
}
