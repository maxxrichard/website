import { NextResponse } from "next/server";
import { writeFile, mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { getSession } from "@/lib/auth";

const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif", "image/svg+xml": ".svg", "application/pdf": ".pdf",
};
const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  const ext = ALLOWED[file.type];
  if (!ext) return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "File too large (max 15 MB)" }, { status: 400 });

  const base = path.basename(file.name, path.extname(file.name)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "file";
  const name = `${Date.now()}-${base}-${randomBytes(3).toString("hex")}${ext}`;

  // 1) Vercel Blob (or any host where BLOB_READ_WRITE_TOKEN is configured)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${name}`, file, { access: "public", contentType: file.type });
    return NextResponse.json({ url: blob.url });
  }

  // 2) Local disk (VPS / Docker)
  const dir = path.resolve(process.cwd(), process.env.UPLOAD_DIR ?? "public/uploads");
  try {
    await mkdir(dir, { recursive: true });
    await access(dir, constants.W_OK);
  } catch {
    return NextResponse.json({
      error: "This host has a read-only filesystem. Add a Vercel Blob store (BLOB_READ_WRITE_TOKEN) or paste an external image URL instead.",
    }, { status: 507 });
  }
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${name}` });
}
