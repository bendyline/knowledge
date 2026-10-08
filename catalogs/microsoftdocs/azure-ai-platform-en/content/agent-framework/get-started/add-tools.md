---
title: "Step 2: Add Tools"
description: "Give your agent the ability to call functions and interact with the world."
zone_pivot_groups: programming-languages
author: eavanvalkenburg
ms.topic: tutorial
ms.author: edvan
ms.date: 10/07/2026
ms.service: agent-framework
ai-usage: ai-assisted
ms.custom: update-code2
---

# Step 2: Add Tools

Tools let your agent call custom functions — like fetching weather data, querying a database, or calling an API.

Before you add tools, review the [tool approval security best practices](../concepts/agents/safety.md#require-approval-for-high-risk-tools) to decide which operations need human confirmation.

**Applies to: programming-language-csharp**


Define a tool as any method with a `[Description]` attribute:

```csharp
using System.ComponentModel;

[Description("Get the weather for a given location.")]
static string GetWeather([Description("The location to get the weather for.")] string location)
    => $"The weather in {location} is cloudy with a high of 15°C.";
```

Create an agent with the tool:

```csharp
using System;
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")
    ?? throw new InvalidOperationException("Set AZURE_OPENAI_ENDPOINT");
var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME") ?? "gpt-4o-mini";

AIAgent agent = new AIProjectClient(new Uri(endpoint), new DefaultAzureCredential())
    .AsAIAgent(
        model: deploymentName,
        instructions: "You are a helpful assistant.",
        tools: [AIFunctionFactory.Create(GetWeather)]);
```

> **Warning:**
> `DefaultAzureCredential` is convenient for development but requires careful consideration in production. In production, consider using a specific credential (e.g., `ManagedIdentityCredential`) to avoid latency issues, unintended credential probing, and potential security risks from fallback mechanisms.

The agent will automatically call your tool when relevant:

```csharp
Console.WriteLine(await agent.RunAsync("What is the weather like in Amsterdam?"));
```

> **Tip:**
> See [here](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/01-get-started/02_add_tools) for a full runnable sample application.



**Applies to: programming-language-python**


The complete sample defines a tool with the `@tool` decorator, creates an agent with the tool, and runs the agent:

[Code reference unavailable in this source snapshot: ~/../agent-framework-code/python/samples/01-get-started/02_add_tools.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/agent-framework/get-started/add-tools.md)

> **Tip:**
> See the [full sample](https://github.com/microsoft/agent-framework/blob/main/python/samples/01-get-started/02_add_tools.py) for the complete runnable file.



**Applies to: programming-language-go**


Define a tool using `functool`:

```go
import (
    "context"
    "fmt"

    "github.com/microsoft/agent-framework-go/tool"
    "github.com/microsoft/agent-framework-go/tool/functool"
)

var weatherTool = functool.MustNew(functool.Config{
    Name:        "weather",
    Description: "Get the current weather for a given location",
}, func(_ context.Context, location string) (string, error) {
    return fmt.Sprintf("The weather in %s is cloudy with a high of 15°C.", location), nil
})
```

Create an agent with the tool:

```go
a := foundryprovider.NewAgent(
    endpoint,
    token,
    foundryprovider.ModelDeployment(model),
    foundryprovider.AgentConfig{
        Instructions: "You are a helpful assistant",
        Config: agent.Config{
            Tools: []tool.Tool{weatherTool},
        },
    },
)
```

The agent will automatically call your tool when relevant:

```go
resp, err := a.RunText(ctx, "What is the weather like in Amsterdam?").Collect()
fmt.Println(resp, err)
```

> **Tip:**
> See the [full sample](https://github.com/microsoft/agent-framework-go/blob/main/examples/01-get-started/02_add_tools/main.go) for the complete runnable file.



## Next steps

> 
> [Step 3: Multi-Turn Conversations](multi-turn.md)

**Go deeper:**

- [Tools overview](../agents/tools/index.md) — learn about all available tool types
- [Function tools](../agents/tools/function-tools.md) — advanced function tool patterns
- [Tool approval](../agents/tools/tool-approval.md) — human-in-the-loop for tool calls
