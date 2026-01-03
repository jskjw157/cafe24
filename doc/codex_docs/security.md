---
source: https://developers.openai.com/codex/security
title: Security
---

#  Security

How to securely operate and manage Codex agents

Codex helps protect your code and data and reduces the risk of misuse.

By default, the agent runs with network access turned off and can write only inside the current workspace, whether locally or in the cloud.

## Sandbox and approvals

Codex uses different sandbox modes depending on where you run it:

  * **Codex cloud** : Runs in isolated OpenAI-managed containers, preventing access to your host system or unrelated data. You can expand access intentionally (for example, to install dependencies or allow specific domains) when needed. Network access is always enabled during the setup phase, which runs before the agent has access to your code.
  * **Codex CLI / IDE extension** : OS-level mechanisms enforce sandbox policies. Defaults include no network access and write permissions limited to the active workspace. You can configure the sandbox, approval policy, and network settings based on your risk tolerance.

In the default approval mode, Codex can read files, make edits, and run commands in the working directory automatically.

Codex asks for approval to edit files outside the working directory or to run commands that require network access. If you want to chat or plan without making changes, switch to `read-only` mode with the `/approvals` command.

## Network access

For Codex cloud, see [agent internet access](/codex/cloud/internet-access) to enable full internet access or a domain allow list.

For the Codex CLI or IDE extension, the default `workspace-write` sandbox mode keeps network access turned off unless you enable it in your configuration:

    [sandbox_workspace_write]
    network_access = true

