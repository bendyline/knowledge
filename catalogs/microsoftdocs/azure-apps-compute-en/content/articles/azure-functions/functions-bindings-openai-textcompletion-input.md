---
title: Azure OpenAI text completion input binding for Azure Functions
description: Learn how to use the Azure OpenAI text completion input binding to access Azure OpenAI text completion APIs during function execution in Azure Functions.
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

# Azure OpenAI text completion input binding for Azure Functions


>**Important:**
>The Azure OpenAI extension for Azure Functions is currently in preview.


The Azure OpenAI text completion input binding allows you to bring the results text completion APIs into your code executions. You can define the binding to use both predefined prompts with parameters or pass through an entire prompt.

For information on setup and configuration details of the Azure OpenAI extension, see [Azure OpenAI extensions for Azure Functions](functions-bindings-openai.md). To learn more about Azure OpenAI completions, see [Learn how to generate or manipulate text](https://learn.microsoft.com/azure/ai-services/openai/how-to/completions).

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

This example demonstrates the _templating_ pattern, where the HTTP trigger function takes a `name` parameter and embeds it into a text prompt, which is then sent to the Azure OpenAI completions API by the extension. The response to the prompt is returned in the HTTP response. 

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/textcompletion/csharp-ooproc/TextCompletions.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-textcompletion-input.md)

This example takes a prompt as input, sends it directly to the completions API, and returns the response as the output.

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/textcompletion/csharp-ooproc/TextCompletions.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-textcompletion-input.md)


**Applies to: programming-language-java**

This example demonstrates the _templating_ pattern, where the HTTP trigger function takes a `name` parameter and embeds it into a text prompt, which is then sent to the Azure OpenAI completions API by the extension. The response to the prompt is returned in the HTTP response. 

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/textcompletion/java/src/main/java/com/azfs/TextCompletions.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-textcompletion-input.md)

This example takes a prompt as input, sends it directly to the completions API, and returns the response as the output.

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/textcompletion/java/src/main/java/com/azfs/TextCompletions.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-textcompletion-input.md)


**Applies to: programming-language-javascript**


This example demonstrates the _templating_ pattern, where the HTTP trigger function takes a `name` parameter and embeds it into a text prompt, which is then sent to the Azure OpenAI completions API by the extension. The response to the prompt is returned in the HTTP response.  

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/textcompletion/javascript/src/functions/whois.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-textcompletion-input.md)


**Applies to: programming-language-typescript**


This example demonstrates the _templating_ pattern, where the HTTP trigger function takes a `name` parameter and embeds it into a text prompt, which is then sent to the Azure OpenAI completions API by the extension. The response to the prompt is returned in the HTTP response.  

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/textcompletion/typescript/src/functions/whois.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-textcompletion-input.md)
 

**Applies to: programming-language-powershell**

This example demonstrates the _templating_ pattern, where the HTTP trigger function takes a `name` parameter and embeds it into a text prompt, which is then sent to the Azure OpenAI completions API by the extension. The response to the prompt is returned in the HTTP response. 

Here's the _function.json_ file for `TextCompletionResponse`:

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/textcompletion/powershell/WhoIs/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-textcompletion-input.md)

For more information about *function.json* file properties, see the [Configuration](#configuration) section.

The code simply returns the text from the completion API as the response:

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/textcompletion/powershell/WhoIs/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-textcompletion-input.md)


**Applies to: programming-language-python**

This example demonstrates the _templating_ pattern, where the HTTP trigger function takes a `name` parameter and embeds it into a text prompt, which is then sent to the Azure OpenAI completions API by the extension. The response to the prompt is returned in the HTTP response.  

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/textcompletion/python/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-textcompletion-input.md)

This example takes a prompt as input, sends it directly to the completions API, and returns the response as the output.

[Code reference unavailable in this source snapshot: ~/functions-openai-extension/samples/textcompletion/python/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-openai-textcompletion-input.md)


<!--- End code examples section -->  
<!--- Begin the actual references (Attributes/Annotations/Properties/Decorators) section 
In an ideal world, these sections would be generated directly from the definitions in the source code.-->  
**Applies to: programming-language-csharp**

## Attributes

The specific attribute you apply to define a text completion input binding depends on your C# process mode. 

### [Isolated process](#tab/isolated-process)

In the [isolated worker model](dotnet-isolated-process-guide.md), apply `TextCompletionInput` to define a text completion input binding.

### [In-process](#tab/in-process)

In the [in-process model](functions-dotnet-class-library.md), apply `TextCompletion` to define a text completion input binding.

---

The attribute supports these parameters:

