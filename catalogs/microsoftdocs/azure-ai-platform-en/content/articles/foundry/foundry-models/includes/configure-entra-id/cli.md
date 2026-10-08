---
manager: mcleans
author: msakande
ms.author: mopeakande
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.date: 08/31/2026
ms.topic: include
zone_pivot_groups: azure-ai-models-deployment
ai-usage: ai-assisted
---

* Install the [Azure CLI](https://learn.microsoft.com/cli/azure/)

* Identify the following information:

  * Your Azure subscription ID

  * Your Microsoft Foundry resource name

  * The resource group where you deployed the Foundry resource


## Configure Microsoft Entra ID for inference

To configure Microsoft Entra ID for inference, follow these steps:


1. Sign in to your Azure subscription.

    ```azurecli
    # Authenticate with Azure and sign in interactively
    az login
    ```

1. If you have more than one subscription, select the subscription where your resource is located.

    ```azurecli
    # Set the active subscription context
    az account set --subscription "<subscription-id>"
    ```

1. Set the following environment variables with the name of the resource and resource group you plan to use.

    ```azurecli
    # Store resource identifiers for reuse in subsequent commands
    ACCOUNT_NAME="<ai-services-resource-name>"
    RESOURCE_GROUP="<resource-group>"
    ```

1. Get the full name of your resource.

    ```azurecli
    # Retrieve the full Azure Resource Manager ID for role assignment scoping
    RESOURCE_ID=$(az resource show -g $RESOURCE_GROUP -n $ACCOUNT_NAME --resource-type "Microsoft.CognitiveServices/accounts" --query id --output tsv)
    ```

1. Get the object ID of the security principal you want to assign permissions to. The following examples show how to get the object ID associated with:
    
    **Your own signed in account:**

    ```azurecli
    # Get your user's Microsoft Entra ID object ID
    OBJECT_ID=$(az ad signed-in-user show --query id --output tsv)
    ```

    **A security group:**

    ```azurecli
    # Get the object ID for a security group (recommended for production)
    OBJECT_ID=$(az ad group show --group "<group-name>" --query id --output tsv)
    ```

    **A service principal:**

    ```azurecli
    # Get the object ID for a service principal (for app authentication)
    OBJECT_ID=$(az ad sp show --id "<service-principal-guid>" --query id --output tsv)
    ```
    
1. Assign the **Cognitive Services User** role to the service principal (scoped to the resource). By assigning a role, you grant the service principal access to this resource.

    ```azurecli
    # Grant inference access by assigning the Cognitive Services User role
    az role assignment create --assignee-object-id $OBJECT_ID --role "Cognitive Services User" --scope $RESOURCE_ID
    ```

1. The selected user can now use Microsoft Entra ID for inference.

    > **Tip:**
    > Keep in mind that Azure role assignments can take up to five minutes to propagate. Adding or removing users from a security group propagates immediately.

1. Verify the role assignment:

    ```azurecli
    az role assignment list --scope $RESOURCE_ID --assignee $OBJECT_ID --query "[?roleDefinitionName=='Cognitive Services User'].{principalName:principalName, roleDefinitionName:roleDefinitionName}" --output table
    ```

    The output should show the **Cognitive Services User** role assigned to your principal.


## Use Microsoft Entra ID in your code

After you configure Microsoft Entra ID in your resource, update your code to use it when you consume the inference endpoint. The following example shows how to use the Responses API:


# [Python](#tab/python)

Install the OpenAI SDK using a package manager like pip:

```bash
pip install openai
```

For Microsoft Entra ID authentication, also install:

```bash
pip install azure-identity
```

Use the package to consume the model. The following example shows how to create a client and make a test call to the Responses API by using Microsoft Entra ID and your model deployment.

Replace `<resource>` with your Foundry resource name. Find it in the Azure portal or by running `az cognitiveservices account list`. Replace `deepseek-v3-0324` with your actual deployment name.

```python
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), 
    "https://ai.azure.com/.default"
)

client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=token_provider,
)

response = client.responses.create(
    model="deepseek-v3-0324",  # Replace with your model deployment name.
    input="What is Azure AI?",
)

print(response.output_text)
```

Expected output

```output
Azure AI is a comprehensive suite of artificial intelligence services and tools from Microsoft that enables developers to build intelligent applications. It includes services for natural language processing, computer vision, speech recognition, and machine learning capabilities.
```

Reference: [OpenAI Python SDK](https://github.com/openai/openai-python) and [DefaultAzureCredential class](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential).

# [C#](#tab/csharp)

Install the OpenAI SDK:

```dotnetcli
dotnet add package OpenAI
```

For Microsoft Entra ID authentication, also install the `Azure.Identity` package:

```dotnetcli
dotnet add package Azure.Identity
```

Then, use the package to consume the model. The following example shows how to create a client and make a test call to the Responses API by using Microsoft Entra ID and your model deployment.

Replace `<resource>` with your Foundry resource name (find it in the Azure portal). Replace `deepseek-v3-0324` with your actual deployment name.

```csharp
using Azure.Identity;
using OpenAI;
using OpenAI.Responses;
using System.ClientModel.Primitives;

#pragma warning disable OPENAI001

BearerTokenPolicy tokenPolicy = new(
    new DefaultAzureCredential(),
    "https://ai.azure.com/.default"
);

OpenAIResponseClient client = new(
    model: "deepseek-v3-0324", // Replace with your model deployment name.
    authenticationPolicy: tokenPolicy,
    options: new OpenAIClientOptions()
    {
        Endpoint = new Uri("https://<resource>.openai.azure.com/openai/v1/")
    }
);

OpenAIResponse response = client.CreateResponse("What is Azure AI?");

Console.WriteLine(response.GetOutputText());
```

Expected output:

```output
Azure AI is a comprehensive suite of artificial intelligence services and tools from Microsoft that enables developers to build intelligent applications. It includes services for natural language processing, computer vision, speech recognition, and machine learning capabilities.
```

Reference: [OpenAI .NET SDK](https://github.com/openai/openai-dotnet) and [DefaultAzureCredential class](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential).

# [JavaScript](#tab/javascript)

Install the OpenAI SDK with npm:

```bash
npm install openai
```

For Microsoft Entra ID authentication, also install:

```bash
npm install @azure/identity
```

Then, use the package to consume the model. The following example shows how to create a client and make a test call to the Responses API by using Microsoft Entra ID and your model deployment.

Replace `<resource>` with your Foundry resource name (find it in the Azure portal or by running `az cognitiveservices account list`). Replace `deepseek-v3-0324` with your actual deployment name.

```javascript
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { OpenAI } from "openai";

const tokenProvider = getBearerTokenProvider(
    new DefaultAzureCredential(),
    'https://ai.azure.com/.default'
);

const client = new OpenAI({
    baseURL: "https://<resource>.openai.azure.com/openai/v1/",
    apiKey: tokenProvider
});

const response = await client.responses.create({
    model: "deepseek-v3-0324", // Replace with your model deployment name.
    input: "What is Azure AI?"
});

console.log(response.output_text);
```

Expected output:

```output
Azure AI is a comprehensive suite of artificial intelligence services and tools from Microsoft that enables developers to build intelligent applications. It includes services for natural language processing, computer vision, speech recognition, and machine learning capabilities.
```

Reference: [OpenAI Node.js SDK](https://github.com/openai/openai-node) and [DefaultAzureCredential class](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential).

# [Java](#tab/java)

Add the OpenAI SDK to your project. Check the [OpenAI Java GitHub repository](https://github.com/openai/openai-java) for the latest version and installation instructions.

For Microsoft Entra ID authentication, also add:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.18.0</version>
</dependency>
```

Then, use the package to consume the model. The following example shows how to create a client and make a test call to the Responses API by using Microsoft Entra ID and your model deployment.

Replace `<resource>` with your Foundry resource name (find it in the Azure portal). Replace `deepseek-v3-0324` with your actual deployment name.

```java
import com.azure.identity.AuthenticationUtil;
import com.azure.identity.DefaultAzureCredential;
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.credential.BearerTokenCredential;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;

DefaultAzureCredential tokenCredential = new DefaultAzureCredentialBuilder().build();

OpenAIClient client = OpenAIOkHttpClient.builder()
    .baseUrl("https://<resource>.openai.azure.com/openai/v1/")
    .credential(BearerTokenCredential.create(
        AuthenticationUtil.getBearerTokenSupplier(
            tokenCredential, 
            "https://ai.azure.com/.default"
        )
    ))
    .build();

ResponseCreateParams params = ResponseCreateParams.builder()
    .model("deepseek-v3-0324") // Replace with your model deployment name.
    .input("What is Azure AI?")
    .build();

Response response = client.responses().create(params);

// The Responses API has no single output-text accessor; concatenate the output items.
response.output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(outputText -> System.out.println(outputText.text()));
```

Expected output:

```output
Azure AI is a comprehensive suite of artificial intelligence services and tools from Microsoft that enables developers to build intelligent applications. It includes services for natural language processing, computer vision, speech recognition, and machine learning capabilities.
```

Reference: [OpenAI Java SDK](https://github.com/openai/openai-java) and [DefaultAzureCredential class](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential).

# [REST](#tab/rest)

Explore the API design in the [reference section](https://learn.microsoft.com/rest/api/microsoft-foundry/azureopenai/responses?view=rest-microsoft-foundry-v1\&preserve-view=true) to see which parameters are available. Insert the authentication (bearer) token in the `Authorization` header.

For example, the [Responses API](https://learn.microsoft.com/rest/api/microsoft-foundry/azureopenai/responses?view=rest-microsoft-foundry-v1\&preserve-view=true) reference section details how to use the `/responses` route to generate predictions. The `/openai/v1/` path is included in the root of the URL:

__Request__

Replace `<resource>` with your Foundry resource name (find it in the Azure portal or by running `az cognitiveservices account list`). Replace `deepseek-v3-0324` with your actual deployment name.

The base URL accepts both `https://<resource>.openai.azure.com/openai/v1/` and `https://<resource>.services.ai.azure.com/openai/v1/` formats.

```bash
curl -X POST https://<resource>.openai.azure.com/openai/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AZURE_OPENAI_AUTH_TOKEN" \
  -d '{
      "model": "deepseek-v3-0324",
      "input": "Explain what the bitter lesson is?"
    }'
```

__Response__

If authentication is successful, you receive a `200 OK` response with the response results in the response body:

```json
{
  "id": "resp_...",
  "object": "response",
  "created_at": 1738368234,
  "model": "deepseek-v3-0324",
  "status": "completed",
  "output": [
    {
      "type": "message",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "The bitter lesson refers to a key insight in AI research that emphasizes the importance of general-purpose learning methods that leverage computation, rather than human-designed domain-specific approaches. It suggests that methods which scale with increased computation tend to be more effective in the long run."
        }
      ]
    }
  ],
  "usage": {
    "input_tokens": 28,
    "output_tokens": 52,
    "total_tokens": 80
  }
}
```

Tokens must be issued with scope `https://ai.azure.com/.default`.

For testing purposes, the easiest way to get a valid token for your user account is to use the Azure CLI. In a console, sign in and request a token by running the following Azure CLI commands:

```azurecli
az login
az account get-access-token --resource https://ai.azure.com --query "accessToken" --output tsv
```

This command outputs an access token that you can store in the `$AZURE_OPENAI_AUTH_TOKEN` environment variable.

Reference: [Responses API](https://learn.microsoft.com/rest/api/microsoft-foundry/azureopenai/responses?view=rest-microsoft-foundry-v1\&preserve-view=true)

---



### Options for credential when using Microsoft Entra ID

`DefaultAzureCredential` is an opinionated, ordered sequence of mechanisms for authenticating to Microsoft Entra ID. Each authentication mechanism is a class that's derived from the `TokenCredential` class and is known as a credential. At runtime, `DefaultAzureCredential` attempts to authenticate using the first credential. If that credential fails to acquire an access token, the next credential in the sequence is attempted, and so on, until an access token is obtained. In this way, your app can use different credentials in different environments without writing environment-specific code.

When the preceding code runs on your local development workstation, it looks in the environment variables for an application service principal or at locally installed developer tools, like Visual Studio, for a set of developer credentials. You can use either approach to authenticate the app to Azure resources during local development.

When deployed to Azure, this same code can also authenticate your app to other Azure resources. `DefaultAzureCredential` can retrieve environment settings and managed identity configurations to authenticate to other services automatically.

### Best practices

* Use deterministic credentials in production environments: Strongly consider moving from `DefaultAzureCredential` to one of the following deterministic solutions in production environments:

  * A specific `TokenCredential` implementation, like `ManagedIdentityCredential`. See the [Derived list for options](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential#definition).
  * A pared-down `ChainedTokenCredential` implementation that's optimized for the Azure environment in which your app runs. `ChainedTokenCredential` essentially creates a specific allowlist of acceptable credential options, like `ManagedIdentity` for production and `VisualStudioCredential` for development.

* Configure system-assigned or user-assigned managed identities to the Azure resources where your code runs, if possible. Configure Microsoft Entra ID access to those specific identities. 

## Disable key-based authentication in the resource

Disable key-based authentication when you implement Microsoft Entra ID and fully address compatibility or fallback concerns in all the applications that consume the service. 
Use Azure PowerShell to disable local authentication for an individual resource. First sign in with the `Connect-AzAccount` command. Then use the `Set-AzCognitiveServicesAccount` cmdlet with the parameter `-DisableLocalAuth $true`, like the following example:

```powershell
Set-AzCognitiveServicesAccount -ResourceGroupName "my-resource-group" -Name "my-resource-name" -DisableLocalAuth $true
```

For more information about how to use the Azure CLI to disable or reenable local authentication and verify authentication status, see [Disable local authentication in Foundry Tools](../../../../ai-services/disable-local-auth.md).
