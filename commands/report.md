---
description: Write the run summary - scores per iteration, deltas, remaining findings, honest final status.
argument-hint: [--run docs/persona-loop/<date>]
---
Load the `persona-loop` skill. Arguments: `$ARGUMENTS`.
Read every `iteration-*/scores.md`, `test-report.md`, `critique.md`, `iteration-report.md` of the run (latest date folder by default). Write `summary.md` in the run folder from `${CLAUDE_PLUGIN_ROOT}/skills/persona-loop/templates/iteration-report.md` (summary section): score table per iteration and dimension, deltas, findings still open with IDs, owner decisions pending, final status `TARGET MET` / `TARGET NOT MET` / `BLOCKED`. Only copy numbers that exist in the scorer files. Show the user the table and the link to the file.
