import Image from "next/image";

import AudioPlayer from "@/components/AudioPlayer";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import Waveform from "@/components/Waveform";
import { SITE, SOCIALS } from "@/lib/site";
import { getLatestRelease } from "@/lib/catalog";

const YOUTUBE = SOCIALS.find((social) => social.key === "youtube").href;

export const revalidate = 3600;

export default async function LatestRelease() {
  const latestRelease = await getLatestRelease();

  if (!latestRelease) return null;

  const dateBadge = latestRelease.isoDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
        timeZone: "UTC",
      })
        .format(new Date(latestRelease.isoDate))
        .replace(/\//g, " / ")
    : "NEW";

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
      <SectionLabel index="01">LATEST RELEASE / NOW IN ROTATION</SectionLabel>

      <div className="mt-10 grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
        <Reveal x={-32} y={0} className="relative">
          <span
            aria-hidden="true"
            className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-lime/60 blur-2xl"
          />

          <div className="group relative aspect-square overflow-hidden rounded-3xl bg-ink shadow-[0_36px_70px_-40px_rgb(7_24_43_/_0.5)]">
            {latestRelease.image ? (
              <Image
                src={latestRelease.image}
                alt={`${latestRelease.title} cover art by Lil Bardi`}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-aqua via-cyan to-blue">
                <span className="type-display text-ink text-[clamp(1.5rem,8cqw,4rem)] break-words px-4 text-center">
                  {latestRelease.title}
                </span>
              </div>
            )}
          </div>

          <span className="type-label absolute -right-2 -bottom-3 rounded-full bg-ink px-4 py-3 text-cloud sm:-right-4">
            {dateBadge}
          </span>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="type-label text-ink/45">
              LIL BARDI / {latestRelease.type.toUpperCase()}
              {latestRelease.type === "Single" ? " 01" : ""}
            </p>

            <h2 className="type-display text-[clamp(3rem,10vw,6.5rem)] text-ink">
              {latestRelease.title}
            </h2>
          </div>

          <p className="max-w-xl text-lg leading-relaxed text-ink/65">
            {latestRelease.blurb}
          </p>

          <Waveform className="max-w-xl" />

          {latestRelease.audio ? (
            <div className="max-w-xl">
              <AudioPlayer
                src={latestRelease.audio}
                title={latestRelease.title}
                subtitle="Preview clip"
                variant="panel"
              />
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <MagneticButton href={SITE.smartLink} external tone="ink">
              OPEN ON STREAMING
            </MagneticButton>

            <MagneticButton href={YOUTUBE} external tone="cloud">
              WATCH ON YOUTUBE
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
