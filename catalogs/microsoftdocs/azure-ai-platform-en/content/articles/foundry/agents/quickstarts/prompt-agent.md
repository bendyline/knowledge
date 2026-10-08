---
title: "Quickstart: Create a prompt agent"
description: "Learn how to create a prompt agent in Foundry Agent Service using the Microsoft Foundry SDK, then have a multi-turn conversation with the agent you create."
author: aahill
ms.author: aahi
ms.date: 09/09/2026
ms.service: microsoft-foundry
ms.subservice: foundry-agent-service
ms.topic: quickstart
ms.custom: update-code9
ai-usage: ai-assisted
# customer intent: As a developer, I want to create a prompt agent in Foundry Agent Service so that I can build AI-powered automation.
---

# Quickstart: Create a prompt agent

In this quickstart, you create a prompt agent in Foundry Agent Service and have a conversation with it. A prompt agent is a declaratively defined agent that combines a model from the Foundry model catalog, instructions, tools, and natural language prompts to drive behavior.

> **Tip:**
> For a managed real-time voice experience, use a [voice-based prompt agent](prompt-voice-agent.md). Voice-based prompt agents use Voice Live for spoken conversations and don't require you to host the voice orchestration code.

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Prerequisites

* A model deployed in Microsoft Foundry. If you don't have a model, first complete [Quickstart: Set up Microsoft Foundry resources](../../tutorials/quickstart-create-foundry-resources.md).
* The required language runtimes, global tools, and Visual Studio Code extensions as described in [Prepare your development environment](../../how-to/develop/install-cli-sdk.md).

## Get your project endpoint

Copy [your project endpoint](../../tutorials/quickstart-create-foundry-resources.md#get-your-project-connection-details) from the welcome screen in the Foundry portal.

The code samples in this quickstart declare their values as constants at the top of each file. Before you run a sample, replace these placeholders:

* `your_project_endpoint`: Your project endpoint, in the format `https://<resource-name>.services.ai.azure.com/api/projects/<project-name>`.
* `your_agent_name`: A name for your agent, such as `MyAgent`.

## Install packages and authenticate


Make sure you install the correct version of the packages as shown here.

# [Python](#tab/python)

1. Install the current version of `azure-ai-projects`. This version uses the **Foundry projects (new) API**. The samples authenticate by using `DefaultAzureCredential`, which comes from `azure-identity`.

    ```
    pip install "azure-ai-projects>=2.3.0" azure-identity
    ```

1. Sign in using the CLI `az login` command to authenticate before running your Python scripts.

# [C#](#tab/csharp)

1. Install packages:

    Add NuGet packages using the .NET CLI in the integrated terminal: These packages use the **Foundry projects (new) API**.
        
    ```bash
    dotnet add package Azure.AI.Projects
    dotnet add package Azure.AI.Projects.Agents
    dotnet add package Azure.AI.Extensions.OpenAI
    dotnet add package Azure.Identity
    ```

1. Sign in using the CLI `az login` command to authenticate before running your C# scripts.


# [TypeScript](#tab/typescript)

1. Install the current version of `@azure/ai-projects`. This version uses the **Foundry projects (new) API**.:

    ```bash
    npm install @azure/ai-projects @azure/identity
    ```

1. Sign in using the CLI `az login` command to authenticate before running your TypeScript scripts.

# [Java](#tab/java)

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-ai-agents</artifactId>
    <version>2.2.0</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-core</artifactId>
    <version>1.57.0</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.18.1</version>
</dependency>
```

1. Sign in using the CLI `az login` command to authenticate before running your Java scripts.

# [REST API](#tab/rest)

1. Sign in using the CLI `az login` command to authenticate before running the next command.
1. Get a temporary access token. It will expire in 60-90 minutes, you'll need to refresh after that.

    ```azurecli
    az account get-access-token --scope https://ai.azure.com/.default
    ```
    
1. Save the results as the environment variable `AZURE_AI_AUTH_TOKEN`.  


# [Foundry portal](#tab/portal)

No installation is necessary to use the Foundry portal.

---


> **Tip:**
> Code uses **Azure AI Projects 2.x** and is incompatible with Azure AI Projects 1.x. [See the Foundry (classic) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/index.yml)  for the Azure AI Projects 1.x version.


## Create a prompt agent

Create a prompt agent using your deployed model. The agent uses a `PromptAgentDefinition` with instructions that define the agent's behavior. You can update or delete agents anytime.

# [Python](#tab/python)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/quickstart/create-agent/quickstart-create-agent.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/agents/quickstarts/prompt-agent.md)

# [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/csharp/quickstart/create-agent/quickstart-create-agent.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/agents/quickstarts/prompt-agent.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/typescript/quickstart/create-agent/src/quickstart-create-agent.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/agents/quickstarts/prompt-agent.md)

# [Java](#tab/java)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/java/quickstart/create-agent/src/main/java/com/azure/ai/foundry/samples/CreateAgent.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/agents/quickstarts/prompt-agent.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` with your values:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/REST/quickstart/quickstart-create-agent.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/agents/quickstarts/prompt-agent.md)

---

The output confirms the agent was created. You see the agent name and ID printed to the console.

## Chat with the agent

Use the agent you created to interact by asking a question and a related follow-up. The conversation maintains history across these interactions.

# [Python](#tab/python)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/quickstart/chat-with-agent/quickstart-chat-with-agent.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/agents/quickstarts/prompt-agent.md)

# [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/csharp/quickstart/chat-with-agent/quickstart-chat-with-agent.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/agents/quickstarts/prompt-agent.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/typescript/quickstart/chat-with-agent/src/quickstart-chat-with-agent.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/agents/quickstarts/prompt-agent.md)

# [Java](#tab/java)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/java/quickstart/chat-with-agent/src/main/java/com/azure/ai/foundry/samples/ChatWithAgent.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/agents/quickstarts/prompt-agent.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` with your values, and set the `FOUNDRY_AGENT_NAME` environment variable to the agent name you used:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/REST/quickstart/quickstart-chat-with-agent.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/agents/quickstarts/prompt-agent.md)

---

You see the agent's responses to both prompts. The follow-up response demonstrates that the agent maintains conversation history across turns.

## Clean up resources


If you no longer need any of the resources you created, delete the resource group associated with your project.

* In the [Azure portal](https://portal.azure.com), select the resource group, and then select **Delete**. Confirm that you want to delete the resource group.

## Related content

- [Agent development lifecycle](../concepts/development-lifecycle.md)
- [What is Foundry Agent Service?](../overview.md)
- [Use tools with agents](../how-to/tools/model-context-protocol.md)
- [Quickstart: Deploy your first hosted agent](quickstart-hosted-agent.md)
