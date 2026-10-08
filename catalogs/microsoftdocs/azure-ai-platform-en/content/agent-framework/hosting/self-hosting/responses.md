---
title: Self-host OpenAI Responses endpoints
description: Use the Agent Framework Responses helpers in your application-owned server.
zone_pivot_groups: programming-languages
author: eavanvalkenburg
ms.topic: article
ms.author: edvan
ms.date: 09/03/2026
ms.service: agent-framework
ai-usage: ai-assisted
ms.custom: update-code1
---

# Self-host OpenAI Responses endpoints

**Applies to: programming-language-csharp**


> **Note:**
> Self-hosting helpers for OpenAI Responses endpoints in .NET are coming soon.



**Applies to: programming-language-go**


> **Note:**
> Self-hosting helpers for OpenAI Responses endpoints are not currently available for Go.



**Applies to: programming-language-python**


Use `agent-framework-hosting-responses` to convert OpenAI Responses-shaped requests and responses at an endpoint your application owns. Your server chooses the web framework, route, authentication, authorization, request options, and session storage.

```bash
pip install --pre agent-framework agent-framework-foundry agent-framework-hosting agent-framework-hosting-responses azure-identity
```

The FastAPI sample is one implementation. The same helpers work with Django, Flask, Starlette, Azure Functions, or another framework.

## Host an agent endpoint

This sample converts the request to Agent Framework run values, applies an application-defined option allowlist, and persists the updated session under the newly created response ID.

[Code reference unavailable in this source snapshot: ~/../agent-framework-code/python/samples/04-hosting/af-hosting/local_responses/app.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/agent-framework/hosting/self-hosting/responses.md)

`AgentState` resolves the target and loads or creates a session. Save the session after the run, or after a streaming run finishes, because the run updates it.

For the complete application, including the agent definition and request-option allowlist, see the [local Responses sample](https://github.com/microsoft/agent-framework/tree/main/python/samples/04-hosting/af-hosting/local_responses).

## Understand response usage conversion

For agent and workflow responses, the hosting package preserves an SDK-valid native OpenAI `ResponseUsage` object unchanged when one is available. It doesn't merge native Responses usage with Agent Framework `UsageDetails`.

When native usage isn't available, the package can reconstruct Responses usage from these semantically matching Agent Framework fields:

| Usage value | Agent Framework field |
| --- | --- |
| Input tokens | `input_token_count` |
| Output tokens | `output_token_count` |
| Cache-read input tokens | `cache_read_input_token_count` |
| Cache-write input tokens | `cache_creation_input_token_count` |
| Reasoning output tokens | `reasoning_output_token_count` |

Explicit zero values are preserved. If `total_tokens` is absent while both input and output counts are present, the package derives it as input plus output.

If the available Agent Framework usage is incomplete or semantically inconsistent with the Responses schema, the package omits usage. It doesn't guess, copy one counter into another, or fail an otherwise successful response. A malformed scalar count remains an error.

This reconstruction is intentionally lossy because Agent Framework usage is provider-neutral and OpenAI Responses usage has a richer, provider-specific shape. Provider-specific counters reported by a hosted agent, such as Anthropic-specific usage, therefore might not appear in the response received by the calling application. This conversion doesn't provide interoperability between different versions of the OpenAI SDK running in the same process.

## Host a workflow endpoint

`WorkflowState` resolves the workflow, but your application owns checkpoint storage and the mapping from a response ID to a checkpoint. This sample restores the checkpoint selected by an authorized `previous_response_id`, then saves a cursor for the next response.

[Code reference unavailable in this source snapshot: ~/../agent-framework-code/python/samples/04-hosting/af-hosting/local_responses_workflow/app.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/agent-framework/hosting/self-hosting/responses.md)

The sample's file-backed storage is for local development. Use durable storage when replicas can restart or scale out.

> **Important:**
> Treat `previous_response_id` and `conversation` as untrusted input. Authenticate and authorize the caller before using either value to load or save a session or checkpoint. The legacy `conversation_id` request field is deprecated; use the OpenAI Responses `conversation` field instead.

For the broader wire format, see [OpenAI-compatible endpoints](openai-endpoints.md).

## Next steps

> 
> [Add Telegram](telegram.md)

**Go deeper:**

- [Self-hosting overview](index.md)
- [A2A](a2a/index.md)
- [MCP](mcp.md)
- [Foundry Hosted Agents](../foundry-hosted-agent.md)
