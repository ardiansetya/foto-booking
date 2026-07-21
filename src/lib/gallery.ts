import "server-only";
import { list } from "@vercel/blob";
import { PORTFOLIO_IMAGES } from "./data";
import type { PortfolioImage } from "./types";

export type GalleryCategory = PortfolioImage["category"];

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

// Repo seed photos (static imports).
export const STATIC_PHOTOS: GalleryPhoto[] = PORTFOLIO_IMAGES.map((img) => ({
  id: img.id,
  src: img.src.src,
  width: img.src.width,
  height: img.src.height,
  blurDataURL: img.src.blurDataURL,
  alt: img.alt,
  category: img.category,
  featured: img.featured,
  managed: false,
}));

export async function readManifest(): Promise<GalleryManifest | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH });
    const manifest = blobs.find((b) => b.pathname === MANIFEST_PATH);
    if (!manifest) return null;
    const res = await fetch(`${manifest.url}?ts=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<GalleryManifest>;
    return {
      hidden: data.hidden ?? [],
      featured: data.featured ?? {},
      photos: data.photos ?? [],
    };
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
  return merge(await readManifest());
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
