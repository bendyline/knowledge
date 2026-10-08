---
title: Create Conversational AI Agentic Workflows
description: Build conversational agentic workflows that use AI agent loops and LLMs to complete tasks with human interactions in Azure Logic Apps.
ms.service: azure-logic-apps
ms.suite: integration
ms.reviewers: estfan, divswa, krmitta, azla
ms.topic: how-to
ms.collection: ce-skilling-ai-copilot
ms.date: 04/28/2026
ms.update-cycle: 180-days
# Customer intent: As an AI integration developer who uses Azure Logic Apps, I want to build workflows that complete tasks by using AI agent loops, large language models (LLMs), natural language, and chat capabilities in my integration solutions.
---

# Create conversational agentic workflows with chat interactions in Azure Logic Apps


Applies to: **Azure Logic Apps (Consumption + Standard)**


When you need AI-powered automation that interacts with humans, create *conversational agent* workflows in Azure Logic Apps. These workflows use natural language, agent *loops*, and *large language models* (LLMs) to make decisions and complete tasks based on human-provided inputs and questions, known as *prompts*. These workflows work best for automation that's user-driven, short-lived, or session-based.

The following example workflow uses a conversational agent to get the current weather and send email notifications:

Screenshot shows Azure portal, workflow designer, and example conversational agentic workflow.

This guide shows how to create a Consumption or Standard logic app using the **Conversational Agents** workflow type. This workflow runs by using human-provided prompts and tools that you build to complete tasks. For a high-level overview about agentic workflows, see [AI agentic workflows in Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/agent-workflows-concepts).

