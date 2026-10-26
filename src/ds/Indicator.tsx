import { AnimatePresence, motion } from 'motion/react';
import { easeOut, spring } from './motion';

export interface IndicatorProps {
  /** `radio` shows a centre dot (single choice); `check` draws a tick (multi choice). */
  type: 'radio' | 'check';
  checked: boolean;
}

/** 24px selection indicator from the onboarding screens. Purely decorative — the parent owns semantics. */
export function Indicator({ type, checked }: IndicatorProps) {
  return (
    <span className="indicator" data-checked={checked} aria-hidden="true">
      <AnimatePresence initial={false}>
        {checked &&
          (type === 'radio' ? (
            <motion.span
              key="dot"
              className="indicator__dot"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.12 } }}
              transition={spring.pop}
            />
          ) : (
            <motion.svg
              key="check"
              className="indicator__check"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              <motion.path
                d="M5 12L10 17L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.28, ease: easeOut, delay: 0.04 }}
              />
            </motion.svg>
          ))}
      </AnimatePresence>
    </span>
  );
}
