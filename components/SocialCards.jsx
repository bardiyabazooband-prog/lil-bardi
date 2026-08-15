import { ArrowUpRight } from "lucide-react";

import Reveal from "@/components/Reveal";
import SocialIcon from "@/components/SocialIcon";
import { SOCIALS } from "@/lib/site";

const SKINS = {
  spotify: {
    card: "bg-ink text-cloud",
    glow: "bg-aqua/40",
    icon: "text-aqua",
    meta: "text-cloud/55",
  },
  youtube: {
    card: "bg-pink text-ink",
    glow: "bg-magenta/50",
    icon: "text-ink",
    meta: "text-ink/60",
  },
  instagram: {
    card: "bg-lime text-ink",
    glow: "bg-aqua/50",
    icon: "text-ink",
    meta: "text-ink/60",
  },
  tiktok: {
    card: "bg-blue text-cloud",
    glow: "bg-cyan/60",
    icon: "text-cyan",
    meta: "text-cloud/60",
  },
};

const COPY = {
  spotify: "STREAM THE CATALOG",
  youtube: "WATCH EVERY VISUAL",
  instagram: "BEHIND THE SEASON",
  tiktok: "FOLLOW THE MOTION",
};

/** Large colourful platform cards. */
export default function SocialCards({ className = "" }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {SOCIALS.map((social, index) => {
        const skin = SKINS[social.key];

        return (
          <Reveal as="li" key={social.key} delay={index * 0.06} className="h-full">
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`group relative flex h-full min-h-[13rem] flex-col justify-between overflow-hidden rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1.5 ${skin.card}`}
            >
              <span
                aria-hidden="true"
                className={`absolute -right-10 -bottom-12 h-40 w-40 rounded-full ${skin.glow} blur-3xl transition-transform duration-700 group-hover:scale-125`}
              />

              <span className="relative flex items-start justify-between">
                <SocialIcon name={social.key} size={30} className={skin.icon} />
                <ArrowUpRight
                  size={20}
                  aria-hidden="true"
                  className="translate-y-1 opacity-50 transition-all duration-[400ms] group-hover:translate-y-0 group-hover:opacity-100"
                />
              </span>

              <span className="relative flex flex-col gap-1.5">
                <span className="type-display text-[clamp(1.6rem,3vw,2.1rem)]">
                  {social.label}
                </span>
                <span className={`type-label ${skin.meta}`}>{COPY[social.key]}</span>
                <span className={`type-label ${skin.meta}`}>{social.handle}</span>
              </span>
            </a>
          </Reveal>
        );
      })}
    </ul>
  );
}
