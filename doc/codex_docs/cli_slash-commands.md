---
source: https://developers.openai.com/codex/cli/slash-commands
title: Slash commands in Codex CLI
---

#  Slash commands in Codex CLI

Control Codex during interactive sessions

Slash commands give you fast, keyboard-first control over Codex. Type `/` in the composer to open the slash popup, choose a command, and Codex will perform actions such as switching models, adjusting approvals, or summarizing long conversations without leaving the terminal.

This guide shows you how to:

  * Find the right built-in slash command for a task
  * Steer an active session with commands like `/model`, `/approvals`, and `/status`
  * Create custom prompts that behave like new slash commands with arguments and metadata

## Built-in slash commands

Codex ships with the following commands. Open the slash popup and start typing the command name to filter the list.

Command| Purpose| When to use it
---|---|---
`/approvals`| Set what Codex can do without asking first.| Relax or tighten approval requirements mid-session, such as switching between Auto and Read Only.
`/compact`| Summarize the visible conversation to free tokens.| Use after long runs so Codex retains key points without blowing the context window.
`/diff`| Show the Git diff, including files Git isn’t tracking yet.| Review Codex’s edits before you commit or run tests.
`/exit`| Exit the CLI (same as `/quit`).| Alternative spelling; both commands exit the session.
`/feedback`| Send logs to the Codex maintainers.| Report issues or share diagnostics with support.
`/init`| Generate an `AGENTS.md` scaffold in the current directory.| Capture persistent instructions for the repository or subdirectory you’re working in.
`/logout`| Sign out of Codex.| Clear local credentials when using a shared machine.
`/mcp`| List configured Model Context Protocol (MCP) tools.| Check which external tools Codex can call during the session.
`/mention`| Attach a file to the conversation.| Point Codex at specific files or folders you want it to inspect next.
`/model`| Choose the active model (and reasoning effort, when available).| Switch between general-purpose models (`gpt-4.1-mini`) and deeper reasoning models before running a task.
`/new`| Start a new conversation inside the same CLI session.| Reset the chat context without leaving the CLI when you want a fresh prompt in the same repo.
`/quit`| Exit the CLI.| Leave the session immediately.
`/review`| Ask Codex to review your working tree.| Run after Codex completes work or when you want a second set of eyes on local changes.
`/status`| Display session configuration and token usage.| Confirm the active model, approval policy, writable roots, and remaining context capacity.
`/undo`| Revert Codex’s most recent turn.| Roll back an unwanted edit or command run.

`/quit` and `/exit` both exit the CLI. Use them only after you have saved or committed any important work.

## Control your session with slash commands

The following workflows keep your session on track without restarting Codex.

### Set the active model with `/model`

  1. Start Codex and open the composer.
  2. Type `/model` and press Enter.
  3. Choose a model such as `gpt-4.1-mini` or `gpt-4.1` from the popup.

Expected: Codex confirms the new model in the transcript. Run `/status` to verify the change.

### Update approval rules with `/approvals`

  1. Type `/approvals` and press Enter.
  2. Select the approval preset that matches your comfort level, for example `Auto` for hands-off runs or `Read Only` to review edits.

Expected: Codex announces the updated policy. Future actions respect the new approval mode until you change it again.

### Inspect the session with `/status`

  1. In any conversation, type `/status`.
  2. Review the output for the active model, approval policy, writable roots, and current token usage.

Expected: You see a summary like what `codex status` prints in the shell, confirming Codex is operating where you expect.

### Keep transcripts lean with `/compact`

  1. After a long exchange, type `/compact`.
  2. Confirm when Codex offers to summarize the conversation so far.

Expected: Codex replaces earlier turns with a concise summary, freeing context while keeping critical details.

### Undo the most recent turn with `/undo`

  1. When Codex makes an incorrect edit or runs an unwanted command, type `/undo`.
  2. Confirm the rollback when prompted.

Expected: Codex restores the previous state (including reverting file changes) and tells you what it removed.

### Review changes with `/diff`

  1. Type `/diff` to inspect the Git diff.
  2. Scroll through the output inside the CLI to review edits and added files.

Expected: Codex shows changes you’ve staged, changes you haven’t staged yet, and files Git hasn’t started tracking, so you can decide what to keep.

