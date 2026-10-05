import Link from "next/link";
import type { ResourceDef } from "@/lib/resources";
import ImageField from "./ImageField";

export default function ResourceForm({ res, record, action }: { res: ResourceDef; record: Record<string, unknown> | null; action: (formData: FormData) => Promise<void> }) {
  const val = (name: string, def?: unknown) => {
    const v = record ? record[name] : def;
    return v === null || v === undefined ? "" : String(v);
  };
  const bool = (name: string, def?: unknown) => (record ? Boolean(record[name]) : Boolean(def));

  return (
    <form action={action} className="adm-card adm-form">
      {res.fields.map((f) => {
        const cls = f.width === "half" ? "half" : "";
        if (f.type === "checkbox") {
          return (
            <label key={f.name} className={`check ${cls}`}>
              <input type="checkbox" name={f.name} defaultChecked={bool(f.name, f.default)} />{f.label}
            </label>
          );
        }
        if (f.type === "image") {
          return (
            <label key={f.name} className={cls}>{f.label}<ImageField name={f.name} defaultValue={val(f.name)} />{f.help && <span className="help">{f.help}</span>}</label>
          );
        }
        if (f.type === "select") {
          return (
            <label key={f.name} className={cls}>{f.label}{f.required && " *"}
              <select name={f.name} defaultValue={val(f.name, f.default)} required={f.required}>
                {!f.required && <option value="">—</option>}
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {f.help && <span className="help">{f.help}</span>}
            </label>
          );
        }
        if (f.type === "textarea" || f.type === "markdown") {
          return (
            <label key={f.name} className={cls}>{f.label}{f.required && " *"}
              <textarea name={f.name} defaultValue={val(f.name, f.default)} required={f.required} className={f.type === "markdown" ? "md" : ""} placeholder={f.placeholder} />
              <span className="help">{f.help ?? (f.type === "markdown" ? "Markdown supported: **bold**, *italic*, [link](https://…), lists, headings, images." : "")}</span>
            </label>
          );
        }
        const inputType = f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "url" ? "url" : f.type === "email" ? "email" : "text";
        return (
          <label key={f.name} className={cls}>{f.label}{f.required && " *"}
            <input type={inputType} name={f.name} defaultValue={val(f.name, f.default)} required={f.required} placeholder={f.placeholder} step={f.type === "number" ? "1" : undefined} />
            {f.help && <span className="help">{f.help}</span>}
          </label>
        );
      })}
      <div className="adm-form-actions">
        <Link href={`/admin/${res.key}`} className="adm-btn">Cancel</Link>
        <button className="adm-btn adm-btn-primary" type="submit">{record ? "Save changes" : `Create ${res.singular.toLowerCase()}`}</button>
      </div>
    </form>
  );
}
