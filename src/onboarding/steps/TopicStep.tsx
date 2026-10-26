import { useId } from 'react';
import { OptionTile, TopicIcon } from '../../ds';
import { TOPICS, type Topic } from '../data';

interface Props {
  value: Topic['id'] | null;
  onChange: (id: Topic['id']) => void;
}

export function TopicStep({ value, onChange }: Props) {
  const headingId = useId();
  return (
    <div className="step">
      <h1 id={headingId} className="step__heading text-heading-1">
        What would you like to learn?
      </h1>
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
