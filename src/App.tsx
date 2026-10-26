import { AnimatePresence, MotionConfig } from 'motion/react';
import { useState } from 'react';
import { Discover, type Preferences } from './discover/Discover';
import { OnboardingFlow } from './onboarding/OnboardingFlow';

export default function App() {
  const [prefs, setPrefs] = useState<Preferences | null>(null);

  return (
    // Honour the OS "reduce motion" setting for every Motion animation in the tree.
    <MotionConfig reducedMotion="user">
      {/* "wait": the outgoing page clears before the next page's entrance starts. */}
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        {prefs ? (
          <Discover key="discover" {...prefs} onRestart={() => setPrefs(null)} />
        ) : (
          <OnboardingFlow key="onboarding" onComplete={setPrefs} />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
