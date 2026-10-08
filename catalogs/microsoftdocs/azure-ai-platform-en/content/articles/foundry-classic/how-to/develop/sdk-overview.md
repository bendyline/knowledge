---
title: "Get started with Microsoft Foundry SDKs and endpoints (classic)"
description: "Learn how to choose Microsoft Foundry SDKs and endpoints, configure a project endpoint, and start building AI applications in the classic experience."
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.custom:
- classic-and-new
- build-2024
- ignite-2024
- dev-focus
- doc-kit-assisted
ai-usage: ai-assisted
ms.topic: how-to
ms.date: 08/05/2026
ms.reviewer: dantaylo
ms.author: sgilley
author: sdgilley
zone_pivot_groups: foundry-sdk-overview-languages
# customer intent: I want to learn how to use the Microsoft Foundry SDK and endpoints to build AI applications on Azure.
ROBOTS: NOINDEX, NOFOLLOW
---

# Microsoft Foundry SDKs and endpoints (classic)

**Currently viewing:** Diagram that shows the classic portal version is currently selected. **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../../foundry/how-to/develop/sdk-overview.md)


A Foundry resource provides unified access to models, agents, and tools. This article explains which SDK and endpoint to use for your scenario.

The **Foundry SDK** is a thin-client SDK that exposes all of the Foundry project APIs through a single project endpoint. Higher-level SDKs build on it — for example, the Agent Framework `foundry` package depends on the Foundry SDK to access Foundry models, tools, and project configuration.

| SDK | What it's for | Endpoint |
| --- | --- | --- |
| **Foundry SDK** | Thin-client SDK over all Foundry project APIs. Access to Foundry Models and platform tools (file search, code interpreter, web search, memory, SharePoint, WorkIQ, Fabric IQ, MCP). | `https://<resource-name>.services.ai.azure.com/api/projects/<project-name>` |
| **Agent Framework** | Unified multi-agent orchestration for hosted agents and multi-agent systems, available in C#/.NET and Python. The `foundry` package depends on the Foundry SDK for project access. | Responses API in the project endpoint, via `FoundryChatClient`. |
| **OpenAI SDK** | Full OpenAI API surface, including embeddings and Foundry Models sold by Azure through Chat Completions. Best latency and maximum OpenAI compatibility. | `https://<resource-name>.openai.azure.com/openai/v1` |
| **Anthropic SDK** | Anthropic Claude models deployed in Foundry. | `https://<resource-name>.services.ai.azure.com/anthropic` |
| **Foundry Tools SDKs** | Prebuilt solutions (Vision, Speech, Content Safety, and more). | Tool-specific endpoints. |

**Choose your SDK**:
- Use **Foundry SDK** when building apps with agents, evaluations, or Foundry-specific features
- Use **Agent Framework** for hosted agents or multi-agent systems in code using the Responses API in C#/.NET or Python
- Use **OpenAI SDK** when maximum OpenAI compatibility or lowest latency is required, when generating embeddings, or when using Models sold by Azure through Chat Completions
- Use **Anthropic SDK** when working with Anthropic Claude models deployed in Foundry
- Use **Foundry Tools SDKs** when working with specific AI services (Vision, Speech, Language, etc.)

> **Note:**
> **Resource types:** A Foundry resource provides all endpoints previously listed. An Azure OpenAI resource provides only the `/openai/v1` endpoint.
>
> **Authentication:** Samples here use Microsoft Entra ID (`DefaultAzureCredential`). API keys work on `/openai/v1`. Pass the key as `api_key` instead of a token provider.

## Prerequisites

- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 


- Have the Azure RBAC role required for your task at the narrowest scope:
  - **Foundry User** on the Foundry project for day-to-day development.

    
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

  - **Foundry Project Manager** on the Foundry project to manage an existing project and its connections.
  - **Foundry Account Owner** on the Foundry resource to create projects or manage account-level resources. Assign this role on the target resource group only when you need to create a Foundry resource.

    Activate the resource-group assignment just in time through Microsoft Entra Privileged Identity Management (PIM), and deactivate it after provisioning. Day-to-day developers and runtime users don't need this elevated assignment.
  
  For details on each role's permissions, see [Role-based access control for Microsoft Foundry](../../../foundry/concepts/rbac-foundry.md).

- Install the required language runtimes, global tools, and VS Code extensions as described in [Prepare your development environment](../../../foundry/how-to/develop/install-cli-sdk.md).

### Verify prerequisites

Before proceeding, confirm each check returns the stated result:

- Confirm that the Azure CLI uses the intended subscription and tenant:

  ```azurecli
  az account show --query "{subscription:name, tenant:tenantId}" --output table
  ```

  The command exits successfully and displays the expected subscription and tenant.

- Confirm that your local credential can request a Foundry access token without displaying the token:

  ```azurecli
  az account get-access-token --resource https://ai.azure.com --query expiresOn --output tsv
  ```

  The command exits successfully and displays the token expiration time. If it fails, run `az login` with an identity that has the required Foundry role.

- Confirm that you have the required RBAC role in the Azure portal under **Foundry resource** > **Access control (IAM)**.
**Applies to: programming-language-python**

- Run `python --version`. The command exits successfully and reports Python 3.10 or later.

**Applies to: programming-language-javascript**

- Run `node --version`. The command exits successfully and reports Node.js 22 or later.

**Applies to: programming-language-csharp**

- Run `dotnet --version`. The command exits successfully and reports .NET 8 or later.

**Applies to: programming-language-java**

- Run `java --version`. The command exits successfully and reports Java 17 or later.


- Confirm that your project endpoint has this format:
  `https://<resource-name>.services.ai.azure.com/api/projects/<project-name>`.

- Confirm that the `gpt-5-mini` deployment is ready:

  ```azurecli
  az cognitiveservices account deployment show \
    --name <resource-name> \
    --resource-group <resource-group> \
    --deployment-name gpt-5-mini \
    --query properties.provisioningState \
    --output tsv
  ```

  The command returns `Succeeded`. Use the deployed name in the code examples if your deployment has a different name.


## Foundry SDK

The Foundry SDK connects to a single project endpoint that provides access to the most popular Foundry capabilities:

```
https://<resource-name>.services.ai.azure.com/api/projects/<project-name>
```

> **Note:**
> If your organization uses a custom subdomain, replace `<resource-name>` with `<your-custom-subdomain>` in the endpoint URL.

This approach simplifies application configuration. Instead of managing multiple endpoints, you configure one.

### Install the SDK

