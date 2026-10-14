---
description: Uncompromising UX/UI critique of the journey screens with design skills, accessibility, mobile 375 px and Lighthouse (ux-critic agent).
argument-hint: <url> [--iteration N] [--design-doc path]
---
Load the `persona-loop` skill. Arguments: `$ARGUMENTS`.
Use the latest iteration folder (or `--iteration N`). Spawn `ux-critic` with URL, persona, journey, test report if present, design doc path (`docs/design.md` if it exists), output `critique.md`, template `${CLAUDE_PLUGIN_ROOT}/skills/persona-loop/templates/critique.md`. Make sure no other browser agent is running. Relay counts per severity and top 3 findings.
