import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import AccentDot from "@/components/AccentDot";
import MagneticButton from "@/components/MagneticButton";
import Orbs from "@/components/Orbs";
import ReleaseArt from "@/components/ReleaseArt";
import ReleaseCard from "@/components/ReleaseCard";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import StatStrip from "@/components/StatStrip";
import { pad } from "@/lib/format";
import { LATEST_RELEASE, RELEASES, SITE } from "@/lib/site";

export const metadata = {
  title: "Releases",
  description:
    "The complete Lil Bardi catalog — Ride or Die, Foreign Season, Rarri, Loaded Up, Racks in the Safe, and Calibaby.",
};

const REST = RELEASES.slice(1);

export default function ReleasesPage() {
  const albums = RELEASES.filter((release) => release.type === "Album").length;
  const eps = RELEASES.filter((release) => release.type === "EP").length;
  const singles = RELEASES.filter((release) => release.type === "Single").length;
  const songs = RELEASES.reduce((total, release) => total + release.tracks, 0);

  return (
    <>
      {/* Hero — catalog index, editorial */}
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36">
        <Orbs variant="releases" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-blueprint opacity-60 mask-fade-b"
        />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal y={14} duration={0.5}>
            <p className="type-label inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-white/70 px-3.5 py-2 text-ink/70 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-blue animate-pulse-dot" aria-hidden="true" />
              LIL BARDI / CATALOG INDEX
            </p>
          </Reveal>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <h1>
              <Reveal y={40} duration={0.9}>
                <span className="type-display block text-[clamp(3.2rem,13vw,9rem)] text-ink">
                  Every
                </span>
              </Reveal>
              <Reveal y={40} duration={0.9} delay={0.1}>
                <span className="type-display block text-[clamp(3.2rem,13vw,9rem)] text-ink">
                  release<AccentDot tone="blue" />
                </span>
              </Reveal>
            </h1>

            <Reveal delay={0.18}>
              <p className="text-base text-ink/60 sm:text-lg">
                Singles, an EP, and a full length album — the whole catalog in one place,
                newest first<AccentDot tone="ink" />
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.26} className="mt-12">
            <StatStrip
              items={[
                { label: "RELEASES", value: pad(RELEASES.length), note: `${songs} songs total` },
                { label: "PROJECTS", value: `${albums} ALBUM / ${eps} EP`, note: "Long-form work" },
                { label: "SINGLES", value: pad(singles), note: "Standalone drops" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Featured latest release — wide editorial row */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <SectionLabel index="01">MOST RECENT</SectionLabel>

        <Reveal className="mt-8">
          <Link
            href={`/releases/${LATEST_RELEASE.slug}`}
            className="group grid gap-7 rounded-3xl border border-ink/10 bg-white p-5 transition-colors duration-500 hover:border-blue/40 sm:p-7 lg:grid-cols-[0.42fr_1fr] lg:items-center lg:gap-10"
          >
            <ReleaseArt
              release={LATEST_RELEASE}
              priority
              sizes="(max-width: 1024px) 88vw, 34vw"
              className="transition-transform duration-500 group-hover:scale-[1.02]"
            />

            <div className="flex flex-col gap-5">
              <p className="type-label text-ink/45">
                {LATEST_RELEASE.type.toUpperCase()} · OUT {LATEST_RELEASE.date.toUpperCase()}
              </p>

              <h2 className="type-display text-[clamp(2.6rem,8vw,5.4rem)] text-ink transition-colors duration-300 group-hover:text-blue">
                {LATEST_RELEASE.title}
              </h2>

              <p className="max-w-xl text-base text-ink/60 sm:text-lg">
                {LATEST_RELEASE.blurb}
              </p>

              <span className="type-label inline-flex items-center gap-2 text-ink">
                OPEN RELEASE
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Full catalog grid */}
      <section className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionLabel index="02">FULL CATALOG / {pad(RELEASES.length)}</SectionLabel>

          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {REST.map((release, index) => (
              <li key={release.slug} className="h-full">
                <ReleaseCard release={release} index={index + 1} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline list — a second way to read the catalog */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionLabel index="03">RELEASE TIMELINE</SectionLabel>

        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {RELEASES.map((release, index) => (
            <li key={release.slug}>
              <Link
                href={`/releases/${release.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 sm:gap-6 sm:py-6"
              >
                <span className="type-label w-8 text-ink/35">{pad(index + 1)}</span>

                <span className="min-w-0">
                  <span className="type-display block truncate text-[clamp(1.5rem,4.5vw,2.6rem)] text-ink transition-colors duration-300 group-hover:text-pink">
                    {release.title}
                  </span>
                  <span className="type-label mt-1.5 block text-ink/45">
                    {release.type.toUpperCase()}
                    {release.tracks > 1 ? ` · ${release.tracks} SONGS` : ""} ·{" "}
                    {release.date.toUpperCase()}
                  </span>
                </span>

                <ArrowUpRight
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-pink"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink text-cloud">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint-dark opacity-45" />
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-aqua/30 blur-[110px] animate-drift"
        />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-7 px-5 py-16 sm:px-8 sm:py-20">
          <p className="type-label text-cloud/50">CATALOG / STREAMING</p>

          <h2 className="type-display max-w-3xl text-[clamp(2.4rem,8vw,5.4rem)] text-cloud">
            Take the whole
            <br />
            catalog with you<AccentDot tone="ink" />
          </h2>

          <div className="flex flex-wrap gap-3">
            <MagneticButton href={SITE.smartLink} external tone="lime">
              LISTEN EVERYWHERE
            </MagneticButton>

            <MagneticButton href="/music" tone="outlineLight">
              GO TO THE MUSIC
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
