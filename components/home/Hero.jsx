"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import HeroArt from "@/components/home/HeroArt";
import MagneticButton from "@/components/MagneticButton";
import Orbs from "@/components/Orbs";
import SocialIcon from "@/components/SocialIcon";
import { useSound } from "@/components/SoundProvider";
import { EASE, maskUp } from "@/lib/motion";
import { LATEST_RELEASE, SITE, SOCIALS } from "@/lib/site";

const WORDS = ["LIL", "BARDI"];

export default function Hero() {
  const reduce = useReducedMotion();
  const { play } = useSound();

  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
      <Orbs variant="home" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-70 mask-fade-b"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Copy column */}
          <div className="flex flex-col gap-7">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
              className="type-label inline-flex items-center gap-2.5 self-start rounded-full border border-ink/12 bg-white/70 px-3.5 py-2 text-ink/70 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-aqua animate-pulse-dot" aria-hidden="true" />
              OFFICIALLILBARDI / SIGNAL ACTIVE
            </motion.p>

            <h1 className="sr-only">Lil Bardi — official website</h1>

            <div aria-hidden="true" className="flex flex-col">
              {WORDS.map((word, index) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    variants={maskUp}
                    initial={reduce ? false : "hidden"}
                    animate="show"
                    transition={{ delay: 0.1 + index * 0.11, duration: 0.9, ease: EASE }}
                    className="type-display block text-[clamp(4.2rem,17vw,11rem)] text-ink"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.65, ease: EASE }}
              className="flex flex-col gap-4 border-l-2 border-pink pl-5"
            >
              <p className="type-label text-ink/45">CURRENT FREQUENCY / SINGLE 01</p>

              <p className="type-display text-[clamp(2.1rem,7vw,4rem)] text-ink">
                {LATEST_RELEASE.title}
              </p>

              <p className="type-label text-blue">OUT AUGUST 7, 2026</p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.6, ease: EASE }}
              className="flex flex-wrap gap-3"
            >
              <MagneticButton href={SITE.smartLink} external tone="ink">
                LISTEN NOW
              </MagneticButton>

              <MagneticButton href={SITE.smartLink} external tone="cloud">
                PRESAVE NEXT RELEASE
              </MagneticButton>
            </motion.div>

            <motion.ul
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6, ease: EASE }}
              className="flex flex-wrap items-center gap-2.5"
            >
              {SOCIALS.map((social) => (
                <li key={social.key}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => play("hover")}
                    onClick={() => play("tap")}
                    aria-label={`Lil Bardi on ${social.label}`}
                    className="type-label group flex items-center gap-2 rounded-full border border-ink/12 bg-white/70 px-3.5 py-2.5 text-ink/65 backdrop-blur-sm transition-colors duration-300 hover:border-ink/30 hover:text-ink"
                  >
                    <SocialIcon
                      name={social.key}
                      size={15}
                      className="transition-transform duration-300 group-hover:scale-115"
                    />
                    <span className="hidden sm:inline">{social.label.toUpperCase()}</span>
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Art column */}
          <HeroArt />
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-ink/10 pt-5 lg:mt-16"
        >
          <p className="type-label flex items-center gap-2 text-ink/45">
            SCROLL TO ENTER THE SEASON
            <ArrowDownRight size={15} aria-hidden="true" />
          </p>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {["MUSIC", "RELEASES", "VIDEOS", "ABOUT"].map((label) => (
              <li key={label}>
                <Link
                  href={`/${label.toLowerCase()}`}
                  onMouseEnter={() => play("hover")}
                  className="type-label text-ink/55 transition-colors duration-300 hover:text-pink"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
