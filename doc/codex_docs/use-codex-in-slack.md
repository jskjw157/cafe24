# Use Codex in Slack

<img
  src="/images/codex/integrations/slack-example.png"
  alt="Screenshot of the Codex Slack integration in action"
  class="p-2 md:p-4"
/>

## Configure the Codex Slack app

1. **Set up Codex Cloud Tasks** – If you don't have one yet, sign up for a Plus, Pro, Business, Enterprise, or Edu plan. ([Pricing](https://chatgpt.com/pricing)). Then enable Cloud Tasks by [connecting GitHub](https://chatgpt.com/codex), and finally [set up an environment](/codex/cloud/environments). If you're on an Enterprise plan, you may first need to ask your ChatGPT workspace admin to enable both Codex Cloud Tasks in [workspace settings](https://chatgpt.com/admin/settings), and the "Codex for Slack" Connector in [connector settings](https://chatgpt.com/admin/ca).
1. **Install the Codex Slack app in your workspace** – Do this from [Codex settings](https://chatgpt.com/codex/settings/connectors). Depending on your Slack workspace policies, you might need your Slack workspace admin to approve. Every user who wants to use Codex in Slack will need to do this for each Slack workspace.
1. **Add @Codex to a channel** - Try mentioning `@Codex` in a channel or thread. If @Codex hasn't been added to the channel yet, Slack will prompt you to do so.

## Kick off a task

1. **Tag `@Codex`** in a channel or thread with a message containing your prompt. Codex will reference earlier messages in the thread, so you can message it just like a teammate—no need to restate context.
2. **Codex picks an environment** - Codex looks at the context in the thread to decide which Codex Cloud Environment to use. If it's not obvious from the thread, you can also mention the name of the environment you intend, such as by writing "@Codex fix the above in openai/codex".
3. **Codex answers your message** - Codex will first acknowledge your message with 👀, then reply with the environment it chose, as well as a link to the in progress task. Once it's done, Codex will reply with the completed task, and depending on your settings, an answer to your message.

## How Codex chooses an environment and repo

- Codex reviews the environments you have access to and selects the one that best matches your request. If the request is ambiguous, it falls back to the environment you used most recently.
- The task runs against the default branch of the first repository listed in that environment’s repo map. Update the repo map in Codex if you need a different default or additional repositories.
- If no suitable environment or repository is available, Codex will reply in Slack with instructions on how to fix the issue before retrying.

## Enterprise-only data controls

By default, when Codex responds, it will reply to the thread with an answer, which will often include sensitive information from the environment that Codex worked in. Enterprise admins who would like to prevent that environment information from being shared in Slack, can change this behavior by unchecking "Allow Codex Slack app to post answers on task completion" in [ChatGPT workspace settings](https://chatgpt.com/admin/settings). When answers are disabled, Codex only replies with a link to the task.

## Data usage, privacy, and security

When you mention `@Codex`, your message and thread history are sent to Codex to understand your request and create a task.
Data handling follows OpenAI's [Privacy Policy](https://openai.com/privacy), [Terms of Use](https://openai.com/terms/), and other applicable [policies](https://openai.com/policies).
For more on security, see the [Codex Security Guide](/codex/security).

Codex uses large language models (LLMs) that can make mistakes. Always review answers and diffs carefully.

## Tips and troubleshooting

- **Missing connections** - If Codex cannot confirm your Slack or GitHub connection, it will tell you in Slack and include a link to reconnect.
- **Unexpected environment choice** - Reply in thread with the environment you want (e.g., “Please run this in `openai/openai (applied)`”), then re-mention `@Codex`.
- **Long or complex threads** - Summarize key details in your latest message so Codex does not miss critical information buried far up-thread.
- **Workspace posting** - Some enterprise workspaces restrict automatic posting of final answers. In those cases, open the Codex task link to view progress and results.
- For more help, see the [OpenAI Help Center](https://help.openai.com/).
