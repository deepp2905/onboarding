# LearnVector · A discovery page that gets to know you

**Prototype:** [onboarding.deeepatel.com](https://onboarding.deeepatel.com)

Three quick questions, then straight into a Discover page shaped by the answers, which keeps learning from what you do on it. The goal: every screen after sign-in should feel like it already knows a little about you, without making you work for it.

## How I used AI tools

1. **Research** references on Mobbin (MCP), and think through design decisions and the user flow with Claude.
2. **Decide the content**: what to ask, and what to show and when.
3. **Build design system primitives** (color, type, spacing) in Paper.
4. **Mock up with AI**, then **iterate by hand** until the design was opinionated and right.
5. **Code it out** from the Paper designs with the Paper MCP and Claude Code.
6. **Audit with skills** for animation, responsiveness and accessibility issues
7. **Sweating the details** to clean up the interactions and polish.

## How I approached the challenge

I started in Paper, using the Mobbin MCP to pull onboarding flows from education and learning products: **Headspace**, **Duolingo**, **Uxcel** and **Codecademy**.

- **Duolingo, Codecademy:** pick a subject → narrow it → self-rate your level
- **Headspace:** one question per screen, generous whitespace.
- **Uxcel:** a summary to review before committing, and a home screen that reflects your answers

![Onboarding references from Mobbin, gathered on the Paper canvas](docs/mobbin-onboarding-references.png)

**Primitives before screens.** I set up the product's color, typography, spacing and radius primitives in LearnVector's style. Every screen and component is built from these, and they map one-to-one to `src/ds/tokens.css`.

![Product color, typography, and spacing and radius primitives in Paper](docs/design-primitives.png)

**Iterate on canvas until it's opinionated.** I mocked up flows in Paper with AI, then reworked them by hand.

![Onboarding and Discover iterations on the Paper canvas](docs/design-iterations.png)


**Why not a chatbot.** It's heavy for gathering three facts, it makes you type (slow on a phone at lunch, like Priya), and it's harder to scan, undo or change. A chat agent can be used later to *build* the personalized path. 

**Nine topics, on purpose.** The brief starts with marketing, but the topic gallery offers nine, each with its own sub-topics, levels and lessons. 

## UX decisions

- **Ask little, then get out of the way.** What you want to learn, what to focus on, how familiar you are. 
- **Personal questions.** Each question builds on your last answer ("What part of *marketing* do you want to focus on?").
- **The learner stays in control.** A summary where each answer can be edited.
- **Every lesson card has a ⋮ menu.** Save for later, Add to my path, Show more like this, Share, Copy link, and Hide. 
- **Explain why, always.** Recommendations say who they were picked for and why.

## Content logic: what shows, when (UX copy)

| Where | What it shows | Driven by |
|---|---|---|
| Greeting | "Dmitry, here's where to start with marketing." (or "here's what's next in…", "let's go deeper into…") | Topic + level |
| Featured lesson | A different lead lesson for beginner, intermediate and advanced | Level |
| Recommended lessons for you | Your focus areas first, then lessons closest to your level | Focus + level |
| Quick 10 minute watches | Short lessons first, for a phone at lunch | Lesson length |
| Themed row | A hand-picked collection ("Build a brand people remember") | Topic |
| Personalized path card | Your picks and level in plain words, dismissible | Focus + level |
| Search, no results | "Nothing for '…'" plus lessons popular with your level | Level |
| Card menu feedback | Toasts confirm each action; Hide thanks you and says what changes | Your actions |

Copy rules: second person, short sentences, the learner's own words reflected back, and no screen without a clear next action.


## Known issues

- No URL state. Refresh restarts onboarding, browser Back leaves the site, and Discover can't be linked.
- Focus rings vanish in high-contrast mode. They're box-shadows, which forced-colors mode removes.
- Menus might break. The lesson menu guesses its height to flip and mobile menu/dialogs don't trap focus.
- No tests. No component previews, screenshot tests or automated accessibility checks.
- Heavy background and blur. The orbs keep large GPU layers alive, and step transitions blur the whole panel.
- No semantic tokens. Components use raw lavender and neutral values, which blocks dark mode.

## With more time I would

- **Make feedback real.** Hide, Show more like this and Save should re-rank the rows, not just confirm.
- **Edit without the detour.** Edit on the summary sends you back to that question, and should return you back to the summary.
- **Edit preferences after onboarding.** Change topic, focus or level from Discover without starting over.
- **Real thumbnails** in place of the abstract lavender art.
- **Remember the learner.** Persist answers and saves across sessions; a refresh currently starts over.
- **More craft and product thinking.** Work out how to get someone from sign-in to a *finished first lesson* as fast as possible.

---

## Appendix: running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

Built with React, TypeScript, [Motion](https://motion.dev) and plain CSS. Design tokens from Paper live in `src/ds/tokens.css`.

```
src/
  ds/            tokens, typography, shared components, motion presets
  onboarding/    flow shell + one component per step, topic data
  discover/      Discover page, lesson menu, content and ranking (buildRows)
```

**Accessibility:** real buttons with `radio` / `checkbox` / `menuitem` roles, arrow-key menus, visible focus rings, a polite live region on step changes, 44px hit targets, Escape closes menus and returns focus, and reduced-motion support throughout.
