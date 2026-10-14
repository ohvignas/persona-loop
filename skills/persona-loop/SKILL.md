---
name: persona-loop
description: Method, scoring grid, evidence rules and guardrails for the persona-driven UX loop (persona -> journey -> real test in an isolated browser -> critique -> score -> fix plan -> re-test). Use whenever running /persona-loop commands, testing a web app as a persona, critiquing UX with evidence, or scoring an app /10 per dimension.
---
# Persona loop

Real users do not read your code, they try to get a job done with limited patience. This loop makes an AI play a realistic persona **for real** in a browser, critiques what it saw, scores it with evidence, plans fixes, and iterates.

## The loop
1. **Persona** (`persona-architect`): specific human, job-to-be-done, patience budget, language, vocabulary, price they would pay. Sources cited; inventions marked `assumption`.
2. **Journey** (`journey-mapper`): shortest path to the JTBD; pages needed and why; signals expected per step; measurable criteria `J-n`.
3. **Test** (`persona-tester`): plays the persona in its **own browser context**, timestamped timeline, evidence per step, frustrations (blocking/major/minor), misunderstood words, grade /10, "would I pay?".
4. **Critique** (`ux-critic`): design skills, states, feedback, accessibility, mobile 375 px, copy, Lighthouse if available. Findings `UX-n` with evidence.
5. **Score** (`scorer`): 10 dimensions /10, each with evidence, overall = minimum.
6. **Plan** (`fixer-planner`): prioritized `FIX-n` tasks, TDD, sequential when files overlap.
7. **Fix**, then back to 3. Stop at target, at the iteration cap, or honestly `BLOCKED`.

## Scoring grid (/10 each)
| # | Dimension | Typical evidence |
|---|-----------|------------------|
| 1 | Promise clarity | first-screen screenshot; persona can restate it in 5 s |
| 2 | Onboarding / time to value | clock timestamps signup -> first value |
| 3 | Main journey | `J-n` criteria met, clicks counted |
| 4 | Visual UI | screenshots vs design doc |
| 5 | UX / feedback | each interactive element -> URL, DOM or network signal |
| 6 | Accessibility | contrast measured, focus, labels, Lighthouse a11y |
| 7 | Mobile | 375x812 screenshots, no horizontal scroll |
| 8 | Copywriting / i18n | misunderstood words, jargon, mixed languages |
| 9 | Stability / errors | console errors, failed requests, state after reload |
| 10 | Trust / legal | pricing, legal pages, data handling, contact |

Anchors: 10 no finding left · 8 minor only · 6 a major · 4 a blocking · 2 unusable · 0 not testable. Untestable = `N/A (reason)`. Overall = min.

## Evidence rules
- **No grade, no finding, no claim without evidence**: screenshot path, raw network request (method, URL, status), measured value, console line, or state checked after reload.
- Timestamps come from the clock, never estimated. Lighthouse scores come from a real run, or "not run".
- A raise between iterations needs new evidence. Never promise what is not proven; "fixed" means re-tested.
- Statuses: `PROVEN` (evidence attached), `NOT PROVEN` (missing evidence, say what), `BLOCKED` (what fails, what was tried, hypothesis).

## Guardrails
- **One browser context per tester**. Never run two browser agents at the same time on a shared browser: it produced false results (foreign sessions, crossed tabs). Each agent checks tabs at start and closes its own at the end.
- **Budget**: default 3 iterations, max 10. Same finding surviving 3 iterations, or no improvement for 2 -> stop `BLOCKED`.
- **Safety**: ask before any destructive or external action (data deletion, payment, real emails or messages, deploy, force push, migrations). Only test credentials on local dev hosts or test accounts given by the owner; never real passwords or payment data. Testing a third-party site you do not own needs explicit confirmation.
- **Tests**: never modify, skip or weaken existing tests; add new ones. A suspect test is an owner decision.
- **Reality**: no fake data, mocks or placeholders in product code; no invented statistics in reports.
- **Fresh eyes**: the scorer and critic never wrote the fixes they judge.

## Output layout (in the tested project)
```
docs/persona-loop/<YYYY-MM-DD>/
  persona.md  journey.md  summary.md
  iteration-1/ test-report.md critique.md scores.md fix-plan.md iteration-report.md screenshots/
  iteration-2/ ...
```
Templates live in `templates/` next to this file.
