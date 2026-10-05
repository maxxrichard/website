"use client";
import { useMemo, useState } from "react";
import type { Publication } from "@/db/schema";

type Item = Publication & { authorsHtml: string };

export default function PublicationList({ items }: { items: Item[] }) {
  const types = useMemo(() => ["All", ...Array.from(new Set(items.map((p) => p.type)))], [items]);
  const [selected, setSelected] = useState("All");
  const visible = selected === "All" ? items : items.filter((p) => p.type === selected);
  const years = Array.from(new Set(visible.map((p) => p.year))).sort((a, b) => b - a);

  return (
    <>
      <ul className="filter-list">
        {types.map((t) => (
          <li className="filter-item" key={t}><button className={selected === t ? "active" : ""} onClick={() => setSelected(t)}>{t}</button></li>
        ))}
      </ul>
      {years.map((y) => (
        <section key={y}>
          <h3 className="pub-year">{y}</h3>
          <ul className="pub-list">
            {visible.filter((p) => p.year === y).map((p) => (
              <li className="pub-item" key={p.id}>
                <span dangerouslySetInnerHTML={{ __html: p.authorsHtml }} /> ({p.year}). <span className="pub-title">{p.title}.</span>{" "}
                <span className="pub-venue">{p.venue}</span>.
                {p.status !== "Published" && <span className="pub-status">{p.status}</span>}
                {p.award && <div><span className="pub-award">🏆 {p.award}</span></div>}
                <div className="pub-links">
                  {p.paperUrl && <a href={p.paperUrl} target="_blank" rel="noreferrer">[Paper]</a>}
                  {p.pdfUrl && <a href={p.pdfUrl} target="_blank" rel="noreferrer">[PDF]</a>}
                  {p.codeUrl && <a href={p.codeUrl} target="_blank" rel="noreferrer">[Github]</a>}
                  {p.doi && <a href={p.doi.startsWith("http") ? p.doi : `https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">[DOI]</a>}
                </div>
                {p.abstract && (
                  <details className="pub-abstract"><summary>Abstract</summary><p>{p.abstract}</p></details>
                )}
                {p.bibtex && (
                  <details className="pub-abstract"><summary>BibTeX</summary><pre style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>{p.bibtex}</pre></details>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
      {visible.length === 0 && <p className="empty-state">No publications yet.</p>}
    </>
  );
}
