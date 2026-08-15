"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";

import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import SoundToggle from "@/components/SoundToggle";
import { useSound } from "@/components/SoundProvider";
import { NAV_LINKS } from "@/lib/site";
import { EASE } from "@/lib/motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { play } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the overlay menu is open.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-500 sm:px-4 ${
            scrolled
              ? "border-ink/12 bg-white/80 shadow-[0_16px_40px_-24px_rgb(7_24_43_/_0.45)]"
              : "border-ink/8 bg-white/55 shadow-[0_10px_30px_-26px_rgb(7_24_43_/_0.35)]"
          }`}
        >
          <Logo className="shrink-0 pl-1.5 text-ink" onMouseEnter={() => play("hover")} />

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => play("hover")}
                    onClick={() => play("nav")}
                    className={`type-label relative block rounded-full px-3.5 py-2 transition-colors duration-300 ${
                      active ? "text-ink" : "text-ink/55 hover:text-ink"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-pink transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <SoundToggle />

            <button
              type="button"
              onClick={() => {
                setOpen(true);
                play("nav");
              }}
              onMouseEnter={() => play("hover")}
              aria-label="Open navigation menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-cloud transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
