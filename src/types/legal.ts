/**
 * Legal pages (Impressum, Datenschutz, AGB) share one document shape so both
 * locales render through a single component and stay structurally in sync.
 */

export interface LegalBlock {
  /** Optional anchor id, so other pages can deep-link to a single clause. */
  id?: string;
  heading: string;
  /** Paragraphs. Rendered in order. */
  body?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

export interface LegalDocument {
  /** Path this document is served at, e.g. "/impressum". */
  path: string;
  /** Same document in the other locale — used for the hreflang alternate. */
  altPath: string;
  title: string;
  description: string;
  intro?: string;
  /** ISO date of the last review, e.g. "2026-08-14". */
  updated: string;
  blocks: LegalBlock[];
}

export interface LegalStrings {
  /** Label of the link back to the landing page. */
  back: string;
  /** Prefix for the review date, e.g. "Stand:". */
  updatedLabel: string;
  /** Shown above the content while placeholders are still unfilled. */
  draftNotice: string;
}

export interface LegalContent {
  strings: LegalStrings;
  imprint: LegalDocument;
  privacy: LegalDocument;
  terms: LegalDocument;
}
