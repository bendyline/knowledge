---
title: Azure OpenAI assistant create output binding for Azure Functions
description: Learn how to use the Azure OpenAI assistant create output binding to create Azure OpenAI assistants from your function code executions.
ms.topic: reference
ms.custom:
  - build-2024
  - devx-track-extended-java
  - devx-track-js
  - devx-track-python
  - devx-track-ts
  - build-2025
ms.collection: 
  - ce-skilling-ai-copilot
ms.date: 05/15/2025
ms.update-cycle: 180-days
zone_pivot_groups: programming-languages-set-functions
---

# Azure OpenAI assistant create output binding for Azure Functions


>**Important:**
>The Azure OpenAI extension for Azure Functions is currently in preview.


The Azure OpenAI assistant create output binding allows you to create a new assistant chat bot from your function code execution.

For information on setup and configuration details of the Azure OpenAI extension, see [Azure OpenAI extensions for Azure Functions](functions-bindings-openai.md). To learn more about Azure OpenAI assistants, see [Azure OpenAI Assistants API](https://learn.microsoft.com/azure/ai-services/openai/concepts/assistants).

**Applies to: programming-language-javascript,programming-language-typescript**

> **Note:**  
> References and examples are only provided for the [Node.js v4 model](functions-reference-node.md?pivots=nodejs-model-v4).

**Applies to: programming-language-python**

> **Note:**  
> References and examples are only provided for the [Python v2 model](functions-reference-python.md?pivots=python-mode-decorators#programming-model).

**Applies to: programming-language-csharp**

> **Note:**  
> While both C# process models are supported, only [isolated worker model](dotnet-isolated-process-guide.md) examples are provided. 
 


## Example

**Applies to: programming-language-go**

Go support isn't currently available for this binding.


**Applies to: programming-language-csharp**

This example demonstrates the creation process, where the HTTP PUT function that creates a new assistant chat bot with the specified ID. The response to the prompt is returned in the HTTP response.  

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/assistant/csharp-ooproc/AssistantApis.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-assistantcreate-output.md)


**Applies to: programming-language-java**

This example demonstrates the creation process, where the HTTP PUT function that creates a new assistant chat bot with the specified ID. The response to the prompt is returned in the HTTP response.  

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/assistant/java/src/main/java/com/azfs/AssistantApis.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-assistantcreate-output.md)


**Applies to: programming-language-javascript,programming-language-typescript**

This example demonstrates the creation process, where the HTTP PUT function that creates a new assistant chat bot with the specified ID. The response to the prompt is returned in the HTTP response.  

**Applies to: programming-language-javascript**


[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/assistant/javascript/src/functions/assistantApis.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-assistantcreate-output.md)


**Applies to: programming-language-typescript**


[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/assistant/typescript/src/functions/assistantApis.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-assistantcreate-output.md)


**Applies to: programming-language-powershell**

This example demonstrates the creation process, where the HTTP PUT function that creates a new assistant chat bot with the specified ID. The response to the prompt is returned in the HTTP response.  

Here's the _function.json_ file for Create Assistant:

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/assistant/powershell/CreateAssistant/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-assistantcreate-output.md)

For more information about *function.json* file properties, see the [Configuration](#configuration) section.

{{This comes from the example code comment}} 
[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/assistant/powershell/CreateAssistant/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-assistantcreate-output.md)


**Applies to: programming-language-python**

This example demonstrates the creation process, where the HTTP PUT function that creates a new assistant chat bot with the specified ID. The response to the prompt is returned in the HTTP response.  

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/assistant/python/assistant_apis.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-assistantcreate-output.md)


<!--- End code examples section -->    
**Applies to: programming-language-csharp**

## Attributes

Apply the `CreateAssistant` attribute to define an assistant create output binding, which supports these parameters:

| Parameter | Description |
| --- | --- |
| **Id** | The identifier of the assistant to create. |
| **Instructions** | _Optional_. The instructions that are provided to assistant to follow. |
| **ChatStorageConnectionSetting** | _Optional_. The configuration section name for the table settings for chat storage. The default value is `AzureWebJobsStorage`. |
| **CollectionName** | _Optional_. The table collection name for chat storage. The default value is `ChatState`. |


