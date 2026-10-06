import type { Metadata } from "next";
import { Work_Sans, Forum } from "next/font/google";
import "./base.css";
import { getProfile } from "@/lib/queries";
import { siteUrl } from "@/lib/site-url";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600"], variable: "--font-sans", display: "swap" });
const forum = Forum({ subsets: ["latin"], weight: "400", variable: "--font-serif", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProfile().catch(() => null);
  const title = p?.siteTitle ?? p?.fullName ?? "Maxx Richard Rahman";
  return {
    title: { default: title, template: `%s | ${p?.fullName ?? title}` },
    description: p?.siteDescription ?? p?.tagline ?? "Personal academic website",
    metadataBase: siteUrl(),
    icons: { icon: "/favicon.ico" },
    openGraph: { title, description: p?.siteDescription ?? undefined, images: p?.avatar ? [p.avatar] : [] },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${workSans.variable} ${forum.variable}`}>
      <body>{children}</body>
    </html>
  );
}
