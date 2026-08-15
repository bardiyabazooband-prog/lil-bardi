import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import AudioPlayer from "@/components/AudioPlayer";
import MagneticButton from "@/components/MagneticButton";
import ReleaseArt from "@/components/ReleaseArt";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import Waveform from "@/components/Waveform";
import { accentOf, getRelease, getReleaseNeighbours, RELEASES, SITE, SOCIALS } from "@/lib/site";

const YOUTUBE = SOCIALS.find((social) => social.key === "youtube").href;

export function generateStaticParams() {
  return RELEASES.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const release = getRelease(slug);

  if (!release) return { title: "Release not found" };

  return {
    title: release.title,
    description: release.blurb,
    openGraph: {
      title: `${release.title} — Lil Bardi`,
      description: release.blurb,
      images: release.image ? [{ url: release.image }] : undefined,
    },
  };
}

export default async function ReleasePage({ params }) {
  const { slug } = await params;
  const release = getRelease(slug);

  if (!release) notFound();

  const accent = accentOf(release.accent);
  const { previous, next } = getReleaseNeighbours(slug);

  return (
    <>
      {/* Hero — dark editorial sleeve */}
      <section className="relative overflow-hidden bg-ink pt-28 pb-16 text-cloud sm:pt-32 lg:pt-36 lg:pb-24">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint-dark opacity-45" />
        <div
          aria-hidden="true"
          className={`absolute -top-24 right-[-8%] h-80 w-80 rounded-full ${accent.glow} blur-[120px] animate-drift`}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 left-[-6%] h-72 w-72 rounded-full bg-blue/25 blur-[110px] animate-drift-slow"
        />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            href="/releases"
            className="type-label group inline-flex items-center gap-2 text-cloud/55 transition-colors duration-300 hover:text-lime"
          >
            <ArrowLeft
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            ALL RELEASES
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-14">
            <Reveal x={-26} y={0} className="relative mx-auto w-full max-w-sm lg:mx-0">
              <span
                aria-hidden="true"
                className={`absolute inset-8 rounded-full ${accent.glow} blur-[60px]`}
              />

              <ReleaseArt
                release={release}
                priority
                sizes="(max-width: 1024px) 82vw, 32vw"
                rounded="rounded-3xl"
                className="relative ring-1 ring-cloud/15"
              />
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-6">
              <p className={`type-label ${accent.text}`}>
                {release.type.toUpperCase()}
                {release.tracks > 1 ? ` · ${release.tracks} SONGS` : ""}
              </p>

              <h1 className="type-display text-[clamp(2.8rem,11vw,7rem)] text-cloud">
                {release.title}
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-cloud/70">{release.blurb}</p>

              <dl className="grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cloud/15 bg-cloud/12 sm:grid-cols-3">
                {[
                  { label: "RELEASE DATE", value: release.date.toUpperCase() },
                  { label: "FORMAT", value: release.type.toUpperCase() },
                  {
                    label: "TRACKS",
                    value: release.tracks > 1 ? `${release.tracks} SONGS` : "1 SONG",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1.5 bg-ink p-4">
                    <dt className="type-label text-cloud/40">{item.label}</dt>
                    <dd className="type-label text-cloud">{item.value}</dd>
                  </div>
                ))}
              </dl>

              {release.audio ? (
                <div className="max-w-xl">
                  <AudioPlayer
                    src={release.audio}
                    title={release.title}
                    subtitle="Preview clip"
                    variant="panel"
                    tone="dark"
                  />
                </div>
              ) : (
                <Waveform tone="light" className="max-w-xl" />
              )}

              <div className="flex flex-wrap gap-3">
                <MagneticButton href={SITE.smartLink} external tone="lime">
                  LISTEN NOW
                </MagneticButton>

                <MagneticButton href={YOUTUBE} external tone="outlineLight">
                  WATCH ON YOUTUBE
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Release notes */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionLabel index="01">RELEASE NOTES</SectionLabel>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <Reveal className="flex flex-col gap-5">
            <h2 className="type-display text-[clamp(2rem,6vw,3.6rem)] text-ink">
              About this release
            </h2>

            <p className="max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
              {release.blurb}
            </p>

            <ul className="mt-2 flex flex-col gap-3">
              {release.notes.map((note) => (
                <li key={note} className="flex items-start gap-3 text-ink/70">
                  <span
                    aria-hidden="true"
                    className={`mt-2 h-2 w-2 shrink-0 rounded-full ${accent.bg}`}
                  />
                  <span className="text-base">{note}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-7">
              <p className="type-label text-ink/40">CATALOG REFERENCE</p>
              <p className="type-display mt-3 text-[clamp(1.4rem,3.4vw,2.1rem)] text-ink">
                {release.catalog}
              </p>

              <div className="mt-6 h-px w-full bg-ink/10" />

              <p className="type-label mt-6 text-ink/40">ARTIST</p>
              <p className="mt-2 text-base text-ink/70">Lil Bardi</p>

              <p className="type-label mt-5 text-ink/40">RELEASED</p>
              <time dateTime={release.isoDate} className="mt-2 block text-base text-ink/70">
                {release.date}
              </time>

              <a
                href={SITE.smartLink}
                target="_blank"
                rel="noreferrer"
                className="type-label group mt-7 inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-blue"
              >
                ALL STREAMING PLATFORMS
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Prev / next */}
      <nav
        aria-label="Release navigation"
        className="border-t border-ink/10 bg-white"
      >
        <ul className="mx-auto grid max-w-6xl gap-px sm:grid-cols-2">
          {[
            { release: previous, label: "PREVIOUS", align: "" },
            { release: next, label: "NEXT", align: "sm:items-end sm:text-right" },
          ]
            .filter((item) => item.release && item.release.slug !== release.slug)
            .map((item) => (
              <li key={item.label}>
                <Link
                  href={`/releases/${item.release.slug}`}
                  className={`group flex flex-col gap-2 px-5 py-9 transition-colors duration-300 hover:bg-cloud sm:px-8 ${item.align}`}
                >
                  <span className="type-label text-ink/40">{item.label}</span>
                  <span className="type-display text-[clamp(1.6rem,4.5vw,2.8rem)] text-ink transition-colors duration-300 group-hover:text-blue">
                    {item.release.title}
                  </span>
                  <span className="type-label text-ink/45">
                    {item.release.type.toUpperCase()} · {item.release.date.toUpperCase()}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
