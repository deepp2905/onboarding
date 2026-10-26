import { motion } from 'motion/react';
import { InfoCard, easeOut, itemVariants, spring } from '../../ds';
import { USER_NAME, formatInterests, type Level, type Topic } from '../data';

interface Props {
  topic: Topic;
  focus: string[];
  level: Level;
  onEdit: (step: 'topic' | 'focus' | 'level') => void;
}

export function ReadyStep({ topic, focus, level, onEdit }: Props) {
  return (
    <div className="step">
      <motion.div className="ready__title" variants={itemVariants}>
        <h1 className="text-heading-1">{USER_NAME}, your experience is ready</h1>
        <motion.span
          className="ready__badge"
          initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ ...spring.pop, delay: 0.28 }}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 12 12">
            <motion.path
              d="M2.5 6L5 8.5 9.5 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.32, ease: easeOut, delay: 0.42 }}
            />
          </svg>
        </motion.span>
      </motion.div>
      <div className="summary">
        <InfoCard label="Your topic" value={topic.label} onEdit={() => onEdit('topic')} />
        <InfoCard label="Your interests" value={formatInterests(topic, focus)} onEdit={() => onEdit('focus')} />
        <InfoCard label="Your level" value={level.label} onEdit={() => onEdit('level')} />
      </div>
    </div>
  );
}
