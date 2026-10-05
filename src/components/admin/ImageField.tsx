"use client";
import { useState } from "react";

export default function ImageField({ name, defaultValue }: { name: string; defaultValue?: string | null }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true); setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setValue(data.url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-image-field">
      <div className="row">
        <input type="text" name={name} value={value} onChange={(e) => setValue(e.target.value)} placeholder="/uploads/… or https://…" />
        <label className="adm-btn adm-btn-sm" style={{ whiteSpace: "nowrap" }}>
          {busy ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
        {value && <button type="button" className="adm-btn adm-btn-sm" onClick={() => setValue("")}>Clear</button>}
      </div>
      {error && <span className="adm-error">{error}</span>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {value && <img src={value} alt="preview" />}
    </div>
  );
}
