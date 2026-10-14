---
description: Map the target customer journey for the current persona (journey-mapper agent).
argument-hint: <url> [--goal "..."] [--persona-file path]
---
Load the `persona-loop` skill. Arguments: `$ARGUMENTS`.
Find the persona file (`--persona-file` or the latest `docs/persona-loop/*/persona.md`; none -> tell the user to run `/persona-loop:persona` first and stop). Spawn `journey-mapper` with URL, persona, goal, output `journey.md` next to the persona, template `${CLAUDE_PLUGIN_ROOT}/skills/persona-loop/templates/journey.md`. Show the steps, gaps and criteria.
