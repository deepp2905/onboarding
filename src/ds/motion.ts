import type { Transition, Variants } from 'motion/react';

/** Shared easing — matches --ease-out in tokens.css */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Spring presets. Calm and refined: high damping, no visible overshoot except `pop`. */
export const spring = {
  /** Page-level movement: step transitions, panel height */
  soft: { type: 'spring', stiffness: 260, damping: 32, mass: 1 },
  /** Press feedback */
  snappy: { type: 'spring', stiffness: 640, damping: 36 },
  /** Small confirmations (radio dot, success badge) — the one place we allow overshoot */
  pop: { type: 'spring', stiffness: 520, damping: 20 },
} satisfies Record<string, Transition>;

const STEP_OFFSET = 40;

/**
 * Step container variants. `custom` is the navigation direction (1 forward, -1 back),
 * so content enters from the side you're travelling toward and leaves the other way.
 */
export const stepVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * STEP_OFFSET,
    filter: 'blur(4px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      x: spring.soft,
      opacity: { duration: 0.32, ease: easeOut },
      filter: { duration: 0.32, ease: easeOut },
      delayChildren: 0.04,
      staggerChildren: 0.035,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -STEP_OFFSET,
    filter: 'blur(4px)',
    transition: { duration: 0.2, ease: easeOut },
  }),
};

/**
 * Whole-page swap (onboarding ⇄ Discover). Uses its own labels so it never
 * cascades into the step-level enter/center variants nested inside a page.
 */
export const pageVariants: Variants = {
  hidden: { opacity: 0 },
  shown: {
    opacity: 1,
    transition: { duration: 0.32, ease: easeOut },
  },
  gone: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
    transition: { duration: 0.24, ease: easeOut },
  },
};

/**
 * A page whose sections carry the entrance themselves. The container stays
 * opaque on the way in (one entrance per element) and only staggers its children.
 */
export const staggerPageVariants: Variants = {
  hidden: {},
  shown: { transition: { delayChildren: 0.06, staggerChildren: 0.07 } },
  gone: pageVariants.gone,
};

/** Persistent chrome (nav) — fades in place, no travel. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.24, ease: easeOut } },
};

/** The most important section of a page — rises the furthest. */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: spring.soft },
};

/** Secondary sections — a shorter rise so they read as following the hero. */
export const settleVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0, transition: spring.soft },
};

/** Child items of a step — inherit enter/center from the step and stagger in. */
export const itemVariants: Variants = {
  enter: { opacity: 0, y: 12, scale: 0.985 },
  center: { opacity: 1, y: 0, scale: 1, transition: spring.soft },
};
