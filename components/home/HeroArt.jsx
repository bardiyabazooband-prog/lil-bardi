"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import AudioPlayer from "@/components/AudioPlayer";
import { EASE } from "@/lib/motion";
import { LATEST_RELEASE } from "@/lib/site";

/**
 * Hero artwork stage: orbiting rings, floating sleeve, animated shine,
 * catalog badge, and the Ride or Die preview player.
 */
export default function HeroArt() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      className="relative mx-auto w-full max-w-[26rem] lg:max-w-none"
    >
      {/* Orbiting rings */}
      <span
        aria-hidden="true"
        className="absolute inset-[-9%] rounded-full border border-dashed border-ink/15 animate-spin-slow"
      >
        <span className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink" />
      </span>

      <span
        aria-hidden="true"
        className="absolute inset-[-18%] rounded-full border border-ink/10 animate-spin-slower"
      >
        <span className="absolute bottom-0 left-[22%] h-2 w-2 translate-y-1/2 rounded-full bg-lime" />
        <span className="absolute top-[30%] right-0 h-1.5 w-1.5 translate-x-1/2 rounded-full bg-aqua" />
      </span>

      {/* Glow */}
      <span
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-aqua/35 blur-[70px]"
      />

      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="group relative aspect-square w-full overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_40px_80px_-40px_rgb(7_24_43_/_0.55)] ring-1 ring-ink/10 transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1">
          <Image
            src={LATEST_RELEASE.image}
            alt="Ride or Die cover art by Lil Bardi"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="object-cover"
          />

          {/* Animated shine sweep */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-y-8 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-shine"
          />

          <span className="type-label absolute bottom-3 left-3 rounded-full bg-cloud/90 px-3 py-2 text-ink backdrop-blur-sm">
            {LATEST_RELEASE.catalog}
          </span>
        </div>
      </motion.div>

      <div className="relative mx-auto -mt-5 w-[85%] max-w-xs sm:w-[78%]">
        <AudioPlayer
          src={LATEST_RELEASE.audio}
          title={LATEST_RELEASE.title}
          variant="pill"
        />
      </div>
    </motion.div>
  );
}
