---
description: Have the persona play the journey for real in its own isolated browser and write a test report with evidence (persona-tester agent).
argument-hint: <url> [--viewport 1440x900,375x812] [--iteration N]
---
Load the `persona-loop` skill. Arguments: `$ARGUMENTS`.
Require `persona.md` and `journey.md` in the latest `docs/persona-loop/<date>/` (missing -> say which command to run, stop). Check Playwright MCP is available. Folder `iteration-N/` (next free N unless given). Ask the user which test account is allowed if login is needed. Spawn `persona-tester` (fresh context, own browser context, no other browser agent running) with URL, persona, journey, viewports, output `iteration-N/test-report.md`, template `${CLAUDE_PLUGIN_ROOT}/skills/persona-loop/templates/test-report.md`. Relay grade, pay verdict, first blocking point.
