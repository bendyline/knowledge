---
title: Agentic app with Semantic Kernel or Foundry Agent Service (Java)
description: Learn how to quickly deploy a production-ready, agentic web application using Java with Azure App Service and Microsoft Semantic Kernel.
ms.service: azure-app-service
author: cephalin
ms.author: cephalin
ms.devlang: csharp
ms.topic: tutorial
ms.date: 08/11/2026
ms.custom:
  - devx-track-java
ms.collection: ce-skilling-ai-copilot
ms.update-cycle: 180-days
---

# Tutorial: Build an agentic web app in Azure App Service with Microsoft Semantic Kernel or Foundry Agent Service (Spring Boot)

This tutorial demonstrates how to add agentic capability to an existing data-driven Spring Boot WebFlux CRUD application. It does this using Microsoft Semantic Kernel and Foundry Agent Service.

If your web application already has useful features, like shopping, hotel booking, or data management, it's relatively straightforward to add agent functionality to your web application by wrapping those functionalities in a plugin (for LangGraph) or as an OpenAPI endpoint (for Foundry Agent Service). In this tutorial, you start with a simple to-do list app. By the end, you'll be able to create, update, and manage tasks with an agent in an App Service app.

### [Semantic Kernel](#tab/semantic-kernel)

Screenshot of a chat completion session with a semantic kernel agent.

### [Foundry Agent Service](#tab/aifoundry)

Screenshot of a chat completion session with a Microsoft Foundry agent.

---

Both Semantic Kernel and Foundry Agent Service enable you to build agentic web applications with AI-driven capabilities. The following table shows some of the considerations and trade-offs:

| Consideration | Semantic Kernel | Foundry Agent Service |
| --- | --- | --- |
| Performance | Fast (runs locally) | Slower (managed, remote service) |
| Development | Full code, maximum control | Low code, rapid integration |
| Testing | Manual/unit tests in code | Built-in playground for quick testing |
| Scalability | App-managed | Azure-managed, autoscaled |
| Security guardrails | Custom implementation required | Built-in content safety and moderation |
| Identity | Custom implementation required | Built-in agent ID and authentication |
| Enterprise | Custom integration required | Built-in Microsoft 365/Teams deployment and Microsoft 365 integrated tool calls. |

In this tutorial, you learn how to:

> 
> * Convert existing app functionality into a plugin for Semantic Kernel.
> * Add the plugin to a Semantic Kernel agent and use it in a web app.
> * Convert existing app functionality into an OpenAPI endpoint for Foundry Agent Service.
> * Call a Foundry agent in a web app.
> * Assign the required permissions for managed identity connectivity.

## Prerequisites

