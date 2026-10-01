/**
 * Catalog merger — SERVER ONLY.
 *
 * Merges the live iTunes discography with editorial overrides defined in
 * lib/site.js. When iTunes is configured, new releases appear automatically;
 * editorial fields (blurbs, accents, catalog numbers, audio previews) are
 * preserved when they exist, and sensible defaults are generated otherwise.
 *
 * When iTunes is not configured or the API fails, the static catalog from
 * lib/site.js is used as a fallback so the site always renders.
 */

import "server-only";

import { getArtistReleases } from "@/lib/itunes";
import { RELEASE_OVERRIDES, STATIC_RELEASES } from "@/lib/site";

/**
 * Merge a live release with its editorial override (if any).
 * Editorial fields always win; iTunes provides the structural data.
 */
function mergeRelease(liveRelease, override) {
  if (!override) return liveRelease;

  return {
    ...liveRelease,
    // Editorial overrides — these are hand-curated and always win
    slug: override.slug ?? liveRelease.slug,
    accent: override.accent ?? liveRelease.accent,
    catalog: override.catalog ?? liveRelease.catalog,
    blurb: override.blurb ?? liveRelease.blurb,
    notes: override.notes ?? liveRelease.notes,
    audio: override.audio ?? liveRelease.audio,
    image: override.image ?? liveRelease.image,
    // Allow title override for display purposes
    title: override.title ?? liveRelease.title,
  };
}

/**
 * Build the override lookup map keyed by slug and iTunes ID.
 */
function buildOverrideMap() {
  const bySlug = {};
  const byItunesId = {};

  for (const override of RELEASE_OVERRIDES) {
    if (override.slug) bySlug[override.slug] = override;
    if (override.itunesId) byItunesId[override.itunesId] = override;
  }

  return { bySlug, byItunesId };
}

/**
 * Get the full merged catalog.
 *
 * Returns:
 *   { configured, source, releases, error }
 *
 * - configured: whether iTunes artist ID is present
 * - source: "itunes" if data came from iTunes, "static" if fallback
 * - releases: array of release objects, newest first
 * - error: null or an error code
 */
export async function getCatalog() {
  const { configured, releases: liveReleases, error } = await getArtistReleases();

  // Fallback to static catalog when iTunes is not configured or fails
  if (!configured || (error && liveReleases.length === 0)) {
    return {
      configured,
      source: "static",
      releases: STATIC_RELEASES,
      error: configured ? error : null,
    };
  }

  // If iTunes returned data (even with an error for some releases), use it
  const { bySlug, byItunesId } = buildOverrideMap();
  const seenSlugs = new Set();
  const merged = [];

  for (const liveRelease of liveReleases) {
    const override =
      byItunesId[liveRelease.itunesId] ?? bySlug[liveRelease.slug] ?? null;

    const release = mergeRelease(liveRelease, override);

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

  // Also include any static overrides that don't have an iTunes counterpart
  // (e.g., upcoming releases not yet on iTunes)
  for (const override of RELEASE_OVERRIDES) {
    const exists = merged.some(
      (r) =>
        r.slug === override.slug ||
        (override.itunesId && r.itunesId === override.itunesId),
    );

    if (!exists) {
      merged.push({
        ...override,
        itunesId: override.itunesId ?? null,
        itunesUrl: override.itunesUrl ?? null,
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
    source: "itunes",
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
