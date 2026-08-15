import { getChannelVideos } from "@/lib/youtube";

/**
 * GET /api/youtube/videos?limit=12
 *
 * Server-side proxy for the YouTube Data API. The private YOUTUBE_API_KEY is
 * only ever read here (and in lib/youtube.js) and is never sent to the client.
 */
export const revalidate = 3600;

export async function GET(request) {
  const requested = Number(new URL(request.url).searchParams.get("limit"));
  const limit = Number.isFinite(requested)
    ? Math.min(Math.max(Math.trunc(requested), 1), 24)
    : 12;

  const data = await getChannelVideos({ limit });

  return Response.json(data, {
    status: data.error === "request-failed" ? 502 : 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
