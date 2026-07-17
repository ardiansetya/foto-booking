import { SOCIAL_LINKS } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-lg font-bold tracking-widest text-zinc-900 dark:text-zinc-50 focus-visible:outline-none">
              AURA
              <span className="text-emerald-500 dark:text-emerald-400">
                LENS
              </span>
            </Link>
            <p className="max-w-[45ch] text-sm leading-relaxed text-zinc-650 dark:text-zinc-400">
              Jasa fotografi wisuda profesional. Abadikan momen kelulusan
              berharga Anda dengan kualitas visual premium dan sinematik.
            </p>
          </div>

          {/* Links Column */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-4 tracking-wider uppercase">
                Menu
              </h4>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link
                    href="/portfolio"
                    className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/packages"
                    className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                    Packages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sop"
                    className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                    SOP
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-4 tracking-wider uppercase">
                Sosial
              </h4>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                    TikTok
                  </a>
                </li>
                <li className="break-all">
                  <a
                    href={`mailto:${SOCIAL_LINKS.email}`}
                    className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                    {SOCIAL_LINKS.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-200 dark:border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {currentYear} Omegraduation. Hak Cipta Dilindungi.</p>
          <p className="text-zinc-400 dark:text-zinc-600">
            Terdesain khusus untuk wisudawan Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
