---
name: clean-code
description: Actionable distillation of Clean Code (Robert C. Martin) principles for writing and refactoring code. Use when (1) writing new functions, classes, or modules, (2) refactoring or cleaning up existing code, (3) naming things, structuring functions, or deciding how to handle errors, comments, tests, or system wiring, or (4) the user asks to apply "clean code" principles.
---

# Clean Code

Distilled, actionable principles for producing readable, maintainable code. Apply them as defaults, not dogma: match the conventions of the surrounding codebase first, and deviate when a rule would make the code genuinely worse.

## Core mindset

- Code is read far more often than it is written. Optimize for the reader.
- Working code is not enough. Merely-functional code rots and compounds into project drag; going past "it works" is a professional obligation.
- Clean code emerges through drafts. Write a rough working version, then refine it under tests — no one writes it clean on the first pass.
- Simple design, in priority order: (1) passes all tests, (2) no duplication, (3) expresses intent, (4) minimizes the number of classes and methods. Rule 4 is the counterweight: over-extraction into many tiny classes/methods is its own failure mode.
- Leave code cleaner than found (Boy Scout Rule) — but keep unrelated cleanups out of focused changes unless asked.
- Stop and refactor before the mess compounds: a tangle is cheap to clean immediately, expensive once other code depends on it.
- Duplication is the root of most mess. Before writing new logic, look for an existing implementation to reuse or extract.

## Naming

