---
name: github-issues
description: Create GitHub issues and milestones from planning docs using gh CLI. Use when bootstrapping issues or mapping screens and features.
---

# GitHub Issues

Generate issues and milestones from docs.

## Workflow

1. Read planning docs and decide mode:
   - screen-based issues
   - feature-based issues
2. Confirm repo owner/name and labels.
3. Ensure `gh auth status` is healthy.
4. Create milestones and issues with `gh` commands.

## Example

```bash
gh issue create --repo <owner>/<repo> --title "[web] Screen H001" --label "web,feature" --milestone "MVP" --body "<body>"
```

## References

- `.claude/skills/github-issues/references/issue_templates.md`
