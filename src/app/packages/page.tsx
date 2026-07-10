import type { Metadata } from "next";
import BookingSteps from "@/components/home/BookingSteps";
import PackageCard from "@/components/packages/PackageCard";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { FAQS, PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Paket & Harga",
  description:
    "Daftar paket harga fotografi wisuda premium. Pilih layanan terbaik untuk Anda.",
};

export default function PackagesPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-16 md:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-3">
            Pilihan Layanan
          </span>
          <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl mb-4 leading-tight">
            Paket &amp; Harga Foto
          </h1>
          <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed">
            Pilih paket terbaik yang sesuai dengan konsep wisuda Anda.
            Transparan, lengkap, dan tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Packages List */}
        <div className="flex flex-col gap-6 mb-24">
          {PACKAGES.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 0.05}>
              <PackageCard pkg={pkg} />
            </ScrollReveal>
          ))}
        </div>

        {/* SOP Booking Process Section (Reused Component) */}
        <div className="border-t border-zinc-200 dark:border-zinc-900">
          <BookingSteps />
        </div>

        {/* FAQ Section */}
        <section className="border-t border-zinc-200 dark:border-zinc-900 pt-24 pb-12">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-3">
                  Tanya Jawab
                </span>
                <h2 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-4xl leading-tight">
                  Frequently Asked Questions
                </h2>
              </div>
            </ScrollReveal>

            {/* Native details-summary accordions (zero JS, fully accessible) */}
            <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-900 border-t border-b border-zinc-200 dark:border-zinc-900">
              {FAQS.map((faq, index) => (
                <ScrollReveal key={faq.id} delay={index * 0.05}>
                  <details className="group py-6">
                    <summary className="flex justify-between items-center cursor-pointer text-base font-semibold text-zinc-800 dark:text-zinc-100 focus-visible:outline-none focus-visible:text-amber-500 dark:focus-visible:text-amber-400 transition-colors list-none select-none">
                      <span>{faq.question}</span>
                      <span className="text-zinc-500 group-open:rotate-45 transition-transform duration-200 text-xl font-light leading-none">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-1">
                      {faq.answer}
                    </p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
