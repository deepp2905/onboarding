import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRightIcon, CloseIcon, PathIcon, PlayIcon, SearchIcon, easeOut, itemVariants, pageVariants, riseVariants, settleVariants, spring } from '../ds';
import { LEVELS, USER_NAME, formatInterests, midSentence, type Level, type LevelId, type Topic } from '../onboarding/data';
import { CONTENT, buildRows, type Lesson } from './content';
import { LessonMenu } from './LessonMenu';

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

/**
 * Mobile menu: the sheet unrolls from its top edge, and its items stagger in once
 * it has landed. The clip runs past the sides and bottom so the shadow isn't cut off.
 * Closing retracts the sheet after the items have faded.
 */
const menuSheetVariants: Variants = {
  closed: {
    clipPath: 'inset(0px -24px 100% -24px)',
    y: -12,
    transition: { duration: 0.24, ease: easeOut, delay: 0.06 },
  },
  open: {
    clipPath: 'inset(0px -24px -40px -24px)',
    y: 0,
    transition: { duration: 0.36, ease: easeOut, staggerChildren: 0.035 },
  },
};
/** Reduced motion: the sheet fades in place, with no wipe or travel. */
const menuFadeVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.16, ease: easeOut } },
  open: {
    opacity: 1,
    transition: { duration: 0.2, ease: easeOut, delayChildren: 0.04, staggerChildren: 0.035 },
  },
};
const menuItemVariants: Variants = {
  closed: { opacity: 0, y: 12, scale: 0.985, transition: { duration: 0.16, ease: easeOut } },
  open: itemVariants.center,
};

const levelLabel = (id: Lesson['level']) => LEVELS.find((lv) => lv.id === id)?.label ?? id;

/** Level-aware wording, so recommendations say who they were picked for. */
const LEVEL_COPY: Record<LevelId, { greeting: string; picked: string; pathStart: string }> = {
  beginner: { greeting: 'here’s where to start with', picked: 'beginners', pathStart: 'starting from the basics' },
  intermediate: { greeting: 'here’s what’s next in', picked: 'intermediate learners', pathStart: 'building on what you know' },
  advanced: { greeting: 'let’s go deeper into', picked: 'advanced learners', pathStart: 'going deep on the hard stuff' },
};

