import { useId } from 'react';
import { motion } from 'motion/react';
import { ChoiceCard, LevelBarsIcon, itemVariants } from '../../ds';
import { LEVELS, type LevelId, type Topic } from '../data';
import { useFitLine } from '../useFitLine';

interface Props {
  topic: Topic;
  value: LevelId | null;
  onChange: (id: LevelId) => void;
}

export function LevelStep({ topic, value, onChange }: Props) {
  const headingId = useId();
  const headingRef = useFitLine<HTMLHeadingElement>();
  return (
    <div className="step step--center">
      <motion.h1 ref={headingRef} id={headingId} className="step__heading text-heading-1" variants={itemVariants}>
        How familiar are you with {topic.phrase}?
      </motion.h1>
      <div className="level-row" role="radiogroup" aria-labelledby={headingId}>
        {LEVELS.map((level) => (
          <ChoiceCard
            key={level.id}
            glyph={<LevelBarsIcon level={level.bars} />}
            title={level.label}
            description={level.description}
            selected={value === level.id}
            onSelect={() => onChange(level.id)}
          />
        ))}
      </div>
    </div>
  );
}
