import ScrollReveal from "../shared/ScrollReveal";
import BookingForm from "./BookingForm";

export default function FinalCTA() {
  return (
    <section
      id="booking"
      className="bg-zinc-100 dark:bg-zinc-900 py-24 md:py-32 border-t border-zinc-200 dark:border-zinc-950 transition-colors duration-300 scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-3">
              Mulai Sekarang
            </span>
            <h2 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl leading-tight mb-6">
              Yuk Booking Sekarang Juga, dan Dapatkan Hasil Foto Terbaik!
            </h2>
            <p className="text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-[50ch] mx-auto">
              Isi detail rencana pemotretan Anda di bawah, lalu kirim langsung
              ke admin kami via WhatsApp.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <BookingForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
