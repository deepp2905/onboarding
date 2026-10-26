import { AnimatePresence, motion } from 'motion/react';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRightIcon, Button, pageVariants, spring, stepVariants } from '../ds';
import type { Preferences } from '../discover/Discover';
import { getLevel, getTopic, type LevelId, type Topic } from './data';
import { StepCounter } from './StepCounter';
import { FocusStep } from './steps/FocusStep';
import { LevelStep } from './steps/LevelStep';
import { ReadyStep } from './steps/ReadyStep';
import { TopicStep } from './steps/TopicStep';

const STEPS = ['topic', 'focus', 'level', 'ready'] as const;
type StepId = (typeof STEPS)[number];

/**
 * One persistent shell (header, background, action row) with the step content
 * swapping inside it. Nothing remounts between steps except the question itself,
 * which is what makes the four screens read as a single fluid flow.
 */
export function OnboardingFlow({ onComplete }: { onComplete: (prefs: Preferences) => void }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [topicId, setTopicId] = useState<Topic['id'] | null>(null);
  const [focus, setFocus] = useState<string[]>([]);
  const [levelId, setLevelId] = useState<LevelId | null>(null);

  const step = STEPS[index];
  const topic = getTopic(topicId);
  const level = getLevel(levelId);

  const canContinue =
    (step === 'topic' && topic !== null) ||
    (step === 'focus' && focus.length > 0) ||
    (step === 'level' && level !== null) ||
    step === 'ready';

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const handleContinue = () => {
    if (!canContinue) return;
    if (step === 'ready' && topic && level) {
      onComplete({ topic, focus, level });
      return;
    }
    go(index + 1);
  };

  const handleTopic = (id: Topic['id']) => {
    if (id !== topicId) setFocus([]); // sub-topics belong to the topic
    setTopicId(id);
  };

  const toggleFocus = (id: string) =>
    setFocus((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  let content: ReactNode = null;
  if (step === 'topic') content = <TopicStep value={topicId} onChange={handleTopic} />;
  if (step === 'focus' && topic) content = <FocusStep topic={topic} value={focus} onToggle={toggleFocus} />;
  if (step === 'level' && topic) content = <LevelStep topic={topic} value={levelId} onChange={setLevelId} />;
  if (step === 'ready' && topic && level)
    content = (
      <ReadyStep
        topic={topic}
        focus={focus}
        level={level}
        onEdit={(id: StepId) => go(STEPS.indexOf(id))}
      />
    );

  const showBack = step === 'focus' || step === 'level';
  // The summary belongs to the last question, so it keeps the "Step 3 of 3" counter.
  const counterLabel = `Step ${Math.min(index + 1, 3)} of 3`;

  return (
    <motion.div
      className="onboarding"
      data-step={step}
      variants={pageVariants}
      initial="hidden"
      animate="shown"
      exit="gone"
    >
      <div className="ambient" aria-hidden="true">
        <span className="ambient__orb ambient__orb--a" />
        <span className="ambient__orb ambient__orb--b" />
        <span className="ambient__orb ambient__orb--c" />
      </div>

      <header className="onboarding__header">
        <span className="wordmark">LearnVector</span>
        <StepCounter label={counterLabel} direction={direction} />
      </header>

      <main className="onboarding__stage">
        <div className="panel">
          <AutoHeight>
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.section
                key={step}
                className="panel__step"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                aria-live="polite"
              >
                {content}
              </motion.section>
            </AnimatePresence>
          </AutoHeight>

          <div className="actions">
            <AnimatePresence initial={false}>
              {showBack && (
                <motion.div
                  key="back"
                  className="actions__back"
                  initial={{ flexGrow: 0.0001, marginRight: 0, opacity: 0 }}
                  animate={{ flexGrow: 1, marginRight: 16, opacity: 1 }}
                  exit={{ flexGrow: 0.0001, marginRight: 0, opacity: 0 }}
                  transition={{ ...spring.soft, opacity: { duration: 0.18 } }}
                >
                  <Button variant="secondary" onClick={() => go(index - 1)}>
                    Back
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="actions__primary">
              <Button variant="primary" onClick={handleContinue} disabled={!canContinue}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={step === 'ready' ? 'start' : 'continue'}
                    className="btn__label"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                  >
                    {step === 'ready' ? 'Get started' : 'Continue'}
                    <span className="btn__icon btn__icon--nudge">
                      <ArrowRightIcon />
                    </span>
                  </motion.span>
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

/**
 * Animates its own height to match its content. Paired with AnimatePresence's
 * popLayout mode, the outgoing step is taken out of flow immediately, so this
 * measures only the incoming step and the action row glides to its new spot.
 */
function AutoHeight({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const next = entry.borderBoxSize?.[0]?.blockSize ?? el.offsetHeight;
      setHeight(next);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div className="auto-height" initial={false} animate={{ height }} transition={spring.soft}>
      <div ref={innerRef} className="auto-height__inner">
        {children}
      </div>
    </motion.div>
  );
}
