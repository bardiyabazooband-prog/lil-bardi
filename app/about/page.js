import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import AccentDot from "@/components/AccentDot";
import MagneticButton from "@/components/MagneticButton";
import Orbs from "@/components/Orbs";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SocialCards from "@/components/SocialCards";
import Ticker from "@/components/Ticker";
import { pad } from "@/lib/format";
import { LATEST_RELEASE, RELEASES, SITE } from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "Who is Lil Bardi — the artist identity, the sound, and the current era behind Ride or Die and Foreign Season.",
};

const IDENTITY = [
  {
    label: "SOUND",
    title: "Melodic pressure",
    copy: "Hooks that stick on the first pass, low end built for a moving car, and writing that stays plain-spoken even when the production goes widescreen.",
  },
  {
    label: "APPROACH",
    title: "Release in seasons",
    copy: "Music arrives in waves rather than one-offs — a run of singles, a project, then the next chapter. Every drop is part of a bigger picture.",
  },
  {
    label: "CURRENT ERA",
    title: "Ride or Die",
    copy: "The newest chapter opens with Ride or Die on August 7, 2026 — the fastest, most confident version of the sound so far.",
  },
];

export default function AboutPage() {
  const songs = RELEASES.reduce((total, release) => total + release.tracks, 0);

  return (
    <>
      {/* Hero — artist identity, off-centre editorial */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <Orbs variant="about" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-blueprint opacity-60 mask-fade-b"
        />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal y={14} duration={0.5}>
            <p className="type-label inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-white/70 px-3.5 py-2 text-ink/70 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-pink animate-pulse-dot" aria-hidden="true" />
              LIL BARDI / ARTIST PROFILE
            </p>
          </Reveal>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-14">
            <h1 className="flex flex-col">
              <Reveal y={40} duration={0.9}>
                <span className="type-display block text-[clamp(3.6rem,16vw,10.5rem)] text-ink">
                  Lil
                </span>
              </Reveal>
              <Reveal y={40} duration={0.9} delay={0.1}>
                <span className="type-display block text-[clamp(3.6rem,16vw,10.5rem)] text-ink">
                  Bardi<AccentDot />
                </span>
              </Reveal>
            </h1>

            <Reveal delay={0.2} className="relative">
              <span
                aria-hidden="true"
                className="absolute -inset-4 rounded-full bg-magenta/25 blur-[70px]"
              />

              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-ink ring-1 ring-ink/10">
                <Image
                  src={LATEST_RELEASE.image}
                  alt="Ride or Die cover art by Lil Bardi"
                  fill
                  priority
                  sizes="(max-width: 1024px) 88vw, 32vw"
                  className="object-cover"
                />

                <span className="type-label absolute bottom-3 left-3 rounded-full bg-cloud/90 px-3 py-2 text-ink">
                  CURRENT ERA / 2026
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Ticker
        items={["LIL BARDI", "NEW SEASON", "RIDE OR DIE", "KEEP THE SIGNAL MOVING"]}
        className="mt-6"
        label="Artist ticker"
      />

      {/* Story */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <SectionLabel index="01">THE STORY</SectionLabel>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal className="flex flex-col gap-6">
            <h2 className="type-display text-[clamp(2.2rem,7vw,4.4rem)] text-ink">
              An artist built
              <br />
              for the next season<AccentDot tone="ink" />
            </h2>

            <div className="flex max-w-2xl flex-col gap-5 text-base leading-relaxed text-ink/65 sm:text-lg">
              <p>
                Lil Bardi is a rapper and songwriter who treats every release like a
                transmission — short, direct, and impossible to ignore. The catalog moves
                fast: singles land, a project follows, and the sound sharpens each time.
              </p>

              <p>
                <span className="font-semibold text-ink">Calibaby</span> opened the year with
                four songs of California haze. <span className="font-semibold text-ink">Racks
                in the Safe</span> and <span className="font-semibold text-ink">Loaded Up</span>{" "}
                turned up the pressure through spring, and{" "}
                <span className="font-semibold text-ink">Foreign Season</span> arrived in July
                as the first full length statement — eight songs of altitude.
              </p>

              <p>
                <span className="font-semibold text-ink">Ride or Die</span> is where the
                current era begins. It is the clearest version of the Lil Bardi world so far:
                melodic, confident, and built to keep the signal moving.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton href={SITE.smartLink} external tone="ink">
                LISTEN TO LIL BARDI
              </MagneticButton>

              <MagneticButton href="/releases" tone="cloud">
                BROWSE THE CATALOG
              </MagneticButton>
            </div>
          </Reveal>

          <ul className="flex flex-col gap-4">
            {IDENTITY.map((item, index) => (
              <Reveal as="li" key={item.label} delay={index * 0.07}>
                <div className="flex flex-col gap-3 rounded-3xl border border-ink/10 bg-white p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="type-label text-ink/40">{item.label}</span>
                    <span className="type-label text-ink/25">{pad(index + 1)}</span>
                  </div>

                  <h3 className="type-display text-[clamp(1.5rem,3.4vw,2.1rem)] text-ink">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-ink/60">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Numbers */}
      <section className="relative overflow-hidden border-y border-ink/10 bg-ink text-cloud">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint-dark opacity-45" />
        <div
          aria-hidden="true"
          className="absolute -top-24 right-[10%] h-72 w-72 rounded-full bg-aqua/25 blur-[110px] animate-drift"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionLabel index="02" tone="light">
            THE CATALOG SO FAR
          </SectionLabel>

          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { label: "RELEASES", value: pad(RELEASES.length) },
              { label: "SONGS", value: pad(songs) },
              { label: "CURRENT SINGLE", value: "RIDE OR DIE" },
            ].map((item) => (
              <Reveal key={item.label}>
                <div className="flex flex-col gap-3">
                  <dt className="type-label text-cloud/45">{item.label}</dt>
                  <dd className="type-display text-[clamp(2.2rem,6vw,4rem)] text-cloud">
                    {item.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Links */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <SectionLabel index="03">FOLLOW & STREAM</SectionLabel>

        <Reveal className="mt-8 mb-10 max-w-2xl">
          <h2 className="type-display text-[clamp(2.2rem,7vw,4.2rem)] text-ink">
            Stay on
            <br />
            frequency<AccentDot tone="ink" />
          </h2>
        </Reveal>

        <SocialCards />

        <Reveal delay={0.1} className="mt-10">
          <a
            href={SITE.smartLink}
            target="_blank"
            rel="noreferrer"
            className="type-label group inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-blue"
          >
            ALL STREAMING PLATFORMS
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>
      </section>
    </>
  );
}
