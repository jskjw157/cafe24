---
source: https://developers.openai.com/codex/changelog
title: Codex changelog
---

#  Codex changelog

Latest updates to Codex, OpenAI’s coding agent

December 2025  November 2025  October 2025  September 2025  August 2025  June 2025  May 2025

##  December 2025

  * 2025-12-21

###  Codex CLI 0.77.0

        $ npm install -g @openai/codex@0.77.0

View details

## New Features

    * TUI2: Normalize mouse wheel + trackpad scrolling across terminals; add `tui.scroll_*` config settings (PR [#8357](https://github.com/openai/codex/pull/8357))
    * Add `allowed_sandbox_modes` to `requirements.toml` to constrain permitted sandbox modes (PR [#8298](https://github.com/openai/codex/pull/8298))
    * MCP: OAuth login for streamable HTTP MCP servers no longer requires the `rmcp_client` feature flag (PR [#8087](https://github.com/openai/codex/pull/8087))
    * Improve fuzzy file search display/consistency by centralizing file-name derivation in `codex-file-search` (PR [#8334](https://github.com/openai/codex/pull/8334))
    * Update bundled model metadata (`models.json`) (PR [#8168](https://github.com/openai/codex/pull/8168))

## Bug Fixes

    * Fix `/undo` interacting destructively with git staging / ghost commits (PR [#8303](https://github.com/openai/codex/pull/8303))
    * TUI2: Reduce redundant redraws while scrolling transcripts (PR [#8295](https://github.com/openai/codex/pull/8295))
    * Docs: Fix link to `contributing.md` in `experimental.md` (PR [#8311](https://github.com/openai/codex/pull/8311))

Full Changelog: [`rust-v0.76.0...rust-v0.77.0`](https://github.com/openai/codex/compare/rust-v0.76.0...rust-v0.77.0)

Changelog (PRs merged in this tag range)

    * [#8374](https://github.com/openai/codex/pull/8374) Remove plan from system skills: [#8374](https://github.com/openai/codex/pull/8374)
    * [#8357](https://github.com/openai/codex/pull/8357) TUI2 scroll normalization + config knobs: [#8357](https://github.com/openai/codex/pull/8357)
    * [#8353](https://github.com/openai/codex/pull/8353) Thread config loading now receives cwd (internal plumbing): [#8353](https://github.com/openai/codex/pull/8353)
    * [#8346](https://github.com/openai/codex/pull/8346) Rename “OpenAI models” to “models manager” (internal refactor): [#8346](https://github.com/openai/codex/pull/8346)
    * [#8345](https://github.com/openai/codex/pull/8345) Bump cargo-deny-action version (CI): [#8345](https://github.com/openai/codex/pull/8345)
    * [#8334](https://github.com/openai/codex/pull/8334) Move file-name derivation into codex-file-search: [#8334](https://github.com/openai/codex/pull/8334)
    * [#8333](https://github.com/openai/codex/pull/8333) Enable resume_warning suite module (test coverage / wiring fix): [#8333](https://github.com/openai/codex/pull/8333)
    * [#8330](https://github.com/openai/codex/pull/8330) Make ConstraintError an enum (more structured errors): [#8330](https://github.com/openai/codex/pull/8330)
    * [#8303](https://github.com/openai/codex/pull/8303) Fix /undo staging interaction: [#8303](https://github.com/openai/codex/pull/8303)
    * [#8298](https://github.com/openai/codex/pull/8298) Add allowed_sandbox_modes in requirements.toml: [#8298](https://github.com/openai/codex/pull/8298)
    * [#8295](https://github.com/openai/codex/pull/8295) Coalesce transcript scroll redraws (TUI2 performance): [#8295](https://github.com/openai/codex/pull/8295)
    * [#8168](https://github.com/openai/codex/pull/8168) Update models.json: [#8168](https://github.com/openai/codex/pull/8168)
    * [#8087](https://github.com/openai/codex/pull/8087) Remove rmcp_client feature flag usage (no longer needed for OAuth login): [#8087](https://github.com/openai/codex/pull/8087)
    * [#8311](https://github.com/openai/codex/pull/8311) Fix docs link in experimental.md: [#8311](https://github.com/openai/codex/pull/8311)

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.77.0)

  * 2025-12-19

###  Agent skills in Codex

Codex now supports **agent skills** : reusable bundles of instructions (plus optional scripts and resources) that help Codex reliably complete specific tasks.

Skills are available in both the Codex CLI and IDE extensions.

You can invoke a skill explicitly by typing `$skill-name` (for example, `$skill-installer` or the experimental `$create-plan` skill after installing it), or let Codex select a skill automatically based on your prompt.

Learn more in the [skills documentation](/codex/skills).

#### Folder-based standard (agentskills.io)

Following the open [agent skills specification](https://agentskills.io/specification), a skill is a folder with a required `SKILL.md` and optional supporting files:

        my-skill/
          SKILL.md       # Required: instructions + metadata
          scripts/       # Optional: executable code
          references/    # Optional: documentation
          assets/        # Optional: templates, resources

#### Install skills per-user or per-repo

You can install skills for just yourself in `~/.codex/skills`, or for everyone on a project by checking them into `.codex/skills` in the repository.

Codex also ships with a few built-in system skills to get started, including `$skill-creator` and `$skill-installer`. The `$create-plan` skill is experimental and needs to be installed (for example: `$skill-installer install https://github.com/openai/skills/tree/main/skills/.experimental/create-plan`).

#### Curated skills directory

Codex ships with a [small curated set of skills](https://github.com/openai/skills) inspired by popular workflows at OpenAI. Install them with `$skill-installer`, and expect more over time.

  * 2025-12-19

###  Codex CLI 0.76.0

        $ npm install -g @openai/codex@0.76.0

View details

### New Features

    * Add a macOS DMG build target (PR [#8207](https://github.com/openai/codex/pull/8207))
    * Improve terminal detection metadata for per-terminal scroll tuning (PR [#8252](https://github.com/openai/codex/pull/8252))
    * UI tweaks on the skills popup (PR [#8250](https://github.com/openai/codex/pull/8250))
    * TUI search cell rendering improvements (PR [#8273](https://github.com/openai/codex/pull/8273))
    * Add /ps command (PR [#8279](https://github.com/openai/codex/pull/8279))
    * Add support for /etc/codex/requirements.toml on UNIX (PR [#8277](https://github.com/openai/codex/pull/8277))
    * Support shortDescription for skills (PR [#8278](https://github.com/openai/codex/pull/8278), PR [#8301](https://github.com/openai/codex/pull/8301))
    * Add model list UI (PR [#8286](https://github.com/openai/codex/pull/8286))
    * Add app-server v2 deprecation notice event (PR [#8285](https://github.com/openai/codex/pull/8285))
    * Introduce ExternalSandbox policy (PR [#8290](https://github.com/openai/codex/pull/8290))
    * Skills default on (PR [#8297](https://github.com/openai/codex/pull/8297))
    * Support admin-scoped skills (PR [#8296](https://github.com/openai/codex/pull/8296))
    * Update bundled system skills (PR [#8253](https://github.com/openai/codex/pull/8253), PR [#8328](https://github.com/openai/codex/pull/8328))
    * Set exclude default to true in app server (PR [#8281](https://github.com/openai/codex/pull/8281))

### Bug Fixes

    * Ensure pipes work in restricted sandbox tokens (PR [#8280](https://github.com/openai/codex/pull/8280))
    * Grant read ACL to the command-runner directory earlier (PR [#8275](https://github.com/openai/codex/pull/8275))
    * Fix duplicate shell_snapshot FeatureSpec regression (PR [#8274](https://github.com/openai/codex/pull/8274))
    * Fix sandbox-state update ordering by switching to request (PR [#8142](https://github.com/openai/codex/pull/8142))

### PRs Merged

    * [#8328](https://github.com/openai/codex/pull/8328) Update system skills from OSS repo
    * [#8325](https://github.com/openai/codex/pull/8325) Revert "Keep skills feature flag default OFF for windows."
    * [#8308](https://github.com/openai/codex/pull/8308) Keep skills feature flag default OFF for windows.
    * [#8305](https://github.com/openai/codex/pull/8305) Fix admin skills.
    * [#8301](https://github.com/openai/codex/pull/8301) Add short descriptions to system skills
    * [#8299](https://github.com/openai/codex/pull/8299) Fix tests
    * [#8297](https://github.com/openai/codex/pull/8297) skills feature default on.
    * [#8296](https://github.com/openai/codex/pull/8296) Support admin scope skills.
    * [#8290](https://github.com/openai/codex/pull/8290) feat: introduce ExternalSandbox policy
    * [#8288](https://github.com/openai/codex/pull/8288) chore: upgrade rmcp crate from 0.10.0 to 0.12.0
    * [#8286](https://github.com/openai/codex/pull/8286) model list
    * [#8285](https://github.com/openai/codex/pull/8285) feat(app-server): add v2 deprecation notice
    * [#8282](https://github.com/openai/codex/pull/8282) fix: flaky tests 5
    * [#8281](https://github.com/openai/codex/pull/8281) Set exclude to true by default in app server
    * [#8280](https://github.com/openai/codex/pull/8280) add a default dacl to restricted token to enable reading of pipes
    * [#8279](https://github.com/openai/codex/pull/8279) feat: add /ps
    * [#8278](https://github.com/openai/codex/pull/8278) Support skills shortDescription.
    * [#8277](https://github.com/openai/codex/pull/8277) feat: add support for /etc/codex/requirements.toml on UNIX
    * [#8276](https://github.com/openai/codex/pull/8276) chore: migrate from Config::load_from_base_config_with_overrides to ConfigBuilder
    * [#8275](https://github.com/openai/codex/pull/8275) grant read ACL to exe directory first so we can call the command runner
    * [#8274](https://github.com/openai/codex/pull/8274) fix: remove duplicate shell_snapshot FeatureSpec
    * [#8273](https://github.com/openai/codex/pull/8273) tui: improve rendering of search cell
    * [#8271](https://github.com/openai/codex/pull/8271) use mainline version as baseline in ci
    * [#8257](https://github.com/openai/codex/pull/8257) feat: collapse "waiting" of unified_exec
    * [#8253](https://github.com/openai/codex/pull/8253) Update system skills bundled with codex-rs
    * [#8252](https://github.com/openai/codex/pull/8252) Terminal Detection Metadata for Per-Terminal Scroll Scaling
    * [#8250](https://github.com/openai/codex/pull/8250) UI tweaks on skills popup.
    * [#8207](https://github.com/openai/codex/pull/8207) [release] Add a dmg target for MacOS
    * [#8142](https://github.com/openai/codex/pull/8142) fix: change codex/sandbox-state/update from a notification to a request

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.76.0)

  * 2025-12-18

###  Introducing GPT-5.2-Codex

[Today we are releasing GPT-5.2-Codex](http://www.openai.com/index/gpt-5-2-codex), the most advanced agentic coding model yet for complex, real-world software engineering.

GPT-5.2-Codex is a version of [GPT-5.2](https://openai.com/index/introducing-gpt-5-2/) further optimized for agentic coding in Codex, including improvements on long-horizon work through context compaction, stronger performance on large code changes like refactors and migrations, improved performance in Windows environments, and significantly stronger cybersecurity capabilities.

Starting today, the CLI and IDE Extension will default to `gpt-5.2-codex` for users who are signed in with ChatGPT. API access for the model will come soon.

If you have a model specified in your [`config.toml` configuration file](/codex/local-config), you can instead try out `gpt-5.2-codex` for a new Codex CLI session using:

        codex --model gpt-5.2-codex

You can also use the `/model` slash command in the CLI. In the Codex IDE Extension you can select GPT-5.2-Codex from the dropdown menu.

If you want to switch for all sessions, you can change your default model to `gpt-5.2-codex` by updating your `config.toml` [configuration file](/codex/local-config):

        model = "gpt-5.2-codex”

  * 2025-12-18

###  Codex CLI 0.75.0

        $ npm install -g @openai/codex@0.75.0

View details

### PRs Merged

[#8270](https://github.com/openai/codex/pull/8270) — splash screen
[#8251](https://github.com/openai/codex/pull/8251) — migrate to new constraint-based loading strategy
[#7460](https://github.com/openai/codex/pull/7460) — cloud: default to current branch in cloud exec

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.75.0)

  * 2025-12-18

###  Codex CLI 0.74.0

        $ npm install -g @openai/codex@0.74.0

View details

### Highlights

    * Introducing gpt-5.2-codex our latest frontier model with improvements across knowledge, reasoning and coding. [Learn more](https://openai.com/index/introducing-gpt-5-2-codex)
    * Add new slash command `/experimental` for trying out `experimental` features
    * Ghost snapshot warning disable toggle ([#8178](https://github.com/openai/codex/pull/8178))
    * UI polish (background terminals, picker cleanup) ([#8255](https://github.com/openai/codex/pull/8255), [#8232](https://github.com/openai/codex/pull/8232)).

### PRs Merged

    * [#8266](https://github.com/openai/codex/pull/8266) feat: add name to beta features
    * [#8265](https://github.com/openai/codex/pull/8265) caribou
    * [#8264](https://github.com/openai/codex/pull/8264) docs: clarify codex resume --all (CWD column & filtering)
    * [#8255](https://github.com/openai/codex/pull/8255) nit: ui background terminals
    * [#8249](https://github.com/openai/codex/pull/8249) chore: prefer AsRef to &Path
    * [#8248](https://github.com/openai/codex/pull/8248) chore: simplify loading of Mac-specific logic in config_loader
    * [#8244](https://github.com/openai/codex/pull/8244) Reintroduce feature flags for skills.
    * [#8243](https://github.com/openai/codex/pull/8243) Make loading malformed skills fail-open
    * [#8235](https://github.com/openai/codex/pull/8235) fix: introduce ConfigBuilder
    * [#8232](https://github.com/openai/codex/pull/8232) chores: clean picker
    * [#8228](https://github.com/openai/codex/pull/8228) Show migration link
    * [#8226](https://github.com/openai/codex/pull/8226) chore: cleanup Config instantiation codepaths
    * [#8221](https://github.com/openai/codex/pull/8221) Change “Team” to “Buisness” and add Education
    * [#8220](https://github.com/openai/codex/pull/8220) Support SYSTEM skills.
    * [#8216](https://github.com/openai/codex/pull/8216) speed and reliability improvements for setting reads ACLs
    * [#8209](https://github.com/openai/codex/pull/8209) feat: model picker
    * [#8205](https://github.com/openai/codex/pull/8205) fix: PathBuf -> AbsolutePathBuf in ConfigToml struct
    * [#8203](https://github.com/openai/codex/pull/8203) download new windows binaries when staging npm package
    * [#8201](https://github.com/openai/codex/pull/8201) chore: add beta features
    * [#8199](https://github.com/openai/codex/pull/8199) chore: move back stuff out of beta program
    * [#8198](https://github.com/openai/codex/pull/8198) feat: make list_models non-blocking
    * [#8196](https://github.com/openai/codex/pull/8196) fix: session downgrade
    * [#8194](https://github.com/openai/codex/pull/8194) fix: proper skills dir cleanup
    * [#8186](https://github.com/openai/codex/pull/8186) nit: doc
    * [#8182](https://github.com/openai/codex/pull/8182) nit: drop dead branch with unified_exec tool
    * [#8181](https://github.com/openai/codex/pull/8181) nit: prevent race in event rendering
    * [#8178](https://github.com/openai/codex/pull/8178) feat: add config to disable warnings around ghost snapshot
    * [#8175](https://github.com/openai/codex/pull/8175) fix: flaky test 6
    * [#8163](https://github.com/openai/codex/pull/8163) fix the models script
    * [#8153](https://github.com/openai/codex/pull/8153) Load models from static file
    * [#8152](https://github.com/openai/codex/pull/8152) [app-server] add new RawResponseItem v2 event
    * [#8151](https://github.com/openai/codex/pull/8151) chore: update listMcpServerStatus to be non-blocking
    * [#8149](https://github.com/openai/codex/pull/8149) Add user_agent header
    * [#8141](https://github.com/openai/codex/pull/8141) chore(apply-patch) unicode scenario
    * [#8140](https://github.com/openai/codex/pull/8140) include new windows binaries in npm package.
    * [#8127](https://github.com/openai/codex/pull/8127) Revert “chore: review in read-only ([#7593](https://github.com/openai/codex/pull/7593))”
    * [#8124](https://github.com/openai/codex/pull/8124) fix tui2 compile error
    * [#8122](https://github.com/openai/codex/pull/8122) docs: refine tui2 viewport roadmap
    * [#8118](https://github.com/openai/codex/pull/8118) Add a workflow for a hardcoded version of models
    * [#8117](https://github.com/openai/codex/pull/8117) feat: unified exec footer
    * [#8114](https://github.com/openai/codex/pull/8114) chore: update listMcpServers to listMcpServerStatus
    * [#8111](https://github.com/openai/codex/pull/8111) chore(apply-patch) move invocation tests
    * [#8109](https://github.com/openai/codex/pull/8109) Revert “feat: unified exec footer”
    * [#8108](https://github.com/openai/codex/pull/8108) feat(sdk): add xhigh reasoning effort support to TypeScript SDK
    * [#8102](https://github.com/openai/codex/pull/8102) Upgrade GitHub Actions for Node 24 compatibility
    * [#8098](https://github.com/openai/codex/pull/8098) Add public skills + improve repo skill discovery and error UX
    * [#8095](https://github.com/openai/codex/pull/8095) feat: change ConfigLayerName into a disjoint union rather than a simple enum
    * [#8094](https://github.com/openai/codex/pull/8094) bug fixes and perf improvements for elevated sandbox setup
    * [#8089](https://github.com/openai/codex/pull/8089) refactor(tui2): make transcript line metadata explicit
    * [#8088](https://github.com/openai/codex/pull/8088) feat: if .codex is a sub-folder of a writable root, then make it read-only to the sandbox
    * [#8086](https://github.com/openai/codex/pull/8086) chore(app-server): remove stubbed thread/compact API
    * [#8085](https://github.com/openai/codex/pull/8085) chore: mac codesign refactor
    * [#8084](https://github.com/openai/codex/pull/8084) chore(ci): drop Homebrew origin/main workaround for macOS runners
    * [#8079](https://github.com/openai/codex/pull/8079) docs: fix gpt-5.2 typo in config.md
    * [#8077](https://github.com/openai/codex/pull/8077) better name for windows sandbox features
    * [#8075](https://github.com/openai/codex/pull/8075) feat: fallback unified_exec to shell_command
    * [#8071](https://github.com/openai/codex/pull/8071) feat: experimental menu
    * [#8067](https://github.com/openai/codex/pull/8067) feat: unified exec footer
    * [#8060](https://github.com/openai/codex/pull/8060) feat: do not compact on last user turn
    * [#8057](https://github.com/openai/codex/pull/8057) chore: dedup review result duplication
    * [#8053](https://github.com/openai/codex/pull/8053) nit: trace span for regular task
    * [#8052](https://github.com/openai/codex/pull/8052) feat: close unified_exec at end of turn
    * [#8020](https://github.com/openai/codex/pull/8020) Fixes mcp elicitation test that fails for me when run locally
    * [#8004](https://github.com/openai/codex/pull/8004) Fix: Detect Bun global install via path check
    * [#8000](https://github.com/openai/codex/pull/8000) Fixed resume matching to respect case insensitivity when using WSL mount points
    * [#7997](https://github.com/openai/codex/pull/7997) feat: merge remote models instead of destructing
    * [#7969](https://github.com/openai/codex/pull/7969) Fix: Skip Option<()> schema generation to avoid invalid Windows filenames ([#7479](https://github.com/openai/codex/issues/7479))
    * [#7961](https://github.com/openai/codex/pull/7961) refactor TUI event loop to enable dropping + recreating crossterm event stream
    * [#7956](https://github.com/openai/codex/pull/7956) fix parallel tool calls
    * [#7935](https://github.com/openai/codex/pull/7935) exec-server: additional context for errors
    * [#7931](https://github.com/openai/codex/pull/7931) chore: persist comments in edit
    * [#7791](https://github.com/openai/codex/pull/7791) chore(shell_command) fix freeform timeout output
    * [#7778](https://github.com/openai/codex/pull/7778) feat: Constrain values for approval_policy
    * [#7601](https://github.com/openai/codex/pull/7601) WIP: Rework TUI viewport, history printing, and selection/copy

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.74.0)

  * 2025-12-15

###  Codex CLI 0.73.0

        $ npm install -g @openai/codex@0.73.0

View details

## New Features

    * Add ghost snapshot v2 for improved session capture (PR [#8055](https://github.com/openai/codex/pull/8055))
    * Support ghost commits in config (PR [#7873](https://github.com/openai/codex/pull/7873))
    * Reimplement skills loading via SkillsManager and skills/list for consistent discovery (PR
[#7914](https://github.com/openai/codex/pull/7914))
    * Add OpenTelemetry tracing for Codex (PR [#7844](https://github.com/openai/codex/pull/7844))

## Bug Fixes

    * Prevent panic when session contains a tool call without an output (PR [#8048](https://github.com/openai/codex/pull/8048))
    * Avoid triggering keybindings view on input bursts (PR [#7980](https://github.com/openai/codex/pull/7980))
    * Change default wrap algorithm from OptimalFit to FirstFit (PR [#7960](https://github.com/openai/codex/pull/7960))
    * Introduce AbsolutePathBuf as part of sandbox config (PR [#7856](https://github.com/openai/codex/pull/7856))
    * Include Error in log messages (PR [#7955](https://github.com/openai/codex/pull/7955))

## PRs Merged

    * [#8076](https://github.com/openai/codex/pull/8076) stage new windows sandbox binaries as artifacts
    * [#8069](https://github.com/openai/codex/pull/8069) Fixed formatting issue
    * [#8066](https://github.com/openai/codex/pull/8066) Update config.md
    * [#8055](https://github.com/openai/codex/pull/8055) feat: ghost snapshot v2
    * [#7873](https://github.com/openai/codex/pull/7873) feat: config ghost commits
    * [#7980](https://github.com/openai/codex/pull/7980) fix: Don't trigger keybindings view on input burst
    * [#8045](https://github.com/openai/codex/pull/8045) chore(deps): bump lru from 0.12.5 to 0.16.2 in /codex-rs
    * [#8043](https://github.com/openai/codex/pull/8043) chore(deps): bump sentry from 0.34.0 to 0.46.0 in /codex-rs
    * [#8039](https://github.com/openai/codex/pull/8039) chore(deps): bump actions/cache from 4 to 5
    * [#8037](https://github.com/openai/codex/pull/8037) chore(deps): bump actions/download-artifact from 4 to 7
    * [#8048](https://github.com/openai/codex/pull/8048) Do not panic when session contains a tool call without an output
    * [#8046](https://github.com/openai/codex/pull/8046) chore(deps): bump socket2 from 0.6.0 to 0.6.1 in /codex-rs
    * [#8038](https://github.com/openai/codex/pull/8038) chore(deps): bump actions/upload-artifact from 5 to 6
    * [#8047](https://github.com/openai/codex/pull/8047) chore: fix tooltip typos and align tone
    * [#8024](https://github.com/openai/codex/pull/8024) docs: document enabling experimental skills
    * [#7914](https://github.com/openai/codex/pull/7914) Reimplement skills loading using SkillsManager + skills/list op.
    * [#7962](https://github.com/openai/codex/pull/7962) docs: update the docs for @openai/codex-shell-tool-mcp
    * [#7960](https://github.com/openai/codex/pull/7960) Changed default wrap algorithm from OptimalFit to FirstFit
    * [#7965](https://github.com/openai/codex/pull/7965) Sync tui2 with tui and keep dual-run glue
    * [#7844](https://github.com/openai/codex/pull/7844) [codex] add otel tracing
    * [#7957](https://github.com/openai/codex/pull/7957) docs: remove blanket ban on unsigned integers
    * [#7955](https://github.com/openai/codex/pull/7955) fix: include Error in log message
    * [#7954](https://github.com/openai/codex/pull/7954) fix: added test helpers for platform-specific paths
    * [#7856](https://github.com/openai/codex/pull/7856) fix: introduce AbsolutePathBuf as part of sandbox config

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.73.0)

  * 2025-12-13

###  Codex CLI 0.72.0

        $ npm install -g @openai/codex@0.72.0

View details

# Highlights

    * Config API cleanup ([#7924](https://github.com/openai/codex/pull/7924)): new config API and cleaner config loading flow.
    * Remote compact for API-key users ([#7835](https://github.com/openai/codex/pull/7835)): enable remote compacting in key-based sessions.
    * MCP and TUI status visibility ([#7828](https://github.com/openai/codex/pull/7828), [#7907](https://github.com/openai/codex/pull/7907)): restore MCP startup progress messages in the TUI and use latest disk values
for server status.
    * Windows and PowerShell quality-of-life ([#7607](https://github.com/openai/codex/pull/7607), [#7893](https://github.com/openai/codex/pull/7893), [#7942](https://github.com/openai/codex/pull/7942), [#7137](https://github.com/openai/codex/pull/7137)): locate pwsh/powershell reliably, parse PowerShell with
PowerShell, sign additional Windows executables, and fix WSL2 toasts.
    * Sandbox and safety updates ([#7809](https://github.com/openai/codex/pull/7809), [#7889](https://github.com/openai/codex/pull/7889), [#7728](https://github.com/openai/codex/pull/7728)): Elevated Sandbox 3/4 plus expanded safe command list.
    * Model/prompt UX for gpt-5.2 ([#7934](https://github.com/openai/codex/pull/7934), [#7910](https://github.com/openai/codex/pull/7910), [#7874](https://github.com/openai/codex/pull/7874), [#7911](https://github.com/openai/codex/pull/7911)): prompt updates and clearer xhigh reasoning warnings/docs.

# PRs Merged

    * fix cargo build switch [#7948](https://github.com/openai/codex/pull/7948) @[iceweasel-oai]
    * fix: restore MCP startup progress messages in TUI (fixes [#7827](https://github.com/openai/codex/issues/7827)) [#7828](https://github.com/openai/codex/pull/7828) @[ivanmurashko]
    * support 1p [#7945](https://github.com/openai/codex/pull/7945) @[aibrahim-oai]
    * Sign two additional exes for Windows [#7942](https://github.com/openai/codex/pull/7942) @[iceweasel-oai]
    * fix: use PowerShell to parse PowerShell [#7607](https://github.com/openai/codex/pull/7607) @[bolinfest]
    * chore(prompt) Update base prompt [#7943](https://github.com/openai/codex/pull/7943) @[dylan-hurd-oai]
    * Elevated Sandbox 4 [#7889](https://github.com/openai/codex/pull/7889) @[iceweasel-oai]
    * chore(prompt) Remove truncation details [#7941](https://github.com/openai/codex/pull/7941) @[dylan-hurd-oai]
    * feat: clean config loading and config api [#7924](https://github.com/openai/codex/pull/7924) @[jif-oai]
    * chores: models manager [#7937](https://github.com/openai/codex/pull/7937) @[aibrahim-oai]
    * Remote compact for API-key users [#7835](https://github.com/openai/codex/pull/7835) @[pakrym-oai]
    * chore(gpt-5.2) prompt update [#7934](https://github.com/openai/codex/pull/7934) @[dylan-hurd-oai]
    * fix: race on rx subscription [#7921](https://github.com/openai/codex/pull/7921) @[jif-oai]
    * fix: break tui [#7876](https://github.com/openai/codex/pull/7876) @[jif-oai]
    * feat: more safe commands [#7728](https://github.com/openai/codex/pull/7728) @[jif-oai]
    * fix(tui): show xhigh reasoning warning for gpt-5.2 [#7910](https://github.com/openai/codex/pull/7910) @[voctory]
    * Make skill name and description limit based on characters not byte counts [#7915](https://github.com/openai/codex/pull/7915) @[etraut-openai]
    * feat: introduce utilities for locating pwsh.exe and powershell.exe [#7893](https://github.com/openai/codex/pull/7893) @[bolinfest]
    * docs: clarify xhigh reasoning effort on gpt-5.2 [#7911](https://github.com/openai/codex/pull/7911) @[voctory]
    * feat: use latest disk value for mcp servers status [#7907](https://github.com/openai/codex/pull/7907) @[shijie-oai]
    * Revert "fix(apply-patch): preserve CRLF line endings on Windows" [#7903](https://github.com/openai/codex/pull/7903) @[dylan-hurd-oai]
    * Make migration screen dynamic [#7896](https://github.com/openai/codex/pull/7896) @[aibrahim-oai]
    * Fix misleading 'maximize' high effort description on xhigh models [#7874](https://github.com/openai/codex/pull/7874) @[voctory]
    * Added deprecation notice for "chat" wire_api [#7897](https://github.com/openai/codex/pull/7897) @[etraut-openai]
    * Fix toasts on Windows under WSL 2 [#7137](https://github.com/openai/codex/pull/7137) @[dank-openai]
    * fix: policy/_.codexpolicy - > rules/_.rules [#7888](https://github.com/openai/codex/pull/7888) @[bolinfest]
    * Update RMCP client config guidance [#7895](https://github.com/openai/codex/pull/7895) @[nornagon-openai]
    * Update Model Info [#7853](https://github.com/openai/codex/pull/7853) @[aibrahim-oai]
    * Elevated Sandbox 3 [#7809](https://github.com/openai/codex/pull/7809) @[iceweasel-oai]
    * remove release script [#7885](https://github.com/openai/codex/pull/7885) @[aibrahim-oai]
    * Chore: limit find family visability [#7891](https://github.com/openai/codex/pull/7891) @[aibrahim-oai]
    * fix: omit reasoning summary when ReasoningSummary::None [#7845](https://github.com/openai/codex/pull/7845) @[apanasenko-oai]
    * fix: drop stale filedescriptor output hash for nix [#7865](https://github.com/openai/codex/pull/7865) @[tyleranton]
    * fix: dont quit on 'q' in onboarding ApiKeyEntry state [#7869](https://github.com/openai/codex/pull/7869) @[sayan-oai]

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.72.0)

  * 2025-12-11

###  Codex CLI 0.71.0

        $ npm install -g @openai/codex@0.71.0

View details

### Highlights

    * Introducing gpt-5.2 our latest frontier model with improvements across knowledge, reasoning and coding. [Learn More](https://openai.com/index/introducing-gpt-5-2/)

### PRs Merged

[#7838](https://github.com/openai/codex/pull/7838) Show the default model in model picker [@aibrahim-oai](https://github.com/aibrahim-oai)
[#7833](https://github.com/openai/codex/pull/7833) feat(tui2): copy tui crate and normalize snapshots [@joshka-oai](https://github.com/joshka-oai)
[#7509](https://github.com/openai/codex/pull/7509) fix: thread/list returning fewer than the requested amount due to filtering CXA-293 [@JaviSoto](https://github.com/JaviSoto)
[#7832](https://github.com/openai/codex/pull/7832) fix: ensure accept_elicitation_for_prompt_rule() test passes locally [@bolinfest](https://github.com/bolinfest)
[#7847](https://github.com/openai/codex/pull/7847) fixing typo in execpolicy docs [@zhao-oai](https://github.com/zhao-oai)
[#7831](https://github.com/openai/codex/pull/7831) [app-server] make app server not throw error when login id is not found [@celia-oai](https://github.com/celia-oai)
[#7848](https://github.com/openai/codex/pull/7848) fix: add a hopefully-temporary sleep to reduce test flakiness [@bolinfest](https://github.com/bolinfest)
[#7850](https://github.com/openai/codex/pull/7850) [app-server] Update readme to include mcp endpoints [@celia-oai](https://github.com/celia-oai)
[#7851](https://github.com/openai/codex/pull/7851) fix: remove inaccurate #[allow(dead_code)] marker [@bolinfest](https://github.com/bolinfest)
[#7859](https://github.com/openai/codex/pull/7859) Fixed regression that broke fuzzy matching for slash commands [@etraut-openai](https://github.com/etraut-openai)
[#7854](https://github.com/openai/codex/pull/7854) Only show Worked for after the final assistant message [@pakrym-oai](https://github.com/pakrym-oai)
[#7792](https://github.com/openai/codex/pull/7792) Elevated Sandbox 2 [@iceweasel-oai](https://github.com/iceweasel-oai)
[#7855](https://github.com/openai/codex/pull/7855) fix(stuff) [@dylan-hurd-oai](https://github.com/dylan-hurd-oai)
[#7870](https://github.com/openai/codex/pull/7870) feat: warning for long snapshots [@jif-oai](https://github.com/jif-oai)
[#7786](https://github.com/openai/codex/pull/7786) feat: add shell snapshot for shell command [@jif-oai](https://github.com/jif-oai)
[#7875](https://github.com/openai/codex/pull/7875) fix: flaky tests 4 [@jif-oai](https://github.com/jif-oai)
[#7882](https://github.com/openai/codex/pull/7882) feat: robin [@aibrahim-oai](https://github.com/aibrahim-oai)
[#7884](https://github.com/openai/codex/pull/7884) Revert “Only show Worked for after the final assistant message” [@pakrym-oai](https://github.com/pakrym-oai)

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.71.0)

  * 2025-12-10

###  Codex CLI 0.69.0

        $ npm install -g @openai/codex@0.69.0

View details

### Highlights

    * Skills: Explicit skill selections now inject SKILL.md content into the turn; skills load once per session and warn if a file
can’t be read ([#7763](https://github.com/openai/codex/pull/7763)).
    * Config API: config/read is fully typed; config writes preserve comments/order; model is optional to match real configs ([#7658](https://github.com/openai/codex/pull/7658),
[#7789](https://github.com/openai/codex/pull/7789), [#7769](https://github.com/openai/codex/pull/7769)).
    * TUI/UX: Log files drop ANSI codes; vim navigation for option selection and transcript pager; transcript continuity fix; slash-
command popup no longer triggers on invalid input; experimental tui2 frontend behind a flag ([#7836](https://github.com/openai/codex/pull/7836), [#7784](https://github.com/openai/codex/pull/7784), [#7550](https://github.com/openai/codex/pull/7550), [#7363](https://github.com/openai/codex/pull/7363),
[#7704](https://github.com/openai/codex/pull/7704), [#7793](https://github.com/openai/codex/pull/7793)).
    * Exec & sandbox: Shell snapshotting, reworked unified-exec events, elevated sandbox allowances (sendmsg/recvmsg), clearer rate-
limit warnings, better request-id logging, and safer escalations ([#7641](https://github.com/openai/codex/pull/7641), [#7775](https://github.com/openai/codex/pull/7775), [#7788](https://github.com/openai/codex/pull/7788), [#7779](https://github.com/openai/codex/pull/7779), [#7795](https://github.com/openai/codex/pull/7795), [#7830](https://github.com/openai/codex/pull/7830), [#7750](https://github.com/openai/codex/pull/7750)).
    * Platform/auth/build: MCP in-session login, remote-branch review support, Windows signing toggles, ConPty vendoring, Nix hash
fixes, and safer release guardrails ([#7751](https://github.com/openai/codex/pull/7751), [#7813](https://github.com/openai/codex/pull/7813), [#7757](https://github.com/openai/codex/pull/7757)/[#7804](https://github.com/openai/codex/pull/7804)/[#7806](https://github.com/openai/codex/pull/7806), [#7656](https://github.com/openai/codex/pull/7656), [#7762](https://github.com/openai/codex/pull/7762), [#7834](https://github.com/openai/codex/pull/7834)).
    * Misc fixes: Unsupported images error cleanly, absolute config paths, parallel test stability, duplicated feature spec removal,
experimental-model prompt/tools, and more ([#7478](https://github.com/openai/codex/pull/7478), [#7796](https://github.com/openai/codex/pull/7796), [#7589](https://github.com/openai/codex/pull/7589), [#7818](https://github.com/openai/codex/pull/7818), [#7826](https://github.com/openai/codex/pull/7826), [#7823](https://github.com/openai/codex/pull/7823), [#7765](https://github.com/openai/codex/pull/7765)).

### PRs Merged

    * [#7836](https://github.com/openai/codex/pull/7836) Disable ansi codes in TUI log file
    * [#7834](https://github.com/openai/codex/pull/7834) Error when trying to push a release while another release is in progress
    * [#7830](https://github.com/openai/codex/pull/7830) Remove conversation_id and bring back request ID logging
    * [#7826](https://github.com/openai/codex/pull/7826) fix: flaky tests 3
    * [#7823](https://github.com/openai/codex/pull/7823) fix: remove duplicated parallel FeatureSpec
    * [#7818](https://github.com/openai/codex/pull/7818) fix: flaky test 2
    * [#7817](https://github.com/openai/codex/pull/7817) fix: Upgrade @modelcontextprotocol/sdk to ^1.24.0
    * [#7813](https://github.com/openai/codex/pull/7813) feat: use remote branch for review is local trails
    * [#7807](https://github.com/openai/codex/pull/7807) chore: disable trusted signing pkg cache hit
    * [#7806](https://github.com/openai/codex/pull/7806) Revert "Revert "feat: windows codesign with Azure trusted signing""
    * [#7804](https://github.com/openai/codex/pull/7804) Revert "feat: windows codesign with Azure trusted signing"
    * [#7799](https://github.com/openai/codex/pull/7799) Removed experimental "command risk assessment" feature
    * [#7797](https://github.com/openai/codex/pull/7797) parse rg | head a search
    * [#7796](https://github.com/openai/codex/pull/7796) fix: introduce AbsolutePathBuf and resolve relative paths in config.toml
    * [#7795](https://github.com/openai/codex/pull/7795) Express rate limit warning as % remaining
    * [#7793](https://github.com/openai/codex/pull/7793) feat(tui2): add feature-flagged tui2 frontend
    * [#7789](https://github.com/openai/codex/pull/7789) [app-server] Preserve comments & order in config writes
    * [#7788](https://github.com/openai/codex/pull/7788) Elevated Sandbox 1
    * [#7787](https://github.com/openai/codex/pull/7787) fix more typos in execpolicy.md
    * [#7784](https://github.com/openai/codex/pull/7784) Add vim-style navigation for CLI option selection
    * [#7779](https://github.com/openai/codex/pull/7779) allow sendmsg/recvmsg syscalls in Linux sandbox
    * [#7775](https://github.com/openai/codex/pull/7775) chore: rework unified exec events
    * [#7769](https://github.com/openai/codex/pull/7769) make model optional in config
    * [#7765](https://github.com/openai/codex/pull/7765) Use codex-max prompt/tools for experimental models
    * [#7763](https://github.com/openai/codex/pull/7763) Inject SKILL.md when it’s explicitly mentioned
    * [#7762](https://github.com/openai/codex/pull/7762) Fix Nix cargo output hashes for rmcp and filedescriptor
    * [#7757](https://github.com/openai/codex/pull/7757) Revert "Revert "feat: windows codesign with Azure trusted signing""
    * [#7756](https://github.com/openai/codex/pull/7756) Vendor ConPtySystem
    * [#7751](https://github.com/openai/codex/pull/7751) feat: support mcp in-session login
    * [#7750](https://github.com/openai/codex/pull/7750) refactor with_escalated_permissions to use SandboxPermissions
    * [#7704](https://github.com/openai/codex/pull/7704) fix: Prevent slash command popup from activating on invalid inputs
    * [#7658](https://github.com/openai/codex/pull/7658) [app-server-protocol] Add types for config
    * [#7641](https://github.com/openai/codex/pull/7641) feat: shell snapshotting
    * [#7589](https://github.com/openai/codex/pull/7589) chore: enable parallel tc
    * [#7550](https://github.com/openai/codex/pull/7550) Add vim navigation keys to transcript pager
    * [#7478](https://github.com/openai/codex/pull/7478) Fix: gracefully error out for unsupported images
    * [#7363](https://github.com/openai/codex/pull/7363) Fix transcript pager page continuity
    * [#7779](https://github.com/openai/codex/pull/7779) allow sendmsg/recvmsg syscalls in Linux sandbox (already listed; ensure single entry)
    * [#7788](https://github.com/openai/codex/pull/7788) Elevated Sandbox 1 (already listed)
    * [#7784](https://github.com/openai/codex/pull/7784) Add vim-style navigation for CLI option selection (already listed)
    * [#7807](https://github.com/openai/codex/pull/7807)/7806/7804 Windows signing toggles (grouped above)

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.69.0)

  * 2025-12-09

###  Codex CLI 0.66.0

        $ npm install -g @openai/codex@0.66.0

View details

### Highlights

    * Execpolicy: TUI can whitelist command prefixes after an approval, sandbox denials propose an amendment you can accept, shell MCP now runs execpolicy so MCP tools follow the same rules, and
fallback checks inspect each pipeline segment so unsafe tails (e.g., | rm -rf) are still caught ([#7033](https://github.com/openai/codex/pull/7033), [#7543](https://github.com/openai/codex/pull/7543), [#7609](https://github.com/openai/codex/pull/7609), [#7653](https://github.com/openai/codex/pull/7653), [#7544](https://github.com/openai/codex/pull/7544)).
    * Unified exec & shell stability: status line shows clearer progress, Windows unified-exec crash fixed, long commands wrap without breaking layout, and SSE/session cleanup reduces stuck or
dangling sessions after tool calls ([#7563](https://github.com/openai/codex/pull/7563), [#7620](https://github.com/openai/codex/pull/7620), [#7655](https://github.com/openai/codex/pull/7655), [#7594](https://github.com/openai/codex/pull/7594), [#7592](https://github.com/openai/codex/pull/7592)).
    * TUI updates: cross-platform shortcut handling is consistent (Ctrl+N/P and list selection now work everywhere), so navigation matches between overlays, lists, and text areas ([#7583](https://github.com/openai/codex/pull/7583), [#7629](https://github.com/openai/codex/pull/7629)).
    * Apply-patch: Windows CRLF line endings are preserved, new e2e scenarios cover more patch shapes, and Windows-specific test coverage reduces regressions in patch flows ([#7515](https://github.com/openai/codex/pull/7515), [#7567](https://github.com/openai/codex/pull/7567), [#7554](https://github.com/openai/codex/pull/7554)). Thanks to [@cnaples79](https://github.com/cnaples79) who contributed the [core part](https://github.com/openai/codex/pull/4017) of this fix!
    * Cloud exec: codex cloud exec accepts --branch for remote runs and now exposes status/diff/apply flows so you can inspect and apply changes from the cloud path ([#7602](https://github.com/openai/codex/pull/7602), [#7614](https://github.com/openai/codex/pull/7614)).
    * Signing: Linux artifacts are signed via sigstore. ([#7674](https://github.com/openai/codex/pull/7674)).
    * General fixes: parallel tool-call chat now returns correctly, ghost snapshot tokens aren’t billed, missing tool names no longer crash the litellm proxy, and migration prompts use HTTPS links
([#7634](https://github.com/openai/codex/pull/7634), [#7638](https://github.com/openai/codex/pull/7638), [#7724](https://github.com/openai/codex/pull/7724), [#7705](https://github.com/openai/codex/pull/7705)).

### PRs Merged

    * [#6793](https://github.com/openai/codex/pull/6793) FIX: WSL Paste image does not work [@Waxime64](https://github.com/Waxime64)
    * [#6846](https://github.com/openai/codex/pull/6846) feat(core) Add login to shell_command tool [@dylan-hurd-oai](https://github.com/dylan-hurd-oai)
    * [#6918](https://github.com/openai/codex/pull/6918) Add Enterprise plan to ChatGPT login description [@ae-openai](https://github.com/ae-openai)
    * [#7033](https://github.com/openai/codex/pull/7033) whitelist command prefix integration in core and tui [@zhao-oai](https://github.com/zhao-oai)
    * [#7310](https://github.com/openai/codex/pull/7310) Inline response recording and remove process_items indirection [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7515](https://github.com/openai/codex/pull/7515) fix(apply-patch): preserve CRLF line endings on Windows [@dylan-hurd-oai](https://github.com/dylan-hurd-oai)
    * [#7543](https://github.com/openai/codex/pull/7543) execpolicy tui flow [@zhao-oai](https://github.com/zhao-oai)
    * [#7544](https://github.com/openai/codex/pull/7544) Refactor execpolicy fallback evaluation [@zhao-oai](https://github.com/zhao-oai)
    * [#7547](https://github.com/openai/codex/pull/7547) Use shared check sandboxing [@pakrym-oai](https://github.com/pakrym-oai)
    * [#7554](https://github.com/openai/codex/pull/7554) chore(core): test apply_patch_cli on Windows [@dylan-hurd-oai](https://github.com/dylan-hurd-oai)
    * [#7561](https://github.com/openai/codex/pull/7561) Do not emit start/end events for write stdin [@pakrym-oai](https://github.com/pakrym-oai)
    * [#7563](https://github.com/openai/codex/pull/7563) Slightly better status display for unified exec [@pakrym-oai](https://github.com/pakrym-oai)
    * [#7567](https://github.com/openai/codex/pull/7567) chore(apply-patch) scenarios for e2e testing [@dylan-hurd-oai](https://github.com/dylan-hurd-oai)
    * [#7571](https://github.com/openai/codex/pull/7571) remove model_family from `config [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7580](https://github.com/openai/codex/pull/7580) feat: update sandbox policy to allow TTY [@jif-oai](https://github.com/jif-oai)
    * [#7583](https://github.com/openai/codex/pull/7583) Fix handle_shortcut_overlay_key for cross-platform consistency [@448523760](https://github.com/448523760)
    * [#7588](https://github.com/openai/codex/pull/7588) chore: default warning messages to true [@jif-oai](https://github.com/jif-oai)
    * [#7591](https://github.com/openai/codex/pull/7591) chore: tool tip for /prompt [@jif-oai](https://github.com/jif-oai)
    * [#7592](https://github.com/openai/codex/pull/7592) fix: release session ID when not used [@jif-oai](https://github.com/jif-oai)
    * [#7593](https://github.com/openai/codex/pull/7593) chore: review in read-only [@jif-oai](https://github.com/jif-oai)
    * [#7594](https://github.com/openai/codex/pull/7594) fix: sse for chat [@jif-oai](https://github.com/jif-oai)
    * [#7595](https://github.com/openai/codex/pull/7595) Update execpolicy.md [@zhao-oai](https://github.com/zhao-oai)
    * [#7602](https://github.com/openai/codex/pull/7602) add --branch to codex cloud exec [@nornagon-openai](https://github.com/nornagon-openai)
    * [#7603](https://github.com/openai/codex/pull/7603) Add models endpoint [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7605](https://github.com/openai/codex/pull/7605) fix(app-server): add duration_ms to McpToolCallItem [@owenlin0](https://github.com/owenlin0)
    * [#7609](https://github.com/openai/codex/pull/7609) feat: exec policy integration in shell mcp [@zhao-oai](https://github.com/zhao-oai)
    * [#7610](https://github.com/openai/codex/pull/7610) fix: taking plan type from usage endpoint instead of thru auth token [@zhao-oai](https://github.com/zhao-oai)
    * [#7611](https://github.com/openai/codex/pull/7611) fix(app-server): add will_retry to ErrorNotification [@owenlin0](https://github.com/owenlin0)
    * [#7614](https://github.com/openai/codex/pull/7614) cloud: status, diff, apply [@nornagon-openai](https://github.com/nornagon-openai)
    * [#7615](https://github.com/openai/codex/pull/7615) chore: refactor to move Arc concern outside exec_policy_for [@bolinfest](https://github.com/bolinfest)
    * [#7616](https://github.com/openai/codex/pull/7616) Call models endpoint in models manager [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7617](https://github.com/openai/codex/pull/7617) fix: add integration tests for codex-exec-mcp-server with execpolicy [@bolinfest](https://github.com/bolinfest)
    * [#7620](https://github.com/openai/codex/pull/7620) Fix unified_exec on windows [@pakrym](https://github.com/pakrym)
    * [#7621](https://github.com/openai/codex/pull/7621) Wire with_remote_overrides to construct model families [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7626](https://github.com/openai/codex/pull/7626) fix typo [@zhao-oai](https://github.com/zhao-oai)
    * [#7629](https://github.com/openai/codex/pull/7629) fix(tui): add missing Ctrl+n/Ctrl+p support to ListSelectionView [@pppp606](https://github.com/pppp606)
    * [#7634](https://github.com/openai/codex/pull/7634) fix: chat completion with parallel tool call [@jif-oai](https://github.com/jif-oai)
    * [#7638](https://github.com/openai/codex/pull/7638) fix: ignore ghost snapshots in token consumption [@jif-oai](https://github.com/jif-oai)
    * [#7645](https://github.com/openai/codex/pull/7645) Also load skills from repo root. [@xl-openai](https://github.com/xl-openai)
    * [#7648](https://github.com/openai/codex/pull/7648) Add remote models feature flag [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7651](https://github.com/openai/codex/pull/7651) fix: OTEL HTTP exporter panic and mTLS support [@asm89](https://github.com/asm89)
    * [#7652](https://github.com/openai/codex/pull/7652) Move justfile to repository root [@joshka-oai](https://github.com/joshka-oai)
    * [#7653](https://github.com/openai/codex/pull/7653) proposing execpolicy amendment when prompting due to sandbox denial [@zhao-oai](https://github.com/zhao-oai)
    * [#7654](https://github.com/openai/codex/pull/7654) fix: exec-server stream was erroring for large requests [@bolinfest](https://github.com/bolinfest)
    * [#7655](https://github.com/openai/codex/pull/7655) fix wrap behavior for long commands [@zhao-oai](https://github.com/zhao-oai)
    * [#7660](https://github.com/openai/codex/pull/7660) Restore status header after stream recovery [@joshka-oai](https://github.com/joshka-oai)
    * [#7665](https://github.com/openai/codex/pull/7665) docs: fix documentation of rmcp client flag [@JaySabva](https://github.com/JaySabva)
    * [#7669](https://github.com/openai/codex/pull/7669) fix(doc): TOML otel exporter example — multi-line inline table is invalid [@448523760](https://github.com/448523760)
    * [#7672](https://github.com/openai/codex/pull/7672) docs: Remove experimental_use_rmcp_client from config [@JaySabva](https://github.com/JaySabva)
    * [#7673](https://github.com/openai/codex/pull/7673) docs: point dev checks to just [@voctory](https://github.com/voctory)
    * [#7674](https://github.com/openai/codex/pull/7674) feat: linux codesign with sigstore [@shijie-oai](https://github.com/shijie-oai)
    * [#7675](https://github.com/openai/codex/pull/7675) feat: windows codesign with Azure trusted signing [@shijie-oai](https://github.com/shijie-oai)
    * [#7678](https://github.com/openai/codex/pull/7678) fix: clear out space on ubuntu runners before running Rust tests [@bolinfest](https://github.com/bolinfest)
    * [#7680](https://github.com/openai/codex/pull/7680) fix: ensure macOS CI runners for Rust tests include recent Homebrew fixes [@bolinfest](https://github.com/bolinfest)
    * [#7685](https://github.com/openai/codex/pull/7685) fix: refine the warning message and docs for deprecated tools config [@gameofby](https://github.com/gameofby)
    * [#7705](https://github.com/openai/codex/pull/7705) fix: update URLs to use HTTPS in model migration prompts [@rakleed](https://github.com/rakleed)
    * [#7709](https://github.com/openai/codex/pull/7709) Enhance model picker [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7711](https://github.com/openai/codex/pull/7711) Add formatting client version to the x.x.x style. [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7713](https://github.com/openai/codex/pull/7713) chore(deps): bump ts-rs from 11.0.1 to 11.1.0 in /codex-rs [@dependabot](https://github.com/dependabot)[bot]
    * [#7714](https://github.com/openai/codex/pull/7714) chore(deps): bump derive_more from 2.0.1 to 2.1.0 in /codex-rs [@dependabot](https://github.com/dependabot)[bot]
    * [#7715](https://github.com/openai/codex/pull/7715) chore(deps): bump insta from 1.43.2 to 1.44.3 in /codex-rs [@dependabot](https://github.com/dependabot)[bot]
    * [#7716](https://github.com/openai/codex/pull/7716) chore(deps): bump wildmatch from 2.5.0 to 2.6.1 in /codex-rs [@dependabot](https://github.com/dependabot)[bot]
    * [#7722](https://github.com/openai/codex/pull/7722) load models from disk and set a ttl and etag [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7724](https://github.com/openai/codex/pull/7724) Fixed regression for chat endpoint; missing tools name caused litellm proxy to crash [@etraut-openai](https://github.com/etraut-openai)
    * [#7729](https://github.com/openai/codex/pull/7729) feat: add is-mutating detection for shell command handler [@jif-oai](https://github.com/jif-oai)
    * [#7745](https://github.com/openai/codex/pull/7745) Make the device auth instructions more clear. [@mzeng-openai](https://github.com/mzeng-openai)
    * [#7747](https://github.com/openai/codex/pull/7747) updating app server types to support execpoilcy amendment [@zhao-oai](https://github.com/zhao-oai)
    * [#7748](https://github.com/openai/codex/pull/7748) Remove legacy ModelInfo and merge it with ModelFamily [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7749](https://github.com/openai/codex/pull/7749) fix: pre-main hardening logic must tolerate non-UTF-8 env vars [@bolinfest](https://github.com/bolinfest)
    * [#7753](https://github.com/openai/codex/pull/7753) Revert "feat: windows codesign with Azure trusted signing" [@shijie-oai](https://github.com/shijie-oai)
    * [#7754](https://github.com/openai/codex/pull/7754) override instructions using ModelInfo [@aibrahim-oai](https://github.com/aibrahim-oai)
    * [#7756](https://github.com/openai/codex/pull/7756) use chatgpt provider for /models [@aibrahim-oai](https://github.com/aibrahim-oai)

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.66.0)

  * 2025-12-04

###  Introducing Codex for Linear

Assign or mention @Codex in an issue to kick-off a Codex cloud task. As Codex works, it posts updates back to Linear, providing a link to the completed task so you can review, open a PR, or keep working.

To learn more about how to connect Codex to Linear both locally through MCP and through the new integration, check out the [Codex for Linear documentation](/codex/integrations/linear).

  * 2025-12-04

###  Codex CLI 0.65.0

        $ npm install -g @openai/codex@0.65.0

View details

### Highlights

    * Codex Max as default ([#7566](https://github.com/openai/codex/pull/7566)): Codex Max is now the default model, and a TUI panic related to async-in-sync code was fixed.
    * Better resume UX ([#7302](https://github.com/openai/codex/pull/7302), [#7303](https://github.com/openai/codex/pull/7303)): Added a /resume slash command and improved resume performance so picking work back up is snappier.
    * Tooltips & tips UX ([#7557](https://github.com/openai/codex/pull/7557), [#7440](https://github.com/openai/codex/pull/7440)): Tips/tooltips are rendered via markdown with a bold “Tip” label and richer Codex tooltips across the app.
    * TUI quality-of-life ([#7530](https://github.com/openai/codex/pull/7530), [#7448](https://github.com/openai/codex/pull/7448), [#7514](https://github.com/openai/codex/pull/7514), [#7461](https://github.com/openai/codex/pull/7461)): TUI gets Ctrl‑P/N navigation, screen-line-capped shell output, restored Windows clipboard image paste, and a refactor for cleaner layout.
    * History and context hygiene ([#6242](https://github.com/openai/codex/pull/6242), [#7483](https://github.com/openai/codex/pull/7483), [#7545](https://github.com/openai/codex/pull/7545), [#7431](https://github.com/openai/codex/pull/7431), [#7483](https://github.com/openai/codex/pull/7483)): history.jsonl is trimmed by history.max_bytes, common junk dirs (incl. **pycache**) are ignored by default, and paste placeholders stay distinct.

# PRs Merged

    * use markdown for rendering tips [#7557](https://github.com/openai/codex/pull/7557) @[Jeremy Rose]
    * Migrate codex max [#7566](https://github.com/openai/codex/pull/7566) @[Ahmed Ibrahim]
    * Remove test from [#7481](https://github.com/openai/codex/pull/7481) that doesn't add much value [#7558](https://github.com/openai/codex/pull/7558) @[Eric Traut]
    * [app-server] make `file_path` for config optional [#7560](https://github.com/openai/codex/pull/7560) @[Celia Chen]
    * Migrate model family to models manager [#7565](https://github.com/openai/codex/pull/7565) @[Ahmed Ibrahim]
    * Migrate `tui` to use models manager [#7555](https://github.com/openai/codex/pull/7555) @[Ahmed Ibrahim]
    * Introduce `ModelsManager` and migrate `app-server` to use it. [#7552](https://github.com/openai/codex/pull/7552) @[Ahmed Ibrahim]
    * fix: wrap long exec lines in transcript overlay [#7481](https://github.com/openai/codex/pull/7481) @[muyuanjin]
    * fix: Features should be immutable over the lifetime of a session/thread [#7540](https://github.com/openai/codex/pull/7540) @[Michael Bolin]
    * feat: Support listing and selecting skills via $ or /skills [#7506](https://github.com/openai/codex/pull/7506) @[xl-openai]
    * [app-server] fix: add thread_id to turn/plan/updated [#7553](https://github.com/openai/codex/pull/7553) @[Owen Lin]
    * feat(tui): map Ctrl-P/N to arrow navigation in textarea [#7530](https://github.com/openai/codex/pull/7530) @[Aofei Sheng]
    * fix(tui): limit user shell output by screen lines [#7448](https://github.com/openai/codex/pull/7448) @[muyuanjin]
    * Migrate model preset [#7542](https://github.com/openai/codex/pull/7542) @[Ahmed Ibrahim]
    * fix: main [#7546](https://github.com/openai/codex/pull/7546) @[jif-oai]
    * feat: add pycache to excluded directories [#7545](https://github.com/openai/codex/pull/7545) @[jif-oai]
    * chore: update unified exec sandboxing detection [#7541](https://github.com/openai/codex/pull/7541) @[jif-oai]
    * add slash resume [#7302](https://github.com/openai/codex/pull/7302) @[Ahmed Ibrahim]
    * chore: conversation_id -> thread_id in app-server feedback/upload [#7538](https://github.com/openai/codex/pull/7538) @[Owen Lin]
    * chore: delete unused TodoList item from app-server [#7537](https://github.com/openai/codex/pull/7537) @[Owen Lin]
    * chore: update app-server README [#7510](https://github.com/openai/codex/pull/7510) @[Owen Lin]
    * chore: remove bun env var detect [#7534](https://github.com/openai/codex/pull/7534) @[Shijie Rao]
    * feat: support list mcp servers in app server [#7505](https://github.com/openai/codex/pull/7505) @[Shijie Rao]
    * seatbelt: allow openpty() [#7507](https://github.com/openai/codex/pull/7507) @[Jeremy Rose]
    * feat: codex tool tips [#7440](https://github.com/openai/codex/pull/7440) @[jif-oai]
    * feat: retroactive image placeholder to prevent poisoning [#6774](https://github.com/openai/codex/pull/6774) @[jif-oai]
    * feat: model warning in case of apply patch [#7494](https://github.com/openai/codex/pull/7494) @[jif-oai]
    * fix(tui) Support image paste from clipboard on native Windows [#7514](https://github.com/openai/codex/pull/7514) @[Dylan Hurd]
    * fix(unified_exec): use platform default shell when unified_exec shell… [#7486](https://github.com/openai/codex/pull/7486) @[Robby He]
    * Update device code auth strings. [#7498](https://github.com/openai/codex/pull/7498) @[Matthew Zeng]
    * fix: inline function marked as dead code [#7508](https://github.com/openai/codex/pull/7508) @[Michael Bolin]
    * improve resume performance [#7303](https://github.com/openai/codex/pull/7303) @[Ahmed Ibrahim]
    * fix: path resolution bug in npx [#7134](https://github.com/openai/codex/pull/7134) @[Michael Bolin]
    * Ensure duplicate-length paste placeholders stay distinct [#7431](https://github.com/openai/codex/pull/7431) @[Joshua Sutton]
    * feat: support --version flag for @openai/codex-shell-tool-mcp [#7504](https://github.com/openai/codex/pull/7504) @[Michael Bolin]
    * refactor: tui.rs extract several pieces [#7461](https://github.com/openai/codex/pull/7461) @[Josh McKinney]
    * chore: make create_approval_requirement_for_command an async fn [#7501](https://github.com/openai/codex/pull/7501) @[Michael Bolin]
    * Trim `history.jsonl` when `history.max_bytes` is set [#6242](https://github.com/openai/codex/pull/6242) @[liam]
    * fix: remove serde(flatten) annotation for TurnError [#7499](https://github.com/openai/codex/pull/7499) @[Owen Lin]
    * persisting credits if new snapshot does not contain credit info [#7490](https://github.com/openai/codex/pull/7490) @[zhao-oai]
    * fix: drop lock once it is no longer needed [#7500](https://github.com/openai/codex/pull/7500) @[Michael Bolin]
    * execpolicy helpers [#7032](https://github.com/openai/codex/pull/7032) @[zhao-oai]
    * Show token used when context window is unknown [#7497](https://github.com/openai/codex/pull/7497) @[Ahmed Ibrahim]
    * Use non-blocking mutex [#7467](https://github.com/openai/codex/pull/7467) @[Ahmed Ibrahim]
    * Fix: track only untracked paths in ghost snapshots [#7470](https://github.com/openai/codex/pull/7470) @[lionel-oai]
    * feat: ignore standard directories [#7483](https://github.com/openai/codex/pull/7483) @[jif-oai]
    * fix: add ts number annotations for app-server v2 types [#7492](https://github.com/openai/codex/pull/7492) @[Owen Lin]
    * feat: intercept apply_patch for unified_exec [#7446](https://github.com/openai/codex/pull/7446) @[jif-oai]
    * chore: remove mention of experimental/unstable from app-server README [#7474](https://github.com/openai/codex/pull/7474) @[Owen Lin]
    * Add request logging back [#7471](https://github.com/openai/codex/pull/7471) @[pakrym-oai]
    * feat: add one off commands to app-server v2 [#7452](https://github.com/openai/codex/pull/7452) @[jif-oai]
    * feat: add warning message for the model [#7445](https://github.com/openai/codex/pull/7445) @[jif-oai]
    * chore: review everywhere [#7444](https://github.com/openai/codex/pull/7444) @[jif-oai]
    * feat: alias compaction [#7442](https://github.com/openai/codex/pull/7442) @[jif-oai]
    * feat: experimental support for skills.md [#7412](https://github.com/openai/codex/pull/7412) @[Thibault Sottiaux]

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.65.0)

  * 2025-12-02

###  Codex CLI 0.64.0

        $ npm install -g @openai/codex@0.64.0

View details

## Features

    * Threads and turns now include git info, current working directory, CLI version, source metadata, and propagate thread and turn IDs on every item and error. They emit new notifications for diffs, plan updates, token-usage changes, and compaction events. File-change items provide output deltas, and ImageView items render images inline.
    * Review flow is enhanced with a detached review mode, explicit enter and exit events, review thread IDs, and review history remains visible after rollout filtering changes.
    * Execution gains an experimental “exp” model, unified exec pruning to limit session bloat, per-run custom environment injection, policy-approved command bypass, and Windows protections that flag risky browser or URL launches. History lookup now works on Windows and WSL, and model selection honors use_model.
    * Safety defaults improve via consolidated world-writable scanning and workspace-write enforcement of read-only .git directories. Sandbox assessment and approval flows align with trust policies.
    * MCP and shell tooling add shell-tool MCP login support, explicit capability declaration, sandbox awareness, publication to npm, and MCP elicitations. The rmcp client is upgraded to 0.10.0 for modern notifications.
    * Observability increases as command items expose process IDs and threads and turns emit token-usage and compaction events. Feedback metadata captures source information.
    * Tooling and ops gain follow-up v2 in the app-server test client, new config management utilities, and refreshed approvals documentation and quickstart placement.

## Bug fixes

    * PowerShell apply_patch parsing is corrected, and apply_patch tests now cover shell_command behavior.
    * Sandbox assessment regression is fixed, policy-approved commands are honored, dangerous-command checks are tightened on Windows, and workspace-write enforces .git read-only.
    * MCP startup tolerates missing type fields, stream error messages are clarified, and rmcp nix output hash issues are resolved.
    * Delegate cancellation no longer hangs unified exec, early-exit sessions are cleaned up, and duplicate “waited” renderings are suppressed.
    * recent_commits with limit zero now returns zero, and the NetBSD process-hardening build is unblocked.
    * Review rollout filtering is disabled so history shows, approval presets respect workspace-write, /approvals trust detection is corrected, and sandbox command assessment edge cases are fixed.
    * Compaction accounts for encrypted reasoning, handles token budgets accurately, and emits reliable token-usage and compaction events.
    * TTY stdin is required, WSL clipboard paths are normalized, and stale conversations are dropped on /new to avoid conflicts.
    * Custom prompt expansion with large pastes is fixed, example-config mistakes are corrected, and relative links and streamable_shell references are cleaned up. Upgrade messaging is corrected.
    * Windows sandbox treats <workspace_root>/.git as read-only, and risky browser launches are flagged before execution.
    * CLA allowlist now includes dependabot variants, and enterprises can skip upgrade checks and messages.
    * Flaky tests are stabilized, session recycling is improved, and rollout session initialization surfaces errors for diagnosis.

## Maintenance

    * Security and CI add cargo-audit and cargo-deny. GitHub Actions are updated to checkout v6 and upload-artifact v5. macOS 13 builds are dropped. A flaky Ubuntu variant is skipped. The next_minor_version script now resets the patch number correctly.
    * Dependencies are updated: libc 0.2.177, webbrowser 1.0.6, regex 1.12.2, toml_edit 0.23.5, arboard 3.6.1, serde_with 3.16.1, image 0.25.9, reqwest 0.12.24, tracing 0.1.43, and rmcp 0.10.0.
    * Documentation is refreshed: approvals and config guidance, codex max and xhigh defaults, example-config fixes, CLA guidance, and removal of streamable_shell references.

## PRs Merged

    * fix(scripts) next_minor_version should reset patch number by [@dylan-hurd-oai](https://github.com/dylan-hurd-oai) in [#7050](https://github.com/openai/codex/pull/7050)
    * [app-server] feat: expose gitInfo/cwd/etc. on Thread by [@owenlin0](https://github.com/owenlin0) in [#7060](https://github.com/openai/codex/pull/7060)
    * feat: Add exp model to experiment with the tools by [@aibrahim-oai](https://github.com/aibrahim-oai) in [#7115](https://github.com/openai/codex/pull/7115)
    * enable unified exec for experiments by [@aibrahim-oai](https://github.com/aibrahim-oai) in [#7118](https://github.com/openai/codex/pull/7118)
    * [app-server] doc: approvals by [@owenlin0](https://github.com/owenlin0) in [#7105](https://github.com/openai/codex/pull/7105)
    * Windows: flag some invocations that launch browsers/URLs as dangerous by [@iceweasel-oai](https://github.com/iceweasel-oai) in [#7111](https://github.com/openai/codex/pull/7111)
    * Use use_model by [@pakrym-oai](https://github.com/pakrym-oai) in [#7121](https://github.com/openai/codex/pull/7121)
    * feat: support login as an option on shell-tool-mcp by [@bolinfest](https://github.com/bolinfest) in [#7120](https://github.com/openai/codex/pull/7120)
    * fix(tui): Fail when stdin is not a terminal by [@joshka-oai](https://github.com/joshka-oai) in [#6382](https://github.com/openai/codex/pull/6382)
    * support MCP elicitations by [@nornagon-openai](https://github.com/nornagon-openai) in [#6947](https://github.com/openai/codex/pull/6947)
    * refactor: inline sandbox type lookup in process_exec_tool_call by [@bolinfest](https://github.com/bolinfest) in [#7122](https://github.com/openai/codex/pull/7122)
    * bypass sandbox for policy approved commands by [@zhao-oai](https://github.com/zhao-oai) in [#7110](https://github.com/openai/codex/pull/7110)
    * fix: start publishing @openai/codex-shell-tool-mcp to npm by [@bolinfest](https://github.com/bolinfest) in [#7123](https://github.com/openai/codex/pull/7123)
    * feat: declare server capability in shell-tool-mcp by [@bolinfest](https://github.com/bolinfest) in [#7112](https://github.com/openai/codex/pull/7112)
    * move execpolicy quickstart by [@zhao-oai](https://github.com/zhao-oai) in [#7127](https://github.com/openai/codex/pull/7127)
    * Account for encrypted reasoning for auto compaction by [@aibrahim-oai](https://github.com/aibrahim-oai) in [#7113](https://github.com/openai/codex/pull/7113)
    * chore: use proxy for encrypted summary by [@jif-oai](https://github.com/jif-oai) in [#7252](https://github.com/openai/codex/pull/7252)
    * fix: codex delegate cancellation by [@jif-oai](https://github.com/jif-oai) in [#7092](https://github.com/openai/codex/pull/7092)
    * feat: unified exec basic pruning strategy by [@jif-oai](https://github.com/jif-oai) in [#7239](https://github.com/openai/codex/pull/7239)
    * consolidate world-writable-directories scanning. by [@iceweasel-oai](https://github.com/iceweasel-oai) in [#7234](https://github.com/openai/codex/pull/7234)
    * fix: flaky test by [@jif-oai](https://github.com/jif-oai) in [#7257](https://github.com/openai/codex/pull/7257)
    * [feedback] Add source info into feedback metadata. by [@mzeng-openai](https://github.com/mzeng-openai) in [#7140](https://github.com/openai/codex/pull/7140)
    * fix(windows) support apply_patch parsing in powershell by [@dylan-hurd-oai](https://github.com/dylan-hurd-oai) in [#7221](https://github.com/openai/codex/pull/7221)
    * chore(deps): bump regex from 1.11.1 to 1.12.2 in /codex-rs by [@dependabot](https://github.com/dependabot)[bot] in [#7222](https://github.com/openai/codex/pull/7222)
    * chore(deps): bump toml_edit from 0.23.4 to 0.23.5 in /codex-rs by [@dependabot](https://github.com/dependabot)[bot] in [#7223](https://github.com/openai/codex/pull/7223)
    * chore(deps): bump actions/upload-artifact from 4 to 5 by [@dependabot](https://github.com/dependabot)[bot] in [#7229](https://github.com/openai/codex/pull/7229)
    * chore(deps): bump actions/checkout from 5 to 6 by [@dependabot](https://github.com/dependabot)[bot] in [#7230](https://github.com/openai/codex/pull/7230)
    * fix: Fix build process-hardening build on NetBSD by [@0-wiz-0](https://github.com/0-wiz-0) in [#7238](https://github.com/openai/codex/pull/7238)
    * Removed streamable_shell from docs by [@etraut-openai](https://github.com/etraut-openai) in [#7235](https://github.com/openai/codex/pull/7235)
    * chore(deps): bump libc from 0.2.175 to 0.2.177 in /codex-rs by [@dependabot](https://github.com/dependabot)[bot] in [#7224](https://github.com/openai/codex/pull/7224)
    * chore(deps): bump webbrowser from 1.0.5 to 1.0.6 in /codex-rs by [@dependabot](https://github.com/dependabot)[bot] in [#7225](https://github.com/openai/codex/pull/7225)
    * Added alternate form of dependabot to CLA allow list by [@etraut-openai](https://github.com/etraut-openai) in [#7260](https://github.com/openai/codex/pull/7260)
    * Allow enterprises to skip upgrade checks and messages by [@gpeal](https://github.com/gpeal) in [#7213](https://github.com/openai/codex/pull/7213)
    * fix: custom prompt expansion with large pastes by [@Priya-753](https://github.com/Priya-753) in [#7154](https://github.com/openai/codex/pull/7154)
    * chore(ci): add cargo audit workflow and policy by [@joshka-oai](https://github.com/joshka-oai) in [#7108](https://github.com/openai/codex/pull/7108)
    * chore: add cargo-deny configuration by [@joshka-oai](https://github.com/joshka-oai) in [#7119](https://github.com/openai/codex/pull/7119)
    * Windows Sandbox: treat <workspace_root>/.git as read-only in workspace-write mode by [@iceweasel-oai](https://github.com/iceweasel-oai) in [#7142](https://github.com/openai/codex/pull/7142)
    * chore: dedup unified exec "waited" rendering by [@jif-oai](https://github.com/jif-oai) in [#7256](https://github.com/openai/codex/pull/7256)
    * fix: don't store early exit sessions by [@jif-oai](https://github.com/jif-oai) in [#7263](https://github.com/openai/codex/pull/7263)
    * fix: Correct the stream error message by [@CSRessel](https://github.com/CSRessel) in [#7266](https://github.com/openai/codex/pull/7266)
    * [app-server-test-client] add send-followup-v2 by [@celia-oai](https://github.com/celia-oai) in [#7271](https://github.com/openai/codex/pull/7271)
    * feat[app-serve]: config management by [@jif-oai](https://github.com/jif-oai) in [#7241](https://github.com/openai/codex/pull/7241)
    * feat: add custom env for unified exec process by [@jif-oai](https://github.com/jif-oai) in [#7286](https://github.com/openai/codex/pull/7286)
    * [app-server] feat: add thread_id and turn_id to item and error notifications by [@owenlin0](https://github.com/owenlin0) in [#7124](https://github.com/openai/codex/pull/7124)
    * feat: add compaction event by [@jif-oai](https://github.com/jif-oai) in [#7289](https://github.com/openai/codex/pull/7289)
    * [app-server] feat: add turn/diff/updated event by [@owenlin0](https://github.com/owenlin0) in [#7279](https://github.com/openai/codex/pull/7279)
    * fix: Drop MacOS 13 by [@jif-oai](https://github.com/jif-oai) in [#7295](https://github.com/openai/codex/pull/7295)
    * fix: drop conversation when /new by [@jif-oai](https://github.com/jif-oai) in [#7297](https://github.com/openai/codex/pull/7297)
    * chore: proper client extraction by [@jif-oai](https://github.com/jif-oai) in [#6996](https://github.com/openai/codex/pull/6996)
    * tmp: drop flaky ubuntu by [@jif-oai](https://github.com/jif-oai) in [#7300](https://github.com/openai/codex/pull/7300)
    * [app-server] add thread/tokenUsage/updated v2 event by [@celia-oai](https://github.com/celia-oai) in [#7268](https://github.com/openai/codex/pull/7268)
    * correctly recognize WorkspaceWrite policy on /approvals by [@iceweasel-oai](https://github.com/iceweasel-oai) in [#7301](https://github.com/openai/codex/pull/7301)
    * feat: update process ID for event handling by [@jif-oai](https://github.com/jif-oai) in [#7261](https://github.com/openai/codex/pull/7261)
    * Fixed regression in experimental "sandbox command assessment" feature by [@etraut-openai](https://github.com/etraut-openai) in [#7308](https://github.com/openai/codex/pull/7308)
    * nit: drop file by [@jif-oai](https://github.com/jif-oai) in [#7314](https://github.com/openai/codex/pull/7314)
    * doc: fix relative links and add tips by [@lionel-oai](https://github.com/lionel-oai) in [#7319](https://github.com/openai/codex/pull/7319)
    * Fixes two bugs in example-config.md documentation by [@etraut-openai](https://github.com/etraut-openai) in [#7324](https://github.com/openai/codex/pull/7324)
    * chore: improve rollout session init errors by [@jobchong](https://github.com/jobchong) in [#7336](https://github.com/openai/codex/pull/7336)
    * feat: detached review by [@jif-oai](https://github.com/jif-oai) in [#7292](https://github.com/openai/codex/pull/7292)
    * fix: other flaky tests by [@jif-oai](https://github.com/jif-oai) in [#7372](https://github.com/openai/codex/pull/7372)
    * chore: better session recycling by [@jif-oai](https://github.com/jif-oai) in [#7368](https://github.com/openai/codex/pull/7368)
    * chore(deps): bump arboard from 3.6.0 to 3.6.1 in /codex-rs by [@dependabot](https://github.com/dependabot)[bot] in [#7426](https://github.com/openai/codex/pull/7426)
    * chore(deps): bump serde_with from 3.14.0 to 3.16.1 in /codex-rs by [@dependabot](https://github.com/dependabot)[bot] in [#7422](https://github.com/openai/codex/pull/7422)
    * chore(deps): bump reqwest from 0.12.23 to 0.12.24 in /codex-rs by [@dependabot](https://github.com/dependabot)[bot] in [#7424](https://github.com/openai/codex/pull/7424)
    * chore(deps): bump tracing from 0.1.41 to 0.1.43 in /codex-rs by [@dependabot](https://github.com/dependabot)[bot] in [#7428](https://github.com/openai/codex/pull/7428)
    * Fixed CLA action to properly exempt dependabot by [@etraut-openai](https://github.com/etraut-openai) in [#7429](https://github.com/openai/codex/pull/7429)
    * chore(deps): bump image from 0.25.8 to 0.25.9 in /codex-rs by [@dependabot](https://github.com/dependabot)[bot] in [#7421](https://github.com/openai/codex/pull/7421)
    * [app-server] add turn/plan/updated event by [@celia-oai](https://github.com/celia-oai) in [#7329](https://github.com/openai/codex/pull/7329)
    * fix: disable review rollout filtering by [@jif-oai](https://github.com/jif-oai) in [#7371](https://github.com/openai/codex/pull/7371)
    * [app-server] fix: ensure thread_id and turn_id are on all events by [@owenlin0](https://github.com/owenlin0) in [#7408](https://github.com/openai/codex/pull/7408)
    * [app-server] fix: emit item/fileChange/outputDelta for file change items by [@owenlin0](https://github.com/owenlin0) in [#7399](https://github.com/openai/codex/pull/7399)
    * Fix recent_commits(limit=0) returning 1 commit instead of 0 by [@Towaiji](https://github.com/Towaiji) in [#7334](https://github.com/openai/codex/pull/7334)
    * fix: nix build missing rmcp output hash by [@Alb-O](https://github.com/Alb-O) in [#7436](https://github.com/openai/codex/pull/7436)
    * docs: clarify codex max defaults and xhigh availability by [@kgruiz](https://github.com/kgruiz) in [#7449](https://github.com/openai/codex/pull/7449)
    * fix: prevent MCP startup failure on missing 'type' field by [@linuxmetel](https://github.com/linuxmetel) in [#7417](https://github.com/openai/codex/pull/7417)
    * chore: update to rmcp@0.10.0 to pick up support for custom client notifications by [@bolinfest](https://github.com/bolinfest) in [#7462](https://github.com/openai/codex/pull/7462)
    * fix(apply_patch) tests for shell_command by [@dylan-hurd-oai](https://github.com/dylan-hurd-oai) in [#7307](https://github.com/openai/codex/pull/7307)
    * [app-server] Add ImageView item by [@celia-oai](https://github.com/celia-oai) in [#7468](https://github.com/openai/codex/pull/7468)
    * fix(core): enable history lookup on windows by [@stevemostovoy-openai](https://github.com/stevemostovoy-openai) in [#7457](https://github.com/openai/codex/pull/7457)
    * fix(tui): handle WSL clipboard image paths by [@manoelcalixto](https://github.com/manoelcalixto) in [#3990](https://github.com/openai/codex/pull/3990)

**Full Changelog** : [`rust-v0.63.0...rust-v0.64.0`](https://github.com/openai/codex/compare/rust-v0.63.0...rust-v0.64.0)

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.64.0)

##  November 2025

  * 2025-11-24

###  Usage and credits fixes

Minor updates to address a few issues with Codex usage and credits:

    * Adjusted all usage dashboards to show “limits remaining” for consistency. The CLI previously displayed “limits used.”
    * Fixed an issue preventing users from buying credits if their ChatGPT subscription was purchased via iOS or Google Play.
    * Fixed an issue where the CLI could display stale usage information; it now refreshes without needing to send a message first.
    * Optimized the backend to help smooth out usage throughout the day, irrespective of overall Codex load or how traffic is routed. Before, users could get unlucky and hit a few cache misses in a row, leading to much less usage.
  * 2025-11-21

###  Codex CLI 0.63.0

        $ npm install -g @openai/codex@0.63.0

View details

## Bug fixes

    * Fixes the bug where enabling web search can lead to `Invalid value: 'other'.` errors.

## PRs Merged

    * [app-server] feat: add Declined status for command exec by [@owenlin0](https://github.com/owenlin0) in [#7101](https://github.com/openai/codex/pull/7101)
    * chore: drop model_max_output_tokens by [@jif-oai](https://github.com/jif-oai) in [#7100](https://github.com/openai/codex/pull/7100)
    * fix: clear out duplicate entries for `bash` in the GitHub release by [@bolinfest](https://github.com/bolinfest) in [#7103](https://github.com/openai/codex/pull/7103)

**Full Changelog** : [`rust-v0.62.0...rust-v0.63.0`](https://github.com/openai/codex/compare/rust-v0.62.0...rust-v0.63.0)

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.63.0)

  * 2025-11-20

###  Codex CLI 0.61.0

        $ npm install -g @openai/codex@0.61.0

View details

### Highlights

    * ExecPolicy2 integration and exec-server prep: core now integrates ExecPolicy2 with exec-server refactors and cutover groundwork, plus quickstart docs to help teams adopt the new policy engine.
    * Improved truncation and error reporting: single-pass truncation reduces duplicate work, and error events can now carry optional status codes for clearer observability.
    * Shell reliability and sandbox warnings: fallback shell selection is hardened and world-writable directory warnings are less noisy, including improved messaging on Windows.
    * UX fixes: corrected reasoning display, preserved review footer context after `/review`, and the model migration screen now shows only once.

### PRs Merged

    * fix(app-server) move windows world writable warning ([#6916](https://github.com/openai/codex/pull/6916)) — [@dylan-hurd-oai](https://github.com/dylan-hurd-oai)
    * [core] add optional status_code to error events ([#6865](https://github.com/openai/codex/pull/6865)) — [@celia-oai](https://github.com/celia-oai)
    * fix: prepare ExecPolicy in exec-server for execpolicy2 cutover ([#6888](https://github.com/openai/codex/pull/6888)) — [@bolinfest](https://github.com/bolinfest)
    * stop over-reporting world-writable directories ([#6936](https://github.com/openai/codex/pull/6936)) — [@iceweasel-oai](https://github.com/iceweasel-oai)
    * fix(context left after review): review footer context after `/review` ([#5610](https://github.com/openai/codex/pull/5610)) — [@guidedways](https://github.com/guidedways)
    * Fix/correct reasoning display ([#6749](https://github.com/openai/codex/pull/6749)) — [@lionelchg](https://github.com/lionelchg)
    * chore: refactor exec-server to prepare it for standalone MCP use ([#6944](https://github.com/openai/codex/pull/6944)) — [@bolinfest](https://github.com/bolinfest)
    * fix(shell) fallback shells ([#6948](https://github.com/openai/codex/pull/6948)) — [@dylan-hurd-oai](https://github.com/dylan-hurd-oai)
    * execpolicy2 core integration ([#6641](https://github.com/openai/codex/pull/6641)) — [@zhao-oai](https://github.com/zhao-oai)
    * Single pass truncation ([#6914](https://github.com/openai/codex/pull/6914)) — [@pakrym-oai](https://github.com/pakrym-oai)
    * update execpolicy quickstart readme ([#6952](https://github.com/openai/codex/pull/6952)) — [@zhao-oai](https://github.com/zhao-oai)
    * stop model migration screen after first time. ([#6954](https://github.com/openai/codex/pull/6954)) — [@aibrahim-oai](https://github.com/aibrahim-oai)

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.61.0)

  * 2025-11-19

###  Codex CLI 0.60.1

        $ npm install -g @openai/codex@0.60.1

View details

Bug fix release, most of the new important changes are in <https://github.com/openai/codex/releases/tag/rust-v0.59.0>

## Bug fix:

    * Default model for API users is now `gpt-5.1-codex`

[ Full release on Github ](https://github.com/openai/codex/releases/tag/rust-v0.60.1)

  * 2025-11-18

###  Introducing GPT-5.1-Codex-Max

[Today we are releasing GPT-5.1-Codex-Max](http://www.openai.com/index/gpt-5-1-codex-max), our new frontier agentic coding model.

GPT‑5.1-Codex-Max is built on an update to our foundational reasoning model, which is trained on agentic tasks across software engineering, math, research, and more. GPT‑5.1-Codex-Max is faster, more intelligent, and more token-efficient at every stage of the development cycle–and a new step towards becoming a reliable coding partner.

Starting today, the CLI and IDE Extension will default to `gpt-5.1-codex-max` for users that are signed in with ChatGPT. API access for the model will come soon.

For non-latency-sensitive tasks, we’ve also added a new Extra High (`xhigh`) reasoning effort, which lets the model think for an even longer period of time for a better answer. We still recommend medium as your daily driver for most tasks.

If you have a model specified in your [`config.toml` configuration file](/codex/local-config), you can instead try out `gpt-5.1-codex-max` for a new Codex CLI session using:

        codex --model gpt-5.1-codex-max

You can also use the `/model` slash command in the CLI. In the Codex IDE Extension you can select GPT-5.1-Codex from the dropdown menu.

If you want to switch for all sessions, you can change your default model to `gpt-5.1-codex-max` by updating your `config.toml` [configuration file](/codex/local-config):

        model = "gpt-5.1-codex-max”

  * 2025-11-13

###  Introducing GPT-5.1-Codex and GPT-5.1-Codex-Mini

Along with the [GPT-5.1 launch in the API](https://openai.com/index/gpt-5-1-for-developers/), we are introducing new `gpt-5.1-codex-mini` and `gpt-5.1-codex` model options in Codex, a version of GPT-5.1 optimized for long-running, agentic coding tasks and use in coding agent harnesses in Codex or Codex-like harnesses.

Starting today, the CLI and IDE Extension will default to `gpt-5.1-codex` on macOS and Linux and `gpt-5.1` on Windows.

If you have a model specified in your [`config.toml` configuration file](/codex/local-config), you can instead try out `gpt-5.1-codex` for a new Codex CLI session using:

        codex --model gpt-5.1-codex

You can also use the `/model` slash command in the CLI. In the Codex IDE Extension you can select GPT-5.1-Codex from the dropdown menu.

If you want to switch for all sessions, you can change your default model to `gpt-5.1-codex` by updating your `config.toml` [configuration file](/codex/local-config):

        model = "gpt-5.1-codex”

  * 2025-11-07

###  Introducing GPT-5-Codex-Mini

Today we are introducing a new `gpt-5-codex-mini` model option to Codex CLI and the IDE Extension. The model is a smaller, more cost-effective, but less capable version of `gpt-5-codex` that provides approximately 4x more usage as part of your ChatGPT subscription.

Starting today, the CLI and IDE Extension will automatically suggest switching to `gpt-5-codex-mini` when you reach 90% of your 5-hour usage limit, to help you work longer without interruptions.

You can try the model for a new Codex CLI session using:

        codex --model gpt-5-codex-mini

You can also use the `/model` slash command in the CLI. In the Codex IDE Extension you can select GPT-5-Codex-Mini from the dropdown menu.

Alternatively, you can change your default model to `gpt-5-codex-mini` by updating your `config.toml` [configuration file](/codex/local-config):

        model = "gpt-5-codex-mini”

  * 2025-11-06

###  GPT-5-Codex model update

We’ve shipped a minor update to GPT-5-Codex:

    * More reliable file edits with `apply_patch`.
    * Fewer destructive actions such as `git reset`.
    * More collaborative behavior when encountering user edits in files.
    * 3% more efficient in time and usage.

##  October 2025

  * 2025-10-30

###  Credits on ChatGPT Pro and Plus

Codex users on ChatGPT Plus and Pro can now use on-demand credits for more Codex usage beyond what’s included in your plan. [Learn more.](https://developers.openai.com/codex/pricing)

  * 2025-10-22

###  Tag @Codex on GitHub Issues and PRs

You can now tag `@codex` on a teammate’s pull request to ask clarifying questions, request a follow-up, or ask Codex to make changes. GitHub Issues now also support `@codex` mentions, so you can kick off tasks from any issue, without leaving your workflow.

  * 2025-10-06

###  Codex is now GA

Codex is now generally available with 3 new features — @Codex in Slack, Codex SDK, and new admin tools.

#### @Codex in Slack

You can now questions and assign tasks to Codex directly from Slack. See the [Slack guide](/codex/integrations/slack) to get started.

#### Codex SDK

Integrate the same agent that powers the Codex CLI inside your own tools and workflows with the Codex SDK in Typescript. With the new Codex GitHub Action, you can easily add Codex to CI/CD workflows. See the [Codex SDK guide](/codex/sdk) to get started.

        import { Codex } from "@openai/codex-sdk";

        const agent = new Codex();
        const thread = await agent.startThread();

        const result = await thread.run("Explore this repo");
        console.log(result);

        const result2 = await thread.run("Propose changes");
        console.log(result2);

#### New admin controls and analytics

ChatGPT workspace admins can now edit or delete Codex Cloud environments. With managed config files, they can set safe defaults for CLI and IDE usage and monitor how Codex uses commands locally. New analytics dashboards help you track Codex usage and code review feedback. Learn more in the [enterprise admin guide.](/codex/enterprise)

#### Availability and pricing updates

The Slack integration and Codex SDK are available to developers on ChatGPT Plus, Pro, Business, Edu, and Enterprise plans starting today, while the new admin features will be available to Business, Edu, and Enterprise. Beginning October 20, Codex Cloud tasks will count toward your Codex usage. Review the [Codex pricing guide](/codex/pricing) for plan-specific details.

##  September 2025

  * 2025-09-23

###  GPT-5-Codex in the API

GPT-5-Codex is now available in the Responses API, and you can also use it with your API Key in the Codex CLI. We plan on regularly updating this model snapshot. It is available at the same price as GPT-5. You can learn more about pricing and rate limits for this model on our [model page](http://platform.openai.com/docs/models/gpt-5-codex).

  * 2025-09-15

###  Introducing GPT-5-Codex

#### New model: GPT-5-Codex

GPT-5-Codex is a version of GPT-5 further optimized for agentic coding in Codex. It’s available in the IDE extension and CLI when you sign in with your ChatGPT account. It also powers the cloud agent and Code Review in GitHub.

To learn more about GPT-5-Codex and how it performs compared to GPT-5 on software engineering tasks, see our [announcement blog post](https://openai.com/index/introducing-upgrades-to-codex/).

#### Image outputs

When working in the cloud on front-end engineering tasks, GPT-5-Codex can now display screenshots of the UI in Codex web for you to review. With image output, you can iterate on the design without needing to check out the branch locally.

#### New in Codex CLI

    * You can now resume sessions where you left off with `codex resume`.
    * Context compaction automatically summarizes the session as it approaches the context window limit.

Learn more in the [latest release notes](https://github.com/openai/codex/releases/tag/rust-v0.36.0)

##  August 2025

  * 2025-08-27

###  Late August update

#### IDE extension (Compatible with VS Code, Cursor, Windsurf)

Codex now runs in your IDE with an interactive UI for fast local iteration. Easily switch between modes and reasoning efforts.

#### Sign in with ChatGPT (IDE & CLI)

One-click authentication that removes API keys and uses ChatGPT Enterprise credits.

#### Move work between local ↔ cloud

Hand off tasks to Codex web from the IDE with the ability to apply changes locally so you can delegate jobs without leaving your editor.

#### Code Reviews

Codex goes beyond static analysis. It checks a PR against its intent, reasons across the codebase and dependencies, and can run code to validate the behavior of changes.

  * 2025-08-21

###  Mid August update

#### Image inputs

You can now attach images to your prompts in Codex web. This is great for asking Codex to implement frontend changes or follow up on whiteboarding sessions.

#### Container caching

Codex now caches containers to start new tasks and followups 90% faster, dropping the median start time from 48 seconds to 5 seconds. You can optionally configure a maintenance script to update the environment from its cached state to prepare for new tasks. See the docs for more.

#### Automatic environment setup

Now, environments without manual setup scripts automatically run the standard installation commands for common package managers like yarn, pnpm, npm, go mod, gradle, pip, poetry, uv, and cargo. This reduces test failures for new environments by 40%.

##  June 2025

  * 2025-06-13

###  Best of N

Codex can now generate multiple responses simultaneously for a single task, helping you quickly explore possible solutions to pick the best approach.

#### Fixes & improvements

    * Added some keyboard shortcuts and a page to explore them. Open it by pressing ⌘-/ on macOS and Ctrl+/ on other platforms.

    * Added a “branch” query parameter in addition to the existing “environment”, “prompt” and “tab=archived” parameters.

    * Added a loading indicator when downloading a repo during container setup.

    * Added support for cancelling tasks.

    * Fixed issues causing tasks to fail during setup.

    * Fixed issues running followups in environments where the setup script changes files that are gitignored.

    * Improved how the agent understands and reacts to network access restrictions.

    * Increased the update rate of text describing what Codex is doing.

    * Increased the limit for setup script duration to 20 minutes for Pro and Business users.

    * Polished code diffs: You can now option-click a code diff header to expand/collapse all of them.

  * 2025-06-03

###  June update

#### Agent internet access

Now you can give Codex access to the internet during task execution to install dependencies, upgrade packages, run tests that need external resources, and more.

Internet access is off by default. Plus, Pro, and Business users can enable it for specific environments, with granular control of which domains and HTTP methods Codex can access. Internet access for Enterprise users is coming soon.

Learn more about usage and risks in the [docs](/codex/cloud/agent-internet).

#### Update existing PRs

Now you can update existing pull requests when following up on a task.

#### Voice dictation

Now you can dictate tasks to Codex.

#### Fixes & improvements

    * Added a link to this changelog from the profile menu.

    * Added support for binary files: When applying patches, all file operations are supported. When using PRs, only deleting or renaming binary files is supported for now.

    * Fixed an issue on iOS where follow up tasks where shown duplicated in the task list.

    * Fixed an issue on iOS where pull request statuses were out of date.

    * Fixed an issue with follow ups where the environments were incorrectly started with the state from the first turn, rather than the most recent state.

    * Fixed internationalization of task events and logs.

    * Improved error messages for setup scripts.

    * Increased the limit on task diffs from 1 MB to 5 MB.

    * Increased the limit for setup script duration from 5 to 10 minutes.

    * Polished GitHub connection flow.

    * Re-enabled Live Activities on iOS after resolving an issue with missed notifications.

    * Removed the mandatory two-factor authentication requirement for users using SSO or social logins.

##  May 2025

  * 2025-05-22

###  Reworked environment page

It’s now easier and faster to set up code execution.

#### Fixes & improvements

    * Added a button to retry failed tasks

    * Added indicators to show that the agent runs without network access after setup

    * Added options to copy git patches after pushing a PR

    * Added support for unicode branch names

    * Fixed a bug where secrets were not piped to the setup script

    * Fixed creating branches when there’s a branch name conflict.

    * Fixed rendering diffs with multi-character emojis.

    * Improved error messages when starting tasks, running setup scripts, pushing PRs, or disconnected from GitHub to be more specific and indicate how to resolve the error.

    * Improved onboarding for teams.

    * Polished how new tasks look while loading.

    * Polished the followup composer.

    * Reduced GitHub disconnects by 90%.

    * Reduced PR creation latency by 35%.

    * Reduced tool call latency by 50%.

    * Reduced task completion latency by 20%.

    * Started setting page titles to task names so Codex tabs are easier to tell apart.

    * Tweaked the system prompt so that agent knows it’s working without network, and can suggest that the user set up dependencies.

    * Updated the docs.

  * 2025-05-19

###  Codex in the ChatGPT iOS app

Start tasks, view diffs, and push PRs—while you’re away from your desk.