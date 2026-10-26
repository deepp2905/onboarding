import { useId } from 'react';
import { Chip } from '../../ds';
import type { Topic } from '../data';

interface Props {
  topic: Topic;
  value: string[];
  onToggle: (id: string) => void;
}

export function FocusStep({ topic, value, onToggle }: Props) {
  const headingId = useId();
  return (
    <div className="step">
      <h1 id={headingId} className="step__heading text-heading-1">
        What would you like to focus on?
      </h1>
      <div className="chip-cloud" role="group" aria-labelledby={headingId}>
        {topic.subtopics.map((st) => (
          <Chip key={st.id} label={st.label} selected={value.includes(st.id)} onToggle={() => onToggle(st.id)} />
        ))}
      </div>
    </div>
  );
}