| Parameter | Description |
| --- | --- |
| **Prompt** | Gets or sets the prompt to generate completions for, encoded as a string. |
| **AIConnectionName** | _Optional_. Gets or sets the name of the configuration section for AI service connectivity settings. For Azure OpenAI: If specified, looks for "Endpoint" and "Key" values in this configuration section. If not specified or the section doesn't exist, falls back to environment variables: AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_KEY. For user-assigned managed identity authentication, this property is required. For OpenAI service (non-Azure), set the OPENAI_API_KEY environment variable. |
| **ChatModel** | _Optional_. Gets or sets the ID of the model to use as a string, with a default value of `gpt-3.5-turbo`. |
| **Temperature** | _Optional_. Gets or sets the sampling temperature to use, as a string between `0` and `2`. Higher values (`0.8`) make the output more random, while lower values like (`0.2`) make output more focused and deterministic. You should use either  `Temperature` or `TopP`, but not both. |
| **TopP** | _Optional_. Gets or sets an alternative to sampling with temperature, called nucleus sampling, as a string. In this sampling method, the model considers the results of the tokens with `top_p` probability mass. So `0.1` means only the tokens comprising the top 10% probability mass are considered. You should use either  `Temperature` or `TopP`, but not both. |
| **MaxTokens** | _Optional_. Gets or sets the maximum number of tokens to generate in the completion, as a string with a default of `100`. The token count of your prompt plus `max_tokens` can't exceed the model's context length. Most models have a context length of 2,048 tokens (except for the newest models, which support 4096). |
| **IsReasoningModel** | _Optional_. Gets or sets a value indicating whether the chat completion model is a reasoning model. This option is experimental and associated with the reasoning model until all models have parity in the expected properties, with a default value of `false`. |


**Applies to: programming-language-java**

## Annotations

The `TextCompletion` annotation enables you to define a text completion input binding, which supports these parameters:  

| Element | Description |
| --- | --- |
| **name** | Gets or sets the name of the input binding. |
| **prompt** | Gets or sets the prompt to generate completions for, encoded as a string. |
| **aiConnectionName** | _Optional_. Gets or sets the name of the configuration section for AI service connectivity settings. For Azure OpenAI: If specified, looks for "Endpoint" and "Key" values in this configuration section. If not specified or the section doesn't exist, falls back to environment variables: AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_KEY. For user-assigned managed identity authentication, this property is required. For OpenAI service (non-Azure), set the OPENAI_API_KEY environment variable. |
| **chatModel** | Gets or sets the ID of the model to use as a string, with a default value of `gpt-3.5-turbo`. |
| **temperature** | _Optional_. Gets or sets the sampling temperature to use, as a string between `0` and `2`. Higher values (`0.8`) make the output more random, while lower values like (`0.2`) make output more focused and deterministic. You should use either  `Temperature` or `TopP`, but not both. |
| **topP** | _Optional_. Gets or sets an alternative to sampling with temperature, called nucleus sampling, as a string. In this sampling method, the model considers the results of the tokens with `top_p` probability mass. So `0.1` means only the tokens comprising the top 10% probability mass are considered. You should use either  `Temperature` or `TopP`, but not both. |
| **maxTokens** | _Optional_. Gets or sets the maximum number of tokens to generate in the completion, as a string with a default of `100`. The token count of your prompt plus `max_tokens` can't exceed the model's context length. Most models have a context length of 2,048 tokens (except for the newest models, which support 4096). |
| **isReasoningModel** | _Optional_. Gets or sets a value indicating whether the chat completion model is a reasoning model. This option is experimental and associated with the reasoning model until all models have parity in the expected properties, with a default value of `false`. |


**Applies to: programming-language-python**

## Decorators
<!--- Replace with typed decorator when available.-->
During the preview, define the input binding as a `generic_input_binding` binding of type  `textCompletion`, which supports these parameters:

| Parameter | Description |
| --- | --- |
| **arg_name** | The name of the variable that represents the binding parameter. |
| **prompt** | Gets or sets the prompt to generate completions for, encoded as a string. |
| **ai_connection_name** | _Optional_. Gets or sets the name of the configuration section for AI service connectivity settings. For Azure OpenAI: If specified, looks for "Endpoint" and "Key" values in this configuration section. If not specified or the section doesn't exist, falls back to environment variables: AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_KEY. For user-assigned managed identity authentication, this property is required. For OpenAI service (non-Azure), set the OPENAI_API_KEY environment variable. |
| **chat_model** | Gets or sets the ID of the model to use as a string, with a default value of `gpt-3.5-turbo`. |
| **temperature** | _Optional_. Gets or sets the sampling temperature to use, as a string between `0` and `2`. Higher values (`0.8`) make the output more random, while lower values like (`0.2`) make output more focused and deterministic. You should use either  `Temperature` or `TopP`, but not both. |
| **top_p** | _Optional_. Gets or sets an alternative to sampling with temperature, called nucleus sampling, as a string. In this sampling method, the model considers the results of the tokens with `top_p` probability mass. So `0.1` means only the tokens comprising the top 10% probability mass are considered. You should use either  `Temperature` or `TopP`, but not both. |
| **max_tokens** | _Optional_. Gets or sets the maximum number of tokens to generate in the completion, as a string with a default of `100`. The token count of your prompt plus `max_tokens` can't exceed the model's context length. Most models have a context length of 2,048 tokens (except for the newest models, which support 4096). |
| **is_reasoning _model** | _Optional_. Gets or sets a value indicating whether the chat completion model is a reasoning model. This option is experimental and associated with the reasoning model until all models have parity in the expected properties, with a default value of `false`. |


