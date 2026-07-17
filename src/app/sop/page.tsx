import ScrollReveal from "@/components/shared/ScrollReveal";
import { Camera, CheckCircle, CreditCard } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Pemesanan & Pemotretan",
  description:
    "Prosedur booking foto wisuda: aturan sesi pemotretan, pengiriman file, proses edit, dan pembayaran. Baca sebelum booking.",
  alternates: { canonical: "/sop" },
};

const SOP_SECTIONS = [
  {
    icon: Camera,
    title: "Sesi Pemotretan",
    items: [
      "Semua paket sudah include transport area Solo - Semarang - Jogja - Salatiga - Kudus.",
      "Durasi foto dihitung sesuai jam booking foto.",
      "Toleransi keterlambatan 10 menit jika di luar hari H / fotografer tidak ada jam berikutnya.",
      "Bebas pilih spot foto. Jika mau pindah ke lokasi lain, jam booking tetap dihitung.",
      "Boleh infokan kebaya / outfitmu ke admin atau fotografer yang bertugas agar bisa diarahkan ke tone kami.",
      "Bisa sesi malam.",
    ],
  },
  {
    icon: CheckCircle,
    title: "Extra Time & Hasil Foto",
    items: [
      "Jika waktunya kurang, bisa extra time 30 menit (Rp 175.000) apabila fotografer tidak ada jam berikutnya.",
      "Extra time untuk paket Grub 30 menit Rp 250.000.",
      "Semua file foto akan diproses maksimal H+1 jam 12.00.",
      "Link foto dikirim oleh admin.",
    ],
  },
  {
    icon: CreditCard,
    title: "Pembayaran",
    items: [
      "DP Rp 150.000 untuk paket selain Luxury dan Grub.",
      "DP Rp 250.000 untuk paket Luxury.",
      "Pelunasan H-1 sebelum jam 21.00.",
      "Semua pembayaran akan hangus apabila ada pembatalan atau reschedule dari client.",
    ],
  },
];

export default function SopPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-16 md:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400 block mb-3">
            Panduan & Prosedur
          </span>
          <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl mb-4 leading-tight">
            Standard Operating Procedure
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            Harap membaca dan memahami SOP kami untuk memastikan seluruh proses
            pemotretan hingga penyerahan hasil berjalan lancar dan profesional.
          </p>
        </div>

        {/* SOP Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SOP_SECTIONS.map((section, index) => {
            const Icon = section.icon;
            return (
              <ScrollReveal key={section.title} delay={index * 0.1}>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 h-full flex flex-col transition-colors duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-100 dark:border-emerald-900/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    {section.title}
                  </h2>
                  <ul className="flex flex-col gap-4 text-sm text-zinc-650 dark:text-zinc-400 flex-1">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