**Applies to: programming-language-java**

## Annotations

The `CreateAssistant` annotation enables you to define an assistant create output binding, which supports these parameters: 

| Element | Description |
| --- | --- |
| **name** | Gets or sets the name of the output binding. |
| **id** | The identifier of the assistant to create. |
| **instructions** | _Optional_. The instructions that are provided to assistant to follow. |
| **chatStorageConnectionSetting** | _Optional_. The configuration section name for the table settings for chat storage. The default value is `AzureWebJobsStorage`. |
| **collectionName** | _Optional_. The table collection name for chat storage. The default value is `ChatState`. |


**Applies to: programming-language-python**

## Decorators
<!--- Replace with typed decorator when available.-->
During the preview, define the output binding as a `generic_output_binding` binding of type `createAssistant`, which supports these parameters:

| Parameter | Description |
| --- | --- |
| **arg_name** | The name of the variable that represents the binding parameter. |
| **id** | The identifier of the assistant to create. |
| **instructions** | _Optional_. The instructions that are provided to assistant to follow. |
| **chat_storage_connection_setting** | _Optional_. The configuration section name for the table settings for chat storage. The default value is `AzureWebJobsStorage`. |
| **collection_name** | _Optional_. The table collection name for chat storage. The default value is `ChatState`. |


**Applies to: programming-language-powershell**

## Configuration  

The binding supports these configuration properties that you set in the function.json file.

| Property | Description |
| --- | --- |
| **type** | Must be `CreateAssistant`. |
| **direction** | Must be `out`. |
| **name** | The name of the output binding. |
| **id** | The identifier of the assistant to create. |
| **instructions** | _Optional_. The instructions that are provided to assistant to follow. |
| **chatStorageConnectionSetting** | _Optional_. The configuration section name for the table settings for chat storage. The default value is `AzureWebJobsStorage`. |
| **collectionName** | _Optional_. The table collection name for chat storage. The default value is `ChatState`. |
 

**Applies to: programming-language-javascript,programming-language-typescript**

## Configuration

The binding supports these properties, which are defined in your code: 

| Property | Description |
| --- | --- |
| **id** | The identifier of the assistant to create. |
| **instructions** | _Optional_. The instructions that are provided to assistant to follow. |
| **chatStorageConnectionSetting** | _Optional_. The configuration section name for the table settings for chat storage. The default value is `AzureWebJobsStorage`. |
| **collectionName** | _Optional_. The table collection name for chat storage. The default value is `ChatState`. |


## Usage

See the [Example section](#example) for complete examples.


## Connections

To use the Azure OpenAI binding extension, you need to specify a connection to an OpenAI model definition. Set the OpenAI model connection in your bindings by using one of these approaches: 

+ Use the `AIConnectionName` binding property (preferred for Azure OpenAI).
+ Set `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_KEY` in app settings (for Azure OpenAI).
+ Set only `Open_API_Key` in app settings (for `https://api.openai.com`).

The way you set the connection depends on both the model API and the authentication method, as indicated by the following table:

| Authentication/Model API | [Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/overview) | [OpenAI (https://api.openai.com)](https://openai.com/) |
| --- | --- | --- |
| **Managed identity connection** | `AIConnectionName` | Not supported |
| **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)** | `AZURE_OPENAI_ENDPOINT`<br/>`AZURE_OPENAI_KEY` | `Open_API_Key` |
| **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)** | `AZURE_OPENAI_ENDPOINT`<br/>`AZURE_OPENAI_KEY` | `Open_API_Key` |
| Shared secret | `AZURE_OPENAI_ENDPOINT`<br/>`AZURE_OPENAI_KEY` | `Open_API_Key` |

Use managed identity-based connections and the `AIConnectionName` property. 

When you use `AIConnectionName`, the value of this property setting depends on the type of connection: 

+ **Managed identity connection**: The `AIConnectionName` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to Azure OpenAI. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `AIConnectionName` property setting returns an Azure Key Vault reference to the location where the API key is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `AIConnectionName` property setting returns an Azure App Configuration reference that returns an API key or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **API key**: The `AIConnectionName` property setting resolves to app settings containing the endpoint and key directly. Because shared keys can be compromised, use managed identity connections when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connections in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings).


