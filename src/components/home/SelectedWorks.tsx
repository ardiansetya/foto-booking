import Link from "next/link";
import { PORTFOLIO_IMAGES } from "@/lib/data";
import ResponsiveImage from "../shared/ResponsiveImage";
import ScrollReveal from "../shared/ScrollReveal";

export default function SelectedWorks() {
  const featuredWorks = PORTFOLIO_IMAGES.filter((img) => img.featured);

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-24 md:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {/* <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-3">
                Karya Terpilih
              </span> */}
              <h2 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl leading-tight">
                Galeri Wisuda Unggulan
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300 transition-colors focus-visible:outline-none"
            >
              Lihat Semua Karya &rarr;
            </Link>
          </div>
        </ScrollReveal>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredWorks.map((work, index) => {
            // Apply asymmetric sizes: first and last span 2 columns
            const colSpan =
              index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1";
            const height =
              index === 0 || index === 3
                ? "h-[300px] md:h-[450px]"
                : "h-[350px] md:h-[450px]";

            return (
              <ScrollReveal key={work.id} delay={index * 0.1}>
                <div
                  className={`group relative overflow-hidden bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 ${colSpan} ${height}`}>
                  <ResponsiveImage
                    src={work.src}
                    alt={work.alt}
                    fill
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-100/90 via-transparent to-transparent dark:from-zinc-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-zinc-900 dark:text-zinc-100 text-sm font-medium">
                      {work.alt}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
