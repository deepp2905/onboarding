import { motion } from 'motion/react';
import { easeOut, itemVariants, spring } from '../../ds';
import { USER_NAME, midSentence, type Level, type Topic } from '../data';

interface Props {
  topic: Topic;
  focus: string[];
  level: Level;
}

/** Particle burst angles/distances are fixed so the celebration looks the same every time. */
const PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 + (i % 2 ? 0.18 : 0);
  const distance = i % 3 === 0 ? 92 : i % 3 === 1 ? 74 : 60;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: i % 3 === 0 ? 8 : 6,
    tone: i % 3,
  };
});

export function DoneStep({ topic, focus, level }: Props) {
  const first = topic.subtopics.find((st) => focus.includes(st.id));
  return (
    <div className="step step--center done">
      <motion.div className="done__mark" variants={itemVariants} aria-hidden="true">
        <span className="done__ring" />
        <span className="done__ring done__ring--late" />
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="done__particle"
            data-tone={p.tone}
            style={{ width: p.size, height: p.size }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{ x: p.x, y: p.y, scale: [0, 1, 0.6], opacity: [0, 1, 0] }}
            transition={{ duration: 1.1, ease: easeOut, delay: 0.18 + (i % 4) * 0.02 }}
          />
        ))}
        <motion.span
          className="done__badge"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ ...spring.pop, delay: 0.08 }}
        >
          <svg width="36" height="36" viewBox="0 0 12 12">
            <motion.path
              d="M2.5 6L5 8.5 9.5 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.3 }}
            />
          </svg>
        </motion.span>
      </motion.div>
      <motion.h1 className="text-heading-1" variants={itemVariants}>
        You’re all set, {USER_NAME}
      </motion.h1>
      <motion.p className="done__copy text-body-lg" variants={itemVariants}>
        We’ve lined up {level.adjective} {topic.phrase} lessons
        {first ? `, starting with ${midSentence(first.label)}` : ''}.
      </motion.p>
    </div>
  );
}
