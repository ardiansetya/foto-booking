import type { Metadata } from "next";
import { Suspense } from "react";
import PhotoPicker, {
  PhotoPickerFallback,
} from "@/components/pilih-foto/PhotoPicker";

export const metadata: Metadata = {
  title: "Pilih Foto",
  description:
    "Pilih foto favorit Anda langsung dari galeri, lalu kirim daftar pilihan ke fotografer via WhatsApp.",
  robots: { index: false, follow: false },
};

export default function PilihFotoPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-16 md:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-3">
            Galeri Foto
          </span>
          <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl mb-4 leading-tight">
            Pilih Foto Anda
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            Tap foto yang ingin diedit, lalu kirim daftar pilihan Anda langsung
            ke fotografer via WhatsApp. Tidak perlu mengetik nama file manual.
          </p>
        </div>

        <Suspense fallback={<PhotoPickerFallback />}>
          <PhotoPicker />
        </Suspense>
      </div>
    </div>
  );
}
