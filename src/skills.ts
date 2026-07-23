#!/usr/bin/env node
/*
 * skills — install portable agent skills from this package.
 *
 * A skill is a folder containing SKILL.md (+ optional references/, scripts/,
 * assets/). The format is plain markdown with YAML frontmatter, usable by any
 * agent that reads skill folders (Claude Code, opencode, custom agents, ...).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

const SOURCE = path.join(__dirname, "..", "skills");

const TARGETS = {
  claude: path.join(os.homedir(), ".claude", "skills"),
  project: path.join(process.cwd(), ".claude", "skills"),
} as const;

interface Args {
  names: string[];
  target: string;
  force: boolean;
}

function availableSkills(): string[] {
  return fs
    .readdirSync(SOURCE, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(SOURCE, e.name, "SKILL.md")))
    .map((e) => e.name)
    .sort();
}

function description(name: string): string {
  const text = fs.readFileSync(path.join(SOURCE, name, "SKILL.md"), "utf8");
  const match = text.match(/^description:\s*(.+)$/m);
  return match?.[1]?.trim() ?? "";
}

function parseArgs(argv: string[]): Args {
  const args: Args = { names: [], target: TARGETS.claude, force: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === "--project") args.target = TARGETS.project;
    else if (a === "--dir") {
      const dir = argv[++i];
      if (dir === undefined || dir.startsWith("-")) fail("--dir needs a path");
      args.target = path.resolve(dir);
    }
    else if (a === "--force" || a === "-f") args.force = true;
    else if (a.startsWith("-")) fail(`unknown flag: ${a}`);
    else args.names.push(a);
  }
  return args;
}

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function resolveNames(names: string[]): string[] {
  const all = availableSkills();
  if (names.length === 1 && names[0] === "all") return all;
  for (const n of names) if (!all.includes(n)) fail(`unknown skill "${n}" — run: skills list`);
  if (names.length === 0) fail("no skill named — run: skills list");
  return names;
}

function add(argv: string[]): void {
  const { names, target, force } = parseArgs(argv);
  for (const name of resolveNames(names)) {
    const dest = path.join(target, name);
    if (fs.existsSync(dest) && !force) {
      console.error(`skip: ${dest} already exists (use --force to overwrite)`);
      continue;
    }
    fs.mkdirSync(target, { recursive: true });
    fs.cpSync(path.join(SOURCE, name), dest, { recursive: true, force: true });
    console.log(`installed ${name} -> ${dest}`);
  }
}

function remove(argv: string[]): void {
  const { names, target } = parseArgs(argv);
  for (const name of resolveNames(names)) {
    const dest = path.join(target, name);
    if (!fs.existsSync(dest)) {
      console.error(`skip: ${dest} not found`);
      continue;
    }
    fs.rmSync(dest, { recursive: true });
    console.log(`removed ${dest}`);
  }
}

function list(): void {
  for (const name of availableSkills()) {
    const desc = description(name);
    console.log(`${name}\n  ${desc.length > 120 ? desc.slice(0, 117) + "..." : desc}`);
  }
}

function help(): void {
  console.log(`usage: skills <command> [skill...] [flags]

commands:
  list                     show available skills
  add <skill...|all>       install skill(s)
  update <skill...|all>    reinstall skill(s), overwriting
  remove <skill...|all>    uninstall skill(s)

flags:
  --project     target ./.claude/skills of the current directory
  --dir <path>  target any directory (agent-agnostic)
  --force, -f   overwrite an existing install

default target: ~/.claude/skills

examples:
  npx @miskoune/skills list
  npx @miskoune/skills add clean-code
  npx @miskoune/skills add all --dir ./my-agent/skills`);
}

const [command, ...rest] = process.argv.slice(2);
switch (command) {
  case "list": list(); break;
  case "add": add(rest); break;
  case "update": add([...rest, "--force"]); break;
  case "remove": remove(rest); break;
  case undefined:
  case "help":
  case "--help":
  case "-h": help(); break;
  default: fail(`unknown command: ${command} (run: skills help)`);
}
