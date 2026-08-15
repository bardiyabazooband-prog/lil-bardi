import AccentDot from "@/components/AccentDot";
import MagneticButton from "@/components/MagneticButton";
import Orbs from "@/components/Orbs";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import StatStrip from "@/components/StatStrip";
import Ticker from "@/components/Ticker";
import VideoGrid from "@/components/VideoGrid";
import { formatCount, formatDate } from "@/lib/format";
import { SOCIALS } from "@/lib/site";
import { getChannelVideos } from "@/lib/youtube";

const YOUTUBE = SOCIALS.find((social) => social.key === "youtube").href;

export const metadata = {
  title: "Video Archive",
  description:
    "Every Lil Bardi visual, pulled live from the official YouTube channel — newest first.",
};

export default async function VideosPage() {
  const { videos, channel, configured, error } = await getChannelVideos({ limit: 18 });

  const latest = videos[0] ?? null;
  const subscribers =
    channel && !channel.hiddenSubscriberCount ? formatCount(channel.subscribers) : null;

  const stats = [
    {
      label: "LATEST VIDEO",
      value: latest ? (formatDate(latest.publishedAt) ?? "LIVE") : "—",
      note: latest ? latest.title : "Newest upload appears here automatically.",
    },
    {
      label: "YOUTUBE",
      value: subscribers ? `${subscribers}` : "@OFFICIALLILBARDI",
      note: subscribers ? "Subscribers on the official channel" : "Official channel",
    },
    {
      label: "VISUAL ARCHIVE",
      value: channel?.videoCount ? formatCount(channel.videoCount) : String(videos.length || "—"),
      note: channel?.videoCount ? "Videos published to date" : "Videos loaded in this archive",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <Orbs variant="videos" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-blueprint opacity-70 mask-fade-b"
        />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal y={14} duration={0.5}>
            <p className="type-label inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-white/70 px-3.5 py-2 text-ink/70 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-magenta animate-pulse-dot" aria-hidden="true" />
              LIL BARDI / VISUAL ARCHIVE
            </p>
          </Reveal>

          <h1 className="mt-7 flex flex-col">
            <Reveal y={40} duration={0.9}>
              <span className="type-display block text-[clamp(3.4rem,15vw,10rem)] text-ink">
                Play it
              </span>
            </Reveal>
            <Reveal y={40} duration={0.9} delay={0.1}>
              <span className="type-display block text-[clamp(3.4rem,15vw,10rem)] text-ink">
                back<AccentDot />
              </span>
            </Reveal>
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <Reveal delay={0.16}>
              <p className="max-w-xl text-base text-ink/60 sm:text-lg">
                Official audio, visuals, and everything in between — loaded straight from the
                Lil Bardi YouTube channel and sorted newest first.
              </p>
            </Reveal>

            <Reveal delay={0.22} className="flex flex-wrap gap-3 lg:justify-end">
              <MagneticButton href={channel?.url ?? YOUTUBE} external tone="ink">
                SUBSCRIBE ON YOUTUBE
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal delay={0.28} className="mt-12">
            <StatStrip items={stats} />
          </Reveal>
        </div>
      </section>

      <Ticker
        items={["VISUAL ARCHIVE", "OFFICIAL AUDIO", "LIL BARDI", "NEW SEASON"]}
        fast
        className="mt-6"
        label="Video archive ticker"
      />

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <SectionLabel index="01" className="mb-10">
          {videos.length ? `${videos.length} VIDEOS / NEWEST FIRST` : "CHANNEL FEED"}
        </SectionLabel>

        <VideoGrid
          videos={videos}
          configured={configured}
          error={error}
          channelUrl={channel?.url ?? YOUTUBE}
        />
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden border-t border-ink/10 bg-ink text-cloud">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint-dark opacity-45" />
        <div
          aria-hidden="true"
          className="absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-pink/30 blur-[110px] animate-drift"
        />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-7 px-5 py-16 sm:px-8 sm:py-20">
          <p className="type-label text-cloud/50">NEXT VISUAL LOADING</p>

          <h2 className="type-display max-w-3xl text-[clamp(2.4rem,8vw,5.4rem)] text-cloud">
            New visuals drop
            <br />
            every season<AccentDot tone="ink" />
          </h2>

          <div className="flex flex-wrap gap-3">
            <MagneticButton href={channel?.url ?? YOUTUBE} external tone="lime">
              OPEN THE CHANNEL
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
