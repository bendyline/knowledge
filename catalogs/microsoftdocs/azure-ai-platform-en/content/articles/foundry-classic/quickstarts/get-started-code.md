---
title: "Microsoft Foundry Quickstart (classic)"
description: "Get started with Microsoft Foundry SDK building AI applications. (classic)" 
author: sdgilley
ms.author: sgilley
ms.reviewer: dantaylo
ms.date: 02/25/2026
ms.service: microsoft-foundry
ms.subservice: foundry-sdk
ms.topic: quickstart
ms.custom:
  - classic-and-new
  - build-2024
  - devx-track-azurecli
  - devx-track-python
  - ignite-2024
  - update-code10
  - build-aifnd
  - build-2025
  - peer-review-program
ai-usage: ai-assisted
# customer intent: As a developer, I want to start using the Microsoft Foundry portal and client libraries.
ROBOTS: NOINDEX, NOFOLLOW
---

# Microsoft Foundry quickstart (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../foundry/quickstarts/get-started-code.md)

In this quickstart, you use 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
 to:

> 
> * Create a project
> * Deploy a model
> * Run a chat completion
> * Create and run an agent
> * Upload files to the agent

The Microsoft Foundry SDK is available in multiple languages, including Python, Java, TypeScript, and C#. This quickstart provides instructions for each of these languages.

