import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * The site loads no third-party scripts, styles, fonts or images — fonts are
 * self-hosted and there is no analytics — so every fetch directive can be
 * locked to 'self'. `script-src` keeps 'unsafe-inline' because the pages are
 * statically prerendered: Next's hydration payload is an inline script and a
 * nonce would force every route to render per-request. External script
 * injection, the usual XSS delivery vector, is still blocked.
 */
const isDev = process.env.NODE_ENV === "development";

/**
 * React's development build uses eval() for debugging features — reconstructing
 * callstacks, hot reload. It never does in production. So 'unsafe-eval' is added
 * for `next dev` only and can never reach a production response.
 */
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  isDev ? "connect-src 'self' ws: wss:" : "connect-src 'self'",
  "manifest-src 'self'",
]
  .concat(isDev ? [] : ["upgrade-insecure-requests"])
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig: NextConfig = {
  /** Don't advertise the framework version. */
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
