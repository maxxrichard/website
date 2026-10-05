"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/blog", label: "Blog" },
  { href: "/teaching", label: "Teaching" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li className="navbar-item" key={item.href}>
              <Link href={item.href} className={`navbar-link${active ? " active" : ""}`}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
