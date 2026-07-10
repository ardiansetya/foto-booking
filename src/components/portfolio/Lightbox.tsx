"use client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { PortfolioImage } from "@/lib/types";

interface LightboxProps {
  images: PortfolioImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  // Simple swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe left (next)
    if (diff > 50) handleNext();
    // Swipe right (prev)
    if (diff < -50) handlePrev();

    setTouchStart(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 p-4 md:p-8 backdrop-blur-sm"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image lightbox"
        className="absolute top-4 right-4 z-50 rounded-full bg-zinc-900/80 p-3 text-zinc-300 hover:text-amber-400 focus-visible:outline-none transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous image"
        className="absolute left-4 z-40 rounded-full bg-zinc-900/80 p-3 text-zinc-300 hover:text-amber-400 focus-visible:outline-none transition-colors hidden sm:block"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next image"
        className="absolute right-4 z-40 rounded-full bg-zinc-900/80 p-3 text-zinc-300 hover:text-amber-400 focus-visible:outline-none transition-colors hidden sm:block"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Main Image Container */}
      <div className="relative w-full h-full max-w-5xl max-h-[85vh] flex flex-col justify-center items-center">
        <div className="relative w-full h-full">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption */}
        <div className="text-center mt-4">
          <p className="text-zinc-200 text-sm font-medium">
            {currentImage.alt}
          </p>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wider font-mono">
            {currentIndex + 1} / {images.length} &middot;{" "}
            {currentImage.category}
          </p>
        </div>
      </div>
    </div>
  );
}
