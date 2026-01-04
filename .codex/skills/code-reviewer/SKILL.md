---
name: code-reviewer
description: Run repo code review scripts and summarize risk. Use when reviewing PRs, local diffs, code quality, or security concerns.
---

# Code Reviewer

Run analysis scripts and summarize issues.

## Quick Start

```bash
python3 script/code_review_analyzer.py --output .claude/review-report.json
python3 script/pr_analyzer.py --base main --output .claude/pr-analysis.json
python3 script/review_report_generator.py --input .claude/review-report.json --print
```

## Options

- Use `--pr <number>` with `script/pr_analyzer.py` for GitHub PRs.
- Write markdown with `--output .claude/review-report.md` if needed.

## Reporting

- Prioritize critical and high risk items first.
- Include file:line references.
