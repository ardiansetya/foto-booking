import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";
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
  title: {
    default: "Omegraduation | Jasa Fotografi Wisuda Profesional",
    template: "%s | Omegraduation",
  },
  description:
    "Showcase portfolio dan booking layanan fotografi wisuda berkualitas tinggi untuk mahasiswa tingkat akhir.",
  openGraph: {
    title: "Omegraduation | Jasa Fotografi Wisuda Profesional",
    description:
      "Abadikan momen wisuda berharga Anda dengan kualitas sinematik premium.",
    type: "website",
    locale: "id_ID",
  },
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
