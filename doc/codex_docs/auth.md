---
source: https://developers.openai.com/codex/auth
title: Authentication
---

#  Authentication

Sign-in methods for Codex

## OpenAI authentication

Codex supports two ways to sign in when using OpenAI models:

  * Sign in with ChatGPT for subscription access
  * Sign in with an API key for usage-based access

Codex cloud requires signing in with ChatGPT. The Codex CLI and IDE extension support both sign-in methods.

### Sign in with ChatGPT

When you sign in with ChatGPT from the Codex CLI or IDE extension, Codex opens a browser window for you to complete the login flow. After you sign in, the browser returns an access token to the CLI or IDE extension.

### Sign in with an API key

You can also sign in to the Codex CLI or IDE extension with an API key. Get your API key from the [OpenAI dashboard](https://platform.openai.com/api-keys).

OpenAI bills API key usage through your OpenAI Platform account at standard API rates. See the [API pricing page](https://openai.com/api/pricing/).

## Secure your Codex cloud account

Codex cloud interacts directly with your codebase, so it needs stronger security than many other ChatGPT features. Enable multi-factor authentication (MFA).

If you use a social login provider (Google, Microsoft, Apple), you aren’t required to enable MFA on your ChatGPT account, but you can set it up with your social login provider.

For setup instructions, see:

  * [Google](https://support.google.com/accounts/answer/185839)
  * [Microsoft](https://support.microsoft.com/en-us/topic/what-is-multifactor-authentication-e5e39437-121c-be60-d123-eda06bddf661)
  * [Apple](https://support.apple.com/en-us/102660)

If you access ChatGPT through single sign-on (SSO), your organization’s SSO administrator should enforce MFA for all users.

If you log in using an email and password, you must set up MFA on your account before accessing Codex cloud.

If your account supports more than one login method and one of them is email and password, you must set up MFA before accessing Codex, even if you sign in another way.

## Login caching

When you sign in to the Codex CLI or IDE extension using either ChatGPT or an API key, Codex caches your login details and reuses them the next time you start the CLI or extension. The CLI and extension share the same cached login details. If you log out from either one, you’ll need to sign in again the next time you start the CLI or extension.

Codex caches login details locally in a plaintext file at `~/.codex/auth.json` or in your OS-specific credential store.

## Login on headless devices

If you are signing in to ChatGPT with the Codex CLI, there are some situations where the browser-based login UI may not work:

  * You’re running the CLI in a remote or headless environment.
  * Your local networking configuration blocks the localhost callback Codex uses to return the OAuth token to the CLI after you sign in.

In these situations, you can use a device code authentication mechanism (currently in beta).

  1. Enable device code login in your ChatGPT security settings (personal account) or ChatGPT workspace permissions (workspace admin).
  2. In the terminal where you’re running Codex, run `codex login --device-auth`.
  3. Open the link to sign in with your account in your browser, then enter the one-time code.

## Alternative model providers

When you define a [custom model provider](/codex/config-advanced#custom-model-providers) in your configuration file, you can choose one of these authentication methods:

  * **OpenAI authentication** : Set `requires_openai_auth = true` to use OpenAI authentication. You can then sign in with ChatGPT or an API key. This is useful when you access OpenAI models through an LLM proxy server. When `requires_openai_auth = true`, Codex ignores `env_key`.
  * **Environment variable authentication** : Set `env_key = "<ENV_VARIABLE_NAME>"` to use a provider-specific API key from the local environment variable named `<ENV_VARIABLE_NAME>`.
  * **No authentication** : If you don’t set `requires_openai_auth` (or set it to `false`) and you don’t set `env_key`, Codex assumes the provider doesn’t require authentication. This is useful for local models.