#!/bin/sh
set -e
# Apply migrations on every start (idempotent) and seed only if the DB is empty.
npx tsx scripts/migrate.ts
if [ "${SEED_ON_EMPTY:-true}" = "true" ]; then
  npx tsx scripts/seed-if-empty.ts
fi
exec "$@"
