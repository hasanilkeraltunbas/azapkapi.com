"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { navLinks, site } from "@/lib/site";

const overlayRoutes = new Set(["/", "/garden", "/rooms", "/teras"]);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = overlayRoutes.has(pathname) && !scrolled && !open;
  const light = overlay;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        overlay ? "bg-transparent" : "bg-cream/90 backdrop-blur-md",
      )}
    >
      <div className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={cn(
            "font-display text-xl font-medium tracking-tight transition-colors",
            light ? "text-cream" : "text-charcoal",
          )}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-opacity",
                  light ? "text-cream" : "text-charcoal",
                  active ? "opacity-100" : "opacity-60 hover:opacity-100",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          className={cn("md:hidden", light ? "text-cream" : "text-charcoal")}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-cream px-8 pt-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-olive/15 py-5 font-display text-4xl font-medium text-charcoal"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <p className="mt-auto pb-12 text-sm text-charcoal/50">{site.location}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
