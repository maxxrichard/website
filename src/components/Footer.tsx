import type { Profile, SocialLink } from "@/db/schema";
import SocialIcons from "./SocialIcons";

export default function Footer({ profile, socials }: { profile: Profile; socials: SocialLink[] }) {
  return (
    <>
      <footer className="site-footer" id="contact">
        <div className="container footer-grid">
          <div>
            <h2 className="h-lg">Contact<br />Information</h2>
            <div className="footer-block">
              {profile.affiliation && <p>{profile.affiliationUrl ? <a href={profile.affiliationUrl} target="_blank" rel="noreferrer">{profile.affiliation}</a> : profile.affiliation}</p>}
              {(profile.addressLine1 || profile.addressLine2) && <p>{profile.addressLine1}<br />{profile.addressLine2}</p>}
              <p>
                {profile.email && <><a href={`mailto:${profile.email}`}>{profile.email}</a><br /></>}
                {profile.phone && <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>{profile.phone}</a>}
              </p>
              <SocialIcons socials={socials} />
            </div>
          </div>
          <div className="footer-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {profile.logo && <img src={profile.logo} alt={profile.fullName} />}
          </div>
          <div />
        </div>
      </footer>
      <div className="copyright">{profile.footerText ?? `©${new Date().getFullYear()} ${profile.fullName}. All rights reserved.`}</div>
    </>
  );
}
