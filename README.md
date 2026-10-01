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
| Data       | YouTube Data API v3 + iTunes Search API (server-side only)  |

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
ITUNES_ARTIST_ID=1857068454
```

Security notes:

- All keys are **server-only**. There are deliberately no `NEXT_PUBLIC_` prefixed versions.
- `lib/youtube.js`, `lib/itunes.js`, and `lib/catalog.js` all import `server-only`, so importing them from a client component is a build error.
- Keys are never logged. If iTunes is unconfigured or fails, the catalog falls back to the static data in `lib/site.js`.

Get a YouTube API key from the [Google Cloud Console](https://console.cloud.google.com/) with the YouTube Data API v3 enabled. The iTunes Search API is free and requires no credentials.

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
  api/itunes/releases/route.js  # server route, returns merged catalog, revalidates hourly
  globals.css                  # Tailwind import + @theme tokens + a few utilities
components/                    # Navbar, MobileMenu, AudioPlayer, ReleaseCard, VideoGrid, …
lib/
  site.js                      # SITE, NAV_LINKS, SOCIALS, RELEASES (editorial overrides + static fallback)
  catalog.js                   # server-only: merges iTunes data with editorial overrides
  itunes.js                   # server-only: iTunes Search API client (free, no auth)
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

Release data, socials and the smart link are centralised in `lib/site.js`. The release catalog is **automatically synced from iTunes/Apple Music** — when a new release drops, it appears on the site within an hour without any manual updates.

### How the catalog sync works

| Layer | File | Role |
| ------ | ---- | ---- |
| iTunes client | `lib/itunes.js` | Server-only. Fetches the artist's discography via the free iTunes Search API (no auth needed). |
| Catalog merger | `lib/catalog.js` | Server-only. Merges iTunes data with editorial overrides from `lib/site.js`. |
| Editorial overrides | `lib/site.js` | Hand-curated blurbs, accents, catalog numbers, and audio previews for known releases. |
| Revalidation API | `app/api/itunes/releases/route.js` | Endpoint that returns the merged catalog; cached for 1 hour. |

When `ITUNES_ARTIST_ID` is set, `lib/catalog.js` fetches the full discography, merges it with any editorial overrides (matched by slug or iTunes collection ID), and sorts newest-first. Releases without editorial overrides get sensible defaults: a generated slug, a cycling accent color, a catalog reference, and a generic blurb. New releases appear automatically on the home page, releases page, music page, and as on-demand `/releases/<slug>` pages.

When iTunes is not configured (no env var) or the API fails, the static catalog in `lib/site.js` is used as a fallback so the site always renders.

To add editorial flair to a new release (custom blurb, accent, audio preview), add an entry to the `RELEASES` array in `lib/site.js` with the matching slug. The merge will pick up your overrides automatically.

Releases without cover art fall back to a generated typographic sleeve (`components/ReleaseArt.jsx`) rather than a broken image path.

## iTunes setup

The iTunes Search API is free and requires no credentials — no API key, no OAuth, no Premium subscription.

1. Find your artist ID by searching iTunes:
   `https://itunes.apple.com/search?term=lil+bardi&entity=song&limit=1`
   The `artistId` field in the response is what you need (e.g. `1857068454`).
   You can also find it in any Apple Music artist URL:
   `https://music.apple.com/artist/lil-bardi/1857068454`
2. Add it to `.env.local`:

```bash
ITUNES_ARTIST_ID=1857068454
```

That's it — new releases will appear on the site automatically within an hour of going live on Apple Music/iTunes. No rebuild or manual update needed.

## Accessibility & performance

- Semantic landmarks, one `<h1>` per page, skip-to-content link, labelled icon buttons, keyboard-operable menu (Escape to close) and audio player.
- `prefers-reduced-motion` disables animation globally.
- Server Components by default; `"use client"` only where browser state is required. Images go through `next/image`, with remote patterns allowed for YouTube thumbnail hosts and iTunes/Apple Music artwork (`mzstatic.com`).

---

© 2026 Lil Bardi. All rights reserved.
