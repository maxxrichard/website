import Link from "next/link";
export default function NotFound() {
  return (
    <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", fontFamily: "sans-serif", textAlign: "center" }}>
      <div><h1 style={{ fontSize: 48, marginBottom: 10, fontWeight: 300 }}>404</h1><p>Page not found.</p><p><Link href="/" style={{ textDecoration: "underline" }}>Back to home</Link></p></div>
    </main>
  );
}
