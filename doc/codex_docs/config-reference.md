---
source: https://developers.openai.com/codex/config-reference
title: Configuration Reference
---

#  Configuration Reference

Complete reference for Codex config.toml keys

Use this page as a searchable reference for `~/.codex/config.toml`. For conceptual guidance and examples, start with [Basic Config](/codex/config-basic) and [Advanced Config](/codex/config-advanced).

## Configuration options

Key| Type / Values| Details
---|---|---
`approval_policy`| `untrusted | on-failure | on-request | never`| Controls when Codex pauses for approval before executing commands.
`chatgpt_base_url`| `string`| Override the base URL used during the ChatGPT login flow.
`experimental_instructions_file`| `string (path)`| Experimental replacement for built-in instructions instead of `AGENTS.md`.
`experimental_use_freeform_apply_patch`| `boolean`| Legacy name for enabling freeform apply_patch; prefer `[features].apply_patch_freeform` or `codex --enable apply_patch_freeform`.
`experimental_use_unified_exec_tool`| `boolean`| Legacy name for enabling unified exec; prefer `[features].unified_exec` or `codex --enable unified_exec`.
`features.apply_patch_freeform`| `boolean`| Expose the freeform `apply_patch` tool (experimental).
`features.elevated_windows_sandbox`| `boolean`| Enable the elevated Windows sandbox pipeline (experimental).
`features.exec_policy`| `boolean`| Enforce exec policy checks for `shell`/`unified_exec` (experimental; on by default).
`features.experimental_windows_sandbox`| `boolean`| Run the Windows restricted-token sandbox (experimental).
`features.parallel`| `boolean`| Allow models that support it to call multiple tools in parallel (stable; on by default).
`features.remote_compaction`| `boolean`| Enable remote compaction (ChatGPT auth only; experimental; on by default).
`features.remote_models`| `boolean`| Refresh remote model list before showing readiness (experimental).
`features.shell_snapshot`| `boolean`| Snapshot shell environment to speed up repeated commands (beta).
`features.shell_tool`| `boolean`| Enable the default `shell` tool for running commands (stable; on by default).
`features.skills`| `boolean`| Enable discovery and injection of skills (experimental; on by default).
`features.unified_exec`| `boolean`| Use the unified PTY-backed exec tool (beta).
`features.view_image_tool`| `boolean`| Allow Codex to attach local images via the `view_image` tool (stable; on by default).
`features.warnings`| `boolean`| Send tool-usage warnings to the model (stable; on by default).
`features.web_search_request`| `boolean`| Allow the model to issue web searches (stable).
`file_opener`| `vscode | vscode-insiders | windsurf | cursor | none`| URI scheme used to open citations from Codex output (default: `vscode`).
`forced_chatgpt_workspace_id`| `string (uuid)`| Limit ChatGPT logins to a specific workspace identifier.
`forced_login_method`| `chatgpt | api`| Restrict Codex to a specific authentication method.
`hide_agent_reasoning`| `boolean`| Suppress reasoning events in both the TUI and `codex exec` output.
`history.max_bytes`| `number`| If set, caps the history file size in bytes by dropping oldest entries.
`history.persistence`| `save-all | none`| Control whether Codex saves session transcripts to history.jsonl.
`include_apply_patch_tool`| `boolean`| Legacy name for enabling freeform apply_patch; prefer `[features].apply_patch_freeform`.
`instructions`| `string`| Reserved for future use; prefer `experimental_instructions_file` or `AGENTS.md`.
`mcp_servers.<id>.args`| `array<string>`| Arguments passed to the MCP stdio server command.
`mcp_servers.<id>.bearer_token_env_var`| `string`| Environment variable sourcing the bearer token for an MCP HTTP server.
`mcp_servers.<id>.command`| `string`| Launcher command for an MCP stdio server.
`mcp_servers.<id>.cwd`| `string`| Working directory for the MCP stdio server process.
`mcp_servers.<id>.disabled_tools`| `array<string>`| Deny list applied after `enabled_tools` for the MCP server.
`mcp_servers.<id>.enabled`| `boolean`| Disable an MCP server without removing its configuration.
`mcp_servers.<id>.enabled_tools`| `array<string>`| Allow list of tool names exposed by the MCP server.
`mcp_servers.<id>.env`| `map<string,string>`| Environment variables forwarded to the MCP stdio server.
`mcp_servers.<id>.env_http_headers`| `map<string,string>`| HTTP headers populated from environment variables for an MCP HTTP server.
`mcp_servers.<id>.env_vars`| `array<string>`| Additional environment variables to whitelist for an MCP stdio server.
`mcp_servers.<id>.http_headers`| `map<string,string>`| Static HTTP headers included with each MCP HTTP request.
`mcp_servers.<id>.startup_timeout_sec`| `number`| Override the default 10s startup timeout for an MCP server.
`mcp_servers.<id>.tool_timeout_sec`| `number`| Override the default 60s per-tool timeout for an MCP server.
`mcp_servers.<id>.url`| `string`| Endpoint for an MCP streamable HTTP server.
`model`| `string`| Model to use (e.g., `gpt-5-codex`).
`model_context_window`| `number`| Context window tokens available to the active model.
`model_provider`| `string`| Provider id from `model_providers` (default: `openai`).
`model_providers.<id>.base_url`| `string`| API base URL for the model provider.
`model_providers.<id>.env_http_headers`| `map<string,string>`| HTTP headers populated from environment variables when present.
`model_providers.<id>.env_key`| `string`| Environment variable supplying the provider API key.
`model_providers.<id>.http_headers`| `map<string,string>`| Static HTTP headers added to provider requests.
`model_providers.<id>.name`| `string`| Display name for a custom model provider.
`model_providers.<id>.query_params`| `map<string,string>`| Extra query parameters appended to provider requests.
`model_providers.<id>.request_max_retries`| `number`| Retry count for HTTP requests to the provider (default: 4).
`model_providers.<id>.requires_openai_auth`| `boolean`| The provider uses OpenAI authentication (defaults to false).
`model_providers.<id>.stream_idle_timeout_ms`| `number`| Idle timeout for SSE streams in milliseconds (default: 300000).
`model_providers.<id>.stream_max_retries`| `number`| Retry count for SSE streaming interruptions (default: 5).
`model_providers.<id>.wire_api`| `chat | responses`| Protocol used by the provider (defaults to `chat` if omitted).
`model_reasoning_effort`| `minimal | low | medium | high | xhigh`| Adjust reasoning effort for supported models (Responses API only; `xhigh` is model-dependent).
`model_reasoning_summary`| `auto | concise | detailed | none`| Select reasoning summary detail or disable summaries entirely.
`model_reasoning_summary_format`| `none | experimental`| Override the format of reasoning summaries (experimental).
`model_supports_reasoning_summaries`| `boolean`| Force Codex to send reasoning metadata even for unknown models.
`model_verbosity`| `low | medium | high`| Control GPT-5 Responses API verbosity (defaults to `medium`).
`notify`| `array<string>`| Command invoked for notifications; receives a JSON payload from Codex.
`otel.environment`| `string`| Environment tag applied to emitted OpenTelemetry events (default: `dev`).
`otel.exporter`| `none | otlp-http | otlp-grpc`| Select the OpenTelemetry exporter and provide any endpoint metadata.
`otel.log_user_prompt`| `boolean`| Opt in to exporting raw user prompts with OpenTelemetry logs.
`profile`| `string`| Default profile applied at startup (equivalent to `--profile`).
`profiles.<name>.*`| `various`| Profile-scoped overrides for any of the supported configuration keys.
`project_doc_fallback_filenames`| `array<string>`| Additional filenames to try when `AGENTS.md` is missing.
`project_doc_max_bytes`| `number`| Maximum bytes read from `AGENTS.md` when building project instructions.
`projects.<path>.trust_level`| `string`| Mark a project or worktree as trusted (only `"trusted"` is recognized).
`sandbox_mode`| `read-only | workspace-write | danger-full-access`| Sandbox policy for filesystem and network access during command execution.
`sandbox_workspace_write.exclude_slash_tmp`| `boolean`| Exclude `/tmp` from writable roots in workspace-write mode.
`sandbox_workspace_write.exclude_tmpdir_env_var`| `boolean`| Exclude `$TMPDIR` from writable roots in workspace-write mode.
`sandbox_workspace_write.network_access`| `boolean`| Allow outbound network access inside the workspace-write sandbox.
`sandbox_workspace_write.writable_roots`| `array<string>`| Additional writable roots when `sandbox_mode = "workspace-write"`.
`shell_environment_policy.exclude`| `array<string>`| Glob patterns for removing environment variables after the defaults.
`shell_environment_policy.ignore_default_excludes`| `boolean`| Keep variables containing KEY/SECRET/TOKEN before other filters run.
`shell_environment_policy.include_only`| `array<string>`| Whitelist of patterns; when set only matching variables are kept.
`shell_environment_policy.inherit`| `all | core | none`| Baseline environment inheritance when spawning subprocesses.
`shell_environment_policy.set`| `map<string,string>`| Explicit environment overrides injected into every subprocess.
`show_raw_agent_reasoning`| `boolean`| Surface raw reasoning content when the active model emits it.
`tui`| `table`| TUI-specific options such as enabling inline desktop notifications.
`tui.notifications`| `boolean | array<string>`| Enable TUI notifications; optionally restrict to specific event types.

