import type { Package } from "@/lib/types";
import WhatsAppButton from "../shared/WhatsAppButton";

interface PackageCardProps {
  pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-colors duration-300">
      {/* Left: Name and Details */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          {pkg.name}
        </h3>
        <p className="text-zinc-605 dark:text-zinc-400 text-sm leading-relaxed max-w-[50ch] mb-6">
          {pkg.description}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-650 dark:text-zinc-400">
          {pkg.includes.map((inc) => (
            <li key={inc} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Middle: Highlight Specs */}
      <div className="flex flex-col gap-2.5 border-y lg:border-y-0 lg:border-x border-zinc-200 dark:border-zinc-800 py-4 lg:py-0 lg:px-8 shrink-0 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">Kapasitas:</span>
          <span className="text-zinc-800 dark:text-zinc-300 font-semibold">
            {pkg.people}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">Durasi:</span>
          <span className="text-zinc-800 dark:text-zinc-300 font-semibold">
            {pkg.duration}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">Hasil:</span>
          <span className="text-zinc-800 dark:text-zinc-300 font-semibold">
            {pkg.photos}
          </span>
        </div>
      </div>

      {/* Right: Price and CTA */}
      <div className="shrink-0 flex flex-col gap-4">
        <div>
          <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">
            Mulai dari
          </span>
          <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 font-mono tracking-tight">
            Rp {pkg.price.toLocaleString("id-ID")}
          </span>
        </div>
        <WhatsAppButton
          message={`Halo Omegraduation, saya ingin memesan paket "${pkg.name}".`}
          className="py-3 px-6 text-xs w-full lg:w-auto">
          Pilih Paket
        </WhatsAppButton>
      </div>
    </div>
  );
}