**Applies to: programming-language-powershell**

## Configuration  

The binding supports these configuration properties that you set in the function.json file.

| Property | Description |
| --- | --- |
| **type** | Must be `textCompletion`. |
| **direction** | Must be `in`. |
| **name** | The name of the input binding. |
| **prompt** | Gets or sets the prompt to generate completions for, encoded as a string. |
| **aiConnectionName** | _Optional_. Gets or sets the name of the configuration section for AI service connectivity settings. For Azure OpenAI: If specified, looks for "Endpoint" and "Key" values in this configuration section. If not specified or the section doesn't exist, falls back to environment variables: AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_KEY. For user-assigned managed identity authentication, this property is required. For OpenAI service (non-Azure), set the OPENAI_API_KEY environment variable. |
| **chatModel** | Gets or sets the ID of the model to use as a string, with a default value of `gpt-3.5-turbo`. |
| **temperature** | _Optional_. Gets or sets the sampling temperature to use, as a string between `0` and `2`. Higher values (`0.8`) make the output more random, while lower values like (`0.2`) make output more focused and deterministic. You should use either  `Temperature` or `TopP`, but not both. |
| **topP** | _Optional_. Gets or sets an alternative to sampling with temperature, called nucleus sampling, as a string. In this sampling method, the model considers the results of the tokens with `top_p` probability mass. So `0.1` means only the tokens comprising the top 10% probability mass are considered. You should use either  `Temperature` or `TopP`, but not both. |
| **maxTokens** | _Optional_. Gets or sets the maximum number of tokens to generate in the completion, as a string with a default of `100`. The token count of your prompt plus `max_tokens` can't exceed the model's context length. Most models have a context length of 2,048 tokens (except for the newest models, which support 4096). |
| **isReasoningModel** | _Optional_. Gets or sets a value indicating whether the chat completion model is a reasoning model. This option is experimental and associated with the reasoning model until all models have parity in the expected properties, with a default value of `false`. |
 

**Applies to: programming-language-javascript,programming-language-typescript**

## Configuration

The binding supports these properties, which are defined in your code: 

| Property | Description |
| --- | --- |
| **prompt** | Gets or sets the prompt to generate completions for, encoded as a string. |
| **aiConnectionName** | _Optional_. Gets or sets the name of the configuration section for AI service connectivity settings. For Azure OpenAI: If specified, looks for "Endpoint" and "Key" values in this configuration section. If not specified or the section doesn't exist, falls back to environment variables: AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_KEY. For user-assigned managed identity authentication, this property is required. For OpenAI service (non-Azure), set the OPENAI_API_KEY environment variable. |
| **chatModel** | Gets or sets the ID of the model to use as a string, with a default value of `gpt-3.5-turbo`. |
| **temperature** | _Optional_. Gets or sets the sampling temperature to use, as a string between `0` and `2`. Higher values (`0.8`) make the output more random, while lower values like (`0.2`) make output more focused and deterministic. You should use either  `Temperature` or `TopP`, but not both. |
| **topP** | _Optional_. Gets or sets an alternative to sampling with temperature, called nucleus sampling, as a string. In this sampling method, the model considers the results of the tokens with `top_p` probability mass. So `0.1` means only the tokens comprising the top 10% probability mass are considered. You should use either  `Temperature` or `TopP`, but not both. |
| **maxTokens** | _Optional_. Gets or sets the maximum number of tokens to generate in the completion, as a string with a default of `100`. The token count of your prompt plus `max_tokens` can't exceed the model's context length. Most models have a context length of 2,048 tokens (except for the newest models, which support 4096). |
| **isReasoningModel** | _Optional_. Gets or sets a value indicating whether the chat completion model is a reasoning model. This option is experimental and associated with the reasoning model until all models have parity in the expected properties, with a default value of `false`. |



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

+ [Text completion samples](https://github.com/Azure/azure-functions-openai-extension/tree/main/samples/textcompletion)
+ [Azure OpenAI extensions for Azure Functions](functions-bindings-openai.md)
