# Project Instructions

## Knowledge Base

The project's persistent engineering knowledge is stored in knowledge/.

Before making significant architectural changes:
1. Read knowledge/PROJECT.md.
2. Read relevant files under knowledge/architecture/.
3. Check relevant decisions under knowledge/decisions/.
4. Follow conventions under knowledge/conventions/.

## Documentation Rules

Use the knowledge base for:
- Architectural decisions
- Important system behavior
- Non-obvious debugging discoveries
- Project conventions
- Feature requirements that need persistent context

Do NOT document every implementation detail. Code is the source of truth for implementation.

## After Significant Changes

If a change introduces an important architectural decision, create or update an ADR in knowledge/decisions/.

If you discover a non-obvious, reusable debugging lesson, record it under knowledge/debugging/.

Keep documentation concise, accurate, and current.

## Before Coding

For non-trivial tasks:
1. Understand the existing codebase.
2. Check relevant knowledge files.
3. Explain the planned approach.
4. Implement.
5. Run relevant tests/typechecks/lint.
6. Update persistent knowledge only when something genuinely worth remembering was learned.
