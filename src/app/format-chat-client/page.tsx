import ChatGenerator from "@/components/format-chat/ChatGenerator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Format Chat Client",
  description:
    "Buat pesan konfirmasi WhatsApp untuk sesi foto wisuda Omegraduation secara otomatis dan rapi.",
  robots: { index: false, follow: false },
};

export default function FormatChatClientPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-16 md:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400 block mb-3">
            Alat Bantu
          </span>
          <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl mb-4 leading-tight">
            Format Chat Client
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            Isi detail sesi foto wisuda, lalu buat pesan konfirmasi WhatsApp
            yang rapi dan siap dikirim ke client dalam sekali klik.
          </p>
        </div>

        <ChatGenerator />
      </div>
    </div>
  );
}
