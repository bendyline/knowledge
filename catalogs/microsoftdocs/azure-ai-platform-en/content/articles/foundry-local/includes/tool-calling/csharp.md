---
title: Include file
description: Include file
ms.service: microsoft-foundry
ms.topic: include
ms.date: 08/15/2026
ms.author: samkemp
author: samuel100
ai-usage: ai-assisted
---

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later installed.

## Samples repository

You can find the complete sample code for this article in the [Foundry samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample, use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/csharp/foundry-local/tool-calling-foundry-local-sdk
```

## Install packages


If you're developing or shipping on Windows, select the **Windows** tab. The Windows package integrates with the [Windows ML](https://learn.microsoft.com/windows/ai/new-windows-ml/overview) runtime — it provides the same API surface area with a wider breadth of hardware acceleration.

### [Windows](#tab/windows)

```bash
dotnet add package Microsoft.AI.Foundry.Local.WinML
dotnet add package OpenAI
```

### [Cross-Platform](#tab/xplatform)

```bash
dotnet add package Microsoft.AI.Foundry.Local
dotnet add package OpenAI
```

---

The C# samples in the GitHub repository are preconfigured projects. If you're building from scratch, you should read the [Foundry Local SDK reference](../../reference/reference-sdk-current.md) for more details on how to set up your C# project with Foundry Local. 


## Understanding tool choice settings

The tool choice parameter controls whether and how the model invokes the tools you provide. Tool choice is sent as part of the chat completion request alongside your tool definitions.

Different models have different capabilities when it comes to tool calling, but in general you can expect the following behavior for each option:

| Option | Value | Behavior | Reliability |
| --- | --- | --- | --- |
| **Auto** | `"auto"` | The model decides whether to call a tool or respond directly, based on the user's message and the available tool definitions. | Reliable across all tool-calling models |
| **None** | `"none"` | The model won't call any tools, even if tools are provided in the request. | Reliable across all tool-calling models |
| **Required** | `"required"` | The model must call at least one tool. | Best-effort |
| **Specific function** | `{"type": "function", "function": {"name": "my_function"}}` | The model must call the specified function. | Best-effort |


## Use native chat completions with tool calling

Copy and paste the following code into a C# file named `Program.cs`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/tool-calling-foundry-local-sdk/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tool-calling/csharp.md)

## Run the native chat completions example

```bash
dotnet run
```

## Use OpenAI Web server for tool calling

If you prefer to use the OpenAI SDKs to call the Foundry Local web service, use the following example that demonstrates how to handle tool calling in that scenario.

> **Tip:**
> Use `options.ToolChoice = ChatToolChoice.CreateAutoChoice();` (the default) for the most reliable behavior. Write clear tool names and descriptions so the model calls the correct tool on its own.

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/tool-calling-foundry-local-web-server/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tool-calling/csharp.md)

## Run the OpenAI web service example

```bash
dotnet run
```
