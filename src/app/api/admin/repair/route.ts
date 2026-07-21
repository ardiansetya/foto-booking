import { list } from "@vercel/blob";
import { NextResponse } from "next/server";
import sharp from "sharp";
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryPhoto,
  MANIFEST_PATH,
} from "@/lib/gallery";
import { loadManifest, saveManifest } from "@/lib/galleryStore";

export const runtime = "nodejs";
export const maxDuration = 60;

const VALID = new Set<string>(GALLERY_CATEGORIES.map((c) => c.id));
const CONCURRENCY = 8;

// Rebuild the manifest from the photos actually present in Blob.
// Used when the manifest is lost or out of sync with the store.
export async function POST() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  // Collect every gallery image currently in the store.
  const found: { url: string; pathname: string }[] = [];
  let cursor: string | undefined;
  do {
    const {
      blobs,
      cursor: next,
      hasMore,
    } = await list({ prefix: "gallery/", cursor, limit: 1000 });
    for (const b of blobs) {
      if (b.pathname === MANIFEST_PATH) continue;
      found.push({ url: b.url, pathname: b.pathname });
    }
    cursor = hasMore ? next : undefined;
  } while (cursor);

  const manifest = await loadManifest().catch(() => ({
    hidden: [],
    featured: {},
    photos: [],
  }));
  const known = new Set(manifest.photos.map((p) => p.src));
  const missing = found.filter((f) => !known.has(f.url));

  const recovered: GalleryPhoto[] = [];
  let index = 0;
  async function worker() {
    while (index < missing.length) {
      const item = missing[index++];
      const [, category, file] = item.pathname.split("/");
      if (!VALID.has(category) || !file) continue;
      let width = 1200;
      let height = 800;
      try {
        const res = await fetch(item.url);
        if (res.ok) {
          const meta = await sharp(
            Buffer.from(await res.arrayBuffer()),
          ).metadata();
          width = meta.width ?? width;
          height = meta.height ?? height;
        }
      } catch {
        // keep defaults
      }
      recovered.push({
        id: file.replace(/\.[^.]+$/, ""),
        src: item.url,
        width,
        height,
        alt: `Foto ${category}`,
        category: category as GalleryCategory,
        managed: true,
      });
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, missing.length) }, worker),
  );

  manifest.photos = [...manifest.photos, ...recovered];
  await saveManifest(manifest);

  return NextResponse.json({
    ok: true,
    blobsFound: found.length,
    recovered: recovered.length,
    total: manifest.photos.length,
  });
}
