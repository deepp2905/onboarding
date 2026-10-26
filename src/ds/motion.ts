import type { Transition, Variants } from 'motion/react';

/** Shared easing — matches --ease-out in tokens.css */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Spring presets. Calm and refined: high damping, no visible overshoot except `pop`. */
export const spring = {
  /** Page-level movement: step transitions, panel height */
  soft: { type: 'spring', stiffness: 260, damping: 32, mass: 1 },
  /** Shared-layout highlights gliding between options */
  glide: { type: 'spring', stiffness: 420, damping: 38 },
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

/** Child items of a step — inherit enter/center from the step and stagger in. */
export const itemVariants: Variants = {
  enter: { opacity: 0, y: 12, scale: 0.985 },
  center: { opacity: 1, y: 0, scale: 1, transition: spring.soft },
};
