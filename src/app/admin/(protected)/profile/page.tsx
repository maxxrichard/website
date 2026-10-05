import { getProfile } from "@/lib/queries";
import { saveProfile } from "../actions";
import ImageField from "@/components/admin/ImageField";

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const p = await getProfile();
  const v = (k: keyof NonNullable<typeof p>) => (p && p[k] != null ? String(p[k]) : "");
  return (
    <>
      <div className="adm-header"><div><h1>Profile &amp; settings</h1><p>Sidebar details, the About Me text, contact page and site metadata.</p></div></div>
      {saved && <div className="adm-success">Profile saved.</div>}
      <form action={saveProfile} className="adm-card adm-form">
        <label className="half">Full name *<input name="fullName" defaultValue={v("fullName")} required /></label>
        <label className="half">Short name<input name="shortName" defaultValue={v("shortName")} /></label>
        <label className="half">Job title *<input name="jobTitle" defaultValue={v("jobTitle")} required placeholder="Research Scientist (AI)" /></label>
        <label className="half">Tagline<input name="tagline" defaultValue={v("tagline")} /></label>
        <label>Profile photo<ImageField name="avatar" defaultValue={v("avatar")} /></label>
        <label>About me (Markdown)<textarea name="aboutMarkdown" className="md" defaultValue={v("aboutMarkdown")} /><span className="help">Shown on the home page. Markdown supported.</span></label>
        <label className="half">Email<input name="email" type="email" defaultValue={v("email")} /></label>
        <label className="half">Secondary email<input name="secondaryEmail" type="email" defaultValue={v("secondaryEmail")} /></label>
        <label className="half">Phone<input name="phone" defaultValue={v("phone")} /></label>
        <label className="half">Location<input name="location" defaultValue={v("location")} /></label>
        <label className="half">Affiliation<input name="affiliation" defaultValue={v("affiliation")} /></label>
        <label className="half">Affiliation URL<input name="affiliationUrl" type="url" defaultValue={v("affiliationUrl")} /></label>
        <label>CV / Resume URL<input name="cvUrl" defaultValue={v("cvUrl")} placeholder="/uploads/cv.pdf or https://…" /></label>
        <label>Google Maps embed URL (contact page)<input name="mapEmbedUrl" defaultValue={v("mapEmbedUrl")} /><span className="help">e.g. https://www.google.com/maps?q=Saarbrücken,+Germany&amp;output=embed</span></label>
        <label className="half">Site title (browser tab)<input name="siteTitle" defaultValue={v("siteTitle")} /></label>
        <label className="half">Footer text<input name="footerText" defaultValue={v("footerText")} /></label>
        <label>Site description (SEO)<textarea name="siteDescription" defaultValue={v("siteDescription")} /></label>
        <div className="adm-form-actions"><span className="adm-muted">Last updated: {v("updatedAt") ? new Date(v("updatedAt")).toLocaleString() : "—"}</span><button className="adm-btn adm-btn-primary">Save profile</button></div>
      </form>
    </>
  );
}
