import ScrollReveal from "../shared/ScrollReveal";

const STEPS = [
  {
    number: "01",
    title: "Pilih Paket",
    description:
      "Pilih paket foto yang paling sesuai dengan kebutuhan Anda.",
  },
  {
    number: "02",
    title: "Hubungi Kami",
    description:
      "Hubungi kami via WhatsApp untuk konsultasi dan cek ketersediaan jadwal.",
  },
  {
    number: "03",
    title: "Bayar DP",
    description:
      "DP Rp 150.000 (paket Luxury Rp 250.000) untuk mengamankan slot jadwal Anda. Pelunasan H-1 sebelum jam 21.00.",
  },
  {
    number: "04",
    title: "Sesi Foto",
    description:
      "Proses pengambilan foto sesuai jam booking dan lokasi yang disepakati. Bebas pilih spot foto.",
  },
  {
    number: "05",
    title: "Terima Foto",
    description:
      "File foto diproses maksimal H+1 jam 12.00. Link foto dikirim oleh admin via Google Drive.",
  },
];

export default function BookingSteps() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-24 md:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-3">
              Proses Pemesanan
            </span>
            <h2 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl leading-tight">
              Cara Melakukan Booking
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {STEPS.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.1}>
              <div className="flex flex-col">
                <span className="text-5xl font-extrabold text-zinc-300 dark:text-zinc-800 font-mono tracking-tighter mb-4">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