> **Note:**
> This article applies to a **
Foundry project**. The code shown here doesn't work for a **
hub-based project**. For more information, see [Types of projects](../../what-is-foundry.md#types-of-projects).

> **Note:**
> **SDK versions:** This article covers installation of the 1.x SDK. Make sure the samples you follow match your installed package. [Switch to the new Foundry portal documentation to view article for 2.x](../../../foundry/how-to/develop/sdk-overview.md).

**Applies to: programming-language-python**




| SDK Version | Portal Version | Status | Python Package |
| --- | --- | --- | --- |
| 2.x | Foundry (new) | Stable | `azure-ai-projects>=2.3.0` |
| 1.x | Foundry (classic) | Stable | `azure-ai-projects==1.0.0` |

The [Azure AI Projects client library for Python](https://learn.microsoft.com/python/api/overview/azure/ai-projects-readme) is a unified library that enables you to use multiple client libraries together by connecting to a single project endpoint. Starting in version 2.3.0, hosted-agent and toolbox operations use stable clients instead of beta namespaces.

The 2.x SDK samples require Python 3.10 or later and `openai>=3.0.0`.


Run this command to install the 1.x packages for Foundry classic projects.
```bash
pip install openai azure-identity azure-ai-projects==1.0.0
```


**Applies to: programming-language-java**


| SDK Version | Portal Version | Status | Java Package |
| --- | --- | --- | --- |
| 1.x | Foundry classic | Retired | No supported Java package is available for this classic path. Use `com.azure:azure-ai-projects:2.2.0` with a current Foundry project. |



**Applies to: programming-language-javascript**


| SDK Version | Portal Version | Status | JavaScript Package |
| --- | --- | --- | --- |
| 1.0.1 | Foundry classic | Stable | `@azure/ai-projects` |



**Applies to: programming-language-csharp**


| SDK Version | Portal Version | Status | .NET Package |
| --- | --- | --- | --- |
| 1.1.0 (GA) | Foundry classic | Stable | `Azure.AI.Projects` |



**Applies to: programming-language-java**


The Java SDK path for Foundry classic is retired. The classic 1.x project SDK didn't reach general availability for Java, and the retired `azure-ai-inference` preview package isn't a supported replacement.

> **Important:**
> Don't start or migrate Java development on the classic SDK path. [Switch to the current Foundry SDK guide](../../../foundry/how-to/develop/sdk-overview.md) and use the GA [Azure AI Projects client library for Java](https://learn.microsoft.com/java/api/overview/azure/ai-projects-readme) with a current Foundry project.

For a current Foundry project, add the following dependency to your Maven `pom.xml`:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-ai-projects</artifactId>
    <version>2.2.0</version>
</dependency>
```


**Applies to: programming-language-javascript**


The [Azure AI Projects client library for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/ai-projects-readme) is a unified library that enables you to use multiple client libraries together by connecting to a single project endpoint.

Run this command to install the 1.x JavaScript packages for Foundry classic projects.
```bash
npm install @azure/ai-projects@1.0.1 @azure/identity
```


**Applies to: programming-language-csharp**


The [Azure AI Projects client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/ai.projects-readme) is a unified library that enables you to use multiple client libraries together by connecting to a single project endpoint.

Run these commands to add the 1.x Azure AI SDK packages for Foundry classic projects.

```bash
# Add 1.x Azure AI SDK packages
dotnet add package Azure.Identity
dotnet add package Azure.AI.Projects --version 1.1.0
dotnet add package Azure.AI.Agents.Persistent --version 1.1.0
dotnet add package Azure.AI.Inference
```


### Using the Foundry SDK

The SDK exposes two client types because Foundry and OpenAI have different API shapes:

- **Project client** – Use for Foundry-native operations where OpenAI has no equivalent. Examples: listing connections, retrieving project properties, enabling tracing.
- **OpenAI-compatible client** – Use for Foundry functionality that builds on OpenAI concepts. The Responses API, agents, evaluations, and fine-tuning all use OpenAI-style request/response patterns. This client also gives you access to Foundry direct models (non-Azure-OpenAI models hosted in Foundry). The project endpoint serves this traffic on the `/openai` route.

Most apps use both clients. Use the project client for setup and configuration, then use the OpenAI-compatible client for running agents, evaluations, and calling models (including Foundry direct models).

**Applies to: programming-language-python**


**Create a project client:**
```python
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

project_client = AIProjectClient(
    endpoint="https://<resource-name>.services.ai.azure.com/api/projects/<project-name>",
    credential=DefaultAzureCredential(),
)
```
**Create an OpenAI-compatible client from your project:**

```python
models = project_client.get_openai_client(api_version="2024-10-21")
chat_responses = models.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "What is the size of France in square miles?"},
    ],
)

print(chat_responses.choices[0].message.content)
```


**Applies to: programming-language-java**


The Java first-success path for Foundry classic is retired. The former `azure-ai-inference` example doesn't create a classic project client and uses an API call that isn't available in that package version.

For Java development, use `com.azure:azure-ai-projects:2.2.0` with a current Foundry project and follow the [current Foundry SDK guide](../../../foundry/how-to/develop/sdk-overview.md). This current SDK path doesn't add Java support to Foundry classic projects.


**Applies to: programming-language-javascript**


**Create a project client:**

```javascript
const endpoint = "https://<resource-name>.services.ai.azure.com/api/projects/<project-name>";
const deployment = "gpt-4o";

const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
```
**Create an OpenAI-compatible client from your project:**
```javascript
const client = await project.getAzureOpenAIClient({
    // The API version should match the version of the Azure OpenAI resource
    apiVersion: "2024-12-01-preview"
});
const chatCompletion = await client.chat.completions.create({
    model: deployment,
    messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "What is the speed of light?" },
    ],
});

console.log(chatCompletion.choices[0].message.content);
```


**Applies to: programming-language-csharp**


**Create a project client:**

```csharp
using System.ClientModel.Primitives;
using Azure.AI.OpenAI;
using Azure.AI.Projects;
using Azure.Identity;
using OpenAI.Chat;

string endpoint = "https://<resource-name>.services.ai.azure.com/api/projects/<project-name>";
AIProjectClient projectClient = new AIProjectClient(new Uri(endpoint), new DefaultAzureCredential());
```
**Create an OpenAI-compatible client from your project:**

```csharp
ClientConnection connection = projectClient.GetConnection(typeof(AzureOpenAIClient).FullName!);
if (!connection.TryGetLocatorAsUri(out Uri uri) || uri is null)
{
    throw new InvalidOperationException("Invalid URI.");
}
uri = new Uri($"https://{uri.Host}");
const string modelDeploymentName = "gpt-4o";  
AzureOpenAIClient azureOpenAIClient = new AzureOpenAIClient(uri, new DefaultAzureCredential());
ChatClient chatClient = azureOpenAIClient.GetChatClient(deploymentName: modelDeploymentName);

Console.WriteLine("Complete a chat");
ChatCompletion result = chatClient.CompleteChat("List all the rainbow colors");
Console.WriteLine(result.Content[0].Text);
```


### What you can do with the Foundry SDK

- [Access Foundry Models](../../quickstarts/get-started-code.md), including Azure OpenAI
- [Use the Foundry Agent Service](../../agents/quickstart.md)
- [Run cloud evaluations](cloud-evaluation.md)
- [Enable app tracing](trace-application.md)
- [Fine-tune a model](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/fine-tuning?tabs=azure-openai\&pivots=programming-language-python)
- Get endpoints and keys for Foundry Tools, local orchestration, and more


## Troubleshooting

### Authentication errors

If you see `DefaultAzureCredential failed to retrieve a token`:

1. **Verify Azure CLI is authenticated**:
   ```bash
   az account show
   az login  # if not logged in
   ```

2. **Check RBAC role assignment**:
   - Confirm you have at least the Foundry User role on the Foundry project

     
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

   - See [Assign Azure roles](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal)

3. **For managed identity in production**:
   - Ensure the managed identity has the appropriate role assigned
   - See [Configure managed identities](../../../foundry/concepts/authentication-authorization-foundry.md#identity-types)

### Endpoint configuration errors

If you see `Connection refused` or `404 Not Found`:

- **Verify resource and project names** match your actual deployment
- **Check endpoint URL format**: Should be `https://<resource-name>.services.ai.azure.com/api/projects/<project-name>`
- **For custom subdomains**: Replace `<resource-name>` with your custom subdomain

