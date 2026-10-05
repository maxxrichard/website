"use client";
import { useState } from "react";
import type { Profile, SocialLink } from "@/db/schema";
import { socialIcons, IoMailOutline, IoPhonePortraitOutline, IoLocationOutline, IoChevronDown, IoDocumentTextOutline, IoBookOutline } from "./Icons";

export default function Sidebar({ profile, socials }: { profile: Profile; socials: SocialLink[] }) {
  const [open, setOpen] = useState(false);
  const nameParts = profile.fullName.split(" ");
  const last = nameParts.length > 1 ? nameParts.pop() : "";
  const first = nameParts.join(" ");

  return (
    <aside className={`sidebar${open ? " active" : ""}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.avatar ?? "/images/avatar.png"} alt={profile.fullName} width={80} />
        </figure>
        <div className="info-content">
          <h1 className="name" title={profile.fullName}>{first}{last ? <><br />{last}</> : null}</h1>
          <p className="title">{profile.jobTitle}</p>
        </div>
        <button className="info_more-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <span>{open ? "Hide Contacts" : "Show Contacts"}</span>
          <IoChevronDown />
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator" />
        <ul className="contacts-list">
          {profile.email && (
            <li className="contact-item">
              <div className="icon-box"><IoMailOutline /></div>
              <div className="contact-info">
                <p className="contact-title">Email</p>
                <a href={`mailto:${profile.email}`} className="contact-link">{profile.email}</a>
              </div>
            </li>
          )}
          {profile.phone && (
            <li className="contact-item">
              <div className="icon-box"><IoPhonePortraitOutline /></div>
              <div className="contact-info">
                <p className="contact-title">Phone</p>
                <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`} className="contact-link">{profile.phone}</a>
              </div>
            </li>
          )}
          {profile.affiliation && (
            <li className="contact-item">
              <div className="icon-box"><IoBookOutline /></div>
              <div className="contact-info">
                <p className="contact-title">Affiliation</p>
                {profile.affiliationUrl
                  ? <a href={profile.affiliationUrl} target="_blank" rel="noreferrer" className="contact-link">{profile.affiliation}</a>
                  : <address>{profile.affiliation}</address>}
              </div>
            </li>
          )}
          {profile.location && (
            <li className="contact-item">
              <div className="icon-box"><IoLocationOutline /></div>
              <div className="contact-info">
                <p className="contact-title">Location</p>
                <address>{profile.location}</address>
              </div>
            </li>
          )}
          {profile.cvUrl && (
            <li className="contact-item">
              <div className="icon-box"><IoDocumentTextOutline /></div>
              <div className="contact-info">
                <p className="contact-title">Resume / CV</p>
                <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="contact-link">Download CV</a>
              </div>
            </li>
          )}
        </ul>

        {socials.length > 0 && (
          <>
            <div className="separator" />
            <ul className="social-list">
              {socials.map((s) => {
                const Icon = socialIcons[s.platform.toLowerCase()] ?? socialIcons.link;
                return (
                  <li className="social-item" key={s.id}>
                    <a href={s.url} className="social-link" target="_blank" rel="noreferrer" title={s.label} aria-label={s.label}>
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </aside>
  );
}
