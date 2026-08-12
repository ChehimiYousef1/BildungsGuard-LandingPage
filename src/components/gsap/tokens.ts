/**
 * GSAP cannot animate to a `var(--x)` colour, so design tokens are read once
 * from the document. This keeps motion code on the same palette as the CSS —
 * never a hardcoded hex that silently drifts from the Figma design.
 */
export function readToken(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export const motionTokens = () => ({
  teal: readToken("--color-teal", "#0EA5A4"),
  blue: readToken("--color-blue", "#2563EB"),
  navy: readToken("--color-navy", "#0F2A47"),
  line: readToken("--color-line", "#E3EAF1"),
  surface: readToken("--color-surface", "#F6F9FC"),
  white: "#FFFFFF",
});

/** One easing vocabulary, shared by every GSAP timeline. */
export const EASE = {
  out: "power3.out",
  settle: "power2.out",
  pop: "back.out(1.7)",
  linear: "none",
} as const;
