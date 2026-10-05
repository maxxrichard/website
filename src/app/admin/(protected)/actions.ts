"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { db, schema, ensureReady } from "@/db";
import { requireSession } from "@/lib/auth";
import { getResource, type FieldDef } from "@/lib/resources";
import { slugify } from "@/lib/markdown";

type Table = (typeof schema)[keyof typeof schema];

function tableFor(resourceKey: string) {
  const res = getResource(resourceKey);
  if (!res) throw new Error(`Unknown resource: ${resourceKey}`);
  return { res, table: schema[res.table] as unknown as Table & { id: typeof schema.news.id } };
}

function parseField(f: FieldDef, formData: FormData): unknown {
  const raw = formData.get(f.name);
  switch (f.type) {
    case "checkbox": return raw === "on" || raw === "true" || raw === "1";
    case "number": {
      const s = String(raw ?? "").trim();
      if (s === "") return f.required ? 0 : null;
      const n = Number(s);
      return Number.isFinite(n) ? n : null;
    }
    default: {
      const s = String(raw ?? "").trim();
      if (s === "" && !f.required) return null;
      return s;
    }
  }
}

function revalidateAll() {
  ["/", "/about", "/news", "/research", "/publications", "/blogs", "/teaching", "/media", "/contact", "/admin"].forEach((p) => revalidatePath(p, "layout"));
}

export async function saveRecord(resourceKey: string, id: number | null, formData: FormData) {
  await requireSession();
  await ensureReady();
  const { res, table } = tableFor(resourceKey);
  const values: Record<string, unknown> = {};
  const columns = table as unknown as Record<string, { notNull?: boolean; dataType?: string } | undefined>;
  for (const f of res.fields) {
    let v = parseField(f, formData);
    if (f.required && (v === null || v === "")) throw new Error(`"${f.label}" is required.`);
    // Optional field left empty but the column is NOT NULL → store an empty value instead of null.
    const col = columns[f.name];
    if (v === null && col?.notNull) v = col.dataType === "number" ? 0 : "";
    values[f.name] = v;
  }
  if (res.slugFrom && !values.slug) {
    const base = slugify(String(values[res.slugFrom] ?? "")) || `item-${Date.now()}`;
    values.slug = base;
  }
  const now = new Date().toISOString();
  if (res.hasTimestamps) values.updatedAt = now;

  if (id) {
    // ensure unique slug on update
    if (values.slug) {
      const clash = await db.select({ id: table.id }).from(table as never).where(sql`slug = ${values.slug} AND id != ${id}`).limit(1);
      if (clash.length) values.slug = `${values.slug}-${id}`;
    }
    await db.update(table as never).set(values).where(eq(table.id, id));
  } else {
    if (values.slug) {
      const clash = await db.select({ id: table.id }).from(table as never).where(sql`slug = ${values.slug}`).limit(1);
      if (clash.length) values.slug = `${values.slug}-${Date.now().toString(36)}`;
    }
    if (res.hasTimestamps) values.createdAt = now;
    await db.insert(table as never).values(values as never);
  }
  revalidateAll();
  redirect(`/admin/${resourceKey}?saved=1`);
}

export async function deleteRecord(resourceKey: string, id: number) {
  await requireSession();
  await ensureReady();
  const { table } = tableFor(resourceKey);
  await db.delete(table as never).where(eq(table.id, id));
  revalidateAll();
  revalidatePath(`/admin/${resourceKey}`);
}

export async function toggleBoolean(resourceKey: string, id: number, field: string, value: boolean) {
  await requireSession();
  await ensureReady();
  const { res, table } = tableFor(resourceKey);
  if (!res.fields.some((f) => f.name === field && f.type === "checkbox")) throw new Error("Invalid field");
  await db.update(table as never).set({ [field]: value } as never).where(eq(table.id, id));
  revalidateAll();
  revalidatePath(`/admin/${resourceKey}`);
}

export async function saveProfile(formData: FormData) {
  await requireSession();
  await ensureReady();
  const str = (k: string) => { const v = String(formData.get(k) ?? "").trim(); return v === "" ? null : v; };
  const values = {
    fullName: str("fullName") ?? "Your Name",
    shortName: str("shortName"),
    jobTitle: str("jobTitle") ?? "",
    tagline: str("tagline"),
    avatar: str("avatar"),
    aboutMarkdown: str("aboutMarkdown") ?? "",
    email: str("email"), secondaryEmail: str("secondaryEmail"), phone: str("phone"), location: str("location"),
    affiliation: str("affiliation"), affiliationUrl: str("affiliationUrl"), cvUrl: str("cvUrl"), mapEmbedUrl: str("mapEmbedUrl"),
    siteTitle: str("siteTitle"), siteDescription: str("siteDescription"), footerText: str("footerText"),
    updatedAt: new Date().toISOString(),
  };
  const existing = await db.select({ id: schema.profile.id }).from(schema.profile).where(eq(schema.profile.id, 1)).limit(1);
  if (existing.length) await db.update(schema.profile).set(values).where(eq(schema.profile.id, 1));
  else await db.insert(schema.profile).values({ id: 1, ...values });
  revalidateAll();
  redirect("/admin/profile?saved=1");
}

export async function markMessageRead(id: number, read: boolean) {
  await requireSession();
  await ensureReady();
  await db.update(schema.messages).set({ read }).where(eq(schema.messages.id, id));
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: number) {
  await requireSession();
  await ensureReady();
  await db.delete(schema.messages).where(eq(schema.messages.id, id));
  revalidatePath("/admin/messages");
}
