# @miskoune/skills

Portable agent skills. Each skill is a self-contained folder — `SKILL.md` with YAML frontmatter plus optional `references/`, `scripts/`, and `assets/` — a plain-markdown format readable by any AI coding agent that supports skill folders (Claude Code, opencode, custom agents, ...). Nothing here depends on a specific provider.

## Install

```sh
npx @miskoune/skills list
npx @miskoune/skills add clean-code
```

By default skills install to `~/.claude/skills`. Other targets:

```sh
npx @miskoune/skills add clean-code --project        # ./.claude/skills
npx @miskoune/skills add all --dir ./agent/skills    # anywhere
```

`update` reinstalls (overwrites), `remove` uninstalls. Same target flags apply.

## Skills

| Skill | What it does |
| --- | --- |
| [clean-code](skills/clean-code/SKILL.md) | Actionable distillation of *Clean Code* (Robert C. Martin) for writing, refactoring, and reviewing code — cross-checked against all 17 chapters. |

## License

MIT
