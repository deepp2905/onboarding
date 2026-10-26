import { AnimatePresence, motion } from 'motion/react';
import { spring } from '../ds';

interface Props {
  label: string;
  direction: 1 | -1;
}

/** "STEP 2 OF 3" overline. The label rolls vertically in the direction of travel. */
export function StepCounter({ label, direction }: Props) {
  return (
    <span className="step-counter text-overline" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.span
          key={label}
          className="step-counter__label"
          custom={direction}
          variants={{
            enter: (d: number) => ({ y: d * 14, opacity: 0 }),
            center: { y: 0, opacity: 1 },
            exit: (d: number) => ({ y: d * -14, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={spring.soft}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
