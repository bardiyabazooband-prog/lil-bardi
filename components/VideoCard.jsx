"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

import { useSound } from "@/components/SoundProvider";
import { formatCount, formatDate, pad } from "@/lib/format";
import { EASE, VIEWPORT_SOFT } from "@/lib/motion";

/**
 * Single YouTube video tile. `featured` renders the wide hero variant.
 * Thumbnails come straight from the API response — no invented IDs.
 */
export default function VideoCard({ video, index = 0, featured = false }) {
  const reduce = useReducedMotion();
  const { play } = useSound();

  const views = formatCount(video.views);
  const published = formatDate(video.publishedAt);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_SOFT}
      transition={{ duration: 0.65, delay: Math.min(index * 0.05, 0.3), ease: EASE }}
      className="group h-full"
    >
      <a
        href={video.url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => play("hover")}
        onClick={() => play("tap")}
        className="flex h-full flex-col gap-3 outline-offset-8"
      >
        <div
          className={`relative w-full overflow-hidden rounded-2xl bg-ink ${
            featured ? "aspect-video sm:rounded-3xl" : "aspect-video"
          }`}
        >
          {video.thumbnail?.url ? (
            <Image
              src={video.thumbnail.url}
              alt={`${video.title} — Lil Bardi on YouTube`}
              fill
              sizes={
                featured
                  ? "(max-width: 1024px) 92vw, 62vw"
                  : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
              }
              priority={featured}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-inkblue via-ink to-blue">
              <div className="absolute inset-0 bg-blueprint-dark opacity-40" />
            </div>
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent"
          />

          <span className="type-label absolute top-3 left-3 rounded-full bg-cloud/90 px-2.5 py-1.5 text-ink">
            {pad(index + 1)}
          </span>

          {video.duration ? (
            <span className="type-label absolute top-3 right-3 rounded-full bg-ink/80 px-2.5 py-1.5 text-cloud tabular-nums backdrop-blur-sm">
              {video.duration}
            </span>
          ) : null}

          <motion.span
            aria-hidden="true"
            whileHover={reduce ? undefined : { scale: 1.12, rotate: 6 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className={`absolute bottom-3 left-3 flex items-center justify-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:-translate-y-0.5 ${
              featured ? "h-14 w-14 sm:h-16 sm:w-16" : "h-11 w-11"
            }`}
          >
            <Play size={featured ? 22 : 16} fill="currentColor" />
          </motion.span>
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <h3
            className={`text-ink transition-colors duration-300 group-hover:text-blue ${
              featured
                ? "type-display text-[clamp(1.7rem,3.4vw,2.8rem)]"
                : "text-base leading-snug font-semibold sm:text-lg"
            }`}
          >
            {video.title}
          </h3>

          <p className="type-label text-ink/45">
            {[published, views ? `${views} VIEWS` : null].filter(Boolean).join(" · ")}
          </p>

          {featured && video.description ? (
            <p className="mt-1 line-clamp-2 max-w-xl text-sm text-ink/60">
              {video.description}
            </p>
          ) : null}
        </div>
      </a>
    </motion.article>
  );
}
