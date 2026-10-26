import type { LevelValue, TopicIconName } from '../ds';

export const USER_NAME = 'Dmitry';

export interface Subtopic {
  id: string;
  label: string;
  /** Shorter wording for the summary sentence, e.g. "Content marketing" → "Content" */
  short?: string;
}

export interface Topic {
  id: TopicIconName;
  label: string;
  /** How the topic reads mid-sentence: "How familiar are you with {phrase}?" */
  phrase: string;
  subtopics: Subtopic[];
}

const s = (label: string, short?: string): Subtopic => ({
  id: label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  label,
  short,
});

export const TOPICS: Topic[] = [
  {
    id: 'marketing',
    label: 'Marketing',
    phrase: 'marketing',
    subtopics: [
      s('Content marketing', 'Content'),
      s('Social media'),
      s('Paid advertising'),
      s('Brand strategy'),
      s('Ad campaigns'),
      s('Email marketing', 'Email'),
      s('Search engine optimization (SEO)', 'SEO'),
      s('Marketing analytics', 'Analytics'),
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    phrase: 'finance',
    subtopics: [
      s('Personal budgeting', 'Budgeting'),
      s('Investing basics', 'Investing'),
      s('Stock markets'),
      s('Financial modeling'),
      s('Accounting'),
      s('Crypto & digital assets', 'Crypto'),
      s('Retirement planning'),
      s('Taxes'),
    ],
  },
  {
    id: 'coding',
    label: 'Coding',
    phrase: 'coding',
    subtopics: [
      s('Web development'),
      s('Python'),
      s('JavaScript & TypeScript'),
      s('Mobile apps'),
      s('Data structures & algorithms', 'Algorithms'),
      s('Backend & APIs'),
      s('DevOps & cloud'),
      s('Game development'),
    ],
  },
  {
    id: 'business',
    label: 'Business',
    phrase: 'business',
    subtopics: [
      s('Entrepreneurship'),
      s('Leadership'),
      s('Product management'),
      s('Strategy'),
      s('Sales'),
      s('Negotiation'),
      s('Operations'),
      s('Startups & fundraising', 'Fundraising'),
    ],
  },
  {
    id: 'data',
    label: 'Data & AI',
    phrase: 'data & AI',
    subtopics: [
      s('Machine learning'),
      s('Data analysis'),
      s('Prompt engineering'),
      s('SQL & databases', 'SQL'),
      s('Data visualization'),
      s('Statistics'),
      s('Deep learning'),
      s('AI ethics'),
    ],
  },
  {
    id: 'writing',
    label: 'Writing',
    phrase: 'writing',
    subtopics: [
      s('Creative writing'),
      s('Copywriting'),
      s('Technical writing'),
      s('Storytelling'),
      s('Journalism'),
      s('Editing'),
      s('Poetry'),
      s('Screenwriting'),
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    phrase: 'languages',
    subtopics: [
      s('Spanish'),
      s('French'),
      s('Japanese'),
      s('German'),
      s('Mandarin'),
      s('Italian'),
      s('Korean'),
      s('Portuguese'),
    ],
  },
  {
    id: 'growth',
    label: 'Personal growth',
    phrase: 'personal growth',
    subtopics: [
      s('Productivity'),
      s('Public speaking'),
      s('Habits'),
      s('Mindfulness'),
      s('Time management'),
      s('Communication'),
      s('Emotional intelligence'),
      s('Career growth'),
    ],
  },
  {
    id: 'health',
    label: 'Health & fitness',
    phrase: 'health & fitness',
    subtopics: [
      s('Strength training'),
      s('Running'),
      s('Nutrition'),
      s('Yoga'),
      s('Sleep'),
      s('Mobility'),
      s('Mental health'),
      s('Home workouts'),
    ],
  },
  {
    id: 'design',
    label: 'Design',
    phrase: 'design',
    subtopics: [
      s('UI design'),
      s('UX research'),
      s('Typography'),
      s('Branding & identity', 'Branding'),
      s('Motion design'),
      s('Illustration'),
      s('Design systems'),
      s('Color theory'),
    ],
  },
  {
    id: 'science',
    label: 'Science',
    phrase: 'science',
    subtopics: [
      s('Physics'),
      s('Biology'),
      s('Chemistry'),
      s('Astronomy'),
      s('Neuroscience'),
      s('Earth science'),
      s('Climate science'),
      s('Mathematics'),
    ],
  },
  {
    id: 'photography',
    label: 'Photography',
    phrase: 'photography',
    subtopics: [
      s('Composition'),
      s('Lighting'),
      s('Portraits'),
      s('Landscape'),
      s('Street photography'),
      s('Photo editing'),
      s('Film photography'),
      s('Camera basics'),
    ],
  },
];

export type LevelId = 'beginner' | 'intermediate' | 'advanced';

export interface Level {
  id: LevelId;
  label: string;
  description: string;
  bars: LevelValue;
}

export const LEVELS: Level[] = [
  { id: 'beginner', label: 'Beginner', description: "I'm new to this", bars: 1 },
  { id: 'intermediate', label: 'Intermediate', description: 'I know the basics', bars: 2 },
  { id: 'advanced', label: 'Advanced', description: 'Jump to the hard stuff', bars: 3 },
];

export const getTopic = (id: string | null) => TOPICS.find((t) => t.id === id) ?? null;
export const getLevel = (id: string | null) => LEVELS.find((l) => l.id === id) ?? null;

/** Lower-case the first letter unless the word is an acronym or proper noun (all caps start, e.g. "SEO", "SQL"). */
export function midSentence(word: string): string {
  if (/^[A-Z]{2,}/.test(word)) return word;
  if (/^(Spanish|French|Japanese|German|Mandarin|Italian|Korean|Portuguese|Python|JavaScript)/.test(word)) return word;
  return word.charAt(0).toLowerCase() + word.slice(1);
}

/**
 * "Content, ad campaigns & social media"
 * More than three picks collapse into "… & 2 more" so the card stays one line.
 */
export function formatInterests(topic: Topic, ids: string[]): string {
  const picked = topic.subtopics.filter((st) => ids.includes(st.id)).map((st) => st.short ?? st.label);
  if (picked.length === 0) return '';
  const words = picked.map((w, i) => (i === 0 ? w : midSentence(w)));
  if (words.length === 1) return words[0];
  if (words.length <= 3) return `${words.slice(0, -1).join(', ')} & ${words[words.length - 1]}`;
  return `${words.slice(0, 2).join(', ')} & ${words.length - 2} more`;
}
