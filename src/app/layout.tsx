import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./base.css";
import { getProfile } from "@/lib/queries";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--ff-poppins-next", display: "swap" });

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
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