You can also enable the [web search tool](https://platform.openai.com/docs/guides/tools-web-search) without allowing full network access by passing the `--search` flag or toggling the feature in `config.toml`:

    [features]
    web_search_request = true

Use caution when enabling network access or web search in Codex. Prompt injection can cause the agent to fetch and follow untrusted instructions.

## Defaults and recommendations

  * On launch, Codex detects whether the folder is version-controlled and recommends:
    * Version-controlled folders: `Auto` (workspace write + on-request approvals)
    * Non-version-controlled folders: `read-only`
  * The workspace includes the current directory and temporary directories like `/tmp`. Use the `/status` command to see which directories are in the workspace.
  * To accept the defaults, run `codex`.
  * You can set these explicitly:
    * `codex --sandbox workspace-write --ask-for-approval on-request`
    * `codex --sandbox read-only --ask-for-approval on-request`

### Run without approval prompts

You can disable approval prompts with `--ask-for-approval never` or `-a never` (shorthand).

This option works with all `--sandbox` modes, so you still control Codex’s level of autonomy. Codex makes a best effort within the constraints you set.

If you need Codex to read files, make edits, and run commands with network access without approval prompts, use `--sandbox danger-full-access` (or the `--dangerously-bypass-approvals-and-sandbox` flag). Use caution before doing so.

### Common sandbox and approval combinations

Intent| Flags| Effect
---|---|---
Auto (preset)| _no flags needed, default_|  Codex can read files, make edits, and run commands in the workspace. Codex asks for approval to run commands outside the sandbox.
Read-only| `--sandbox read-only --ask-for-approval never`| Codex can only read files; never asks for approval.
Automatically edit but ask for approval to run untrusted commands| `--sandbox workspace-write --ask-for-approval untrusted`| Codex can read and edit files but asks for approval before running untrusted commands.
Dangerous full access| `--dangerously-bypass-approvals-and-sandbox` (alias: `--yolo`)| No sandbox; no approvals _(not recommended)_

#### Configuration in `config.toml`

    # Always ask for approval mode
    approval_policy = "untrusted"
    sandbox_mode    = "read-only"

    # Optional: Allow network in workspace-write mode
    [sandbox_workspace_write]
    network_access = true

### Test the sandbox locally

To see what happens when a command runs under the Codex sandbox, use these Codex CLI commands:

    # macOS
    codex sandbox macos [COMMAND]...
    # Linux
    codex sandbox linux [COMMAND]...

## OS-level sandbox

Codex enforces the sandbox differently depending on your OS:

  * **macOS** uses Seatbelt policies and runs commands using `sandbox-exec` with a profile (`-p`) that corresponds to the `--sandbox` mode you selected.
  * **Linux** uses a combination of `Landlock` and `seccomp` to enforce the sandbox configuration.
  * **Windows** uses the Linux sandbox implementation when running in [Windows Subsystem for Linux (WSL)](/codex/windows#windows-subsystem-for-linux). When running natively on Windows, you can enable an [experimental sandbox](/codex/windows#windows-experimental-sandbox) implementation.

If you use the Codex IDE extension on Windows, it supports WSL directly. Set the following in your VS Code settings to keep the agent inside WSL whenever it’s available:

    {
      "chatgpt.runCodexInWindowsSubsystemForLinux": true
    }

This ensures the IDE extension inherits Linux sandbox semantics for commands, approvals, and filesystem access even when the host OS is Windows. Learn more in the [Windows setup guide](/codex/windows).

When you run Linux in a containerized environment such as Docker, the sandbox may not work if the host or container configuration doesn’t support the required `Landlock` and `seccomp` features.

In that case, configure your Docker container to provide the isolation you need, then run `codex` with `--sandbox danger-full-access` (or the `--dangerously-bypass-approvals-and-sandbox` flag) inside the container.

## Version control

Codex works best with a version control workflow:

  * Work on a feature branch and keep `git status` clean before delegating. This keeps Codex patches easier to isolate and revert.
  * Prefer patch-based workflows (for example, `git diff`/`git apply`) over editing tracked files directly. Commit frequently so you can roll back in small increments.
  * Treat Codex suggestions like any other PR: run targeted verification, review diffs, and document decisions in commit messages for auditing.

## Monitoring and telemetry

Codex supports opt-in monitoring via OpenTelemetry (OTEL) to help teams audit usage, investigate issues, and meet compliance requirements without weakening local security defaults. Telemetry is off by default and must be explicitly enabled in your configuration.

### Overview

  * Codex turns off OTEL export by default to keep local runs self-contained.
  * When enabled, Codex emits structured log events covering conversations, API requests, streamed responses, user prompts (redacted by default), tool approval decisions, and tool results.
  * Codex tags exported events with `service.name` (originator), CLI version, and an environment label to separate dev/staging/prod traffic.

### Enable OTEL (opt-in)

Add an `[otel]` block to your Codex configuration (typically `~/.codex/config.toml`), choosing an exporter and whether to log prompt text.

    [otel]
    environment = "staging"   # dev | staging | prod
    exporter = "none"          # none | otlp-http | otlp-grpc
    log_user_prompt = false     # redact prompt text unless policy allows

  * `exporter = "none"` leaves instrumentation active but doesn’t send data anywhere.
  * To send events to your own collector, pick one of:

    [otel]
    exporter = { otlp-http = {
      endpoint = "https://otel.example.com/v1/logs",
      protocol = "binary",
      headers = { "x-otlp-api-key" = "${OTLP_TOKEN}" }
    }}

    [otel]
    exporter = { otlp-grpc = {
      endpoint = "https://otel.example.com:4317",
      headers = { "x-otlp-meta" = "abc123" }
    }}

Codex batches events and flushes them on shutdown. Codex exports only telemetry produced by its OTEL module.

### Event categories

Representative event types include:

  * `codex.conversation_starts` (model, reasoning settings, sandbox/approval policy)
  * `codex.api_request` and `codex.sse_event` (durations, status, token counts)
  * `codex.user_prompt` (length; content redacted unless explicitly enabled)
  * `codex.tool_decision` (approved/denied, source: configuration vs. user)
  * `codex.tool_result` (duration, success, output snippet)

For the full event catalog and configuration reference, see the [Codex configuration documentation on GitHub](https://github.com/openai/codex/blob/main/docs/config.md#otel).

### Security and privacy guidance

  * Keep `log_user_prompt = false` unless policy explicitly permits storing prompt contents. Prompts can include source code and sensitive data.
  * Route telemetry only to collectors you control; apply retention limits and access controls aligned with your compliance requirements.
  * Treat tool arguments and outputs as sensitive. Favor redaction at the collector or SIEM when possible.
  * If you run the CLI with network access turned off, OTEL export can’t reach your collector. To export, either allow network access in `workspace-write` mode for the OTEL endpoint or export from Codex cloud with the collector domain on your allow list.
  * Review events periodically for approval/sandbox changes and unexpected tool executions.

OTEL is optional and designed to complement, not replace, the sandbox and approval protections described above.

## Managed configuration

Enterprise admins can set safe defaults and organization policies using a managed configuration layer. Managed configuration merges on top of a user’s local `config.toml` and takes precedence over any CLI `--config` overrides, setting the starting values when Codex launches. Users can still change those settings during a session; Codex reapplies managed defaults the next time it starts.

### Precedence and layering

Codex assembles the effective configuration in this order (top overrides bottom):

  * Managed preferences (macOS MDM; highest precedence)
  * `managed_config.toml` (system/managed file)
  * `config.toml` (user’s base configuration)

CLI `--config key=value` overrides apply to the base, but managed layers override them. This means each run starts from the managed defaults even if you provide local flags.

### Locations

  * Linux/macOS (Unix): `/etc/codex/managed_config.toml`
  * Windows/non-Unix: `~/.codex/managed_config.toml`

If the file is missing, Codex skips the managed layer.

### macOS managed preferences (MDM)

On macOS, admins can push a device profile that provides a base64-encoded TOML payload at:

  * Preference domain: `com.openai.codex`
  * Key: `config_toml_base64`

Codex parses this “managed preferences” layer as TOML and applies it with the highest precedence, above `managed_config.toml`.

### MDM setup workflow

Codex honors standard macOS MDM payloads, so you can distribute settings with tooling like `Jamf Pro`, `Fleet`, or `Kandji`. A lightweight deployment looks like:

  1. Build the managed payload TOML and encode it with `base64` (no wrapping).
  2. Drop the string into your MDM profile under the `com.openai.codex` domain at `config_toml_base64`.
  3. Push the profile, then ask users to restart Codex or rerun `codex config show --effective` to confirm the managed values are active.
  4. When revoking or changing policy, update the managed payload; the CLI reads the refreshed preference the next time it launches.

Avoid embedding secrets or high-churn dynamic values in the payload. Treat the managed TOML like any other MDM setting under change control.

### Example managed_config.toml

    # Set conservative defaults
    approval_policy = "on-request"
    sandbox_mode    = "workspace-write"

    [sandbox_workspace_write]
    network_access = false             # keep network disabled unless explicitly allowed

    [otel]
    environment = "prod"
    exporter = "otlp-http"            # point at your collector
    log_user_prompt = false            # keep prompts redacted
    # exporter details live under exporter tables; see Monitoring and telemetry above

### Recommended guardrails

  * Prefer `workspace-write` with approvals for most users; reserve full access for controlled containers.
  * Keep `network_access = false` unless your security review allows a collector or domains required by your workflows.
  * Use managed configuration to pin OTEL settings (exporter, environment), but keep `log_user_prompt = false` unless your policy explicitly allows storing prompt contents.
  * Periodically audit diffs between local `config.toml` and managed policy to catch drift; managed layers should win over local flags and files.