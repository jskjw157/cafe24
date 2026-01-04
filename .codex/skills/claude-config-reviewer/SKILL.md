---
name: claude-config-reviewer
description: Review .claude config files (agents, skills, hooks) using repo checklists. Use when adding or editing .claude configs or running a full .claude audit.
---

# Claude Config Reviewer

Review .claude config files for structure and pattern compliance.

## Workflow

1. Identify the target: agent file, skill directory, hook config, or full .claude.
2. Load the matching checklist:
   - `.claude/skills/claude-config-reviewer/references/agent-checklist.md`
   - `.claude/skills/claude-config-reviewer/references/skill-checklist.md`
   - `.claude/skills/claude-config-reviewer/references/hook-checklist.md`
3. Verify required frontmatter fields and description patterns.
4. Report issues with file paths and concrete fixes.

## Notes

- Use `script/config_validator.py` for automated validation when helpful.
- Keep findings actionable and minimal.
