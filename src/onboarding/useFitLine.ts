import { useLayoutEffect, useRef } from 'react';

/**
 * Keeps a nowrap heading on one line by scaling its font size down until it
 * fits — never up past the size its CSS gives it. The room it can use is the
 * parent's width, or the widest sibling when one deliberately overhangs the panel
 * (the chip cloud and level row do on desktop).
 */
export function useFitLine<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      el.style.fontSize = '';
      const style = getComputedStyle(el);
      // Mobile headings wrap at their CSS size instead of shrinking to fit.
      if (style.whiteSpace !== 'nowrap') return;
      const base = parseFloat(style.fontSize);
      const siblings = Array.from(parent.children, (child) => (child === el ? 0 : (child as HTMLElement).offsetWidth));
      const room = Math.max(parent.clientWidth, ...siblings);
      const natural = el.scrollWidth;
      if (natural > room) el.style.fontSize = `${Math.floor(((base * room) / natural) * 10) / 10}px`;
    };

    fit();
    // Width only: refitting changes the heading's height, which would re-trigger a height-aware observer.
    let lastWidth = parent.clientWidth;
    const observer = new ResizeObserver(() => {
      if (parent.clientWidth === lastWidth) return;
      lastWidth = parent.clientWidth;
      fit();
    });
    observer.observe(parent);
    // The serif loads after first paint and is wider than the fallback.
    document.fonts.ready.then(fit);
    return () => observer.disconnect();
  }, []);

  return ref;
}
