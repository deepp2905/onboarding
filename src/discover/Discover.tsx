import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState, type CSSProperties } from 'react';
import { ChevronRightIcon, CloseIcon, PathIcon, PlayIcon, SearchIcon, fadeVariants, riseVariants, settleVariants, spring, staggerPageVariants } from '../ds';
import { LEVELS, USER_NAME, type Level, type Topic } from '../onboarding/data';
import { CONTENT, buildRows, type Lesson } from './content';

export interface Preferences {
  topic: Topic;
  focus: string[];
  level: Level;
}

interface Props extends Preferences {
  /** Wordmark click: back to the start of onboarding. */
  onRestart: () => void;
}

const lavender = (step: 50 | 100 | 200 | 300 | 400) => `var(--color-lavender-${step})`;
const GLOW = 'var(--gradient-lavender-glow)';

/**
 * Thumbnail palettes, one per row, one tone per card position. Thumbnails stay
 * within lavender 50–400 so the art reads as soft brand texture, never as content.
 */
const TONES: { bg: string; dot: string }[][] = [
  [
    { bg: lavender(100), dot: lavender(400) },
    { bg: lavender(200), dot: lavender(400) },
    { bg: lavender(400), dot: lavender(200) },
    { bg: GLOW, dot: lavender(300) },
  ],
  [
    { bg: lavender(50), dot: lavender(300) },
    { bg: lavender(300), dot: lavender(50) },
    { bg: lavender(200), dot: lavender(400) },
    { bg: GLOW, dot: lavender(400) },
  ],
  [
    { bg: lavender(200), dot: lavender(50) },
    { bg: lavender(100), dot: lavender(300) },
    { bg: lavender(400), dot: lavender(100) },
    { bg: GLOW, dot: lavender(200) },
  ],
];

const levelLabel = (id: Lesson['level']) => LEVELS.find((lv) => lv.id === id)?.label ?? id;

export function Discover({ topic, focus, level, onRestart }: Props) {
  const [query, setQuery] = useState('');
  const [showPathPromo, setShowPathPromo] = useState(true);
  const featured = CONTENT[topic.id].featured[level.id];
  const rows = useMemo(() => buildRows(topic, focus, level.id), [topic, focus, level.id]);

  const needle = query.trim().toLowerCase();
  const visibleRows = rows
    .map((row, index) => ({
      ...row,
      tones: TONES[index % TONES.length],
      lessons: needle ? row.lessons.filter((lesson) => lesson.title.toLowerCase().includes(needle)) : row.lessons,
    }))
    .filter((row) => row.lessons.length > 0);

  return (
    <motion.div className="discover" variants={staggerPageVariants} initial="hidden" animate="shown" exit="gone">
      <motion.header className="discover__nav" variants={fadeVariants}>
        <div className="discover__nav-start">
          <button type="button" className="wordmark wordmark--button" onClick={onRestart} title="Start over">
            LearnVector
          </button>
          <nav className="discover__links" aria-label="Primary">
            <button type="button" className="discover__link" aria-current="page">
              Discover
            </button>
            <button type="button" className="discover__link">
              My path
            </button>
            <button type="button" className="discover__link">
              Saved
            </button>
          </nav>
        </div>
        <div className="discover__nav-end">
          <label className="search">
            <SearchIcon className="search__icon" />
            <input
              type="search"
              className="search__input"
              placeholder="Search lessons"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <span className="avatar" aria-label={USER_NAME}>
            {USER_NAME.charAt(0)}
          </span>
        </div>
      </motion.header>

      <main className="discover__content">
        <motion.section className="discover__hero" variants={riseVariants}>
          <h1 className="discover__greeting">{USER_NAME}, what would you like to learn today?</h1>
          <div className="featured">
            <div className="featured__art" aria-hidden="true">
              <span className="featured__dot featured__dot--back" />
              <span className="featured__dot featured__dot--front" />
            </div>
            <div className="featured__info">
              <span className="featured__tag">Recommended for you</span>
              <div className="featured__copy">
                <h2 className="text-heading-1">{featured.title}</h2>
                <p className="text-body-md featured__blurb">{featured.blurb}</p>
              </div>
              <motion.button
                type="button"
                className="featured__cta"
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
              >
                <PlayIcon />
                Start lesson
              </motion.button>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {showPathPromo && (
              <motion.aside
                key="path-promo"
                className="path-promo"
                aria-label="Personalized learning path"
                // Collapse into the hero's 24px gap so the rows below glide up.
                exit={{ opacity: 0, height: 0, marginTop: -24, paddingBlock: 0, borderWidth: 0 }}
                transition={{ ...spring.soft, opacity: { duration: 0.16 } }}
              >
                <span className="path-promo__icon">
                  <PathIcon />
                </span>
                <div className="path-promo__copy">
                  <h2 className="path-promo__title">Get a personalized learning path made for you</h2>
                  <p className="path-promo__body">
                    We’ll plan the steps, match how you learn and stay with you until it clicks.
                  </p>
                </div>
                <motion.button
                  type="button"
                  className="path-promo__cta"
                  whileTap={{ scale: 0.97 }}
                  transition={spring.snappy}
                >
                  Build a path
                </motion.button>
                <button
                  type="button"
                  className="path-promo__close"
                  aria-label="Dismiss"
                  onClick={() => setShowPathPromo(false)}
                >
                  <CloseIcon />
                </button>
              </motion.aside>
            )}
          </AnimatePresence>
        </motion.section>

        {visibleRows.map((row) => (
          <motion.section key={row.id} className="lesson-section" variants={settleVariants}>
            <div className="lesson-section__header">
              <h2 className="text-heading-2">{row.title}</h2>
              <button type="button" className="see-all">
                See all
                <ChevronRightIcon />
              </button>
            </div>
            <div className="lesson-row">
              {row.lessons.map((lesson, i) => (
                <article key={lesson.title} className="lesson">
                  <Thumb tone={row.tones[i % row.tones.length]} shape={i % 4} />
                  <div className="lesson__text">
                    <h3 className="lesson__title">{lesson.title}</h3>
                    <p className="lesson__meta">
                      {levelLabel(lesson.level)} · {lesson.mins} mins
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>
        ))}

        {visibleRows.length === 0 && (
          <p className="discover__empty text-body-md">No lessons match “{query.trim()}”. Try a shorter word.</p>
        )}
      </main>
    </motion.div>
  );
}

function Thumb({ tone, shape }: { tone: { bg: string; dot: string }; shape: number }) {
  const style = { '--thumb-bg': tone.bg, '--thumb-dot': tone.dot } as CSSProperties;
  return (
    <div className="thumb" data-shape={shape} style={style} aria-hidden="true">
      <span className="thumb__dot" />
    </div>
  );
}
