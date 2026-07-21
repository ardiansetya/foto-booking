"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { GalleryPhoto } from "@/lib/gallery";
import ResponsiveImage from "../shared/ResponsiveImage";

const INTERVAL_MS = 6000;

const IMAGE_CLASS =
  "scale-105 animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-35 dark:opacity-60";

export default function HeroBackdrop({ photos }: { photos: GalleryPhoto[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const rotating = photos.length > 1 && !reduceMotion;

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % photos.length),
      INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [rotating, photos.length]);

  if (photos.length === 0) return null;

  // Single photo (or reduced motion): render statically.
  if (!rotating) {
    return (
      <ResponsiveImage
        src={photos[0].src}
        alt="Foto Wisuda Omegraduation"
        fill
        priority
        sizes="100vw"
        className={IMAGE_CLASS}
      />
    );
  }

  const current = photos[index];
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={current.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <ResponsiveImage
          src={current.src}
          alt="Foto Wisuda Omegraduation"
          fill
          priority={index === 0}
          sizes="100vw"
          className={IMAGE_CLASS}
        />
      </motion.div>
    </AnimatePresence>
  );
}
