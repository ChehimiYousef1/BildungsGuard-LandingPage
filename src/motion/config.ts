/**
 * Motion configuration — the single source of truth for how this site moves.
 *
 * Nothing in the codebase may hardcode a duration, easing or scroll offset.
 * The rule mirrors the colour tokens: if a value is missing, add it here
 * rather than inlining it in a component.
 */

/** Easing vocabulary. Four curves, each with a job. */
export const ease = {
  /** Default entrance — decisive start, soft landing. */
  out: "power3.out",
  /** Settling into place; slightly gentler than `out`. */
  settle: "power2.out",
  /** Small overshoot for things that "arrive" (badges, checkpoints). */
  pop: "back.out(1.7)",
  /** Scroll-linked motion must be linear or it fights the scrollbar. */
  linear: "none",
} as const;

/** Duration scale, in seconds. Tuned for a fast, professional feel. */
export const duration = {
  xs: 0.18,
  sm: 0.26,
  md: 0.34,
  lg: 0.48,
  xl: 0.68,
} as const;

/** Stagger scale, in seconds. */
export const stagger = {
  tight: 0.04,
  base: 0.06,
  loose: 0.1,
} as const;

/** Travel distances, in px. Deliberately small — motion must not break layout. */
export const distance = {
  sm: 12,
  md: 20,
  lg: 32,
} as const;

/** Where an element starts animating relative to the viewport. */
export const trigger = {
  /** Default: just before the element is comfortably on screen. */
  default: "top 82%",
  /** For tall sections whose story should start earlier. */
  early: "top 90%",
  /** For elements that should wait until clearly in view. */
  late: "top 70%",
} as const;

export type Ease = (typeof ease)[keyof typeof ease];
export type Duration = keyof typeof duration;
export type Distance = keyof typeof distance;
