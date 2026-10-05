"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/db/schema";
import { IoEyeOutline, IoChevronDown } from "./Icons";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [selected, setSelected] = useState("All");
  const [open, setOpen] = useState(false);
  const visible = selected === "All" ? projects : projects.filter((p) => p.category === selected);

  return (
    <section className="projects">
      <ul className="filter-list">
        {categories.map((c) => (
          <li className="filter-item" key={c}>
            <button className={selected === c ? "active" : ""} onClick={() => setSelected(c)}>{c}</button>
          </li>
        ))}
      </ul>
      <div className="filter-select-box">
        <button className={`filter-select${open ? " active" : ""}`} onClick={() => setOpen((v) => !v)}>
          <div className="select-value">{selected}</div>
          <div className="select-icon"><IoChevronDown /></div>
        </button>
        <ul className="select-list">
          {categories.map((c) => (
            <li className="select-item" key={c}>
              <button onClick={() => { setSelected(c); setOpen(false); }}>{c}</button>
            </li>
          ))}
        </ul>
      </div>

      <ul className="project-list">
        {visible.map((p) => (
          <li className="project-item active" key={p.id}>
            <Link href={`/research/${p.slug}`}>
              <figure className="project-img">
                <div className="project-item-icon-box"><IoEyeOutline /></div>
                {p.image
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={p.image} alt={p.title} loading="lazy" />
                  : <div className="project-placeholder">{p.title.slice(0, 1)}</div>}
              </figure>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-category">{p.category}{p.status ? ` · ${p.status}` : ""}</p>
              {p.summary && <p className="project-summary">{p.summary}</p>}
            </Link>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="empty-state">No projects in this category.</p>}
    </section>
  );
}
