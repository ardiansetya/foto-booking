import { MessageCircle } from "lucide-react";
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import type { Package } from "@/lib/types";

interface PackageCardProps {
  pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const message = `Halo kak, aku tertarik sama paket ${pkg.name} nih. Boleh tanya-tanya dulu ga ya? 😊`;
  const waHref = `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 flex flex-col h-full transition-colors duration-300">
      {/* Name and Description */}
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
        {pkg.name}
      </h3>
      <p className="text-zinc-605 dark:text-zinc-400 text-sm leading-relaxed mb-6">
        {pkg.description}
      </p>

      {/* Highlight Specs */}
      <div className="flex flex-col gap-2.5 border-y border-zinc-200 dark:border-zinc-800 py-4 mb-6 text-xs">
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

      {/* Includes */}
      <ul className="flex flex-col gap-3 text-xs text-zinc-650 dark:text-zinc-400 mb-8 flex-1">
        {pkg.includes.map((inc) => (
          <li key={inc} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
            <span>{inc}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-xs font-medium text-zinc-950 transition-all duration-200 hover:bg-amber-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950"
      >
        <MessageCircle className="h-4 w-4" />
        Tanya Paket Ini
      </a>
    </div>
  );
}
