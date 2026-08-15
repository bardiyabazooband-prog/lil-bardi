import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import AudioPlayer from "@/components/AudioPlayer";
import AccentDot from "@/components/AccentDot";
import MagneticButton from "@/components/MagneticButton";
import Orbs from "@/components/Orbs";
import ReleaseArt from "@/components/ReleaseArt";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SocialIcon from "@/components/SocialIcon";
import Waveform from "@/components/Waveform";
import { pad } from "@/lib/format";
import { LATEST_RELEASE, RELEASES, SITE, SOCIALS } from "@/lib/site";

export const metadata = {
  title: "Music",
  description:
    "Listen to Lil Bardi — Ride or Die, Foreign Season, and the full catalog, plus every streaming platform in one place.",
};

const PLATFORMS = [
  {
    key: "spotify",
    label: "Spotify",
    note: "Artist profile",
    href: SOCIALS.find((social) => social.key === "spotify").href,
    tone: "bg-ink text-cloud",
    icon: "text-aqua",
  },
  {
    key: "youtube",
    label: "YouTube",
    note: "Official audio & visuals",
    href: SOCIALS.find((social) => social.key === "youtube").href,
    tone: "bg-white text-ink border border-ink/12",
    icon: "text-pink",
  },
];

const FEATURED = RELEASES.filter((release) =>
  ["foreign-season", "calibaby", "rarri"].includes(release.slug),
);

