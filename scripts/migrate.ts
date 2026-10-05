import { runMigrations, databaseUrl } from "../src/db";

runMigrations()
  .then((applied) => console.log(`✔ Database migrated (${applied.length} new migration(s)):`, databaseUrl))
  .catch((err) => { console.error(err); process.exit(1); });
