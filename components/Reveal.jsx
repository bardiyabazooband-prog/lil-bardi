"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE, VIEWPORT_SOFT } from "@/lib/motion";

/**
 * Scroll-reveal wrapper. One small client boundary keeps the surrounding page
 * a Server Component instead of marking whole pages "use client".
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 26,
  x = 0,
  duration = 0.7,
  className = "",
  amount,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={amount ? { once: true, amount } : VIEWPORT_SOFT}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
