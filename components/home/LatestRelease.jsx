import Image from "next/image";

import AudioPlayer from "@/components/AudioPlayer";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import Waveform from "@/components/Waveform";
import { LATEST_RELEASE, SITE, SOCIALS } from "@/lib/site";

const YOUTUBE = SOCIALS.find((social) => social.key === "youtube").href;

export default function LatestRelease() {
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
            <Image
              src={LATEST_RELEASE.image}
              alt="Ride or Die cover art by Lil Bardi"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <span className="type-label absolute -right-2 -bottom-3 rounded-full bg-ink px-4 py-3 text-cloud sm:-right-4">
            08 / 07 / 26
          </span>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="type-label text-ink/45">LIL BARDI / SINGLE 01</p>

            <h2 className="type-display text-[clamp(3rem,10vw,6.5rem)] text-ink">
              Ride
              <br />
              or Die
            </h2>
          </div>

          <p className="max-w-xl text-lg leading-relaxed text-ink/65">
            {LATEST_RELEASE.blurb}
          </p>

          <Waveform className="max-w-xl" />

          <div className="max-w-xl">
            <AudioPlayer
              src={LATEST_RELEASE.audio}
              title="Ride or Die"
              subtitle="Preview clip"
              variant="panel"
            />
          </div>

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
