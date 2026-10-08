---
title: "Use tool calling with Foundry Local"
titleSuffix: Foundry Local
description: "Learn how to write applications with Foundry Local that make use of tool calling"
ms.service: microsoft-foundry
ms.subservice: foundry-local
ms.topic: how-to
ms.author: nakersha
ms.reviewer: metang
author: natke
reviewer: metang
zone_pivot_groups: foundry-local-sdk
ms.date: 05/16/2026
---

# How to use tool calling with Foundry Local

Foundry Local can make use of tool calling, a technique where you prompt the model with definitions of available tools that together with a text prompt, allow the model to work out which tools should be called and with what input data. The application then calls those tools and adds the results to a subsequent model prompt to answer the user's query.

The tools can perform functions that the model doesn't have access to, such as getting the current weather, or reading files on the local file system, or accessing a user's address book (providing the application has permission to do so).

This guide shows you how to use this feature of Foundry Local.

## Models that support tool calling

Using the Foundry Local CLI, you can run the `foundry model list` command to see which models support tool calling.

In the `Task` column, you can see that the `tools` task indicates that tool calling is supported.

**Applies to: programming-language-csharp**


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

The C# samples in the GitHub repository are preconfigured projects. If you're building from scratch, you should read the [Foundry Local SDK reference](../reference/reference-sdk-current.md) for more details on how to set up your C# project with Foundry Local. 


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

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/tool-calling-foundry-local-sdk/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-use-tool-calling-with-foundry-local.md)

## Run the native chat completions example

```bash
dotnet run
```

## Use OpenAI Web server for tool calling

If you prefer to use the OpenAI SDKs to call the Foundry Local web service, use the following example that demonstrates how to handle tool calling in that scenario.

> **Tip:**
> Use `options.ToolChoice = ChatToolChoice.CreateAutoChoice();` (the default) for the most reliable behavior. Write clear tool names and descriptions so the model calls the correct tool on its own.

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/tool-calling-foundry-local-web-server/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-use-tool-calling-with-foundry-local.md)

## Run the OpenAI web service example

```bash
dotnet run
```


**Applies to: programming-language-javascript**


## Prerequisites
- [Node.js 20](https://nodejs.org/en/download/) or later installed.


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/javascript/foundry-local/tool-calling-foundry-local
```

## Install packages


If you're developing or shipping on Windows, select the **Windows** tab. The Windows package integrates with the [Windows ML](https://learn.microsoft.com/windows/ai/new-windows-ml/overview) runtime — it provides the same API surface area with a wider breadth of hardware acceleration.

### [Windows](#tab/windows)

```bash
npm install foundry-local-sdk-winml openai
```

### [Cross-Platform](#tab/xplatform)

```bash
npm install foundry-local-sdk openai
```

---


## Understanding tool choice settings

The tool choice parameter controls whether and how the model invokes the tools you provide. Tool choice is sent as part of the chat completion request alongside your tool definitions.

Different models have different capabilities when it comes to tool calling, but in general you can expect the following behavior for each option:

| Option | Value | Behavior | Reliability |
| --- | --- | --- | --- |
| **Auto** | `"auto"` | The model decides whether to call a tool or respond directly, based on the user's message and the available tool definitions. | Reliable across all tool-calling models |
| **None** | `"none"` | The model doesn't invoke any tools, even if tools are provided in the request. | Reliable across all tool-calling models |
| **Required** | `"required"` | The model must call at least one tool. | Best-effort |
| **Specific function** | `{"type": "function", "function": {"name": "my_function"}}` | The model must call the specified function. | Best-effort |

## Use chat completions with tool calling

Copy and paste the following code into a JavaScript file named `app.js`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/tool-calling-foundry-local/src/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-use-tool-calling-with-foundry-local.md)

To run the application, execute the following command in your terminal:

```bash
node app.js
```


**Applies to: programming-language-python**


## Prerequisites

- [Python 3.11](https://www.python.org/downloads/) or later installed.


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/python/foundry-local/tool-calling
```

## Install packages


If you're developing or shipping on Windows, select the **Windows** tab. The Windows package integrates with the [Windows ML](https://learn.microsoft.com/windows/ai/new-windows-ml/overview) runtime — it provides the same API surface area with a wider breadth of hardware acceleration.

### [Windows](#tab/windows)

```bash
pip install foundry-local-sdk-winml openai
```

### [Cross-Platform](#tab/xplatform)

```bash
pip install foundry-local-sdk openai
```

---


Install the OpenAI SDK:

```bash
pip install openai
```

## Understanding tool choice settings

The tool choice parameter controls whether and how the model invokes the tools you provide. The parameter is sent as part of the chat completion request alongside your tool definitions.

Different models have different capabilities when it comes to tool calling, but in general you can expect the following behavior for each option:

| Option | Value | Behavior | Reliability |
| --- | --- | --- | --- |
| **Auto** | `"auto"` | The model decides whether to call a tool or respond directly, based on the user's message and the available tool definitions. | Reliable across all tool-calling models |
| **None** | `"none"` | The model won't call any tools, even if tools are provided in the request. | Reliable across all tool-calling models |
| **Required** | `"required"` | The model must call at least one tool. | Best-effort |
| **Specific function** | `{"type": "function", "function": {"name": "my_function"}}` | The model must call the specified function. | Best-effort |

## Use chat completions with tool calling

Copy and paste the following code into a Python file named `app.py`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/python/foundry-local/tool-calling/src/app.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-use-tool-calling-with-foundry-local.md)