### [AIConnectionName Property](#tab/ai-connection-name)

The OpenAI bindings include an `AIConnectionName` property that you can use to specify the `<ConnectionNamePrefix>` for the group of app settings that define the connection to Azure OpenAI:

| Setting name | Description |
| --- | --- |
| `<CONNECTION_NAME_PREFIX>__endpoint` | Sets the URI endpoint of the Azure OpenAI service. This setting is always required. |
| `<CONNECTION_NAME_PREFIX>__clientId` | Sets the specific user-assigned identity to use when obtaining an access token. Requires that `<CONNECTION_NAME_PREFIX>__credential` is set to `managedidentity`. The property accepts a client ID corresponding to a user-assigned identity assigned to the application. It's invalid to specify both a Resource ID and a client ID. If you don't specify this property, the system-assigned identity is used. This property is used differently in [local development scenarios](functions-reference.md#local-development-with-identity-based-connections), when `credential` shouldn't be set. |
| `<CONNECTION_NAME_PREFIX>__credential` | Defines how an access token is obtained for the connection. Use `managedidentity` for managed identity authentication. This value is only valid when a managed identity is available in the hosting environment. |
| `<CONNECTION_NAME_PREFIX>__managedIdentityResourceId` | When `credential` is set to `managedidentity`, set this property to specify the resource Identifier to use when obtaining a token. The property accepts a resource identifier corresponding to the resource ID of the user-defined managed identity. It's invalid to specify both a resource ID and a client ID. If you don't specify either, the system-assigned identity is used. This property is used differently in [local development scenarios](functions-reference.md#local-development-with-identity-based-connections), when `credential` shouldn't be set. |
| `<CONNECTION_NAME_PREFIX>__key` | Sets the shared secret key required to access the endpoint of the Azure OpenAI service by using key-based authentication. As a security best practice, always use Microsoft Entra ID with managed identities for authentication. |

Consider these managed identity connection settings when you set the `AIConnectionName` property to `myAzureOpenAI`:

+ `myAzureOpenAI__endpoint=https://contoso.openai.azure.com/`
+ `myAzureOpenAI__credential=managedidentity`
+ `myAzureOpenAI__clientId=aaaaaaaa-bbbb-cccc-1111-222222222222`

At runtime, the host interprets these settings as a single `myAzureOpenAI` setting:

```json
"myAzureOpenAI":
{
    "endpoint": "https://contoso.openai.azure.com/",
    "credential": "managedidentity",
    "clientId": "aaaaaaaa-bbbb-cccc-1111-222222222222"
}
```

When you use managed identities, make sure to add your identity to the [Cognitive Services OpenAI User](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles/ai-machine-learning.md#cognitive-services-openai-user) role.

When running locally, add these settings to the *local.settings.json* project file. For more information, see [Local development with identity-based connections](functions-reference.md#local-development-with-identity-based-connections).

### [Environment variables](#tab/envars)

To support legacy apps and providers other than Azure OpenAI, define key-based authentication to OpenAI by using these environment variables. 

| Variable name | Description |
| --- | --- |
| `AZURE_OPENAI_ENDPOINT` | Sets the URI endpoint of your Azure OpenAI instance. Don't use with `Open_API_Key`. |
| `AZURE_OPENAI_KEY` | Sets the shared secret key required to access your Azure OpenAI endpoint (`AZURE_OPENAI_ENDPOINT`) by using key-based authentication. |
| `Open_API_Key` | Sets the shared secret key required to access the `https://api.openai.com` endpoint by using key-based authentication. |

Set these variables in your app settings. 

When running locally, add these settings to the *local.settings.json* project file. 

---

For more information, see [Work with application settings](functions-how-to-use-azure-function-app-settings.md#settings). 


## Related content

+ [Assistant samples](https://github.com/Azure/azure-functions-openai-extension/tree/main/samples/assistant)
+ [Azure OpenAI extension](functions-bindings-openai.md)
+ [Azure OpenAI assistant trigger](functions-bindings-openai-assistant-trigger.md)
+ [Azure OpenAI assistant query input binding](functions-bindings-openai-assistantcreate-output.md)
+ [Azure OpenAI assistant post input binding](functions-bindings-openai-assistantpost-input.md)
