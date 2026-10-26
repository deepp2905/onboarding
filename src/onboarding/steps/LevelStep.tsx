import { useId } from 'react';
import { ChoiceCard, LevelBarsIcon } from '../../ds';
import { LEVELS, type LevelId, type Topic } from '../data';

interface Props {
  topic: Topic;
  value: LevelId | null;
  onChange: (id: LevelId) => void;
}

export function LevelStep({ topic, value, onChange }: Props) {
  const headingId = useId();
  return (
    <div className="step step--center">
      <h1 id={headingId} className="step__heading text-heading-1">
        How familiar are you with {topic.phrase}?
      </h1>
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
