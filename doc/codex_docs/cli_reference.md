---
source: https://developers.openai.com/codex/cli/reference
title: Command line options
---

#  Command line options

Options and flags for the Codex terminal client

## How to read this reference

This page catalogs every documented Codex CLI command and flag. Use the interactive tables to search by key or description. Each section indicates whether the option is stable or experimental and calls out risky combinations.

The CLI inherits most defaults from `~/.codex/config.toml`. Any `-c key=value` overrides you pass at the command line take precedence for that invocation. Check out [Basic Config](/codex/config-basic#configuration-precedence) for more information.

## Global flags

Key| Type / Values| Details
---|---|---
`--add-dir`| `path`| Grant additional directories write access alongside the main workspace. Repeat for multiple paths.
`--ask-for-approval, -a`| `untrusted | on-failure | on-request | never`| Control when Codex pauses for human approval before running a command.
`--cd, -C`| `path`| Set the working directory for the agent before it starts processing your request.
`--config, -c`| `key=value`| Override configuration values. Values parse as JSON if possible; otherwise the literal string is used.
`--dangerously-bypass-approvals-and-sandbox, --yolo`| `boolean`| Run every command without approvals or sandboxing. Only use inside an externally hardened environment.
`--disable`| `feature`| Force-disable a feature flag (translates to `-c features.<name>=false`). Repeatable.
`--enable`| `feature`| Force-enable a feature flag (translates to `-c features.<name>=true`). Repeatable.
`--full-auto`| `boolean`| Shortcut for unattended local work: sets `--ask-for-approval on-failure` and `--sandbox workspace-write`.
`--image, -i`| `path[,path...]`| Attach one or more image files to the initial prompt. Separate multiple paths with commas or repeat the flag.
`--model, -m`| `string`| Override the model set in configuration (for example `gpt-5-codex`).
`--oss`| `boolean`| Use the local open source model provider (equivalent to `-c model_provider="oss"`). Validates that Ollama is running.
`--profile, -p`| `string`| Configuration profile name to load from `~/.codex/config.toml`.
`--sandbox, -s`| `read-only | workspace-write | danger-full-access`| Select the sandbox policy for model-generated shell commands.
`--search`| `boolean`| Enable web search. When true, the agent can call the `web_search` tool without asking every time.
`PROMPT`| `string`| Optional text instruction to start the session. Omit to launch the TUI without a pre-filled message.

Key

`--add-dir`

Type / Values

`path`

Details

Grant additional directories write access alongside the main workspace. Repeat for multiple paths.

Key

`--ask-for-approval, -a`

Type / Values

`untrusted | on-failure | on-request | never`

Details

Control when Codex pauses for human approval before running a command.

Key

`--cd, -C`

Type / Values

`path`

Details

Set the working directory for the agent before it starts processing your request.

Key

`--config, -c`

Type / Values

`key=value`

Details

Override configuration values. Values parse as JSON if possible; otherwise the literal string is used.

Key

`--dangerously-bypass-approvals-and-sandbox, --yolo`

Type / Values

`boolean`

Details

Run every command without approvals or sandboxing. Only use inside an externally hardened environment.

Key

`--disable`

Type / Values

`feature`

Details

Force-disable a feature flag (translates to `-c features.<name>=false`). Repeatable.

Key

`--enable`

Type / Values

`feature`

Details

Force-enable a feature flag (translates to `-c features.<name>=true`). Repeatable.

Key

`--full-auto`

Type / Values

`boolean`

Details

Shortcut for unattended local work: sets `--ask-for-approval on-failure` and `--sandbox workspace-write`.

Key

`--image, -i`

Type / Values

`path[,path...]`

Details

Attach one or more image files to the initial prompt. Separate multiple paths with commas or repeat the flag.

Key

`--model, -m`

Type / Values

`string`

Details

Override the model set in configuration (for example `gpt-5-codex`).

Key

`--oss`

Type / Values

`boolean`

Details

Use the local open source model provider (equivalent to `-c model_provider="oss"`). Validates that Ollama is running.

Key

`--profile, -p`

Type / Values

`string`

Details

Configuration profile name to load from `~/.codex/config.toml`.

Key

`--sandbox, -s`

Type / Values

`read-only | workspace-write | danger-full-access`

Details

Select the sandbox policy for model-generated shell commands.

Key

`--search`

Type / Values

`boolean`

Details

Enable web search. When true, the agent can call the `web_search` tool without asking every time.

Key

`PROMPT`

Type / Values

`string`

Details

Optional text instruction to start the session. Omit to launch the TUI without a pre-filled message.

These options apply to the base `codex` command and propagate to each subcommand unless a section below specifies otherwise.

## Command overview

The Maturity column uses feature maturity labels such as Experimental, Beta, and Stable. See [Feature Maturity](/codex/feature-maturity) for how to interpret these labels.

Key| Maturity| Details
---|---|---
[`codex`](/codex/cli/reference#codex-interactive)| Stable| Launch the terminal UI. Accepts the global flags above plus an optional prompt or image attachments.
[`codex app-server`](/codex/cli/reference#codex-app-server)| Experimental| Launch the Codex app server for local development or debugging.
[`codex apply`](/codex/cli/reference#codex-apply)| Stable| Apply the latest diff generated by a Codex Cloud task to your local working tree. Alias: `codex a`.
[`codex cloud`](/codex/cli/reference#codex-cloud)| Experimental| Browse or execute Codex Cloud tasks from the terminal without opening the TUI. Alias: `codex cloud-tasks`.
[`codex completion`](/codex/cli/reference#codex-completion)| Stable| Generate shell completion scripts for Bash, Zsh, Fish, or PowerShell.
[`codex exec`](/codex/cli/reference#codex-exec)| Stable| Run Codex non-interactively. Alias: `codex e`. Stream results to stdout or JSONL and optionally resume previous sessions.
[`codex execpolicy`](/codex/cli/reference#codex-execpolicy)| Experimental| Evaluate execpolicy rule files and see whether a command would be allowed, prompted, or blocked.
[`codex login`](/codex/cli/reference#codex-login)| Stable| Authenticate Codex using ChatGPT OAuth, device auth, or an API key piped over stdin.
[`codex logout`](/codex/cli/reference#codex-logout)| Stable| Remove stored authentication credentials.
[`codex mcp`](/codex/cli/reference#codex-mcp)| Experimental| Manage Model Context Protocol servers (list, add, remove, authenticate).
[`codex mcp-server`](/codex/cli/reference#codex-mcp-server)| Experimental| Run Codex itself as an MCP server over stdio. Useful when another agent consumes Codex.
[`codex resume`](/codex/cli/reference#codex-resume)| Stable| Continue a previous interactive session by ID or resume the most recent conversation.
[`codex sandbox`](/codex/cli/reference#codex-sandbox)| Experimental| Run arbitrary commands inside Codex-provided macOS seatbelt or Linux landlock sandboxes.

Key

[`codex`](/codex/cli/reference#codex-interactive)

Maturity

Stable

Details

Launch the terminal UI. Accepts the global flags above plus an optional prompt or image attachments.

Key

[`codex app-server`](/codex/cli/reference#codex-app-server)

Maturity

Experimental

Details

Launch the Codex app server for local development or debugging.

Key

[`codex apply`](/codex/cli/reference#codex-apply)

Maturity

Stable

Details

Apply the latest diff generated by a Codex Cloud task to your local working tree. Alias: `codex a`.

Key

[`codex cloud`](/codex/cli/reference#codex-cloud)

Maturity

Experimental

Details

Browse or execute Codex Cloud tasks from the terminal without opening the TUI. Alias: `codex cloud-tasks`.

Key

[`codex completion`](/codex/cli/reference#codex-completion)

Maturity

Stable

Details

Generate shell completion scripts for Bash, Zsh, Fish, or PowerShell.

Key

[`codex exec`](/codex/cli/reference#codex-exec)

Maturity

Stable

Details

Run Codex non-interactively. Alias: `codex e`. Stream results to stdout or JSONL and optionally resume previous sessions.

Key

[`codex execpolicy`](/codex/cli/reference#codex-execpolicy)

Maturity

Experimental

Details

Evaluate execpolicy rule files and see whether a command would be allowed, prompted, or blocked.

Key

[`codex login`](/codex/cli/reference#codex-login)

Maturity

Stable

Details

Authenticate Codex using ChatGPT OAuth, device auth, or an API key piped over stdin.

Key

[`codex logout`](/codex/cli/reference#codex-logout)

Maturity

Stable

Details

Remove stored authentication credentials.

Key

[`codex mcp`](/codex/cli/reference#codex-mcp)

Maturity

Experimental

Details

Manage Model Context Protocol servers (list, add, remove, authenticate).

Key

[`codex mcp-server`](/codex/cli/reference#codex-mcp-server)

Maturity

Experimental

Details

Run Codex itself as an MCP server over stdio. Useful when another agent consumes Codex.

Key

[`codex resume`](/codex/cli/reference#codex-resume)

Maturity

Stable

Details

Continue a previous interactive session by ID or resume the most recent conversation.

Key

[`codex sandbox`](/codex/cli/reference#codex-sandbox)

Maturity

Experimental

Details

Run arbitrary commands inside Codex-provided macOS seatbelt or Linux landlock sandboxes.

## Command details

### `codex` (interactive)

Running `codex` with no subcommand launches the interactive terminal UI (TUI). The agent accepts the global flags above plus image attachments. Use `--search` to enable web browsing and `--full-auto` to let Codex run most commands without prompts.

### `codex app-server`

Launch the Codex app server locally. This is primarily for development and debugging and may change without notice.

### `codex apply`

Apply the most recent diff from a Codex cloud task to your local repository. You must authenticate and have access to the task.

Key| Type / Values| Details
---|---|---
`TASK_ID`| `string`| Identifier of the Codex Cloud task whose diff should be applied.

Key

`TASK_ID`

Type / Values

`string`

Details

Identifier of the Codex Cloud task whose diff should be applied.

Codex prints the patched files and exits non-zero if `git apply` fails (for example, due to conflicts).

### `codex cloud`

Interact with Codex cloud tasks from the terminal. The default command opens an interactive picker; `codex cloud exec` submits a task directly.

Key| Type / Values| Details
---|---|---
`--attempts`| `1-4`| Number of assistant attempts (best-of-N) Codex Cloud should run.
`--env`| `ENV_ID`| Target Codex Cloud environment identifier (required). Use `codex cloud` to list options.
`QUERY`| `string`| Task prompt. If omitted, Codex prompts interactively for details.

Key

`--attempts`

Type / Values

`1-4`

Details

Number of assistant attempts (best-of-N) Codex Cloud should run.

Key

`--env`

Type / Values

`ENV_ID`

Details

Target Codex Cloud environment identifier (required). Use `codex cloud` to list options.

Key

`QUERY`

Type / Values

`string`

Details

Task prompt. If omitted, Codex prompts interactively for details.

Authentication follows the same credentials as the main CLI. Codex exits non-zero if the task submission fails.

### `codex completion`

Generate shell completion scripts and redirect the output to the appropriate location, for example `codex completion zsh > "${fpath[1]}/_codex"`.

Key| Type / Values| Details
---|---|---
`SHELL`| `bash | zsh | fish | power-shell | elvish`| Shell to generate completions for. Output prints to stdout.

Key

`SHELL`

Type / Values

`bash | zsh | fish | power-shell | elvish`

Details

Shell to generate completions for. Output prints to stdout.

### `codex exec`

Use `codex exec` (or the short form `codex e`) for scripted or CI-style runs that should finish without human interaction.

Key| Type / Values| Details
---|---|---
`--cd, -C`| `path`| Set the workspace root before executing the task.
`--color`| `always | never | auto`| Control ANSI color in stdout.
`--dangerously-bypass-approvals-and-sandbox, --yolo`| `boolean`| Bypass approval prompts and sandboxing. Dangerous—only use inside an isolated runner.
`--full-auto`| `boolean`| Apply the low-friction automation preset (`workspace-write` sandbox and approvals on failure).
`--image, -i`| `path[,path...]`| Attach images to the first message. Repeatable; supports comma-separated lists.
`--json, --experimental-json`| `boolean`| Print newline-delimited JSON events instead of formatted text.
`--model, -m`| `string`| Override the configured model for this run.
`--oss`| `boolean`| Use the local open source provider (requires a running Ollama instance).
`--output-last-message, -o`| `path`| Write the assistant’s final message to a file. Useful for downstream scripting.
`--output-schema`| `path`| JSON Schema file describing the expected final response shape. Codex validates tool output against it.
`--profile, -p`| `string`| Select a configuration profile defined in config.toml.
`--sandbox, -s`| `read-only | workspace-write | danger-full-access`| Sandbox policy for model-generated commands. Defaults to configuration.
`--skip-git-repo-check`| `boolean`| Allow running outside a Git repository (useful for one-off directories).
`-c, --config`| `key=value`| Inline configuration override for the non-interactive run (repeatable).
`PROMPT`| `string | - (read stdin)`| Initial instruction for the task. Use `-` to pipe the prompt from stdin.
`Resume subcommand`| `codex exec resume [SESSION_ID]`| Resume an exec session by ID or add `--last` to continue the most recent session. Accepts an optional follow-up prompt.

Key

`--cd, -C`

Type / Values

`path`

Details

Set the workspace root before executing the task.

Key

`--color`

Type / Values

`always | never | auto`

Details

Control ANSI color in stdout.

Key

`--dangerously-bypass-approvals-and-sandbox, --yolo`

Type / Values

`boolean`

Details

Bypass approval prompts and sandboxing. Dangerous—only use inside an isolated runner.

Key

`--full-auto`

Type / Values

`boolean`

Details

Apply the low-friction automation preset (`workspace-write` sandbox and approvals on failure).

Key

`--image, -i`

Type / Values

`path[,path...]`

Details

Attach images to the first message. Repeatable; supports comma-separated lists.

Key

`--json, --experimental-json`

Type / Values

`boolean`

Details

Print newline-delimited JSON events instead of formatted text.

Key

`--model, -m`

Type / Values

`string`

Details

Override the configured model for this run.

Key

`--oss`

Type / Values

`boolean`

Details

Use the local open source provider (requires a running Ollama instance).

Key

`--output-last-message, -o`

Type / Values

`path`

Details

Write the assistant’s final message to a file. Useful for downstream scripting.

Key

`--output-schema`

Type / Values

`path`

Details

JSON Schema file describing the expected final response shape. Codex validates tool output against it.

Key

`--profile, -p`

Type / Values

`string`

Details

Select a configuration profile defined in config.toml.

Key

`--sandbox, -s`

Type / Values

`read-only | workspace-write | danger-full-access`

Details

Sandbox policy for model-generated commands. Defaults to configuration.

Key

`--skip-git-repo-check`

Type / Values

`boolean`

Details

Allow running outside a Git repository (useful for one-off directories).

Key

`-c, --config`

Type / Values

`key=value`

Details

Inline configuration override for the non-interactive run (repeatable).

Key

`PROMPT`

Type / Values

`string | - (read stdin)`

Details

Initial instruction for the task. Use `-` to pipe the prompt from stdin.

Key

`Resume subcommand`

Type / Values

`codex exec resume [SESSION_ID]`

Details

Resume an exec session by ID or add `--last` to continue the most recent session. Accepts an optional follow-up prompt.

Codex writes formatted output by default. Add `--json` to receive newline-delimited JSON events (one per state change). The optional `resume` subcommand lets you continue non-interactive tasks:

Key| Type / Values| Details
---|---|---
`--last`| `boolean`| Skip the picker and resume the most recent conversation automatically.
`PROMPT`| `string | - (read stdin)`| Optional follow-up instruction sent immediately after resuming.
`SESSION_ID`| `uuid`| Resume the specified session. Omit and use `--last` to continue the most recent session.

Key

`--last`

Type / Values

`boolean`

Details

Skip the picker and resume the most recent conversation automatically.

Key

`PROMPT`

Type / Values

`string | - (read stdin)`

Details

Optional follow-up instruction sent immediately after resuming.

Key

`SESSION_ID`

Type / Values

`uuid`

Details

Resume the specified session. Omit and use `--last` to continue the most recent session.

### `codex execpolicy`

Check `execpolicy` rule files before you save them. `codex execpolicy check` accepts one or more `--rules` flags (for example, files under `~/.codex/rules`) and emits JSON showing the strictest decision and any matching rules. Add `--pretty` to format the output. The `execpolicy` command is currently in preview.

Key| Type / Values| Details
---|---|---
`--pretty`| `boolean`| Pretty-print the JSON result.
`--rules, -r`| `path (repeatable)`| Path to an execpolicy rule file to evaluate. Provide multiple flags to combine rules across files.
`COMMAND...`| `var-args`| Command to be checked against the specified policies.

Key

`--pretty`

Type / Values

`boolean`

Details

Pretty-print the JSON result.

Key

`--rules, -r`

Type / Values

`path (repeatable)`

Details

Path to an execpolicy rule file to evaluate. Provide multiple flags to combine rules across files.

Key

`COMMAND...`

Type / Values

`var-args`

Details

Command to be checked against the specified policies.

### `codex login`

Authenticate the CLI with a ChatGPT account or API key. With no flags, Codex opens a browser for the ChatGPT OAuth flow.

Key| Type / Values| Details
---|---|---
`--with-api-key`| `boolean`| Read an API key from stdin (for example `printenv OPENAI_API_KEY | codex login --with-api-key`).
`status subcommand`| `codex login status`| Print the active authentication mode and exit with 0 when logged in.

Key

`--with-api-key`

Type / Values

`boolean`

Details

Read an API key from stdin (for example `printenv OPENAI_API_KEY | codex login --with-api-key`).

Key

`status subcommand`

Type / Values

`codex login status`

Details

Print the active authentication mode and exit with 0 when logged in.

`codex login status` exits with `0` when credentials are present, which is helpful in automation scripts.

### `codex logout`

Remove saved credentials for both API key and ChatGPT authentication. This command has no flags.

### `codex mcp`

Manage Model Context Protocol server entries stored in `~/.codex/config.toml`.

Key| Type / Values| Details
---|---|---
`add <name>`| `-- <command...> | --url <value>`| Register a server using a stdio launcher command or a streamable HTTP URL. Supports `--env KEY=VALUE` for stdio transports.
`get <name>`| `--json`| Show a specific server configuration. `--json` prints the raw config entry.
`list`| `--json`| List configured MCP servers. Add `--json` for machine-readable output.
`login <name>`| `--scopes scope1,scope2`| Start an OAuth login for a streamable HTTP server (servers that support OAuth only).
`logout <name>`| | Remove stored OAuth credentials for a streamable HTTP server.
`remove <name>`| | Delete a stored MCP server definition.

Key

`add <name>`

Type / Values

`-- <command...> | --url <value>`

Details

Register a server using a stdio launcher command or a streamable HTTP URL. Supports `--env KEY=VALUE` for stdio transports.

Key

`get <name>`

Type / Values

`--json`

Details

Show a specific server configuration. `--json` prints the raw config entry.

Key

`list`

Type / Values

`--json`

Details

List configured MCP servers. Add `--json` for machine-readable output.

Key

`login <name>`

Type / Values

`--scopes scope1,scope2`

Details

Start an OAuth login for a streamable HTTP server (servers that support OAuth only).

Key

`logout <name>`

Details

Remove stored OAuth credentials for a streamable HTTP server.

Key

`remove <name>`

Details

Delete a stored MCP server definition.

The `add` subcommand supports both stdio and streamable HTTP transports:

Key| Type / Values| Details
---|---|---
`--bearer-token-env-var`| `ENV_VAR`| Environment variable whose value is sent as a bearer token when connecting to a streamable HTTP server.
`--env KEY=VALUE`| `repeatable`| Environment variable assignments applied when launching a stdio server.
`--url`| `https://…`| Register a streamable HTTP server instead of stdio. Mutually exclusive with `COMMAND...`.
`COMMAND...`| `stdio transport`| Executable plus arguments to launch the MCP server. Provide after `--`.

Key

`--bearer-token-env-var`

Type / Values

`ENV_VAR`

Details

Environment variable whose value is sent as a bearer token when connecting to a streamable HTTP server.

Key

`--env KEY=VALUE`

Type / Values

`repeatable`

Details

Environment variable assignments applied when launching a stdio server.

Key

`--url`

Type / Values

`https://…`

Details

Register a streamable HTTP server instead of stdio. Mutually exclusive with `COMMAND...`.

Key

`COMMAND...`

Type / Values

`stdio transport`

Details

Executable plus arguments to launch the MCP server. Provide after `--`.

OAuth actions (`login`, `logout`) only work with streamable HTTP servers (and only when the server supports OAuth).

### `codex mcp-server`

Run Codex as an MCP server over stdio so that other tools can connect. This command inherits global configuration overrides and exits when the downstream client closes the connection.

### `codex resume`

Continue an interactive session by ID or resume the most recent conversation. `codex resume` accepts the same global flags as `codex`, including model and sandbox overrides.

Key| Type / Values| Details
---|---|---
`--last`| `boolean`| Skip the picker and resume the most recent conversation automatically.
`PROMPT`| `string | - (read stdin)`| Optional follow-up instruction sent immediately after resuming.
`SESSION_ID`| `uuid`| Resume the specified session. Omit and use `--last` to continue the most recent session.

Key

`--last`

Type / Values

`boolean`

Details

Skip the picker and resume the most recent conversation automatically.

Key

`PROMPT`

Type / Values

`string | - (read stdin)`

Details

Optional follow-up instruction sent immediately after resuming.

Key

`SESSION_ID`

Type / Values

`uuid`

Details

Resume the specified session. Omit and use `--last` to continue the most recent session.

### `codex sandbox`

Use the sandbox helper to run a command under the same policies Codex uses internally.

#### macOS seatbelt

Key| Type / Values| Details
---|---|---
`--config, -c`| `key=value`| Pass configuration overrides into the sandboxed run (repeatable).
`--full-auto`| `boolean`| Grant write access to the current workspace and `/tmp` without approvals.
`COMMAND...`| `var-args`| Shell command to execute under macOS Seatbelt. Everything after `--` is forwarded.

Key

`--config, -c`

Type / Values

`key=value`

Details

Pass configuration overrides into the sandboxed run (repeatable).

Key

`--full-auto`

Type / Values

`boolean`

Details

Grant write access to the current workspace and `/tmp` without approvals.

Key

`COMMAND...`

Type / Values

`var-args`

Details

Shell command to execute under macOS Seatbelt. Everything after `--` is forwarded.

#### Linux Landlock

Key| Type / Values| Details
---|---|---
`--config, -c`| `key=value`| Configuration overrides applied before launching the sandbox (repeatable).
`--full-auto`| `boolean`| Grant write access to the current workspace and `/tmp` inside the Landlock sandbox.
`COMMAND...`| `var-args`| Command to execute under Landlock + seccomp. Provide the executable after `--`.

Key

`--config, -c`

Type / Values

`key=value`

Details

Configuration overrides applied before launching the sandbox (repeatable).

Key

`--full-auto`

Type / Values

`boolean`

Details

Grant write access to the current workspace and `/tmp` inside the Landlock sandbox.

Key

`COMMAND...`

Type / Values

`var-args`

Details

Command to execute under Landlock + seccomp. Provide the executable after `--`.

## Flag combinations and safety tips

  * Set `--full-auto` for unattended local work, but avoid combining it with `--dangerously-bypass-approvals-and-sandbox` unless you are inside a dedicated sandbox VM.
  * When you need to grant Codex write access to more directories, prefer `--add-dir` rather than forcing `--sandbox danger-full-access`.
  * Pair `--json` with `--output-last-message` in CI to capture machine-readable progress and a final natural-language summary.

## Related resources

  * [Codex CLI overview](/codex/cli): installation, upgrades, and quick tips.
  * [Basic Config](/codex/config-basic): persist defaults like the model and provider.
  * [Advanced Config](/codex/config-advanced): profiles, providers, sandbox tuning, and integrations.
  * [AGENTS.md](https://agents.md): conceptual overview of Codex agent capabilities and best practices.