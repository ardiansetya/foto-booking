import { Camera, Heart, School, Users } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";

const SERVICES_LIST = [
  {
    icon: Camera,
    title: "Potret Solo Studio / Outdoor",
    description:
      "Sesi foto individu berfokus pada detail ekspresi dan kebanggaan pribadi wisudawan.",
  },
  {
    icon: Heart,
    title: "Wisuda Bersama Pasangan",
    description:
      "Abadikan momen kebahagiaan wisuda berdua dengan pasangan tercinta secara romantis.",
  },
  {
    icon: Users,
    title: "Sesi Grup & Sahabat",
    description:
      "Foto keseruan wisuda bersama geng atau sahabat seperjuangan selama di kampus.",
  },
  {
    icon: School,
    title: "Dokumentasi Keluarga",
    description:
      "Sesi formal dan emosional wisuda bersama orang tua dan keluarga terdekat.",
  },
];

export default function Services() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-24 md:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column: Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <ScrollReveal>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-3">
                Layanan Kami
              </span>
              <h2 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl leading-tight mb-4">
                Apa Yang Kami Tawarkan
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-[35ch]">
                Kami menyediakan berbagai konsep pemotretan wisuda yang
                disesuaikan dengan keinginan Anda.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-zinc-200 dark:divide-zinc-900 border-t border-b border-zinc-200 dark:border-zinc-900">
            {SERVICES_LIST.map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={service.title} delay={index * 0.1}>
                  <div className="py-8 flex gap-6 items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-amber-500 dark:text-amber-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-[55ch]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
