---
description: Build or revise the realistic persona(s) for a web app (persona-architect agent).
argument-hint: <url> [--persona "hints"] [--lang fr|en]
---
Load the `persona-loop` skill. Arguments: `$ARGUMENTS`.
Spawn the `persona-architect` agent with the URL, the hints, the project docs found (PRD, README, design doc), output `docs/persona-loop/<date>/persona.md` (date from `date +%F`) and template `${CLAUDE_PLUGIN_ROOT}/skills/persona-loop/templates/persona.md`. Show the user its summary and open questions.
