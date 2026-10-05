"use client";
import { useDeferredValue, useMemo, useState } from "react";
import PublicationEntry, { type PubItem } from "./PublicationEntry";

export default function PublicationsBrowser({ items }: { items: PubItem[] }) {
  const [type, setType] = useState("All");
  const [year, setYear] = useState<number | "All">("All");
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q.trim().toLowerCase());
  const types = useMemo(() => ["All", ...Array.from(new Set(items.map((p) => p.type)))], [items]);
  const years = useMemo(() => Array.from(new Set(items.map((p) => p.year))).sort((a, b) => b - a), [items]);
  const filtered = items.filter((p) =>
    (type === "All" || p.type === type) && (year === "All" || p.year === year) &&
    (!dq || `${p.title} ${p.authors} ${p.venue} ${p.venueTag ?? ""} ${p.abstract ?? ""}`.toLowerCase().includes(dq)));
  const shownYears = Array.from(new Set(filtered.map((p) => p.year))).sort((a, b) => b - a);

  return (
    <>
      <div className="pub-toolbar" data-reveal>
        <div className="chips" role="tablist" aria-label="Publication type">
          {types.map((t) => <button key={t} role="tab" aria-selected={type === t} className={`chip${type === t ? " on" : ""}`} onClick={() => setType(t)}>{t}</button>)}
        </div>
        <div className="toolbar-row">
          <div className="chips years" aria-label="Year">
            <button className={`chip${year === "All" ? " on" : ""}`} onClick={() => setYear("All")}>All years</button>
            {years.map((y) => <button key={y} className={`chip${year === y ? " on" : ""}`} onClick={() => setYear(year === y ? "All" : y)}>{y}</button>)}
          </div>
          <label className="search">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, author, venue…" aria-label="Search publications" />
            {q && <button type="button" className="clear" aria-label="Clear" onClick={() => setQ("")}>×</button>}
          </label>
        </div>
        <div className="pub-count" aria-live="polite">{filtered.length} of {items.length} publications</div>
      </div>

      {shownYears.map((y) => (
        <section className="pub-year-block" key={y}>
          <h2 className="pub-year" data-reveal><span>{y}</span></h2>
          {filtered.filter((p) => p.year === y).map((p, i) => <PublicationEntry key={p.id} pub={p} index={i} />)}
        </section>
      ))}
      {filtered.length === 0 && <p className="empty">Nothing matches. Try another filter or search term.</p>}
    </>
  );
}
