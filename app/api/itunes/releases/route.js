import { getCatalog } from "@/lib/catalog";

/**
 * GET /api/itunes/releases
 *
 * Server-side proxy for the iTunes Search API. Returns the merged catalog
 * (iTunes data + editorial overrides). No credentials are needed — the
 * iTunes Search API is public and unauthenticated.
 *
 * Can also be called by a cron job or webhook to trigger revalidation:
 *   fetch("/api/itunes/releases") // refreshes the cached data
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
