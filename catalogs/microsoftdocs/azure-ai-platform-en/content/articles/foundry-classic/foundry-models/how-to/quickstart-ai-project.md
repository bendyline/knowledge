---
title: "Configure your AI Project for Microsoft Foundry Models (classic)"
description: "Learn how to upgrade your AI project to use models deployed in Microsoft Foundry Models in Microsoft Foundry Service. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.topic: how-to
ms.date: 03/31/2026
ms.custom: ignite-2024, github-universe-2024
author: ssalgadodev
ms.author: ssalgado
recommendations: false
ms.reviewer: fasantia
reviewer: santiagxf
---

# Configure your AI project to use Microsoft Foundry Models (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



If you already have an AI project in Microsoft Foundry, the model catalog deploys models from partner model providers as stand-alone endpoints in your project by default. Each model deployment has its own set of URI and credentials to access it. On the other hand, Azure OpenAI models are deployed to the Foundry resource or to the Azure OpenAI in Foundry Models resource.


> **Important:**
> Azure AI Inference beta SDK retired on August 26, 2026. Switch to the generally available [OpenAI/v1 API](https://aka.ms/openai/v1) with a stable OpenAI SDK. Follow the [migration guide](../../../foundry/how-to/model-inference-to-openai-migration.md) to switch to OpenAI/v1, using the SDK for your preferred programming language.


You can change this behavior and deploy both types of models to Foundry resources. Once configured, *deployments of models as serverless API deployments happen to the connected Foundry resource* instead to the project itself, giving you a single set of endpoint and credentials to access all the models deployed in Foundry. You can manage models from Azure OpenAI and partner model providers in the same way.

Additionally, deploying models to Foundry Models brings the extra benefits of:

> 
> * [Routing capability](../concepts/endpoints.md)
> * [Custom content filters](../concepts/content-filter.md)
> * Global capacity deployment type
> * [Key-less authentication with Microsoft Entra ID](configure-entra-id.md)

In this article, you learn how to configure your project to use Foundry Models deployments.

## Prerequisites

To complete this tutorial, you need:

* An Azure subscription.

* A Foundry resource. For more information, see [Create your first Foundry resource](../../../ai-services/multi-service-resource.md).

* A Foundry project and hub. For more information, see [How to create and manage a Foundry hub](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/create-azure-ai-resource.md).

    > **Tip:**
    > When your AI hub is provisioned, a Foundry resource is created with it and the two resources are connected. To see which resource is connected to your project, go to the [Foundry portal](https://ai.azure.com/?cid=learnDocs) > **Management center** > **Connected resources**, and find the connections of type **Foundry Tools**. 

## Configure the project to use Foundry Models

To configure the project to use the Foundry Models capability in Foundry, follow these steps:

1. In the landing page of your project, select **Management center** at the bottom of the sidebar menu. Identify the Foundry resource connected to your project.

1. If no resource is listed, your AI hub doesn't have a Foundry resource connected to it. Create a new connection.

   1. Select **+New connection**, then choose **Microsoft Foundry** from the tiles.

   1. In the window, look for an existing resource in your subscription and then select **Add connection**.

   1. The new connection is added to your hub.

1. Return to the project's landing page.

1. Under **Included capabilities**, ensure you select **Azure AI Inference**. The **Azure AI model inference endpoint** URI is displayed along with the credentials to get access to it.

    Screenshot of the landing page for the project, highlighting the location of the connected resource and the associated inference endpoint.

    > **Tip:**
    > Each Foundry resource has a single **Azure AI model inference endpoint** that can be used to access any model deployment on it. The same endpoint serves multiple models depending on which ones are configured. To learn how the endpoint works, see [Azure OpenAI inference endpoint](../concepts/endpoints.md).

1. Take note of the endpoint URL and credentials.

### Create the model deployment in Foundry Models

For each model you want to deploy under Foundry Models, follow these steps:

1. Go to the **Model catalog** in [Foundry portal](https://ai.azure.com/explore/models).

1. Scroll to the model you're interested in and select it.

    Animation showing how to search models in the model catalog and select one for viewing its details.

1. You can review the details of the model in the model card.

1. Select **Use this model**.

1. For model providers that require more contract terms, you're asked to accept those terms by selecting **Agree and proceed**.

    Screenshot showing how to agree the terms and conditions of a Mistral-Large model.

1. You can configure the deployment settings at this time. By default, the deployment receives the name of the model you're deploying. The deployment name is used in the `model` parameter for request to route to this particular model deployment. It allows you to configure specific names for your models when you attach specific configurations. For instance, `o1-preview-safe` for a model with a strict content filter.

1. We automatically select a Foundry connection depending on your project because you turned on the feature **Deploy models to Azure AI model inference service**. Select **Customize** to change the connection based on your needs. If you're deploying under the **serverless API** deployment type, the models need to be available in the region of the Foundry resource.

    Screenshot showing how to customize the deployment if needed.

1. Select **Deploy**.

1. Once the deployment finishes, you see the endpoint URL and credentials to get access to the model. Notice that now the provided URL and credentials are the same as displayed in the landing page of the project for the **Foundry Models endpoint**.

1. You can view all the models available under the resource by going to **Models + endpoints** section and locating the group for the connection to your resource:

    Screenshot showing the list of models available under a given connection.

### Upgrade your code with the new endpoint

Once your Foundry resource is configured, you can start consuming it from your code. You need the endpoint URL and key for it, which can be found in the **Overview** section:

You can use any of the supported SDKs to get predictions out from the endpoint. The following SDKs are officially supported:

* OpenAI SDK
* Azure OpenAI SDK
* Azure AI Inference package
* Azure AI Projects package

For more information and examples, see [Supported programming languages for Azure AI Inference SDK](../supported-languages.md). The following example shows how to use the Azure AI Inference package with the newly deployed model:


# [Python](#tab/python)

Install the package `azure-ai-inference` using your package manager, like pip:

```bash
pip install azure-ai-inference
```

Then, you can use the package to consume the model. The following example shows how to create a client to consume chat completions:

```python
import os
from azure.ai.inference import ChatCompletionsClient
from azure.core.credentials import AzureKeyCredential

client = ChatCompletionsClient(
    endpoint="https://<resource>.services.ai.azure.com/models",
    credential=AzureKeyCredential(os.environ["AZURE_INFERENCE_CREDENTIAL"]),
)
```

Explore our [samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/ai/azure-ai-inference/samples) and read the [API reference documentation](https://aka.ms/azsdk/azure-ai-inference/python/reference) to get yourself started.

# [JavaScript](#tab/javascript)

Install the package `@azure-rest/ai-inference` using npm:

```bash
npm install @azure-rest/ai-inference
```

Then, you can use the package to consume the model. The following example shows how to create a client to consume chat completions:

```javascript
import ModelClient from "@azure-rest/ai-inference";
import { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const client = new ModelClient(
    "https://<resource>.services.ai.azure.com/models", 
    new AzureKeyCredential(process.env.AZURE_INFERENCE_CREDENTIAL)
);
```

Explore our [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-inference-rest/samples) and read the [API reference documentation](https://learn.microsoft.com/javascript/api/@azure-rest/ai-inference) to get yourself started.

# [C#](#tab/csharp)

Install the Azure AI inference library with the following command:

```dotnetcli
dotnet add package Azure.AI.Inference --prerelease
```

Import the following namespaces:

```csharp
using Azure;
using Azure.Identity;
using Azure.AI.Inference;
```

Then, you can use the package to consume the model. The following example shows how to create a client to consume chat completions:

```csharp
ChatCompletionsClient client = new ChatCompletionsClient(
    new Uri("https://<resource>.services.ai.azure.com/models"),
    new AzureKeyCredential(Environment.GetEnvironmentVariable("AZURE_INFERENCE_CREDENTIAL"))
);
```

Explore our [samples](https://aka.ms/azsdk/azure-ai-inference/csharp/samples) and read the [API reference documentation](https://aka.ms/azsdk/azure-ai-inference/csharp/reference) to get yourself started.

# [Java](#tab/java)

Add the package to your project:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-ai-inference</artifactId>
    <version>1.0.0-beta.1</version>
</dependency>
```

Then, you can use the package to consume the model. The following example shows how to create a client to consume chat completions:

```java
ChatCompletionsClient client = new ChatCompletionsClientBuilder()
    .credential(new AzureKeyCredential("{key}"))
    .endpoint("https://<resource>.services.ai.azure.com/models")
    .buildClient();
```

Explore our [samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/ai/azure-ai-inference/src/samples) and read the [API reference documentation](https://aka.ms/azsdk/azure-ai-inference/java/reference) to get yourself started.


# [REST](#tab/rest)

Use the reference section to explore the API design and which parameters are available. For example, the reference section for [Chat completions](https://learn.microsoft.com/rest/api/microsoft-foundry/modelinference/) details how to use the route `/chat/completions` to generate predictions based on chat-formatted instructions. Notice that the path `/models` is included to the root of the URL:

__Request__

```HTTP/1.1
POST https://<resource>.services.ai.azure.com/models/chat/completions?api-version=2024-05-01-preview
api-key: <api-key>
Content-Type: application/json
```
---


Generate your first chat completion:


# [Python](#tab/python)

```python
from azure.ai.inference.models import SystemMessage, UserMessage

response = client.complete(
    messages=[
        SystemMessage(content="You are a helpful assistant."),
        UserMessage(content="Explain Riemann's conjecture in 1 paragraph"),
    ],
    model="mistral-large"
)

print(response.choices[0].message.content)
```

# [JavaScript](#tab/javascript)

```javascript
var messages = [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: "Explain Riemann's conjecture in 1 paragraph" },
];

var response = await client.path("/chat/completions").post({
    body: {
        messages: messages,
        model: "mistral-large"
    }
});

console.log(response.body.choices[0].message.content)
```

# [C#](#tab/csharp)

```csharp
requestOptions = new ChatCompletionsOptions()
{
    Messages = {
        new ChatRequestSystemMessage("You are a helpful assistant."),
        new ChatRequestUserMessage("Explain Riemann's conjecture in 1 paragraph")
    },
    Model = "mistral-large"
};

response = client.Complete(requestOptions);
Console.WriteLine($"Response: {response.Value.Content}");
```

# [Java](#tab/java)

```java
List<ChatRequestMessage> chatMessages = new ArrayList<>();
chatMessages.add(new ChatRequestSystemMessage("You are a helpful assistant"));
chatMessages.add(new ChatRequestUserMessage("Explain Riemann's conjecture in 1 paragraph"));

ChatCompletions chatCompletions = client.complete(new ChatCompletionsOptions(chatMessages));

for (ChatChoice choice : chatCompletions.getChoices()) {
    ChatResponseMessage message = choice.getMessage();
    System.out.println("Response:" + message.getContent());
}
```

# [REST](#tab/rest)

__Request__

```HTTP/1.1
POST https://<resource>.services.ai.azure.com/models/chat/completions?api-version=2024-05-01-preview
api-key: <api-key>
Content-Type: application/json
```

```JSON
{
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant"
        },
        {
            "role": "user",
            "content": "Explain Riemann's conjecture in 1 paragraph"
        }
    ],
    "model": "mistral-large"
}
```

---


Use the parameter `model="<deployment-name>` to route your request to this deployment. *Deployments work as an alias of a given model under certain configurations*. To learn how Foundry Models routes deployments, see [Routing](../concepts/endpoints.md).

## Move from serverless API deployments to Foundry Models

Although you configured the project to use Foundry Models, existing model deployments continue to exist within the project as serverless API deployments. Those deployments aren't moved for you. Hence, you can progressively upgrade any existing code that references previous model deployments. To start moving the model deployments, we recommend the following workflow:

1. Recreate the model deployment in Foundry Models. This model deployment is accessible under the **Foundry Models endpoint**.

1. Upgrade your code to use the new endpoint.

1. Clean up the project by removing the serverless API deployment.

### Upgrade your code with the new endpoint

Once the models are deployed under Foundry, you can upgrade your code to use the Foundry Models endpoint. The main difference between how serverless API deployments and Foundry Models work resides in the endpoint URL and model parameter. While serverless API deployments have a set of URI and key per each model deployment, Foundry Models has only one for all of them.

The following table summarizes the changes you have to introduce:

| Property | serverless API deployments | Foundry Models |
| --- | --- | --- |
| Endpoint | `https://<endpoint-name>.<region>.inference.ai.azure.com` | `https://<ai-resource>.services.ai.azure.com/models` |
| Credentials | One per model/endpoint. | One per Foundry resource. You can use Microsoft Entra ID too. |
| Model parameter | None. | Required. Use the name of the model deployment. |

### Clean up existing serverless API deployments from your project

After you refactored your code, you might want to delete the existing serverless API deployments inside of the project (if any).

For each model deployed as serverless API deployments, follow these steps:

1. Go to the [Foundry portal](https://ai.azure.com/?cid=learnDocs).

1. Select **Models + endpoints**, then choose the **Service endpoints** tab.

1. Identify the endpoints of type **serverless API deployment** and select the one you want to delete.

1. Select the option **Delete**.

    > **Warning:**
    > This operation can't be reverted. Ensure that the endpoint isn't currently used by any other user or piece of code.

1. Confirm the operation by selecting **Delete**.

1. If you created a **serverless API deployment connection** to this endpoint from other projects, such connections aren't removed and continue to point to the inexistent endpoint. Delete any of those connections for avoiding errors.

## Limitations

Consider the following limitations when configuring your project to use Foundry Models:

* Only models that support serverless API deployments are available for deployment to Foundry Models. Models requiring compute quota from your subscription (managed compute), including custom models, can only be deployed within a given project as Managed Online Endpoints and continue to be accessible using their own set of endpoint URI and credentials.
* Models available as both serverless API deployments and managed compute offerings are, by default, deployed to Foundry Models in Foundry resources. Foundry portal doesn't offer a way to deploy them to Managed Online Endpoints. You have to turn off the feature mentioned at [Configure the project to use Foundry Models](#configure-the-project-to-use-foundry-models) or use the Azure CLI/Azure ML SDK/ARM templates to perform the deployment.

## Next step

> 
> [Add models to your endpoint](create-model-deployments.md)