### Highlight files with `/mention`

  1. Type `/mention` followed by a path, for example `/mention src/lib/api.ts`.
  2. Select the matching result from the popup.

Expected: Codex adds the file to the conversation, ensuring follow-up turns reference it directly.

### Start a new conversation with `/new`

  1. Type `/new` and press Enter.

Expected: Codex starts a fresh conversation in the same CLI session, so you can switch tasks without leaving your terminal.

### Generate `AGENTS.md` with `/init`

  1. Run `/init` in the directory where you want Codex to look for persistent instructions.
  2. Review the generated `AGENTS.md`, then edit it to match your repository conventions.

Expected: Codex creates an `AGENTS.md` scaffold you can refine and commit for future sessions.

### Ask for a working tree review with `/review`

  1. Type `/review`.
  2. Follow up with `/diff` if you want to inspect the exact file changes.

Expected: Codex summarizes issues it finds in your working tree, focusing on behavior changes and missing tests.

### List MCP tools with `/mcp`

  1. Type `/mcp`.
  2. Review the list to confirm which MCP servers and tools are available.

Expected: You see the configured Model Context Protocol (MCP) tools Codex can call in this session.

### Send feedback with `/feedback`

  1. Type `/feedback` and press Enter.
  2. Follow the prompts to include logs or diagnostics.

Expected: Codex collects the requested diagnostics and submits them to the maintainers.

### Sign out with `/logout`

  1. Type `/logout` and press Enter.

Expected: Codex clears local credentials for the current user session.

### Exit the CLI with `/quit` or `/exit`

  1. Type `/quit` (or `/exit`) and press Enter.

Expected: Codex exits immediately. Save or commit any important work first.

## Create your own slash commands with custom prompts

Custom prompts turn Markdown files into reusable slash commands that you trigger with `/prompts:<name>`. Custom prompts require explicit invocation. They live in your Codex home, so they aren’t shared through your repository. If you want to share a prompt (or want Codex to implicitly invoke it), [use skills](/codex/skills).

  1. Create the prompts directory:

         mkdir -p ~/.codex/prompts

  2. Create `~/.codex/prompts/draftpr.md` with reusable guidance:

         ---
         description: Prep a branch, commit, and open a draft PR
         argument-hint: [FILES=<paths>] [PR_TITLE="<title>"]
         ---

         Create a branch named `dev/<feature_name>` for this work.
         If files are specified, stage them first: $FILES.
         Commit the staged changes with a clear message.
         Open a draft PR on the same branch. Use $PR_TITLE when supplied; otherwise write a concise summary yourself.

  3. Restart Codex (or start a new session) so it loads the new prompt.

Expected: Typing `/prompts:draftpr` in the slash popup shows your custom command with the description from the front matter and hints that files and a PR title are optional.

## Add metadata and arguments

Codex reads prompt metadata and resolves placeholders the next time the session starts.

  * **Description:** Shown under the command name in the popup. Set it in YAML front matter as `description:`.
  * **Argument hint:** Document expected parameters with `argument-hint: KEY=<value>`.
  * **Positional placeholders:** `$1` through `$9` expand from space-separated arguments you provide after the command. `$ARGUMENTS` includes them all.
  * **Named placeholders:** Use uppercase names like `$FILE` or `$TICKET_ID` and supply values as `KEY=value`. Quote values with spaces (for example, `FOCUS="loading state"`).
  * **Literal dollar signs:** Write `$$` to emit a single `$` in the expanded prompt.

After editing prompt files, restart Codex or open a new chat so the updates load. Codex ignores non-Markdown files in the prompts directory.

## Invoke and manage custom commands

  1. Launch Codex and type `/` to open the popup.

  2. Enter `prompts:` or the prompt name, for example `/prompts:draftpr`.

  3. Supply required arguments:

         /prompts:draftpr FILES="src/pages/index.astro src/lib/api.ts" PR_TITLE="Add hero animation"

  4. Press Enter to send the expanded instructions (skip either argument when you don’t need it).

Expected: Codex pastes the content of `draftpr.md`, replacing placeholders with the arguments you supplied. Run `/status` or `/diff` afterward to confirm the prompt triggered the intended workflow.

Manage prompts by editing or deleting files under `~/.codex/prompts/`. Codex scans only the top-level Markdown files in that folder, so place each custom prompt directly under `~/.codex/prompts/` rather than in subdirectories.