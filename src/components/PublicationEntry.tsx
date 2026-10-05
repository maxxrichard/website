"use client";
import { useState } from "react";
import type { Publication } from "@/db/schema";

export default function PublicationEntry({ pub, authorsHtml }: { pub: Publication; authorsHtml: string }) {
  const [showAbstract, setShowAbstract] = useState(false);
  const doiUrl = pub.doi ? (pub.doi.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`) : null;
  const paper = pub.paperUrl ?? pub.pdfUrl ?? doiUrl;
  return (
    <article className="pub">
      <div>
        {pub.venueTag && <span className="pub-tag">{pub.venueTag}</span>}
        <h3 className="pub-title">{pub.title}</h3>
        <div className="pub-authors" dangerouslySetInnerHTML={{ __html: authorsHtml }} />
        <div className="pub-venue">{pub.venue}</div>
        {pub.award && <span className="pub-award">🏆 {pub.award}</span>}
        <div className="pub-actions">
          {pub.abstract && <button type="button" className="pill" aria-expanded={showAbstract} onClick={() => setShowAbstract((v) => !v)}>Abstract</button>}
          {paper && <a className="pill" href={paper} target="_blank" rel="noreferrer">Paper</a>}
          {pub.pdfUrl && pub.paperUrl && <a className="pill" href={pub.pdfUrl} target="_blank" rel="noreferrer">PDF</a>}
          {pub.codeUrl && <a className="pill" href={pub.codeUrl} target="_blank" rel="noreferrer">Code</a>}
          {pub.posterUrl && <a className="pill" href={pub.posterUrl} target="_blank" rel="noreferrer">Poster</a>}
          {pub.slidesUrl && <a className="pill" href={pub.slidesUrl} target="_blank" rel="noreferrer">Slides</a>}
          {pub.videoUrl && <a className="pill" href={pub.videoUrl} target="_blank" rel="noreferrer">Video</a>}
          {pub.bibtex && <a className="pill" href={`data:text/plain;charset=utf-8,${encodeURIComponent(pub.bibtex)}`} download={`${pub.title.slice(0, 40).replace(/\W+/g, "_")}.bib`}>BibTeX</a>}
        </div>
        {showAbstract && pub.abstract && <p className="pub-abstract">{pub.abstract}</p>}
      </div>
      <div className={`pub-figure${pub.image ? "" : " empty"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {pub.image && <img src={pub.image} alt={`Figure from ${pub.title}`} loading="lazy" />}
      </div>
    </article>
  );
}
