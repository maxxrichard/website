"use client";
import { useEffect, useRef, useState } from "react";

type Mode = { mode: "blob" | "local"; access: "public" | "private"; maxBytes: number };

/** Downscale very large raster images in the browser so uploads stay small and pages fast. */
async function shrinkImage(file: File, maxEdge = 2400, quality = 0.88): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 600 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 3 * 1024 * 1024) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const type = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, type, quality));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, type === "image/png" ? ".png" : ".jpg"), { type });
  } catch {
    return file;
  }
}

async function readJson(res: Response): Promise<Record<string, unknown>> {
  const text = await res.text();
  try { return text ? JSON.parse(text) : {}; } catch { return {}; }
}

export default function ImageField({ name, defaultValue }: { name: string; defaultValue?: string | null }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const mode = useRef<Mode | null>(null);

  useEffect(() => {
    fetch("/api/upload").then(readJson).then((m) => { if (m.mode) mode.current = m as Mode; }).catch(() => {});
  }, []);

  async function upload(input: File) {
    setBusy(true); setError(null); setProgress(null);
    try {
      const file = await shrinkImage(input);
      let directError: string | null = null;
      if (mode.current?.mode === "blob") {
        const { upload } = await import("@vercel/blob/client");
        const controller = new AbortController();
        let lastPct = 0;
        const access = mode.current.access ?? "public";
        const direct = upload(`uploads/${file.name}`, file, {
          access, handleUploadUrl: "/api/upload", contentType: file.type, abortSignal: controller.signal,
          onUploadProgress: (p) => { lastPct = p.percentage; setProgress(Math.round(p.percentage)); },
        });
        // Safety net: if the transfer is done but the confirmation never arrives, stop waiting after 45 s.
        const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error(lastPct >= 95 ? "stalled" : "timeout")), 45000));
        try {
          const blob = await Promise.race([direct, timeout]);
          setValue(access === "public" ? blob.url : `/blob/${blob.pathname}`);
          return;
        } catch (e) {
          controller.abort();
          const reason = (e as Error).message;
          directError = reason;
          if (file.size <= 4 * 1024 * 1024) {
            // Fall back to the server-side upload (works for files up to ~4 MB on Vercel).
            setProgress(null);
          } else {
            throw new Error(reason === "stalled"
              ? "The file was sent but Vercel Blob did not confirm the upload. Check that Deployment Protection is off for this deployment (Vercel → Settings → Deployment Protection), then try again."
              : `Upload failed: ${reason}`);
          }
        }
      }
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await readJson(res);
      if (!res.ok || !data.url) {
        let msg = (data.error as string) ?? (res.status === 413 ? `The file is too large for this host (${(file.size / 1048576).toFixed(1)} MB). Add a Vercel Blob store or use a smaller file.` : `Upload failed (HTTP ${res.status}).`);
        if (directError) msg += ` Direct upload error: ${directError}`;
        throw new Error(msg);
      }
      setValue(String(data.url));
    } catch (e) {
      setError((e as Error).message || "Upload failed.");
    } finally {
      setBusy(false); setProgress(null);
    }
  }

  return (
    <div className="adm-image-field">
      <div className="row">
        <input type="text" name={name} value={value} onChange={(e) => setValue(e.target.value)} placeholder="/uploads/…, /files/… or https://…" />
        <label className="adm-btn adm-btn-sm" style={{ whiteSpace: "nowrap" }}>
          {busy ? (progress !== null ? `Uploading ${progress}%` : "Uploading…") : "Upload"}
          <input type="file" accept="image/*,application/pdf,video/mp4" style={{ display: "none" }} disabled={busy}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
        </label>
        {value && <button type="button" className="adm-btn adm-btn-sm" onClick={() => setValue("")}>Clear</button>}
      </div>
      {error && <span className="adm-error">{error}</span>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {value && /\.(jpe?g|png|webp|gif|svg)(\?|$)/i.test(value) && <img src={value} alt="preview" />}
      {value && /\.(mp4|webm)(\?|$)/i.test(value) && <span className="adm-muted">Video: {value}</span>}
      {value && /\.pdf(\?|$)/i.test(value) && <span className="adm-muted">PDF: {value}</span>}
    </div>
  );
}
