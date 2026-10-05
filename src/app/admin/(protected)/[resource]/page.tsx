import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, desc, sql } from "drizzle-orm";
import { db, schema, ensureReady } from "@/db";
import { getResource } from "@/lib/resources";
import { deleteRecord, toggleBoolean } from "../actions";
import DeleteButton from "@/components/admin/DeleteButton";
import ToggleButton from "@/components/admin/ToggleButton";

export default async function ResourceListPage({ params, searchParams }: { params: Promise<{ resource: string }>; searchParams: Promise<{ saved?: string; q?: string }> }) {
  const { resource } = await params;
  const { saved, q } = await searchParams;
  await ensureReady();
  const res = getResource(resource);
  if (!res) notFound();
  const table = schema[res.table] as unknown as Record<string, never> & { id: never };
  const orderCol = (table as Record<string, unknown>)[res.orderBy ?? "id"] as never;
  let rows = (await db.select().from(table as never).orderBy(res.orderDir === "asc" ? asc(orderCol) : desc(orderCol), desc(table.id as never))) as Record<string, unknown>[];
  if (q) {
    const needle = q.toLowerCase();
    rows = rows.filter((r) => Object.values(r).some((v) => typeof v === "string" && v.toLowerCase().includes(needle)));
  }
  const listFields = res.fields.filter((f) => f.list);
  void sql;

  return (
    <>
      <div className="adm-header">
        <div><h1>{res.label}</h1><p>{res.description}</p></div>
        <Link href={`/admin/${res.key}/new`} className="adm-btn adm-btn-primary">+ New {res.singular.toLowerCase()}</Link>
      </div>
      {saved && <div className="adm-success">Saved.</div>}
      <form className="adm-card" style={{ padding: 12, marginBottom: 14, display: "flex", gap: 8 }}>
        <input name="q" defaultValue={q ?? ""} placeholder={`Search ${res.label.toLowerCase()}…`} style={{ flex: 1, background: "#0f1115", border: "1px solid var(--adm-border)", borderRadius: 9, color: "inherit", padding: "8px 12px" }} />
        <button className="adm-btn adm-btn-sm">Search</button>
        {q && <Link href={`/admin/${res.key}`} className="adm-btn adm-btn-sm">Clear</Link>}
      </form>
      <div className="adm-card" style={{ padding: 0, overflowX: "auto" }}>
        <table className="adm-table">
          <thead><tr>{listFields.map((f) => <th key={f.name}>{f.label}</th>)}<th></th></tr></thead>
          <tbody>
            {rows.map((r) => {
              const id = Number(r.id);
              return (
                <tr key={id}>
                  {listFields.map((f) => (
                    <td key={f.name}>
                      {f.type === "checkbox" ? (
                        <ToggleButton value={Boolean(r[f.name])} onToggle={async (v) => { "use server"; await toggleBoolean(res.key, id, f.name, v); }} />
                      ) : f.name === res.titleField ? (
                        <Link href={`/admin/${res.key}/${id}`}><strong>{String(r[f.name] ?? "")}</strong></Link>
                      ) : (
                        <span>{String(r[f.name] ?? "")}</span>
                      )}
                    </td>
                  ))}
                  <td className="actions">
                    <Link href={`/admin/${res.key}/${id}`} className="adm-btn adm-btn-sm">Edit</Link>
                    <DeleteButton onDelete={async () => { "use server"; await deleteRecord(res.key, id); }} />
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && <tr><td colSpan={listFields.length + 1} className="adm-muted" style={{ padding: 24 }}>Nothing here yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="adm-muted" style={{ marginTop: 10 }}>{rows.length} item{rows.length === 1 ? "" : "s"}</p>
    </>
  );
}
