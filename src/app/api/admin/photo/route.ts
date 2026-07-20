import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { loadManifest, saveManifest } from "@/lib/galleryStore";

export const runtime = "nodejs";

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
