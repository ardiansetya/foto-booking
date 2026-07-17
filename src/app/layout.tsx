import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";
import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Jasa Foto Wisuda Profesional`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Jasa foto wisuda profesional dengan kualitas sinematik. Paket personal, couple, group mulai Rp 350.000. Booking mudah via WhatsApp, hasil edit 7-14 hari.",
  keywords: [
    "jasa foto wisuda",
    "fotografer wisuda",
    "foto wisuda murah",
    "paket foto wisuda",
    "foto graduation",
    "jasa fotografi wisuda profesional",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} | Jasa Foto Wisuda Profesional`,
    description:
      "Abadikan momen wisuda berharga Anda dengan kualitas sinematik premium. Booking mudah via WhatsApp.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Jasa Foto Wisuda Profesional`,
    description:
      "Abadikan momen wisuda berharga Anda dengan kualitas sinematik premium.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  description:
    "Jasa fotografi wisuda profesional dengan kualitas sinematik untuk mahasiswa tingkat akhir.",
  url: SITE_URL,
  email: SOCIAL_LINKS.email,
  priceRange: "Rp350.000 - Rp1.200.000",
  areaServed: "Indonesia",
  sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.tiktok],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Wisuda Personal",
      price: "350000",
      priceCurrency: "IDR",
    },
    {
      "@type": "Offer",
      name: "Wisuda Couple",
      price: "500000",
      priceCurrency: "IDR",
    },
    {
      "@type": "Offer",
      name: "Wisuda Best Friend",
      price: "750000",
      priceCurrency: "IDR",
    },
    {
      "@type": "Offer",
      name: "Wisuda Group",
      price: "1200000",
      priceCurrency: "IDR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static inline script for theme initialization
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-300 antialiased selection:bg-amber-400 selection:text-zinc-950 transition-colors duration-300">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD structured data for SEO
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="min-h-dvh pt-16 flex flex-col">
          <div className="flex-1">{children}</div>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
