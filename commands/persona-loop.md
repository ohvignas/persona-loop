---
description: Run the full persona loop on a web app - persona, journey, real test, critique, score, fix plan - and iterate until every dimension reaches the target or the iteration cap.
argument-hint: <url> [--persona "..."] [--goal "..."] [--max-iterations N] [--target 10] [--lang fr|en] [--no-fix]
---
Load the `persona-loop` skill first and follow its rules (evidence, isolation, budget, safety).

Arguments: `$ARGUMENTS`

## 0. Setup
- Parse: `url` (required; if missing, ask and stop), `--persona` (free-text hint), `--goal` (persona goal), `--max-iterations` (default 3, hard max 10), `--target` (default 10), `--lang`, `--no-fix` (stop after planning, never edit code).
- `RUN=docs/persona-loop/<YYYY-MM-DD>/` in the current project (date from `date +%F`). Templates: `${CLAUDE_PLUGIN_ROOT}/skills/persona-loop/templates/`.
- Check Playwright MCP is available (`mcp__playwright__*`). If not: status `BLOCKED: Playwright MCP missing`, explain `claude mcp add playwright npx @playwright/mcp@latest`, stop.
- If the URL is not a local dev host (localhost, 127.0.0.1, *.localhost, *.test) or a URL the user explicitly gave, confirm with the user before testing it. Ask which test account may be used if the journey needs login; never use real credentials.
- Tell the user the plan and the iteration budget, then proceed.

## 1. Persona (once, revised only if the tester proves it wrong)
Spawn `persona-architect` with: url, hints, project docs paths found (PRD, README, design doc), output `RUN/persona.md`, template path.

## 2. Journey (once, revised when the app structure changes)
Spawn `journey-mapper` with: url, `RUN/persona.md`, goal, output `RUN/journey.md`.
Show the user the persona summary and journey criteria. Continue unless they object.

## 3. Loop, for N = 1..max-iterations
Folder `RUN/iteration-N/`.
a. Spawn `persona-tester` (fresh context, its own browser context) -> `test-report.md`. Never run two browser agents in parallel on the same browser.
b. Spawn `ux-critic` (after the tester has closed its browser) -> `critique.md`.
c. Spawn `scorer` with the previous `scores.md` -> `scores.md`.
d. If every dimension >= target (N/A dimensions listed as untested, not as passed): write the iteration report and go to 4.
e. Spawn `fixer-planner` -> `fix-plan.md`.
f. Unless `--no-fix`: show the plan, items flagged `NEEDS OWNER` are asked to the user. Execute `FIX-n` tasks one implementer subagent per task, sequentially, TDD, following the project's own rules (CLAUDE.md / AGENTS.md). Never modify existing tests. Run the project's test suite; paste the raw output in the iteration report.
g. Write `iteration-report.md` (template). Stop early with status `BLOCKED` if the same finding survives 3 iterations, or if scores did not improve on any dimension for 2 iterations: say what fails, what was tried, the hypothesis.

## 4. Final
Run `/persona-loop:report` logic: write `RUN/summary.md` with the score table per iteration, remaining findings and honest status (`TARGET MET` with evidence, or `TARGET NOT MET` with what blocks). Never claim a score that the scorer did not write.
