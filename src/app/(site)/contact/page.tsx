import { getProfile, getSocialLinks } from "@/lib/queries";
import SocialIcons from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const [profile, socials] = await Promise.all([getProfile(), getSocialLinks()]);
  if (!profile) return null;
  return (
    <section className="container contact-page">
      <div data-reveal>
        <p className="eyebrow">Get in touch</p>
        <h1 className="h-lg" style={{ marginTop: 10 }}>Contact<br />Information</h1>
        <div className="footer-block">
          {profile.affiliation && <p>{profile.affiliation}</p>}
          {(profile.addressLine1 || profile.addressLine2) && <p>{profile.addressLine1}<br />{profile.addressLine2}</p>}
          <p>
            {profile.email && <><a className="link-u" href={`mailto:${profile.email}`}>{profile.email}</a><br /></>}
            {profile.phone && <a className="link-u" href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>{profile.phone}</a>}
          </p>
          <SocialIcons socials={socials} />
        </div>
        {profile.mapEmbedUrl && <div className="map"><iframe src={profile.mapEmbedUrl} loading="lazy" title="Map" /></div>}
      </div>
      <div data-reveal style={{ ["--i" as string]: 1 }}>
        <p className="eyebrow">Message</p>
        <h2 className="h-md" style={{ margin: "10px 0 30px" }}>Send a message</h2>
        <ContactForm />
      </div>
    </section>
  );
}
