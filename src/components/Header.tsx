"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";

export default function Header({ logo, name }: { logo: string | null; name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.body.classList.toggle("nav-open", open); return () => document.body.classList.remove("nav-open"); }, [open]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <Link href="/" className="logo" aria-label={name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logo ? <img src={logo} alt={name} /> : <span className="logo-text">{name}</span>}
        </Link>
        <button className={`nav-toggle${open ? " open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
        <nav className={`site-nav${open ? " open" : ""}`}>
          {NAV_ITEMS.map((item, i) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} className={active ? "active" : ""} style={{ ["--i" as string]: i }}>{item.label}</Link>;
          })}
        </nav>
      </div>
    </header>
  );
}
