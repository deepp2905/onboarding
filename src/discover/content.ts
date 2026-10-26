import type { LevelId, Topic } from '../onboarding/data';

export interface Lesson {
  title: string;
  /** Sub-topic label from onboarding/data.ts, used to match the learner's picks. */
  focus: string;
  level: LevelId;
  mins: number;
}

export interface Featured {
  title: string;
  blurb: string;
}

export interface TopicContent {
  /** The lead lesson changes with the learner's level. */
  featured: Record<LevelId, Featured>;
  /** Pool the "Recommended" and "Quick" rows are drawn from. */
  lessons: Lesson[];
  /** A fixed, hand-picked row with its own heading. */
  theme: { title: string; lessons: Lesson[] };
}

const B: LevelId = 'beginner';
const I: LevelId = 'intermediate';
const A: LevelId = 'advanced';

const l = (title: string, focus: string, level: LevelId, mins: number): Lesson => ({ title, focus, level, mins });

export const CONTENT: Record<Topic['id'], TopicContent> = {
  marketing: {
    featured: {
      beginner: {
        title: 'Marketing from zero',
        blurb: 'Learn how people discover, trust and buy, then write your first post that gets noticed.',
      },
      intermediate: {
        title: 'Marketing that compounds',
        blurb: 'Turn scattered posts into a system: one audience, one message, channels that feed each other.',
      },
      advanced: {
        title: 'The full-funnel playbook',
        blurb: 'Model your funnel end to end, find the leak that costs the most, and fix it first.',
      },
    },
    lessons: [
      l('Write a hook in 3 seconds', 'Content marketing', B, 6),
      l('Plan your first content week', 'Content marketing', I, 8),
      l('Pick the right platform', 'Social media', B, 9),
      l('Turn one idea into ten posts', 'Social media', I, 9),
      l('Your first $50 ad budget', 'Paid advertising', B, 7),
      l('Bidding strategies, demystified', 'Paid advertising', A, 12),
      l('Positioning in one sentence', 'Brand strategy', I, 8),
      l('Anatomy of a campaign that works', 'Ad campaigns', B, 10),
      l('A/B test creative without guessing', 'Ad campaigns', A, 11),
      l('Subject lines people open', 'Email marketing', B, 5),
      l('Welcome sequences that convert', 'Email marketing', I, 10),
      l('How search engines read your page', 'Search engine optimization (SEO)', B, 8),
      l('Keyword research in one sitting', 'Search engine optimization (SEO)', I, 14),
      l('Read your post analytics', 'Marketing analytics', I, 12),
      l('Attribution models compared', 'Marketing analytics', A, 13),
    ],
    theme: {
      title: 'Build a brand people remember',
      lessons: [
        l('What a brand really is', 'Brand strategy', B, 5),
        l('Find your brand voice', 'Brand strategy', B, 11),
        l('Stand out from competitors', 'Brand strategy', I, 7),
        l('Create a one-page brand guide', 'Brand strategy', I, 14),
      ],
    },
  },

  finance: {
    featured: {
      beginner: {
        title: 'Money, made simple',
        blurb: "Build a budget you'll actually keep, then make your first confident investing decision.",
      },
      intermediate: {
        title: 'Make your money work harder',
        blurb: 'Go beyond saving: allocate, diversify and automate so your plan runs without you.',
      },
      advanced: {
        title: 'Think like an analyst',
        blurb: 'Value a company from its statements and stress-test the assumptions behind the price.',
      },
    },
    lessons: [
      l('The 50/30/20 budget in practice', 'Personal budgeting', B, 6),
      l("Find money you didn't know you had", 'Personal budgeting', B, 8),
      l('Index funds, explained simply', 'Investing basics', B, 7),
      l('Risk, return and your timeline', 'Investing basics', I, 9),
      l('How a stock price is set', 'Stock markets', B, 8),
      l('Reading a market chart', 'Stock markets', I, 10),
      l('Build a three-statement model', 'Financial modeling', A, 15),
      l('Sensitivity tables that tell a story', 'Financial modeling', A, 11),
      l('Debits and credits without tears', 'Accounting', B, 9),
      l('What a blockchain actually does', 'Crypto & digital assets', B, 7),
      l('Compound interest and your future self', 'Retirement planning', B, 5),
      l('Tax brackets, demystified', 'Taxes', B, 6),
      l('Harvest losses, lower your bill', 'Taxes', A, 9),
    ],
    theme: {
      title: 'Build an emergency fund',
      lessons: [
        l('Why three months matters', 'Personal budgeting', B, 4),
        l('Where to keep your safety net', 'Personal budgeting', B, 6),
        l('Automate your savings', 'Personal budgeting', I, 7),
        l('When to dip in, and when not to', 'Personal budgeting', I, 8),
      ],
    },
  },

  coding: {
    featured: {
      beginner: {
        title: 'Your first web page',
        blurb: 'Write HTML and CSS from a blank file, then put your page online for anyone to visit.',
      },
      intermediate: {
        title: 'Ship a real project',
        blurb: 'Go from idea to deployed app with a clean structure, tests and a workflow you can repeat.',
      },
      advanced: {
        title: 'Systems that scale',
        blurb: 'Design for load, failure and change: the trade-offs senior engineers make every day.',
      },
    },
    lessons: [
      l('How the web loads a page', 'Web development', B, 7),
      l('Layouts with CSS grid', 'Web development', I, 9),
      l('Python in ten lines', 'Python', B, 6),
      l('Write cleaner Python functions', 'Python', I, 8),
      l('Variables, functions and you', 'JavaScript & TypeScript', B, 8),
      l('Types that catch bugs early', 'JavaScript & TypeScript', I, 10),
      l('Your first mobile screen', 'Mobile apps', B, 9),
      l('Big-O in plain English', 'Data structures & algorithms', I, 7),
      l('Graph search, step by step', 'Data structures & algorithms', A, 12),
      l('What an API really is', 'Backend & APIs', B, 6),
      l('Design a REST API people like', 'Backend & APIs', I, 11),
      l('Containers in ten minutes', 'DevOps & cloud', I, 10),
      l('Make a sprite move', 'Game development', B, 8),
    ],
    theme: {
      title: 'Debug like a pro',
      lessons: [
        l('Read an error message', 'Web development', B, 5),
        l('Use the debugger, not print', 'Python', B, 9),
        l('Find bugs with git bisect', 'DevOps & cloud', I, 7),
        l('Write a failing test first', 'JavaScript & TypeScript', I, 10),
      ],
    },
  },

  business: {
    featured: {
      beginner: {
        title: 'Business from the ground up',
        blurb: 'Learn how companies make money, then sketch a simple plan for an idea of your own.',
      },
      intermediate: {
        title: 'Lead with clarity',
        blurb: 'Set priorities, run better meetings and make decisions your team can rally behind.',
      },
      advanced: {
        title: 'Strategy under uncertainty',
        blurb: 'Map the forces shaping your market and place bets that hold up when plans change.',
      },
    },
    lessons: [
      l('Test an idea in a weekend', 'Entrepreneurship', B, 7),
      l('Find your first ten customers', 'Entrepreneurship', I, 9),
      l('Your first one-on-one', 'Leadership', B, 6),
      l('Give feedback that lands', 'Leadership', I, 8),
      l('Write a problem statement', 'Product management', B, 6),
      l('Prioritize with impact and effort', 'Product management', I, 9),
      l('Five forces in five minutes', 'Strategy', I, 5),
      l('Write a strategy memo', 'Strategy', A, 13),
      l('Discovery questions that work', 'Sales', B, 8),
      l('Anchoring, explained', 'Negotiation', I, 7),
      l('Map a process end to end', 'Operations', I, 10),
      l('Read a term sheet', 'Startups & fundraising', A, 12),
    ],
    theme: {
      title: 'Run meetings people want to attend',
      lessons: [
        l('Start with the decision', 'Leadership', B, 4),
        l('Agendas that fit on a card', 'Operations', B, 6),
        l('Facilitate a hard conversation', 'Leadership', I, 9),
        l('Close with owners and dates', 'Operations', I, 5),
      ],
    },
  },

  data: {
    featured: {
      beginner: {
        title: 'Data, from question to answer',
        blurb: 'Clean a real dataset, ask it a good question and share a chart that makes the point.',
      },
      intermediate: {
        title: 'Models you can trust',
        blurb: 'Train, evaluate and explain a model, and know when its numbers are lying to you.',
      },
      advanced: {
        title: 'Inside modern neural nets',
        blurb: 'Attention, embeddings and fine-tuning, from first principles to working code.',
      },
    },
    lessons: [
      l('What a model actually learns', 'Machine learning', B, 7),
      l('Spot overfitting early', 'Machine learning', I, 9),
      l('Ask a better data question', 'Data analysis', B, 6),
      l('Pivot tables for real insight', 'Data analysis', B, 9),
      l('Prompts that land the first time', 'Prompt engineering', B, 6),
      l('Structured outputs from a model', 'Prompt engineering', I, 8),
      l('Your first SELECT', 'SQL & databases', B, 5),
      l('Joins without the headache', 'SQL & databases', I, 10),
      l('Choose the right chart', 'Data visualization', B, 7),
      l('Averages that mislead', 'Statistics', B, 6),
      l('Confidence intervals, intuitively', 'Statistics', I, 11),
      l('Attention, step by step', 'Deep learning', A, 14),
      l('Bias in, bias out', 'AI ethics', B, 8),
    ],
    theme: {
      title: 'Tell stories with data',
      lessons: [
        l('Find the one number that matters', 'Data analysis', B, 5),
        l("Annotate, don't decorate", 'Data visualization', B, 6),
        l('Build a dashboard people open', 'Data visualization', I, 12),
        l('Present findings to non-experts', 'Data analysis', I, 8),
      ],
    },
  },

  writing: {
    featured: {
      beginner: {
        title: 'Write your first story',
        blurb: 'Find an idea worth telling and shape it into a short piece with a clear beginning and end.',
      },
      intermediate: {
        title: 'Find your voice',
        blurb: 'Develop a style that sounds like you, and keep it across every kind of piece you write.',
      },
      advanced: {
        title: 'The craft of revision',
        blurb: 'Restructure, cut and sharpen drafts until every sentence earns its place.',
      },
    },
    lessons: [
      l('Start with a single image', 'Creative writing', B, 5),
      l('Characters who want something', 'Creative writing', I, 9),
      l('Headlines that pull readers in', 'Copywriting', B, 6),
      l('Write a landing page that converts', 'Copywriting', I, 10),
      l('Explain one thing clearly', 'Technical writing', B, 7),
      l('The three-act shape', 'Storytelling', B, 6),
      l('Tension on every page', 'Storytelling', I, 8),
      l('Lead with the news', 'Journalism', B, 7),
      l('Cut the first paragraph', 'Editing', B, 4),
      l('Line edits that sharpen prose', 'Editing', A, 11),
      l('Line breaks with purpose', 'Poetry', I, 6),
      l('Format your first scene', 'Screenwriting', B, 9),
    ],
    theme: {
      title: 'Build a daily writing habit',
      lessons: [
        l('Ten minutes is enough', 'Creative writing', B, 4),
        l('Beat the blank page', 'Creative writing', B, 6),
        l('Keep a notebook that works', 'Storytelling', B, 5),
        l('Finish what you start', 'Editing', I, 8),
      ],
    },
  },

  languages: {
    featured: {
      beginner: {
        title: 'Your first conversation',
        blurb: "Learn the 100 words you'll use most, then hold a short chat with confidence.",
      },
      intermediate: {
        title: 'Speak without translating',
        blurb: 'Start thinking in the language, with everyday phrases and a natural rhythm.',
      },
      advanced: {
        title: 'Sound like a native',
        blurb: 'Master idioms, register and the small sounds that give learners away.',
      },
    },
    lessons: [
      l('Ordering food in Spanish', 'Spanish', B, 6),
      l('Ser vs. estar, finally clear', 'Spanish', I, 8),
      l('French greetings that fit', 'French', B, 5),
      l('Mastering the French R', 'French', I, 7),
      l('Hiragana in a week', 'Japanese', B, 10),
      l('German word order, decoded', 'German', I, 9),
      l('Mandarin tones, by ear', 'Mandarin', B, 8),
      l('Italian for travellers', 'Italian', B, 7),
      l('Read Hangul in an afternoon', 'Korean', B, 9),
      l('Brazilian vs. European Portuguese', 'Portuguese', I, 6),
      l('Portuguese idioms locals use', 'Portuguese', A, 8),
    ],
    theme: {
      title: 'Learn faster, remember longer',
      lessons: [
        l('Spaced repetition, explained', 'Spanish', B, 5),
        l('Shadowing native speakers', 'French', B, 7),
        l('Build a vocab deck that sticks', 'Japanese', I, 9),
        l('Think out loud in a new language', 'German', I, 6),
      ],
    },
  },

  growth: {
    featured: {
      beginner: {
        title: 'Small steps, big change',
        blurb: 'Pick one habit, make it easy to start and track it until it runs on its own.',
      },
      intermediate: {
        title: 'Do the work that matters',
        blurb: 'Protect your focus, plan your week and say no to the things that dilute it.',
      },
      advanced: {
        title: 'Lead yourself first',
        blurb: 'Build the self-awareness and systems that keep you effective under pressure.',
      },
    },
    lessons: [
      l('The two-minute rule', 'Productivity', B, 4),
      l('Deep work blocks that stick', 'Productivity', I, 8),
      l('Calm your nerves before you speak', 'Public speaking', B, 6),
      l('Open a talk with impact', 'Public speaking', I, 9),
      l('Habit stacking, simplified', 'Habits', B, 5),
      l('A five-minute breathing reset', 'Mindfulness', B, 5),
      l('Plan your week on Sunday', 'Time management', B, 7),
      l('Time-box your calendar', 'Time management', I, 8),
      l('Listen to understand', 'Communication', B, 6),
      l('Name the feeling, tame the feeling', 'Emotional intelligence', I, 7),
      l('Map your next career move', 'Career growth', I, 11),
      l('Ask for the raise', 'Career growth', A, 10),
    ],
    theme: {
      title: 'Speak with confidence',
      lessons: [
        l('Find your opening line', 'Public speaking', B, 5),
        l('Slow down, sound sure', 'Public speaking', B, 6),
        l('Handle tough questions', 'Communication', I, 8),
        l('Tell a story in two minutes', 'Communication', I, 7),
      ],
    },
  },

  health: {
    featured: {
      beginner: {
        title: 'Start moving today',
        blurb: 'A simple plan for your first four weeks: short sessions, easy wins and real progress.',
      },
      intermediate: {
        title: 'Train with a plan',
        blurb: 'Structure your week around strength, cardio and recovery so every session counts.',
      },
      advanced: {
        title: 'Peak performance',
        blurb: 'Periodize your training, fuel for output and recover like the pros.',
      },
    },
    lessons: [
      l('Perfect your squat', 'Strength training', B, 7),
      l('Progressive overload, explained', 'Strength training', I, 9),
      l('Your first 5K plan', 'Running', B, 8),
      l('Easy runs, done right', 'Running', I, 6),
      l('Build a balanced plate', 'Nutrition', B, 6),
      l('Protein timing, myth vs. fact', 'Nutrition', I, 8),
      l('Morning flow for beginners', 'Yoga', B, 10),
      l('A wind-down routine that works', 'Sleep', B, 5),
      l('Hips that move freely', 'Mobility', B, 7),
      l('Stress, and what to do with it', 'Mental health', B, 6),
      l('No-equipment full body', 'Home workouts', B, 10),
      l('Build a home HIIT circuit', 'Home workouts', I, 12),
    ],
    theme: {
      title: 'Recover like an athlete',
      lessons: [
        l('Why rest days matter', 'Mobility', B, 4),
        l('Foam rolling basics', 'Mobility', B, 6),
        l('Sleep for muscle growth', 'Sleep', I, 7),
        l('Deload weeks, explained', 'Strength training', A, 8),
      ],
    },
  },

  design: {
    featured: {
      beginner: {
        title: 'Design from first principles',
        blurb: 'Learn how hierarchy, spacing and contrast guide the eye, then redesign a real screen.',
      },
      intermediate: {
        title: 'Design with intent',
        blurb: 'Turn research into decisions, and decisions into interfaces people understand.',
      },
      advanced: {
        title: 'Systems, not screens',
        blurb: 'Build components and tokens that scale across teams, products and platforms.',
      },
    },
    lessons: [
      l('Spacing that breathes', 'UI design', B, 6),
      l('Design a settings screen', 'UI design', I, 10),
      l('Run your first user interview', 'UX research', B, 8),
      l('Synthesize findings fast', 'UX research', I, 9),
      l('Pair two typefaces', 'Typography', B, 6),
      l('Logo or wordmark?', 'Branding & identity', B, 7),
      l('Easing that feels natural', 'Motion design', I, 7),
      l('Choreograph a page transition', 'Motion design', A, 11),
      l('Shapes before details', 'Illustration', B, 8),
      l('Name your tokens well', 'Design systems', I, 8),
      l('Build a palette from one color', 'Color theory', B, 6),
      l('Contrast that passes and pleases', 'Color theory', I, 9),
    ],
    theme: {
      title: 'Sharpen your eye',
      lessons: [
        l('Spot the hierarchy', 'UI design', B, 4),
        l('Critique a screen in five minutes', 'UI design', B, 5),
        l('Align to a grid', 'Typography', I, 7),
        l('Polish the last ten percent', 'UI design', I, 9),
      ],
    },
  },

  science: {
    featured: {
      beginner: {
        title: 'How the world works',
        blurb: 'From atoms to galaxies: the big ideas of science, told through everyday things.',
      },
      intermediate: {
        title: 'Think like a scientist',
        blurb: 'Form a hypothesis, design a test and read the results without fooling yourself.',
      },
      advanced: {
        title: 'Frontiers of discovery',
        blurb: 'Dig into open questions at the edge of physics, biology and the brain.',
      },
    },
    lessons: [
      l("Newton's laws on a bike ride", 'Physics', B, 7),
      l('Energy, conserved', 'Physics', I, 8),
      l('Inside a living cell', 'Biology', B, 8),
      l('Why reactions happen', 'Chemistry', B, 7),
      l('Balancing equations, quickly', 'Chemistry', I, 6),
      l('Read the night sky', 'Astronomy', B, 6),
      l('How we weigh a star', 'Astronomy', A, 11),
      l('How neurons talk', 'Neuroscience', B, 7),
      l('Memory: making and losing it', 'Neuroscience', I, 9),
      l('Plate tectonics in motion', 'Earth science', B, 8),
      l('The greenhouse effect, explained', 'Climate science', B, 6),
      l('Thinking in probabilities', 'Mathematics', I, 10),
    ],
    theme: {
      title: 'Big questions, short answers',
      lessons: [
        l('Why is the sky blue?', 'Physics', B, 3),
        l('What is time?', 'Physics', B, 6),
        l('How did life begin?', 'Biology', I, 8),
        l('Is the universe infinite?', 'Astronomy', I, 7),
      ],
    },
  },

  photography: {
    featured: {
      beginner: {
        title: 'See like a photographer',
        blurb: "Learn to notice light and frame a scene, then take ten photos you're proud of.",
      },
      intermediate: {
        title: 'Shoot with intent',
        blurb: 'Take control of exposure and light so every shot looks the way you imagined.',
      },
      advanced: {
        title: 'Develop your style',
        blurb: "Build a cohesive body of work with a look that's unmistakably yours.",
      },
    },
    lessons: [
      l('Rule of thirds, and when to break it', 'Composition', B, 6),
      l('Leading lines and layers', 'Composition', I, 8),
      l('Golden hour, explained', 'Lighting', B, 5),
      l('Shape light with one lamp', 'Lighting', I, 10),
      l('Put your subject at ease', 'Portraits', B, 7),
      l('Plan a sunrise shoot', 'Landscape', I, 9),
      l('Shoot strangers, kindly', 'Street photography', I, 7),
      l('Edit a photo in five steps', 'Photo editing', B, 8),
      l('Color grading with intent', 'Photo editing', A, 11),
      l('Your first roll of film', 'Film photography', B, 9),
      l('Aperture, shutter and ISO', 'Camera basics', B, 9),
      l('Shoot in manual mode', 'Camera basics', I, 8),
    ],
    theme: {
      title: 'Better photos with your phone',
      lessons: [
        l('Clean your lens, seriously', 'Camera basics', B, 2),
        l('Lock focus and exposure', 'Camera basics', B, 4),
        l('Use portrait mode well', 'Portraits', B, 6),
        l('Edit on the go', 'Photo editing', I, 7),
      ],
    },
  },
};

