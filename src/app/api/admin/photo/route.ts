import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { type GalleryCategory, getAdminPhotos } from "@/lib/gallery";
import { loadManifest, saveManifest } from "@/lib/galleryStore";

export const runtime = "nodejs";

// List all photos for the admin manager.
export async function GET() {
  return NextResponse.json({ photos: await getAdminPhotos() });
}

interface RegisterInput {
  id?: string;
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  category?: GalleryCategory;
}

// Register photos already uploaded to Blob by the client.
// Accepts one photo or a batch, so a multi-file upload writes the
// manifest once instead of racing one request per file.
export async function POST(request: Request) {
  let body: RegisterInput | { photos?: RegisterInput[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const incoming: RegisterInput[] =
    "photos" in body && Array.isArray(body.photos)
      ? body.photos
      : [body as RegisterInput];

  const valid = incoming.filter((p) => p.id && p.src && p.category);
  if (valid.length === 0) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const manifest = await loadManifest();
  const existing = new Set(manifest.photos.map((p) => p.id));
  for (const p of valid) {
    if (existing.has(p.id as string)) continue;
    manifest.photos.push({
      id: p.id as string,
      src: p.src as string,
      width: p.width ?? 1200,
      height: p.height ?? 800,
      alt: p.alt || `Foto ${p.category}`,
      category: p.category as GalleryCategory,
      managed: true,
    });
  }
  await saveManifest(manifest);
  return NextResponse.json({ ok: true, added: valid.length });
}

// Delete a photo. Managed (Blob) photos are removed; repo seed photos are hidden.
export async function DELETE(request: Request) {
  let id = "";
  try {
    const body = (await request.json()) as { id?: string };
    id = body.id ?? "";
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!id) return NextResponse.json({ error: "no_id" }, { status: 400 });

  const manifest = await loadManifest();
  const managed = manifest.photos.find((p) => p.id === id);

  if (managed) {
    try {
      await del(managed.src);
    } catch {
      // ignore blob delete failure; still drop from manifest
    }
    manifest.photos = manifest.photos.filter((p) => p.id !== id);
    delete manifest.featured[id];
  } else if (!manifest.hidden.includes(id)) {
    manifest.hidden.push(id);
    delete manifest.featured[id];
  }

  await saveManifest(manifest);
  return NextResponse.json({ ok: true });
}

// Update flags: toggle featured, or unhide a repo seed photo.
export async function PATCH(request: Request) {
  let body: { id?: string; featured?: boolean; hidden?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const id = body.id ?? "";
  if (!id) return NextResponse.json({ error: "no_id" }, { status: 400 });

  const manifest = await loadManifest();

  if (typeof body.featured === "boolean") {
    manifest.featured[id] = body.featured;
  }
  if (body.hidden === false) {
    manifest.hidden = manifest.hidden.filter((h) => h !== id);
  }

  await saveManifest(manifest);
  return NextResponse.json({ ok: true });
}
