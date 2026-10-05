"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds `.in` to every [data-reveal] element when it scrolls into view (staggered via --i).
 * Also watches the DOM so elements rendered later (filters, client updates) are animated too.
 */
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const show = (el: Element) => el.classList.add("in");
    if (reduce) {
      document.querySelectorAll("[data-reveal]").forEach(show);
      const mo = new MutationObserver(() => document.querySelectorAll("[data-reveal]:not(.in)").forEach(show));
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    const register = () => document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => io.observe(el));
    register();
    const mo = new MutationObserver(register);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [pathname]);
  return null;
}
