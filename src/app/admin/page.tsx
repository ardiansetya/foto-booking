import type { Metadata } from "next";
import AdminGallery from "@/components/admin/AdminGallery";
import { GALLERY_CATEGORIES, getAdminPhotos } from "@/lib/gallery";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Admin Galeri",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const photos = await getAdminPhotos();
  const blobReady = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-12 md:py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            Kelola Galeri
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Upload foto baru, hapus foto, atau tandai foto unggulan untuk
            halaman utama.
          </p>
        </div>

        {!blobReady && (
          <div className="mb-8 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-amber-800 dark:text-amber-300">
            Vercel Blob belum terhubung. Upload dan hapus foto belum aktif.
            Hubungkan Blob store di dashboard Vercel.
          </div>
        )}

        <Providers>
          <AdminGallery
            initialPhotos={photos}
            categories={GALLERY_CATEGORIES}
            blobReady={blobReady}
          />
        </Providers>
      </div>
    </div>
  );
}
