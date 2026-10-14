# Contributing

Thanks for helping! persona-loop is a Claude Code plugin made of Markdown agents, commands, a skill and templates.

1. Fork, create a branch.
2. Edit files in `agents/`, `commands/`, `skills/persona-loop/`.
3. Run `node scripts/validate.mjs .` and `claude plugin validate .`.
4. Try your change on a real web app with `claude --plugin-dir .` and attach evidence from the run.
5. Update `CHANGELOG.md`, open a pull request.

Principles that must not regress: evidence for every grade, one isolated browser per tester, no fake numbers, ask before destructive or external actions, never touch the user's existing tests.
