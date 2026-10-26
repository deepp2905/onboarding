import { motion, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';
import { spring } from './motion';
import { cx } from './cx';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

/** Pill button — 64px tall, radius-full. Primary = neutral-900 fill, secondary = outline. */
export function Button({ variant = 'primary', className, disabled, children, ...rest }: ButtonProps) {
  return (
    <motion.button
      type="button"
      className={cx('btn', `btn--${variant}`, className)}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={spring.snappy}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
