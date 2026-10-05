import type { Metadata } from "next";
import { Work_Sans, Cormorant_Garamond } from "next/font/google";
import "./base.css";
import { getProfile } from "@/lib/queries";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-sans", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProfile().catch(() => null);
  const title = p?.siteTitle ?? p?.fullName ?? "Maxx Richard Rahman";
  return {
    title: { default: title, template: `%s | ${p?.fullName ?? title}` },
    description: p?.siteDescription ?? p?.tagline ?? "Personal academic website",
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
    icons: { icon: "/favicon.ico" },
    openGraph: { title, description: p?.siteDescription ?? undefined, images: p?.avatar ? [p.avatar] : [] },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${workSans.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
