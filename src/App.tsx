import { MotionConfig } from 'motion/react';
import { OnboardingFlow } from './onboarding/OnboardingFlow';

export default function App() {
  return (
    // Honour the OS "reduce motion" setting for every Motion animation in the tree.
    <MotionConfig reducedMotion="user">
      <OnboardingFlow />
    </MotionConfig>
  );
}
