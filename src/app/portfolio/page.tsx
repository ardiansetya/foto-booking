import type { Metadata } from "next";
import GalleryGrid from "@/components/portfolio/GalleryGrid";

export const metadata: Metadata = {
  title: "Galeri Foto Wisuda & Wedding",
  description:
    "Galeri hasil foto wisuda dan wedding profesional: personal, couple, group, family. Lihat kualitas sinematik jepretan fotografer kami.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-16 md:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-3">
            Koleksi Foto
          </span>
          <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl mb-4 leading-tight">
            Galeri Kami
          </h1>
          <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed">
            Galeri dokumentasi wisuda dan wedding pilihan. Dikurasi khusus
            untuk inspirasi gaya dan pose pemotretan Anda.
          </p>
        </div>

        {/* Gallery Grid Client Island */}
        <GalleryGrid />
      </div>
    </div>
  );
}
