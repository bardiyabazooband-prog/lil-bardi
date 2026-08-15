import Link from "next/link";

import { LogoMark } from "@/components/Logo";
import SocialIcon from "@/components/SocialIcon";
import { NAV_LINKS, SITE, SOCIALS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-white">
      <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-aqua/20 blur-[110px]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8 lg:py-16">
        <div className="flex flex-col gap-4">
          <LogoMark className="h-6 w-auto self-start text-ink" />

          <p className="type-display text-[clamp(2rem,5vw,2.8rem)] text-ink">
            Lil Bardi
          </p>

          <p className="max-w-xs text-sm text-ink/55">
            {SITE.tagline}. New music, visuals, and the full catalog — kept in one place.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-3">
          <p className="type-label text-ink/40">NAVIGATE</p>

          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="type-label text-ink/70 transition-colors duration-300 hover:text-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="type-label text-ink/40">LISTEN &amp; FOLLOW</p>

          <ul className="flex flex-col gap-2.5">
            {SOCIALS.map((social) => (
              <li key={social.key}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="type-label inline-flex items-center gap-2.5 text-ink/70 transition-colors duration-300 hover:text-pink"
                >
                  <SocialIcon name={social.key} size={14} />
                  {social.label.toUpperCase()}
                </a>
              </li>
            ))}
            <li>
              <a
                href={SITE.smartLink}
                target="_blank"
                rel="noreferrer"
                className="type-label text-ink/70 transition-colors duration-300 hover:text-pink"
              >
                ALL STREAMING PLATFORMS
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-2 border-t border-ink/10 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="type-label text-ink/45">© 2026 LIL BARDI</p>
        <p className="type-label text-ink/45">OFFICIAL DIGITAL WORLD</p>
        <p className="type-label text-ink/45">BUILT FOR THE NEXT SEASON</p>
      </div>
    </footer>
  );
}