- An Azure account with an active subscription - [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- GitHub account to use GitHub Codespaces - [Learn more about GitHub Codespaces](https://docs.github.com/codespaces/overview).

## Open the sample with Codespaces

The easiest way to get started is by using GitHub Codespaces, which provides a complete development environment with all required tools preinstalled.

[Open in GitHub Codespaces.](https://codespaces.new/Azure-Samples/app-service-agentic-semantic-kernel-java)

1. Navigate to the GitHub repository at [https://github.com/Azure-Samples/app-service-agentic-semantic-kernel-java](https://github.com/Azure-Samples/app-service-agentic-semantic-kernel-java).

2. Select the **Code** button, select the **Codespaces** tab, and select **Create codespace on main**.

3. Wait a few moments for your Codespace to initialize. When ready, you'll see a fully configured development environment in your browser.

4. Run the application locally:

   ```bash
   mvn spring-boot:run
   ```

5. When you see **Your application running on port 8080 is available**, select **Open in Browser** and add a few tasks.

## Review the agent code

### [Semantic Kernel](#tab/semantic-kernel)

The Semantic Kernel agent is initialized in [src/main/java/com/example/crudtaskswithagent/controller/AgentController.java](https://github.com/Azure-Samples/app-service-agentic-semantic-kernel-java/blob/main/src/main/java/com/example/crudtaskswithagent/controller/AgentController.java), when the user enters the first prompt in a new browser session. 

You can find the initialization code in the `SemanticKernelAgentService` constructor (in [src/main/java/com/example/crudtaskswithagent/service/SemanticKernelAgentService.java](https://github.com/Azure-Samples/app-service-agentic-semantic-kernel-java/blob/main/src/main/java/com/example/crudtaskswithagent/service/SemanticKernelAgentService.java)). The initialization code does the following: 

- Creates a kernel with chat completion.
- Adds a kernel plugin that encapsulates the functionality of the CRUD application (in *src/main/java/com/example/crudtaskswithagent/plugin/TaskCrudPlugin.java*). The interesting parts of the plugin are the `DefineKernelFunction` annotations on the method declarations and the `description` and `returnType` parameters that help the kernel call the plugin intelligently.
- Creates a [chat completion agent](https://learn.microsoft.com/semantic-kernel/frameworks/agent/agent-types/chat-completion-agent?pivots=programming-language-java), and configures it to let the AI model automatically invoke functions (`FunctionChoiceBehavior.auto(true)`).
- Creates an agent thread that automatically manages the chat history.

[Code reference unavailable in this source snapshot: ~/app-service-agentic-semantic-kernel-java/src/main/java/com/example/crudtaskswithagent/service/SemanticKernelAgentService.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/tutorial-ai-agent-web-app-semantic-kernel-java.md)

Each time the prompt is received, the server code uses `ChatCompletionAgent.invokeAsync()` to invoke the agent with the user prompt and the agent thread. The agent thread keeps track of the chat history.

[Code reference unavailable in this source snapshot: ~/app-service-agentic-semantic-kernel-java/src/main/java/com/example/crudtaskswithagent/service/SemanticKernelAgentService.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/tutorial-ai-agent-web-app-semantic-kernel-java.md)

### [Foundry Agent Service](#tab/aifoundry)

The Foundry agent is initialized in [src/main/java/com/example/crudtaskswithagent/controller/AgentController.java](https://github.com/Azure-Samples/app-service-agentic-semantic-kernel-java/blob/main/src/main/java/com/example/crudtaskswithagent/controller/AgentController.java), when the user enters the first prompt in a new browser session.

You can find the initialization code in the `FoundryAgentService` constructor (in [src/main/java/com/example/crudtaskswithagent/service/FoundryAgentService.java](https://github.com/Azure-Samples/app-service-agentic-semantic-kernel-java/blob/main/src/main/java/com/example/crudtaskswithagent/service/FoundryAgentService.java)). The initialization code does the following:

- Creates an `AgentsClientBuilder` with endpoint and credentials.
- Builds specialized async clients: `ConversationsAsyncClient` and `ResponsesAsyncClient`.
- References the agent by name (configured in the Foundry portal).
- Creates a conversation for the session.

[Code reference unavailable in this source snapshot: ~/app-service-agentic-semantic-kernel-java/src/main/java/com/example/crudtaskswithagent/service/FoundryAgentService.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/tutorial-ai-agent-web-app-semantic-kernel-java.md)

> **Note:**
> The constructor performs blocking operations (credential acquisition and conversation creation), so the controller (in [src/main/java/com/example/crudtaskswithagent/controller/AgentController.java](https://github.com/Azure-Samples/app-service-agentic-semantic-kernel-java/blob/main/src/main/java/com/example/crudtaskswithagent/controller/AgentController.java)) creates the service on a `boundedElastic` thread using `.subscribeOn(Schedulers.boundedElastic())`.

This initialization code doesn't define any functionality for the agent, because you would typically build the agent in the Foundry portal. As part of the example scenario, it also follows the OpenAPI pattern shown in [Add an App Service app as a tool in Foundry Agent Service (Spring Boot)](tutorial-ai-integrate-azure-ai-agent-java.md), and makes its CRUD functionality available as an OpenAPI endpoint. This lets you add it to the agent later as a callable tool.

The OpenAPI annotations are defined in the `TaskController` class. For example, the "GET /api/tasks" route defines `operationId` using the `@Operation` annotation, as required by the [OpenAPI spec tool in Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/openapi-spec#prerequisites), and `summary` and `description` help the agent determine how to call the API:

[Code reference unavailable in this source snapshot: ~/app-service-agentic-semantic-kernel-java/src/main/java/com/example/crudtaskswithagent/controller/TaskController.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/tutorial-ai-agent-web-app-semantic-kernel-java.md)

Each time the prompt is received, the server code uses `responsesClient.createWithAgentConversation()` to send the message to the Foundry agent and retrieve the response. The conversation ID keeps track of the chat history.

[Code reference unavailable in this source snapshot: ~/app-service-agentic-semantic-kernel-java/src/main/java/com/example/crudtaskswithagent/service/FoundryAgentService.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/tutorial-ai-agent-web-app-semantic-kernel-java.md)

---

## Deploy the sample application

The sample repository contains an Azure Developer CLI (AZD) template, which creates an App Service app with managed identity and deploys your sample application.

1. In the terminal, log into Azure using Azure Developer CLI:

   ```bash
   azd auth login
   ```

   Follow the instructions to complete the authentication process.

4. Deploy the Azure App Service app with the AZD template:

   ```bash
   azd up
   ```

1. When prompted, give the following answers:
    
    | Question | Answer |
    | --- | --- |
    | Enter a new environment name: | Type a unique name. |
    | Select an Azure Subscription to use: | Select the subscription. |
    | Pick a resource group to use: | Select **Create a new resource group**. |
    | Select a location to create the resource group in: | Select **Sweden Central**. |
    | Enter a name for the new resource group: | Type **Enter**. |

1. In the AZD output, find the URL of your app and navigate to it in the browser. The URL looks like this in the AZD output:

    <pre>
    Deploying services (azd deploy)
    
      (✓) Done: Deploying service web
      - Endpoint: &lt;URL>
    </pre>

1. Open the autogenerated OpenAPI schema at the `https://....azurewebsites.net/api/schema` path. You need this schema later.

    You now have an App Service app with a system-assigned managed identity.

## Create and configure the Microsoft Foundry resource

### [Semantic Kernel](#tab/semantic-kernel)


1. In the [Foundry portal](https://ai.azure.com), create a project.

1. Deploy a model of your choice (see [Microsoft Foundry Quickstart: Create resources](https://learn.microsoft.com/azure/ai-foundry/quickstarts/get-started-code?view=foundry\&preserve-view=true#create-resources)).

1. From top of the model playground, copy the model name.

1. On the home page, copy the **Azure OpenAI endpoint** for later.


### [Foundry Agent Service](#tab/aifoundry)


1. In the [Foundry portal](https://ai.azure.com), create a project.

1. On the home page, copy the **Project endpoint** for later use.

1. Select **Start building** and follow the prompt.

1. In the new agent's playground, create an OpenAPI tool to call your web app by selecting **Tools** > **Add** > **Add tools** > **Custom** > **OpenAPI tool** > **Create**. In the **Setup** pane, add an action with the OpenAPI spec tool. Use the OpenAPI schema that you get from the deployed web app and **anonymous** authentication. For detailed steps, see [How to use the OpenAPI spec tool](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/openapi?view=foundry\&preserve-view=true).

    Your application code is already configured to include the server's `url` and `operationId`, which are needed by the agent. For more information, see [Connect to OpenAPI Specification](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/openapi?view=foundry\&preserve-view=true#prerequisites).

1. Be sure to select **Save**.

1. Select **Try in playground** and test your Foundry agent with prompts like "*Show me all the tasks*" and "*Please add a task.*"

    If you get a valid response, the agent is making tool calls to the OpenAPI endpoint on your deployed web app.


---

## Assign required permissions

### [Semantic Kernel](#tab/semantic-kernel)


1. In the Foundry portal, select **Manage** in the top menu.

1. In **Project details**, select the **Parent resource** for your project, and then select **Open in Azure portal**.

    From the Azure portal, you can assign role-based access for the resource.

1. Add the following role for both the App Service app's managed identity and the user you use with `az login`:

    | Target resource | Required role | Needed for |
    | --- | --- | --- |
    | Foundry | Cognitive Services OpenAI User | The chat completion service in Microsoft Agent Framework. |

    For instructions, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).


### [Foundry Agent Service](#tab/aifoundry)


1. In the Foundry portal, select **Manage** in the top menu.

1. In **Project details**, select **Open in Azure portal**.

    From the Azure portal, you can assign role-based access for the project.

1. Add the following role for both the App Service app's managed identity and the user you use with `az login`:

    | Target resource | Required role | Needed for |
    | --- | --- | --- |
    | Foundry Project | Foundry User | Reading and calling the Foundry agent. |

    For instructions, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).


---

## Configure connection variables in your sample application

1. Open *src/main/resources/application.properties*. Using the values you copied earlier from the Foundry portal, configure the following variables: 

    ### [Semantic Kernel](#tab/semantic-kernel)

    | Variable | Description |
    | --- | --- |
    | `azure.openai.endpoint` | Azure OpenAI endpoint (copied from the Foundry portal home page). |
    | `azure.openai.deployment` | Model name in the deployment (copied from the model playground in the new Foundry portal). |
    
    > **Note:**
    > To keep the tutorial simple, you'll use these variables in *.env* instead of overwriting them with app settings in App Service.

    ### [Foundry Agent Service](#tab/aifoundry)

    | Variable | Description |
    | --- | --- |
    | `azure.foundry.endpoint` | Microsoft Foundry project endpoint from the new Foundry portal. |
    | `azure.foundry.agent.name` | Agent name (from the agent playground in the Foundry portal). |
    
    ---

    > **Note:**
    > To keep the tutorial simple, you'll use these variables in *src/main/resources/application.properties* instead of overwriting them with app settings in App Service.

1. Sign in to Azure with the Azure CLI:

    ```bash
    az login
    ```

    This allows the Azure Identity client library in the sample code to receive an authentication token for the logged in user. Remember that you added the required role for this user earlier.

1. Run the application locally:

   ```bash
   mvn spring-boot:run
   ```

1. When you see **Your application running on port 8080 is available**, select **Open in Browser**.

1. Try out the chat interface. If you get a response, your application is connecting successfully to the Microsoft Foundry resource.

1. Back in the GitHub codespace, deploy your app changes.

   ```bash
   azd up
   ```

1. Navigate to the deployed application again and test the chat agents.

    ### [Semantic Kernel](#tab/semantic-kernel)
    
    Screenshot of a chat completion session with a semantic kernel agent.
    
    ### [Foundry Agent Service](#tab/aifoundry)
    
    Screenshot of a chat completion session with a Microsoft Foundry agent.
    
    ---


## Frequently asked questions

- [How do I add retrieval augmented generation (RAG) to the Foundry agent?](#how-do-i-add-retrieval-augmented-generation-rag-to-the-foundry-agent)

### How do I add retrieval augmented generation (RAG) to the Foundry agent?

This guidance applies to the **Foundry Agent Service** path in this tutorial. It doesn't change the LangGraph, Semantic Kernel, or Microsoft Agent Framework implementations shown in the other tab.

Create or select a Foundry IQ knowledge base, and then [connect the knowledge base to the Foundry Agent Service agent](https://learn.microsoft.com/azure/foundry/agents/how-to/foundry-iq-connect). The connection is exposed to the agent as a managed MCP knowledge tool.

The App Service code continues to invoke the same agent by name through its existing Foundry client and `agent_reference`. The web app doesn't need a direct Azure AI Search integration or its own MCP client. If the UI displays sources, process the citation annotations returned by the agent.

## Clean up resources

When you're done with the application, you can delete the App Service resources to avoid incurring further costs:

```bash
azd down --purge
```

Since the AZD template doesn't include the Microsoft Foundry resources, you need to delete them manually if you want.

## More resources

- [Integrate AI into your Azure App Service applications](overview-ai-integration.md)
- [Introduction to Semantic Kernel](https://learn.microsoft.com/semantic-kernel/overview/)
