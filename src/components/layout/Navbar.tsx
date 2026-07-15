"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WhatsAppButton from "../shared/WhatsAppButton";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-200">
      {/* Background layer with blur to prevent containing block issues for full-screen fixed child components */}
      <div className="absolute inset-0 -z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-widest text-zinc-900 dark:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400"
        >
          AURA
          <span className="text-emerald-500 dark:text-emerald-400">LENS</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/portfolio"
              className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400 ${
                isActive("/portfolio")
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-zinc-600 hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
              }`}
            >
              Portfolio
            </Link>
            <Link
              href="/packages"
              className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400 ${
                isActive("/packages")
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-zinc-600 hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
              }`}
            >
              Paket
            </Link>
            <Link
              href="/sop"
              className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400 ${
                isActive("/sop")
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-zinc-600 hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
              }`}
            >
              SOP
            </Link>
            <WhatsAppButton className="py-2 text-sm">
              Hubungi Kami
            </WhatsAppButton>
          </nav>

          {/* Theme Toggle (Desktop and Mobile) */}
          <ThemeToggle />

          {/* Mobile Nav Toggle Component */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