> **Important:**
>
> Consumption conversational agentic workflows are in preview and subject to the 
> [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

## Prerequisites

- An Azure account and subscription. [Get a free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

Based on whether you want to create a Consumption or Standard logic app, the following prerequisites apply:

### [Consumption (preview)](#tab/consumption)

- A Consumption logic app resource that uses the workflow type named **Conversational Agents**. See [Create Consumption logic app workflows in the Azure portal](quickstart-create-example-consumption-workflow.md).

  Consumption conversational agentic workflows don't require that you manually set up a separate AI model. Your workflow automatically includes an agent loop action that uses an Azure OpenAI Service model hosted in Microsoft Foundry. Agentic workflows support only specific models. See [Supported models](#supported-models).

  > **Note:**
  >
  > You can use only the Azure portal to build conversational agentic workflows, not Visual Studio Code.

For external chat authentication and authorization, Consumption conversational agentic workflows use [OAuth 2.0 with Microsoft Entra ID](https://learn.microsoft.com/entra/architecture/auth-oauth2).

### [Standard](#tab/standard)

- An Azure account and subscription. [Get a free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- A Standard logic app resource or project, based on your development experience:

  | Experience | Requirement |
  | --- | --- |
  | Azure portal | A Standard logic app resource. See [Create Standard workflows in the Azure portal](create-single-tenant-workflows-azure-portal.md). |
  | Visual Studio Code | A Standard logic app project. See [Create Standard workflows in Visual Studio Code](https://learn.microsoft.com/azure/logic-apps/create-standard-workflows-visual-studio-code). Make sure you have the latest Azure Logic Apps extension. |

  > **Note:**
  >
  > The steps to set up conversational chat are mostly the same for both Azure portal and Visual Studio Code. The examples in this guide show the instructions for each experience where the process differs.

- One of the following AI model sources:

  > **Note:**
  >
  > Agentic workflows support only specific models. See [Supported models](#supported-models).

  | Model source | Description |
  | --- | --- |
  | **Azure OpenAI** | An [Azure OpenAI Service resource](https://learn.microsoft.com/azure/ai-services/openai/overview) with a deployed [Azure OpenAI Service model](https://learn.microsoft.com/azure/ai-services/openai/concepts/models). <br><br>You need the resource name when you connect from the agent in your workflow to the deployed AI model in Azure OpenAI Service. <br><br>For more information, see: <br>- [Create and deploy an Azure OpenAI Service resource](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource?pivots=web-portal) <br>- [Deploy a model](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource?pivots=web-portal#deploy-a-model) |
  | **APIM Gen AI Gateway** | An [Azure API Management account](https://learn.microsoft.com/azure/api-management/genai-gateway-capabilities) with the LLM API to use. <br><br>For more information, see: <br>- [AI gateway in Azure API Management](https://learn.microsoft.com/azure/api-management/genai-gateway-capabilities) <br>- [Import a Foundry API](https://learn.microsoft.com/azure/api-management/azure-ai-foundry-api) <br>- [Import an Azure OpenAI API](https://learn.microsoft.com/azure/api-management/azure-openai-api-from-specification) |
 
- The authentication to use when you connect your agent to your AI model.

  - Managed identity authentication

    This connection supports authentication by using Microsoft Entra ID with a [managed identity](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview). In production scenarios, Microsoft strongly recommends that you use a managed identity when possible. This option provides optimal and superior security at no extra cost. Azure manages this identity for you, so you don't have to provide or manage sensitive information such as credentials or secrets. This information isn't even accessible to individual users. You can use managed identities to authenticate access for any resource that supports Microsoft Entra authentication.

    To use managed identity authentication, your Standard logic app resource must enable the system-assigned managed identity. By default, the system-assigned managed identity is enabled on a Standard logic app. This release currently doesn't support using the user-assigned managed identity.

    > **Note:**
    >
    > If the system-assigned identity is disabled, [reenable the identity](https://learn.microsoft.com/azure/logic-apps/authenticate-with-managed-identity?tabs=standard#enable-system-assigned-identity-in-the-azure-portal). 

    The system-assigned identity requires one of the following roles for Microsoft Entra role-based access control (RBAC), based on the [principle of least privilege](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access):

    | Model source | Role |
    | --- | --- |
    | Azure OpenAI Service resource | - **Cognitive Services OpenAI User** (least privileged) <br>- **Cognitive Services OpenAI Contributor** |

    For more information about managed identity setup, see:

    - [Authenticate access and connections with managed identities in Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/authenticate-with-managed-identity?tabs=standard)
    - [Role-based access control for Azure OpenAI Service](https://learn.microsoft.com/azure/ai-services/openai/how-to/role-based-access-control)
    - [Best practices for Microsoft Entra roles](https://learn.microsoft.com/entra/identity/role-based-access-control/best-practices)

  - URL and key-based authentication

    This connection supports authentication by using the endpoint URL and API key for your AI model. However, you don't have to manually find these values before you create the connection. The values automatically appear when you select your model source.

    > **Important:**
    >
    > Use this authentication option only for the examples in this guide, exploratory scenarios, nonproduction scenarios, or if your organization's policy specifies that you can't use managed identity authentication.
    >
    > In general, make sure that you secure and protect sensitive data and personal data, such as credentials, secrets, access keys, connection strings, certificates, thumbprints, and similar information with the highest available or supported level of security. Don't hardcode sensitive data, share secrets with other users, or save them in plain text anywhere that others can access. Set up a plan to rotate or revoke secrets if they become compromised.
    >
    > For more information, see:
    >
    > - [Best practices for protecting secrets](https://learn.microsoft.com/azure/security/fundamentals/secrets-best-practices)
    > - [Secrets in Azure Key Vault](https://learn.microsoft.com/azure/key-vault/secrets/) 
    > - [Automate secrets rotation in Azure Key Vault](https://learn.microsoft.com/azure/key-vault/secrets/tutorial-rotation)

---

- To follow the examples, you need an email account to send email.

    The examples in this guide use an Outlook.com account. For your own scenarios, you can use any supported email service or messaging app in Azure Logic Apps, such as Office 365 Outlook, Microsoft Teams, Slack, and so on. The setup for other email services or apps is similar to the examples, but has minor differences.

## Limitations and known issues

The following table describes the current limitations and known issues in this release.

| Logic app | Limitations or known issues |
| --- | --- |
| Both | To create tools for your agent, the following limitations apply: <br><br>- You can add only actions, not triggers. <br>- A tool must start with an action and always contains at least one action. <br>- A tool works only inside the agent where that tool exists. <br>- Control flow actions aren't supported. |
| Consumption | - You can create Consumption agentic workflows only in the Azure portal, not Visual Studio Code. <br>- The AI model that your agent uses can originate from any region, so data residency for a specific region isn't guaranteed for data that the model handles. <br>- The **Agent** action is throttled based on the number of tokens used. |
| Standard | - Unsupported workflow types: **Stateless** <br><br>For general limits in Azure OpenAI Service and Azure Logic Apps, see: <br><br>- [Azure OpenAI Service quotas and limits](https://learn.microsoft.com/azure/ai-services/openai/quotas-limits) <br>- [Azure Logic Apps limits and configuration](https://learn.microsoft.com/azure/logic-apps/logic-apps-limits-and-config) |


<a name="supported-models"></a>

## Supported Azure OpenAI Service models for agentic workflows

The following list specifies the AI models that you can use with agentic workflows:

### [Consumption (preview)](#tab/consumption)

Your agent loop automatically uses one of the following Azure OpenAI Service models:

- gpt-4o-mini
- gpt-5o-mini

> **Important:**
>
> The AI model that your agent loop uses can originate from any region, so data residency for a specific region isn't guaranteed for data that the model handles.

### [Standard](#tab/standard)

Your agent loop can use one of the following models:

- gpt-5
- gpt-4.1
- gpt-4.1-mini
- gpt-4.1-nano
- gpt-4o
- gpt-4o-mini
- gpt-4
- gpt-35-turbo



<a name="agent-workflows-billing"></a>

## Billing

- Consumption: Billing uses the pay-as-you-go model. Agent loop pricing is based on the number of tokens that each agent action uses and appears as Enterprise Units on your bill. For specific pricing information see [Azure Logic Apps pricing](https://azure.microsoft.com/pricing/details/logic-apps/).

- Standard: Although agentic workflows don't incur extra charges, AI model usage incurs charges. For more information, see the Azure [Pricing calculator](https://azure.microsoft.com/pricing/calculator/).

## Create a conversational agentic workflow

The following section shows how to start creating your conversational agentic workflow.

### [Consumption (preview)](#tab/consumption)

The **Conversational Agents** workflow type creates a partial workflow that starts with the required trigger named **When a new chat session starts**. The workflow also includes an empty **Default Agent** action.

To open this partial workflow, follow these steps:

1. In the [Azure portal](https://portal.azure.com), open your Consumption logic app resource.

1. On the resource sidebar, under **Development Tools**, select the designer to open the partial agentic workflow.

   The designer shows a partial workflow that starts with the required trigger named **When a new chat session starts**. Under the trigger, an empty **Agent** action named **Default Agent** appears. For this scenario, you don't need any other trigger setup.

   Screenshot shows Consumption workflow designer with required chat conversation trigger and an empty Default Agent loop action.

1. Continue to the next section to set up your agent loop.

### [Standard](#tab/standard)

Based on the development experience that you use, start by creating a new workflow.

#### Create agentic workflow in Azure portal

1. In the [Azure portal](https://portal.azure.com), open your Standard logic app resource.

1. On the resource sidebar, under **Workflows**, select **Workflows**.

1. On the **Workflows** page toolbar, select **Create** > **Create**.

1. On the **Create workflow** pane, complete the following steps:

   1. For **Workflow name**, enter a name for your workflow.

   1. Select **Conversational Agents** > **Create**.

      Screenshot shows Standard logic app resource with open Workflows page and Create workflow pane with workflow name, selected Conversational Agents option, and Create button.

      The designer opens and shows a partial workflow that starts with the required trigger named **When a new chat session starts** and an empty **Agent** action that you need to set up later. 

      Screenshot shows Standard workflow designer with required chat conversation trigger and an empty Agent loop action.

   Before you can save your workflow, you must complete the following setup tasks for the **Agent** loop action:

   - Connect your agent to your AI model. You complete this task in a later section.

   - Provide agent instructions that use natural language to describe the roles that the agent plays, the tasks that the agent can perform, and other information to help the agent better understand how to operate. You also complete this task in a later section.

1. Continue to the next section to set up your agent loop.

#### Create agentic workflow in Visual Studio Code

1. In Visual Studio Code, open the workspace for your Standard logic app project.

1. On the Activity Bar, select the files icon, which opens the Explorer window to show your project.

1. In the Explorer window, from your project folder shortcut menu, select **Create workflow**.

1. Select the workflow template named **Conversational agent**.

1. Enter a name for your workflow, and press Enter.

   A new workflow folder now appears in your project. This folder contains a *workflow.json* file, which contains the workflow's underlying JSON definition.

1. From the *workflow.json* file's shortcut menu, select **Open designer**.

   The designer opens and shows a partial workflow that starts with the required trigger named **When a new chat session starts** and an empty **Default Agent** loop action that you need to set up later. 

   Screenshot shows workflow designer with required chat conversation trigger and an empty Default Agent loop action.

1. Continue to the next section to set up your agent loop.

---

> **Note:**
>
> If you try to save the workflow now, the designer toolbar shows a red dot on the **Errors** 
> button. The designer alerts you to this error condition because the agent loop requires setup 
> before you can save any changes. However, you don't need to set up the agent loop now. You can 
> continue to create your workflow. Just remember to set up the agent loop before you save your workflow.
>
> Screenshot shows workflow designer toolbar and Errors button with red dot and error in the agent loop action information pane.

<a name="agent-model"></a>

## Set up or view the AI model

To set up or view the AI model for your agent, follow the steps based on your logic app type:

### [Consumption (preview)](#tab/consumption)

By default, your agent automatically uses the Azure OpenAI model available in your logic app's region. Some regions support **gpt-4o-mini**, while others support **gpt-5o-mini**.

To view the model that your agent uses, follow these steps:

1. On the designer, select the title bar on the **Default Agent** action to open the information pane.

1. On the **Parameters** tab, the **Model Id** parameter shows the Azure OpenAI model that the workflow uses, for example:

   Screenshot shows Consumption agent with Azure OpenAI model.

1. Continue to the next section to rename the agent loop action.

### [Standard](#tab/standard)

1. On the designer, select the title bar on the **Agent** action to open the **Create connection** pane.

   This pane opens only if you don't have an existing working connection.

1. In the **Create a new connection** section, provide the following information:

   | Parameter | Required | Value | Description |
   | --- | --- | --- | --- |
   | **Connection Name** | Yes | <*connection-name*> | The name to use for the connection to your AI model. <br><br>This example uses `fabrikam-azure-ai-connection`. |
   | **Agent Model Source** | Yes | - **Azure OpenAI** <br>- **Foundry Models (Preview)** <br>- **APIM Gen AI Gateway (Preview)** <br>- **V1 Chat Completions Service (Preview)** | The source for the AI model in your Azure OpenAI Service resource or your LLM API in your Azure API Management account. |
   | **Authentication Type** | Yes | - **Managed identity** <br><br>- **URL and key-based authentication** | The authentication type to use for validating and authorizing an identity's access to your AI model. <br><br>- **Managed identity** requires that your Standard logic app have a managed identity enabled and set up with the required roles for role-based access. For more information, see [Prerequisites](#prerequisites). <br><br>- **URL and key-based authentication** requires the endpoint URL and API key for your AI model. These values automatically appear when you select your model source. <br><br>**Important**: For the examples and exploration only, you can use **URL and key-based authentication**. For production scenarios, use **Managed identity**. |
   | **Subscription** | Yes | <*Azure-subscription*> | Select the Azure subscription for your Azure OpenAI Service resource or Azure API Management account. |
   | **Azure OpenAI Resource** | Yes, only when **Agent Model Source** is **Azure OpenAI** | <*Azure-OpenAI-Service-resource-name*> | Select your Azure OpenAI Service resource. |
   | **Azure API Management Service** (preview) | Yes, only when **Agent Model Source** is **APIM Gen AI Gateway**. | <*API-Management-account*> | Select your Azure API Management account. |
   | **Azure API Management Service APIs** | Yes, only when **Agent Model Source** is **APIM Gen AI Gateway**. | <*API-Management-LLM-API*> | Select your LLM API in Azure API Management. |
   | **API Endpoint** | Yes | Automatically populated | The endpoint URL for your AI model in Azure OpenAI Service or LLM API in Azure API Management. <br><br>This example uses `https://fabrikam-azureopenai.openai.azure.com/`. |
   | **API Key** | Yes, only when **Authentication Type** is **URL and key-based authentication** | Automatically populated | The API key for your AI model in Azure OpenAI Service or your LLM API in Azure API Management. |

   For example, if you select **Azure OpenAI** as your model source and **Managed identity** for authentication, your connection information looks like the following sample:

   Screenshot shows example connection details for a deployed model in Azure OpenAI Service.

1. When you're done, select **Create new**.

   The **Agent** action information pane opens. 

1. On the **Parameters** tab, for **AI model**, select the AI model to use, if more than one model is available.

   > **Note:**
   >
   > If the connection to your model is incorrect, the **AI model** list appears unavailable.

   To create a different connection, on the **Parameters** tab, scroll down to the bottom, and select **Change connection**.

1. Continue to the next section to rename the agent loop action.

---

## Rename the agent loop action

Update the agent loop action name to clearly identify the agent's purpose by following these steps:

1. On the designer, select the agent loop action title bar to open the agent loop action information pane.

1. On the information pane, select the agent loop action name, and enter the new name, such as `Weather agent`.

   Screenshot shows workflow designer, workflow trigger, and renamed agent loop action.

1. Continue to the next section to provide instructions for the agent loop.

## Set up agent loop instructions

The agent loop requires instructions that describe the roles that the agent loop can play and the tasks that the agent loop can perform. To help the agent loop learn and understand these responsibilities, include the following information:

- Workflow structure
- Available actions
- Any restrictions or limitations
- Interactions for specific scenarios or special cases

For the best results, provide prescriptive instructions and be prepared to iteratively refine your instructions.

1. On the **Parameters** tab, in the **Instructions for agent** box, enter the instructions that the agent loop needs to understand its role and tasks.

   For this example, the weather agent example uses the following sample instructions where you later ask questions and provide your own email address for testing:

   ```
   You're an AI agent that answers questions about the weather for a specified location. You can also send a weather report in email if you're provided email address. If no address is provided, ask for an email address.

   Format the weather report with bullet lists where appropriate. Make your response concise and useful, but use a conversational and friendly tone. You can include suggestions like "Carry an umbrella" or "Dress in layers".
   ```

   Here's an example:

   Screenshot shows workflow designer and agent instructions.

1. Now, you can save your workflow. On the designer toolbar, select **Save**.

## Check for errors

To make sure your workflow doesn't have errors at this stage, follow these steps, based on your logic app and development environment.

### [Consumption (preview)](#tab/consumption)

1. On the designer toolbar, select **Chat**.

1. In the chat client interface, ask the following question: `What is the current weather in Seattle?`

1. Check that the response is what you expect, for example:

   Screenshot shows the portal-integrated chat interface for a Consumption agentic workflow.

1. Return to your workflow in the designer.

1. On the workflow sidebar, under **Development Tools**, select **Run history**.

1. On the **Run history** page, in the runs table, select the latest workflow run.

   > **Note:**
   >
   > If the page doesn't show any runs, on the toolbar, select **Refresh**.
   >
   > If the **Status** column shows a **Running** status, the agentic workflow is still working.

   The monitoring view opens and shows the workflow operations with their status. The **Agent log** pane is open and shows the agent loop instructions that you provided earlier. The pane also shows the agent's response.

   Screenshot shows monitoring view for Consumption workflow, operation status, and agent log.

   The agent loop action doesn't have any tools to use at this time, which means that the agent loop can't actually take any specific actions, such as send email to a subscriber list, until you create tools that the agent loop needs to complete tasks.

1. Return to the designer. On the monitoring view toolbar, select **Edit**.

### [Standard](#tab/standard)

#### Check for errors in Azure portal

1. On the designer toolbar, select **Chat**.

1. In the chat client interface, ask the following question: `What is the current weather in Seattle?`

1. Check that the response is what you expect, for example:

   Screenshot shows the portal-integrated chat interface for a Standard agentic workflow.

1. Return to your workflow in the designer.

1. On the workflow sidebar, under **Tools**, select **Run history**.

1. On the **Run history** page, on the **Run history** tab, select the latest workflow run.

   > **Note:**
   >
   > If the page doesn't show any runs, on the toolbar, select **Refresh**.
   >
   > If the **Status** column shows a **Running** status, the agentic workflow is still working.

   The monitoring view opens and shows the workflow operations with their status. The **Agent log** pane is open and shows the agent loop instructions that you provided earlier. The pane also shows the agent's response.

   Screenshot shows monitoring view, operation status, and agent log.

   However, the agent loop doesn't have any tools to use at this time, which means that the agent loop can't actually take any specific actions, such as send email, until you create tools that the agent loop needs to complete tasks. You might even get an email that your email server rejected the message.

1. Return to the designer. On the monitoring view toolbar, select **Edit**.

#### Check for errors in Visual Studio Code

1. In the Explorer window for your logic app project, expand the folder that has the workflow name, and go to the *workflow.json* file.

1. From the file shortcut menu, select **Overview**, which starts a debugging session.

1. On the **Overview** page, select **Chat**.

1. In the chat client interface, ask the following question: `What is the current weather in Seattle?`

1. Check that the response is what you expect, for example:

   Screenshot shows the Visual Studio Code integrated chat interface for a Standard agentic workflow.

1. Return to the **Overview** page.

1. Under **Run history**, select the latest workflow run.

   > **Note:**
   >
   > If the page doesn't show any runs, on the toolbar, select **Refresh**.
   >
   > If the **Status** column shows a **Running** status, the agentic workflow is still working.

   The monitoring view opens and shows the workflow operations with their status. The **Agent log** pane is open and shows the agent loop instructions that you provided earlier. The pane also shows the agent's response.

   However, the agent loop doesn't have any tools to use at this time, which means that the agent loop can't actually take any specific actions, such as send email, until you create tools that the agent loop needs to complete tasks. You might even get an email that your email server rejected the message.

1. On the debugging toolbar, select **Stop** to close the debug session.

1. Return to the designer.

---

## Create or connect to a knowledge base

Optionally, in Standard agentic workflows, to help your agent loop answer questions and complete tasks related to a specific domain, create a *knowledge base* or connect to an existing knowledge base for your agent loop to use. A knowledge base is a logical *container* that organizes related knowledge sources such as documents or files.

Your organization generates data from documents, spreadsheets, APIs, and internal systems. When you use the Knowledge Base-as-a-Service (KBaaS) capability in Azure Logic Apps, you can convert this content into structured and more searchable information that your agent loop can use.

1. [Meet the prerequisites to create a knowledge base](create-knowledge-base-agentic-workflow.md#prerequisites).

1. Return to the workflow designer and select the agent loop title bar.

1. On the agent loop information pane, on the **Parameters** tab, in the **Knowledge base** section, select **Create**.

1. Follow the steps to [create the knowledge base connection](create-knowledge-base-agentic-workflow.md#create-connection).

1. Follow the steps to [add knowledge artifacts to the knowledge base](create-knowledge-base-agentic-workflow.md#add-knowledge-artifacts).

1. Follow the steps to [add the knowledge base as a tool for your agent loop](create-knowledge-base-agentic-workflow.md#add-knowledge-base-as-tool).

<a name="create-tool-weather"></a>

## Create a 'Get weather' tool

For an agent to run prebuilt actions available in Azure Logic Apps, you must create one or more tools for the agent loop to use. A tool must contain at least one action and only actions. The agent loop calls the tool by using specific arguments.

In this example, the agent loop needs a tool that gets the weather forecast. You can build this tool by following these steps:

1. On the designer, inside the agent loop action and under **Add tool**, select the plus sign (**+**) to open the pane where you can browse available actions.

1. On the **Add an action** pane, follow the [general steps](https://learn.microsoft.com/azure/logic-apps/create-workflow-with-trigger-or-action#add-action) for your logic app to add an action that's best for your scenario.

   This example uses the **MSN Weather** action named **Get current weather**.

   After you select the action, both the **Tool** container and the selected action appear in the agent loop on the designer. Both information panes also open at the same time.

   Screenshot shows workflow designer with the renamed agent, which contains a tool that includes the action named Get current weather.

1. On the tool information pane, rename the tool to describe its purpose. For this example, use `Get weather`.

1. On the **Details** tab, for **Description**, enter the tool description. For this example, use `Get the weather for the specified location.`

   Screenshot shows completed Get weather tool with description.

   Under **Description**, the **Agent Parameters** section applies only for specific use cases. For more information, see [Create agent parameters](#create-agent-parameters-get-weather).

1. Continue to the next section to learn more about agent parameters, their use cases, and how to create them, based on these use cases.

<a name="create-agent-parameters-get-weather"></a>

## Create agent parameters for 'Get current weather' action

Actions usually have parameters that require you to specify the values to use. Actions in tools are almost the same except for one difference. You can create agent parameters that the agent loop uses to specify the parameter values for actions in tools. You can specify model-generated outputs, values from nonmodel sources, or a combination. For more information, see [Agent parameters](agent-workflows-concepts.md#key-concepts).

The following table describes the use cases for creating agent parameters and where to create them, based on the use case:

| To | Where to create agent parameter |
| --- | --- |
| Use model-generated outputs only. <br>Share with other actions in the same tool. | Start from the action parameter. For detailed steps, see [Use model-generated outputs only](#use-model-generated-outputs-only). |
| Use nonmodel values. | No agent parameters needed. <br><br>This experience is the same as the usual action setup experience in Azure Logic Apps but is repeated for convenience in [Use values from nonmodel sources](#use-values-from-nonmodel-sources). |
| Use model-generated outputs with nonmodel values. <br>Share with other actions in the same tool. | Start from the tool, in the **Agent Parameters** section. For detailed steps, see [Use model outputs and nonmodel values](#use-model-outputs-and-nonmodel-values). |

##### Use model-generated outputs only

For an action parameter that uses only model-generated outputs, create an agent parameter by following these steps:

1. In the tool, select the action to open the information pane.

   For this example, the action is **Get current weather**.

1. On the **Parameters** tab, select inside the parameter box to show the parameter options.

1. On the right edge of the **Location** box, select the stars button.

   This button has the following tooltip: **Select to generate the agent parameter**.

   Screenshot shows an action with the mouse cursor inside a parameter box, parameter options, and the selected option to generate an agent parameter.

   The **Create agent parameter** window shows the **Name**, **Type**, and **Description** fields, which are prepopulated from the source action parameter.

   The following table describes the fields that define the agent parameter:

   | Parameter | Value | Description |
   | --- | --- | --- |
   | **Name** | <*agent-parameter-name*> | The agent parameter name. |
   | **Type** | <*agent-parameter-data-type*> | The agent parameter data type. |
   | **Description** | <*agent-parameter-description*> | The agent parameter description that easily identifies the parameter's purpose. |

   > **Note:**
   >
   > Microsoft recommends that you follow the action's Swagger definition. For example, for the **Get current weather** action, which is from the **MSN Weather** "shared" connector hosted and managed by global, multitenant Azure, see the [**MSN Weather** connector technical reference article](https://learn.microsoft.com/connectors/msnweather/#get-current-weather).

1. When you're ready, select **Create**.

   The following example shows the **Get current weather** action with the **Location** agent parameter:

   Screenshot shows the Weather agent, Get weather tool, and selected action named Get current weather. The Location action parameter includes the created agent parameter.

1. Save your workflow.

##### Use values from nonmodel sources

For an action parameter value that uses only nonmodel values, choose the option that best fits your use case:

**Use outputs from earlier operations in the workflow**

To browse and select from these outputs, follow these steps:

1. Select inside the parameter box, and then select the lightning icon to open the dynamic content list.

1. From the list, in the trigger or action section, select the output that you want. 

1. Save your workflow.

**Use results from expressions**

To create an expression, follow these steps:

1. Select inside the parameter box, and then select the function icon to open the expression editor.

1. Select from available functions to create the expression.

1. Save your workflow.

For more information, see [Reference guide to workflow expression functions in Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/workflow-definition-language-functions-reference).

##### Use model outputs and nonmodel values

Some scenarios might need to specify an action parameter value that uses both model-generated outputs with nonmodel values. For example, you might want to create an email body that uses static text, nonmodel outputs from earlier operations in the workflow, and model-generated outputs.

For these scenarios, create the agent parameter on the tool by following these steps:

1. On the designer, select the tool where you want to create the agent parameter.

1. On the **Details** tab, under **Agent Parameters**, select **Create Parameter**.

1. Expand **New agent parameter**, and provide the following information, but match the action parameter details.

   For this example, the example action is **Get current weather**.

   > **Note:**
   >
   > Microsoft recommends that you follow the action's Swagger definition. For example, to find this information for the **Get current weather** action, see the [**MSN Weather** connector technical reference article](https://learn.microsoft.com/connectors/msnweather/#get-current-weather). The example action is provided by the **MSN Weather** managed connector, which is hosted and run in a shared cluster on multitenant Azure.
  
   | Parameter | Value | Description |
   | --- | --- | --- |
   | **Name** | <*agent-parameter-name*> | The agent parameter name. |
   | **Type** | <*agent-parameter-data-type*> | The agent parameter data type. |
   | **Description** | <*agent-parameter-description*> | The agent parameter description that easily identifies the parameter's purpose. You can choose from the following options or combine them to provide a description: <br><br>- Plain literal text with details such as the parameter's purpose, permitted values, restrictions, or limits. <br><br>- Outputs from earlier operations in the workflow. To browse and choose these outputs, select inside the **Description** box, and then select the lightning icon to open the dynamic content list. From the list, select the output that you want. <br><br>- Results from expressions. To create an expression, select inside the **Description** box, and then select the function icon to open the expression editor. Select from available functions to create the expression. |

   When you're done, under **Agent Parameters**, the new agent parameter appears.

1. On the designer, in the tool, select the action to open the action information pane.

1. On the **Parameters** tab, select inside the parameter box to show the parameter options, and then select the robot icon.

1. From the **Agent parameters** list, select the agent parameter that you defined earlier.

   The finished **Get current weather** tool looks like the following example:

   Screenshot shows agent and finished Get weather tool.

1. Save your workflow.

## Create a 'Send email' tool

For many scenarios, an agent needs more than one tool. In this example, the agent loop needs a tool that sends the weather report in an email.

To build this tool, follow these steps:

1. On the designer, in the agent, next to the existing tool, select the plus sign (**+**) to add an action.

1. On the **Add an action** pane, follow these [general steps](https://learn.microsoft.com/azure/logic-apps/create-workflow-with-trigger-or-action#add-action) to select another action for your new tool.

   The examples use the **Outlook.com** action named **Send an email (V2)**.

   Like before, after you select the action, both the new **Tool** and action appear inside the agent loop on the designer at the same time. Both information panes open at the same time.

   Screenshot shows workflow designer with Weather agent, Get weather tool, and new tool with action named Send an email (V2).

1. On the tool information pane, rename the tool to describe its purpose. For this example, use `Send email`.

1. On the **Details** tab, for **Description**, enter the tool description. For this example, use `Send current weather by email.`

   Screenshot shows completed Send email tool with description.

## Create agent parameters for 'Send an email (V2)' action

Except for the different agent parameters to set up for the **Send an email (V2)** action, the steps in this section are nearly the same as [Create agent parameters for the 'Get current weather' action](#create-agent-parameters-get-weather).

- Follow the earlier general steps to create agent parameters for the parameter values in the **Send an email (V2)** action.

   The action needs three agent parameters named **To**, **Subject**, and **Body**. For the action's Swagger definition, see [**Send an email (V2)**](https://learn.microsoft.com/connectors/outlook/#send-an-email-\(v2\)).

   When you finish, the example action uses the previously defined agent parameters as shown in the following image:

   Screenshot shows the information pane for the action named Send an email V2, plus the previously defined agent parameters named To, Subject, and Body.

   The finished **Send email** tool looks like the following example:

   Screenshot shows the agent loop and finished Send email tool.


## Best practices for agent loops and tools

The following sections provide recommendations, best practices, and other guidance that can help you build better agent loops and tools.

### Agent loops

The following guidance provides best practices for agent loops.

##### Prototype agent loops and tools with 'Compose' actions

Rather than use actual actions and live connections to prototype your agent loops and tools, use [**Compose** actions](https://learn.microsoft.com/azure/logic-apps/logic-apps-perform-data-operations#compose-action) to "mock" or simulate the actual actions. This approach provides the following benefits:

- **Compose** actions don't produce side effects, which make these actions useful for ideation, design, and testing.

- You can draft and refine agent loop instructions, prompts, tool names and descriptions plus agent parameters and descriptions - all without having to set up and use live connections.

- When you confirm that your agent loop and tools work with only the **Compose** actions, you're ready to swap in the actual actions.

- When you switch over to the actual actions, you have to reroute or recreate your agent parameters to work with the actual actions, which might take some time.

##### Manage chat history context length

The agent loop maintains the chat history or *context*, including tool invocations, based on the current limit on the number of [tokens](https://learn.microsoft.com/azure/ai-services/openai/overview#tokens) or messages to keep and pass into the model for the next interaction. Over time, the agent loop history grows and eventually exceeds your model's *context length* limit, or the maximum number of input tokens. Models differ in their context lengths.

For example, **gpt-4o** supports 128,000 input tokens where each token has 3-4 characters. When the agent loop history approaches the model's context length, consider dropping stale or irrelevant messages to stay below the limit.

Here are some approaches to reduce your agent loop history:

- Reduce the size of results from tools by using the [**Compose** action](https://learn.microsoft.com/azure/logic-apps/logic-apps-perform-data-operations#compose-action). For more information, see [Tools - Best practices](#tools).

- Carefully craft your agent loop instructions and prompts to control the model's behavior.

- **Experimental capability**: You have the option to try chat reduction so you can reduce the maximum number of tokens or messages to keep in chat history and pass into the model.

  The agent loop has almost the same advanced parameters as the [Azure OpenAI built-in, service provider connector](https://learn.microsoft.com/azure/logic-apps/connectors/built-in/reference/openai/), except for the **Agent History Reduction Type** advanced parameter, which exists only on the agent action. This parameter controls the history that the agent loop maintains, based on the maximum number of tokens or messages.

  This capability is in active development and might not work for all scenarios. You can change the **Agent History Reduction Type** option to reduce the limit on tokens or messages. You then specify the numerical limit that you want.
  
  To try the capability, follow these steps:

  1. On the designer, select the agent action's title bar to open the information pane.
  1. On the **Parameters** tab, find the **Advanced parameters** section.
  1. Check whether the parameter named **Agent History Reduction Type** exists. If not, open the **Advanced parameters** list, and select that parameter.
  1. From the **Agent History Reduction Type** list, select one of the following options:

     | Option | Description |
     | --- | --- |
     | **Token count reduction** | Shows the parameter named **Maximum Token Count**. Specifies the maximum number of tokens in agent loop history to keep and pass into the model for the next interaction. The default differs based on the currently used model in Azure OpenAI Service. The default limit is **128,000**. |
     | **Message count reduction** | Shows the parameter named **Message Count Limit**. Specifies the maximum number of messages in agent loop history to keep and pass into the model for the next interaction. No default limit exists. |

### Tools

The following guidance provides best practices for tools.

- The name is the most important value for a tool. Make sure the name is succinct and descriptive.

- The tool description provides useful and helpful context for the tool.

- Both the tool name and description have character limits.

  Some limits are enforced by the model in Azure OpenAI Service at run time, rather than when you save the changes in the agent loop in the workflow.

- Too many tools in the same agent loop can have a negative effect on agent loop quality.

  A good general guideline recommends that an agent loop includes no more than 10 tools. However, this guidance varies based on the model that you use from Azure OpenAI Service.

- In tools, actions don't need to have all their inputs come from the model.

  You can finely control which action inputs come from non-model sources and which inputs come from the model. For example, suppose a tool has an action that sends email. You can provide a plain and mostly static email body but use model-generated outputs for part of that email body.

- Customize or transform tool results before you pass them to the model.

  You can change the results from a tool before they pass into the model by using the [**Compose** action](https://learn.microsoft.com/azure/logic-apps/logic-apps-perform-data-operations#compose-action). This approach provides the following benefits:

  - Improve response quality by reducing irrelevant [context](https://learn.microsoft.com/azure/logic-apps/agent-workflows-concepts#key-concepts) that passes into the model. You send only the fields that you need from a large response.

  - Reduce billing charges for tokens that pass into the model and avoid exceeding the model's limit on *context length*, the maximum number of tokens that pass into the model. You send only the fields that you need.

  - Combine the results from multiple actions in the tool.

  - You can mock the tool results to simulate the expected results from actual actions. Mock actions leave data unchanged at the source and don't incur charges for resource usage outside Azure Logic Apps.

### Agent parameters

The following guidance provides best practices for agent parameters.

- The name is the most important value for an agent parameter. Make sure the name is succinct and descriptive.

- The agent parameter description provides useful and helpful context for the tool.


## Trigger or run the workflow

You can trigger or run conversational agentic workflows in the following ways, depending on the deployment environment:

| Environment | Description |
| --- | --- |
| Nonproduction | On the workflow designer toolbar, select **Chat** to manually start a chat session with the conversational agent in the Azure portal. <br><br>**Important**: This method is intended only for test activities. Portal-based testing uses a temporary developer key. External users or production systems can't use this key. For more information, see [Authentication and authorization](#authentication-and-authorization). |
| Production | Set up authentication for external users or clients such as websites, mobile apps, bots, or other Azure services to access the conversational agent loop. They can then trigger the workflow by using the chat client URL. |

The following table describes how chat users or clients use the chat client URL to run the workflow in production:

| Workflow type | Chat client URL usage | Required authentication |
| --- | --- | --- |
| **Consumption** | Open the URL in a browser or embed the URL in an *iFrame* HTML element. | OAuth 2.0 with Microsoft Entra ID |
| **Standard** | Open the URL in a browser, embed the URL in an *iFrame* element, or if you use the **Request** trigger, call the trigger's HTTP URL. | Managed identity or Easy Auth |

To embed the chat client URL in an [*iFrame* HTML element](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/iframe), use the following format:

| Workflow type | iFrame HTML element |
| --- | --- |
| Consumption | `<iframe src="https://agents.<region>.logic.azure.com/scaleunits/<scale-unit-ID>/flows/<workflow-ID>/agentChat/IFrame" title="<chat-client-name>"></iframe>` |
| Standard | `<iframe src="https://<logic-app-name>.azurewebsites.net/api/agentsChat/<workflow-name>/IFrame" title="<chat-client-name>"></iframe>` |

## Authentication and authorization

For nonproduction activities, such as design, development, and quick testing, the Azure portal provides, manages, and uses a *developer key* to run your workflow and execute actions on your behalf. The following list recommends some best practices for handling this developer key:

- Treat the developer key strictly as a design-time convenience for authentication and authorization.

- Before you expose your conversational agentic workflow to other agents, automation, or wider user populations, migrate to signed SAS with network restrictions, or use the following authentication and authorization methods for external chat, based on your conversational agentic workflow type:

  | Workflow | Authentication |
  | --- | --- |
  | Consumption | [OAuth 2.0 with Microsoft Entra ID](https://learn.microsoft.com/entra/architecture/auth-oauth2) |
  | Standard | Managed identity, [Easy Auth (App Service Authentication)](set-up-authentication-agent-workflows.md) |

  If anyone or anything outside your Azure portal session needs to call or interact with your workflow, don't use the developer key.

When you're ready to release your agentic workflow into production, follow the [migration steps to prepare for production authentication and authorization](#migrate-to-production-authentication). For more information, see [Authentication and authorization](agent-workflows-concepts.md#authentication-and-authorization).

<a name="production-authentication"></a>

## Migrate to production authentication

1. On your logic app resource, set up the following authentication, based on your workflow type:

   | Workflow | Authentication |
   | --- | --- |
      | Consumption | [OAuth 2.0 with Microsoft Entra ID](https://learn.microsoft.com/entra/architecture/auth-oauth2) by creating an agent authorization policy on your logic app resource. <br><br>To create this policy, follow these steps: <br>1. Follow the [general steps to create the policy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-securing-a-logic-app.md?tabs=azure-portal#enable-azure-ad-inbound), but use the following next steps instead. <br>2. Select **Azure Active Directory (AAD)**. <br>3. Select **Agent Authorization Rule (For Conversational Agents)**. <br>4. Under **Object IDs**, enter the object ID for each user, app, or enterprise app that can access the agent loop. <br>5. When you're done, on the toolbar, select **Save**. <br><br>For more information, see: <br>- [Locate important IDs for a user](https://learn.microsoft.com/partner-center/account-settings/find-ids-and-domain-names) <br>- [Application and service principal objects in Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/app-objects-and-service-principals) |
   | Standard | Managed identity, [Easy Auth (App Service Authentication)](set-up-authentication-agent-workflows.md) |

1. Enforce any authentication required access patterns.

1. Optionally, lock down any trigger endpoint URLs by disabling or regenerating any unused SAS URLs.

1. To include the external chat client interface on a website or anywhere else to support human interactions, get the chat client URL and embed the URL in an [*iFrame* HTML element](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/iframe) by following these steps:

   1. On the designer toolbar or workflow sidebar, select **Chat**.

   1. In the **Essentials** section, copy or select the **Chat Client URL** link, which opens in new browser tab.

   1. Embed the chat client URL in an [*iFrame* HTML element](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/iframe), which uses the following format:

      | Workflow | iFrame HTML element |
      | --- | --- |
      | Consumption | `<iframe src="https://agents.<region>.logic.azure.com/scaleunits/<scale-unit-ID>/flows/<workflow-ID>/agentChat/IFrame" title="<chat-client-name>"></iframe>` |
      | Standard | `<iframe src="https://<logic-app-name>.azurewebsites.net/api/agentsChat/<workflow-name>/IFrame" title="<chat-client-name>"></iframe>` |

### Troubleshoot authentication migration

The following table describes common problems you might encounter when you try to migrate from a developer key to Easy Auth, their possible causes, and actions you can take:

| Symptom | Likely cause | Action |
| --- | --- | --- |
| Portal tests work, but external calls get **401** response. | External calls don't have a valid signed SAS token or Easy Auth access token (Standard workflows only). | Use a workflow trigger URL with a signed SAS or Set up Easy Auth (Standard workflows only). |
| Designer tests work, but Azure API Management calls fail. | API Management calls are missing expected header information. | Add OAuth 2.0 token acquisition in API Management policy or use managed identity authentication where supported. |
| Access is inconsistent after a role changes. | Cached session in the Azure portal | - Sign out and sign back in. <br><br>- Get a fresh token. |


## Troubleshoot problems

This section describes guidance to help troubleshoot errors or problems that you might encounter when you build or run agentic workflows.

### Review tool execution data

The workflow run history provides useful information that helps you learn what happened during a specific run. For an agentic workflow, you can find tool execution inputs and outputs for a specific agent loop iteration.

1. On the workflow menu, under **Tools**, select **Run history** to open the **Run history** page.

1. On the **Run history** tab, in the **Identifier** column, select the workflow run that you want.

   The monitoring view opens to show the status for each step.

1. Select the agent action that you want to inspect. To the right side, the **Agent log** pane appears.

   This pane shows the agent log, including tool executions during the interaction.

1. To get tool execution data at a specific point, find that point in the agent log, and select the tool execution reference, for example:

   Screenshot shows agent log and selected tool execution link.

   This action moves you to the matching tool in monitoring view. The agent action shows the current iteration count.

1. In monitoring view, select the agent action or the action with the inputs, outputs, and properties that you want to review.

   The following example shows a selected action for the previously selected tool execution:

   Screenshot shows monitoring view, current agent loop iteration, and selected action with inputs and outputs at this point in time.

   If you select the agent, you can review the following information that passes into the model and returns from the model, for example:

   - Input messages passed into the model.
   - Output messages returned from the model.
   - Tools that the model asked the agent loop to call.
   - Tool results that passed back into the model.
   - Number of tokens that each request used.

1. To review a different agent loop iteration, in the agent, select the left or right arrow.

### Logs in Application Insights

If you set up Application Insights or advanced telemetry for your workflow, you can review the logs for agent loop events, like any other action. For more information, see [Enable and view enhanced telemetry in Application Insights for Standard workflows in Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/enable-enhanced-telemetry-standard-workflows).

### Model maximum context length exceeded

If your agent's log history exceeds the model's *context length*, or the maximum number of input tokens, you get an error that looks like the following example:

**This model's maximum context length is 4097 tokens. However, you requested 4927 tokens (3927 in the messages, 1000 in the completion). Please reduce the length of the messages or completion.**

Try reducing the limit on the number of tokens or messages that your agent loop keeps in the log and passes into the model for the next interaction. For this example, you might select **Token count reduction** and set **Maximum Token Count** to a number below the error's stated maximum context length, which is **4097**.

For more information, see [Manage chat history context length](#manage-chat-history-context-length).



## Clean up example resources

If you don't need the resources that you created for the examples, make sure to delete the resources so that you don't continue to get charged. You can either follow these steps to delete the resource group that contains these resources, or you can delete each resource individually.

1. In the Azure search box, enter **resource groups**, and select **Resource groups**.

1. Find and select the resource groups that contain the resources for this example.

1. On the **Overview** page, select **Delete resource group**.

1. When the confirmation pane appears, enter the resource group name, and select **Delete**.

## Related content

- [AI agentic workflows in Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/agent-workflows-concepts)
- [Lab: Build your first conversational agentic workflow in Azure Logic Apps](https://azure.github.io/logicapps-labs/docs/logicapps-ai-course/build_conversational_agents/create-first-conversational-agent)
- [Azure Logic Apps limits and configuration](https://learn.microsoft.com/azure/logic-apps/logic-apps-limits-and-config)
- [Azure OpenAI Service quotas and limits](https://learn.microsoft.com/azure/ai-services/openai/quotas-limits)
