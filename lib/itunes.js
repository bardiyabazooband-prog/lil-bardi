/**
 * iTunes Search API access — SERVER ONLY.
 *
 * Uses the free, unauthenticated iTunes Search API to fetch the artist's
 * discography. No API key, no Premium account, no OAuth — just a public
 * endpoint that returns album metadata including artwork, release dates,
 * and track counts.
 *
 * Required environment variables (see .env.example):
 *   ITUNES_ARTIST_ID   Numeric artist ID from the iTunes/Apple Music URL
 *
 * The artist ID can be found by searching for the artist on iTunes:
 *   https://itunes.apple.com/search?term=ARTIST_NAME&entity=song&limit=1
 * The `artistId` field in the response is what you need.
 */

import "server-only";

const API = "https://itunes.apple.com";
const REVALIDATE = 3600; // 1 hour

function artistId() {
  return process.env.ITUNES_ARTIST_ID ?? "";
}

function configured() {
  return Boolean(artistId());
}

/**
 * Upgrade a 100x100 artwork URL to a larger size.
 * iTunes artwork URLs contain "100x100" which can be swapped for
 * "600x600" for higher resolution.
 */
function upgradeArtwork(url) {
  if (!url) return null;
  return url.replace("100x100", "600x600");
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeType(collectionType, name) {
  const type = (collectionType ?? "").toLowerCase();
  if (type === "ep" || /\bep\b/i.test(name)) return "EP";
  if (name.includes("- Single") || name.includes("(Single)")) return "Single";
  if (type === "album") return "Album";
  // Heuristic: if the name contains "- Single", treat as single
  return "Release";
}

function cleanTitle(name) {
  // Remove " - Single", " - EP", " (Single)", etc. from the title
  return name
    .replace(/\s*-\s*Single\s*$/i, "")
    .replace(/\s*-\s*EP\s*$/i, "")
    .replace(/\s*\(Single\)\s*$/i, "")
    .replace(/\s*\(EP\)\s*$/i, "")
    .trim();
}

function formatDate(isoDate) {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

const ACCENT_CYCLE = ["aqua", "blue", "pink", "magenta", "lime", "cyan"];

function generateCatalog(slug, isoDate) {
  const code = slug.slice(0, 3).toUpperCase();
  const date = isoDate ? new Date(isoDate) : new Date();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const yy = String(date.getUTCFullYear()).slice(-2);
  return `LB / ${code} / ${mm}${dd}${yy}`;
}

function generateBlurb(title, type) {
  const typeLabel = type === "Album" ? "full length" : type === "EP" ? "new EP" : "new single";
  return `${title} — the latest from Lil Bardi. ${typeLabel.charAt(0).toUpperCase()}${typeLabel.slice(1)} energy, built for the rotation.`;
}

/**
 * Fetch the artist's discography from the iTunes Search API.
 *
 * Returns a stable shape whether or not the API is configured, so the UI can
 * render a real state instead of placeholder data.
 */
export async function getArtistReleases() {
  const empty = {
    configured: false,
    releases: [],
    error: null,
  };

  if (!configured()) return empty;

  try {
    const url = new URL(`${API}/lookup`);
    url.searchParams.set("id", artistId());
    url.searchParams.set("entity", "album");
    url.searchParams.set("limit", "200");

    const response = await fetch(url, { next: { revalidate: REVALIDATE } });

    if (!response.ok) {
      throw new Error(`iTunes API lookup failed with ${response.status}`);
    }

    const data = await response.json();

    const seen = new Set();
    const releases = (data.results ?? [])
      .filter((item) => item.wrapperType === "collection")
      .filter((item) => {
        // Deduplicate by collection ID
        if (seen.has(item.collectionId)) return false;
        seen.add(item.collectionId);
        return true;
      })
      .map((album, index) => {
        const rawName = album.collectionName ?? "Untitled";
        const slug = slugify(cleanTitle(rawName));
        const isoDate = album.releaseDate ?? null;
        const type = normalizeType(album.collectionType, rawName);
        const title = cleanTitle(rawName);

        return {
          slug,
          title,
          type,
          tracks: album.trackCount ?? 1,
          date: formatDate(isoDate) ?? "TBA",
          isoDate: isoDate ?? null,
          image: upgradeArtwork(album.artworkUrl100) ?? null,
          audio: null,
          accent: ACCENT_CYCLE[index % ACCENT_CYCLE.length],
          catalog: generateCatalog(slug, isoDate),
          blurb: generateBlurb(title, type),
          notes: [type],
          itunesId: album.collectionId,
          itunesUrl: album.collectionViewUrl ?? null,
          spotifyId: null,
          spotifyUrl: null,
        };
      })
      .sort((a, b) => {
        const dateA = a.isoDate ? new Date(a.isoDate).getTime() : 0;
        const dateB = b.isoDate ? new Date(b.isoDate).getTime() : 0;
        return dateB - dateA;
      });

    return {
      configured: true,
      releases,
      error: null,
    };
  } catch (error) {
    console.error("[itunes]", error instanceof Error ? error.message : error);
    return {
      ...empty,
      configured: true,
      error: "request-failed",
    };
  }
}

export { configured as itunesConfigured };
