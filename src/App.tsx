import { AnimatePresence, MotionConfig } from 'motion/react';
import { useEffect, useState } from 'react';
import { Discover, type Preferences } from './discover/Discover';
import { OnboardingFlow } from './onboarding/OnboardingFlow';
import { LEVELS, getTopic } from './onboarding/data';

const DISCOVER_PATH = '/discover';

/** Used when /discover is opened directly, before onboarding has run. */
const DEFAULT_PREFS: Preferences = {
  topic: getTopic('marketing')!,
  focus: ['content-marketing', 'social-media', 'email-marketing'],
  level: LEVELS[0],
};

export default function App() {
  const [prefs, setPrefs] = useState<Preferences | null>(null);
  const [path, setPath] = useState(window.location.pathname);

  // Browser Back and Forward move between onboarding (/) and Discover (/discover).
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState(null, '', to);
    setPath(to);
  };

  const onComplete = (next: Preferences) => {
    setPrefs(next);
    navigate(DISCOVER_PATH);
  };

  const onRestart = () => {
    setPrefs(null);
    navigate('/');
  };

  return (
    // Honour the OS "reduce motion" setting for every Motion animation in the tree.
    <MotionConfig reducedMotion="user">
      {/* "wait": the outgoing page clears before the next page's entrance starts. */}
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        {path === DISCOVER_PATH ? (
          <Discover key="discover" {...(prefs ?? DEFAULT_PREFS)} onRestart={onRestart} />
        ) : (
          <OnboardingFlow key="onboarding" onComplete={onComplete} />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
