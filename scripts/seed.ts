import { db, runMigrations } from "../src/db";
import { seedDatabase } from "../src/db/seed-data";

async function main() {
  await runMigrations();
  await seedDatabase(db);
}
main().catch((e) => { console.error(e); process.exit(1); });
