import { siteOrigin } from "@/lib/site-url";

type Profile = {
  fullName: string;
  shortName?: string | null;
  jobTitle: string;
  siteDescription?: string | null;
  tagline?: string | null;
  avatar?: string | null;
  email?: string | null;
  affiliation?: string | null;
  affiliationUrl?: string | null;
  location?: string | null;
};
type Social = { url: string; platform: string };

/**
 * schema.org structured data (Person + WebSite) so search engines know the site is the
 * personal website of this person and can link it to the profiles listed under "sameAs".
 * Rendered once in the public site layout.
 */
export default function JsonLd({ profile, socials }: { profile: Profile; socials: Social[] }) {
  const base = siteOrigin();
  const abs = (u: string | null | undefined) => (u ? (u.startsWith("http") ? u : `${base}${u}`) : undefined);
  const sameAs = socials.map((s) => s.url).filter((u) => /^https?:\/\//.test(u) && !/^https?:\/\/(www\.)?[a-z]+\.com\/?$/i.test(u));
  const personId = `${base}/#person`;

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: profile.fullName,
    url: `${base}/`,
    jobTitle: profile.jobTitle,
    description: profile.siteDescription ?? profile.tagline ?? undefined,
    image: abs(profile.avatar),
    email: profile.email ? `mailto:${profile.email}` : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };
  if (profile.shortName && profile.shortName !== profile.fullName) person.alternateName = profile.shortName;
  if (profile.affiliation) {
    person.affiliation = { "@type": "Organization", name: profile.affiliation, url: profile.affiliationUrl ?? undefined };
    person.worksFor = person.affiliation;
  }
  if (profile.location) person.homeLocation = { "@type": "Place", name: profile.location };

  const website = {
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: `${base}/`,
    name: profile.fullName,
    description: profile.siteDescription ?? profile.tagline ?? undefined,
    about: { "@id": personId },
    publisher: { "@id": personId },
    inLanguage: "en",
  };

  const data = { "@context": "https://schema.org", "@graph": [person, website] };
  // JSON.stringify drops undefined values; escape "<" so the script cannot be closed early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