- Names must reveal intent: `elapsedDays`, not `d`. If a name needs a comment to explain it, the name failed. A long descriptive name beats a short name plus a comment.
- No mental mapping: the reader should never have to translate a name into the concept it stands for. Loop counters `i`/`j` are fine only in tiny scopes.
- Use pronounceable, searchable names; no magic numbers — name them as constants. Scope rule: short names for short scopes, descriptive names for wide scopes.
- Pick one word per concept (don't mix `fetch`/`get`/`retrieve`) and don't pun — never reuse a word for a semantically different operation.
- No cute/joke names; say what you mean. Prefer solution-domain terms (CS, patterns — naming a class `…Decorator` or `…Factory` communicates design) and problem-domain terms when no technical word exists.
- Classes/types: nouns (`WorkoutSession`). Functions: verbs (`saveSession`). Booleans: predicates (`isEmpty`). Names must be unambiguous about behavior — vague `doRename` loses to a name that states the full effect.
- Avoid encodings, prefixes, and noise words (`data`, `info`, `manager`, `helper`); leave interfaces unadorned (no `I` prefix — if one side must be marked, mark the implementation).
- Add context via structure, not prefixes: group loose variables into a named type (`Address`) instead of prefixing; never add gratuitous app/module prefixes to every name.
- Rename fearlessly — the moment a better name appears, take it; tooling makes it cheap.

## Functions

- Small. Blocks inside `if`/`else`/`while` should be one line — usually a call; indentation should rarely exceed two levels. If a function has visually separable "sections", it does more than one thing.
- One thing, one level of abstraction below the name; extract until each function's name fully describes its body.
- Few arguments: 0–2 ideal, 3 is a last resort; more means the arguments want to be an object. A legitimate single-argument function asks about its argument, transforms it and returns the result, or handles an event.
- No selector arguments — boolean flags, enums, or ints that switch behavior announce two functions in one. Split it.
- No hidden side effects: a function named `checkPassword` must not also initialize a session (side effects also create hidden temporal couplings — if order matters, expose it in names or thread each result into the next call). Command–query separation: do something or answer something, not both.
- Avoid output arguments; return the result. Early returns, `break`/`continue` are fine in small functions — clarity beats single-exit.
- Encapsulate complex conditionals in intent-revealing predicates (`shouldArchive(session)`); prefer positive conditionals over negated ones; break dense expressions into explanatory variables.
- A `switch`/type-`if` chain is tolerable only once, buried in a factory that creates polymorphic objects; everywhere else, prefer polymorphism.
- For overloaded constructors, prefer named static factory methods that describe the arguments.

## Comments

- The best comment is the one made unnecessary by better code. Before writing a comment, refactor so it isn't needed.
- Good comments: intent/why, warnings of consequences, amplification of why a trivial-looking line is critical, clarification of values from code you can't change, TODO with context, license pointer at file top, API docs for genuinely public APIs.
- Bad comments: restating the code, commented-out code (delete — version control remembers), journal/byline/changelog entries, banner dividers, closing-brace markers, mandated boilerplate on every function, HTML markup, information about distant code that will drift out of sync, essays where a reference would do.
- A comment must be well-written, accurate, and clearly attached to the code beside it.

## Formatting

- Small files: aim ~200 lines, rarely over 500. Lines ~100–120 characters max.
- Newspaper order: high-level first, detail below; caller above callee. Functions that are variants of one operation belong near each other.
- Blank lines separate concepts; tightly related lines stay dense with no gaps. Declare local variables near the top of their (short) function, loop variables in the loop, instance variables in one conventional place at the top of the class.
- Don't column-align declarations or assignments — if a list is long enough to "need" alignment, the class wants splitting. Never collapse a scope onto one line; make empty loop bodies visible with braces.
- Follow the project's existing formatter/style config; team consistency beats personal preference.

## Objects, data, boundaries

- Choose the style by the expected axis of change: data structures + functions make new *operations* easy; objects + polymorphism make new *types* easy. "Everything is an object" is a myth.
- Hiding data means abstraction, not accessors: reflexive getters/setters hide nothing. Expose operations on the essence of the data, not its representation.
- Objects hide data and expose behavior; data structures expose data and have no behavior. Don't build hybrids (an Active Record is a data structure — keep business rules in separate objects).
- Law of Demeter: avoid `a.getB().getC().doThing()` chains on objects (fine on plain data structures).
- Wrap third-party APIs behind an interface you own; confine even standard-library boundary types (raw dictionaries, etc.) to the class that uses them — don't pass them through public APIs.
- For a dependency that doesn't exist yet or you don't control, code against the interface you wish you had and bridge with an adapter — it's also your testing seam.
- Write learning tests when adopting a library: small tests exercising the API the way you'll use it; re-run them on upgrades to catch breaking changes.

## Error handling

- Write the try/catch(/finally) first — define the failure scope before the happy path, then extract the body so error handling is the function's only concern.
- Use exceptions/typed errors, not return codes or sentinels. Prefer unchecked exceptions where the language offers a choice; checked ones ripple through every signature.
- Define error types by how callers will handle them — one type per handling strategy is usually enough; carry detail in the payload.
- Provide context: the operation, the identifier, the cause. Never swallow caught errors.
- Never return or pass null/nil where an empty collection, optional type, or special-case object works; design collaborators to return well-behaved special-case objects so the caller's happy path has no exceptional branch.

## Classes & systems

- Classes are small in responsibilities, not lines. SRP test: describe the class in ~25 words without "and"/"or"/"but". Can't find a concise name? Too big.
- Member order: constants, then fields, then public methods with each private helper directly below its caller. Keep members private; loosen for a test only as a last resort.
- Open–Closed: add features by extension, not by editing tested code. Trigger to split responsibilities: actually having to open the class to change it — don't split speculatively.
- High cohesion: methods use most of the fields. When a subset of methods shares a subset of state, extract the class hiding inside.
- Separate construction from use: no `if (x == null) x = new …` inside business logic. Wire concrete objects in one place (main/composition root, factories, dependency injection) and hand them in; the app never knows how it was built.
- Grow architecture incrementally: implement today's requirements, defer decisions to the last responsible moment, use the simplest thing that works, adopt frameworks only for demonstrated value. Keep cross-cutting concerns (persistence, logging, security) modular, not smeared through domain logic.

## Concurrency

- Concurrency is a decoupling strategy (what runs vs when), not free performance; adopt it deliberately.
- Keep threading code separate from business logic: plain thread-unaware objects called by a thin thread-aware layer.
- Limit shared mutable state; prefer copies, immutable snapshots, or partitioned data over locks. When locking, guard the smallest possible critical section and centralize multi-call coordination.
- Prefer battle-tested concurrency utilities over hand-rolled locking; design shutdown early — it's a classic deadlock source.
- Never dismiss a one-in-a-million threading failure as a fluke — it's a real bug. Test with more threads than cores, on every target platform, forcing varied interleavings ("not reproducible on rerun" ≠ "not real").

## Tests

- Three Laws of TDD: write no production code without a failing test; write only enough test to fail; write only enough production code to pass.
- Test code must be as clean as production code (same readability bar; efficiency may be relaxed) — making code testable is itself a design force that pushes toward small, decoupled classes.
- Grow a domain-specific testing language: helper functions that read at the level of intent, evolved by refactoring tests, not designed up front.
- One concept per test, minimal asserts, Given-When-Then structure; tests double as documentation by example.
- F.I.R.S.T.: Fast, Independent, Repeatable, Self-validating, Timely.
- Test boundary conditions deliberately; when you find a bug, test that function exhaustively (bugs congregate); use coverage tools to find untested branches; don't skip trivial tests.
- Building and running the full suite must each be one command.

## Workflow

**When writing new code:** apply the rules above as you go — draft it working, then refine under tests before moving on.

**When refactoring:** work under tests. Make small behavior-preserving steps; run tests between steps; expect some steps to be reversed later — refactoring is trial and error.

For expanded guidance and examples on any topic above, read [references/principles.md](references/principles.md).