export default function MusicPage() {
  return (
    <>
      {/* Hero — listening focused, split composition */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20">
        <Orbs variant="music" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-blueprint opacity-60 mask-fade-b"
        />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal y={14} duration={0.5}>
            <p className="type-label inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-white/70 px-3.5 py-2 text-ink/70 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-lime animate-pulse-dot" aria-hidden="true" />
              LIL BARDI / LISTENING ROOM
            </p>
          </Reveal>

          <h1 className="mt-7">
            <Reveal y={40} duration={0.9}>
              <span className="type-display block text-[clamp(3.4rem,15vw,10rem)] text-ink">
                Press
              </span>
            </Reveal>
            <Reveal y={40} duration={0.9} delay={0.1}>
              <span className="type-display block text-[clamp(3.4rem,15vw,10rem)] text-ink">
                play<AccentDot tone="lime" />
              </span>
            </Reveal>
          </h1>

          <Reveal delay={0.18} className="mt-7 max-w-xl">
            <p className="text-base text-ink/60 sm:text-lg">
              Everything in one room: the current single, the full catalog, and every
              streaming platform Lil Bardi lives on.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Now playing — asymmetric feature */}
      <section className="relative border-y border-ink/10 bg-ink text-cloud">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint-dark opacity-40" />
        <div
          aria-hidden="true"
          className="absolute -top-24 right-[6%] h-72 w-72 rounded-full bg-aqua/25 blur-[110px] animate-drift"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <SectionLabel index="01" tone="light">
            NOW PLAYING / SINGLE 01
          </SectionLabel>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-14">
            <Reveal x={-28} y={0} className="relative mx-auto w-full max-w-sm lg:mx-0">
              <span
                aria-hidden="true"
                className="absolute inset-6 rounded-full bg-aqua/30 blur-[60px]"
              />
              <div className="relative aspect-square overflow-hidden rounded-3xl ring-1 ring-cloud/15">
                <Image
                  src={LATEST_RELEASE.image}
                  alt="Ride or Die cover art by Lil Bardi"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 30vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-6">
              <div>
                <p className="type-label text-cloud/45">OUT AUGUST 7, 2026</p>
                <h2 className="type-display mt-3 text-[clamp(2.8rem,9vw,6rem)] text-cloud">
                  Ride or Die
                </h2>
              </div>

              <p className="max-w-xl text-lg leading-relaxed text-cloud/70">
                {LATEST_RELEASE.blurb}
              </p>

              <Waveform tone="light" className="max-w-xl" />

              <div className="max-w-xl">
                <AudioPlayer
                  src={LATEST_RELEASE.audio}
                  title="Ride or Die"
                  subtitle="Preview clip"
                  variant="panel"
                  tone="dark"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <MagneticButton href={SITE.smartLink} external tone="lime">
                  LISTEN EVERYWHERE
                </MagneticButton>

                <MagneticButton href="/releases/ride-or-die" tone="outlineLight">
                  RELEASE DETAILS
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Streaming platforms */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionLabel index="02">WHERE TO LISTEN</SectionLabel>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <Reveal className="h-full">
            <a
              href={SITE.smartLink}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-aqua via-cyan to-blue p-7 text-ink transition-transform duration-500 hover:-translate-y-1.5"
            >
              <span
                aria-hidden="true"
                className="absolute -right-12 -bottom-16 h-52 w-52 rounded-full bg-white/40 blur-3xl"
              />

              <span className="type-label relative text-ink/65">SMART LINK</span>

              <span className="relative flex flex-col gap-2">
                <span className="type-display text-[clamp(2rem,5vw,3.4rem)]">
                  Every platform,
                  <br />
                  one link<AccentDot tone="ink" />
                </span>
                <span className="type-label flex items-center gap-2 text-ink/70">
                  FFM.TO/PKKJ93N
                  <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </a>
          </Reveal>

          {PLATFORMS.map((platform, index) => (
            <Reveal key={platform.key} delay={0.08 + index * 0.06} className="h-full">
              <a
                href={platform.href}
                target="_blank"
                rel="noreferrer"
                className={`group flex h-full min-h-[15rem] flex-col justify-between rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5 ${platform.tone}`}
              >
                <SocialIcon name={platform.key} size={30} className={platform.icon} />

                <span className="flex flex-col gap-1.5">
                  <span className="type-display text-[clamp(1.7rem,4vw,2.4rem)]">
                    {platform.label}
                  </span>
                  <span className="type-label opacity-60">{platform.note.toUpperCase()}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionLabel index="03" className="min-w-[16rem] flex-1">
              FEATURED PROJECTS
            </SectionLabel>

            <Link
              href="/releases"
              className="type-label group inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-blue"
            >
              FULL CATALOG
              <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <Reveal className="mt-8 mb-10 max-w-2xl">
            <h2 className="type-display text-[clamp(2.4rem,7.5vw,4.6rem)] text-ink">
              Deeper in
              <br />
              the catalog<AccentDot tone="ink" />
            </h2>
          </Reveal>

          <ul className="grid gap-8 sm:grid-cols-3">
            {FEATURED.map((release, index) => (
              <Reveal as="li" key={release.slug} delay={index * 0.07} className="h-full">
                <Link
                  href={`/releases/${release.slug}`}
                  className="group flex h-full flex-col gap-4"
                >
                  <ReleaseArt
                    release={release}
                    sizes="(max-width: 640px) 88vw, 30vw"
                    className="transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  <span className="flex flex-col gap-1.5">
                    <span className="type-label text-ink/40">{pad(index + 1)}</span>
                    <span className="type-display text-[clamp(1.4rem,2.6vw,2rem)] text-ink transition-colors duration-300 group-hover:text-blue">
                      {release.title}
                    </span>
                    <span className="type-label text-ink/45">
                      {release.type.toUpperCase()}
                      {release.tracks > 1 ? ` · ${release.tracks} SONGS` : ""}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Artist identity strip */}
      <section className="relative overflow-hidden bg-ink text-cloud">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint-dark opacity-45" />
        <div
          aria-hidden="true"
          className="absolute -left-24 -bottom-28 h-80 w-80 rounded-full bg-magenta/30 blur-[120px] animate-drift-slow"
        />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="type-display text-[clamp(2.4rem,8vw,5.2rem)] text-cloud">
              Made for
              <br />
              <span className="text-lime">the drive.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-cloud/70">
              Lil Bardi writes for movement — night drives, late sessions, and the stretch
              between one release and the next. Melody first, pressure underneath.
            </p>

            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/about" tone="lime">
                READ THE STORY
              </MagneticButton>

              <MagneticButton href="/videos" tone="outlineLight">
                WATCH THE VISUALS
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
