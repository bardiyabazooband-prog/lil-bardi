"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import ReleaseArt from "@/components/ReleaseArt";
import { useSound } from "@/components/SoundProvider";
import { accentOf } from "@/lib/site";
import { EASE, VIEWPORT_SOFT } from "@/lib/motion";
import { pad } from "@/lib/format";

/**
 * Release tile with a subtle pointer-driven 3D tilt. Tilt is skipped on touch
 * input and when the user prefers reduced motion.
 */
export default function ReleaseCard({ release, index = 0, size = "md", sizes }) {
  const reduce = useReducedMotion();
  const { play } = useSound();
  const accent = accentOf(release.accent);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 16 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 16 });

  function handleMove(event) {
    if (reduce || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    rx.set(((event.clientY - rect.top) / rect.height - 0.5) * -9);
    ry.set(((event.clientX - rect.left) / rect.width - 0.5) * 9);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
  }

  const titleSize =
    size === "lg"
      ? "text-[clamp(1.9rem,4vw,3.1rem)]"
      : "text-[clamp(1.4rem,2.6vw,2rem)]";

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_SOFT}
      transition={{ duration: 0.7, delay: Math.min(index * 0.06, 0.36), ease: EASE }}
      className="group h-full"
    >
      <Link
        href={`/releases/${release.slug}`}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        onMouseEnter={() => play("hover")}
        onClick={() => play("tap")}
        className="flex h-full flex-col gap-4 outline-offset-8"
        style={{ perspective: 1100 }}
      >
        <motion.div
          style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative"
        >
          <span
            aria-hidden="true"
            className={`absolute inset-4 -z-10 rounded-full ${accent.glow} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
          />

          <ReleaseArt
            release={release}
            sizes={sizes ?? "(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 30vw"}
            className="shadow-[0_24px_50px_-32px_rgb(7_24_43_/_0.5)] transition-transform duration-500 group-hover:scale-[1.02]"
          />

          <span className="type-label absolute top-3 left-3 rounded-full bg-cloud/90 px-2.5 py-1.5 text-ink backdrop-blur-sm">
            {pad(index + 1)}
          </span>

          <span
            className={`absolute right-3 bottom-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full ${accent.bg} text-ink opacity-0 transition-all duration-[400ms] group-hover:translate-y-0 group-hover:opacity-100`}
            aria-hidden="true"
          >
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </span>
        </motion.div>

        <div className="flex flex-1 flex-col gap-1.5">
          <h3
            className={`type-display ${titleSize} text-ink transition-colors duration-300 group-hover:text-blue`}
          >
            {release.title}
          </h3>

          <p className="type-label text-ink/45">
            {release.type.toUpperCase()}
            {release.tracks > 1 ? ` · ${release.tracks} SONGS` : ""} · {release.date.toUpperCase()}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
