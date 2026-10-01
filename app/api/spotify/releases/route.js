import { getCatalog } from "@/lib/catalog";

/**
 * GET /api/spotify/releases
 *
 * Server-side proxy for the Spotify Web API. Returns the merged catalog
 * (Spotify data + editorial overrides). The private Spotify credentials are
 * only ever read in lib/spotify.js and are never sent to the client.
 *
 * Can also be called by a cron job or webhook to trigger revalidation:
 *   fetch("/api/spotify/releases") // refreshes the cached data
 */
export const revalidate = 3600;

export async function GET() {
  const data = await getCatalog();

  return Response.json(data, {
    status: data.error ? 502 : 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
