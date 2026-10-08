---
manager: mcleans
author: msakande
ms.author: mopeakande
ms.reviewer: yinchang
reviewer: ychang-msft
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.date: 08/29/2025
ms.topic: include
zone_pivot_groups: azure-ai-models-deployment
---


The content filtering system integrated into Microsoft Foundry runs alongside Foundry Models. It uses an ensemble of multi-class classification models to detect four categories of harmful content (violence, hate, sexual, and self-harm) at four severity levels (safe, low, medium, and high). It offers optional binary classifiers for detecting jailbreak risk, existing text, and code in public repositories. For more information about content categories, severity levels, and the behavior of the content filtering system, see [the following article](../../concepts/content-filter.md).

The [default content filtering](../../concepts/default-safety-policies.md) configuration filters content at the medium severity threshold for all four harmful categories for both prompts and completions. Content detected at medium or high severity level is filtered out, while content detected at low or safe severity level isn't filtered.

You can configure content filters at the resource level and associate them with one or more deployments.

## Prerequisites

To complete this article, you need:

* An Azure subscription.

* A Foundry resource (formerly known as Azure AI Services resource). For more information, see [Create a Foundry resource](../../../quickstarts/get-started-code.md).

* Install the [Azure CLI](https://learn.microsoft.com/cli/azure/).

* Identify the following information:

  * Your Azure subscription ID.

  * Your Foundry Tools resource name.

  * The resource group where you deployed the Foundry Tools resource.

  * The model name, provider, version, and SKU you want to deploy. You can use the Microsoft Foundry portal or the Azure CLI to find this information. In this example, deploy the following model:

    * **Model name:**: `Phi-4-mini-instruct`
    * **Provider**: `Microsoft`
    * **Version**: `1`
    * **Deployment type**: Global standard

## Add a model deployment with custom content filtering

1. Use the template `ai-services-content-filter-template.bicep` to describe the content filter policy:

    __ai-services-content-filter-template.bicep__

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/modules/ai-services-content-filter-template.bicep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/foundry-models/includes/configure-content-filters/bicep.md)

1. Use the template `ai-services-deployment-template.bicep` to describe model deployments:

    __ai-services-deployment-template.bicep__

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/modules/ai-services-deployment-template.bicep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/foundry-models/includes/configure-content-filters/bicep.md)

1. Create the main deployment definition:

    __main.bicep__

    ```bicep
    param accountName string
    param modelName string
    param modelVersion string
    param modelPublisherFormat string
    param contentFilterPolicyName string

    module raiPolicy 'ai-services-content-filter-template.bicep' = {
      name: 'raiPolicy'
      scope: resourceGroup(resourceGroupName)
      params: {
        accountName: accountName
        policyName: contentFilterPolicyName
      }
    }

    module modelDeployment 'ai-services-deployment-template.bicep' = {
        name: 'modelDeployment'
        scope: resourceGroup(resourceGroupName)
        params: {
            accountName: accountName
            modelName: modelName
            modelVersion: modelVersion
            modelPublisherFormat: modelPublisherFormat
            contentFilterPolicyName: contentFilterPolicyName
        }
        dependsOn: [
            raiPolicy
        ]
    }
    ```

1. Run the deployment:

    ```azurecli
    RESOURCE_GROUP="<resource-group-name>"
    ACCOUNT_NAME="<azure-ai-model-inference-name>" 
    MODEL_NAME="Phi-4-mini-instruct"
    PROVIDER="Microsoft"
    VERSION=1
    RAI_POLICY_NAME="custom-policy"
    
    az deployment group create \
        --resource-group $RESOURCE_GROUP \
        --template-file main.bicep \
        --parameters accountName=$ACCOUNT_NAME raiPolicyName=$RAI_POLICY_NAME modelName=$MODEL_NAME modelVersion=$VERSION modelPublisherFormat=$PROVIDER
    ```


## Account for content filtering in your code

