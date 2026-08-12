import type gsap from "gsap";
import { distance, duration, ease } from "./config";

/**
 * The motion vocabulary.
 *
 * A preset is a named pair of states: where an element starts, and how it
 * arrives. Sections choose a preset by name, so the motion language is
 * defined in one file rather than scattered across twenty components.
 */
export interface MotionPreset {
  /** Human-readable role — why this movement exists. */
  role: string;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

const base = { duration: duration.md, ease: ease.out };

export const presets = {
  /** Neutral entrance. The default for supporting content. */
  fade: {
    role: "Appear without direction — for content that has no spatial story.",
    from: { opacity: 0 },
    to: { opacity: 1, ...base },
  },

  /** Content that follows the reading flow. */
  rise: {
    role: "Enter from below, following the scroll direction.",
    from: { opacity: 0, y: distance.md },
    to: { opacity: 1, y: 0, ...base },
  },

  /** Paired with `enterRight` for two-column sections. */
  enterLeft: {
    role: "Arrive from the left — use for the column that sits on the left.",
    from: { opacity: 0, x: -distance.lg },
    to: { opacity: 1, x: 0, ...base },
  },

  enterRight: {
    role: "Arrive from the right — mirrors enterLeft.",
    from: { opacity: 0, x: distance.lg },
    to: { opacity: 1, x: 0, ...base },
  },

  /** Things that land rather than slide: badges, checkpoints, counters. */
  pop: {
    role: "Land with a slight overshoot — for discrete items that 'arrive'.",
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1, duration: duration.sm, ease: ease.pop },
  },

  /** One axis only — the audit reading. */
  wipe: {
    role: "Reveal along a single axis, left to right, like reading a trail.",
    from: { clipPath: "inset(0 100% 0 0)" },
    to: { clipPath: "inset(0 0% 0 0)", duration: duration.xl, ease: ease.settle },
  },

  /** Depth without theatrics. */
  turn: {
    role: "Rotate out of perspective so a surface reads as a real plane.",
    from: { opacity: 0, rotateY: 12, y: distance.md },
    to: { opacity: 1, rotateY: 0, y: 0, duration: duration.xl, ease: ease.out },
  },

  /** Scattered parts locking into one composition. */
  assemble: {
    role: "Settle from a slight offset and rotation — separate parts becoming one.",
    from: { opacity: 0, y: distance.md, scale: 0.97, rotate: 1.2 },
    to: { opacity: 1, y: 0, scale: 1, rotate: 0, duration: duration.lg, ease: ease.out },
  },

  /** SVG strokes. */
  draw: {
    role: "Draw a stroke from nothing — for rules, connectors and ticks.",
    from: { scaleX: 0, transformOrigin: "left center" },
    to: { scaleX: 1, duration: duration.lg, ease: ease.settle },
  },
} as const satisfies Record<string, MotionPreset>;

export type PresetName = keyof typeof presets;

/** Every preset name, for documentation and tests. */
export const presetNames = Object.keys(presets) as PresetName[];
