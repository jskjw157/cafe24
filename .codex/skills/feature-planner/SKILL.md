---
name: feature-planner
description: Create phase-based feature plans with quality gates and TDD steps. Use when decomposing work or building a delivery roadmap.
---

# Feature Planner

Create phased plans with clear success criteria.

## Workflow

1. Analyze requirements and dependencies.
2. Break work into 3-7 phases, each 1-4 hours.
3. For each phase include:
   - Test strategy (red/green/refactor)
   - Tasks in order
   - Quality gate checks
4. Ask for approval before writing the plan.
5. Generate a plan document using `.claude/skills/feature-planner/plan-template.md`.

## Output

- `docs/plans/PLAN_<feature>.md` with checklists and quality gates.
