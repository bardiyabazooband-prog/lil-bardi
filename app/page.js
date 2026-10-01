import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import AccentDot from "@/components/AccentDot";
import FinalCta from "@/components/home/FinalCta";
import Hero from "@/components/home/Hero";
import HeroArt from "@/components/home/HeroArt";
import LatestRelease from "@/components/home/LatestRelease";
import ReleaseCard from "@/components/ReleaseCard";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SocialCards from "@/components/SocialCards";
import Ticker from "@/components/Ticker";
import VideoGrid from "@/components/VideoGrid";
import { formatCount } from "@/lib/format";
import { SOCIALS } from "@/lib/site";
import { getCatalog } from "@/lib/catalog";
import { getChannelVideos } from "@/lib/youtube";

const YOUTUBE = SOCIALS.find((social) => social.key === "youtube").href;

export const revalidate = 3600;

export default async function HomePage() {
  // Server-side fetch: the YouTube key never reaches the browser.
  const { videos, channel, configured: ytConfigured, error: ytError } = await getChannelVideos({ limit: 7 });

  // Dynamic catalog: releases are fetched from Spotify and merged with editorial overrides.
  const { releases } = await getCatalog();
  const latestRelease = releases[0] ?? null;

  const subscribers =
    channel && !channel.hiddenSubscriberCount ? formatCount(channel.subscribers) : null;
  const videoCount = channel ? formatCount(channel.videoCount) : null;

  const channelStat = [
    subscribers ? `${subscribers} SUBSCRIBERS` : null,
    videoCount ? `${videoCount} VIDEOS` : null,
  ]
    .filter(Boolean)
    .join(" / ");

  const tickerItems = releases.slice(0, 3).map((r) => r.title.toUpperCase());
  tickerItems.push("LIL BARDI", "KEEP THE SIGNAL MOVING");

  return (
    <>
      <Hero latestRelease={latestRelease} />

      <Ticker items={tickerItems} />

      <LatestRelease />

      {/* Releases */}
      <section className="relative overflow-hidden border-t border-ink/10 bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-[-6%] h-72 w-72 rounded-full bg-cyan/50 blur-[100px]"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionLabel index="02" className="min-w-[16rem] flex-1">
              RELEASE CLIMATE / 2026
            </SectionLabel>

            <Link
              href="/releases"
              className="type-label group inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-blue"
            >
              VIEW EVERY RELEASE
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <Reveal>
              <h2 className="type-display text-[clamp(2.6rem,8.5vw,5.5rem)] text-ink">
                Every drop
                <br />
                has weather<AccentDot tone="ink" />
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="max-w-md text-base text-ink/60 sm:text-lg">
                {releases.length} releases across singles, an EP, and a full length album —
                different shades of the same frequency, built for motion.
              </p>
            </Reveal>
          </div>

          {/* Constellation: staggered offsets on large screens */}
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {releases.map((release, index) => (
              <li
                key={release.slug}
                className={`h-full ${
                  index % 3 === 1 ? "lg:translate-y-10" : index % 3 === 2 ? "lg:-translate-y-4" : ""
                }`}
              >
                <ReleaseCard release={release} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Videos */}
      <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="03" className="min-w-[16rem] flex-1">
            VISUAL ARCHIVE / YOUTUBE
          </SectionLabel>

          {channelStat ? (
            <span className="type-label text-ink/45">{channelStat}</span>
          ) : (
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noreferrer"
              className="type-label text-ink/45 transition-colors hover:text-pink"
            >
              @OFFICIALLILBARDI
            </a>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="type-display text-[clamp(2.6rem,8.5vw,5.5rem)] text-ink">
              Play it
              <br />
              back loud<AccentDot tone="ink" />
            </h2>
          </Reveal>

          <Link
            href="/videos"
            className="type-label group inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-blue"
          >
            ENTER THE ARCHIVE
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="mt-12">
          <VideoGrid
            videos={videos}
            configured={ytConfigured}
            error={ytError}
            channelUrl={channel?.url ?? YOUTUBE}
          />
        </div>
      </section>

      {/* Socials */}
      <section className="relative border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <SectionLabel index="04">STAY ON FREQUENCY</SectionLabel>

          <div className="mt-8 mb-10 max-w-2xl">
            <Reveal>
              <h2 className="type-display text-[clamp(2.4rem,7.5vw,4.6rem)] text-ink">
                Four doors,
                <br />
                one signal<AccentDot tone="ink" />
              </h2>
            </Reveal>
          </div>

          <SocialCards />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
