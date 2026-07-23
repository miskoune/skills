# AGENTS.md

Guidance for AI coding agents (any LLM/tool) working in this repository.

## What this repo is

`@miskoune/skills`: a collection of portable agent skills plus a small npx CLI that installs them. A skill is a self-contained folder of plain markdown (with YAML frontmatter), readable by any AI agent that supports skill folders (Claude Code, opencode, custom agents, ...). Nothing in a skill may depend on a specific provider, model, or vendor tool.

## Layout

```
skills/<name>/          One folder per skill (this is the product)
  SKILL.md              Required. YAML frontmatter + markdown body
  references/           Optional deep-dive docs, loaded on demand
  scripts/              Optional executable helpers
  assets/               Optional templates/files used in output
src/skills.ts           The installer CLI (list/add/update/remove)
dist/                   Build output, never edit by hand
README.md               Includes a table of available skills
```

The CLI auto-discovers skills: any directory under `skills/` containing a `SKILL.md` is published. There is no manifest or registry file to update.

## Creating a new skill

1. Create `skills/<name>/SKILL.md`. The name is lowercase kebab-case and must match the folder name.
2. Frontmatter is exactly two fields:

   ```yaml
   ---
   name: my-skill
   description: What it does and when to use it, written in third person with concrete triggers ("Use when (1) ..., (2) ...").
   ---
   ```

   The description is the only thing an agent sees before deciding to load the skill, so make it carry both *what* and *when*. Keep it on one line (the CLI extracts it with a single-line regex).
3. Write the body as instructions to an agent, not documentation for humans: imperative voice, actionable defaults, no filler. Keep `SKILL.md` focused (aim well under ~500 lines); move detailed material into `references/*.md` and link to it from the body so it loads only when needed.
4. Stay LLM-agnostic: no references to a specific model, vendor CLI, provider-only tool names, or provider-specific file paths inside the skill content.
5. Add a row to the "Skills" table in `README.md` (name linked to its `SKILL.md`, one-line summary).

Updating an existing skill: edit its folder directly; keep the frontmatter description in sync with the body's scope.

## Checks before committing

- `npm run build` must pass (TypeScript, strict). Only needed when `src/` changes; skills are plain markdown and are not compiled, but the build is cheap, so run it when in doubt.
- Sanity-check discovery when adding/renaming a skill: `npx tsx src/skills.ts list` (or build and run `node dist/skills.js list`) should show the new skill with its description.
- Frontmatter must parse: `name` and `description` present, `description` on a single line.

## Commits and releases

- Conventional Commits are enforced by commitlint (`commitlint.config.mts`) via a husky hook. Use types like `feat:`, `fix:`, `docs:`, `chore:`, `build:`, `refactor:`.
- A new or materially improved skill is a `feat:` (it changes what the package ships).
- Releases are fully automated with semantic-release on `main`. Never bump `version` in `package.json` or edit `CHANGELOG.md` by hand.

## Conventions

- Keep the CLI (`src/skills.ts`) small and dependency-free (Node built-ins only, Node >= 18).
- Skills are self-contained: a skill folder must work when copied anywhere on its own, with no cross-skill imports or repo-relative paths.
- Prose style throughout: concise, direct, no marketing language, and no em-dashes.
