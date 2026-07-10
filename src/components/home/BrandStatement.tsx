import ScrollReveal from "../shared/ScrollReveal";

export default function BrandStatement() {
  return (
    <section className="bg-zinc-100 dark:bg-zinc-900 py-24 md:py-32 border-y border-zinc-200 dark:border-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-4">
              Visi Kami
            </span>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-normal text-zinc-800 dark:text-zinc-100">
              Kami percaya kelulusan wisuda adalah salah satu pencapaian
              terbesar dalam hidup Anda. Komitmen kami adalah menangkap setiap
              kebanggaan, senyuman, dan rasa haru dalam tangkapan lensa
              berkualitas premium.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
