import AccentDot from "@/components/AccentDot";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink text-cloud">
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint-dark opacity-50" />
      <div
        aria-hidden="true"
        className="absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-magenta/35 blur-[120px] animate-drift-slow"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-[8%] h-72 w-72 rounded-full bg-aqua/30 blur-[110px] animate-drift"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <Reveal className="flex flex-col gap-8">
          <p className="type-label flex items-center gap-2.5 text-cloud/50">
            <span className="h-2 w-2 rounded-full bg-lime animate-pulse-dot" aria-hidden="true" />
            LIL BARDI / ALL SIGNALS ACTIVE
          </p>

          <h2 className="type-display max-w-4xl text-[clamp(3rem,11vw,8rem)] text-cloud">
            Keep the
            <br />
            <span className="text-aqua">signal</span> moving<AccentDot tone="cloud" />
          </h2>

          <div className="flex flex-wrap gap-3">
            <MagneticButton href={SITE.smartLink} external tone="lime">
              LISTEN TO LIL BARDI
            </MagneticButton>

            <MagneticButton href="/releases" tone="outlineLight">
              BROWSE THE CATALOG
            </MagneticButton>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
