import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "../src/db";

async function main() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("✔ Database migrated:", process.env.DATABASE_URL ?? "file:./data/site.db");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
