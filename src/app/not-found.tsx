import Link from "next/link";
export default function NotFound() {
  return (
    <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", color: "#ddd", fontFamily: "sans-serif", textAlign: "center" }}>
      <div><h1 style={{ fontSize: 48, marginBottom: 10 }}>404</h1><p>Page not found.</p><p><Link href="/" style={{ color: "#ffdb70" }}>Back to home</Link></p></div>
    </main>
  );
}