When you apply content filtering to your model deployment, the service can intercept requests based on the inputs and outputs. If a content filter triggers, the service returns a 400 error code with a description of the rule that triggered the error.


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



The following example shows the response for a chat completion request that has triggered Guardrails & controls. 

# [Python](#tab/python)

```python
from azure.ai.inference.models import AssistantMessage, UserMessage, SystemMessage
from azure.core.exceptions import HttpResponseError

try:
    response = model.complete(
        messages=[
            SystemMessage(content="You are an AI assistant that helps people find information."),
            UserMessage(content="Chopping tomatoes and cutting them into cubes or wedges are great ways to practice your knife skills."),
        ]
    )

    print(response.choices[0].message.content)

except HttpResponseError as ex:
    if ex.status_code == 400:
        response = json.loads(ex.response._content.decode('utf-8'))
        if isinstance(response, dict) and "error" in response:
            print(f"Your request triggered an {response['error']['code']} error:\n\t {response['error']['message']}")
        else:
            raise ex
    else:
        raise ex
```

# [JavaScript](#tab/javascript)

```javascript
try {
    var messages = [
        { role: "system", content: "You are an AI assistant that helps people find information." },
        { role: "user", content: "Chopping tomatoes and cutting them into cubes or wedges are great ways to practice your knife skills." },
    ]

    var response = await client.path("/chat/completions").post({
        body: {
            messages: messages,
        }
    });
    
    console.log(response.body.choices[0].message.content)
}
catch (error) {
    if (error.status_code == 400) {
        var response = JSON.parse(error.response._content)
        if (response.error) {
            console.log(`Your request triggered an ${response.error.code} error:\n\t ${response.error.message}`)
        }
        else
        {
            throw error
        }
    }
}
```

# [C#](#tab/csharp)

```csharp
try
{
    requestOptions = new ChatCompletionsOptions()
    {
        Messages = {
            new ChatRequestSystemMessage("You are an AI assistant that helps people find information."),
            new ChatRequestUserMessage(
                "Chopping tomatoes and cutting them into cubes or wedges are great ways to practice your knife skills."
            ),
        },
    };

    response = client.Complete(requestOptions);
    Console.WriteLine(response.Value.Choices[0].Message.Content);
}
catch (RequestFailedException ex)
{
    if (ex.ErrorCode == "content_filter")
    {
        Console.WriteLine($"Your query has trigger Azure Content Safety: {ex.Message}");
    }
    else
    {
        throw;
    }
}
```

# [Java](#tab/java)

```java
try {
    List<ChatRequestMessage> chatMessages = new ArrayList<>();
    chatMessages.add(new ChatRequestSystemMessage("You are a helpful assistant"));
    chatMessages.add(new ChatRequestUserMessage("Chopping tomatoes and cutting them into cubes or wedges are great ways to practice your knife skills."));

    ChatCompletions response = client.complete(new ChatCompletionsOptions(chatMessages));
    System.out.println(response.getChoices().get(0).getMessage().getContent());
} catch (HttpResponseException ex) {
    if (ex.getResponse().getStatusCode() == 400)
        System.out.println("Your query has triggered Azure Content Safety: " + ex.getMessage());
    } else {
        throw ex;
    }
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
        "content": "Chopping tomatoes and cutting them into cubes or wedges are great ways to practice your knife skills."
    }
    ],
    "temperature": 0,
    "top_p": 1,
}
```

__Response__

```JSON
{
    "status": 400,
    "code": "content_filter",
    "message": "The response was filtered",
    "param": "messages",
    "type": null
}
```
---


## Follow best practices

To address potential harms that are relevant for a specific model, application, and deployment scenario, use an iterative identification process (such as red team testing, stress-testing, and analysis) and a measurement process to inform your content filtering configuration decisions. After you implement mitigations like content filtering, repeat measurement to test effectiveness.

For recommendations and best practices on Responsible AI for Azure OpenAI, grounded in the [Microsoft Responsible AI Standard](https://aka.ms/RAI), see the [Responsible AI Overview for Azure OpenAI](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/openai/overview).