Key

`approval_policy`

Type / Values

`untrusted | on-failure | on-request | never`

Details

Controls when Codex pauses for approval before executing commands.

Key

`chatgpt_base_url`

Type / Values

`string`

Details

Override the base URL used during the ChatGPT login flow.

Key

`experimental_instructions_file`

Type / Values

`string (path)`

Details

Experimental replacement for built-in instructions instead of `AGENTS.md`.

Key

`experimental_use_freeform_apply_patch`

Type / Values

`boolean`

Details

Legacy name for enabling freeform apply_patch; prefer `[features].apply_patch_freeform` or `codex --enable apply_patch_freeform`.

Key

`experimental_use_unified_exec_tool`

Type / Values

`boolean`

Details

Legacy name for enabling unified exec; prefer `[features].unified_exec` or `codex --enable unified_exec`.

Key

`features.apply_patch_freeform`

Type / Values

`boolean`

Details

Expose the freeform `apply_patch` tool (experimental).

Key

`features.elevated_windows_sandbox`

Type / Values

`boolean`

Details

Enable the elevated Windows sandbox pipeline (experimental).

Key

`features.exec_policy`

Type / Values

`boolean`

Details

Enforce exec policy checks for `shell`/`unified_exec` (experimental; on by default).

Key

`features.experimental_windows_sandbox`

