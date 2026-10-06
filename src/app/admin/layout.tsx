import type { Metadata } from "next";

// The CMS (login + protected pages) must never appear in search results.
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false, nocache: true } };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
