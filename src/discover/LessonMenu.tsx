import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  BookmarkIcon,
  CloseIcon,
  EyeOffIcon,
  LinkIcon,
  MoreIcon,
  PlusCircleIcon,
  ShareIcon,
  SparkleIcon,
  easeOut,
} from '../ds';
import type { Lesson } from './content';

interface Props {
  lesson: Lesson;
  saved: boolean;
  onToggleSave: () => void;
  /** Shows a short confirmation toast. */
  notify: (message: string) => void;
}

type Panel = 'menu' | 'hide';

const HIDE_REASONS = ['Too advanced', 'Not relevant to me', 'I already know this'];
const GAP = 6;

const lessonUrl = (lesson: Lesson) =>
  `https://learnvector.app/lessons/${lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

/**
 * The ⋮ button beside a lesson title and the popover it opens. The popover is
 * portalled and fixed-positioned so the mobile carousel's overflow can't clip it.
 * Hide doesn't remove the card yet: it asks why, then thanks the learner with a toast.
 */
export function LessonMenu({ lesson, saved, onToggleSave, notify }: Props) {
  const [panel, setPanel] = useState<Panel | null>(null);
  const [anchor, setAnchor] = useState<{ top?: number; bottom?: number; right: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const close = (refocus = true) => {
    setPanel(null);
    if (refocus) triggerRef.current?.focus();
  };

  const open = () => {
    const rect = triggerRef.current!.getBoundingClientRect();
    const right = window.innerWidth - rect.right;
    // Flip above the button when the menu wouldn't fit below it.
    const fitsBelow = rect.bottom + GAP + 300 < window.innerHeight;
    setAnchor(fitsBelow ? { top: rect.bottom + GAP, right } : { bottom: window.innerHeight - rect.top + GAP, right });
    setPanel('menu');
  };

  // While open: Escape closes, a click elsewhere closes, and any scroll or resize
  // closes rather than leaving the popover floating away from its card.
  useEffect(() => {
    if (!panel) return;
    const onKeyDown = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && close();
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (popoverRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      close(false);
    };
    const onMove = () => close(false);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('scroll', onMove, true);
    window.addEventListener('resize', onMove);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onMove, true);
      window.removeEventListener('resize', onMove);
    };
  }, [panel]);

  // Move focus into each panel as it appears.
  useLayoutEffect(() => {
    if (panel) popoverRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
  }, [panel]);

  const run = (action: () => void) => () => {
    action();
    close();
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(lessonUrl(lesson)).catch(() => {});
    notify('Link copied');
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: lesson.title, url: lessonUrl(lesson) }).catch(() => {});
    } else {
      copyLink();
    }
  };

  // Arrow keys move between items, Home/End jump to the ends.
  const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    const index = items.indexOf(document.activeElement as HTMLElement);
    const next =
      e.key === 'ArrowDown' ? (index + 1) % items.length
      : e.key === 'ArrowUp' ? (index - 1 + items.length) % items.length
      : e.key === 'Home' ? 0
      : e.key === 'End' ? items.length - 1
      : null;
    if (next === null) return;
    e.preventDefault();
    items[next].focus();
  };

  const above = anchor?.bottom !== undefined;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="lesson__more"
        aria-label={`More options for ${lesson.title}`}
        aria-haspopup="menu"
        aria-expanded={panel !== null}
        onClick={() => (panel ? close(false) : open())}
      >
        <MoreIcon />
      </button>

      {createPortal(
        <AnimatePresence>
          {panel && anchor && (
            <motion.div
              ref={popoverRef}
              className="popover"
              data-panel={panel}
              style={{ ...anchor, transformOrigin: above ? 'bottom right' : 'top right' }}
              initial={{ opacity: 0, scale: 0.96, y: above ? 4 : -4 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.16, ease: easeOut } }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12, ease: easeOut } }}
            >
              {panel === 'menu' && (
                <div role="menu" aria-label={`Options for ${lesson.title}`} onKeyDown={onMenuKeyDown}>
                  <MenuItem icon={<BookmarkIcon filled={saved} />} autoFocus onSelect={run(() => {
                    onToggleSave();
                    notify(saved ? 'Removed from saved' : 'Saved for later');
                  })}>
                    {saved ? 'Remove from saved' : 'Save for later'}
                  </MenuItem>
                  <MenuItem icon={<PlusCircleIcon />} onSelect={run(() => notify('Added to your path'))}>
                    Add to my path
                  </MenuItem>
                  <MenuItem icon={<SparkleIcon />} onSelect={run(() => notify('Got it. We’ll show more like this'))}>
                    Show more like this
                  </MenuItem>
                  <div className="popover__divider" role="separator" />
                  <MenuItem icon={<ShareIcon />} onSelect={run(share)}>
                    Share…
                  </MenuItem>
                  <MenuItem icon={<LinkIcon />} onSelect={run(copyLink)}>
                    Copy link
                  </MenuItem>
                  <div className="popover__divider" role="separator" />
                  <MenuItem icon={<EyeOffIcon />} onSelect={() => setPanel('hide')}>
                    Hide lesson
                  </MenuItem>
                </div>
              )}

              {panel === 'hide' && (
                <motion.div
                  className="why-hide"
                  role="dialog"
                  aria-labelledby="why-hide-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.16, ease: easeOut } }}
                >
                  <div className="why-hide__header">
                    <h4 id="why-hide-title" className="why-hide__title">
                      Why hide this?
                    </h4>
                    <button type="button" className="why-hide__close" aria-label="Close" onClick={() => close()}>
                      <CloseIcon />
                    </button>
                  </div>
                  <p className="why-hide__body">Your answer tunes what we recommend next.</p>
                  <div className="why-hide__reasons">
                    {HIDE_REASONS.map((reason, i) => (
                      <button
                        key={reason}
                        type="button"
                        className="why-hide__reason"
                        data-autofocus={i === 0 ? '' : undefined}
                        onClick={run(() => notify('Thanks. We’ll show fewer lessons like this'))}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function MenuItem({
  icon,
  autoFocus,
  onSelect,
  children,
}: {
  icon: ReactNode;
  autoFocus?: boolean;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className="popover__item"
      data-autofocus={autoFocus ? '' : undefined}
      onClick={onSelect}
    >
      <span className="popover__icon">{icon}</span>
      {children}
    </button>
  );
}
