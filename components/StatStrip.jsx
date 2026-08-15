/**
 * Row of metadata stats. `items` = [{ label, value, note? }]
 */
export default function StatStrip({ items = [], tone = "ink", className = "" }) {
  const dark = tone === "light";

  return (
    <dl
      className={`grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3 ${
        dark ? "border-cloud/15 bg-cloud/12" : "border-ink/10 bg-ink/8"
      } ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex flex-col gap-2 p-5 sm:p-6 ${dark ? "bg-ink" : "bg-white"}`}
        >
          <dt className={`type-label ${dark ? "text-cloud/45" : "text-ink/40"}`}>
            {item.label}
          </dt>

          <dd
            className={`type-display text-[clamp(1.6rem,3.6vw,2.4rem)] ${
              dark ? "text-cloud" : "text-ink"
            }`}
          >
            {item.value}
          </dd>

          {item.note ? (
            <p className={`text-xs ${dark ? "text-cloud/45" : "text-ink/45"}`}>{item.note}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
