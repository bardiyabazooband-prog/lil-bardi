import MagneticButton from "@/components/MagneticButton";
import SocialIcon from "@/components/SocialIcon";
import { SOCIALS } from "@/lib/site";

const YOUTUBE = SOCIALS.find((social) => social.key === "youtube").href;

/**
 * Honest empty state. The site never fabricates video IDs, so when the
 * YouTube API is unavailable the archive links straight to the channel.
 */
export default function VideoEmptyState({ configured = false, error = null, channelUrl }) {
  const headline = configured ? "ARCHIVE OFFLINE" : "ARCHIVE LOADING";

  const copy = configured
    ? "The YouTube feed did not respond just now. Every visual is still live on the channel."
    : "Live video data appears here once the YouTube channel feed is connected. In the meantime the full archive is on YouTube.";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 sm:p-12">
      <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-pink/20 blur-[90px]" />

      <div className="relative flex max-w-xl flex-col gap-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cloud">
          <SocialIcon name="youtube" size={20} />
        </span>

        <h3 className="type-display text-[clamp(1.9rem,5vw,3.2rem)] text-ink">{headline}</h3>

        <p className="text-base text-ink/60">{copy}</p>

        {error ? <p className="type-label text-ink/35">STATUS / {error.toUpperCase()}</p> : null}

        <div>
          <MagneticButton href={channelUrl ?? YOUTUBE} external tone="ink">
            OPEN THE YOUTUBE CHANNEL
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
