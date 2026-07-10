import ScrollReveal from "../shared/ScrollReveal";
import WhatsAppButton from "../shared/WhatsAppButton";

export default function FinalCTA() {
  return (
    <section className="bg-zinc-100 dark:bg-zinc-900 py-24 md:py-32 border-t border-zinc-200 dark:border-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-3">
              Mulai Sekarang
            </span>
            <h2 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl leading-tight mb-6">
              Sudah Siap Mengabadikan Momen Kelulusan Anda?
            </h2>
            <p className="text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-[50ch]">
              Hubungi kami hari ini untuk konsultasi konsep foto wisuda atau
              mengamankan tanggal slot pemotretan Anda.
            </p>
            <WhatsAppButton className="py-4 px-8 text-base">
              Amankan Slot Jadwal Anda
            </WhatsAppButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
