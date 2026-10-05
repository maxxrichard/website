import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";
import * as schema from "./schema";
import { migrations } from "./migrations";

export type Db = LibSQLDatabase<typeof schema>;

/**
 * Resolve the database URL.
 * - DATABASE_URL may be a libsql://, https:// (Turso) or file: URL (default file:./data/site.db)
 * - On read-only hosts (Vercel, AWS Lambda) a local file is moved to /tmp, which is writable
 *   but ephemeral. `isEphemeral` lets the admin UI warn about it.
 */
function resolveUrl(): { url: string; isEphemeral: boolean } {
  const raw = process.env.DATABASE_URL?.trim() || "file:./data/site.db";
  if (!raw.startsWith("file:")) return { url: raw, isEphemeral: false };
  const filePath = path.resolve(process.cwd(), raw.slice("file:".length));
  const dir = path.dirname(filePath);
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.accessSync(dir, fs.constants.W_OK);
    return { url: `file:${filePath}`, isEphemeral: false };
  } catch {
    const tmp = path.join(process.env.TMPDIR || "/tmp", "maxxrichard-site", path.basename(filePath));
    fs.mkdirSync(path.dirname(tmp), { recursive: true });
    return { url: `file:${tmp}`, isEphemeral: true };
  }
}

const resolved = resolveUrl();
export const databaseUrl = resolved.url;
export const isEphemeral = resolved.isEphemeral;

type G = typeof globalThis & { __libsql?: Client; __dbReady?: Promise<void> };
const g = globalThis as G;

export const client: Client =
  g.__libsql ?? createClient({ url: databaseUrl, authToken: process.env.DATABASE_AUTH_TOKEN || undefined });
g.__libsql = client;

export const db: Db = drizzle(client, { schema });
export { schema };

/** Apply bundled migrations that have not been applied yet (idempotent). */
export async function runMigrations(): Promise<string[]> {
  await client.execute(`CREATE TABLE IF NOT EXISTS "__migrations" ("name" text PRIMARY KEY, "applied_at" text NOT NULL)`);
  const done = new Set((await client.execute(`SELECT name FROM "__migrations"`)).rows.map((r) => String(r.name)));
  const applied: string[] = [];
  for (const m of migrations) {
    if (done.has(m.name)) continue;
    for (const stmt of m.statements) {
      try {
        await client.execute(stmt);
      } catch (e) {
        // Tables created by an older drizzle-kit migrate run already exist → treat as applied.
        if (!/already exists/i.test(String((e as Error).message))) throw e;
      }
    }
    await client.execute({ sql: `INSERT INTO "__migrations" (name, applied_at) VALUES (?, ?)`, args: [m.name, new Date().toISOString()] });
    applied.push(m.name);
  }
  return applied;
}

/** True when the content tables are empty (fresh database). */
export async function isDatabaseEmpty(): Promise<boolean> {
  const r = await client.execute(`SELECT count(*) AS n FROM "profile"`);
  return Number(r.rows[0]?.n ?? 0) === 0;
}

/**
 * Make sure the database is migrated and (if empty) seeded with the site content.
 * Runs once per process; every query path awaits it. Set AUTO_SEED=false to disable seeding.
 */
export function ensureReady(): Promise<void> {
  if (!g.__dbReady) {
    g.__dbReady = (async () => {
      await runMigrations();
      if ((process.env.AUTO_SEED ?? "true") !== "false" && (await isDatabaseEmpty())) {
        const { seedDatabase } = await import("./seed-data");
        await seedDatabase(db);
      }
    })().catch((e) => {
      g.__dbReady = undefined; // allow a retry on the next request
      throw e;
    });
  }
  return g.__dbReady;
}
