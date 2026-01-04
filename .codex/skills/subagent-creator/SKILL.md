---
name: subagent-creator
description: Create Claude Code subagents in .claude/agents with custom system prompts. Use when defining specialized assistants for recurring tasks.
---

# Subagent Creator

Create subagents for focused workflows.

## File Format

```markdown
---
name: subagent-name
description: When to use this subagent
tools: Read, Grep, Glob, Bash
model: inherit
---
<System prompt>
```

## Workflow

1. Define scope and triggers.
2. Choose tools and model.
3. Write a concise system prompt.
4. Save to `.claude/agents/<name>.md`.
