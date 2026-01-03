---
source: https://developers.openai.com/codex/models
title: Codex Models
---

#  Codex Models

Meet the AI models that power Codex

## Recommended models

gpt-5.2-codex

Most advanced agentic coding model for real-world engineering.

codex -m gpt-5.2-codex

Capability

Speed

Codex CLI & SDK

Codex IDE extension

Codex Cloud

ChatGPT Credits

API Access

gpt-5.1-codex-max

Optimized for long-horizon, agentic coding tasks in Codex.

codex -m gpt-5.1-codex-max

Capability

Speed

Codex CLI & SDK

Codex IDE extension

Codex Cloud

ChatGPT Credits

API Access

gpt-5.1-codex-mini

Smaller, more cost-effective, less-capable version of GPT-5.1-Codex.

codex -m gpt-5.1-codex-mini

Capability

Speed

Codex CLI & SDK

Codex IDE extension

Codex Cloud

ChatGPT Credits

API Access

## Alternative models

gpt-5.2

Our best general agentic model for tasks across industries and domains.

codex -m gpt-5.2

gpt-5.1

Great for for coding and agentic tasks across domains. Succeeded by GPT-5.2.

codex -m gpt-5.1

gpt-5.1-codex

Optimized for long-running, agentic coding tasks in Codex. Succeeded by GPT-5.1-Codex-Max.

codex -m gpt-5.1-codex

gpt-5-codex

Version of GPT-5 tuned for long-running, agentic coding tasks. Succeeded by GPT-5.1-Codex.

codex -m gpt-5-codex

gpt-5-codex-mini

Smaller, more cost-effective version of GPT-5-Codex. Succeeded by GPT-5.1-Codex-Mini.

codex -m gpt-5-codex-mini

gpt-5

Reasoning model for coding and agentic tasks across domains. Succeeded by GPT-5.1.

codex -m gpt-5

## Other models

Codex works best with the models listed above.

You can also point Codex at any model and provider that supports either the [Chat Completions](https://platform.openai.com/docs/api-reference/chat) or [Responses APIs](https://platform.openai.com/docs/api-reference/responses) to fit your specific use case.

Support for the Chat Completions API is deprecated and will be removed in future releases of Codex.

## Configuring models

### Configure your default local model

The Codex CLI and IDE extension use the same `config.toml` [configuration file](/codex/config-basic). To specify a model, add a `model` entry to your configuration file. If no model is specified, the Codex CLI or IDE extension will default to a recommended model.

    model = "gpt-5.2"

### Choosing a different local model temporarily

In the Codex CLI, you can use the `/model` command during an active thread to change the model. In the IDE extension, you can use the model selector below the input box to choose your model.

To start a new Codex CLI thread with a specific model or to specify the model for `codex exec` you can use the `--model`/`-m` flag:

    codex -m gpt-5.1-codex-mini

### Choosing your model for cloud tasks

There is currently no way to change the default model for Codex Cloud tasks.