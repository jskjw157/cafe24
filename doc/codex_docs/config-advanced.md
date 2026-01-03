---
source: https://developers.openai.com/codex/config-advanced
title: Advanced Configuration
---

#  Advanced Configuration

More advanced configuration options for Codex local clients

Use these options when you need more control over providers, policies, and integrations. For a quick start, see [Basic Config](/codex/config-basic).

## Profiles

Profiles let you save named sets of configuration values and switch between them from the CLI.

Profiles are experimental and may change or be removed in future releases.

Profiles are not currently supported in the Codex IDE extension.

Define profiles under `[profiles.<name>]` in `config.toml`, then run `codex --profile <name>`:

    model = "gpt-5-codex"
    approval_policy = "on-request"

    [profiles.deep-review]
    model = "gpt-5-pro"
    model_reasoning_effort = "high"
    approval_policy = "never"

    [profiles.lightweight]
    model = "gpt-4.1"
    approval_policy = "untrusted"

To make a profile the default, add `profile = "deep-review"` at the top level of `config.toml`. Codex loads that profile unless you override it on the command line.

## Custom model providers

A model provider defines how Codex connects to a model (base URL, wire API, and optional HTTP headers).

Define additional providers and point `model_provider` at them:

    model = "gpt-4o"
    model_provider = "openai-chat-completions"

    [model_providers.openai-chat-completions]
    name = "OpenAI using Chat Completions"
    base_url = "https://api.openai.com/v1"
    env_key = "OPENAI_API_KEY"
    wire_api = "chat"
    query_params = {}

    [model_providers.ollama]
    name = "Ollama"
    base_url = "http://localhost:11434/v1"

    [model_providers.mistral]
    name = "Mistral"
    base_url = "https://api.mistral.ai/v1"
    env_key = "MISTRAL_API_KEY"

Add request headers when needed:

    [model_providers.example]
    http_headers = { "X-Example-Header" = "example-value" }
    env_http_headers = { "X-Example-Features" = "EXAMPLE_FEATURES" }

## Azure provider and per-provider tuning

    [model_providers.azure]
    name = "Azure"
    base_url = "https://YOUR_PROJECT_NAME.openai.azure.com/openai"
    env_key = "AZURE_OPENAI_API_KEY"
    query_params = { api-version = "2025-04-01-preview" }
    wire_api = "responses"

    [model_providers.openai]
    request_max_retries = 4
    stream_max_retries = 10
    stream_idle_timeout_ms = 300000

## Model reasoning, verbosity, and limits

    model_reasoning_summary = "none"          # Disable summaries
    model_verbosity = "low"                   # Shorten responses
    model_supports_reasoning_summaries = true # Force reasoning
    model_context_window = 128000             # Context window size

`model_verbosity` applies only to providers using the Responses API. Chat Completions providers will ignore the setting.

## Approval policies and sandbox modes

Pick approval strictness (affects when Codex pauses) and sandbox level (affects file/network access). See [Sandbox & approvals](/codex/security) for deeper examples.

    approval_policy = "untrusted"   # Other options: on-request, on-failure, never
    sandbox_mode = "workspace-write"

    [sandbox_workspace_write]
    exclude_tmpdir_env_var = false  # Allow $TMPDIR
    exclude_slash_tmp = false       # Allow /tmp
    writable_roots = ["/Users/YOU/.pyenv/shims"]
    network_access = false          # Opt in to outbound network

Disable sandboxing entirely (use only if your environment already isolates processes):

    sandbox_mode = "danger-full-access"

For fine-grained rules that control which commands Codex can run outside the sandbox, see [Execution policy rules](/codex/exec-policy).

## Shell environment policy

`shell_environment_policy` controls which environment variables Codex passes to any subprocess it launches (for example, when running a tool-command the model proposes). Start from a clean slate (`inherit = "none"`) or a trimmed set (`inherit = "core"`), then layer on excludes, includes, and overrides to avoid leaking secrets while still providing the paths, keys, or flags your tasks need.

    [shell_environment_policy]
    inherit = "none"
    set = { PATH = "/usr/bin", MY_FLAG = "1" }
    ignore_default_excludes = false
    exclude = ["AWS_*", "AZURE_*"]
    include_only = ["PATH", "HOME"]

Patterns are case-insensitive globs (`*`, `?`, `[A-Z]`); `ignore_default_excludes = false` keeps the automatic KEY/SECRET/TOKEN filter before your includes/excludes run.

## MCP servers

See the dedicated [MCP documentation](/codex/mcp) for full server setups and toggle descriptions. Below is a minimal STDIO example using the Context7 MCP server:

    [mcp_servers.context7]
    command = "npx"
    args = ["-y", "@upstash/context7-mcp"]

## Observability and telemetry

Enable OpenTelemetry (OTel) log export to track Codex runs (API requests, SSE/events, prompts, tool approvals/results). Disabled by default; opt in via `[otel]`:

    [otel]
    environment = "staging"   # defaults to "dev"
    exporter = "none"         # set to otlp-http or otlp-grpc to send events
    log_user_prompt = false   # redact user prompts unless explicitly enabled

Choose an exporter:

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

If `exporter = "none"` Codex records events but sends nothing. Exporters batch asynchronously and flush on shutdown. Event metadata includes service name, CLI version, env tag, conversation id, model, sandbox/approval settings, and per-event fields (see [Config Reference](/codex/config-reference)).

## Notifications

Use `notify` to trigger an external program whenever Codex emits supported events (currently only `agent-turn-complete`). This is handy for desktop toasts, chat webhooks, CI updates, or any side-channel alerting that the built-in TUI notifications don’t cover.

    notify = ["python3", "/path/to/notify.py"]

Example `notify.py` (truncated) that reacts to `agent-turn-complete`:

    #!/usr/bin/env python3
    import json, subprocess, sys

    def main() -> int:
        notification = json.loads(sys.argv[1])
        if notification.get("type") != "agent-turn-complete":
            return 0
        title = f"Codex: {notification.get('last-assistant-message', 'Turn Complete!')}"
        message = " ".join(notification.get("input-messages", []))
        subprocess.check_output([
            "terminal-notifier",
            "-title", title,
            "-message", message,
            "-group", "codex-" + notification.get("thread-id", ""),
            "-activate", "com.googlecode.iterm2",
        ])
        return 0

    if __name__ == "__main__":
        sys.exit(main())

Place the script somewhere on disk and point `notify` to it. For lighter in-terminal alerts, toggle `tui.notifications` instead.