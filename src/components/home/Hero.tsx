import Link from "next/link";
import { PORTFOLIO_IMAGES } from "@/lib/data";
import ResponsiveImage from "../shared/ResponsiveImage";

export default function Hero() {
  const heroImage = PORTFOLIO_IMAGES[0]; // First image from portfolio

  return (
    <section className="relative h-[calc(100dvh-4rem)] min-h-[500px] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="scale-105 animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-35 dark:opacity-60"
        />
        {/* Shroud for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 md:px-8 md:pb-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400">
            Fotografi Wisuda &amp; Wedding Premium
          </span>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Momen Berharga,
            <br />
            Kualitas Sinematik.
          </h1>

          {/* Subtext */}
          <p className="mb-8 text-base md:text-lg text-zinc-700 dark:text-zinc-300 max-w-[45ch] leading-relaxed">
            Abadikan momen wisuda dan hari pernikahan Anda dalam potret terbaik
            yang elegan dan abadi.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center rounded-full bg-amber-400 px-8 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950"
            >
              Lihat Galeri
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
