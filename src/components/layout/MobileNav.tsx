"use client";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import WhatsAppButton from "../shared/WhatsAppButton";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close nav on window resize to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        className="relative z-50 p-2 text-zinc-700 hover:text-amber-400 dark:text-zinc-300 dark:hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-white dark:bg-zinc-950 px-6 pt-24 pb-8"
          >
            <nav className="flex flex-col gap-6 text-xl font-medium">
              <Link
                href="/portfolio"
                onClick={() => setIsOpen(false)}
                className="border-b border-zinc-200 dark:border-zinc-900 py-3 text-zinc-700 hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400 transition-colors"
              >
                Galeri
              </Link>
              <Link
                href="/packages"
                onClick={() => setIsOpen(false)}
                className="border-b border-zinc-200 dark:border-zinc-900 py-3 text-zinc-700 hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400 transition-colors"
              >
                Paket
              </Link>
              <Link
                href="/sop"
                onClick={() => setIsOpen(false)}
                className="border-b border-zinc-200 dark:border-zinc-900 py-3 text-zinc-700 hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400 transition-colors"
              >
                SOP
              </Link>
              <div className="mt-8 flex flex-col">
                <WhatsAppButton
                  className="w-full py-4 text-base"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
