import { put } from "@vercel/blob";
import {
  EMPTY_MANIFEST,
  type GalleryManifest,
  MANIFEST_PATH,
  readManifest,
} from "./gallery";

export async function loadManifest(): Promise<GalleryManifest> {
  const m = await readManifest();
  if (!m) return { hidden: [], featured: {}, photos: [] };
  return m;
}

export async function saveManifest(manifest: GalleryManifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
    // Shortest cache Blob allows (60s minimum) so manifest edits propagate
    // quickly; the admin UI bridges the remaining gap locally.
    cacheControlMaxAge: 60,
  });
}

export { EMPTY_MANIFEST };
