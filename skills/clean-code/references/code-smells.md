# Code Smells & Heuristics Checklist

Review checklist distilled from Clean Code's complete smells-and-heuristics catalog (chapter 17 codes in brackets) plus smells from earlier chapters. For each hit, report: location (`file:line`), why it hurts, and a concrete fix.

## Contents
- [Comments](#comments)
- [Environment](#environment)
- [Functions](#functions)
- [General](#general)
- [Names](#names)
- [Tests](#tests)

## Comments

- **Inappropriate information** [C1] — change history, author/ticket metadata, data that belongs in version control or the tracker. Fix: delete; keep comments technical.
- **Obsolete comment** [C2] — no longer matches the code. Fix: update or delete; stale comments actively mislead. Same for comments that were inaccurate from the start.
- **Redundant comment** [C3] — restates what the code already says. Fix: delete.
- **Poorly written comment** [C4] — rambling, sloppy, stating the obvious. Fix: if it's worth writing, write it briefly and well.
- **Commented-out code** [C5] — Fix: delete; version control preserves history.
- **Comment as deodorant** — a comment explaining confusing code. Fix: refactor so the comment is unnecessary.
- **Nonlocal information** — describes distant code or system-wide defaults it doesn't control. Fix: comment only the code beside it.
- **Too much information** — historical/spec essays. Fix: cite the reference instead.
- **Inobvious connection** — reader can't tell which code the comment refers to. Fix: make the link explicit or delete.
- **Banner/position markers, bylines, mandated boilerplate** — Fix: delete; rely on structure, version control, and good names.

## Environment

- **Build requires more than one step** [E1] — Fix: one trivial command checks out and builds the system.
- **Tests require more than one step** [E2] — Fix: one command/click runs the full suite.

## Functions

- **Too many arguments** [F1] — more than 3 is a smell (variadics count as one list, but the total still obeys the limit). Fix: parameter object, or split the function.
- **Output argument** [F2] — mutating a parameter instead of returning. Fix: return the value; if state must change, change the receiver's state.
- **Selector argument** [F3] — a boolean, enum, or int that switches behavior. Fix: one function per behavior.
- **Dead function** [F4] — never called. Fix: delete.
- **Doing more than one thing** — mixed abstraction levels; visually separable "sections" inside the body. Fix: extract until each function does one thing [G30], with every statement one level below the name [G34].
- **Hidden side effect** — name promises a query, body mutates state. Fix: rename honestly or separate command from query [N7].
- **Deep nesting** — more than one or two indent levels. Fix: extract blocks into named functions; use early returns/guard clauses.

## General

- **Multiple languages in one file** [G1] — Fix: minimize; ideally one language per file.
- **Obvious behavior unimplemented** [G2] — the function doesn't do what its name leads a reader to expect (least surprise). Fix: implement the expected behavior or rename.
- **Incorrect behavior at boundaries** [G3] — untested corner cases. Fix: prove every boundary case, don't trust intuition.
- **Overridden safeties** [G4] — disabled tests, suppressed warnings, ignored failures. Fix: re-enable and address.
- **Duplication** [G5] — repeated code, or repeated switch/if-else on the same condition. Fix: extract; replace repeated type-switches with polymorphism. Includes duplicate *implementation* (e.g. `isEmpty` tracking its own state instead of delegating to `count == 0`).
- **Code at wrong abstraction level** [G6] — low-level detail in a base class or general interface. Fix: push details down; keep abstractions pure.
- **Base class depends on its derivatives** [G7] — Fix: invert with polymorphism.
- **Too much information** [G8] — wide interfaces, exposed internals. Fix: shrink the API; hide data, utilities, constants.
- **Dead code** [G9] — unreachable branches, unused members/imports. Fix: delete.
- **Vertical separation** [G10] — variables/functions defined far from use. Fix: move close.
- **Inconsistency** [G11] — same concept done different ways. Fix: pick one convention, apply everywhere.
- **Clutter** [G12] — no-op constructors, unused variables, noise. Fix: delete.
- **Artificial coupling** [G13] — a general enum/constant/function nested in a specific class, coupling unrelated modules. Fix: move to a neutral home.
- **Feature envy** [G14] — a method more interested in another class's data than its own. Fix: move the method to the data.
- **Obscured intent** [G16] — dense run-on expressions, magic numbers, cryptic abbreviations. Fix: explanatory variables [G19], named constants [G25], clear names.
- **Misplaced responsibility** [G17] — code where a reader wouldn't look for it. Fix: put it where its name says it lives.
- **Inappropriate static** [G18] — a static function that might ever need polymorphic behavior. Fix: prefer instance methods; static only when it operates purely on its arguments.
- **Function name doesn't say what it does** [G20] — `date.add(5)`: adds what? mutates or returns? Fix: rename (`addDaysTo`, `daysLater`) or restructure.
- **Fiddled-until-it-worked code** [G21] — logic the author doesn't actually understand. Fix: understand the algorithm; refactor until correctness is obvious.
- **Logical dependency not physical** [G22] — a module assumes a fact about a collaborator (a copied constant, an implicit limit) instead of asking for it. Fix: expose it explicitly and depend on that.
- **If/else or switch instead of polymorphism** [G23] — Fix: "one switch" rule — at most one, creating polymorphic objects, hidden behind a factory.
- **Nonstandard conventions** [G24] — code deviating from the team standard. Fix: follow the codebase's evidenced conventions.
- **Magic numbers/strings** [G25] — unexplained literals. Fix: named constants.
- **Imprecision** [G26] — unchecked nulls, floats for currency, assuming the first query result is the only one, ignored concurrency. Fix: handle each ambiguity precisely.
- **Convention where structure would do** [G27] — naming conventions merely suggesting behavior. Fix: enforce with structure (abstract methods, types) that compels compliance.
- **Raw complex conditional** [G28] — Fix: extract into an intent-revealing predicate function.
- **Negative conditional** [G29] — Fix: phrase conditions positively where possible.
- **Hidden temporal coupling** [G31] — calls that must run in order with nothing enforcing it. Fix: thread each call's result into the next so order is structural.
- **Arbitrary structure** [G32] — placement/shape with no communicated reason. Fix: structure code so the reason is evident.
- **Scattered boundary arithmetic** [G33] — `+1`/`-1` repeated around a boundary. Fix: encapsulate in one named variable/function.
- **Configurable data at low level** [G35] — defaults/config constants buried in low-level code. Fix: keep them at the top level and pass down.
- **Transitive navigation / train wreck** [G36] — `a.getB().getC().doThing()`. Fix: tell, don't ask — let the immediate collaborator offer the service.
- **Constants smuggled via inheritance** [J2, generalized] — inheriting to gain scope access to constants. Fix: reference/import them explicitly.
- **Hybrid object** — half object (behavior), half data structure (exposed fields). Fix: commit to one; keep business rules out of record types.
- **Envious boundary** — third-party API types leaking through the codebase. Fix: wrap the boundary in an interface you own.
- **Ignored error** — empty catch, unchecked result, swallowed exception. Fix: handle, propagate with context, or document why ignoring is safe.
- **Construction mixed with use** — lazy-init or `new` of collaborators inside business logic. Fix: inject dependencies; wire in the composition root or a factory.
- **Needless indirection** — tiny classes/interfaces/layers extracted by dogma, not need. Fix: minimize entity count; inline what earns nothing.

## Names

- **Undescriptive name** [N1] — doesn't tell the reader what the thing does; also re-check names as the code's meaning drifts. Fix: rename fearlessly.
- **Name at wrong abstraction level** [N2] — implementation detail in an abstract name. Fix: rename to the concept.
- **Nonstandard nomenclature** [N3] — ignoring established pattern names (`Decorator`, `Factory`) or the project's own vocabulary. Fix: use them; they carry design intent.
- **Ambiguous name** [N4] — vague verbs (`doRename`, `process`) that don't distinguish behavior. Fix: name the full effect.
- **Name-scope mismatch** [N5] — long names in tiny scopes or single letters in wide scopes. `i` in a 3-line loop is correct; `i` at file scope is not.
- **Encodings** [N6] — Hungarian notation, `m_`/`f` prefixes, type/subsystem markers. Fix: plain intent-revealing names.
- **Disinformation** — name implies something false (`accountList` that isn't a list; `get` that creates). Fix: rename honestly.
- **Noise words** — `Manager`, `Processor`, `Data`, `Info` carrying no meaning. Fix: name the actual responsibility.
- **Confusingly similar names** — near-identical long names differing in the middle; number series (`a1, a2`); `l`/`O` resembling `1`/`0`. Fix: make distinctions obvious.
- **Puns and cuteness** — one word reused for different semantics; joke names. Fix: one word per concept, said plainly.

## Tests

- **Insufficient tests** [T1] — untested branches, conditions, error paths. Fix: a test per condition that can break.
- **No coverage tool** [T2] — Fix: use coverage tooling to expose untested modules and branches.
- **Skipped trivial tests** [T3] — Fix: write them; they're cheap and documentary.
- **Ambiguity without an ignored test** [T4] — unclear requirement with nothing marking it. Fix: express the question as a skipped/ignored test.
- **Untested boundaries** [T5] — the middle is right, the edges are guessed. Fix: deliberate boundary tests.
- **Bug without exhaustive neighbors** [T6] — bugs congregate. Fix: when one is found, test that function exhaustively.
- **Unread failure patterns** [T7/T8] — Fix: keep test cases complete and ordered so failure and coverage patterns diagnose the cause.
- **Slow test** [T9] — will stop being run. Fix: isolate I/O, fake the boundaries.
- **Coupled/ordered tests** — pass only in sequence. Fix: each test sets up its own state.
- **Multiple concepts per test** — one failure hides others. Fix: one concept per test, descriptive names.
- **Manual-inspection test** — prints output instead of asserting. Fix: self-validating assertions.
