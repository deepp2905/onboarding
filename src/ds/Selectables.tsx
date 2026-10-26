import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { Indicator } from './Indicator';
import { itemVariants, spring } from './motion';

/* ────────────────────────────────────────────────────────────────────────────
 * Selection surfaces used by the onboarding flow.
 *
 * Single-choice surfaces (OptionTile, ChoiceCard) take a `highlightId`. The
 * selected one renders a background with that layoutId, so when the choice
 * changes the highlight glides from the old option to the new one.
 * ──────────────────────────────────────────────────────────────────────────── */

interface HighlightProps {
  layoutId: string;
  className: string;
}

function Highlight({ layoutId, className }: HighlightProps) {
  return <motion.span layoutId={layoutId} className={className} transition={spring.glide} aria-hidden="true" />;
}

/* ── OptionTile — 96px topic tile with icon + radio ───────────────────────── */

export interface OptionTileProps {
  icon: ReactNode;
  label: string;
  selected: boolean;
  highlightId: string;
  onSelect: () => void;
}

export function OptionTile({ icon, label, selected, highlightId, onSelect }: OptionTileProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      className="tile"
      data-selected={selected}
      onClick={onSelect}
      variants={itemVariants}
      whileTap={{ scale: 0.97 }}
    >
      {selected && <Highlight layoutId={highlightId} className="tile__highlight" />}
      <span className="tile__top">
        <span className="tile__icon">{icon}</span>
        <Indicator type="radio" checked={selected} />
      </span>
      <span className="tile__label">{label}</span>
    </motion.button>
  );
}

/* ── Chip — pill toggle with a check ──────────────────────────────────────── */

export interface ChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function Chip({ label, selected, onToggle }: ChipProps) {
  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={selected}
      className="chip"
      data-selected={selected}
      onClick={onToggle}
      variants={itemVariants}
      whileTap={{ scale: 0.96 }}
    >
      <span className="chip__label">{label}</span>
      <Indicator type="check" checked={selected} />
    </motion.button>
  );
}

/* ── ChoiceCard — larger card with glyph, serif title and description ───── */

export interface ChoiceCardProps {
  glyph: ReactNode;
  title: string;
  description: string;
  selected: boolean;
  highlightId: string;
  onSelect: () => void;
}

export function ChoiceCard({ glyph, title, description, selected, highlightId, onSelect }: ChoiceCardProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      className="choice"
      data-selected={selected}
      onClick={onSelect}
      variants={itemVariants}
      whileTap={{ scale: 0.98 }}
    >
      {selected && <Highlight layoutId={highlightId} className="choice__highlight" />}
      <span className="choice__top">
        {glyph}
        <Indicator type="check" checked={selected} />
      </span>
      <span className="choice__text">
        <span className="choice__title text-heading-2">{title}</span>
        <span className="choice__description text-body-sm">{description}</span>
      </span>
    </motion.button>
  );
}

/* ── InfoCard — read-only summary row ─────────────────────────────────────── */

export interface InfoCardProps {
  label: string;
  value: string;
}

export function InfoCard({ label, value }: InfoCardProps) {
  return (
    <motion.div className="info-card" variants={itemVariants}>
      <span className="info-card__label text-label-md">{label}</span>
      <span className="info-card__value text-heading-3">{value}</span>
    </motion.div>
  );
}
