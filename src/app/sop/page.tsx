import ScrollReveal from "@/components/shared/ScrollReveal";
import { Camera, CheckCircle, CreditCard } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Pemesanan & Pemotretan",
  description:
    "Standard Operating Procedure (SOP) untuk sesi pemotretan, pasca pemotretan, dan pelunasan di Omegraduation.",
};

const SOP_SECTIONS = [
  {
    icon: Camera,
    title: "Sesi Pemotretan",
    items: [
      "Datang tepat waktu, toleransi keterlambatan 10 - 15 menit. Jika terjadi keterlambatan dari fotografer, hubungi admin Omegraduation.",
      "Boleh melihat hasil preview foto yang diambil oleh fotografer di lokasi.",
      "Kirimkan moodboard ke admin Omegraduation atau tim fotografer jika Anda memilikinya.",
      "Ikuti arahan dari fotografer agar hasil foto Anda lebih maksimal.",
      "Jika ada permintaan khusus (request), silakan langsung sampaikan kepada fotografer.",
    ],
  },
  {
    icon: CheckCircle,
    title: "Setelah Pemotretan",
    items: [
      "File foto / link website akan dikirimkan paling lambat H+1 atau 1x24 jam.",
      "Seluruh file foto akan dikirimkan setelah proses pembayaran selesai dilunasi.",
      "Usia website galeri aktif selama 1 bulan, setelah itu sistem akan menghapus data otomatis.",
      "Proses edit file foto paling lambat 14 hari kerja setelah mengajukan daftar (list) edit.",
      "Pengajuan file edit maksimal H+10. Apabila lewat batas waktu, urusan dianggap selesai (clear).",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment / Pelunasan",
    items: [
      "Harap melakukan transaksi pelunasan biaya H-2 atau saat hari H pelaksanaan foto wisuda.",
      "Pembayaran harus tepat waktu agar tautan (link) website galeri Anda segera diproses.",
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
