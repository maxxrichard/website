import { getProfile, getSocialLinks } from "@/lib/queries";
import SocialIcons from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const [profile, socials] = await Promise.all([getProfile(), getSocialLinks()]);
  if (!profile) return null;
  return (
    <section className="container contact-page">
      <div>
        <h1 className="h-lg">Contact<br />Information</h1>
        <div className="footer-block">
          {profile.affiliation && <p>{profile.affiliation}</p>}
          {(profile.addressLine1 || profile.addressLine2) && <p>{profile.addressLine1}<br />{profile.addressLine2}</p>}
          <p>
            {profile.email && <><a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a><br /></>}
            {profile.phone && <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>{profile.phone}</a>}
          </p>
          <SocialIcons socials={socials} />
        </div>
        {profile.mapEmbedUrl && <div className="map"><iframe src={profile.mapEmbedUrl} loading="lazy" title="Map" /></div>}
      </div>
      <div>
        <h2 className="h-md" style={{ marginBottom: 30 }}>Send a message</h2>
        <ContactForm />
      </div>
    </section>
  );
}
