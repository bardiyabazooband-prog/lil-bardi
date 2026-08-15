import VideoCard from "@/components/VideoCard";
import VideoEmptyState from "@/components/VideoEmptyState";

/**
 * Editorial video grid: one wide feature, then an asymmetric supporting grid.
 * Server component — the individual cards own their own client interactivity.
 */
export default function VideoGrid({ videos = [], error = null, configured = true, channelUrl }) {
  if (!videos.length) {
    return <VideoEmptyState configured={configured} error={error} channelUrl={channelUrl} />;
  }

  const [feature, ...rest] = videos;

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start">
        <VideoCard video={feature} index={0} featured />

        {rest.length ? (
          <ul className="flex flex-col gap-5">
            {rest.slice(0, 3).map((video, index) => (
              <li key={video.id}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-3 transition-colors duration-300 hover:border-blue/40"
                >
                  <span className="relative h-16 w-28 shrink-0 overflow-hidden rounded-xl bg-ink sm:h-20 sm:w-32">
                    {video.thumbnail?.url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={video.thumbnail.url}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink group-hover:text-blue sm:text-base">
                      {video.title}
                    </span>
                    <span className="type-label mt-1.5 block text-ink/45">
                      {video.duration ? `${video.duration} · ` : ""}NOW PLAYING NEXT
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {rest.length > 3 ? (
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(3).map((video, index) => (
            <li key={video.id} className="h-full">
              <VideoCard video={video} index={index + 1} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