Type / Values

`boolean`

Details

Run the Windows restricted-token sandbox (experimental).

Key

`features.parallel`

Type / Values

`boolean`

Details

Allow models that support it to call multiple tools in parallel (stable; on by default).

Key

`features.remote_compaction`

Type / Values

`boolean`

Details

Enable remote compaction (ChatGPT auth only; experimental; on by default).

Key

`features.remote_models`

Type / Values

`boolean`

Details

Refresh remote model list before showing readiness (experimental).

Key

`features.shell_snapshot`

Type / Values

`boolean`

Details

Snapshot shell environment to speed up repeated commands (beta).

Key

`features.shell_tool`

Type / Values

`boolean`

Details

Enable the default `shell` tool for running commands (stable; on by default).

Key

`features.skills`

Type / Values

`boolean`

Details

Enable discovery and injection of skills (experimental; on by default).

Key

`features.unified_exec`

Type / Values

`boolean`

Details

Use the unified PTY-backed exec tool (beta).

Key

`features.view_image_tool`

Type / Values

`boolean`

Details

Allow Codex to attach local images via the `view_image` tool (stable; on by default).

Key

`features.warnings`

Type / Values

`boolean`

Details

Send tool-usage warnings to the model (stable; on by default).

Key

`features.web_search_request`

Type / Values

`boolean`

Details

Allow the model to issue web searches (stable).

Key

`file_opener`

Type / Values

`vscode | vscode-insiders | windsurf | cursor | none`

Details

URI scheme used to open citations from Codex output (default: `vscode`).

Key

`forced_chatgpt_workspace_id`

Type / Values

`string (uuid)`

Details

Limit ChatGPT logins to a specific workspace identifier.

Key

`forced_login_method`

Type / Values

`chatgpt | api`

Details

Restrict Codex to a specific authentication method.

