---
title: Azure Queue storage trigger and bindings for Azure Functions overview
description: Understand how to use the Azure Queue storage trigger and output binding in Azure Functions.
ms.topic: reference
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
ms.date: 09/15/2026
zone_pivot_groups: programming-languages-set-functions
---

# Azure Queue storage trigger and bindings for Azure Functions overview

Azure Functions can run as new Azure Queue storage messages are created and can write queue messages within a function.

| Action | Type |
| --- | --- |
| Run a function as queue storage data changes | [Trigger](functions-bindings-storage-queue-trigger.md) |
| Write queue storage messages | [Output binding](functions-bindings-storage-queue-output.md) |

**Applies to: programming-language-csharp**


## Install extension

The extension NuGet package you install depends on the C# mode you're using in your function app: 

# [Isolated worker model](#tab/isolated-process)

Functions execute in an isolated C# worker process. To learn more, see [Guide for running C# Azure Functions in an isolated worker process](dotnet-isolated-process-guide.md).

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Functions execute in the same process as the Functions host. To learn more, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md).

In a variation of this model, Functions can be run using [C# scripting], which is supported primarily for C# portal editing. To update existing binding extensions for C# script apps running in the portal without having to republish your function app, see [Update your extensions].

---

The functionality of the extension varies depending on the extension version:

# [Extension 5.x+](#tab/extensionv5/in-process)

<a name="storage-extension-5x-and-higher"></a>

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 4.x._


This version introduces the ability to [connect using an identity instead of a secret](manage-connections.md?tabs=identity#define-connections). For a tutorial on configuring your function apps with managed identities, see the [creating a function app with identity-based connections tutorial](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-identity-based-connections-tutorial.md). 

This version allows you to bind to types from [Azure.Storage.Queues].

This extension is available by installing the [Microsoft.Azure.WebJobs.Extensions.Storage.Queues NuGet package](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Storage.Queues), version 5.x.

Using the .NET CLI:

```dotnetcli
dotnet add package Microsoft.Azure.WebJobs.Extensions.Storage.Queues
``` 


> **Note:**
> Azure Blobs, Azure Queues, and Azure Tables now use separate extensions and are referenced individually. For example, to use the triggers and bindings for all three services in your .NET in-process app, you should add the following packages to your project:
>
> - [Microsoft.Azure.WebJobs.Extensions.Storage.Blobs]
> - [Microsoft.Azure.WebJobs.Extensions.Storage.Queues]
> - [Microsoft.Azure.WebJobs.Extensions.Tables]
> 
> Previously, the extensions shipped together as [Microsoft.Azure.WebJobs.Extensions.Storage, version 4.x]. This same package also has a [5.x version], which references the split packages for blobs and queues only. When upgrading your package references from older versions, you may therefore need to additionally reference the new [Microsoft.Azure.WebJobs.Extensions.Tables] NuGet package. Also, when referencing these newer split packages, make sure you are not referencing an older version of the combined storage package, as this will result in conflicts from two definitions of the same bindings. 

[Microsoft.Azure.WebJobs.Extensions.Storage.Blobs]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Storage.Blobs
[Microsoft.Azure.WebJobs.Extensions.Storage.Queues]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Storage.Queues
[Microsoft.Azure.WebJobs.Extensions.Tables]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Tables
[Microsoft.Azure.WebJobs.Extensions.Storage, version 4.x]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Storage/4.0.5
[5.x version]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Storage/5.0.0


# [Extensions 3.x and 4.x](#tab/functionsv2/in-process)

<a name="functions-2x-and-higher"></a>

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 2.x._

Working with the trigger and bindings requires that you reference the appropriate NuGet package. Install the [NuGet package], version 3.x or 4.x.

# [Extension 5.x+](#tab/extensionv5/isolated-process)


This version introduces the ability to [connect using an identity instead of a secret](manage-connections.md?tabs=identity#define-connections). For a tutorial on configuring your function apps with managed identities, see the [creating a function app with identity-based connections tutorial](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-identity-based-connections-tutorial.md). 

This version allows you to bind to types from [Azure.Storage.Queues](https://learn.microsoft.com/dotnet/api/azure.storage.queues).

This version supports configuration of triggers and bindings through [Aspire integration](aspire-integration.md#connection-configuration-with-aspire).

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues), version 5.x.


Using the .NET CLI:

```dotnetcli
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues
``` 


> **Note:**
>  Azure Blobs, Azure Queues, and Azure Tables now use separate extensions and are referenced individually. For example, to use the triggers and bindings for all three services in your .NET isolated-process app, you should add the following packages to your project:
>
> - [Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs]
> - [Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues]
> - [Microsoft.Azure.Functions.Worker.Extensions.Tables]
>
> Previously, the extensions shipped together as [Microsoft.Azure.Functions.Worker.Extensions.Storage, version 4.x]. This same package also has a [5.x version], which references the split packages for blobs and queues only. When upgrading your package references from older versions, you may therefore need to additionally reference the new [Microsoft.Azure.Functions.Worker.Extensions.Tables] NuGet package. Also, when referencing these newer split packages, make sure you are not referencing an older version of the combined storage package, as this will result in conflicts from two definitions of the same bindings. 

[Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs
[Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues
[Microsoft.Azure.Functions.Worker.Extensions.Tables]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Tables


[Microsoft.Azure.Functions.Worker.Extensions.Storage, version 4.x]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage/4.0.4
[5.x version]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage/5.0.0


# [Extension 4.x](#tab/functionsv2/isolated-process)

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage/), version 4.x.

---



**Applies to: programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-java,programming-language-powershell**


 
## Install bundle

To be able to use this binding extension in your app, make sure that the *host.json* file in the root of your project contains this `extensionBundle` reference:


```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[4.0.0, 5.0.0)"
    }
}
```

In this example, the `version` value of `[4.0.0, 5.0.0)` instructs the Functions host to use a bundle version that is at least `4.0.0` but less than `5.0.0`, which includes all potential versions of 4.x. This notation effectively maintains your app on the latest available minor version of the v4.x extension bundle. 

When possible, you should use the latest extension bundle major version and allow the runtime to automatically maintain the latest minor version. You can view the contents of the latest bundle on the [extension bundles release page](https://github.com/Azure/azure-functions-extension-bundles/releases/latest). For more information, see [Azure Functions extension bundles](extension-bundles.md).




**Applies to: programming-language-go**

Go isn't currently supported for this feature.


**Applies to: programming-language-csharp**


## Binding types

The binding types supported for .NET depend on both the extension version and C# execution mode, which can be one of the following: 
   
# [Isolated worker model](#tab/isolated-process)

An isolated worker process class library compiled C# function runs in a process isolated from the runtime.  
   
# [In-process model](#tab/in-process)

An in-process class library is a compiled C# function runs in the same process as the Functions runtime.
 
---

Choose a version to see binding type details for the mode and version.

# [Extension 5.x+](#tab/extensionv5/in-process)

The Azure Queues extension supports parameter types according to the table below.

 | Binding scenario | Parameter types |
| --- | --- |
| Queue trigger | [QueueMessage]<br/>JSON serializable types<sup>1</sup><br/>`string`<br/>`byte[]`<br/>[BinaryData] |
| Queue output (single message) | [QueueMessage]<br/>JSON serializable types<sup>1</sup><br/>`string`<br/>`byte[]`<br/>[BinaryData] |
| Queue output (multiple messages) | [QueueClient]<br/>`ICollector<T>` or `IAsyncCollector<T>` where `T` is one of the single message types |

<sup>1</sup> Messages containing JSON data can be deserialized into known plain-old CLR object (POCO) types.

# [Extensions 3.x and 4.x](#tab/functionsv2/in-process)

Earlier versions of the extension exposed types from the now deprecated [Microsoft.Azure.Storage.Queues] namespace. Newer types from [Azure.Storage.Queues] are exclusive to **Extension 5.x+**.

This version of the extension supports parameter types according to the table below.

 | Binding scenario | Parameter types |
| --- | --- |
| Queue trigger | [CloudQueueMessage]<br/>JSON serializable types<sup>1</sup><br/>`string`<br/>`byte[]` |
| Queue output | [CloudQueueMessage]<br/>JSON serializable types<sup>1</sup><br/>`string`<br/>`byte[]`<br/>[CloudQueue] |

<sup>1</sup> Messages containing JSON data can be deserialized into known plain-old CLR object (POCO) types.

# [Extension 5.x+](#tab/extensionv5/isolated-process)

The isolated worker process supports parameter types according to the tables below. Support for binding to types from [Azure.Storage.Queues] is in preview.

**Queue trigger**


The queue trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The message content as a string. Use when the message is simple text.. |
| `byte[]` | The bytes of the message. |
| JSON serializable types | When a queue message contains JSON data, Functions tries to deserialize the JSON data into a plain-old CLR object (POCO) type. |
| [QueueMessage]<sup>1</sup> | The message. |
| [BinaryData]<sup>1</sup> | The bytes of the message. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues 5.2.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues/5.2.0) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[QueueMessage]: https://learn.microsoft.com/dotnet/api/azure.storage.queues.models.queuemessage
[BinaryData]: https://learn.microsoft.com/dotnet/api/system.binarydata

**Queue output binding**


When you want the function to write a single message, the queue output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The message content as a string. Use when the message is simple text. |
| `byte[]` | The bytes of the message. |
| JSON serializable types | An object representing the content of a JSON message. Functions tries to serialize a plain-old CLR object (POCO) type into JSON data. |

When you want the function to write multiple messages, the queue output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is one of the single message types | An array containing content for multiple messages. Each entry represents one message. |

For other output scenarios, create and use a [QueueClient] with other types from [Azure.Storage.Queues] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Azure.Storage.Queues]: https://learn.microsoft.com/dotnet/api/azure.storage.queues
[QueueClient]: https://learn.microsoft.com/dotnet/api/azure.storage.queues.queueclient


# [Extension 4.x](#tab/functionsv2/isolated-process)

Earlier versions of extensions in the isolated worker process only support binding to string types. Additional options are available to the **Extension 5.x**.

---

[QueueMessage]: https://learn.microsoft.com/dotnet/api/azure.storage.queues.models.queuemessage
[QueueClient]: https://learn.microsoft.com/dotnet/api/azure.storage.queues.queueclient
[BinaryData]: https://learn.microsoft.com/dotnet/api/system.binarydata

[CloudQueueMessage]: https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.queue.cloudqueuemessage
[CloudQueue]: https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.queue.cloudqueue




## <a name="host-json"></a>host.json settings


This section describes the configuration settings available for this binding in version 2.x and later. Settings in the host.json file apply to all functions in a function app instance. For more information about function app configuration settings, see [host.json reference for Azure Functions](functions-host-json.md).

```json
{
    "version": "2.0",
    "extensions": {
        "queues": {
            "maxPollingInterval": "00:00:02",
            "visibilityTimeout" : "00:00:30",
            "batchSize": 16,
            "maxDequeueCount": 5,
            "newBatchThreshold": 8,
            "messageEncoding": "base64"
        }
    }
}
```

| Property | Default | Description |
| --- | --- | --- |
| maxPollingInterval | 00:01:00 | The maximum interval between queue polls. The minimum interval is 00:00:00.100 (100 ms). Intervals increment up to `maxPollingInterval`. The default value of `maxPollingInterval` is 00:01:00 (1 min). `maxPollingInterval` must not be less than 00:00:00.100 (100 ms). The data type is a `TimeSpan`. |
| visibilityTimeout | 00:00:00 | The time interval between retries when processing of a message fails. |
| batchSize | 16 | The number of queue messages that the Functions runtime retrieves simultaneously and processes in parallel. When the number being processed gets down to the `newBatchThreshold`, the runtime gets another batch and starts processing those messages. So the maximum number of concurrent messages being processed per function is `batchSize` plus `newBatchThreshold`. This limit applies separately to each queue-triggered function. <br><br>If you want to avoid parallel execution for messages received on one queue, you can set `batchSize` to 1. However, this setting eliminates concurrency as long as your function app runs only on a single virtual machine (VM). If the function app scales out to multiple VMs, each VM could run one instance of each queue-triggered function.<br><br>The maximum `batchSize` is 32. |
| maxDequeueCount | 5 | The number of times to try processing a message before moving it to the poison queue. |
| newBatchThreshold | N*batchSize/2 | Whenever the number of messages being processed concurrently gets down to this number, the runtime retrieves another batch.<br><br>`N` represents the number of vCPUs available when running on App Service or Premium Plans. Its value is `1` for the Consumption Plan. |
| messageEncoding | base64 | The encoding format for messages. Valid values are `base64` and `none`. |

**Applies to: programming-language-csharp**

> **Note:**
> The `messageEncoding` setting is only available in [Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues) NuGet package version 5.x+.  

**Applies to: programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-java,programming-language-powershell**

> **Note:**
> The `messageEncoding` setting is only available in [extension bundle](extension-bundles.md) version 4.x and higher.  


## Next steps

- [Run a function as queue storage data changes (Trigger)](functions-bindings-storage-queue-trigger.md)
- [Write queue storage messages (Output binding)](functions-bindings-storage-queue-output.md)
 
[NuGet package]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Storage
[Update your extensions]: functions-bindings-register.md

[Azure.Storage.Queues]: https://learn.microsoft.com/dotnet/api/azure.storage.queues
[Microsoft.Azure.Storage.Queues]: https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.queue

[C# scripting]: functions-reference-csharp.md
