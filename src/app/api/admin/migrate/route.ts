import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { STATIC_PHOTOS } from "@/lib/gallery";
import { loadManifest, saveManifest } from "@/lib/galleryStore";

export const runtime = "nodejs";
export const maxDuration = 60;

// One-time: copy repo seed photos into Blob so the owner can delete them.
// Idempotent: a seed photo already hidden is treated as migrated.
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const origin = new URL(request.url).origin;
  const manifest = await loadManifest();
  let migrated = 0;

  for (const p of STATIC_PHOTOS) {
    if (manifest.hidden.includes(p.id)) continue; // already migrated
    try {
      const res = await fetch(`${origin}${p.src}`);
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      const id = crypto.randomUUID();
      const blob = await put(`gallery/${p.category}/${id}.webp`, buf, {
        access: "public",
        contentType: "image/webp",
        addRandomSuffix: false,
      });
      const featured =
        p.id in manifest.featured ? manifest.featured[p.id] : p.featured;
      manifest.photos.push({
        id,
        src: blob.url,
        width: p.width,
        height: p.height,
        alt: p.alt,
        category: p.category,
        featured,
        managed: true,
      });
      manifest.hidden.push(p.id);
      delete manifest.featured[p.id];
      if (featured) manifest.featured[id] = true;
      migrated++;
    } catch {
      // skip failures; rerun is safe
    }
  }

  await saveManifest(manifest);
  return NextResponse.json({ ok: true, migrated });
}
