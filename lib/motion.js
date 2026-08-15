/** Shared Framer Motion presets so animation feels consistent site-wide. */

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const stagger = (delay = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: delay, delayChildren },
  },
});

export const maskUp = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

export const VIEWPORT = { once: true, amount: 0.25 };
export const VIEWPORT_SOFT = { once: true, amount: 0.12 };
