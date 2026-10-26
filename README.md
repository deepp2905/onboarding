# LearnVector · Onboarding demo

A four-step onboarding flow built as **one continuous experience**, using React, TypeScript, [Motion](https://motion.dev) (formerly Framer Motion) and plain CSS animations. The design comes from the Paper file **LearnVector**.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

## Source designs (Paper)

| Layer | Node | What it became |
|---|---|---|
| Color primitives | `AH-0` | `src/ds/tokens.css` (color + gradients) |
| Typography primitives | `L8-0` | `src/ds/tokens.css` + `src/ds/typography.css` |
| Spacing & radius primitives | `Q7-0` | `src/ds/tokens.css` (spacing + radius) |
| Step 1: topic gallery | `3YC-0` | `TopicStep.tsx` |
| Step 2: focus chips | `3TN-0` | `FocusStep.tsx` |
| Step 3: experience level | `3WC-0` | `LevelStep.tsx` |
| Step 4: experience ready | `3CD-0` | `ReadyStep.tsx` |
| (added) Celebration + restart | — | `DoneStep.tsx` |

## Structure

```
src/
  ds/                      design-system foundation
    tokens.css             every token from AH-0 / L8-0 / Q7-0 as CSS custom properties
    typography.css         .text-heading-1 … .text-overline utility classes
    components.css         Button, Indicator, OptionTile, Chip, ChoiceCard, InfoCard
    motion.ts              shared springs, easing and step/item variants
    Button.tsx  Indicator.tsx  Selectables.tsx  icons.tsx
  onboarding/
    OnboardingFlow.tsx     persistent shell + step state machine
    StepCounter.tsx        rolling "Step n of 3" overline
    data.ts                topics, sub-topics, levels, summary formatting
    steps/                 one component per screen
    onboarding.css         layout, ambient background, celebration
```

## What makes it feel like one flow

- **Persistent shell.** The header, ambient background and action row never unmount. Only the question swaps.
- **Direction-aware step transitions.** Content slides, fades and un-blurs in the direction you're travelling, and reverses on Back (`stepVariants` + `AnimatePresence mode="popLayout"`).
- **Animated panel height.** `AutoHeight` measures the incoming step and springs to its height, so the buttons glide to their new position instead of jumping.
- **Back button grows in and out.** Back's `flex-grow` animates, so Continue smoothly shares or takes back the row.
- **Shared-layout highlights.** On single-choice steps, the lavender selection background glides between options (`layoutId`).
- **Staggered entrances.** Each step's heading and options cascade in.
- **Micro-interactions.** Spring radio dot, path-drawn checkmarks, CSS "pop" on indicators, bars rising on the level glyph, a nudging arrow on hover.
- **CSS ambient layer.** Blurred brand-gradient orbs drift on long loops, and each step shifts them slightly via the independent `translate` property.
- **Celebration.** Badge spring, check draw, particle burst (Motion) and ripple rings (CSS), then **Start over**.

## Content fixes vs. the mockups

- The step counter now reads 1 → 2 → 3 (every mockup said "Step 3 of 3"), then "All set".
- Removed the duplicate "Social media" chip, fixed "Ad Campains", and added "Marketing analytics" to keep eight options.
- The summary is built from your actual picks (e.g. "Content, social media & ad campaigns"), and sub-topics change with the chosen topic.

## Accessibility

Real `<button>`s with `radio` / `checkbox` roles and `aria-checked`, focus-visible rings from the lavender scale, a polite live region on the step content, and `MotionConfig reducedMotion="user"` plus `prefers-reduced-motion` CSS overrides.
