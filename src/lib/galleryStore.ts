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
    // Never CDN-cache the manifest: stale reads caused lost updates
    // (featured toggles reverting, deleted photos reappearing).
    cacheControlMaxAge: 0,
  });
}

export { EMPTY_MANIFEST };
