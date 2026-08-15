"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useSound } from "@/components/SoundProvider";

const TONES = {
  ink: "bg-ink text-cloud hover:bg-inkblue",
  cloud: "bg-white text-ink border border-ink/12 hover:border-ink/30",
  lime: "bg-lime text-ink hover:bg-aqua",
  aqua: "bg-aqua text-ink hover:bg-lime",
  outlineLight: "border border-cloud/25 text-cloud hover:border-lime hover:text-lime",
};

/**
 * Primary CTA. Cursor-magnetic on pointer devices, plain and tappable on touch,
 * and static when the user prefers reduced motion.
 */
export default function MagneticButton({
  href,
  children,
  tone = "ink",
  external = false,
  className = "",
  icon: Icon = ArrowUpRight,
  onClick,
  ...rest
}) {
  const reduce = useReducedMotion();
  const { play } = useSound();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  function handleMove(event) {
    if (reduce || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.28);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span
      style={reduce ? undefined : { x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.96 }}
      className={`type-label inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 transition-colors duration-300 sm:px-6 ${
        TONES[tone] ?? TONES.ink
      } ${className}`}
    >
      <span>{children}</span>
      {Icon ? (
        <Icon
          size={15}
          strokeWidth={2.4}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ) : null}
    </motion.span>
  );

  const shared = {
    className: "group inline-block",
    onMouseEnter: () => play("hover"),
    onClick: (event) => {
      play("tap");
      onClick?.(event);
    },
    ...rest,
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...shared}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} {...shared}>
      {inner}
    </Link>
  );
}
