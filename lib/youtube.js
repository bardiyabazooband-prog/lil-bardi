/**
 * YouTube Data API access — SERVER ONLY.
 *
 * This module must never be imported from a client component: it reads
 * process.env.YOUTUBE_API_KEY, which is intentionally NOT prefixed with
 * NEXT_PUBLIC_ so the key can never be bundled into client JavaScript.
 *
 * Required environment variables (see .env.example):
 *   YOUTUBE_API_KEY      private API key
 *   YOUTUBE_CHANNEL_ID   channel id (UC...) — preferred over search queries
 *   YOUTUBE_CHANNEL_HANDLE  optional fallback, e.g. officiallilbardi
 */

import "server-only";

const API = "https://www.googleapis.com/youtube/v3";
const REVALIDATE = 3600; // 1 hour

function key() {
  return process.env.YOUTUBE_API_KEY ?? "";
}

async function api(path, params, { revalidate = REVALIDATE } = {}) {
  const url = new URL(`${API}/${path}`);

  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(name, String(value));
    }
  });

  url.searchParams.set("key", key());

  const response = await fetch(url, { next: { revalidate } });

  if (!response.ok) {
    // Never surface the URL (it carries the key) in logs or errors.
    throw new Error(`YouTube API ${path} failed with ${response.status}`);
  }

  return response.json();
}

/** ISO 8601 duration (PT4M13S) -> "4:13" */
function formatDuration(iso) {
  if (!iso) return null;

  const match = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!match) return null;

  const [, d, h, m, s] = match.map((value) => (value ? Number(value) : 0));
  const hours = h + d * 24;
  const minutes = m;
  const seconds = s;

  const pad = (value) => String(value).padStart(2, "0");

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
}

function bestThumbnail(thumbnails = {}) {
  return (
    thumbnails.maxres ??
    thumbnails.standard ??
    thumbnails.high ??
    thumbnails.medium ??
    thumbnails.default ??
    null
  );
}

async function resolveChannelId() {
  const configured = process.env.YOUTUBE_CHANNEL_ID?.trim();
  if (configured) return configured;

  const handle = process.env.YOUTUBE_CHANNEL_HANDLE?.trim();
  if (!handle) return null;

  const data = await api(
    "channels",
    { part: "id", forHandle: handle.replace(/^@/, "") },
    { revalidate: 86400 },
  );

  return data.items?.[0]?.id ?? null;
}

/**
 * Fetch the newest uploads from the channel, newest first.
 * Returns a stable shape whether or not the API is configured, so the UI can
 * render a real state instead of placeholder videos.
 */
export async function getChannelVideos({ limit = 12 } = {}) {
  const empty = {
    configured: false,
    videos: [],
    channel: null,
    error: null,
  };

  if (!key()) return empty;

  try {
    const channelId = await resolveChannelId();
    if (!channelId) return { ...empty, error: "missing-channel" };

    const channelData = await api(
      "channels",
      { part: "snippet,contentDetails,statistics", id: channelId },
      { revalidate: 86400 },
    );

    const channel = channelData.items?.[0];
    if (!channel) return { ...empty, error: "channel-not-found" };

    const uploads = channel.contentDetails?.relatedPlaylists?.uploads;
    if (!uploads) return { ...empty, error: "missing-uploads-playlist" };

    const playlist = await api("playlistItems", {
      part: "snippet,contentDetails",
      playlistId: uploads,
      maxResults: Math.min(Math.max(limit, 1), 50),
    });

    const items = (playlist.items ?? [])
      .map((item) => ({
        id: item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId,
        title: item.snippet?.title ?? "",
        description: item.snippet?.description ?? "",
        publishedAt:
          item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? null,
        thumbnail: bestThumbnail(item.snippet?.thumbnails),
      }))
      .filter((item) => Boolean(item.id) && item.title !== "Private video");

    // Enrich with duration + view count in a single batched request.
    let details = {};

    if (items.length) {
      const stats = await api("videos", {
        part: "contentDetails,statistics",
        id: items.map((item) => item.id).join(","),
      });

      details = Object.fromEntries(
        (stats.items ?? []).map((video) => [
          video.id,
          {
            duration: formatDuration(video.contentDetails?.duration),
            views: video.statistics?.viewCount
              ? Number(video.statistics.viewCount)
              : null,
          },
        ]),
      );
    }

    const videos = items
      .map((item) => ({
        ...item,
        duration: details[item.id]?.duration ?? null,
        views: details[item.id]?.views ?? null,
        url: `https://www.youtube.com/watch?v=${item.id}`,
      }))
      .sort((a, b) => new Date(b.publishedAt ?? 0) - new Date(a.publishedAt ?? 0))
      .slice(0, limit);

    return {
      configured: true,
      videos,
      channel: {
        id: channel.id,
        title: channel.snippet?.title ?? null,
        url: channel.snippet?.customUrl
          ? `https://www.youtube.com/${channel.snippet.customUrl}`
          : `https://www.youtube.com/channel/${channel.id}`,
        subscribers: channel.statistics?.subscriberCount
          ? Number(channel.statistics.subscriberCount)
          : null,
        videoCount: channel.statistics?.videoCount
          ? Number(channel.statistics.videoCount)
          : null,
        hiddenSubscriberCount: Boolean(channel.statistics?.hiddenSubscriberCount),
      },
      error: null,
    };
  } catch (error) {
    console.error("[youtube]", error instanceof Error ? error.message : error);
    return { ...empty, configured: Boolean(key()), error: "request-failed" };
  }
}
