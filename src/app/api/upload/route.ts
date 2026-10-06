import { NextResponse } from "next/server";
import { writeFile, mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getSession } from "@/lib/auth";
import { siteOrigin } from "@/lib/site-url";
import { blobEnabled, blobAccess, servedBlobUrl } from "@/lib/blob";

const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif", "image/svg+xml": ".svg",
  "application/pdf": ".pdf", "video/mp4": ".mp4", "video/webm": ".webm",
};
const MAX_BYTES = 50 * 1024 * 1024;

function safeName(original: string, type: string) {
  const ext = ALLOWED[type] ?? path.extname(original).toLowerCase();
  const base = path.basename(original, path.extname(original)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "file";
  return `${Date.now()}-${base}-${randomBytes(3).toString("hex")}${ext}`;
}

/** Tells the admin UI how uploads work on this host. */
export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!blobEnabled()) return NextResponse.json({ mode: "local", access: "public", maxBytes: 4 * 1024 * 1024 });
  let access: "public" | "private" = "public";
  try { access = await blobAccess(); } catch (e) { console.error("[upload] blob probe failed:", (e as Error).message); }
  return NextResponse.json({ mode: "blob", access, maxBytes: MAX_BYTES });
}

export async function POST(req: Request) {
  try {
    return await handlePost(req);
  } catch (e) {
    const msg = (e as Error)?.message ?? "Unknown error";
    console.error("[upload] failed:", msg);
    return NextResponse.json({ error: `Upload failed on the server: ${msg}` }, { status: 500 });
  }
}

async function handlePost(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";

  // 1) Vercel Blob client uploads: the browser asks for a token here, then uploads directly to Blob
  //    (bypasses the 4.5 MB request limit of serverless functions).
  if (contentType.includes("application/json")) {
    if (!blobEnabled()) return NextResponse.json({ error: "Blob storage is not configured on this host." }, { status: 400 });
    try {
      const body = (await req.json()) as HandleUploadBody;
      const result = await handleUpload({
        body, request: req,
        // Step 1 – the admin's browser asks for an upload token: must be logged in.
        onBeforeGenerateToken: async (pathname) => {
          if (!(await getSession())) throw new Error("Unauthorized");
          return {
            allowedContentTypes: Object.keys(ALLOWED),
            maximumSizeInBytes: MAX_BYTES,
            addRandomSuffix: true,
            tokenPayload: JSON.stringify({ pathname }),
            // Always use the public URL for the completion callback (never an internal hostname).
            callbackUrl: `${siteOrigin()}/api/upload`,
          };
        },
        // Step 2 – Vercel Blob calls back when the upload is done. This request comes from Vercel's
        // servers (no login cookie) and is authenticated by handleUpload via its signature.
        onUploadCompleted: async () => { /* nothing to persist; the URL is stored with the record */ },
      });
      return NextResponse.json(result);
    } catch (e) {
      const msg = (e as Error).message;
      console.error("[upload] blob token/callback failed:", msg);
      return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 400 });
    }
  }

  // 2) Multipart upload handled by the server (local disk, or Blob when configured).
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let file: FormDataEntryValue | null;
  try {
    file = (await req.formData()).get("file");
  } catch {
    return NextResponse.json({ error: "The upload could not be read. The file may be too large for this host." }, { status: 413 });
  }
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!ALLOWED[file.type]) return NextResponse.json({ error: `Unsupported file type: ${file.type || "unknown"}` }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "File too large (max 50 MB)" }, { status: 413 });
  const name = safeName(file.name, file.type);

  if (blobEnabled()) {
    const { put } = await import("@vercel/blob");
    let access = await blobAccess();
    let blob;
    try {
      blob = await put(`uploads/${name}`, file, { access, contentType: file.type });
    } catch (e) {
      if (access === "public" && /private/i.test(String((e as Error).message))) {
        access = "private";
        blob = await put(`uploads/${name}`, file, { access, contentType: file.type });
      } else throw e;
    }
    return NextResponse.json({ url: servedBlobUrl(blob, access) });
  }

  const dir = path.resolve(process.cwd(), process.env.UPLOAD_DIR ?? "public/uploads");
  try {
    await mkdir(dir, { recursive: true });
    await access(dir, constants.W_OK);
  } catch {
    return NextResponse.json({
      error: "This host has a read-only filesystem. Add a Vercel Blob store to the project (Storage → Create → Blob) and redeploy, or paste an image URL instead.",
    }, { status: 507 });
  }
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${name}` });
}
