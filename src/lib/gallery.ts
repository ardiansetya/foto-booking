import "server-only";
import { list } from "@vercel/blob";

export type GalleryCategory =
  | "personal"
  | "couple"
  | "wedding"
  | "group"
  | "family";

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: "personal", label: "Personal" },
  { id: "couple", label: "Couple" },
  { id: "wedding", label: "Wedding" },
  { id: "group", label: "Group" },
  { id: "family", label: "Family" },
];

export interface GalleryPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: GalleryCategory;
  featured?: boolean;
  blurDataURL?: string;
  /** true = admin upload (Blob, deletable); false = repo seed photo */
  managed?: boolean;
}

export interface GalleryManifest {
  hidden: string[]; // ids of repo seed photos hidden by owner
  featured: Record<string, boolean>; // id -> featured override
  photos: GalleryPhoto[]; // admin uploads (Blob)
}

export const MANIFEST_PATH = "gallery/manifest.json";

export const EMPTY_MANIFEST: GalleryManifest = {
  hidden: [],
  featured: {},
  photos: [],
};

// All photos now live in Blob; no bundled seed photos remain.
export const STATIC_PHOTOS: GalleryPhoto[] = [];

/**
 * Reads the manifest.
 * Returns null only when it genuinely does not exist yet.
 * Throws on read failure so callers never mistake an error for "empty",
 * which previously let a cleanup wipe every photo.
 */
export async function readManifest(): Promise<GalleryManifest | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  const { blobs } = await list({ prefix: MANIFEST_PATH });
  const manifest = blobs.find((b) => b.pathname === MANIFEST_PATH);
  if (!manifest) return null;
  const res = await fetch(manifest.url, { cache: "no-store" });
  if (!res.ok) throw new Error(`manifest_read_failed_${res.status}`);
  const data = (await res.json()) as Partial<GalleryManifest>;
  return {
    hidden: data.hidden ?? [],
    featured: data.featured ?? {},
    photos: data.photos ?? [],
  };
}

/** Read that never throws; for public pages where an empty gallery is acceptable. */
async function readManifestSafe(): Promise<GalleryManifest | null> {
  try {
    return await readManifest();
  } catch {
    return null;
  }
}

function merge(manifest: GalleryManifest | null): GalleryPhoto[] {
  if (!manifest) return STATIC_PHOTOS;
  const seed = STATIC_PHOTOS.filter((p) => !manifest.hidden.includes(p.id));
  const all = [...seed, ...manifest.photos];
  return all.map((p) => ({
    ...p,
    featured:
      p.id in manifest.featured ? manifest.featured[p.id] : p.featured,
  }));
}

/** Full gallery for public pages (seed minus hidden, plus admin uploads). */
export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  return merge(await readManifestSafe());
}

export async function getFeaturedPhotos(): Promise<GalleryPhoto[]> {
  return (await getGalleryPhotos()).filter((p) => p.featured);
}

export interface AdminPhoto extends GalleryPhoto {
  hidden: boolean;
}

/** Photos for the admin manager: Blob uploads + seed not yet hidden/migrated. */
export async function getAdminPhotos(): Promise<AdminPhoto[]> {
  const manifest = (await readManifest()) ?? EMPTY_MANIFEST;
  const withFeatured = (p: GalleryPhoto): boolean =>
    p.id in manifest.featured ? manifest.featured[p.id] : Boolean(p.featured);
  const seed: AdminPhoto[] = STATIC_PHOTOS.filter(
    (p) => !manifest.hidden.includes(p.id),
  ).map((p) => ({ ...p, featured: withFeatured(p), hidden: false }));
  const managed: AdminPhoto[] = manifest.photos.map((p) => ({
    ...p,
    featured: withFeatured(p),
    hidden: false,
  }));
  return [...managed, ...seed];
}
