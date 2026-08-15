/**
 * Single source of truth for site-wide content: navigation, official links,
 * and the release catalog. Plain data so it can be imported from both
 * server and client components.
 */

export const SITE = {
  artist: "Lil Bardi",
  handle: "@officiallilbardi",
  tagline: "Official digital world",
  description:
    "Official website of Lil Bardi. New single Ride or Die out August 7, 2026. Stream the catalog, watch the visuals, and keep the signal moving.",
  url: "https://lilbardi.com",
  smartLink: "https://ffm.to/pkkj93n",
};

export const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "MUSIC", href: "/music" },
  { label: "RELEASES", href: "/releases" },
  { label: "VIDEOS", href: "/videos" },
  { label: "ABOUT", href: "/about" },
];

export const SOCIALS = [
  {
    key: "spotify",
    label: "Spotify",
    handle: "LIL BARDI",
    href: "https://open.spotify.com/artist/0ece3eqURp6ZSahMp2J7pq",
  },
  {
    key: "youtube",
    label: "YouTube",
    handle: "@OFFICIALLILBARDI",
    href: "https://www.youtube.com/@officiallilbardi",
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "@OFFICIALLILBARDI",
    href: "https://www.instagram.com/officiallilbardi/",
  },
  {
    key: "tiktok",
    label: "TikTok",
    handle: "@OFFICIALLILBARDI",
    href: "https://www.tiktok.com/@officiallilbardi",
  },
];

export const AUDIO_PREVIEWS = {
  "ride-or-die": "/audios/ride-or-die.mp3",
};

/**
 * Release catalog. `image: null` means no artwork exists in /public yet — the
 * ReleaseArt component renders a typographic cover instead of a broken path.
 */
export const RELEASES = [
  {
    slug: "ride-or-die",
    title: "Ride or Die",
    type: "Single",
    tracks: 1,
    date: "August 7, 2026",
    isoDate: "2026-08-07",
    image: "/Rideordie.png",
    audio: "/audios/ride-or-die.mp3",
    accent: "aqua",
    catalog: "LB / ROD / 080726",
    blurb:
      "Polished pressure at high velocity. Ride or Die is the current frequency — a hook that will not sit still and low end built for a moving car.",
    notes: [
      "Written and performed by Lil Bardi",
      "Lead single of the next season",
    ],
  },
  {
    slug: "foreign-season",
    title: "Foreign Season",
    type: "Album",
    tracks: 8,
    date: "July 7, 2026",
    isoDate: "2026-07-07",
    image: "/Foreignseason.png",
    audio: null,
    accent: "magenta",
    catalog: "LB / FSN / 070726",
    blurb:
      "Eight songs of altitude. Foreign Season is the full body of work — widescreen production, patient writing, and the clearest picture of the Lil Bardi world so far.",
    notes: ["Full length album", "Eight songs"],
  },
  {
    slug: "rarri",
    title: "Rarri",
    type: "Single",
    tracks: 1,
    date: "July 7, 2026",
    isoDate: "2026-07-07",
    image: null,
    audio: null,
    accent: "lime",
    catalog: "LB / RRI / 070726",
    blurb:
      "A short, sharp flex. Rarri moves on rhythm alone — all cadence, no wasted bars.",
    notes: ["Single"],
  },
  {
    slug: "loaded-up",
    title: "Loaded Up",
    type: "Single",
    tracks: 1,
    date: "June 3, 2026",
    isoDate: "2026-06-03",
    image: null,
    audio: null,
    accent: "blue",
    catalog: "LB / LDU / 060326",
    blurb:
      "Weight and swing. Loaded Up leans into the pocket and keeps the pressure on from the first bar.",
    notes: ["Single"],
  },
  {
    slug: "racks-in-the-safe",
    title: "Racks in the Safe",
    type: "Single",
    tracks: 1,
    date: "May 16, 2026",
    isoDate: "2026-05-16",
    image: null,
    audio: null,
    accent: "pink",
    catalog: "LB / RTS / 051626",
    blurb:
      "Cold confidence. Racks in the Safe is written like a receipt — plain, direct, and impossible to argue with.",
    notes: ["Single"],
  },
  {
    slug: "calibaby",
    title: "Calibaby",
    type: "EP",
    tracks: 4,
    date: "January 31, 2026",
    isoDate: "2026-01-31",
    image: null,
    audio: null,
    accent: "cyan",
    catalog: "LB / CLB / 013126",
    blurb:
      "Four songs of California haze. Calibaby is the warm-up lap for the season that followed — sun, speed, and a lot of melody.",
    notes: ["EP", "Four songs"],
  },
];

export const LATEST_RELEASE = RELEASES[0];

export function getRelease(slug) {
  return RELEASES.find((release) => release.slug === slug) ?? null;
}

export function getReleaseNeighbours(slug) {
  const index = RELEASES.findIndex((release) => release.slug === slug);

  if (index === -1) return { previous: null, next: null };

  return {
    previous: RELEASES[index - 1] ?? RELEASES[RELEASES.length - 1],
    next: RELEASES[index + 1] ?? RELEASES[0],
  };
}

/** Tailwind-safe accent maps. Keys must match `accent` values above. */
export const ACCENT = {
  aqua: {
    text: "text-aqua",
    bg: "bg-aqua",
    ring: "ring-aqua/40",
    border: "border-aqua/45",
    glow: "bg-aqua/35",
    gradient: "from-aqua via-cyan to-blue",
  },
  blue: {
    text: "text-blue",
    bg: "bg-blue",
    ring: "ring-blue/40",
    border: "border-blue/45",
    glow: "bg-blue/30",
    gradient: "from-blue via-aqua to-cyan",
  },
  pink: {
    text: "text-pink",
    bg: "bg-pink",
    ring: "ring-pink/40",
    border: "border-pink/45",
    glow: "bg-pink/30",
    gradient: "from-pink via-magenta to-blue",
  },
  magenta: {
    text: "text-magenta",
    bg: "bg-magenta",
    ring: "ring-magenta/40",
    border: "border-magenta/45",
    glow: "bg-magenta/30",
    gradient: "from-magenta via-pink to-blue",
  },
  lime: {
    text: "text-lime",
    bg: "bg-lime",
    ring: "ring-lime/40",
    border: "border-lime/45",
    glow: "bg-lime/35",
    gradient: "from-lime via-aqua to-cyan",
  },
  cyan: {
    text: "text-blue",
    bg: "bg-cyan",
    ring: "ring-cyan/50",
    border: "border-cyan/60",
    glow: "bg-cyan/45",
    gradient: "from-cyan via-aqua to-magenta",
  },
};

export function accentOf(key) {
  return ACCENT[key] ?? ACCENT.aqua;
}
