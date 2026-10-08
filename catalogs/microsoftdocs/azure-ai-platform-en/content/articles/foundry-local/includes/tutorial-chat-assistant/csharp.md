---
author: laujan
ms.author: lajanuar
ms.reviewer: samkemp
ms.topic: include
ms.date: 08/15/2026
ai-usage: ai-assisted
---


## Samples repository

You can find the complete sample code for this article in the [Foundry samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample, use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/csharp/foundry-local/tutorial-chat-assistant
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


## Browse the catalog and select a model

The Foundry Local SDK provides a model catalog that lists all available models. In this step, you initialize the SDK and select a model for your chat assistant.

- Open `Program.cs` and replace its contents with the following code to initialize the SDK and select a model:

    [Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/tutorial-chat-assistant/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-chat-assistant/csharp.md)

    The `GetModelAsync` method accepts a model alias, which is a short friendly name that maps to a specific model in the catalog. The `DownloadAsync` method fetches the model weights to your local cache, and `LoadAsync` makes the model ready for inference.

## Define a system prompt

A system prompt sets the assistant's personality and behavior. It's the first message in the conversation history and the model references it throughout the conversation.

Add a system prompt to shape how the assistant responds:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/tutorial-chat-assistant/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-chat-assistant/csharp.md)

> **Tip:**
> Experiment with different system prompts to change the assistant's behavior. For example, you can instruct it to respond as a pirate, a teacher, or a domain expert.

## Implement multi-turn conversation

A chat assistant needs to maintain context across multiple exchanges. You achieve this by keeping a list of all messages (system, user, and assistant) and sending the full list with each request. The model uses this history to generate contextually relevant responses.

Add a conversation loop that:

- Reads user input from the console.
- Appends the user message to the history.
- Sends the complete history to the model.
- Appends the assistant's response to the history for the next turn.

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/tutorial-chat-assistant/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-chat-assistant/csharp.md)

Each call to `CompleteChatAsync` receives the full message history. This is how the model "remembers" previous turns — it doesn't store state between calls.

## Add streaming responses

Streaming prints each token as it's generated, which makes the assistant feel more responsive. Replace the `CompleteChatAsync` call with `CompleteChatStreamingAsync` to stream the response token by token.

Update the conversation loop to use streaming:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/tutorial-chat-assistant/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-chat-assistant/csharp.md)

The streaming version accumulates the full response so it can be added to the conversation history after the stream completes.

## Complete code

Replace the contents of `Program.cs` with the following complete code:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/tutorial-chat-assistant/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-chat-assistant/csharp.md)

Run the chat assistant:

```bash
dotnet run
```

You see output similar to:

```
Downloading model: 100.00%
Model loaded and ready.

Chat assistant ready! Type 'quit' to exit.

You: What is photosynthesis?
Assistant: Photosynthesis is the process plants use to convert sunlight, water, and carbon
dioxide into glucose and oxygen. It mainly happens in the leaves, inside structures
called chloroplasts.

You: Why is it important for other living things?
Assistant: It's essential because photosynthesis produces the oxygen that most living things
breathe. It also forms the base of the food chain — animals eat plants or eat other
animals that depend on plants for energy.

You: quit
Model unloaded. Goodbye!
```

Notice how the assistant remembers context from previous turns — when you ask "Why is it important for other living things?", it knows you're still talking about photosynthesis.
