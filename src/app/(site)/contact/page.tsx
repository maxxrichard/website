import { getProfile } from "@/lib/queries";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const profile = await getProfile();
  return (
    <article className="contact active" data-page="contact">
      <header><h2 className="h2 article-title">Contact</h2></header>
      {profile?.mapEmbedUrl && (
        <section className="mapbox"><figure><iframe src={profile.mapEmbedUrl} width={400} height={300} loading="lazy" title="Location map" /></figure></section>
      )}
      <p className="contact-direct">
        {profile?.email && <>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a><br /></>}
        {profile?.secondaryEmail && <>Alternative: <a href={`mailto:${profile.secondaryEmail}`}>{profile.secondaryEmail}</a><br /></>}
        {profile?.affiliation && <>{profile.affiliation}<br /></>}
        {profile?.location}
      </p>
      <ContactForm />
    </article>
  );
}
