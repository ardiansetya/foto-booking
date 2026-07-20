import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { STATIC_PHOTOS } from "@/lib/gallery";
import { loadManifest, saveManifest } from "@/lib/galleryStore";

export const runtime = "nodejs";
export const maxDuration = 60;

const CONCURRENCY = 8;

// One-time: copy repo seed photos into Blob so the owner can delete them.
// Parallel + idempotent: a seed photo already hidden is skipped, so it is safe
// to call repeatedly until `remaining` reaches 0.
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const origin = new URL(request.url).origin;
  const manifest = await loadManifest();
  const pending = STATIC_PHOTOS.filter((p) => !manifest.hidden.includes(p.id));

  let cursor = 0;
  async function worker() {
    while (cursor < pending.length) {
      const p = pending[cursor++];
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
      } catch {
        // skip; rerun is safe
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, pending.length) }, worker),
  );
  await saveManifest(manifest);

  const remaining = STATIC_PHOTOS.filter(
    (p) => !manifest.hidden.includes(p.id),
  ).length;
  return NextResponse.json({ ok: true, remaining });
}