Key

`hide_agent_reasoning`

Type / Values

`boolean`

Details

Suppress reasoning events in both the TUI and `codex exec` output.

Key

`history.max_bytes`

Type / Values

`number`

Details

If set, caps the history file size in bytes by dropping oldest entries.

Key

`history.persistence`

Type / Values

`save-all | none`

Details

Control whether Codex saves session transcripts to history.jsonl.

Key

`include_apply_patch_tool`

Type / Values

`boolean`

Details

Legacy name for enabling freeform apply_patch; prefer `[features].apply_patch_freeform`.

Key

`instructions`

Type / Values

`string`

Details

Reserved for future use; prefer `experimental_instructions_file` or `AGENTS.md`.

Key

`mcp_servers.<id>.args`

Type / Values

`array<string>`

Details

Arguments passed to the MCP stdio server command.

Key

`mcp_servers.<id>.bearer_token_env_var`

Type / Values

`string`

Details

Environment variable sourcing the bearer token for an MCP HTTP server.

Key

`mcp_servers.<id>.command`

Type / Values

`string`

Details

Launcher command for an MCP stdio server.

Key

`mcp_servers.<id>.cwd`

Type / Values

`string`

Details

Working directory for the MCP stdio server process.

Key

`mcp_servers.<id>.disabled_tools`

Type / Values

`array<string>`

Details

Deny list applied after `enabled_tools` for the MCP server.

Key

`mcp_servers.<id>.enabled`

Type / Values

`boolean`

Details

Disable an MCP server without removing its configuration.

Key

`mcp_servers.<id>.enabled_tools`

Type / Values

`array<string>`

Details

Allow list of tool names exposed by the MCP server.

Key

`mcp_servers.<id>.env`

Type / Values

`map<string,string>`

Details

Environment variables forwarded to the MCP stdio server.

Key

`mcp_servers.<id>.env_http_headers`

Type / Values

`map<string,string>`

Details

HTTP headers populated from environment variables for an MCP HTTP server.

Key

`mcp_servers.<id>.env_vars`

Type / Values

`array<string>`

Details

Additional environment variables to whitelist for an MCP stdio server.

Key

`mcp_servers.<id>.http_headers`

Type / Values

`map<string,string>`

Details

Static HTTP headers included with each MCP HTTP request.

Key

`mcp_servers.<id>.startup_timeout_sec`

Type / Values

`number`

Details

Override the default 10s startup timeout for an MCP server.

Key

`mcp_servers.<id>.tool_timeout_sec`

Type / Values

`number`

Details

Override the default 60s per-tool timeout for an MCP server.

Key

`mcp_servers.<id>.url`

Type / Values

`string`

Details

Endpoint for an MCP streamable HTTP server.

Key

`model`

Type / Values

`string`

Details

Model to use (e.g., `gpt-5-codex`).

Key

`model_context_window`

Type / Values

`number`

Details

Context window tokens available to the active model.

Key

`model_provider`

Type / Values

`string`

Details

Provider id from `model_providers` (default: `openai`).

Key

`model_providers.<id>.base_url`

Type / Values

`string`

Details

API base URL for the model provider.

Key

`model_providers.<id>.env_http_headers`

Type / Values

`map<string,string>`

Details

HTTP headers populated from environment variables when present.

Key

`model_providers.<id>.env_key`

Type / Values

`string`

Details

Environment variable supplying the provider API key.

Key

`model_providers.<id>.http_headers`

Type / Values

`map<string,string>`

Details

Static HTTP headers added to provider requests.

Key

`model_providers.<id>.name`

Type / Values

`string`

Details

Display name for a custom model provider.

Key

`model_providers.<id>.query_params`

Type / Values

`map<string,string>`

Details

Extra query parameters appended to provider requests.

Key

`model_providers.<id>.request_max_retries`

Type / Values

`number`

Details

Retry count for HTTP requests to the provider (default: 4).

Key

`model_providers.<id>.requires_openai_auth`

Type / Values

`boolean`

Details

The provider uses OpenAI authentication (defaults to false).

Key

`model_providers.<id>.stream_idle_timeout_ms`

Type / Values

`number`

Details

Idle timeout for SSE streams in milliseconds (default: 300000).

