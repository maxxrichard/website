import { db, schema } from "../src/db";

async function main() {
  const rows = await db.select({ id: schema.profile.id }).from(schema.profile).limit(1);
  if (rows.length) { console.log("• Database already has content – skipping seed."); return; }
  console.log("• Empty database – seeding initial content…");
  await import("./seed");
}
main().catch((e) => { console.error(e); process.exit(1); });