To run the application, execute the following command in your terminal:

```bash
python app.py
```


**Applies to: programming-language-rust**


## Prerequisites

- [Rust and Cargo](https://www.rust-lang.org/tools/install) installed (Rust 1.70.0 or later).


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/rust/foundry-local/tool-calling-foundry-local
```

## Install packages


If you're developing or shipping on Windows, select the **Windows** tab. The Windows package integrates with the [Windows ML](https://learn.microsoft.com/windows/ai/new-windows-ml/overview) runtime — it provides the same API surface area with a wider breadth of hardware acceleration.

### [Windows](#tab/windows)

```bash
cargo add foundry-local-sdk --features winml
cargo add tokio --features full
cargo add tokio-stream anyhow
```

### [Cross-Platform](#tab/xplatform)

```bash
cargo add foundry-local-sdk
cargo add tokio --features full
cargo add tokio-stream anyhow
```

---


Add extra dependencies for HTTP and JSON:

```bash
cargo add anyhow reqwest --features reqwest/json
cargo add serde serde_json --features serde/derive
```

## Understanding tool choice settings

The tool choice parameter controls whether and how the model invokes the tools you provide. Tool choice is sent as part of the chat completion request alongside your tool definitions.

Different models have different capabilities when it comes to tool calling, but in general you can expect the following behavior for each option:

| Option | Value | Behavior | Reliability |
| --- | --- | --- | --- |
| **Auto** | `"auto"` | The model decides whether to call a tool or respond directly, based on the user's message and the available tool definitions. | Reliable across all tool-calling models |
| **None** | `"none"` | The model doesn't call any tools, even if tools are provided in the request. | Reliable across all tool-calling models |
| **Required** | `"required"` | The model must call at least one tool. | Best effort (tool call could be ignored by smaller models) |
| **Specific function** | `{"type": "function", "function": {"name": "my_function"}}` | The model must call the specified function. | Best-effort (tool call could be ignored by smaller models) |

## Use chat completions with tool calling

Replace the contents of `src/main.rs` with the following code:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/rust/foundry-local/tool-calling-foundry-local/src/main.rs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-use-tool-calling-with-foundry-local.md)

To run the application, execute the following command in your terminal:

```bash
cargo run
```



## Related content

- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
