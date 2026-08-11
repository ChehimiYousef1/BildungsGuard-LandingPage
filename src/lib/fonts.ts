import localFont from "next/font/local";

/**
 * Self-hosted so no visitor request ever reaches a third-party font CDN.
 * Declared once and shared by both locale layouts.
 */
export const jakarta = localFont({
  src: [
    { path: "../../public/fonts/PlusJakartaSans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/PlusJakartaSans-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

export const manrope = localFont({
  src: [
    { path: "../../public/fonts/Manrope-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Manrope-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Manrope-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/Manrope-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});
