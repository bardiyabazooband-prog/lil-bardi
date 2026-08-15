const TONES = {
  pink: "bg-pink",
  lime: "bg-lime",
  blue: "bg-blue",
  aqua: "bg-aqua",
  magenta: "bg-magenta",
  ink: "bg-ink",
  cloud: "bg-cloud",
};

/**
 * Decorative full stop for display headings. Anton's period is a hard square at
 * hero sizes, so headings use this round dot instead — it echoes the LB. logo.
 */
export default function AccentDot({ tone = "pink", className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`ml-[0.05em] inline-block h-[0.13em] w-[0.13em] rounded-full align-baseline ${
        TONES[tone] ?? TONES.pink
      } ${className}`}
    />
  );
}
