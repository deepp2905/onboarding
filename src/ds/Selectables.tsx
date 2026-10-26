import { motion } from 'motion/react';
import { useState, type ReactNode } from 'react';
import { PencilIcon } from './icons';
import { Indicator } from './Indicator';
import { itemVariants, spring } from './motion';

/* ────────────────────────────────────────────────────────────────────────────
 * Selection surfaces used by the onboarding flow. Selection is shown by a
 * background colour fade in CSS, keyed off `data-selected`.
 * ──────────────────────────────────────────────────────────────────────────── */

/* ── OptionTile — 96px topic tile with icon + radio ───────────────────────── */

export interface OptionTileProps {
  icon: ReactNode;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function OptionTile({ icon, label, selected, onSelect }: OptionTileProps) {
  // A release on an unselected tile bounces its icon. Each tap remounts the icon, so the bounce replays from rest.
  const [taps, setTaps] = useState(0);

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      className="tile"
      data-selected={selected}
      onClick={onSelect}
      onTap={() => {
        if (!selected && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          setTaps((n) => n + 1);
        }
      }}
      variants={itemVariants}
      whileTap={{ scale: 0.97 }}
      transition={spring.snappy}
    >
      <span className="tile__top">
        <span key={taps} className="tile__icon" data-bounce={taps > 0}>
          {icon}
        </span>
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
      whileTap={{ scale: 0.97 }}
      transition={spring.snappy}
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
  onSelect: () => void;
}

export function ChoiceCard({ glyph, title, description, selected, onSelect }: ChoiceCardProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      className="choice"
      data-selected={selected}
      onClick={onSelect}
      variants={itemVariants}
      whileTap={{ scale: 0.97 }}
      transition={spring.snappy}
    >
      <span className="choice__top">
        {glyph}
        <Indicator type="radio" checked={selected} />
      </span>
      <span className="choice__text">
        <span className="choice__title text-heading-2">{title}</span>
        <span className="choice__description text-body-sm">{description}</span>
      </span>
    </motion.button>
  );
}

/* ── InfoCard — summary row with an edit shortcut ─────────────────────────── */

export interface InfoCardProps {
  label: string;
  value: string;
  onEdit: () => void;
}

export function InfoCard({ label, value, onEdit }: InfoCardProps) {
  return (
    <motion.div className="info-card" variants={itemVariants}>
      <span className="info-card__label text-label-md">{label}</span>
      <span className="info-card__value text-heading-3">{value}</span>
      <motion.button
        type="button"
        className="info-card__edit"
        onClick={onEdit}
        aria-label={`Edit ${label.toLowerCase()}`}
        whileTap={{ scale: 0.95 }}
        transition={spring.snappy}
      >
        <PencilIcon />
      </motion.button>
    </motion.div>
  );
}
