import type { Transition, Variants } from "framer-motion";

/**
 * Motion tokens. Same principle as the colour tokens: no component invents its
 * own duration or easing, so every section moves with one personality even
 * though each has its own entrance.
 */
export const EASE = [0.21, 0.47, 0.32, 0.98] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = { fast: 0.28, base: 0.45, slow: 0.65 } as const;

export const SPRING: Transition = { type: "spring", stiffness: 320, damping: 26, mass: 0.7 };

/** Fires once, slightly before the element is fully on screen. */
export const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" } as const;

export function staggerParent(stagger = 0.08, delayChildren = 0): Variants {
  return { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren } } };
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: SPRING },
};

/** Style C: overshoot settle, used by the sections that should feel alive. */
export const springUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 18, mass: 0.8 } },
};
