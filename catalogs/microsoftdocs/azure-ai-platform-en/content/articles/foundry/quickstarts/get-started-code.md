---
title: "Quickstart: Get started with Microsoft Foundry SDK"
description: "Learn how to use the Microsoft Foundry SDK to build AI applications with Foundry."
author: sdgilley
ms.author: sgilley
ms.reviewer: dantaylo
ms.date: 09/03/2026
ms.service: microsoft-foundry
ms.subservice: foundry-sdk
ms.topic: quickstart
ms.custom:
  - classic-and-new
  - build-2024
  - devx-track-azurecli
  - devx-track-python
  - ignite-2024
  - update-code15
  - build-aifnd
  - build-2025
  - peer-review-program
  - doc-kit-assisted
ai-usage: ai-assisted
# customer intent: As a developer, I want to start using the Microsoft Foundry portal and client libraries.
---

# Quickstart: Get started with Microsoft Foundry SDK

In this quickstart you'll get started using models and agents in Foundry.

> 
> **You will:**
> - Generate a response from a model
> - Create an agent with a defined prompt
> - Have a multi-turn conversation with the agent

## Prerequisites

* A model deployed in Microsoft Foundry. If you don't have a model, first complete [Quickstart: Set up Microsoft Foundry resources](../tutorials/quickstart-create-foundry-resources.md).

    > **Tip:**
    > Or, skip the deployment step and try an [instant model (preview)](../concepts/instant-models.md) instead. Create a project in **West US 3** to use instant access models. Instant models have no deployment, so use the model name `gpt-5-mini` wherever the samples ask for a deployment name.

* The required language runtimes, global tools, and Visual Studio Code extensions as described in [Prepare your development environment](../how-to/develop/install-cli-sdk.md).


## Get the code and set your values

# [Python](#tab/python)

The Python samples don't read environment variables. In each file, replace these placeholder values:

