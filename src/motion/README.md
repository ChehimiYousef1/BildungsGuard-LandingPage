# Motion system

GSAP only. `framer-motion` was removed — two animation engines on one landing
page meant ~60KB of overlapping runtime and two mental models.

## Layout

```
src/motion/
├─ config.ts            durations, eases, staggers, distances, scroll triggers
├─ presets.ts           the named motion vocabulary
├─ gsap.ts              single plugin registration point
├─ tokens.ts            reads CSS colour tokens for GSAP tweens
├─ useReducedMotion.ts  SSR-safe prefers-reduced-motion
├─ components/          reusable primitives
└─ sequences/           bespoke per-section timelines
```

## Using it

Reach for a preset first:

```tsx
import { Motion, MotionGroup } from "@/motion";

<Motion preset="rise">…</Motion>
<Motion preset="enterLeft" index={1}>…</Motion>

<MotionGroup preset="pop" as="ul" gap="tight">
  {items.map((item) => (
    <li key={item.id} data-motion-item>…</li>
  ))}
</MotionGroup>
```

Children opt into a group with `data-motion-item` — the group never clones or
wraps them.

## Rules

1. **No component imports `gsap` directly.** Import from `@/motion` or, for a
   sequence, from `../gsap`.
2. **No hardcoded durations, eases or colours.** They live in `config.ts` and
   `tokens.ts`. GSAP cannot tween to a `var()`, which is why colours are read
   from the document rather than written as hex.
3. **Add a preset rather than a one-off tween.** If the vocabulary is missing
   a word, put it in `presets.ts` where the whole team can see it.
4. **Everything runs once and settles.** No loops, no perpetual motion.
5. **Reduced motion skips animation entirely**, never a shortened version.
   The `<h1>` is never animated — it is the LCP element.

## Sequences

`sequences/` is the deliberate exception: multi-step stories a single from/to
pair cannot express — the audit journey, the LMS convergence, the process
timeline, the security scan, the CTA completion, and the per-row 1D/2D/3D
feature motion.
