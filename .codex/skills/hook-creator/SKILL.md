---
name: hook-creator
description: Create or update Claude Code hooks in .claude/settings.json. Use when adding PreToolUse/PostToolUse hooks, logging, formatting, or file protection.
---

# Hook Creator

Create Claude Code hooks to automate actions around tool execution.

## Workflow

1. Pick the event and matcher.
2. Write a command that reads JSON from stdin.
3. Add the hook to `.claude/settings.json` or user settings.
4. Test with a small change.

## Hook Template

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "<shell-command>" }
        ]
      }
    ]
  }
}
```

## Tips

- Use `jq` to parse input fields.
- Exit code 2 blocks the tool.
