"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/**
 * SSR-safe reduced-motion check.
 *
 * useSyncExternalStore reads the real value during the hydration render.
 * Hooks that read matchMedia in an effect report `false` on that first pass,
 * which is long enough to apply an opacity-0 from-state — leaving the page
 * blank for exactly the users who asked for less motion.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
