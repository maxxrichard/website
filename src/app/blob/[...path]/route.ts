import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { blobEnabled } from "@/lib/blob";

/** Serves files from a *private* Vercel Blob store (public stores are linked directly). */
export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (!blobEnabled()) return new NextResponse("Not found", { status: 404 });
  const { path } = await params;
  const pathname = path.map(decodeURIComponent).join("/");
  if (!pathname || pathname.includes("..")) return new NextResponse("Not found", { status: 404 });
  try {
    const result = await get(pathname, { access: "private" });
    if (!result || !result.stream) return new NextResponse("Not found", { status: 404 });
    const headers = new Headers({ "Cache-Control": "public, max-age=31536000, immutable" });
    const b = result.blob as unknown as Record<string, string | undefined>;
    if (b.contentType) headers.set("Content-Type", b.contentType);
    if (b.contentDisposition) headers.set("Content-Disposition", b.contentDisposition.replace(/^attachment/, "inline"));
    return new Response(result.stream as unknown as ReadableStream, { headers });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
