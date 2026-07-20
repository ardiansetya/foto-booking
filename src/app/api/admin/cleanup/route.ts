import { del, list } from "@vercel/blob";
import { NextResponse } from "next/server";
import { MANIFEST_PATH } from "@/lib/gallery";
import { loadManifest } from "@/lib/galleryStore";

export const runtime = "nodejs";
export const maxDuration = 60;

// Remove orphan blobs under gallery/ that are not referenced by the manifest.
// These accumulate from interrupted uploads/migrations.
export async function POST() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const manifest = await loadManifest();
  const keep = new Set(manifest.photos.map((p) => p.src));

  const orphans: string[] = [];
  let cursor: string | undefined;
  do {
    const { blobs, cursor: next, hasMore } = await list({
      prefix: "gallery/",
      cursor,
      limit: 1000,
    });
    for (const b of blobs) {
      if (b.pathname === MANIFEST_PATH) continue;
      if (!keep.has(b.url)) orphans.push(b.url);
    }
    cursor = hasMore ? next : undefined;
  } while (cursor);

  // del accepts an array; chunk to stay well within limits.
  for (let i = 0; i < orphans.length; i += 100) {
    await del(orphans.slice(i, i + 100));
  }

  return NextResponse.json({ ok: true, deleted: orphans.length });
}
