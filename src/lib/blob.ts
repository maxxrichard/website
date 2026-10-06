import { put, del, type PutBlobResult } from "@vercel/blob";

export type BlobAccess = "public" | "private";

type G = typeof globalThis & { __blobAccess?: Promise<BlobAccess> };
const g = globalThis as G;

export const blobEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/**
 * Works out whether the connected Blob store is public or private.
 * BLOB_ACCESS=public|private skips the probe; otherwise a tiny probe file is written once per process.
 */
export function blobAccess(): Promise<BlobAccess> {
  const env = process.env.BLOB_ACCESS?.toLowerCase();
  if (env === "public" || env === "private") return Promise.resolve(env);
  if (!g.__blobAccess) {
    g.__blobAccess = (async () => {
      try {
        const probe = await put(`uploads/.probe-${Date.now()}.txt`, "probe", { access: "public", contentType: "text/plain" });
        del(probe.url).catch(() => {});
        return "public" as const;
      } catch (e) {
        if (/private/i.test(String((e as Error).message))) return "private" as const;
        throw e;
      }
    })().catch((e) => { g.__blobAccess = undefined; throw e; });
  }
  return g.__blobAccess;
}

/** URL to store in the database for an uploaded blob. Private blobs are served through /blob/<pathname>. */
export function servedBlobUrl(blob: Pick<PutBlobResult, "url" | "pathname">, access: BlobAccess): string {
  return access === "public" ? blob.url : `/blob/${blob.pathname}`;
}
