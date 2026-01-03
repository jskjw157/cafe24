---
source: https://code.claude.com/docs/en/overview
title: Claude Code overview - Claude Code Docs
---

# Claude Code overview

Learn about Claude Code, Anthropic’s agentic coding tool that lives in your terminal and helps you turn ideas into code faster than ever before.

Get started in 30 seconds

Prerequisites:

  * A [Claude.ai](https://claude.ai) (recommended) or [Claude Console](https://console.anthropic.com/) account

**Install Claude Code:** To install Claude Code, use one of the following methods:

  * Native Install (Recommended)

  * Homebrew

  * NPM

**macOS, Linux, WSL:**

Ask AI

    curl -fsSL https://claude.ai/install.sh | bash

**Windows PowerShell:**

Ask AI

    irm https://claude.ai/install.ps1 | iex

**Windows CMD:**

Ask AI

    curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd

Ask AI

    brew install --cask claude-code

If you have [Node.js 18 or newer installed](https://nodejs.org/en/download/):

Ask AI

    npm install -g @anthropic-ai/claude-code

**Start using Claude Code:**

Ask AI

    cd your-project
    claude

You’ll be prompted to log in on first use. That’s it! [Continue with Quickstart (5 minutes) →](/docs/en/quickstart)

Claude Code automatically keeps itself up to date. See [advanced setup](/docs/en/setup) for installation options, manual updates, or uninstallation instructions. Visit [troubleshooting](/docs/en/troubleshooting) if you hit issues.

What Claude Code does for you

  * **Build features from descriptions** : Tell Claude what you want to build in plain English. It will make a plan, write the code, and ensure it works.
  * **Debug and fix issues** : Describe a bug or paste an error message. Claude Code will analyze your codebase, identify the problem, and implement a fix.
  * **Navigate any codebase** : Ask anything about your team’s codebase, and get a thoughtful answer back. Claude Code maintains awareness of your entire project structure, can find up-to-date information from the web, and with [MCP](/docs/en/mcp) can pull from external data sources like Google Drive, Figma, and Slack.
  * **Automate tedious tasks** : Fix fiddly lint issues, resolve merge conflicts, and write release notes. Do all this in a single command from your developer machines, or automatically in CI.

Why developers love Claude Code

  * **Works in your terminal** : Not another chat window. Not another IDE. Claude Code meets you where you already work, with the tools you already love.
  * **Takes action** : Claude Code can directly edit files, run commands, and create commits. Need more? [MCP](/docs/en/mcp) lets Claude read your design docs in Google Drive, update your tickets in Jira, or use _your_ custom developer tooling.
  * **Unix philosophy** : Claude Code is composable and scriptable. `tail -f app.log | claude -p "Slack me if you see any anomalies appear in this log stream"` _works_. Your CI can run `claude -p "If there are new text strings, translate them into French and raise a PR for @lang-fr-team to review"`.
  * **Enterprise-ready** : Use the Claude API, or host on AWS or GCP. Enterprise-grade [security](/docs/en/security), [privacy](/docs/en/data-usage), and [compliance](https://trust.anthropic.com/) is built-in.

Next steps

## [QuickstartSee Claude Code in action with practical examples](/docs/en/quickstart)## [Common workflowsStep-by-step guides for common workflows](/docs/en/common-workflows)## [TroubleshootingSolutions for common issues with Claude Code](/docs/en/troubleshooting)## [IDE setupAdd Claude Code to your IDE](/docs/en/vs-code)

Additional resources

## [About Claude CodeLearn more about Claude Code on claude.com](https://claude.com/product/claude-code)## [Build with the Agent SDKCreate custom AI agents with the Claude Agent SDK](https://docs.claude.com/en/docs/agent-sdk/overview)## [Host on AWS or GCPConfigure Claude Code with Amazon Bedrock or Google Vertex AI](/docs/en/third-party-integrations)## [SettingsCustomize Claude Code for your workflow](/docs/en/settings)## [CommandsLearn about CLI commands and controls](/docs/en/cli-reference)## [Reference implementationClone our development container reference implementation](https://github.com/anthropics/claude-code/tree/main/.devcontainer)## [SecurityDiscover Claude Code’s safeguards and best practices for safe usage](/docs/en/security)## [Privacy and data usageUnderstand how Claude Code handles your data](/docs/en/data-usage)

Was this page helpful?

[Quickstart](/docs/en/quickstart)

⌘I