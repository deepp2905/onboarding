import { useId, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import { OptionTile, TopicIcon, itemVariants } from '../../ds';
import { TOPICS, USER_NAME, type Topic } from '../data';
import { useFitLine } from '../useFitLine';

const mobileQuery = '(max-width: 560px)';
const isMobile = () => window.matchMedia(mobileQuery).matches;
const subscribeToMobile = (onChange: () => void) => {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const serverIsMobile = () => false;

interface Props {
  value: Topic['id'] | null;
  onChange: (id: Topic['id']) => void;
}

export function TopicStep({ value, onChange }: Props) {
  const headingId = useId();
  const headingRef = useFitLine<HTMLHeadingElement>();
  const mobile = useSyncExternalStore(subscribeToMobile, isMobile, serverIsMobile);
  // Match the reading and keyboard order to the two- or three-column grid.
  const topics = TOPICS.filter((topic) => topic.id !== 'design');
  const design = TOPICS.find((topic) => topic.id === 'design');
  if (design) topics.splice(mobile ? 1 : 2, 0, design);
  return (
    <div className="step">
      <motion.h1 ref={headingRef} id={headingId} className="step__heading text-heading-1" variants={itemVariants}>
        {USER_NAME}, what would you like to learn?
      </motion.h1>
      <div className="topic-grid" role="radiogroup" aria-labelledby={headingId}>
        {topics.map((topic) => (
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
