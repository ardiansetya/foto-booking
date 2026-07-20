import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery";
import { loadManifest, saveManifest } from "@/lib/galleryStore";

export const runtime = "nodejs";

const VALID = new Set(GALLERY_CATEGORIES.map((c) => c.id));

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const file = form.get("file");
  const category = String(form.get("category") ?? "") as GalleryCategory;
  const alt = String(form.get("alt") ?? "").trim();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }
  if (!VALID.has(category)) {
    return NextResponse.json({ error: "bad_category" }, { status: 400 });
  }

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const webp = await sharp(input)
      .rotate()
      .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    const meta = await sharp(webp).metadata();

    const id = crypto.randomUUID();
    const blob = await put(`gallery/${category}/${id}.webp`, webp, {
      access: "public",
      contentType: "image/webp",
      addRandomSuffix: false,
    });

    const manifest = await loadManifest();
    manifest.photos.push({
      id,
      src: blob.url,
      width: meta.width ?? 1200,
      height: meta.height ?? 800,
      alt: alt || `Foto ${category}`,
      category,
      managed: true,
    });
    await saveManifest(manifest);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "upload_failed" }, { status: 500 });
  }
}
