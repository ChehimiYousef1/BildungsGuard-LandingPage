"use client";

/**
 * GSAP cannot tween to a `var(--x)` colour, so design tokens are read once
 * from the document. This keeps motion on the same palette as the CSS —
 * never a hardcoded hex that quietly drifts from the Figma design.
 */
function readToken(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export function colorTokens() {
  return {
    teal: readToken("--color-teal", "#0EA5A4"),
    tealSoft: readToken("--color-teal-soft", "#E4F6F5"),
    blue: readToken("--color-blue", "#2563EB"),
    navy: readToken("--color-navy", "#0F2A47"),
    line: readToken("--color-line", "#E3EAF1"),
    surface: readToken("--color-surface", "#F6F9FC"),
    white: "#FFFFFF",
  };
}

export type ColorTokens = ReturnType<typeof colorTokens>;
