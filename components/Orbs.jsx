/**
 * Floating gradient orbs used behind hero sections. Pure CSS, decorative.
 * `variant` picks a colour arrangement so pages do not all look identical.
 */
const VARIANTS = {
  home: [
    "left-[-12%] top-[6%] h-[46vw] w-[46vw] max-h-[520px] max-w-[520px] bg-aqua/40 animate-drift",
    "right-[-8%] top-[-6%] h-[38vw] w-[38vw] max-h-[440px] max-w-[440px] bg-pink/30 animate-drift-slow",
    "left-[38%] bottom-[-18%] h-[42vw] w-[42vw] max-h-[480px] max-w-[480px] bg-blue/25 animate-drift",
  ],
  videos: [
    "right-[-10%] top-[2%] h-[42vw] w-[42vw] max-h-[480px] max-w-[480px] bg-magenta/30 animate-drift",
    "left-[-14%] top-[24%] h-[38vw] w-[38vw] max-h-[430px] max-w-[430px] bg-aqua/35 animate-drift-slow",
    "left-[46%] bottom-[-20%] h-[34vw] w-[34vw] max-h-[400px] max-w-[400px] bg-pink/25 animate-drift",
  ],
  music: [
    "left-[-10%] top-[-4%] h-[40vw] w-[40vw] max-h-[460px] max-w-[460px] bg-lime/35 animate-drift-slow",
    "right-[-12%] top-[18%] h-[44vw] w-[44vw] max-h-[500px] max-w-[500px] bg-blue/28 animate-drift",
  ],
  releases: [
    "right-[-6%] top-[-8%] h-[36vw] w-[36vw] max-h-[420px] max-w-[420px] bg-cyan/60 animate-drift",
    "left-[-12%] bottom-[-10%] h-[40vw] w-[40vw] max-h-[460px] max-w-[460px] bg-magenta/25 animate-drift-slow",
  ],
  about: [
    "left-[-8%] top-[10%] h-[42vw] w-[42vw] max-h-[480px] max-w-[480px] bg-pink/28 animate-drift",
    "right-[-10%] top-[-6%] h-[36vw] w-[36vw] max-h-[420px] max-w-[420px] bg-aqua/38 animate-drift-slow",
  ],
};

export default function Orbs({ variant = "home", className = "" }) {
  const orbs = VARIANTS[variant] ?? VARIANTS.home;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {orbs.map((orb, index) => (
        <span
          key={index}
          className={`absolute rounded-full blur-[90px] will-change-transform sm:blur-[120px] ${orb}`}
        />
      ))}
    </div>
  );
}
