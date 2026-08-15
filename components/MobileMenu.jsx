"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

import { LogoMark } from "@/components/Logo";
import SoundToggle from "@/components/SoundToggle";
import { useSound } from "@/components/SoundProvider";
import { NAV_LINKS, SITE, SOCIALS } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { pad } from "@/lib/format";

export default function MobileMenu({ open, onClose }) {
  const reduce = useReducedMotion();
  const { play } = useSound();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const reveal = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { clipPath: "circle(0% at calc(100% - 42px) 42px)" },
        animate: { clipPath: "circle(155% at calc(100% - 42px) 42px)" },
        exit: { clipPath: "circle(0% at calc(100% - 42px) 42px)" },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          {...reveal}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-ink text-cloud"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-60" />
          <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-magenta/35 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-aqua/30 blur-[120px]" />

          <div className="relative flex items-center justify-between px-5 pt-6 sm:px-8">
            <LogoMark className="h-6 w-auto text-cloud" />

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              onMouseEnter={() => play("hover")}
              aria-label="Close navigation menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cloud/20 text-cloud transition-colors duration-300 hover:border-pink hover:text-pink"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Overlay navigation"
            className="relative flex flex-1 flex-col justify-center px-5 py-10 sm:px-8"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 + index * 0.06, duration: 0.55, ease: EASE }}
                  className="border-b border-cloud/10 last:border-b-0"
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      play("nav");
                      onClose();
                    }}
                    className="group flex items-baseline gap-4 py-3 sm:py-4"
                  >
                    <span className="type-label w-8 shrink-0 text-cloud/40 transition-colors group-hover:text-lime">
                      {pad(index + 1)}
                    </span>

                    <span className="type-display flex-1 text-[clamp(2.6rem,13vw,5.5rem)] text-cloud transition-colors duration-300 group-hover:text-aqua">
                      {link.label}
                    </span>

                    <ArrowUpRight
                      size={24}
                      aria-hidden="true"
                      className="shrink-0 -translate-x-2 text-cloud/30 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-pink group-hover:opacity-100"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="relative border-t border-cloud/10 px-5 pt-5 pb-8 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SoundToggle variant="bare" />
              <span className="type-label text-cloud/45">{SITE.handle.toUpperCase()}</span>
            </div>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {SOCIALS.map((social) => (
                <li key={social.key}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => play("hover")}
                    className="type-label text-cloud/70 transition-colors duration-300 hover:text-lime"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
