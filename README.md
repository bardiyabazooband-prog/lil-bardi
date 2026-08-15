# LIL BARDI — Official Site

Official artist website for Lil Bardi. Next.js App Router, React Server Components, Tailwind CSS v4, and Framer Motion — built as a futuristic, editorial, type-led artist world rather than a template landing page.

Live sections: home, `/music`, `/releases`, `/releases/[slug]`, `/videos`, `/about`.

## Stack

| Piece      | Choice                                                    |
| ---------- | --------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)                        |
| UI         | React 19, Server Components by default                    |
| Styling    | Tailwind CSS v4 (`@theme` tokens in `app/globals.css`)     |
| Motion     | Framer Motion (client components only)                    |
| Icons      | lucide-react (UI), react-icons/fa6 (brand glyphs)         |
| Fonts      | Anton, Space Grotesk, IBM Plex Mono via `next/font/google` |
| Data       | YouTube Data API v3 (server-side only)                    |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your YouTube credentials
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
npm run lint
```

## Environment variables

Create `.env.local` (git-ignored — never commit it):

```bash
YOUTUBE_API_KEY=your_api_key
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxx
YOUTUBE_CHANNEL_HANDLE=officiallilbardi   # optional, resolves the channel ID from the handle
```

Security notes:

- The key is **server-only**. There is deliberately no `NEXT_PUBLIC_YOUTUBE_API_KEY`.
- `lib/youtube.js` imports `server-only`, so importing it from a client component is a build error.
- Keys are never logged. If the API is unconfigured or fails, the video sections render an honest "archive loading" state instead of fake video IDs.

Get an API key from the [Google Cloud Console](https://console.cloud.google.com/) with the YouTube Data API v3 enabled.

## Project structure

```
app/
  layout.js                    # fonts, metadata, SoundProvider, Navbar, Footer
  page.js                      # home (server component; fetches channel videos)
  music/page.js                # listening room
  releases/page.js             # catalog index
  releases/[slug]/page.js      # release detail (SSG via generateStaticParams)
  videos/page.js               # visual archive
  about/page.js                # artist profile
  not-found.js                 # 404
  api/youtube/videos/route.js  # server route, ?limit=1..24, revalidates hourly
  globals.css                  # Tailwind import + @theme tokens + a few utilities
components/                    # Navbar, MobileMenu, AudioPlayer, ReleaseCard, VideoGrid, …
lib/
  site.js                      # SITE, NAV_LINKS, SOCIALS, RELEASES (single source of truth)
  youtube.js                   # server-only YouTube client
  format.js  motion.js
public/
  Rideordie.png  Foreignseason.png
  audios/ride-or-die.mp3
  sounds/hover-tick.mp3  button-tap.mp3  nav-shift.mp3
```

## Design system

Tokens live in `app/globals.css` under `@theme`, so every colour is a Tailwind utility (`bg-ink`, `text-aqua`, `border-cyan`).

| Token      | Hex       | Use                        |
| ---------- | --------- | -------------------------- |
| `cloud`    | `#F8FBFF` | main light background      |
| `ink`      | `#07182B` | dark sections, primary text |
| `inkblue`  | `#103154` | secondary dark             |
| `aqua`     | `#1EE7D2` | primary accent             |
| `blue`     | `#2578FF` | links, secondary accent    |
| `cyan`     | `#BDF7FF` | soft tint                  |
| `pink`     | `#FF4FB8` | signature accent, logo dot |
| `magenta`  | `#D846FF` | gradients                  |
| `lime`     | `#D9FF3F` | high-energy CTA            |

Type roles: **Anton** for display headings, **Space Grotesk** for body/UI, **IBM Plex Mono** for labels, nav, dates and stats.

Global CSS is intentionally small — layout and styling are Tailwind utilities.

## Sound design

Low-volume UI sounds (hover, tap, nav) are **off by default**. `SoundProvider` persists the choice in `localStorage` under `lil-bardi-sound` (`on` / `off`), and audio buffers are only created after a user gesture so browser autoplay policies are respected. The toggle appears in both the desktop navbar and mobile menu.

## Content

Release data, socials and the smart link are centralised in `lib/site.js`. Adding a release there automatically produces a catalog card, a timeline row, and a statically generated `/releases/<slug>` page. Releases without cover art fall back to a generated typographic sleeve (`components/ReleaseArt.jsx`) rather than a broken image path.

## Accessibility & performance

- Semantic landmarks, one `<h1>` per page, skip-to-content link, labelled icon buttons, keyboard-operable menu (Escape to close) and audio player.
- `prefers-reduced-motion` disables animation globally.
- Server Components by default; `"use client"` only where browser state is required. Images go through `next/image`, with remote patterns allowed for YouTube thumbnail hosts.

---

© 2026 Lil Bardi. All rights reserved.
