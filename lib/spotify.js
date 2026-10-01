/**
 * Spotify Web API access — SERVER ONLY.
 *
 * Uses the Client Credentials flow (app-level, no user login) to fetch the
 * artist's public discography. This module must never be imported from a
 * client component: it reads process.env credentials that are intentionally
 * NOT prefixed with NEXT_PUBLIC_.
 *
 * Required environment variables (see .env.example):
 *   SPOTIFY_CLIENT_ID      Spotify app client ID
 *   SPOTIFY_CLIENT_SECRET  Spotify app client secret
 *   SPOTIFY_ARTIST_ID      Artist ID from the Spotify artist URL
 */

import "server-only";

const API = "https://api.spotify.com/v1";
const ACCOUNTS = "https://accounts.spotify.com/api/token";
const REVALIDATE = 3600; // 1 hour for discography data

function clientId() {
  return process.env.SPOTIFY_CLIENT_ID ?? "";
}

function clientSecret() {
  return process.env.SPOTIFY_CLIENT_SECRET ?? "";
}

function artistId() {
  return process.env.SPOTIFY_ARTIST_ID ?? "";
}

function configured() {
  return Boolean(clientId() && clientSecret() && artistId());
}

// --- Token cache (in-memory, survives across requests in the same process) ---
let tokenCache = null;

async function getAccessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.token;
  }

  const response = await fetch(ACCOUNTS, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId(),
      client_secret: clientSecret(),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed with ${response.status}`);
  }

  const data = await response.json();
  const token = data.access_token;

  tokenCache = {
    token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };

  return token;
}

async function api(path, params, { revalidate = REVALIDATE } = {}) {
  const token = await getAccessToken();

  const url = new URL(`${API}/${path}`);
  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(name, String(value));
    }
  });

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Spotify API ${path} failed with ${response.status}`);
  }

  return response.json();
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

function normalizeAlbumType(albumType) {
  const type = (albumType ?? "").toLowerCase();
  if (type === "album") return "Album";
  if (type === "single") return "Single";
  if (type === "ep") return "EP";
  if (type === "compilation") return "Compilation";
  return "Release";
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

function bestImage(images) {
  if (!images || images.length === 0) return null;
  // Prefer the first (largest) image
  return images[0]?.url ?? null;
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
 * Fetch the artist's discography from Spotify.
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
    const data = await api(`artists/${artistId()}/albums`, {
      include_groups: "album,single,ep",
      market: "US",
      limit: 50,
    });

    const seen = new Set();
    const releases = (data.items ?? [])
      .filter((album) => {
        // Deduplicate by album ID
        if (seen.has(album.id)) return false;
        seen.add(album.id);
        return true;
      })
      .map((album) => {
        const slug = slugify(album.name);
        const isoDate = album.release_date ?? null;
        const type = normalizeAlbumType(album.album_type);
        const image = bestImage(album.images);

        return {
          slug,
          title: album.name,
          type,
          tracks: album.total_tracks ?? 1,
          date: formatDate(isoDate) ?? "TBA",
          isoDate: isoDate ?? null,
          image,
          audio: null,
          accent: ACCENT_CYCLE[releases.length % ACCENT_CYCLE.length],
          catalog: generateCatalog(slug, isoDate),
          blurb: generateBlurb(album.name, type),
          notes: [type],
          spotifyId: album.id,
          spotifyUrl: album.external_urls?.spotify ?? null,
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
    console.error("[spotify]", error instanceof Error ? error.message : error);
    return {
      ...empty,
      configured: true,
      error: "request-failed",
    };
  }
}

export { configured as spotifyConfigured };
