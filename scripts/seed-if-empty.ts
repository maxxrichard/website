import { db, runMigrations, isDatabaseEmpty } from "../src/db";
import { seedDatabase } from "../src/db/seed-data";

async function main() {
  await runMigrations();
  if (!(await isDatabaseEmpty())) { console.log("• Database already has content – skipping seed."); return; }
  console.log("• Empty database – seeding initial content…");
  await seedDatabase(db);
}
main().catch((e) => { console.error(e); process.exit(1); });
