import type { ReactNode, SVGProps } from 'react';

/** Icons are lifted from the Paper file and drawn with currentColor so CSS can theme them. */

type IconProps = SVGProps<SVGSVGElement>;

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function TopicSvg({ children, ...props }: IconProps) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" {...props}>
      <g {...strokeProps}>{children}</g>
    </svg>
  );
}

export type TopicIconName =
  | 'marketing'
  | 'finance'
  | 'coding'
  | 'business'
  | 'data'
  | 'writing'
  | 'languages'
  | 'growth'
  | 'health'
  | 'design'
  | 'science'
  | 'photography';

const topicPaths: Record<TopicIconName, ReactNode> = {
  marketing: (
    <>
      <path d="M5 13L12 13L27 6L27 24L12 18L5 18L5 13Z" />
      <path d="M11 18L14 27H9L7 18M27 11L31 9M27 19L31 21" />
    </>
  ),
  finance: <path d="M5 29H30M8 25V18M16 25V13M24 25V7M6 13L13 8L18 11L29 3" />,
  coding: <path d="M11 9L3 17L11 25M25 9L33 17L25 25M21 5L15 29" />,
  business: (
    <>
      <rect x="4" y="11" width="28" height="20" rx="3" />
      <path d="M12 11V6H24V11M4 19C12 24 24 24 32 19M18 20V25" />
    </>
  ),
  data: (
    <>
      <circle cx="18" cy="18" r="6" />
      <circle cx="5" cy="6" r="3" />
      <circle cx="30" cy="7" r="3" />
      <circle cx="29" cy="30" r="3" />
      <circle cx="6" cy="29" r="3" />
      <path d="M8 9L14 14M23 14L28 9M22 23L27 28M14 22L8 27" />
    </>
  ),
  writing: (
    <>
      <path d="M7 28L9 21L25 5L31 11L15 27L7 28Z" />
      <path d="M21 9L27 15M6 33H30" />
    </>
  ),
  languages: (
    <>
      <path d="M4 5H25V22H14L7 29V22H4V5Z" />
      <path d="M12 11H21M16 8V11M13 11C13 15 17 18 21 19M20 11C20 15 16 18 12 19M26 26H32M29 22L25 32M29 22L33 32" />
    </>
  ),
  growth: <path d="M18 32V17M18 23C6 25 4 17 5 12C12 11 18 14 18 23M18 18C18 8 25 4 32 5C33 12 28 19 18 18" />,
  health: (
    <>
      <path d="M18 30C-5 17 6 2 18 11C30 2 41 17 18 30Z" />
      <path d="M6 18H13L16 13L20 23L23 18H30" />
    </>
  ),
  design: (
    <>
      <rect x="5" y="5" width="11" height="11" rx="2" />
      <circle cx="26" cy="10.5" r="5.5" />
      <path d="M5 30L11 20L17 30H5Z" />
      <rect x="21" y="21" width="11" height="11" rx="5.5" />
    </>
  ),
  science: (
    <>
      <path d="M13 4H23M15 4V14L6 29C5 31 7 33 9 33H27C29 33 31 31 30 29L21 14V4M10 24H26" />
      <circle cx="17" cy="28" r="1" />
      <circle cx="22" cy="20" r="1" />
    </>
  ),
  photography: (
    <>
      <path d="M4 10H11L14 6H22L25 10H32V30H4V10Z" />
      <circle cx="18" cy="20" r="7" />
      <circle cx="28" cy="14" r="1" />
    </>
  ),
};

export function TopicIcon({ name, ...props }: IconProps & { name: TopicIconName }) {
  return <TopicSvg {...props}>{topicPaths[name]}</TopicSvg>;
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 28.8 28.8" aria-hidden="true" {...props}>
      <path
        d="M6 14.4H22.8M15.6 7.2L22.8 14.4 15.6 21.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type LevelValue = 1 | 2 | 3;

/**
 * Signal-strength glyph used by the experience cards.
 * `level` bars are "filled"; the rest are muted. Colors come from CSS custom
 * properties on the parent so the selected state can recolor them.
 */
export function LevelBarsIcon({ level, ...props }: IconProps & { level: LevelValue }) {
  const bars = [
    { x: 11, y: 23, h: 7 },
    { x: 18, y: 17, h: 13 },
    { x: 25, y: 11, h: 19 },
  ];
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className="level-bars" {...props}>
      <rect width="40" height="40" rx="12" className="level-bars__bg" />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width="5"
          height={b.h}
          rx="1.5"
          className="level-bars__bar"
          data-filled={i < level}
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </svg>
  );
}

/* ── Discover ─────────────────────────────────────────────────────────────── */

export function SearchIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="10.5" cy="10.5" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.5 14.5L18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" {...props}>
      <path
        d="M5 3L9 7 5 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" {...props}>
      <path d="M3 1.5L12 7 3 12.5Z" fill="currentColor" />
    </svg>
  );
}

export function PathIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <circle cx="6" cy="18" r="2.25" />
        <circle cx="18" cy="6" r="2.25" />
        <path d="M8.25 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.75" />
      </g>
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Lesson card menu (24px grid, drawn at 18px) ─────────────────────────── */

function MenuSvg({ children, ...props }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.75}>
        {children}
      </g>
    </svg>
  );
}

export function MoreIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <g fill="currentColor">
        <circle cx="10" cy="4.5" r="1.5" />
        <circle cx="10" cy="10" r="1.5" />
        <circle cx="10" cy="15.5" r="1.5" />
      </g>
    </svg>
  );
}

export function BookmarkIcon({ filled, ...props }: IconProps & { filled?: boolean }) {
  return (
    <MenuSvg {...props}>
      <path d="M6.5 4.5h11v15l-5.5-3.75L6.5 19.5z" fill={filled ? 'currentColor' : 'none'} />
    </MenuSvg>
  );
}

export function PlusCircleIcon(props: IconProps) {
  return (
    <MenuSvg {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8.5v7M8.5 12h7" />
    </MenuSvg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <MenuSvg {...props}>
      <path d="M12 4l1.9 5.1L19 11l-5.1 1.9L12 18l-1.9-5.1L5 11l5.1-1.9z" />
    </MenuSvg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <MenuSvg {...props}>
      <path d="M12 14.5V4M8 7.5L12 4l4 3.5" />
      <path d="M8.5 10.5H7a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 7 19.5h10a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5h-1.5" />
    </MenuSvg>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <MenuSvg {...props}>
      <path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5l-1 1" />
      <path d="M13.5 10.5a3.5 3.5 0 0 0-5 0L6 13a3.5 3.5 0 0 0 5 5l1-1" />
    </MenuSvg>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <MenuSvg {...props}>
      <path d="M4 4l16 16" />
      <path d="M9.9 6.2A8.9 8.9 0 0 1 12 6c5 0 8 6 8 6a14.6 14.6 0 0 1-2.4 3.2M6.6 7.6C4.9 9 4 12 4 12s3 6 8 6a8 8 0 0 0 3.4-.8" />
      <path d="M10 10.1a2.5 2.5 0 0 0 3.9 3.9" />
    </MenuSvg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <MenuSvg {...props}>
      <path d="M5.5 12.5l4 4 9-9" />
    </MenuSvg>
  );
}
