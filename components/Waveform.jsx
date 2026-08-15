/**
 * Deterministic waveform graphic (no randomness, so server and client markup
 * always match). Decorative.
 */
export default function Waveform({ bars = 42, tone = "ink", className = "" }) {
  const dark = tone === "light";

  return (
    <div
      aria-hidden="true"
      className={`flex h-16 items-end gap-[3px] sm:h-20 sm:gap-1 ${className}`}
    >
      {Array.from({ length: bars }).map((_, index) => {
        const height = 22 + (Math.sin(index * 0.7) * 0.5 + 0.5) * 66 + ((index * 13) % 11);
        const accent = index % 7 === 0;

        return (
          <span
            key={index}
            style={{ height: `${Math.min(height, 100)}%` }}
            className={`w-full min-w-[2px] rounded-full ${
              accent
                ? dark
                  ? "bg-lime"
                  : "bg-pink"
                : dark
                  ? "bg-cloud/25"
                  : "bg-ink/20"
            }`}
          />
        );
      })}
    </div>
  );
}
