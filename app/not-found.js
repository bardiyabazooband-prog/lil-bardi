import AccentDot from "@/components/AccentDot";
import MagneticButton from "@/components/MagneticButton";
import Orbs from "@/components/Orbs";

export const metadata = {
  title: "Signal lost",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink text-cloud">
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint-dark opacity-45" />
      <Orbs variant="home" className="opacity-40" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-7 px-5 py-24 sm:px-8">
        <p className="type-label text-cloud/50">ERROR 404 / SIGNAL LOST</p>

        <h1 className="type-display text-[clamp(3rem,13vw,8rem)] text-cloud">
          Off the
          <br />
          frequency<AccentDot />
        </h1>

        <p className="max-w-lg text-lg text-cloud/65">
          That page is not part of the Lil Bardi world. Head back and keep the signal moving.
        </p>

        <div className="flex flex-wrap gap-3">
          <MagneticButton href="/" tone="lime">
            BACK TO HOME
          </MagneticButton>

          <MagneticButton href="/releases" tone="outlineLight">
            BROWSE RELEASES
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
