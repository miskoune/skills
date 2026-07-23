# @miskoune/skills

A collection of portable skills for AI coding agents, installable anywhere with a single npx command.

Each skill is a self-contained folder of plain markdown: a `SKILL.md` describing when and how to apply it, plus optional `references/` for deeper material.

Any agent that reads skill folders can use them, whether that is Claude Code, opencode, or your own custom setup. No provider lock-in.

## Install

```sh
npx @miskoune/skills list
npx @miskoune/skills add code-principles
```

By default skills install to `~/.claude/skills`. Other targets:

```sh
npx @miskoune/skills add code-principles --project   # ./.claude/skills
npx @miskoune/skills add all --dir ./agent/skills    # anywhere
```

`update` reinstalls (overwrites), `remove` uninstalls. Same target flags apply.

## Skills

| Skill                                              | What it does                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------------ |
| [code-principles](skills/code-principles/SKILL.md) | Actionable clean code principles for writing, refactoring, and debugging code. |

## License

MIT
