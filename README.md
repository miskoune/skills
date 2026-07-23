# @miskoune/skills

Portable agent skills. Each skill is a self-contained folder — `SKILL.md` with YAML frontmatter plus optional `references/`, `scripts/`, and `assets/` — a plain-markdown format readable by any AI coding agent that supports skill folders (Claude Code, opencode, custom agents, ...). Nothing here depends on a specific provider.

## Install

Straight from GitHub, no npm publish needed:

```sh
npx github:miskoune/skills list
npx github:miskoune/skills add clean-code
```

Or, once published to npm:

```sh
npx @miskoune/skills add clean-code
```

By default skills install to `~/.claude/skills`. Other targets:

```sh
npx github:miskoune/skills add clean-code --project        # ./.claude/skills
npx github:miskoune/skills add all --dir ./agent/skills    # anywhere
```

`update` reinstalls (overwrites), `remove` uninstalls. Same target flags apply.

## Skills

| Skill | What it does |
| --- | --- |
| [clean-code](skills/clean-code/SKILL.md) | Actionable distillation of *Clean Code* (Robert C. Martin) for writing, refactoring, and reviewing code — cross-checked against all 17 chapters. |

## Adding a new skill

1. Create `skills/<name>/SKILL.md` with `name` and `description` frontmatter (the description is the trigger — state concrete "use when" scenarios).
2. Put detailed material in `skills/<name>/references/` so agents load it only when needed.
3. Add a row to the table above.

## License

MIT. Skill content is original distillation; book principles are paraphrased, no source text reproduced.
