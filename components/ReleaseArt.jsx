import Image from "next/image";

import { accentOf } from "@/lib/site";

/**
 * Cover art with an honest fallback: releases without artwork in /public get a
 * typographic sleeve built from the design system instead of a broken <img>.
 */
export default function ReleaseArt({
  release,
  sizes = "(max-width: 768px) 90vw, 33vw",
  priority = false,
  className = "",
  rounded = "rounded-2xl",
}) {
  const accent = accentOf(release.accent);

  return (
    <div
      className={`@container relative aspect-square w-full overflow-hidden ${rounded} bg-ink ${className}`}
    >
      {release.image ? (
        <Image
          src={release.image}
          alt={`${release.title} cover art by Lil Bardi`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-br ${accent.gradient}`}
        >
          <div className="absolute inset-0 bg-blueprint-dark opacity-40" />
          <div className="absolute -right-8 -bottom-10 h-40 w-40 rounded-full bg-ink/25 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between p-[6%]">
            <div className="flex items-start justify-between gap-2">
              <span className="type-label text-ink/70">LB.</span>
              <span className="type-label text-ink/60">{release.type.toUpperCase()}</span>
            </div>

            <p className="type-display text-ink text-[clamp(1.4rem,7cqw,3rem)] break-words">
              {release.title}
            </p>

            <span className="type-label text-ink/60">{release.catalog}</span>
          </div>
        </div>
      )}

      {!release.image ? (
        <span className="sr-only">{`${release.title} — artwork coming soon`}</span>
      ) : null}
    </div>
  );
}
