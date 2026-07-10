"use client";
import { TESTIMONIALS } from "@/lib/data";
import ScrollReveal from "../shared/ScrollReveal";

export default function Testimonials() {
  return (
    <section className="bg-zinc-100 dark:bg-zinc-900 py-24 md:py-32 border-t border-zinc-200 dark:border-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-3">
              Testimoni Klien
            </span>
            <h2 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl leading-tight">
              Apa Kata Wisudawan
            </h2>
          </div>
        </ScrollReveal>

        {/* Scroll Snap Grid */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-track-zinc-200 dark:scrollbar-track-zinc-900 scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800">
          {TESTIMONIALS.map((testi, _index) => (
            <div
              key={testi.id}
              className="w-full sm:w-[450px] shrink-0 snap-start bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 rounded-lg flex flex-col justify-between"
            >
              {/* Quote */}
              <blockquote className="text-zinc-800 dark:text-zinc-100 text-lg leading-relaxed mb-6 font-medium italic">
                &ldquo;{testi.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
                  {testi.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {testi.university} &middot;{" "}
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {testi.package}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
