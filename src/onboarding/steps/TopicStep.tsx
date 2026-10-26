import { useId } from 'react';
import { motion } from 'motion/react';
import { OptionTile, TopicIcon, itemVariants } from '../../ds';
import { TOPICS, type Topic } from '../data';
import { useFitLine } from '../useFitLine';

interface Props {
  value: Topic['id'] | null;
  onChange: (id: Topic['id']) => void;
}

export function TopicStep({ value, onChange }: Props) {
  const headingId = useId();
  const headingRef = useFitLine<HTMLHeadingElement>();
  return (
    <div className="step">
      <motion.h1 ref={headingRef} id={headingId} className="step__heading text-heading-1" variants={itemVariants}>
        What would you like to learn?
      </motion.h1>
      <div className="topic-grid" role="radiogroup" aria-labelledby={headingId}>
        {TOPICS.map((topic) => (
          <OptionTile
            key={topic.id}
            icon={<TopicIcon name={topic.id} />}
            label={topic.label}
            selected={value === topic.id}
            onSelect={() => onChange(topic.id)}
          />
        ))}
      </div>
    </div>
  );
}