const LEVEL_ORDER: LevelId[] = ['beginner', 'intermediate', 'advanced'];
const QUICK_MAX_MINS = 10;
const ROW_SIZE = 4;

export interface DiscoverRow {
  id: string;
  title: string;
  lessons: Lesson[];
}

/**
 * Builds the three Discover rows from the learner's picks:
 *  1. Recommended — lessons in their chosen sub-topics first, closest to their level
 *  2. Quick watches — 10 minutes or less, from whatever row 1 didn't use
 *  3. The topic's hand-picked themed row
 */
export function buildRows(topic: Topic, focus: string[], level: LevelId): DiscoverRow[] {
  const content = CONTENT[topic.id];
  const picked = new Set(topic.subtopics.filter((st) => focus.includes(st.id)).map((st) => st.label));
  const target = LEVEL_ORDER.indexOf(level);
  const distance = (lesson: Lesson) => Math.abs(LEVEL_ORDER.indexOf(lesson.level) - target);

  // Stable sort: matches first, then nearest level, then pool order.
  const ranked = [...content.lessons].sort(
    (a, b) => Number(picked.has(b.focus)) - Number(picked.has(a.focus)) || distance(a) - distance(b),
  );
  const recommended = ranked.slice(0, ROW_SIZE);

  const rest = content.lessons.filter((lesson) => !recommended.includes(lesson));
  const quick = [
    ...rest.filter((lesson) => lesson.mins <= QUICK_MAX_MINS),
    ...rest.filter((lesson) => lesson.mins > QUICK_MAX_MINS),
  ].slice(0, ROW_SIZE);

  return [
    { id: 'recommended', title: 'Recommended lessons for you', lessons: recommended },
    { id: 'quick', title: 'Quick 10 minute watches', lessons: quick },
    { id: 'theme', title: content.theme.title, lessons: content.theme.lessons },
  ];
}
