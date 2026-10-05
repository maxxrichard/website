import { NextResponse } from "next/server";
import { stat, readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Serves files uploaded through the admin. Next.js only indexes `public/` when the server
 * starts, so files added at runtime would otherwise 404 until the next restart.
 */
const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif",
  ".svg": "image/svg+xml", ".pdf": "application/pdf", ".mp4": "video/mp4", ".webm": "video/webm",
};

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params;
  const dir = path.resolve(process.cwd(), process.env.UPLOAD_DIR ?? "public/uploads");
  const file = path.resolve(dir, ...parts);
  if (!file.startsWith(dir + path.sep)) return new NextResponse("Not found", { status: 404 });
  try {
    const info = await stat(file);
    if (!info.isFile()) throw new Error("not a file");
    const body = await readFile(file);
    return new NextResponse(body, {
      headers: {
        "Content-Type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream",
        "Content-Length": String(info.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
