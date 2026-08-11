"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE_OUT, VIEWPORT } from "./tokens";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Kept so aria-labelledby on the parent section still resolves. */
  id?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Seconds between words. */
  stagger?: number;
  delay?: number;
}

/**
 * Word-by-word reveal. The text stays a single readable string for screen
 * readers and for copy-paste — only the visual layer is split.
 */
export function SplitText({ text, className, id, as = "h2", stagger = 0.035, delay = 0 }: SplitTextProps) {
  const reduced = usePrefersReducedMotion();
  const Tag = as;

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  const MotionTag = motion[as];
  const words = text.split(" ");

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden align-bottom">
          <motion.span
            data-reveal
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
