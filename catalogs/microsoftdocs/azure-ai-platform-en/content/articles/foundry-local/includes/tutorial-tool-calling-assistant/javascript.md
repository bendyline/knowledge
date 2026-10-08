---
author: laujan
ms.author: lajanuar
ms.reviewer: samkemp
ms.topic: include
ms.date: 06/04/2026
---


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/javascript/foundry-local/tutorial-tool-calling
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


## Define tools

Tool calling lets the model request that your code runs a function and returns the result. You define the available tools as a list of JSON schemas that describe each function's name, purpose, and parameters.

1. Create a file called `index.js`.

1. Add the following tool definitions:

    [Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/tutorial-tool-calling/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-tool-calling-assistant/javascript.md)

    Each tool definition includes a `name`, a `description` that helps the model decide when to use it, and a `parameters` schema that describes the expected input.

1. Add the JavaScript functions that implement each tool:

    [Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/tutorial-tool-calling/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-tool-calling-assistant/javascript.md)

    The model doesn't run these functions directly. It returns a tool call request with the function name and arguments, and your code executes the function.

## Send a message that triggers tool use

Initialize the Foundry Local SDK, load a model, and send a message that the model can answer by calling a tool.

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/tutorial-tool-calling/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-tool-calling-assistant/javascript.md)

When the model determines that a tool is needed, the response contains `tool_calls` instead of a regular text message. The next step shows how to detect and handle these calls.

## Execute the tool and return results

After the model responds with a tool call, you extract the function name and arguments, run the function, and send the result back.

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/tutorial-tool-calling/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-tool-calling-assistant/javascript.md)

The key steps in the tool calling loop are:

1. **Detect tool calls** — check `response.choices[0]?.message?.tool_calls`.
1. **Execute the function** — parse the arguments and call your local function.
1. **Return the result** — add a message with role `tool` and the matching `tool_call_id`.
1. **Get the final answer** — the model uses the tool result to generate a natural response.

## Handle the complete tool calling loop

Here's the complete application that combines tool definitions, SDK initialization, and the tool calling loop into a single runnable file.

Create a file named `index.js` and add the following complete code:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/tutorial-tool-calling/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-tool-calling-assistant/javascript.md)

Run the tool-calling assistant:

```bash
node index.js
```

You see output similar to:

```
Downloading model: 100.00%
Model downloaded.
Model loaded and ready.

Tool-calling assistant ready! Type 'quit' to exit.

You: What's the weather like today?
  Tool call: get_weather({"location":"current location"})
Assistant: The weather today is sunny with a temperature of 22°C.

You: What is 245 * 38?
  Tool call: calculate({"expression":"245 * 38"})
Assistant: 245 multiplied by 38 equals 9,310.

You: quit
Model unloaded. Goodbye!
```

The model decides when to call a tool based on the user's message. For a weather question it calls `get_weather`, for math it calls `calculate`, and for general questions it responds directly without any tool calls.