> **Tip:**
> The rest of this article shows how to create and use a **
Foundry project**. [Which type of project do I need?](../what-is-foundry.md#which-type-of-project-do-i-need)

## Prerequisites

- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- 
Access to a role that allows you to create a Foundry resource, such as **Foundry Account Owner** or **Foundry Owner** on the subscription or resource group. For more information about permissions, see [Role-based access control for Microsoft Foundry](../../foundry/concepts/rbac-foundry.md#permissions-for-each-built-in-role).

> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


- Install the required language runtimes, global tools, and VS Code extensions as described in [Prepare your development environment](../how-to/develop/install-cli-sdk.md).

> **Important:**
> Before starting, make sure your development environment is ready.  
> This Quickstart focuses on **scenario-specific steps** like SDK installation, authentication, and running sample code.
>


In the portal, you can explore a rich catalog of cutting-edge models from many different providers. For this tutorial, search and then select the **gpt-4o** model.

1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.



1. If you're in a project, select **Microsoft Foundry** in the upper-left breadcrumb to leave the project. You'll create a new one in a moment.
1. From the landing page or **[Model catalog](https://ai.azure.com/explore/models)**, select **gpt-4o** (or **gpt-4o-mini**).

    Screenshot shows how to start with a model in Foundry portal.

1. Select **Use this model**. When prompted, enter a new project name and select **Create**.
1. Review the deployment name and select **Create**.
1. Then select **Connect and deploy** after selecting a deployment type.
1. Select **Open in playground** from the deployment page after it's deployed.
1. You land in the Chat playground with the model pre-deployed and ready to use.

If you're building an agent, you can instead start with **Create an agent**. The steps are similar, but in a different order.  Once the project is created, you arrive at the Agent playground instead of the Chat playground.



## Get ready to code


> **Tip:**
> Code uses **Azure AI Projects 1.x SDK** and is incompatible with Azure AI Projects 2.x. [See the Foundry (new) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/index.yml) for the Azure AI Projects 2.x version.

# [Python](#tab/python)

1. Install these packages:

    ```
    pip install openai azure-identity azure-ai-projects==1.0.0
    ```

1. 
Find your project endpoint on the welcome screen of the project. 

Screenshot of Microsoft Foundry Models welcome screen showing the endpoint URL and copy button.
1. Make sure to sign in using the CLI `az login` (or `az login --use-device-code`) command to authenticate before running your Python scripts.

Follow along below or get the code:
> 
> [Get the code](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples-classic/python/quickstart)

# [C#](#tab/csharp)

1. Install packages:

    
To work with Foundry Tools in your .NET project, you'll need to install several NuGet packages. Add NuGet packages using the .NET CLI in the integrated terminal:
    
```bash
# Add Azure AI SDK packages
dotnet add package Azure.Identity
dotnet add package Azure.AI.Projects 
dotnet add package Azure.AI.Agents.Persistent
dotnet add package Azure.AI.Inference
```


1. 
Find your project endpoint on the welcome screen of the project. 

Screenshot of Microsoft Foundry Models welcome screen showing the endpoint URL and copy button.

1. Set these environment variables to use in your scripts.  The `AZURE_AI_ENDPOINT` is the project endpoint you copied earlier.  Remove everything after `.com/` in that endpoint to form `AZURE_AI_INFERENCE`.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/csharp/quickstart/Samples/.env.example](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

    > **Tip:**
    > The agent samples require the `AZURE_AI_MODEL` environment variable to be set to an OpenAI-compatible model, e.g. `gpt-4.1`, as not all models are supported for agent use cases, including tooling.

1. Make sure to sign in using the CLI `az login` (or `az login --use-device-code`) command to authenticate before running your C# scripts.

Follow along below or get the code:
> 
> [Get the code](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples-classic/csharp/quickstart)

# [TypeScript](#tab/typescript)

1. Make sure to sign in using the CLI `az login` (or `az login --use-device-code`) command to authenticate before running your TypeScript scripts.
1. Download [package.json](https://github.com/microsoft-foundry/foundry-samples/blob/main/samples-classic/typescript/quickstart/package.json).
1. Install packages with `npm install`
1. 
Find your project endpoint on the welcome screen of the project. 

Screenshot of Microsoft Foundry Models welcome screen showing the endpoint URL and copy button.
1. Set these environment variables to use in your scripts:

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/typescript/quickstart/.env.template](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)
1. Start your code with these imports:
    
    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/typescript/quickstart/src/quickstart.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

Follow along below or get the code:
> 
> [Get the code](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples-classic/typescript/quickstart)

# [Java](#tab/java)

1. 
Find your project endpoint on the welcome screen of the project. 

Screenshot of Microsoft Foundry Models welcome screen showing the endpoint URL and copy button.
1. Set these environment variables to use in your scripts:

    ```txt
    MODEL_DEPLOYMENT_NAME=gpt-4o
    PROJECT_ENDPOINT=https://<your-foundry-resource-name>.services.ai.azure.com/api/projects/<your-foundry-project-name>
    ```

1. Make sure to sign in using the CLI `az login` (or `az login --use-device-code`) command to authenticate before running your Java scripts.
1. Download [POM.XML](https://github.com/microsoft-foundry/foundry-samples/blob/main/samples-classic/java/quickstart/pom.xml) to your Java IDE.

Follow along below or get the code:
> 
> [Get the code](https://github.com/microsoft-foundry/foundry-samples/blob/main/samples-classic/java/quickstart)

# [REST API](#tab/rest)

1. Make sure to sign in using the CLI `az login` (or `az login --use-device-code`) command to authenticate before running the next command.
1. Get a temporary access token. It will expire in 60-90 minutes, you'll need to refresh after that.

    ```azurecli
    az account get-access-token --scope https://ai.azure.com/.default
    ```
    
1. Save the results as the environment variable `AZURE_AI_AUTH_TOKEN`.  

Follow along below or get the code:
> 
> [Get the code](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples-classic/REST/quickstart).

# [Foundry portal](#tab/portal)

No installation is necessary to use the Foundry portal.

---

## Chat with a model

Chat completions are the basic building block of AI applications. Using chat completions you can send a list of messages and get a response from the model.


> **Tip:**
> Code uses **Azure AI Projects 1.x SDK** and is incompatible with Azure AI Projects 2.x. [See the Foundry (new) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/index.yml) for the Azure AI Projects 2.x version.

# [Python](#tab/python)

Substitute your endpoint for the `endpoint` in this code:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/python/quickstart/quickstart.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/csharp/quickstart/Samples/SimpleInference.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/typescript/quickstart/src/quickstart.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [Java (preview)](#tab/java)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/java/quickstart/src/main/java/com/azure/ai/foundry/samples/ChatCompletionSample.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` with your values:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/REST/quickstart/quickstart.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [Foundry portal](#tab/portal)

1. In the chat playground, fill in the prompt and select **Send**.
1. The model returns a response in the **Response** pane.

---

## Chat with an agent

Create an agent and chat with it.


> **Tip:**
> Code uses **Azure AI Projects 1.x SDK** and is incompatible with Azure AI Projects 2.x. [See the Foundry (new) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/index.yml) for the Azure AI Projects 2.x version.

# [Python](#tab/python)

Substitute your endpoint for the `endpoint` in this code:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/python/quickstart/quickstart.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/csharp/quickstart/Samples/AgentService.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/typescript/quickstart/src/quickstart.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [Java (preview)](#tab/java)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/java/quickstart/src/main/java/com/azure/ai/foundry/samples/AgentSample.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` and `YOUR-PROJECT-NAME` with your values:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/REST/quickstart/quickstart.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [Foundry portal](#tab/portal)

When you're ready to try an agent, a default agent is created for you. To chat with this agent:

1. In the left pane, select **Playgrounds**.
1. In the **Agents playground** card, select **Let's go**.
1. Add instructions, such as, "You are a helpful writing assistant."
1. Start chatting with your agent, for example, "Write me a poem about flowers."

---

## Add files to the agent

Agents have powerful capabilities through the use of tools. Let's add a file search tool that enables us to do knowledge retrieval.

* Download [product_info_1.md](https://github.com/microsoft-foundry/foundry-samples/blob/main/samples-classic/data/product_info_1.md) to give to your agent.


> **Tip:**
> Code uses **Azure AI Projects 1.x SDK** and is incompatible with Azure AI Projects 2.x. [See the Foundry (new) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/index.yml) for the Azure AI Projects 2.x version.

# [Python](#tab/python)

Substitute your endpoint for the `endpoint` in this code:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/python/quickstart/quickstart.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/csharp/quickstart/Samples/AgentFileSearch.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/typescript/quickstart/src/quickstart.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [Java (preview)](#tab/java)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/java/quickstart/src/main/java/com/azure/ai/foundry/samples/FileSearchAgentSample.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` and `YOUR-PROJECT-NAME` with your values:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/REST/quickstart/quickstart.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/quickstarts/get-started-code.md)

# [Foundry portal](#tab/portal)

1. In your agent's **Setup** pane, scroll down if necessary to find **Knowledge**.
1. Select **Add**.
1. Select **Files** to upload the product_info_1.md file.
1. Select **Select local files** under **Add files**.
1. Select **Upload and save**.
1. Change your agents instructions, such as, "You are a helpful assistant and can search information from uploaded files."
1. Ask a question, such as, "Hello, what Contoso products do you know?"
1. To add more files, select the **...** on the AgentVectorStore, then select **Manage**.

---

## Clean up resources


If you no longer need any of the resources you created, delete the resource group associated with your project.

* In the [Azure portal](https://portal.azure.com), select the resource group, and then select **Delete**. Confirm that you want to delete the resource group.

## Related content

* [Quickstart: Create a new agent](../agents/quickstart.md)
* [Client library overview](../how-to/develop/sdk-overview.md)
