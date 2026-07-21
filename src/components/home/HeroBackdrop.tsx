"use client";

import { useEffect, useState } from "react";
import type { GalleryPhoto } from "@/lib/gallery";
import ResponsiveImage from "../shared/ResponsiveImage";

const INTERVAL_MS = 6000;

const IMAGE_CLASS =
  "scale-105 animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-35 dark:opacity-60";

export default function HeroBackdrop({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const rotating = photos.length > 1;

  // Reduced motion removes the crossfade but keeps the rotation.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setInstant(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setInstant(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % photos.length),
      INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [rotating, photos.length]);

  if (photos.length === 0) return null;

  // All photos stay mounted so the next one is already decoded before
  // its turn; only opacity changes. Reliable on mobile.
  return (
    <>
      {photos.map((photo, i) => (
        <div
          key={photo.id}
          aria-hidden={i !== index}
          className="absolute inset-0"
          style={{
            opacity: i === index ? 1 : 0,
            transition: instant ? undefined : "opacity 1200ms ease-in-out",
          }}
        >
          <ResponsiveImage
            src={photo.src}
            alt="Foto Wisuda Omegraduation"
            fill
            priority={i === 0}
            loading={i === 0 ? undefined : "eager"}
            sizes="100vw"
            className={IMAGE_CLASS}
          />
        </div>
      ))}
    </>
  );
}
