const DELAYS = ["0ms", "140ms", "70ms", "210ms", "40ms"];

/** Animated bars used by the audio players. Decorative only. */
export default function Equalizer({ active = false, bars = 4, className = "", barClass = "bg-ink" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-3.5 items-end gap-[3px] ${className}`}
    >
      {Array.from({ length: bars }).map((_, index) => (
        <span
          key={index}
          className={`w-[3px] origin-bottom rounded-full ${barClass} ${
            active ? "animate-bar" : "scale-y-[0.35] opacity-60"
          }`}
          style={{
            height: "100%",
            animationDelay: active ? DELAYS[index % DELAYS.length] : undefined,
          }}
        />
      ))}
    </span>
  );
}