* `your_project_endpoint`: [Your project endpoint](../tutorials/quickstart-create-foundry-resources.md#get-your-project-connection-details), in the format `https://<resource-name>.services.ai.azure.com/api/projects/<project-name>`.
* `your_agent_name`: A name for your agent, such as `MyAgent`.

The samples use the `gpt-5-mini` deployment you created in [Set up Microsoft Foundry resources](../tutorials/quickstart-create-foundry-resources.md). If you deployed a model under a different name, update the model name in the sample code.

Follow along below or get the code:
> 
> [Get the code](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/quickstart)

# [C#](#tab/csharp)

The C# samples don't read environment variables. In each file, replace these placeholder values:

* `your_project_endpoint`: [Your project endpoint](../tutorials/quickstart-create-foundry-resources.md#get-your-project-connection-details), in the format `https://<resource-name>.services.ai.azure.com/api/projects/<project-name>`.
* `your_agent_name`: A name for your agent, such as `MyAgent`.

The samples use the `gpt-5-mini` deployment you created in [Set up Microsoft Foundry resources](../tutorials/quickstart-create-foundry-resources.md). If you deployed a model under a different name, update the model name in the sample code.

Follow along below or get the code:
> 
> [Get the code](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/csharp/quickstart)

# [TypeScript](#tab/typescript)

The TypeScript samples don't read environment variables. In each file, replace these values with [your project endpoint](../tutorials/quickstart-create-foundry-resources.md#get-your-project-connection-details) and an agent name such as `MyAgent`:

```typescript
const FOUNDRY_PROJECT_ENDPOINT = "https://<resource-name>.services.ai.azure.com/api/projects/<project-name>";
const FOUNDRY_AGENT_NAME = "MyAgent";
```

The samples use the `gpt-5-mini` deployment you created in [Set up Microsoft Foundry resources](../tutorials/quickstart-create-foundry-resources.md). If you deployed a model under a different name, update the model name in the sample code.

Follow along below or get the code:
> 
> [Get the code](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/typescript/quickstart/)

# [Java](#tab/java)

The Java samples don't read environment variables. In each file, replace these values with [your project endpoint](../tutorials/quickstart-create-foundry-resources.md#get-your-project-connection-details) and an agent name such as `MyAgent`:

```java
String foundryProjectEndpoint = "https://<resource-name>.services.ai.azure.com/api/projects/<project-name>";
String foundryAgentName = "MyAgent";
```

The samples use the `gpt-5-mini` deployment you created in [Set up Microsoft Foundry resources](../tutorials/quickstart-create-foundry-resources.md). If you deployed a model under a different name, update the model name in the sample code.

Follow along below or get the code:
> 
> [Get the code](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/java/quickstart/)

# [REST API](#tab/rest)

1. In each request URL, replace `YOUR-FOUNDRY-RESOURCE-NAME` and `YOUR-PROJECT-NAME` with the values from [your project endpoint](../tutorials/quickstart-create-foundry-resources.md#get-your-project-connection-details), which has the form `https://<resource-name>.services.ai.azure.com/api/projects/<project-name>`.

1. The chat-with-agent request reads the agent name from an environment variable:

    ```
    FOUNDRY_AGENT_NAME=MyAgent
    ```

The samples use the `gpt-5-mini` deployment you created in [Set up Microsoft Foundry resources](../tutorials/quickstart-create-foundry-resources.md). If you deployed a model under a different name, update the `model` value in the request body.

Follow along below or get the code:
> 
> [Get the code](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/REST/quickstart).

# [Foundry portal](#tab/portal)

No code is necessary when using the Foundry portal.

---


## Install and authenticate


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



## Chat with a model


Interacting with a model is the basic building block of AI applications.  Send an input and receive a response from the model:

# [Python](#tab/python)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/quickstart/responses/quickstart-responses.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

 # [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/csharp/quickstart/responses/quickstart-responses.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/typescript/quickstart/responses/src/quickstart-responses.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [Java](#tab/java)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/java/quickstart/responses/src/main/java/com/azure/ai/foundry/samples/CreateResponse.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` with your values:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/REST/quickstart/quickstart-responses.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [Foundry portal](#tab/portal)

1. After the model deploys, you're automatically moved from **Home** to the **Build** section. Your new model is selected and ready for you to try out.

    > **Tip:**
    > If you skipped deployment, select **Test in playground** from the home page. Select the instant access model you want to use, such as `gpt-5-mini`. (During preview, these instant access models are available only for projects in **West US3**.)

1. Start chatting with your model, for example, "Write me a poem about flowers."

---

After running the code, you see a model-generated response in the console (for example, a short poem or answer to your prompt). This confirms your project endpoint, authentication, and model deployment are working correctly.


> **Tip:**
> Code uses **Azure AI Projects 2.x** and is incompatible with Azure AI Projects 1.x. [See the Foundry (classic) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/index.yml)  for the Azure AI Projects 1.x version.

## Create an agent


Create an agent using your deployed model.

An agent defines core behavior. Once created, it ensures consistent responses in user interactions without repeating instructions each time. You can update or delete agents anytime. 

# [Python](#tab/python)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/quickstart/create-agent/quickstart-create-agent.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/csharp/quickstart/create-agent/quickstart-create-agent.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/typescript/quickstart/create-agent/src/quickstart-create-agent.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [Java](#tab/java)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/java/quickstart/create-agent/src/main/java/com/azure/ai/foundry/samples/CreateAgent.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` with your values:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/REST/quickstart/quickstart-create-agent.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [Foundry portal](#tab/portal)

Now create an agent and interact with it.
1. Still in the **Build** section, select **Agents** in the left pane.
1. Select **Create agent** and give it a name, such as "MyAgent".

---

The output confirms the agent was created. For SDK tabs, you see the agent name and ID printed to the console.


> **Tip:**
> Code uses **Azure AI Projects 2.x** and is incompatible with Azure AI Projects 1.x. [See the Foundry (classic) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/index.yml)  for the Azure AI Projects 1.x version.

## Chat with an agent


Use the previously created agent named "MyAgent" to interact by asking a question and a related follow-up. The conversation maintains history across these interactions. 

# [Python](#tab/python)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/quickstart/chat-with-agent/quickstart-chat-with-agent.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/csharp/quickstart/chat-with-agent/quickstart-chat-with-agent.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/typescript/quickstart/chat-with-agent/src/quickstart-chat-with-agent.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [Java](#tab/java) 

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/java/quickstart/chat-with-agent/src/main/java/com/azure/ai/foundry/samples/ChatWithAgent.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` with your values:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/REST/quickstart/quickstart-chat-with-agent.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/quickstarts/get-started-code.md)

# [Foundry portal](#tab/portal)

Interact with your agent.
1. Add instructions, such as, "You are a helpful writing assistant."
1. Start chatting with your agent, for example, "Write a poem about the sun." 
1. Follow up with "How about a haiku?"

---

You see the agent's responses to both prompts. The follow-up response demonstrates that the agent maintains conversation history across turns.


> **Tip:**
> Code uses **Azure AI Projects 2.x** and is incompatible with Azure AI Projects 1.x. [See the Foundry (classic) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/index.yml)  for the Azure AI Projects 1.x version.

## Clean up resources


If you no longer need any of the resources you created, delete the resource group associated with your project.

* In the [Azure portal](https://portal.azure.com), select the resource group, and then select **Delete**. Confirm that you want to delete the resource group.


## Next step
 
> 
> [Idea to prototype - Build and evaluate an enterprise agent](../tutorials/developer-journey-idea-to-prototype.md)
