#!/usr/bin/env node
/**
 * Production start for the standalone Next.js build.
 * - loads .env from the project root (the standalone server only reads its own directory)
 * - makes DATABASE_URL / UPLOAD_DIR absolute so they do not depend on the working directory
 * - links public/ and .next/static into the standalone folder (Next requires this for standalone output)
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const standalone = path.join(root, ".next", "standalone");
if (!fs.existsSync(path.join(standalone, "server.js"))) {
  console.error("No standalone build found. Run `npm run build` first.");
  process.exit(1);
}

// .env loader (no dependency): KEY=VALUE lines, # comments, optional quotes
for (const file of [".env", ".env.local"]) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m || line.trim().startsWith("#")) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}

const dbUrl = process.env.DATABASE_URL ?? "file:./data/site.db";
if (dbUrl.startsWith("file:") && !path.isAbsolute(dbUrl.slice(5))) {
  process.env.DATABASE_URL = "file:" + path.resolve(root, dbUrl.slice(5));
}
process.env.UPLOAD_DIR = path.resolve(root, process.env.UPLOAD_DIR ?? "public/uploads");
fs.mkdirSync(process.env.UPLOAD_DIR, { recursive: true });

function link(target, dest) {
  if (fs.existsSync(dest)) {
    const st = fs.lstatSync(dest);
    if (st.isSymbolicLink()) fs.unlinkSync(dest); else return; // keep a real copy (e.g. Docker)
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.symlinkSync(target, dest, "junction");
}
link(path.join(root, "public"), path.join(standalone, "public"));
link(path.join(root, ".next", "static"), path.join(standalone, ".next", "static"));

process.env.PORT ??= "3000";
process.env.HOSTNAME ??= "0.0.0.0";
const child = spawn(process.execPath, [path.join(standalone, "server.js")], { stdio: "inherit", env: process.env });
child.on("exit", (code) => process.exit(code ?? 0));
