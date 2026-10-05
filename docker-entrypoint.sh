#!/bin/sh
set -e
# Apply migrations on every start (idempotent) and seed only if the DB is empty.
npx tsx scripts/migrate.ts
if [ "${AUTO_SEED:-${SEED_ON_EMPTY:-true}}" != "false" ]; then
  npx tsx scripts/seed-if-empty.ts
fi
exec "$@"