Key

`model_providers.<id>.stream_max_retries`

Type / Values

`number`

Details

Retry count for SSE streaming interruptions (default: 5).

Key

`model_providers.<id>.wire_api`

Type / Values

`chat | responses`

Details

Protocol used by the provider (defaults to `chat` if omitted).

Key

`model_reasoning_effort`

Type / Values

`minimal | low | medium | high | xhigh`

Details

Adjust reasoning effort for supported models (Responses API only; `xhigh` is model-dependent).

Key

`model_reasoning_summary`

Type / Values

`auto | concise | detailed | none`

Details

Select reasoning summary detail or disable summaries entirely.

Key

`model_reasoning_summary_format`

Type / Values

`none | experimental`

Details

Override the format of reasoning summaries (experimental).

Key

`model_supports_reasoning_summaries`

Type / Values

`boolean`

Details

Force Codex to send reasoning metadata even for unknown models.

Key

`model_verbosity`

Type / Values

`low | medium | high`

Details

Control GPT-5 Responses API verbosity (defaults to `medium`).

Key

`notify`

Type / Values

`array<string>`

Details

Command invoked for notifications; receives a JSON payload from Codex.

Key

`otel.environment`

Type / Values

`string`

Details

Environment tag applied to emitted OpenTelemetry events (default: `dev`).

Key

`otel.exporter`

Type / Values

`none | otlp-http | otlp-grpc`

Details

Select the OpenTelemetry exporter and provide any endpoint metadata.

Key

`otel.log_user_prompt`

Type / Values

`boolean`

Details

Opt in to exporting raw user prompts with OpenTelemetry logs.

Key

`profile`

Type / Values

`string`

Details

Default profile applied at startup (equivalent to `--profile`).

Key

`profiles.<name>.*`

Type / Values

`various`

Details

Profile-scoped overrides for any of the supported configuration keys.

Key

`project_doc_fallback_filenames`

Type / Values

`array<string>`

Details

Additional filenames to try when `AGENTS.md` is missing.

Key

`project_doc_max_bytes`

Type / Values

`number`

Details

Maximum bytes read from `AGENTS.md` when building project instructions.

Key

`projects.<path>.trust_level`

Type / Values

`string`

Details

Mark a project or worktree as trusted (only `"trusted"` is recognized).

Key

`sandbox_mode`

Type / Values

`read-only | workspace-write | danger-full-access`

Details

Sandbox policy for filesystem and network access during command execution.

Key

`sandbox_workspace_write.exclude_slash_tmp`

Type / Values

`boolean`

Details

Exclude `/tmp` from writable roots in workspace-write mode.

Key

`sandbox_workspace_write.exclude_tmpdir_env_var`

Type / Values

`boolean`

Details

Exclude `$TMPDIR` from writable roots in workspace-write mode.

Key

`sandbox_workspace_write.network_access`

Type / Values

`boolean`

Details

Allow outbound network access inside the workspace-write sandbox.

Key

`sandbox_workspace_write.writable_roots`

Type / Values

`array<string>`

Details

Additional writable roots when `sandbox_mode = "workspace-write"`.

Key

`shell_environment_policy.exclude`

Type / Values

`array<string>`

Details

Glob patterns for removing environment variables after the defaults.

Key

`shell_environment_policy.ignore_default_excludes`

Type / Values

`boolean`

Details

Keep variables containing KEY/SECRET/TOKEN before other filters run.

Key

`shell_environment_policy.include_only`

Type / Values

`array<string>`

Details

Whitelist of patterns; when set only matching variables are kept.

Key

`shell_environment_policy.inherit`

Type / Values

`all | core | none`

Details

Baseline environment inheritance when spawning subprocesses.

Key

`shell_environment_policy.set`

Type / Values

`map<string,string>`

Details

Explicit environment overrides injected into every subprocess.

Key

`show_raw_agent_reasoning`

Type / Values

`boolean`

Details

Surface raw reasoning content when the active model emits it.

Key

`tui`

Type / Values

`table`

Details

TUI-specific options such as enabling inline desktop notifications.

Key

`tui.notifications`

Type / Values

`boolean | array<string>`

Details

Enable TUI notifications; optionally restrict to specific event types.