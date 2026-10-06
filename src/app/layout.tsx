import type { Metadata } from "next";
import { Work_Sans, Forum } from "next/font/google";
import "./base.css";
import { getProfile } from "@/lib/queries";
import { siteUrl } from "@/lib/site-url";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600"], variable: "--font-sans", display: "swap" });
const forum = Forum({ subsets: ["latin"], weight: "400", variable: "--font-serif", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProfile().catch(() => null);
  const name = p?.fullName ?? "Maxx Richard Rahman";
  const title = p?.siteTitle ?? name;
  const description = p?.siteDescription ?? p?.tagline ?? `${name} — ${p?.jobTitle ?? "personal academic website"}`;
  const image = p?.avatar ?? "/images/site/portrait.jpg";
  // Google Search Console "HTML tag" verification (optional). Set GOOGLE_SITE_VERIFICATION
  // to the content value Search Console shows, e.g. "AbC123…".
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  return {
    title: { default: title, template: `%s | ${name}` },
    description,
    metadataBase: siteUrl(),
    icons: { icon: "/favicon.ico" },
    // Explicitly allow indexing; admin pages opt out individually.
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: { type: "website", siteName: name, title, description, images: [image], locale: "en_US" },
    twitter: { card: "summary", title, description, images: [image] },
    ...(google ? { verification: { google } } : {}),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${workSans.variable} ${forum.variable}`}>
      <body>{children}</body>
    </html>
  );
}
