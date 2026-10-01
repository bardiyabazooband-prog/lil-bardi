/**
 * Catalog merger — SERVER ONLY.
 *
 * Merges the live Spotify discography with editorial overrides defined in
 * lib/site.js. When Spotify is configured, new releases appear automatically;
 * editorial fields (blurbs, accents, catalog numbers, audio previews) are
 * preserved when they exist, and sensible defaults are generated otherwise.
 *
 * When Spotify is not configured or the API fails, the static catalog from
 * lib/site.js is used as a fallback so the site always renders.
 */

import "server-only";

import { getArtistReleases } from "@/lib/spotify";
import { RELEASE_OVERRIDES, STATIC_RELEASES } from "@/lib/site";

/**
 * Merge a single Spotify release with its editorial override (if any).
 * Editorial fields always win; Spotify provides the structural data.
 */
function mergeRelease(spotifyRelease, override) {
  if (!override) return spotifyRelease;

  return {
    ...spotifyRelease,
    // Editorial overrides — these are hand-curated and always win
    slug: override.slug ?? spotifyRelease.slug,
    accent: override.accent ?? spotifyRelease.accent,
    catalog: override.catalog ?? spotifyRelease.catalog,
    blurb: override.blurb ?? spotifyRelease.blurb,
    notes: override.notes ?? spotifyRelease.notes,
    audio: override.audio ?? spotifyRelease.audio,
    image: override.image ?? spotifyRelease.image,
    // Allow title override for display purposes
    title: override.title ?? spotifyRelease.title,
  };
}

/**
 * Build the override lookup map keyed by both slug and spotifyId.
 */
function buildOverrideMap() {
  const bySlug = {};
  const bySpotifyId = {};

  for (const override of RELEASE_OVERRIDES) {
    if (override.slug) bySlug[override.slug] = override;
    if (override.spotifyId) bySpotifyId[override.spotifyId] = override;
  }

  return { bySlug, bySpotifyId };
}

/**
 * Get the full merged catalog.
 *
 * Returns:
 *   { configured, source, releases, error }
 *
 * - configured: whether Spotify credentials are present
 * - source: "spotify" if data came from Spotify, "static" if fallback
 * - releases: array of release objects, newest first
 * - error: null or an error code
 */
export async function getCatalog() {
  const { configured, releases: spotifyReleases, error } = await getArtistReleases();

  // Fallback to static catalog when Spotify is not configured or fails
  if (!configured || (error && spotifyReleases.length === 0)) {
    return {
      configured,
      source: "static",
      releases: STATIC_RELEASES,
      error: configured ? error : null,
    };
  }

  // If Spotify returned data (even with an error for some releases), use it
  const { bySlug, bySpotifyId } = buildOverrideMap();
  const seenSlugs = new Set();
  const merged = [];

  for (const spotifyRelease of spotifyReleases) {
    const override =
      bySpotifyId[spotifyRelease.spotifyId] ?? bySlug[spotifyRelease.slug] ?? null;

    const release = mergeRelease(spotifyRelease, override);

    // Ensure slug uniqueness
    let uniqueSlug = release.slug;
    let counter = 2;
    while (seenSlugs.has(uniqueSlug)) {
      uniqueSlug = `${release.slug}-${counter}`;
      counter++;
    }
    release.slug = uniqueSlug;
    seenSlugs.add(uniqueSlug);

    merged.push(release);
  }

  // Also include any static overrides that don't have a Spotify counterpart
  // (e.g., upcoming releases not yet on Spotify)
  for (const override of RELEASE_OVERRIDES) {
    const exists = merged.some(
      (r) =>
        r.slug === override.slug ||
        (override.spotifyId && r.spotifyId === override.spotifyId),
    );

    if (!exists) {
      merged.push({
        ...override,
        spotifyId: override.spotifyId ?? null,
        spotifyUrl: override.spotifyUrl ?? null,
      });
    }
  }

  // Sort newest first
  merged.sort((a, b) => {
    const dateA = a.isoDate ? new Date(a.isoDate).getTime() : 0;
    const dateB = b.isoDate ? new Date(b.isoDate).getTime() : 0;
    return dateB - dateA;
  });

  return {
    configured,
    source: "spotify",
    releases: merged,
    error,
  };
}

/**
 * Get the latest (newest) release.
 */
export async function getLatestRelease() {
  const { releases } = await getCatalog();
  return releases[0] ?? null;
}

/**
 * Get a single release by slug.
 */
export async function getRelease(slug) {
  const { releases } = await getCatalog();
  return releases.find((r) => r.slug === slug) ?? null;
}

/**
 * Get the previous and next releases relative to the given slug.
 */
export async function getReleaseNeighbours(slug) {
  const { releases } = await getCatalog();
  const index = releases.findIndex((r) => r.slug === slug);

  if (index === -1) return { previous: null, next: null };

  return {
    previous: releases[index - 1] ?? releases[releases.length - 1],
    next: releases[index + 1] ?? releases[0],
  };
}
