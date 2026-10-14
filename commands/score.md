---
description: Score the current iteration /10 on the 10 dimensions, each grade backed by evidence (scorer agent).
argument-hint: [--iteration N] [--target 10]
---
Load the `persona-loop` skill. Arguments: `$ARGUMENTS`.
Use the latest iteration folder (or `--iteration N`). Spawn `scorer` with the folder, the previous iteration's `scores.md` if any, the target, template `${CLAUDE_PLUGIN_ROOT}/skills/persona-loop/templates/scores.md`. Relay the table as written by the scorer, unchanged.
