/**
 * Motion system — GSAP only.
 *
 *   import { Motion, MotionGroup } from "@/motion";
 *
 * Sections should not import gsap directly. Reach for a preset first; add a
 * new one to presets.ts if the vocabulary is genuinely missing a word.
 * Bespoke timelines (the audit journey, the security scan) live in
 * src/motion/sequences/ and are the deliberate exception.
 */
export * from "./components";
export { presets, presetNames, type PresetName, type MotionPreset } from "./presets";
export { duration, ease, stagger, distance, trigger } from "./config";
export { useReducedMotion } from "./useReducedMotion";
export { colorTokens, type ColorTokens } from "./tokens";
