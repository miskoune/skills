# @miskoune/skills

Portable agent skills. Each skill is a self-contained folder: a `SKILL.md` with YAML frontmatter plus optional `references/`, `scripts/`, and `assets/`. The format is plain markdown, readable by any AI coding agent that supports skill folders (Claude Code, opencode, custom agents, ...). Nothing here depends on a specific provider.

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

| Skill | What it does |
| --- | --- |
| [code-principles](skills/code-principles/SKILL.md) | Actionable principles for writing, refactoring, and debugging code: naming, functions, error handling, contracts, tests, concurrency. |

## License

MIT
