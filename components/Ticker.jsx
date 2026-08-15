/**
 * Infinite marquee. Pure CSS animation (see --animate-marquee in globals.css)
 * so it costs nothing on the main thread and stops under prefers-reduced-motion.
 *
 * The scrolling strip is decorative (it repeats itself), so it is hidden from
 * assistive tech and the same words are exposed once as plain text.
 */
export default function Ticker({
  items = [],
  tone = "ink",
  fast = false,
  className = "",
  label = "Lil Bardi release ticker",
}) {
  const dark = tone === "light";
  const run = [...items, ...items];

  const dot = (index) =>
    index % 4 === 0
      ? "bg-pink"
      : index % 4 === 1
        ? "bg-aqua"
        : index % 4 === 2
          ? "bg-lime"
          : "bg-magenta";

  return (
    <section
      aria-label={label}
      className={`relative overflow-hidden border-y ${
        dark ? "border-cloud/12 bg-ink text-cloud" : "border-ink/10 bg-white text-ink"
      } ${className}`}
    >
      <p className="sr-only">{items.join(", ")}</p>

      <div
        aria-hidden="true"
        className={`flex w-max items-center py-4 will-change-transform sm:py-5 ${
          fast ? "animate-marquee-fast" : "animate-marquee"
        }`}
      >
        {run.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center">
            <span className="type-display px-4 text-[clamp(1.5rem,4.4vw,3rem)] whitespace-nowrap sm:px-6">
              {item}
            </span>

            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dot(index)}`} />
          </span>
        ))}
      </div>
    </section>
  );
}
