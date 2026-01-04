---
name: slash-command-creator
description: Create Claude Code slash commands in .claude/commands. Use when automating repeated prompts or adding project commands.
---

# Slash Command Creator

Create .claude command files for repeatable prompts.

## Workflow

1. Create `.claude/commands/<name>.md`.
2. Add frontmatter with `description`.
3. Write prompt body and use `$ARGUMENTS` or `$1`.
4. Test in Claude Code.

## Example

```markdown
---
description: Review a PR quickly
---

Review PR #$1 for risks.
```