### SDK version mismatches

If code samples fail with `AttributeError` or `ModuleNotFoundError`:

- **Check SDK version**:
  ```bash
  pip show azure-ai-projects  # Python
  npm list @azure/ai-projects  # JavaScript
  dotnet list package  # .NET
  ```

- **Reinstall with correct version flags**: See installation commands in each language section above


## OpenAI SDK

Use the OpenAI SDK when you want the full OpenAI API surface and maximum client compatibility. This endpoint provides access to Azure OpenAI models and Foundry direct models (via Chat Completions API). It doesn't provide access to Foundry-specific features like agents and evaluations.

The following snippet shows how to use the Azure OpenAI `/openai/v1` endpoint directly.

**Applies to: programming-language-python**


```python
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://ai.azure.com/.default"
)

client = OpenAI(  
  base_url = "https://<resource-name>.openai.azure.com/openai/v1/",  
  api_key=token_provider,
)

response = client.responses.create(
    model="model_deployment_name",
    input= "What is the size of France in square miles?" 
)

print(response.model_dump_json(indent=2)) 
```

For more information, see [Azure OpenAI supported programming languages](https://learn.microsoft.com/azure/ai-foundry/openai/supported-languages?tabs=dotnet-secure%2Csecure%2Cpython-entra\&pivots=programming-language-python).
**Expected output**:
```json
{
  "id": "resp_abc123",
  "object": "response",
  "created": 1234567890,
  "model": "gpt-5.2",
  "output_text": "France has an area of approximately 213,011 square miles (551,695 square kilometers)."
}
```

For more information, see [Azure OpenAI supported programming languages](https://learn.microsoft.com/azure/ai-foundry/openai/supported-languages?tabs=dotnet-secure%2Csecure%2Cpython-entra\&pivots=programming-language-python)



**Applies to: programming-language-java**



> **Important:**
> Items marked preview in this article are currently in preview. This preview is provided without a service-level agreement, and Microsoft doesn't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

The following snippet shows how to use the Azure OpenAI `/openai/v1` endpoint directly.

```java
import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.ChatChoice;
import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatRequestAssistantMessage;
import com.azure.ai.openai.models.ChatRequestMessage;
import com.azure.ai.openai.models.ChatRequestSystemMessage;
import com.azure.ai.openai.models.ChatRequestUserMessage;
import com.azure.ai.openai.models.ChatResponseMessage;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.Configuration;

import java.util.ArrayList;
import java.util.List;

String endpoint = "https://<resource-name>.openai.azure.com/openai/v1";
String deploymentName = "gpt-5.2";
TokenCredential defaultCredential = new DefaultAzureCredentialBuilder().build();
OpenAIClient client = new OpenAIClientBuilder()
    .credential(defaultCredential)
    .endpoint("{endpoint}")
    .buildClient();

List<ChatRequestMessage> chatMessages = new ArrayList<>();
chatMessages.add(new ChatRequestSystemMessage("You are a helpful assistant."));
chatMessages.add(new ChatRequestUserMessage("What is the speed of light?"));

ChatCompletions chatCompletions = client.getChatCompletions(deploymentName, new ChatCompletionsOptions(chatMessages));

System.out.printf("Model ID=%s is created at %s.%n", chatCompletions.getId(), chatCompletions.getCreatedAt());
for (ChatChoice choice : chatCompletions.getChoices()) {
    ChatResponseMessage message = choice.getMessage();
    System.out.printf("Index: %d, Chat Role: %s.%n", choice.getIndex(), message.getRole());
    System.out.println("Message:");
    System.out.println(message.getContent());
```

For more information on using the OpenAI SDK, see [Azure OpenAI supported programming languages](https://learn.microsoft.com/azure/ai-foundry/openai/supported-languages?tabs=dotnet-secure%2Csecure%2Cpython-entra\&pivots=programming-language-java).


**Applies to: programming-language-javascript**


```javascript
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

const deployment = "gpt-4o";
const endpoint = "https://<resource-name>.openai.azure.com";
const scope = "https://ai.azure.com/.default";
const apiVersion = "2024-04-01-preview";

const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);

const options = { azureADTokenProvider, deployment, apiVersion, endpoint };

const client = new AzureOpenAI(options);

const result = await client.chat.completions.create({
    model: deployment,
    messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "What is the speed of light?" },
    ],
});
console.log(result.choices[0].message.content);
```

For more information on using the OpenAI SDK, see [Azure OpenAI supported programming languages](https://learn.microsoft.com/azure/ai-foundry/openai/supported-languages?tabs=dotnet-secure%2Csecure%2Cpython-entra\&pivots=programming-language-javascript).


**Applies to: programming-language-csharp**


1. Install the OpenAI package:
   Run this command to add the OpenAI client library to your .NET project.
   ```bash
   dotnet add package OpenAI
   ```When it succeeds, the .NET CLI confirms that it installed the `OpenAI` package.

   This snippet configures `DefaultAzureCredential`, builds `OpenAIClientOptions`, and creates a `ChatClient` for the Azure OpenAI v1 endpoint.
   ```csharp
   using System.ClientModel.Primitives;
   using Azure.Identity;
   using OpenAI;
   using OpenAI.Chat;
    
   #pragma warning disable OPENAI001

   const string directModelEndpoint  = "https://<resource-name>.openai.azure.com/openai/v1/";
   const string modelDeploymentName = "gpt-5.2";    
    
   BearerTokenPolicy tokenPolicy = new(
        new DefaultAzureCredential(),
        "https://ai.azure.com/.default");
   OpenAIClient openAIClient = new(
        authenticationPolicy: tokenPolicy,
        options: new OpenAIClientOptions()
        {
            Endpoint = new($"{directModelEndpoint}"),
        });
   ChatClient chatClient = openAIClient.GetChatClient(modelDeploymentName);
    
   ChatCompletion completion = await chatClient.CompleteChatAsync(
        [
            new SystemChatMessage("You are a helpful assistant."),
                        new UserChatMessage("How many feet are in a mile?")
        ]);
    
   Console.WriteLine(completion.Content[0].Text);
   #pragma warning restore OPENAI001
   ```

For more information on using the OpenAI SDK, see [Azure OpenAI supported programming languages](https://learn.microsoft.com/azure/ai-foundry/openai/supported-languages?tabs=dotnet-secure%2Csecure%2Cpython-entra\&pivots=programming-language-programming-language-dotnet).



## Agent Framework

[Microsoft Agent Framework](https://learn.microsoft.com/agent-framework/overview/agent-framework-overview) is an open-source SDK for C#/.NET and Python that provides unified multi-agent orchestration and consistent abstractions for building agents and multi-agent systems. It's the recommended orchestration layer for [Hosted agents](../../../foundry/agents/overview.md#hosted-agents) in Foundry.

- If you previously used AutoGen or Semantic Kernel for multi-agent orchestration (coordinating multiple agents to work together on tasks), consider Agent Framework as your primary orchestration layer. It helps you avoid combining multiple orchestration SDKs that solve similar coordination tasks, which can add conflicting abstractions and dependencies.
- If you already have substantial existing orchestration code, depend on product-specific features, or face complex migration requirements, evaluate those requirements before consolidating on Agent Framework.

### Run your code as a Hosted agent

The main story for code-based agents in Foundry is [Hosted agents](../../../foundry/agents/overview.md#hosted-agents). Write your agent with Agent Framework, package it as a container image or zip of your source code, and let Foundry run it with a managed endpoint, automatic scaling on isolated Micro VMs, a dedicated Microsoft Entra agent identity, session-level state, and end-to-end observability.

Hosted agents are the recommended path when you want a Foundry-managed, network-addressable endpoint that other apps or agents can call. See [Deploy your first Hosted agent](../../../foundry/agents/quickstarts/quickstart-hosted-agent.md).

### Build agents in code outside Foundry with the Responses API

If you're hosting your agent outside of Foundry — in your own process or infrastructure — you can also use Agent Framework to call the **Responses API in your project endpoint** directly. Agent Framework connects through the `FoundryChatClient` provider, which targets:

```
{project_endpoint}/openai/v1/responses
```

Going through the project endpoint — instead of a resource-level OpenAI endpoint — gives your agent:

- Foundry models from the catalog (Azure OpenAI and Foundry direct models) through one API.
- Platform tools beyond the OpenAI tool set, including file search, code interpreter, memory, web search, MCP servers, SharePoint, WorkIQ, and Fabric IQ.
- Project-scoped data, On-Behalf-Of (OBO) tool authentication, and the project's tracing, content filters, and identity configuration.

This pattern is additive to Hosted agents, not an alternative — the same Agent Framework code can call the Responses API from your own process today and be packaged as a Hosted agent later when you want a Foundry-managed endpoint. See [Quickstart: Build agents using the Responses API](../../../foundry/agents/quickstarts/responses-api.md).

For a full comparison of agent types and hosting choices, see [What is Microsoft Foundry Agent Service?](../../../foundry/agents/overview.md).

## Foundry Tools SDKs

Foundry Tools (formerly Azure AI Services) are prebuilt point solutions with dedicated SDKs. Use the following endpoints to work with Foundry Tools.

### Which endpoint should you use?

Choose an endpoint based on your needs:

Use the Azure AI Services endpoint to access Computer Vision, Content Safety, Document Intelligence, Language, Translation, and Token Foundry Tools.

Foundry Tools endpoint: `https://<your-resource-name>.cognitiveservices.azure.com/`

> **Note:**
> Endpoints use either your resource name or a custom subdomain. If your organization set up a custom subdomain, replace `your-resource-name` with `your-custom-subdomain` in all endpoint examples.

If your workloads use retiring Azure AI Language features—for example, sentiment analysis, key phrase extraction, summarization, entity linking, CLU, or CQA—plan to migrate to Microsoft Foundry alternatives. For new development, consider using the Foundry SDK or the OpenAI-compatible endpoint as described earlier in this article. See [Migrate from Language Studio to Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/language-service/migration-studio-to-foundry).

For Speech and Translation Foundry Tools, use the endpoints in the following tables. Replace placeholders with your resource information.

#### Speech Endpoints

| Foundry Tool | Endpoint |
| --- | --- |
| Speech to Text (Standard) | `https://<YOUR-RESOURCE-REGION>.stt.speech.microsoft.com` |
| Text to Speech (Neural) | `https://<YOUR-RESOURCE-REGION>.tts.speech.microsoft.com` |
| Custom Voice | `https://<YOUR-RESOURCE-NAME>.cognitiveservices.azure.com/` |

#### Translation Endpoints

| Foundry Tool | Endpoint |
| --- | --- |
| Text Translation | `https://api.cognitive.microsofttranslator.com/` |
| Document Translation | `https://<YOUR-RESOURCE-NAME>.cognitiveservices.azure.com/` |

#### Language Endpoints

| Foundry Tool | Endpoint |
| --- | --- |
| Text analysis | `https://<YOUR-RESOURCE-NAME>.cognitiveservices.azure.com` |

> **Important:**
> On March 20, 2027, Azure Language Studio will retire and migrate to Microsoft Foundry; all capabilities and future enhancements will be available in Microsoft Foundry.
>
> On March 31, 2029, the following Azure Language capabilities will retire (end of support). Before that date, users should migrate existing workloads and onboard new projects to [Microsoft Foundry models](../../../foundry/concepts/foundry-models-overview.md) for enhanced natural language understanding and simplified application integration:
>
> - Key Phrase Extraction
> - Sentiment Analysis and Opinion Mining
> - Custom Text Classification
> - Conversational Language Understanding (CLU)
> - Custom Question Answering (CQA)
> - Orchestration Workflow
> - Summarization (extractive and abstractive, for documents and conversations)
> - Entity Linking
>
> Core features with continued support: Language Detection, PII Detection, Text Analytics for Health, Prebuilt NER, and Custom NER.
>
> For migration options, see [Migrate from Language Studio to Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/language-service/migration-studio-to-foundry).

<!-- ::: zone pivot="programming-language-cpp"
[!INCLUDE [C++ include](sdk/cpp.md)]
::: zone-end -->

**Applies to: programming-language-csharp**


### C# supported Foundry Tools

| Foundry Tool | Description | Quickstarts and reference documentation |
| --- | --- | --- |
| Speech icon [Speech](https://learn.microsoft.com/azure/ai-services/speech-service/overview) | Add speech to text, text to speech, translation, and speaker recognition capabilities to applications. | &bullet;&NonBreakingSpace;[Speech to text quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-speech-to-text?tabs=windows\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Text to speech quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-text-to-speech?tabs=windows\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Speech translation quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-speech-translation?tabs=windows\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Speech SDK for .NET](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech?view=azure-dotnet\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Speech NuGet package (Speech CLI)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech.CLI) |
| Language icon [Language](https://learn.microsoft.com/azure/ai-services/language-service/overview) | Build applications with natural language understanding capabilities. Supported features: Language Detection, PII Detection, Text Analytics for Health, Prebuilt NER, and Custom NER. **Retiring March 31, 2029**: Sentiment Analysis and Opinion Mining, Key Phrase Extraction, Summarization, Entity Linking, CQA, and CLU. | &bullet;&NonBreakingSpace;[Custom question answering (CQA) quickstart](https://learn.microsoft.com/azure/ai-services/language-service/question-answering/quickstart/sdk?tabs=windows\&pivots=programming-language-csharp) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Entity linking quickstart](https://learn.microsoft.com/azure/ai-services/language-service/entity-linking/quickstart?tabs=windows\&pivots=programming-language-csharp) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Language detection quickstart](https://learn.microsoft.com/azure/ai-services/language-service/language-detection/quickstart?tabs=windows\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Key Phrase extraction quickstart](https://learn.microsoft.com/azure/ai-services/language-service/key-phrase-extraction/quickstart?tabs=windows\&pivots=programming-language-csharp) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Detecting named entities (NER) quickstart](https://learn.microsoft.com/azure/ai-services/language-service/named-entity-recognition/quickstart?\&tabs=windows%2Cga-api\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Detect Personally Identifiable Information (PII) quickstart](https://learn.microsoft.com/azure/ai-services/language-service/personally-identifiable-information/quickstart?\&tabs=windows\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Sentiment analysis and opinion mining quickstart](https://learn.microsoft.com/azure/ai-services/language-service/sentiment-opinion-mining/quickstart?tabs=windows\&pivots=programming-language-csharp) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Using text, document and conversation summarization quickstart](https://learn.microsoft.com/azure/ai-services/language-service/summarization/quickstart?tabs=text-summarization%2Cwindows\&pivots=programming-language-csharp) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Using Text Analytics for health quickstart](https://learn.microsoft.com/azure/ai-services/language-service/text-analytics-for-health/quickstart?tabs=windows\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Language SDK for .NET (text analysis)](https://learn.microsoft.com/dotnet/api/overview/azure/ai.textanalytics-readme?view=azure-dotnet\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Language NuGet package (text analysis)](https://www.nuget.org/packages/Azure.AI.TextAnalytics)<br><br>&bullet;&NonBreakingSpace;[Language SDK for .NET (Question Answering)](https://learn.microsoft.com/dotnet/api/overview/azure/ai.language.questionanswering-readme?view=azure-dotnet\&preserve-view=true)<br><br>&bullet;&NonBreakingSpace;[Language NuGet package (question answering)](https://www.nuget.org/packages/Azure.AI.Language.QuestionAnswering)<br><br>&bullet;&NonBreakingSpace;[Migrate from Language Studio to Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/language-service/migration-studio-to-foundry) for guidance on migrating workloads with retiring features |
| Translator icon [Translator](https://learn.microsoft.com/azure/ai-services/translator/overview) | Use AI-powered translation technology to translate more than 100 in-use, at-risk, and endangered languages and dialects. | &bullet;&NonBreakingSpace;[Translator SDK for .NET (text)](https://learn.microsoft.com/dotnet/api/overview/azure/ai.translation.text-readme?view=azure-dotnet-preview\&preserve-view=true)<br><br>&bullet;&NonBreakingSpace;[Translator NuGet package (text)](https://www.nuget.org/packages/Azure.AI.Translation.Text/1.0.0-beta.1)<br><br>&bullet;&NonBreakingSpace;[Translator SDK for .NET (batch)](https://learn.microsoft.com/dotnet/api/overview/azure/AI.Translation.Document-readme?view=azure-dotnet\&preserve-view=true)<br><br>&bullet;&NonBreakingSpace;[Translator NuGet package (batch)](https://www.nuget.org/packages/Azure.AI.Translation.Document) |
| Azure AI Search icon [Azure AI Search](https://learn.microsoft.com/azure/search/search-what-is-azure-search) | Bring AI-powered cloud search to your mobile and web apps. | &bullet;&NonBreakingSpace;[Use agentic retrieval quickstart](https://learn.microsoft.com/azure/search/search-get-started-agentic-retrieval?tabs=search-perms%2Csearch-endpoint\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Vector search quickstart](https://learn.microsoft.com/azure/search/search-get-started-vector?tabs=keyless\&pivots=csharp) <br><br>&bullet;&NonBreakingSpace;[Classic generative search (RAG) using grounding data quickstart](https://learn.microsoft.com/azure/search/search-get-started-rag?pivots=csharp) <br><br>&bullet;&NonBreakingSpace;[Full-text search quickstart](https://learn.microsoft.com/azure/search/search-get-started-text?tabs=keyless%2Cwindows\&pivots=csharp) <br><br>&bullet;&NonBreakingSpace;[Semantic ranking quickstart](https://learn.microsoft.com/azure/search/search-get-started-semantic?pivots=csharp) <br><br>&bullet;&NonBreakingSpace;[Chat with Azure OpenAI models using your own data quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/use-your-data-quickstart?viewFallbackFrom=foundry\&context=%2Fazure%2Fsearch%2Fcontext%2Fcontext\&tabs=keyless%2Ctypescript-keyless%2Cpython-new\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Azure AI Search SDK for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/search.documents-readme?view=azure-dotnet\&preserve-view=true)<br><br>&bullet;&NonBreakingSpace;[Azure AI Search NuGet package](https://www.nuget.org/packages/Azure.Search.Documents/11.6.0-beta.2) |
| Content Safety icon [Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview) | Detect harmful content in applications and services. | &bullet;&NonBreakingSpace;[Analyze text content quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text?tabs=visual-studio%2Cwindows\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Use a text blocklist quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-blocklist?tabs=visual-studio%2Cwindows\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Analyze image content quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-image?tabs=visual-studio%2Cwindows\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Content Safety SDK for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/ai.contentsafety-readme?view=azure-dotnet\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Content Safety NuGet package](https://www.nuget.org/packages/Azure.AI.ContentSafety/1.0.0) |
| Document Intelligence icon [Document Intelligence](https://learn.microsoft.com/azure/ai-services/document-intelligence/overview) | Turn documents into intelligent data-driven solutions. | &bullet;&NonBreakingSpace;[Document Intelligence quickstart](https://learn.microsoft.com/azure/ai-services/document-intelligence/quickstarts/get-started-sdks-rest-api?view=doc-intel-4.0.0\&preserve-view=true\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Document Intelligence SDK for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/ai.documentintelligence-readme?view=azure-dotnet-preview\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Document Intelligence NuGet package](https://www.nuget.org/packages/Azure.AI.DocumentIntelligence/1.0.0-beta.1) |
| Vision icon  [Vision](https://learn.microsoft.com/azure/ai-services/computer-vision/overview) | Analyze content in digital images and rich media assets. | &bullet;&NonBreakingSpace;[Azure Vision in Foundry Tools v3.2 GA Read quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/client-library?tabs=windows%2Cvisual-studio\&programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Image Analysis quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40?tabs=windows%2Cvisual-studio\&programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Use the Face service quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/identity-client-library?tabs=windows%2Cvisual-studio\&pivots=programming-language-csharp) <br><br>&bullet;&NonBreakingSpace;[Vision SDK for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/AI.Vision.ImageAnalysis-readme?view=azure-dotnet-preview\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Vision NuGet package](https://www.nuget.org/packages/Azure.AI.Vision.ImageAnalysis) |



<!-- ::: zone pivot="programming-language-go"
[!INCLUDE [Go include](sdk/go.md)]
::: zone-end -->

**Applies to: programming-language-java**


### Java supported Foundry Tools

| Foundry Tool | Description | Quickstarts and reference documentation |
| --- | --- | --- |
| Speech icon [Speech](https://learn.microsoft.com/azure/ai-services/speech-service/overview) | Add speech to text, text to speech, translation, and speaker recognition capabilities to applications. | &bullet;&NonBreakingSpace;[Speech to text quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-speech-to-text?tabs=windows\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Text to speech quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-text-to-speech?tabs=windows\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Speech translation quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-speech-translation?tabs=windows\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Speech SDK for Java](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech?view=azure-java-stable\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Speech Maven package](https://central.sonatype.com/artifact/com.microsoft.cognitiveservices.speech/client-sdk/1.34.0?smo=true) |
| Language icon [Language](https://learn.microsoft.com/azure/ai-services/language-service/overview) | Build applications with natural language understanding capabilities. Supported features: Language Detection, PII Detection, Text Analytics for Health, Prebuilt NER, and Custom NER. **Retiring March 31, 2029**: Sentiment Analysis and Opinion Mining, Key Phrase Extraction, Summarization, Entity Linking, CQA, and CLU. | &bullet;&NonBreakingSpace;[Entity linking quickstart](https://learn.microsoft.com/azure/ai-services/language-service/entity-linking/quickstart?tabs=windows\&pivots=programming-language-java) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Language detection quickstart](https://learn.microsoft.com/azure/ai-services/language-service/language-detection/quickstart?tabs=windows\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Key Phrase extraction quickstart](https://learn.microsoft.com/azure/ai-services/language-service/key-phrase-extraction/quickstart?tabs=windows\&pivots=programming-language-java) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Detecting named entities (NER) quickstart](https://learn.microsoft.com/azure/ai-services/language-service/named-entity-recognition/quickstart?\&tabs=windows%2Cga-api\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Detect Personally Identifiable Information (PII) quickstart](https://learn.microsoft.com/azure/ai-services/language-service/personally-identifiable-information/quickstart?\&tabs=windows\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Sentiment analysis and opinion mining quickstart](https://learn.microsoft.com/azure/ai-services/language-service/sentiment-opinion-mining/quickstart?tabs=windows\&pivots=programming-language-java) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Using text, document and conversation summarization quickstart](https://learn.microsoft.com/azure/ai-services/language-service/summarization/quickstart?tabs=text-summarization%2Cwindows\&pivots=programming-language-java) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Using Text Analytics for health quickstart](https://learn.microsoft.com/azure/ai-services/language-service/text-analytics-for-health/quickstart?tabs=windows\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Language SDK for Java (text analysis)](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?view=azure-java-stable\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Language Maven package](https://central.sonatype.com/artifact/com.microsoft.azure.cognitiveservices/azure-cognitiveservices-language)<br><br>&bullet;&NonBreakingSpace;[Migrate from Language Studio to Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/language-service/migration-studio-to-foundry) for guidance on migrating workloads with retiring features |
| Translator icon [Translator](https://learn.microsoft.com/azure/ai-services/translator/overview) | Use AI-powered translation technology to translate more than 100 in-use, at-risk, and endangered languages and dialects. | &bullet;&NonBreakingSpace;[Translator SDK for Java (text)](https://learn.microsoft.com/java/api/overview/azure/ai-translation-text-readme?view=azure-java-preview\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Translator Maven package (text)](https://central.sonatype.com/artifact/com.azure/azure-ai-translation-text) |
| Azure AI Search icon [Azure AI Search](https://learn.microsoft.com/azure/search/search-what-is-azure-search) | Bring AI-powered cloud search to your mobile and web apps. | &bullet;&NonBreakingSpace;[Use agentic retrieval quickstart](https://learn.microsoft.com/azure/search/search-get-started-agentic-retrieval?tabs=search-perms%2Csearch-endpoint\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Vector search quickstart](https://learn.microsoft.com/azure/search/search-get-started-vector?tabs=keyless\&pivots=java) <br><br>&bullet;&NonBreakingSpace;[Classic generative search (RAG) using grounding data quickstart](https://learn.microsoft.com/azure/search/search-get-started-rag?pivots=java) <br><br>&bullet;&NonBreakingSpace;[Full-text search quickstart](https://learn.microsoft.com/azure/search/search-get-started-text?tabs=keyless%2Cwindows\&pivots=java) <br><br>&bullet;&NonBreakingSpace;[Semantic ranking quickstart](https://learn.microsoft.com/azure/search/search-get-started-semantic?pivots=java) <br><br>&bullet;&NonBreakingSpace;[Chat with Azure OpenAI models using your own data quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/use-your-data-quickstart?viewFallbackFrom=foundry\&context=%2Fazure%2Fsearch%2Fcontext%2Fcontext\&tabs=keyless%2Ctypescript-keyless%2Cpython-new\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Azure AI Search SDK for Java](https://learn.microsoft.com/java/api/overview/azure/search-documents-readme?view=azure-java-stable\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Azure AI Search Maven package](https://central.sonatype.com/artifact/com.azure/azure-search-documents/11.7.0-beta.1?smo=true) |
| Content Safety icon [Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview) | Detect harmful content in applications and services. | &bullet;&NonBreakingSpace;[Analyze text content quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text?tabs=visual-studio%2Cwindows\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Use a text blocklist quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-blocklist?tabs=visual-studio%2Cwindows\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Analyze image content quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-image?tabs=visual-studio%2Cwindows\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Content Safety SDK for Java](https://learn.microsoft.com/java/api/overview/azure/ai-contentsafety-readme?view=azure-java-stable\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Content Safety Maven package](https://central.sonatype.com/artifact/com.azure/azure-ai-contentsafety) |
| Document Intelligence icon [Document Intelligence](https://learn.microsoft.com/azure/ai-services/document-intelligence/overview) | Turn documents into intelligent data-driven solutions. | &bullet;&NonBreakingSpace;[Document Intelligence quickstart](https://learn.microsoft.com/azure/ai-services/document-intelligence/quickstarts/get-started-sdks-rest-api?view=doc-intel-4.0.0\&preserve-view=true\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Document Intelligence SDK for Java](https://learn.microsoft.com/java/api/overview/azure/ai-documentintelligence-readme?view=azure-java-preview\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Document Intelligence Maven package](https://mvnrepository.com/artifact/com.azure/azure-ai-documentintelligence/1.0.0-beta.1) |
| Vision icon [Vision](https://learn.microsoft.com/azure/ai-services/computer-vision/overview) | Analyze content in digital images and rich media assets. | &bullet;&NonBreakingSpace;[Image Analysis quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40?tabs=windows%2Cvisual-studio\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Use the Face service quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/identity-client-library?tabs=windows%2Cvisual-studio\&pivots=programming-language-java) <br><br>&bullet;&NonBreakingSpace;[Vision SDK for Java](https://learn.microsoft.com/java/api/overview/azure/ai-vision-imageanalysis-readme?view=azure-java-preview\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Vision Maven package](https://central.sonatype.com/artifact/com.azure/azure-ai-vision-imageanalysis) |



**Applies to: programming-language-javascript**


### JavaScript supported Foundry Tools

| Foundry Tool | Description | Quickstarts and reference documentation |
| --- | --- | --- |
| Speech icon [Speech](https://learn.microsoft.com/azure/ai-services/speech-service/overview) | Add speech to text, text to speech, translation, and speaker recognition capabilities to applications. | &bullet;&NonBreakingSpace;[Speech to text quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-speech-to-text?tabs=windows\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Text to speech quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-text-to-speech?tabs=windows\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Speech translation quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-speech-translation?tabs=windows\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Speech SDK for JavaScript](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/?view=azure-node-latest\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Speech npm package](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) |
| Language icon [Language](https://learn.microsoft.com/azure/ai-services/language-service/overview) | Build applications with natural language understanding capabilities. Supported features: Language Detection, PII Detection, Text Analytics for Health, Prebuilt NER, and Custom NER. **Retiring March 31, 2029**: Sentiment Analysis and Opinion Mining, Key Phrase Extraction, Summarization, Entity Linking, CQA, and CLU. | &bullet;&NonBreakingSpace;[Entity linking quickstart](https://learn.microsoft.com/azure/ai-services/language-service/entity-linking/quickstart?tabs=windows\&pivots=programming-language-javascript) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Language detection quickstart](https://learn.microsoft.com/azure/ai-services/language-service/language-detection/quickstart?tabs=windows\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Key Phrase extraction quickstart](https://learn.microsoft.com/azure/ai-services/language-service/key-phrase-extraction/quickstart?tabs=windows\&pivots=programming-language-javascript) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Detecting named entities (NER) quickstart](https://learn.microsoft.com/azure/ai-services/language-service/named-entity-recognition/quickstart?\&tabs=windows%2Cga-api\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Detect Personally Identifiable Information (PII) quickstart](https://learn.microsoft.com/azure/ai-services/language-service/personally-identifiable-information/quickstart?\&tabs=windows\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Sentiment analysis and opinion mining quickstart](https://learn.microsoft.com/azure/ai-services/language-service/sentiment-opinion-mining/quickstart?tabs=windows\&pivots=programming-language-javascript) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Using text, document and conversation summarization quickstart](https://learn.microsoft.com/azure/ai-services/language-service/summarization/quickstart?tabs=text-summarization%2Cwindows\&pivots=programming-language-javascript) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Using Text Analytics for health quickstart](https://learn.microsoft.com/azure/ai-services/language-service/text-analytics-for-health/quickstart?tabs=windows\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Language SDK for JavaScript (text analysis)](https://learn.microsoft.com/javascript/api/overview/azure/ai-language-text-readme?view=azure-node-latest\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Language npm package](https://www.npmjs.com/package/@azure/ai-language-text)<br><br>&bullet;&NonBreakingSpace;[Migrate from Language Studio to Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/language-service/migration-studio-to-foundry) for guidance on migrating workloads with retiring features |
| Translator icon [Translator](https://learn.microsoft.com/azure/ai-services/translator/overview) | Use AI-powered translation technology to translate more than 100 in-use, at-risk, and endangered languages and dialects. | &bullet;&NonBreakingSpace;[Translator SDK for JavaScript (text)](https://learn.microsoft.com/javascript/api/overview/azure/text-translation?view=azure-node-preview\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Translator npm package (text)](https://www.npmjs.com/package/@azure-rest/ai-translation-text/v/1.0.0-beta.1) |
| Azure AI Search icon [Azure AI Search](https://learn.microsoft.com/azure/search/search-what-is-azure-search) | Bring AI-powered cloud search to your mobile and web apps. | &bullet;&NonBreakingSpace;[Use agentic retrieval quickstart](https://learn.microsoft.com/azure/search/search-get-started-agentic-retrieval?tabs=search-perms%2Csearch-endpoint\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Vector search quickstart](https://learn.microsoft.com/azure/search/search-get-started-vector?tabs=keyless\&pivots=javascript) <br><br>&bullet;&NonBreakingSpace;[Classic generative search (RAG) using grounding data quickstart](https://learn.microsoft.com/azure/search/search-get-started-rag?pivots=javascript) <br><br>&bullet;&NonBreakingSpace;[Full-text search quickstart](https://learn.microsoft.com/azure/search/search-get-started-text?tabs=keyless%2Cwindows\&pivots=javascript) <br><br>&bullet;&NonBreakingSpace;[Semantic ranking quickstart](https://learn.microsoft.com/azure/search/search-get-started-semantic?pivots=javascript) <br><br>&bullet;&NonBreakingSpace;[Chat with Azure OpenAI models using your own data quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/use-your-data-quickstart?viewFallbackFrom=foundry\&context=%2Fazure%2Fsearch%2Fcontext%2Fcontext\&tabs=keyless%2Ctypescript-keyless%2Cpython-new\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Azure AI Search SDK for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/search-documents-readme?view=azure-node-latest\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Azure AI Search npm package](https://www.npmjs.com/package/@azure/search-documents/v/12.0.0?activeTab=readme) |
| Content Safety icon [Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview) | Detect harmful content in applications and services. | &bullet;&NonBreakingSpace;[Analyze text content quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text?tabs=visual-studio%2Cwindows\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Use a text blocklist quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-blocklist?tabs=visual-studio%2Cwindows\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Analyze image content quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-image?tabs=visual-studio%2Cwindows\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Content Safety npm package](https://www.npmjs.com/package/@azure-rest/ai-content-safety/v/1.0.0-beta.1) |
| Document Intelligence icon [Document Intelligence](https://learn.microsoft.com/azure/ai-services/document-intelligence/overview) | Turn documents into intelligent data-driven solutions. | &bullet;&NonBreakingSpace;[Document Intelligence quickstart](https://learn.microsoft.com/azure/ai-services/document-intelligence/quickstarts/get-started-sdks-rest-api?view=doc-intel-4.0.0\&preserve-view=true\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Document Intelligence SDK for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/ai-document-intelligence-rest-readme?view=azure-node-preview\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Document Intelligence npm package](https://www.npmjs.com/package/@azure-rest/ai-document-intelligence/v/1.0.0-beta.1) |
| Vision icon [Vision](https://learn.microsoft.com/azure/ai-services/computer-vision/overview) | Analyze content in digital images and rich media assets. | &bullet;&NonBreakingSpace;[Azure Vision in Foundry Tools v3.2 GA Read quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/client-library?tabs=windows%2Cvisual-studio\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Image Analysis quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40?tabs=windows%2Cvisual-studio\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Use the Face service quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/identity-client-library?tabs=windows%2Cvisual-studio\&pivots=programming-language-javascript) <br><br>&bullet;&NonBreakingSpace;[Vision SDK for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/ai-vision-image-analysis-rest-readme?view=azure-node-preview\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Vision npm package](https://www.npmjs.com/package/@azure-rest/ai-vision-image-analysis/v/1.0.0-beta.2) |



<!-- ::: zone pivot="programming-language-objectivec"
[!INCLUDE [ObjectiveC include](sdk/objective-c.md)]
::: zone-end -->

**Applies to: programming-language-python**


### Python supported Foundry Tools

| Foundry Tool | Description | Quickstarts and reference documentation |
| --- | --- | --- |
| Speech icon [Speech](https://learn.microsoft.com/azure/ai-services/speech-service/overview) | Add speech to text, text to speech, translation, and speaker recognition capabilities to applications. | &bullet;&NonBreakingSpace;[Speech to text quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-speech-to-text?tabs=windows\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Text to speech quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-text-to-speech?tabs=windows\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Speech translation quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-speech-translation?tabs=windows\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Speech SDK for Python](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/?view=azure-python\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Speech PyPi package](https://pypi.org/project/azure-cognitiveservices-speech/) |
| Language icon [Language](https://learn.microsoft.com/azure/ai-services/language-service/overview) | Build applications with natural language understanding capabilities. Supported features: Language Detection, PII Detection, Text Analytics for Health, Prebuilt NER, and Custom NER. **Retiring March 31, 2029**: Sentiment Analysis and Opinion Mining, Key Phrase Extraction, Summarization, Entity Linking, CQA, and CLU. | &bullet;&NonBreakingSpace;[Custom question answering (CQA) quickstart](https://learn.microsoft.com/azure/ai-services/language-service/question-answering/quickstart/sdk?tabs=windows\&pivots=programming-language-python) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Entity linking quickstart](https://learn.microsoft.com/azure/ai-services/language-service/entity-linking/quickstart?tabs=windows\&pivots=programming-language-python) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Language detection quickstart](https://learn.microsoft.com/azure/ai-services/language-service/language-detection/quickstart?tabs=windows\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Key Phrase extraction quickstart](https://learn.microsoft.com/azure/ai-services/language-service/key-phrase-extraction/quickstart?tabs=windows\&pivots=programming-language-python) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Detect named entities (NER) quickstart](https://learn.microsoft.com/azure/ai-services/language-service/named-entity-recognition/quickstart?\&tabs=windows%2Cga-api\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Detect Personally Identifiable Information (PII) quickstart](https://learn.microsoft.com/azure/ai-services/language-service/personally-identifiable-information/quickstart?\&tabs=windows\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Sentiment analysis and opinion mining quickstart](https://learn.microsoft.com/azure/ai-services/language-service/sentiment-opinion-mining/quickstart?tabs=windows\&pivots=programming-language-python) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Using text, document and conversation summarization quickstart](https://learn.microsoft.com/azure/ai-services/language-service/summarization/quickstart?tabs=text-summarization%2Cwindows\&pivots=programming-language-python) *(retiring March 31, 2029)* <br><br>&bullet;&NonBreakingSpace;[Using Text Analytics for health quickstart](https://learn.microsoft.com/azure/ai-services/language-service/text-analytics-for-health/quickstart?tabs=windows\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Language SDK for Python (text analysis)](https://learn.microsoft.com/python/api/overview/azure/ai-textanalytics-readme?view=azure-python\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Language PyPi package (text analysis)](https://pypi.org/project/azure-cognitiveservices-language-textanalytics/)<br><br>&bullet;&NonBreakingSpace;[Language SDK for Python (question answering)](https://learn.microsoft.com/python/api/overview/azure/ai-language-questionanswering-readme?view=azure-python\&preserve-view=true)<br><br>&bullet;&NonBreakingSpace;[Language PyPi package (question answering)](https://pypi.org/project/azure-ai-language-questionanswering/)<br><br>&bullet;&NonBreakingSpace;[Language SDK for Python (language conversations)](https://learn.microsoft.com/python/api/overview/azure/ai-language-conversations-readme?view=azure-python\&preserve-view=true) *(retiring March 31, 2029)*<br><br>&bullet;&NonBreakingSpace;[Language PyPi package (language conversations)](https://pypi.org/project/azure-ai-language-conversations/) *(retiring March 31, 2029)*<br><br>&bullet;&NonBreakingSpace;[Migrate from Language Studio to Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/language-service/migration-studio-to-foundry) for guidance on migrating workloads with retiring features |
| Translator icon [Translator](https://learn.microsoft.com/azure/ai-services/translator/overview) | Use AI-powered translation technology to translate more than 100 in-use, at-risk, and endangered languages and dialects. | &bullet;&NonBreakingSpace;[Translator SDK for Python (text)](https://learn.microsoft.com/python/api/azure-ai-translation-text/azure.ai.translation.text?view=azure-python-preview\&preserve-view=true)<br><br>&bullet;&NonBreakingSpace;[Translator PyPi package (text)](https://pypi.org/project/azure-ai-translation-text/1.0.0b1/)<br><br>&bullet;&NonBreakingSpace;[Translator SDK for Python (batch)](https://learn.microsoft.com/python/api/overview/azure/ai-translation-document-readme?view=azure-python\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Translator PyPi package (batch)](https://pypi.org/project/azure-ai-translation-document/1.0.0/) |
| Azure AI Search icon [Azure AI Search](https://learn.microsoft.com/azure/search/search-what-is-azure-search) | Bring AI-powered cloud search to your mobile and web apps. | &bullet;&NonBreakingSpace;[Connect to a search service quickstart](https://learn.microsoft.com/azure/search/search-get-started-rbac?pivots=python) <br><br>&bullet;&NonBreakingSpace;[Use agentic retrieval quickstart](https://learn.microsoft.com/azure/search/search-get-started-agentic-retrieval?tabs=search-perms%2Csearch-endpoint\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Vector search quickstart](https://learn.microsoft.com/azure/search/search-get-started-vector?tabs=keyless\&pivots=python) <br><br>&bullet;&NonBreakingSpace;[Classic generative search (RAG) using grounding data quickstart](https://learn.microsoft.com/azure/search/search-get-started-rag?pivots=python) <br><br>&bullet;&NonBreakingSpace;[Full-text search quickstart](https://learn.microsoft.com/azure/search/search-get-started-text?tabs=keyless%2Cwindows\&pivots=python) <br><br>&bullet;&NonBreakingSpace;[Semantic ranking quickstart](https://learn.microsoft.com/azure/search/search-get-started-semantic?pivots=python) <br><br>&bullet;&NonBreakingSpace;[Chat with Azure OpenAI models using your own data quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/use-your-data-quickstart?viewFallbackFrom=foundry\&context=%2Fazure%2Fsearch%2Fcontext%2Fcontext\&tabs=keyless%2Ctypescript-keyless%2Cpython-new\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Azure AI Search SDK for Python](https://learn.microsoft.com/python/api/overview/azure/search-documents-readme?view=azure-python\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Azure AI Search PyPi package](https://pypi.org/project/azure-search-documents/11.6.0b1/) |
| Content Safety icon [Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview) | Detect harmful content in applications and services. | &bullet;&NonBreakingSpace;[Analyze text content quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text?tabs=visual-studio%2Cwindows\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Use a text blocklist quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-blocklist?tabs=visual-studio%2Cwindows\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Analyze image content quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-image?tabs=visual-studio%2Cwindows\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Content Safety SDK for Python](https://learn.microsoft.com/python/api/overview/azure/ai-contentsafety-readme?view=azure-python\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Content Safety PyPi package](https://pypi.org/project/azure-ai-contentsafety/1.0.0/) |
| Document Intelligence icon [Document Intelligence](https://learn.microsoft.com/azure/ai-services/document-intelligence/overview) | Turn documents into intelligent data-driven solutions. | &bullet;&NonBreakingSpace;[Document Intelligence quickstart](https://learn.microsoft.com/azure/ai-services/document-intelligence/quickstarts/get-started-sdks-rest-api?view=doc-intel-4.0.0\&preserve-view=true\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Document Intelligence SDK for Python](https://learn.microsoft.com/python/api/overview/azure/ai-documentintelligence-readme?view=azure-python-preview\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Document Intelligence PyPi package](https://pypi.org/project/azure-ai-documentintelligence/1.0.0b1/) |
| Vision icon [Vision](https://learn.microsoft.com/azure/ai-services/computer-vision/overview) | Analyze content in digital images and rich media assets. | &bullet;&NonBreakingSpace;[Azure Vision in Foundry Tools v3.2 GA Read quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/client-library?tabs=windows%2Cvisual-studio\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Image Analysis quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40?tabs=windows%2Cvisual-studio\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Use the Face service quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/identity-client-library?tabs=windows%2Cvisual-studio\&pivots=programming-language-python) <br><br>&bullet;&NonBreakingSpace;[Vision SDK for Python](https://learn.microsoft.com/python/api/overview/azure/ai-vision-imageanalysis-readme?view=azure-python-preview\&preserve-view=true) <br><br>&bullet;&NonBreakingSpace;[Vision PyPi package](https://pypi.org/project/azure-ai-vision-imageanalysis/) |



<!-- ::: zone pivot="programming-language-swift"
[!INCLUDE [Swift include](sdk/swift.md)]
::: zone-end -->
