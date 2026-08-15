/**
 * Editorial section marker: index number + monospace kicker.
 * Server component — pure presentation.
 */
export default function SectionLabel({ index, children, tone = "ink", className = "" }) {
  const dark = tone === "light";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {index ? (
        <span
          className={`type-label flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
            dark ? "bg-cloud/12 text-cloud" : "bg-ink text-cloud"
          }`}
        >
          {index}
        </span>
      ) : null}

      <p className={`type-label ${dark ? "text-cloud/55" : "text-ink/50"}`}>{children}</p>

      <span
        aria-hidden="true"
        className={`h-px flex-1 ${dark ? "bg-cloud/15" : "bg-ink/12"}`}
      />
    </div>
  );
}
