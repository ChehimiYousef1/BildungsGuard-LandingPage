"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point. Registering plugins in every component is the
 * usual source of "works in dev, missing in prod" bugs — import from here
 * instead of from "gsap" directly.
 */
let registered = false;

if (!registered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}

export { gsap, ScrollTrigger, useGSAP };
