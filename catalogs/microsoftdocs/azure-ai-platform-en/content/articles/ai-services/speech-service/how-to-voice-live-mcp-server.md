---
title: Add an MCP server to Voice Live
titleSuffix: Foundry Tools
description: Learn how to connect remote MCP servers to a Voice Live session for real-time tool calling with the VoiceLive SDK.
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 04/28/2026
author: PatrickFarley
reviewer: PatrickFarley
ms.author: pafarley
ms.reviewer: pafarley
zone_pivot_groups: how-to-voice-live-mcp-server
recommendations: false
ai-usage: ai-assisted
---

# How to add an MCP server to Voice Live


## Introduction 

Voice Live supports connecting to remote [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers during a voice session. MCP integration enables the model to discover and invoke tools hosted on external services, such as documentation search, wiki lookup, or custom APIs, and incorporate tool results into spoken responses.

MCP server integration differs from [function calling](how-to-voice-live-function-calling.md) in these ways:

| Aspect | Function calling | MCP server |
| --- | --- | --- |
| Tool execution | Client-side | Server-side (managed by Voice Live) |
| Tool discovery | Client defines tools explicitly | Voice Live auto-discovers tools from MCP endpoint |
| Approval model | Not applicable | Configurable: `"always"` (default), `"never"`, or [per-tool dictionary](#approval-modes) |
| API version required | `2025-10-01` | `2026-04-10` or later |

### Key concepts

- **`MCPServer` definition**: Declare one or more MCP endpoints in the session configuration with `server_label`, `server_url`, and optional `allowed_tools`, `headers`, `authorization`, and `require_approval`.
- **Tool discovery**: On session start, Voice Live calls each MCP server's tool listing endpoint and emits `mcp_list_tools` events.
- **Tool invocation**: When the model decides to call an MCP tool, the service handles execution and streams `response.mcp_call` events.
- **Approval flow**: When `require_approval` is set to `"always"` (the default), the client receives an `mcp_approval_request` conversation item and must respond with an `mcp_approval_response` before the call executes. Set `require_approval` to `"never"` for automatic execution, or use a per-tool dictionary to mix modes on the same server.

### Approval modes

The `require_approval` property on each `MCPServer` controls whether tool calls need client-side approval before execution. It accepts a string or a per-tool dictionary.

| Mode | Value | Behavior |
| --- | --- | --- |
| Always (default) | `"always"` | Every tool call sends an `mcp_approval_request` to the client. The call doesn't execute until the client responds with `mcp_approval_response` and `approve=true`. |
| Never | `"never"` | Tool calls execute automatically. No approval event is sent. |
| Per-tool | `{"always": ["tool_a"], "never": ["tool_b", "tool_c"]}` | Each tool is assigned an approval mode individually. Tools not listed in either key default to `"always"`. |

**When to use each mode:**

- **`"always"`** — Use for tools that perform write operations, access sensitive data, or incur costs. The voice samples auto-approve subsequent calls to the same server within the same turn to reduce repeated prompts.
- **`"never"`** — Use for read-only lookups, search APIs, or trusted internal tools where user confirmation adds latency without security benefit.
- **Per-tool dictionary** — Use when a single MCP server exposes a mix of read-only and write tools. For example, a documentation server might allow `search_docs` without approval but require approval for `submit_feedback`.

> **Note:**
> In voice scenarios, each approval triggers a conversational prompt. Configure `require_approval` carefully to balance security with conversation flow. See [Voice-native approval](#voice-native-approval) for implementation patterns.

For the full MCP event and type reference, see [Voice Live API reference](voice-live-api-reference-2026-04-10.md).





**Applies to: programming-language-python**


Learn how to connect remote MCP servers to a Voice Live session using the VoiceLive SDK for Python. This article builds on the [Quickstart: Create a Voice Live real-time voice agent](voice-live-quickstart.md) with MCP server integration.


[Reference documentation](https://learn.microsoft.com/python/api/overview/azure/ai-voicelive-readme) | [Package (PyPi)](https://pypi.org/project/azure-ai-voicelive/) | [Additional samples on GitHub](https://aka.ms/voicelive/github-python)


Follow the how-to below or get the full sample code:

> 
> [Voice Live MCP sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/python/voice-live-quickstarts/MCPQuickstart)

## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- <a href="https://www.python.org/" target="_blank">Python 3.10 or later version</a>. If you don't have a suitable version of Python installed, you can follow the instructions in the [VS Code Python Tutorial](https://code.visualstudio.com/docs/python/python-tutorial#_install-a-python-interpreter) for the easiest way of installing Python on your operating system.
- A [Microsoft Foundry resource](../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](voice-live.md).
- `azure-ai-voicelive` package version 1.2.0 or later (MCP support requires `api_version="2026-04-10"`).
- Assign the `Cognitive Services User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.

> **Tip:**
> To use Voice Live with MCP, you don't need to deploy an audio model with your Foundry resource. Voice Live is fully managed, and the model is automatically deployed for you. For more information about model availability, see the [Voice Live overview documentation](voice-live.md).

## Prepare the environment

Complete the [Voice Live quickstart](voice-live-quickstart.md) to set up your environment, configure authentication, and test your first Voice Live conversation.

## MCP integration concepts

### MCP server definition

Use the `MCPServer` class to declare each remote MCP endpoint. At minimum, provide `server_label` (a display name) and `server_url` (the MCP endpoint URL). Optionally restrict available tools with `allowed_tools` and configure the approval mode.

### Approval modes

Control whether MCP tool calls require user approval before execution:

- `require_approval="never"`: The tool executes automatically when the model invokes it.
- `require_approval="always"` (default): The client receives an `mcp_approval_request` and must respond before the tool runs.
- Per-tool dictionary: Set `require_approval={"never": ["tool_a"], "always": ["tool_b"]}` for granular control.

### API version requirement

MCP support requires `api_version="2026-04-10"` or later. Pass this value in the `connect()` call.

## Define MCP servers

Define the MCP servers that Voice Live can use during the session. Each server is an `MCPServer` instance added to the tools list in the session configuration.

The following code defines two MCP servers: one with automatic tool execution and one that requires user approval before running.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- The `deepwiki` server allows only `read_wiki_structure` and `ask_question` tools, with `require_approval="never"` for automatic execution.
- The `azure_doc` server allows all tools on the endpoint, with `require_approval="always"` so users can review each call before execution.

## Configure the session with MCP tools

Pass the MCP server definitions to the `RequestSession` tools list alongside your voice, modality, and turn-detection settings.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- `RequestSession` bundles MCP tools with audio format, voice, and turn detection settings.
- `connection.session.update(session=session_config)` sends the full configuration to Voice Live.
- Voice Live automatically discovers available tools from each MCP server after the session starts.

## Handle MCP events

Process MCP-specific events in the event loop. The key events are:

- `CONVERSATION_ITEM_CREATED` with `ItemType.MCP_CALL`: An MCP tool call was triggered by the model.
- `RESPONSE_MCP_CALL_COMPLETED`: The MCP call completed successfully.
- `RESPONSE_MCP_CALL_FAILED`: The MCP call failed.
- `CONVERSATION_ITEM_CREATED` with `ItemType.MCP_APPROVAL_REQUEST`: The server is requesting approval for a tool call.
- `CONVERSATION_ITEM_CREATED` with `ItemType.MCP_LIST_TOOLS`: Tool discovery completed for a server.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- `_handle_mcp_call_arguments` waits for the full arguments to stream in via `RESPONSE_MCP_CALL_ARGUMENTS_DONE`, then waits for the response to complete.
- `_handle_mcp_call_completed` receives the tool output and triggers a new response so the model can incorporate the result into its next spoken reply.

## Handle approval requests

When a server is configured with `require_approval="always"`, client code must handle the approval flow. Instead of blocking on console input, inject a system message so the model asks the user verbally and parse the spoken response.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- The `mcp_approval_request` event contains `server_label`, `name` (tool name), and `arguments`.
- A system message instructs the model to verbally ask for permission.
- `MCPApprovalResponseRequestItem` sends the decision back to Voice Live with `approve=True` or `approve=False`.

## Resolve voice-based approval

Parse the user's spoken transcript to determine approval. Use word-boundary regex to avoid false positives from words like "yesterday" or "nobody".

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- The transcript from `CONVERSATION_ITEM_INPUT_AUDIO_TRANSCRIPTION_COMPLETED` is matched against `\byes\b` and `\b(no|stop|cancel)\b` patterns.
- Subsequent calls to the same server within the same turn are auto-approved to avoid repeated prompts.
- After a configurable maximum (for example, 3 approvals), further calls are auto-denied and the model responds with what it has.

## Detect stalls during MCP tool calls

MCP tool calls can take several seconds. Use a repeating timer to proactively inform the user that the assistant is still waiting for results.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- A 10-second interval timer injects system messages like "Tell the user you're still waiting" up to 3 times.
- The timer is cancelled when the MCP call completes or the user interrupts with barge-in.

## Run the sample

1. Create the `mcp-quickstart.py` file with the following code:

    [Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

1. Sign in to Azure with the following command:

    ```shell
    az login
    ```

1. Run the Python script:

    ```shell
    python mcp-quickstart.py
    ```

1. Speak into your microphone. Try asking questions like "What tools do you have?" or "Search the Azure documentation for Voice Live API."

    - For the `deepwiki` server (`require_approval="never"`), tool calls execute automatically.
    - For the `azure_doc` server (`require_approval="always"`), you're prompted to approve each tool call in the console.

1. Press **Ctrl+C** to stop the session.

## MCP server configuration reference

| Parameter | Required | Description |
| --- | --- | --- |
| `server_label` | Yes | Display name for the MCP server. |
| `server_url` | Yes | URL of the remote MCP endpoint. |
| `allowed_tools` | No | List of tool names the model can call. If omitted, all tools are allowed. |
| `require_approval` | No | `"never"`, `"always"` (default), or a per-tool dictionary. |
| `headers` | No | Extra HTTP headers to include in MCP requests. |
| `authorization` | No | Authorization token for MCP requests. |

For the complete REST API type definition, see [MCPTool](voice-live-api-reference-2026-01-01-preview.md#mcptool) in the Voice Live API reference.



**Applies to: programming-language-csharp**


Learn how to connect remote MCP servers to a Voice Live session using the VoiceLive SDK for C#. This article builds on the [Quickstart: Create a Voice Live real-time voice agent](voice-live-quickstart.md) with MCP server integration.


[Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/ai.voicelive-readme) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.VoiceLive) | [Additional samples on GitHub](https://aka.ms/voicelive/github-csharp)



Follow the how-to below or get the full sample code:

> 
> [Voice Live MCP sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/csharp/voice-live-quickstarts/MCPQuickstart)

## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later.
- A [Microsoft Foundry resource](../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](voice-live.md).
- `Azure.AI.VoiceLive` package version 1.1.0 or later (MCP support requires API version `2026-04-10`).
- Assign the `Cognitive Services User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.

> **Tip:**
> To use Voice Live with MCP, you don't need to deploy an audio model with your Foundry resource. Voice Live is fully managed, and the model is automatically deployed for you. For more information about model availability, see the [Voice Live overview documentation](voice-live.md).

## Prepare the environment

Complete the [Voice Live quickstart](voice-live-quickstart.md) to set up your environment, configure authentication, and test your first Voice Live conversation.

## MCP integration concepts

### MCP server definition

Use the `VoiceLiveMcpServerDefinition` class to declare each remote MCP endpoint. At minimum, provide `ServerLabel` (a display name) and `ServerUrl` (the MCP endpoint URL). Optionally restrict available tools with `AllowedTools` and configure the approval mode.

### Approval modes

Control whether MCP tool calls require user approval before execution:

- `RequireApproval = "never"`: The tool executes automatically when the model invokes it.
- `RequireApproval = "always"` (default): The client receives an approval request and must respond before the tool runs.

### API version requirement

MCP support requires API version `2026-04-10` or later.

## Define MCP servers

Define the MCP servers that Voice Live can use during the session. Each server is a `VoiceLiveMcpServerDefinition` instance added to the tools list in the session configuration.

The following code defines two MCP servers: one with automatic tool execution and one that requires user approval before running.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/csharp/voice-live-quickstarts/MCPQuickstart/MCPQuickstart.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- The `deepwiki` server allows only `read_wiki_structure` and `ask_question` tools, with `RequireApproval` set to `"never"` for automatic execution.
- The `azure_doc` server allows all tools on the endpoint, with `RequireApproval` set to `"always"` so users can review each call before execution.

## Configure the session with MCP tools

Pass the MCP server definitions to the session options tools list alongside your voice, modality, and turn-detection settings.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/csharp/voice-live-quickstarts/MCPQuickstart/MCPQuickstart.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- `VoiceLiveSessionOptions` bundles MCP tools with audio format, voice, and turn detection settings.
- `ConfigureSessionAsync(options)` sends the full configuration to Voice Live.
- Voice Live automatically discovers available tools from each MCP server after the session starts.

## Handle MCP events

Process MCP-specific events in the event loop. The key events include MCP tool call creation, completion, failure, and approval requests.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/csharp/voice-live-quickstarts/MCPQuickstart/MCPQuickstart.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

## Handle approval requests

When a server is configured with `RequireApproval = "always"`, client code must handle the approval flow. Instead of blocking on `Console.ReadLine()`, inject a system message so the model asks the user verbally and parse the spoken transcript for intent.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/csharp/voice-live-quickstarts/MCPQuickstart/MCPQuickstart.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- A system message instructs the model to verbally ask for permission.
- `McpApprovalResponseItem` sends the decision back to Voice Live with `Approve = true` or `Approve = false`.

## Resolve voice-based approval

Parse the user's spoken transcript to determine approval. Use word-boundary regex to avoid false positives from words like "yesterday" or "nobody".

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/csharp/voice-live-quickstarts/MCPQuickstart/MCPQuickstart.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- The transcript from `ConversationItemInputAudioTranscriptionCompleted` is matched against `\byes\b` and `\b(no|stop|cancel)\b` patterns.
- Subsequent calls to the same server within the same turn are auto-approved to avoid repeated prompts.
- After a configurable maximum (for example, 3 approvals), further calls are auto-denied and the model responds with what it has.

## Detect stalls during MCP tool calls

MCP tool calls can take several seconds. Use a repeating timer to proactively inform the user that the assistant is still waiting for results.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/csharp/voice-live-quickstarts/MCPQuickstart/MCPQuickstart.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- A 10-second interval timer injects system messages like "Tell the user you're still waiting" up to 3 times.
- The timer is cancelled when the MCP call completes or the user interrupts with barge-in.

## Run the sample

1. Create the **MCPQuickstart.cs** file with the following code:

    [Code reference unavailable in this source snapshot: ~/voice-live-samples-code/csharp/voice-live-quickstarts/MCPQuickstart/MCPQuickstart.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

1. Sign in to Azure with the following command:

    ```shell
    az login
    ```

1. Build and run the application:

    ```shell
    dotnet run
    ```

1. Speak into your microphone. Try asking questions like "What tools do you have?" or "Search the Azure documentation for Voice Live API."

    - For the `deepwiki` server (`RequireApproval = "never"`), tool calls execute automatically.
    - For the `azure_doc` server (`RequireApproval = "always"`), you're prompted to approve each tool call in the console.

1. Press **Ctrl+C** to stop the session.

## MCP server configuration reference

| Parameter | Required | Description |
| --- | --- | --- |
| `ServerLabel` | Yes | Display name for the MCP server. |
| `ServerUrl` | Yes | URL of the remote MCP endpoint. |
| `AllowedTools` | No | List of tool names the model can call. If omitted, all tools are allowed. |
| `RequireApproval` | No | `"never"`, `"always"` (default), or a per-tool dictionary. |
| `Headers` | No | Extra HTTP headers to include in MCP requests. |
| `Authorization` | No | Authorization token for MCP requests. |

For the complete REST API type definition, see [MCPTool](voice-live-api-reference-2026-01-01-preview.md#mcptool) in the Voice Live API reference.



**Applies to: programming-language-java**


Learn how to connect remote MCP servers to a Voice Live session using the VoiceLive SDK for Java. This article builds on the [Quickstart: Create a Voice Live real-time voice agent](voice-live-quickstart.md) with MCP server integration.


[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/ai-voicelive-readme) | [Package (Maven)](https://central.sonatype.com/artifact/com.azure/azure-ai-voicelive/overview) | [Additional samples on GitHub](https://aka.ms/voicelive/github-java)



Follow the how-to below or get the full sample code:

> 
> [Voice Live MCP sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/java/voice-live-quickstarts/MCPQuickstart)

## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/) version 11 or later.
- [Apache Maven](https://maven.apache.org/download.cgi) installed.
- A [Microsoft Foundry resource](../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](voice-live.md).
- `azure-ai-voicelive` package version 1.0.0 or later (MCP support requires API version `2026-04-10`).
- Assign the `Cognitive Services User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.

> **Tip:**
> To use Voice Live with MCP, you don't need to deploy an audio model with your Foundry resource. Voice Live is fully managed, and the model is automatically deployed for you. For more information about model availability, see the [Voice Live overview documentation](voice-live.md).

## Prepare the environment

Complete the [Voice Live quickstart](voice-live-quickstart.md) to set up your environment, configure authentication, and test your first Voice Live conversation.

## MCP integration concepts

### MCP server definition

Use the `MCPServer` type to declare each remote MCP endpoint. At minimum, provide `serverLabel` (a display name) and `serverUrl` (the MCP endpoint URL). Optionally restrict available tools with `allowedTools` and configure the approval mode.

### Approval modes

Control whether MCP tool calls require user approval before execution:

- `requireApproval("never")`: The tool executes automatically when the model invokes it.
- `requireApproval("always")` (default): The client receives an approval request and must respond before the tool runs.

### API version requirement

MCP support requires API version `2026-04-10` or later.

## Define MCP servers

Define the MCP servers that Voice Live can use during the session. Each server is an `MCPServer` instance added to the tools list in the session configuration.

The following code defines two MCP servers: one with automatic tool execution and one that requires user approval before running.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/java/voice-live-quickstarts/MCPQuickstart/src/main/java/MCPQuickstart.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- The `deepwiki` server allows only `read_wiki_structure` and `ask_question` tools, with `requireApproval` set to `"never"` for automatic execution.
- The `azure_doc` server allows all tools on the endpoint, with `requireApproval` set to `"always"` so users can review each call before execution.

## Configure the session with MCP tools

Pass the MCP server definitions to the session options tools list alongside your voice, modality, and turn-detection settings.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/java/voice-live-quickstarts/MCPQuickstart/src/main/java/MCPQuickstart.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- `VoiceLiveSessionOptions` bundles MCP tools with audio format, voice, and turn detection settings.
- The session configuration is sent to Voice Live after connecting.
- Voice Live automatically discovers available tools from each MCP server after the session starts.

## Handle MCP events

Process MCP-specific events in the event loop. The key events include MCP tool call creation, completion, failure, and approval requests.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/java/voice-live-quickstarts/MCPQuickstart/src/main/java/MCPQuickstart.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

## Handle approval requests

When a server is configured with `requireApproval("always")`, client code must handle the approval flow. Instead of blocking on `Scanner.nextLine()`, inject a system message so the model asks the user verbally and parse the spoken response.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/java/voice-live-quickstarts/MCPQuickstart/src/main/java/MCPQuickstart.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- A system message instructs the model to verbally ask for permission.
- `MCPApprovalResponseRequestItem` sends the decision back to Voice Live.

## Resolve voice-based approval

Parse the user's spoken transcript to determine approval. Use word-boundary regex to avoid false positives from words like "yesterday" or "nobody".

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/java/voice-live-quickstarts/MCPQuickstart/src/main/java/MCPQuickstart.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- The transcript from `CONVERSATION_ITEM_INPUT_AUDIO_TRANSCRIPTION_COMPLETED` is matched against `\byes\b` and `\b(no|stop|cancel)\b` patterns.
- Subsequent calls to the same server within the same turn are auto-approved to avoid repeated prompts.
- After a configurable maximum (for example, 3 approvals), further calls are auto-denied and the model responds with what it has.

## Detect stalls during MCP tool calls

MCP tool calls can take several seconds. Use a repeating timer to proactively inform the user that the assistant is still waiting for results.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/java/voice-live-quickstarts/MCPQuickstart/src/main/java/MCPQuickstart.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- A `ScheduledExecutorService` fires at a 10-second interval, injecting system messages up to 3 times.
- The timer is cancelled when the MCP call completes or the user interrupts with barge-in.

## Run the sample

1. Create the **src/main/java/MCPQuickstart.java** file with the following code:

    [Code reference unavailable in this source snapshot: ~/voice-live-samples-code/java/voice-live-quickstarts/MCPQuickstart/src/main/java/MCPQuickstart.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

1. Sign in to Azure with the following command:

    ```shell
    az login
    ```

1. Build and run the application:

    ```shell
    mvn compile exec:java -Dexec.mainClass="MCPQuickstart" -q
    ```

1. Speak into your microphone. Try asking questions like "What tools do you have?" or "Search the Azure documentation for Voice Live API."

    - For the `deepwiki` server (`requireApproval="never"`), tool calls execute automatically.
    - For the `azure_doc` server (`requireApproval="always"`), you're prompted to approve each tool call in the console.

1. Press **Ctrl+C** to stop the session.

## MCP server configuration reference

| Parameter | Required | Description |
| --- | --- | --- |
| `serverLabel` | Yes | Display name for the MCP server. |
| `serverUrl` | Yes | URL of the remote MCP endpoint. |
| `allowedTools` | No | List of tool names the model can call. If omitted, all tools are allowed. |
| `requireApproval` | No | `"never"`, `"always"` (default), or a per-tool dictionary. |
| `headers` | No | Extra HTTP headers to include in MCP requests. |
| `authorization` | No | Authorization token for MCP requests. |

For the complete REST API type definition, see [MCPTool](voice-live-api-reference-2026-01-01-preview.md#mcptool) in the Voice Live API reference.



**Applies to: programming-language-javascript**


Learn how to connect remote MCP servers to a Voice Live session using the VoiceLive SDK for JavaScript. This article builds on the [Quickstart: Create a Voice Live real-time voice agent](voice-live-quickstart.md) with MCP server integration.


[Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-voicelive-readme) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-voicelive) | [Additional samples on GitHub](https://aka.ms/voicelive/github-javascript)



Follow the how-to below or get the full sample code:

> 
> [Voice Live MCP sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/javascript/voice-live-quickstarts/MCPQuickstart)

> **Note:**
> The JavaScript Voice Live SDK is designed for browser-based applications with built-in WebSocket and Web Audio support. This how-to guide uses Node.js with `node-record-lpcm16` and `speaker` for a console experience.

## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Node.js](https://nodejs.org/) version 18 or later.
- [SoX](https://sox.sourceforge.io/) installed on your system (required by `node-record-lpcm16` for microphone capture).
- A [Microsoft Foundry resource](../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](voice-live.md).
- `@azure/ai-voicelive` package version 1.0.0 or later (MCP support requires API version `2026-04-10`).
- Assign the `Cognitive Services User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.

> **Tip:**
> To use Voice Live with MCP, you don't need to deploy an audio model with your Foundry resource. Voice Live is fully managed, and the model is automatically deployed for you. For more information about model availability, see the [Voice Live overview documentation](voice-live.md).

## Prepare the environment

Complete the [Voice Live quickstart](voice-live-quickstart.md) to set up your environment, configure authentication, and test your first Voice Live conversation.

## MCP integration concepts

### MCP server definition

Use an MCP server object with `type: "mcp"` to declare each remote MCP endpoint. At minimum, provide `server_label` (a display name) and `server_url` (the MCP endpoint URL). Optionally restrict available tools with `allowed_tools` and configure the approval mode.

### Approval modes

Control whether MCP tool calls require user approval before execution:

- `require_approval: "never"`: The tool executes automatically when the model invokes it.
- `require_approval: "always"` (default): The client receives an approval request and must respond before the tool runs.

### API version requirement

MCP support requires API version `2026-04-10` or later.

## Define MCP servers

Define the MCP servers that Voice Live can use during the session. Each server is an MCP server object added to the tools list in the session configuration.

The following code defines two MCP servers: one with automatic tool execution and one that requires user approval before running.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/javascript/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- The `deepwiki` server allows only `read_wiki_structure` and `ask_question` tools, with `require_approval` set to `"never"` for automatic execution.
- The `azure_doc` server allows all tools on the endpoint, with `require_approval` set to `"always"` so users can review each tool call before execution.

## Configure the session with MCP tools

Pass the MCP server definitions to the session configuration alongside your voice, modality, and turn-detection settings.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/javascript/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- The session configuration bundles MCP tools with audio format, voice, and turn detection settings.
- `session.updateSession(...)` sends the full configuration to Voice Live.
- Voice Live automatically discovers available tools from each MCP server after the session starts.

## Handle MCP events

Process MCP-specific events in the event loop. The key events include MCP tool call creation, completion, failure, and approval requests.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/javascript/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

## Handle approval requests

When a server is configured with `require_approval: "always"`, client code must handle the approval flow. Instead of blocking on `readline`, the sample injects a system message so the model asks the user verbally. The user's spoken transcript is then parsed for intent using word-boundary regex (`\byes\b`, `\b(no|stop|cancel)\b`).

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/javascript/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- A system message instructs the model to verbally ask for permission.
- `mcp_approval_response` sends the decision back to Voice Live with `approve: true` or `approve: false`.

## Resolve voice-based approval

Parse the user's spoken transcript to determine approval. Use word-boundary regex to avoid false positives from words like "yesterday" or "nobody".

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/javascript/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- The transcript from `conversation.item.input_audio_transcription.completed` is matched against `\byes\b` and `\b(no|stop|cancel)\b` patterns.
- Subsequent calls to the same server within the same turn are auto-approved to avoid repeated prompts.
- After a configurable maximum (for example, 3 approvals), further calls are auto-denied and the model responds with what it has.

## Detect stalls during MCP tool calls

MCP tool calls can take several seconds. Use a repeating timer to proactively inform the user that the assistant is still waiting for results.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/javascript/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

In this sample:

- A `setInterval` timer fires at a 10-second interval, injecting system messages up to 3 times.
- The timer is cancelled when the MCP call completes or the user interrupts with barge-in.

## Run the sample

1. Create the **mcp-quickstart.js** file with the following code:

    [Code reference unavailable in this source snapshot: ~/voice-live-samples-code/javascript/voice-live-quickstarts/MCPQuickstart/mcp-quickstart.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-mcp-server.md)

1. Sign in to Azure with the following command:

    ```shell
    az login
    ```

1. Run the application:

    ```shell
    node mcp-quickstart.js
    ```

1. Speak into your microphone. Try asking questions like "What tools do you have?" or "Search the Azure documentation for Voice Live API."

    - For the `deepwiki` server (`require_approval: "never"`), tool calls execute automatically.
    - For the `azure_doc` server (`require_approval: "always"`), you're prompted to approve each tool call in the console.

1. Press **Ctrl+C** to stop the session.

## MCP server configuration reference

| Parameter | Required | Description |
| --- | --- | --- |
| `server_label` | Yes | Display name for the MCP server. |
| `server_url` | Yes | URL of the remote MCP endpoint. |
| `allowed_tools` | No | List of tool names the model can call. If omitted, all tools are allowed. |
| `require_approval` | No | `"never"`, `"always"` (default), or a per-tool dictionary. |
| `headers` | No | Extra HTTP headers to include in MCP requests. |
| `authorization` | No | Authorization token for MCP requests. |

For the complete REST API type definition, see [MCPTool](voice-live-api-reference-2026-01-01-preview.md#mcptool) in the Voice Live API reference.




## Best practices

Integrating MCP servers into a voice assistant introduces UX challenges that don't exist in text-based or console-based MCP clients. MCP tool calls can take 3–60+ seconds, approval prompts must happen conversationally, and users expect continuous spoken feedback. Plan for these patterns when building a voice-enabled MCP integration.

### Voice-native approval

Console-based MCP samples typically use blocking input (such as `input()` or `readline`) for approval. In a voice assistant, blocking the audio pipeline freezes the conversation. Instead, handle approvals conversationally:

- Inject a system message that instructs the model to **verbally ask for permission**.
- Parse the user's spoken response for clear intent (`yes`, `no`, `stop`, `cancel`).
- Allow **barge-in** so the user can say "yes" without waiting for the full approval prompt to finish.
- Use word-boundary matching (such as `\byes\b`) to avoid false positives from words like "yesterday" or "nobody".

### System instructions for the approval flow

The model needs explicit instructions about the approval flow in its system prompt. Without them, it might paraphrase the permission request into a generic "Let me look that up," skipping the actual question. Include language like:

> *"Some tools require user approval. When you receive a system message asking you to request permission, you MUST clearly ask the user for their explicit approval. Never skip the approval question or assume permission is granted."*

Use `"Say exactly:"` phrasing in per-request system messages to prevent the model from rewording the question.

### Handle repeated tool calls

MCP servers might require multiple searches to gather complete information. Each search triggers a separate approval if `require_approval="always"`. Rather than asking the identical question each time:

- Track the call count per server.
- Change the prompt wording for subsequent calls (for example, "I need one more search. Should I continue?").
- Consider auto-denying after a maximum number of approved calls (for example, 3) to prevent infinite loops. The model responds with what it has.
- Reset the counter when results are delivered or the user denies a request.

For approval-required servers, consider auto-approving subsequent calls to the **same server within the same turn** to avoid repeated voice prompts for what is logically a single task.

### Fill silence during tool calls

MCP tool calls can take several seconds to complete. Without feedback, the user assumes the assistant is unresponsive. Use these complementary layers:

1. **Tool announcements** (immediate, client-side): For auto-approved servers, have the assistant say something like "Let me look that up" when the call starts. Skip this for approval-required servers since the approval prompt already communicates that a tool call is happening.
2. **Stall detection** (client-side, repeating timer): If a tool call runs longer than expected, proactively tell the user the assistant is still waiting. A 10-second interval with a maximum of 3 notifications works well for medium-latency servers (5–15 seconds). Adjust the interval based on your expected MCP server latency.

> **Note:**
> MCP calls can't be cancelled. Stall notifications are status updates, not actionable options. Once a call starts, it runs until the server responds or times out.

### Handle barge-in during MCP calls

Users naturally try to interrupt or ask "Are you still there?" during long tool calls. Rather than ignoring this:

- Inject a system message so the model can acknowledge the user.
- If the original MCP call completes later, introduce its result as a late result (for example, "By the way, those results from earlier just came in...").
- Protect against response collisions: when a cancelled response's completion handler runs, skip any deferred processing (pending approval prompts, queued MCP results) so it doesn't overlap with the user's new turn.

### Choose MCP servers for voice latency

Not all MCP servers are well-suited for voice UX. When selecting MCP servers for a voice assistant:

- **Prefer low-latency servers** — search APIs, simple lookups, and cached data sources that respond within 5 seconds work best.
- **Avoid servers that perform heavy computation** — large repository analysis, complex document retrieval, or multi-step workflows can take 30–60+ seconds, degrading the voice experience.
- **Plan for non-cancellable calls** — MCP calls can't be cancelled from the client. If the user moves on during a slow call, the result arrives out of context and must be introduced as a late result, which can feel disjointed.
- **Consider your use case** — if users expect real-time answers, long-running MCP servers frustrate them. If the interaction style is more like a research assistant, asynchronous results might be acceptable.

## Troubleshooting

### MCP tool discovery fails (`mcp_list_tools.failed`)

Voice Live contacts each MCP server's tool listing endpoint at session start. If discovery fails, no tools from that server are available during the session.

| Cause | Resolution |
| --- | --- |
| Incorrect `server_url` | Verify the MCP server URL is reachable and includes the correct path (for example, `https://mcp.deepwiki.com/mcp`). |
| Server is unreachable | Confirm the MCP server is running and accessible from Azure's network. Check firewall rules and DNS resolution. |
| Authentication failure | If the server requires authentication, verify the `authorization` or `headers` values are correct and not expired. |
| Server returns invalid tool schema | Check the MCP server's tool listing response conforms to the MCP specification. |

### MCP tool call fails (`response.mcp_call.failed`)

A tool call failure means Voice Live successfully discovered the tool but the call didn't complete.

| Cause | Resolution |
| --- | --- |
| Server timeout | The MCP server took too long to respond. Optimize the server-side handler or choose a lower-latency server. |
| Server returned an error | Check your MCP server logs. Common issues include missing parameters, invalid input, or downstream service failures. |
| Network interruption | Transient network errors between Voice Live and the MCP server. Retry by prompting the model again. |

> **Tip:**
> When an MCP call fails, trigger `response.create` so the model can inform the user and continue the conversation. The sample code does this automatically.

### No MCP events received

| Cause | Resolution |
| --- | --- |
| Wrong API version | MCP requires `api_version="2026-04-10"` or later. Earlier API versions silently ignore MCP server configuration. |
| MCP servers not in session config | Verify that `MCPServer` objects are included in the `tools` list passed to `configure_session` or `updateSession`. |
| `allowed_tools` mismatch | If `allowed_tools` is set, only the listed tool names are exposed. Verify the names match exactly what the MCP server advertises. |

### Approval requests not received

| Cause | Resolution |
| --- | --- |
| `require_approval` set to `"never"` | Tool calls auto-execute without approval. Change to `"always"` or use a per-tool dictionary if you need approval for specific tools. |
| Event handler not subscribed | Ensure your code listens for `mcp_approval_request` conversation items in the event loop. |
| Duplicate handling | The approval request arrives as a conversation item creation event, not a standalone event type. Check that your `conversation.item.created` handler inspects the item type. |

### Response collision errors during MCP flow

Voice Live doesn't allow overlapping responses. During MCP flows, `response.create` calls can collide with an in-progress response.

| Cause | Resolution |
| --- | --- |
| `"Cancellation failed: no active response"` | Non-fatal. This occurs when a cancel is issued but the response already completed. Log and ignore. |
| `"active response"` errors | A new `response.create` was attempted while another response is still generating. Track response state (`response.created` / `response.done` events) and defer actions until the active response completes. |
| Interim response errors | Some model pipelines don't support `interimResponse`. If you receive interim response errors, remove the interim response configuration or verify your model supports it. |


## Related content

- [Function calling in Voice Live](how-to-voice-live-function-calling.md)
- [How to build a voice agent](how-to-voice-agent-integration.md)
- [Voice Live API reference](voice-live-api-reference-2026-04-10.md)
- [Voice Live quickstart](voice-live-quickstart.md)
