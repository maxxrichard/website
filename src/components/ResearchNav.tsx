"use client";
import { useEffect, useState } from "react";

export default function ResearchNav({ items }: { items: { slug: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.slug);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.slug)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-20% 0px -60% 0px", threshold: 0 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className="research-nav" aria-label="Projects">
      {items.map((i) => (
        <a key={i.slug} href={`#${i.slug}`} className={active === i.slug ? "active" : ""}
          onClick={(e) => { e.preventDefault(); document.getElementById(i.slug)?.scrollIntoView({ behavior: "smooth", block: "start" }); history.replaceState(null, "", `#${i.slug}`); }}>
          <span className="dot" />{i.title}
        </a>
      ))}
    </nav>
  );
}
