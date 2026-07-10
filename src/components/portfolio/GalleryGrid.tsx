"use client";
import { useState } from "react";
import { PORTFOLIO_IMAGES } from "@/lib/data";
import ResponsiveImage from "../shared/ResponsiveImage";
import ScrollReveal from "../shared/ScrollReveal";
import Lightbox from "./Lightbox";

const CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "personal", label: "Personal" },
  { id: "couple", label: "Couple" },
  { id: "bestfriend", label: "Best Friend" },
  { id: "group", label: "Group" },
  { id: "family", label: "Family" },
] as const;

export default function GalleryGrid() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    selectedCat === "all"
      ? PORTFOLIO_IMAGES
      : PORTFOLIO_IMAGES.filter((img) => img.category === selectedCat);

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat.id}
            onClick={() => {
              setSelectedCat(cat.id);
              setLightboxIndex(null);
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-[0.98] ${
              selectedCat === cat.id
                ? "bg-amber-400 text-zinc-950 font-bold"
                : "bg-zinc-200 text-zinc-650 dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Layout Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredImages.map((img, index) => (
          <ScrollReveal key={img.id} delay={index * 0.05}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="w-full text-left break-inside-avoid group relative overflow-hidden bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 cursor-pointer rounded-lg mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <ResponsiveImage
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Subtle hover detail */}
              <div className="absolute inset-0 bg-zinc-100/50 dark:bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-zinc-900 dark:text-zinc-100 text-xs font-medium truncate w-full">
                  {img.alt}
                </p>
              </div>
            </button>
          </ScrollReveal>
        ))}
      </div>

      {/* Image Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </div>
  );
}
