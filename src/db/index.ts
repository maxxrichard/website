import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import * as schema from "./schema";
import fs from "node:fs";
import path from "node:path";

const url = process.env.DATABASE_URL ?? "file:./data/site.db";

// Make sure the directory for a local SQLite file exists.
if (url.startsWith("file:")) {
  const filePath = url.slice("file:".length);
  const dir = path.dirname(path.resolve(process.cwd(), filePath));
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const globalForDb = globalThis as unknown as { __libsql?: Client };

export const client: Client =
  globalForDb.__libsql ??
  createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN || undefined });

if (process.env.NODE_ENV !== "production") globalForDb.__libsql = client;

export const db = drizzle(client, { schema });
export { schema };
