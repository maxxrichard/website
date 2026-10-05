"use client";
import { useState } from "react";
import type { Publication } from "@/db/schema";

export type PubItem = Publication & { authorsHtml: string };

export default function PublicationEntry({ pub, index = 0 }: { pub: PubItem; index?: number }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const doiUrl = pub.doi ? (pub.doi.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`) : null;
  const paper = pub.paperUrl ?? pub.pdfUrl ?? doiUrl;
  const citation = `${pub.authors.replace(/\*\*/g, "")} (${pub.year}). ${pub.title}. ${pub.venue.replace(/\.$/, "")}.${doiUrl ? ` ${doiUrl}` : ""}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(citation); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* ignore */ }
  };
  return (
    <article className={`pub${open ? " open" : ""}`} data-reveal style={{ ["--i" as string]: index % 6 }}>
      <div className="pub-body">
        <div className="pub-head">
          {pub.venueTag && <span className="pub-tag">{pub.venueTag}</span>}
          {pub.award && <span className="pub-award">★ {pub.award}</span>}
          {pub.status !== "Published" && <span className="pub-status">{pub.status}</span>}
        </div>
        <h3 className="pub-title">{paper ? <a href={paper} target="_blank" rel="noreferrer">{pub.title}</a> : pub.title}</h3>
        <div className="pub-authors" dangerouslySetInnerHTML={{ __html: pub.authorsHtml }} />
        <div className="pub-venue">{pub.venue}</div>
        <div className="pub-actions">
          {pub.abstract && <button type="button" className={`pill${open ? " on" : ""}`} aria-expanded={open} onClick={() => setOpen((v) => !v)}>Abstract</button>}
          {paper && <a className="pill" href={paper} target="_blank" rel="noreferrer">Paper</a>}
          {pub.pdfUrl && pub.paperUrl && <a className="pill" href={pub.pdfUrl} target="_blank" rel="noreferrer">PDF</a>}
          {pub.codeUrl && <a className="pill" href={pub.codeUrl} target="_blank" rel="noreferrer">Code</a>}
          {pub.posterUrl && <a className="pill" href={pub.posterUrl} target="_blank" rel="noreferrer">Poster</a>}
          {pub.slidesUrl && <a className="pill" href={pub.slidesUrl} target="_blank" rel="noreferrer">Slides</a>}
          {pub.videoUrl && <a className="pill" href={pub.videoUrl} target="_blank" rel="noreferrer">Video</a>}
          <button type="button" className={`pill ghost${copied ? " on" : ""}`} onClick={copy}>{copied ? "Copied ✓" : "Cite"}</button>
        </div>
        {pub.abstract && (
          <div className="pub-abstract-wrap" aria-hidden={!open}><div><p className="pub-abstract">{pub.abstract}</p></div></div>
        )}
      </div>
      {pub.image && (
        <a className="pub-figure" href={paper ?? pub.image} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pub.image} alt="" loading="lazy" />
        </a>
      )}
    </article>
  );
}