export function Discover({ topic, focus, level, onRestart }: Props) {
  const [query, setQuery] = useState('');
  const [showPathPromo, setShowPathPromo] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(() => new Set());
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  // The nav is present immediately. Only content groups join the entrance sequence.
  const contentVariants: Variants = {
    hidden: {},
    shown: { transition: { delayChildren: reduceMotion ? 0 : 0.06, staggerChildren: reduceMotion ? 0 : 0.07 } },
  };
  const featured = CONTENT[topic.id].featured[level.id];
  const rows = useMemo(() => buildRows(topic, focus, level.id), [topic, focus, level.id]);

  const closeMenu = () => setMenuOpen(false);

  const notify = useCallback((message: string) => setToast({ id: Date.now(), message }), []);
  const toggleSave = useCallback(
    (title: string) =>
      setSaved((prev) => {
        const next = new Set(prev);
        if (!next.delete(title)) next.add(title);
        return next;
      }),
    [],
  );
  const cardActions = { saved, onToggleSave: toggleSave, notify };

  // Each toast replaces the last and clears itself.
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // While the overlay is open: Escape closes it and hands focus back to the toggle,
  // widening past the mobile breakpoint closes it, and the page behind can't scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      menuToggleRef.current?.focus();
    };
    const desktop = window.matchMedia('(min-width: 761px)');
    const onBreakpoint = () => desktop.matches && setMenuOpen(false);
    const root = document.documentElement;
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpoint);
    root.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
      root.style.overflow = '';
    };
  }, [menuOpen]);

  const needle = query.trim().toLowerCase();
  const visibleRows = rows
    .map((row, index) => ({
      ...row,
      tones: TONES[index % TONES.length],
      lessons: needle ? row.lessons.filter((lesson) => lesson.title.toLowerCase().includes(needle)) : row.lessons,
    }))
    .filter((row) => row.lessons.length > 0);
  const noResults = needle !== '' && visibleRows.length === 0;
  const copy = LEVEL_COPY[level.id];

  return (
    <motion.div className="discover" variants={pageVariants} initial={false} animate="shown" exit="gone">
      <header className="discover__nav">
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
          <SearchField value={query} onChange={setQuery} />
          <button type="button" className="account">
            <span className="avatar" aria-hidden="true">
              {USER_NAME.charAt(0)}
            </span>
            <span className="account__label">My account</span>
          </button>
        </div>

        {/* Below 760px the links, search and account move into the overlay menu. */}
        <button
          ref={menuToggleRef}
          type="button"
          className="menu-toggle"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? 'mobile-menu' : undefined}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div key="mobile-menu" className="mobile-menu" initial="closed" animate="open" exit="closed">
              <motion.div
                className="mobile-menu__scrim"
                variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
                transition={{ duration: 0.36, ease: easeOut }}
                onClick={closeMenu}
              />
              <motion.div
                id="mobile-menu"
                className="mobile-menu__panel"
                variants={reduceMotion ? menuFadeVariants : menuSheetVariants}
              >
                {/* Enter folds the menu away so the filtered rows are in view. */}
                <motion.div variants={menuItemVariants}>
                  <SearchField value={query} onChange={setQuery} onSubmit={closeMenu} />
                </motion.div>
                <nav className="mobile-menu__links" aria-label="Primary">
                  <motion.button
                    type="button"
                    className="discover__link"
                    aria-current="page"
                    variants={menuItemVariants}
                    onClick={closeMenu}
                  >
                    Discover
                  </motion.button>
                  <motion.button type="button" className="discover__link" variants={menuItemVariants} onClick={closeMenu}>
                    My path
                  </motion.button>
                  <motion.button type="button" className="discover__link" variants={menuItemVariants} onClick={closeMenu}>
                    Saved
                  </motion.button>
                </nav>
                <motion.button
                  type="button"
                  className="account account--row"
                  variants={menuItemVariants}
                  onClick={closeMenu}
                >
                  <span className="avatar" aria-hidden="true">
                    {USER_NAME.charAt(0)}
                  </span>
                  <span className="account__label">My account</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <motion.main className="discover__content" variants={contentVariants} initial="hidden" animate="shown">
        {/* A search with no matches clears the page down to the empty box below. */}
        {!noResults && (
          <section className="discover__hero">
            <motion.div className="discover__intro" variants={riseVariants}>
              <h1 className="discover__greeting">
                {USER_NAME}, {copy.greeting} {topic.phrase}
              </h1>
              <AnimatePresence>
                {showPathPromo && (
                  <motion.aside
                    key="path-promo"
                    className="path-promo"
                    aria-label="Personalized learning path"
                    variants={settleVariants}
                    // Collapse into the hero's 24px gap so the rows below glide up.
                    exit={{ opacity: 0, height: 0, marginTop: -24, paddingBlock: 0, borderWidth: 0 }}
                    transition={{ ...spring.soft, opacity: { duration: 0.16 } }}
                  >
                    <span className="path-promo__icon">
                      <PathIcon />
                    </span>
                    <div className="path-promo__copy">
                      <h2 className="path-promo__title">Get a personalized path in {topic.phrase}</h2>
                      <p className="path-promo__body">
                        Built around {midSentence(formatInterests(topic, focus))}, {copy.pathStart}.
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
              <div className="featured">
                <div className="featured__art" aria-hidden="true">
                  <span className="featured__dot featured__dot--back" />
                  <span className="featured__dot featured__dot--front" />
                </div>
                <div className="featured__info">
                  <span className="featured__tag">Picked for {copy.picked}</span>
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
            </motion.div>
          </section>
        )}

        {visibleRows.map((row) => (
          <motion.section key={row.id} className="lesson-section" variants={settleVariants}>
            <div className="lesson-section__header">
              <h2 className="text-heading-2">{row.title}</h2>
              <button type="button" className="see-all">
                See all
                <ChevronRightIcon />
              </button>
            </div>
            <LessonRow lessons={row.lessons} tones={row.tones} {...cardActions} />
          </motion.section>
        ))}

        {noResults && (
          <>
            <div className="search-empty" role="status">
              <span className="search-empty__icon">
                <SearchIcon />
              </span>
              <div className="search-empty__copy">
                <h2 className="text-heading-2">Nothing found for “{query.trim()}”</h2>
                <p className="text-body-md search-empty__body">Check the spelling or try a broader word.</p>
              </div>
            </div>
            {/* Suggestions reuse the "Recommended" row: their focus areas first, nearest their level. */}
            <section className="lesson-section">
              <div className="lesson-section__header">
                <h2 className="text-heading-2">
                  Recommended in {topic.phrase} for {copy.picked}
                </h2>
              </div>
              <LessonRow lessons={rows[0].lessons} tones={TONES[0]} {...cardActions} />
            </section>
          </>
        )}
      </motion.main>

      {createPortal(
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              className="toast"
              role="status"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: spring.soft }}
              exit={{ opacity: 0, y: 6, transition: { duration: 0.16, ease: easeOut } }}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </motion.div>
  );
}

function SearchField({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit?: () => void }) {
  return (
    <label className="search">
      <SearchIcon className="search__icon" />
      <input
        type="search"
        className="search__input"
        placeholder="Search lessons"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit?.()}
      />
    </label>
  );
}

interface LessonRowProps {
  lessons: Lesson[];
  tones: { bg: string; dot: string }[];
  saved: Set<string>;
  onToggleSave: (title: string) => void;
  notify: (message: string) => void;
}

function LessonRow({ lessons, tones, saved, onToggleSave, notify }: LessonRowProps) {
  return (
    <div className="lesson-row">
      {lessons.map((lesson, i) => (
        <article key={lesson.title} className="lesson">
          <Thumb tone={tones[i % tones.length]} shape={i % 4} />
          <div className="lesson__text">
            <div className="lesson__title-row">
              <h3 className="lesson__title">{lesson.title}</h3>
              <LessonMenu
                lesson={lesson}
                saved={saved.has(lesson.title)}
                onToggleSave={() => onToggleSave(lesson.title)}
                notify={notify}
              />
            </div>
            <p className="lesson__meta">
              {levelLabel(lesson.level)} · {lesson.mins} mins
            </p>
          </div>
        </article>
      ))}
    </div>
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
