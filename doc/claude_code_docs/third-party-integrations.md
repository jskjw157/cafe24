---
source: https://code.claude.com/docs/en/third-party-integrations
title: Enterprise deployment overview - Claude Code Docs
---

# Enterprise deployment overview

Learn how Claude Code can integrate with various third-party services and infrastructure to meet enterprise deployment requirements.

This page provides an overview of available deployment options and helps you choose the right configuration for your organization.

Provider comparison

Feature| Anthropic| Amazon Bedrock| Google Vertex AI| Microsoft Foundry
---|---|---|---|---
Regions| Supported [countries](https://www.anthropic.com/supported-countries)| Multiple AWS [regions](https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html)| Multiple GCP [regions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations)| Multiple Azure [regions](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/)
Prompt caching| Enabled by default| Enabled by default| Enabled by default| Enabled by default
Authentication| API key| API key or AWS credentials| GCP credentials| API key or Microsoft Entra ID
Cost tracking| Dashboard| AWS Cost Explorer| GCP Billing| Azure Cost Management
Enterprise features| Teams, usage monitoring| IAM policies, CloudTrail| IAM roles, Cloud Audit Logs| RBAC policies, Azure Monitor

Cloud providers

## [Amazon BedrockUse Claude models through AWS infrastructure with API key or IAM-based authentication and AWS-native monitoring](/docs/en/amazon-bedrock)## [Google Vertex AIAccess Claude models via Google Cloud Platform with enterprise-grade security and compliance](/docs/en/google-vertex-ai)## [Microsoft FoundryAccess Claude through Azure with API key or Microsoft Entra ID authentication and Azure billing](/docs/en/microsoft-foundry)

Corporate infrastructure

## [Enterprise NetworkConfigure Claude Code to work with your organization’s proxy servers and SSL/TLS requirements](/docs/en/network-config)## [LLM GatewayDeploy centralized model access with usage tracking, budgeting, and audit logging](/docs/en/llm-gateway)

Configuration overview

Claude Code supports flexible configuration options that allow you to combine different providers and infrastructure:

Understand the difference between:

  * **Corporate proxy** : An HTTP/HTTPS proxy for routing traffic (set via `HTTPS_PROXY` or `HTTP_PROXY`)
  * **LLM Gateway** : A service that handles authentication and provides provider-compatible endpoints (set via `ANTHROPIC_BASE_URL`, `ANTHROPIC_BEDROCK_BASE_URL`, or `ANTHROPIC_VERTEX_BASE_URL`)

Both configurations can be used in tandem.

Using Bedrock with corporate proxy

Route Bedrock traffic through a corporate HTTP/HTTPS proxy:

Ask AI

    # Enable Bedrock
    export CLAUDE_CODE_USE_BEDROCK=1
    export AWS_REGION=us-east-1

    # Configure corporate proxy
    export HTTPS_PROXY='https://proxy.example.com:8080'

Using Bedrock with LLM Gateway

Use a gateway service that provides Bedrock-compatible endpoints:

Ask AI

    # Enable Bedrock
    export CLAUDE_CODE_USE_BEDROCK=1

    # Configure LLM gateway
    export ANTHROPIC_BEDROCK_BASE_URL='https://your-llm-gateway.com/bedrock'
    export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1  # If gateway handles AWS auth

Using Foundry with corporate proxy

Route Azure traffic through a corporate HTTP/HTTPS proxy:

Ask AI

    # Enable Microsoft Foundry
    export CLAUDE_CODE_USE_FOUNDRY=1
    export ANTHROPIC_FOUNDRY_RESOURCE=your-resource
    export ANTHROPIC_FOUNDRY_API_KEY=your-api-key  # Or omit for Entra ID auth

    # Configure corporate proxy
    export HTTPS_PROXY='https://proxy.example.com:8080'

Using Foundry with LLM Gateway

Use a gateway service that provides Azure-compatible endpoints:

Ask AI

    # Enable Microsoft Foundry
    export CLAUDE_CODE_USE_FOUNDRY=1

    # Configure LLM gateway
    export ANTHROPIC_FOUNDRY_BASE_URL='https://your-llm-gateway.com'
    export CLAUDE_CODE_SKIP_FOUNDRY_AUTH=1  # If gateway handles Azure auth

Using Vertex AI with corporate proxy

Route Vertex AI traffic through a corporate HTTP/HTTPS proxy:

Ask AI

    # Enable Vertex
    export CLAUDE_CODE_USE_VERTEX=1
    export CLOUD_ML_REGION=us-east5
    export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id

    # Configure corporate proxy
    export HTTPS_PROXY='https://proxy.example.com:8080'

Using Vertex AI with LLM Gateway

Combine Google Vertex AI models with an LLM gateway for centralized management:

Ask AI

    # Enable Vertex
    export CLAUDE_CODE_USE_VERTEX=1

    # Configure LLM gateway
    export ANTHROPIC_VERTEX_BASE_URL='https://your-llm-gateway.com/vertex'
    export CLAUDE_CODE_SKIP_VERTEX_AUTH=1  # If gateway handles GCP auth

Authentication configuration

Claude Code uses the `ANTHROPIC_AUTH_TOKEN` for the `Authorization` header when needed. The `SKIP_AUTH` flags (`CLAUDE_CODE_SKIP_BEDROCK_AUTH`, `CLAUDE_CODE_SKIP_VERTEX_AUTH`) are used in LLM gateway scenarios where the gateway handles provider authentication.

Choosing the right deployment configuration

Consider these factors when selecting your deployment approach:

Direct provider access

Best for organizations that:

  * Want the simplest setup
  * Have existing AWS or GCP infrastructure
  * Need provider-native monitoring and compliance

Corporate proxy

Best for organizations that:

  * Have existing corporate proxy requirements
  * Need traffic monitoring and compliance
  * Must route all traffic through specific network paths

LLM Gateway

Best for organizations that:

  * Need usage tracking across teams
  * Want to dynamically switch between models
  * Require custom rate limiting or budgets
  * Need centralized authentication management

Debugging

When debugging your deployment:

  * Use the `claude /status` [slash command](/docs/en/slash-commands). This command provides observability into any applied authentication, proxy, and URL settings.
  * Set environment variable `export ANTHROPIC_LOG=debug` to log requests.

Best practices for organizations

1\. Invest in documentation and memory

We strongly recommend investing in documentation so that Claude Code understands your codebase. Organizations can deploy CLAUDE.md files at multiple levels:

  * **Organization-wide** : Deploy to system directories like `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) for company-wide standards
  * **Repository-level** : Create `CLAUDE.md` files in repository roots containing project architecture, build commands, and contribution guidelines. Check these into source control so all users benefit [Learn more](/docs/en/memory).

2\. Simplify deployment

If you have a custom development environment, we find that creating a “one click” way to install Claude Code is key to growing adoption across an organization.

3\. Start with guided usage

Encourage new users to try Claude Code for codebase Q&A, or on smaller bug fixes or feature requests. Ask Claude Code to make a plan. Check Claude’s suggestions and give feedback if it’s off-track. Over time, as users understand this new paradigm better, then they’ll be more effective at letting Claude Code run more agentically.

4\. Configure security policies

Security teams can configure managed permissions for what Claude Code is and is not allowed to do, which cannot be overwritten by local configuration. [Learn more](/docs/en/security).

5\. Leverage MCP for integrations

MCP is a great way to give Claude Code more information, such as connecting to ticket management systems or error logs. We recommend that one central team configures MCP servers and checks a `.mcp.json` configuration into the codebase so that all users benefit. [Learn more](/docs/en/mcp). At Anthropic, we trust Claude Code to power development across every Anthropic codebase. We hope you enjoy using Claude Code as much as we do.

Next steps

  * [Set up Amazon Bedrock](/docs/en/amazon-bedrock) for AWS-native deployment
  * [Configure Google Vertex AI](/docs/en/google-vertex-ai) for GCP deployment
  * [Set up Microsoft Foundry](/docs/en/microsoft-foundry) for Azure deployment
  * [Configure Enterprise Network](/docs/en/network-config) for network requirements
  * [Deploy LLM Gateway](/docs/en/llm-gateway) for enterprise management
  * [Settings](/docs/en/settings) for configuration options and environment variables

Was this page helpful?

[Amazon Bedrock](/docs/en/amazon-bedrock)

⌘I