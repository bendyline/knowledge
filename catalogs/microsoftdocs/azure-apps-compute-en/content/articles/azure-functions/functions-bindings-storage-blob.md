---
title: Azure Blob storage trigger and bindings for Azure Functions
description: Learn to use the Azure Blob storage trigger and bindings in Azure Functions.
ms.topic: reference
ms.custom:
  - devx-track-extended-java
  - devx-track-js
  - devx-track-python
  - devx-track-ts
  - build-2025
ms.date: 09/15/2026
zone_pivot_groups: programming-languages-set-functions
---

# Azure Blob storage bindings for Azure Functions overview

Azure Functions integrates with [Azure Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/index.yml) via [triggers and bindings](functions-triggers-bindings.md). Integrating with Blob storage allows you to build functions that react to changes in blob data as well as read and write values.

| Action | Type |
| --- | --- |
| Run a function as blob storage data changes | [Trigger](functions-bindings-storage-blob-trigger.md) |
| Read blob storage data in a function | [Input binding](functions-bindings-storage-blob-input.md) |
| Allow a function to write blob storage data | [Output binding](functions-bindings-storage-blob-output.md) |

>**Important:**  
>Blob Storage bindings don't support [Premium Blob storage accounts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-overview.md#types-of-storage-accounts). You should instead use a Standard general-purpose v2 account. 

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

# [Extension 5.x and higher](#tab/extensionv5/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 4.x._


This version introduces the ability to [connect using an identity instead of a secret](manage-connections.md?tabs=identity#define-connections). For a tutorial on configuring your function apps with managed identities, see the [creating a function app with identity-based connections tutorial](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-identity-based-connections-tutorial.md). 

This version allows you to bind to types from [Azure.Storage.Blobs](https://learn.microsoft.com/dotnet/api/azure.storage.blobs). Learn more about how these new types are different from `WindowsAzure.Storage` and `Microsoft.Azure.Storage` and how to migrate to them from the [Azure.Storage.Blobs Migration Guide](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/storage/Azure.Storage.Blobs/AzureStorageNetMigrationV12.md).

This extension is available by installing the [Microsoft.Azure.WebJobs.Extensions.Storage.Blobs NuGet package], version 5.x.

Using the .NET CLI:

```dotnetcli
dotnet add package Microsoft.Azure.WebJobs.Extensions.Storage.Blobs --version 5.0.0
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


# [Earlier extension versions](#tab/functionsv2/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 2.x._

Working with the trigger and bindings requires that you reference the appropriate NuGet package. Install the [Microsoft.Azure.WebJobs.Extensions.Storage NuGet package, version 4.x]. The package is used for .NET class libraries while the extension bundle is used for all other application types.

# [Extension 5.x and higher](#tab/extensionv5/isolated-process)


This version introduces the ability to [connect using an identity instead of a secret](manage-connections.md?tabs=identity#define-connections). For a tutorial on configuring your function apps with managed identities, see the [creating a function app with identity-based connections tutorial](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-identity-based-connections-tutorial.md). 

This version allows you to bind to types from [Azure.Storage.Blobs](https://learn.microsoft.com/dotnet/api/azure.storage.blobs). Learn more about how these new types are different from `WindowsAzure.Storage` and `Microsoft.Azure.Storage` and how to migrate to them from the [Azure.Storage.Blobs Migration Guide](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/storage/Azure.Storage.Blobs/AzureStorageNetMigrationV12.md).

This version supports configuration of triggers and bindings through [Aspire integration](aspire-integration.md#connection-configuration-with-aspire).

Add the extension to your project by installing the [Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs NuGet package], version 5.x or later.

Using the .NET CLI:

```dotnetcli
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs
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


If you're writing your application using F#, you must also configure this extension as part of the app's [startup configuration](dotnet-isolated-process-guide.md#start-up-and-configuration). In the call to `ConfigureFunctionsWorkerDefaults()` or `ConfigureFunctionsWebApplication()`, add a delegate that takes an `IFunctionsWorkerApplication` parameter. Then within the body of that delegate, call `ConfigureBlobStorageExtension()` on the object:

```fsharp
let hostBuilder = new HostBuilder()
hostBuilder.ConfigureFunctionsWorkerDefaults(fun (context: HostBuilderContext) (appBuilder: IFunctionsWorkerApplicationBuilder) ->
    appBuilder.ConfigureBlobStorageExtension() |> ignore
) |> ignore
```

# [Earlier extension versions](#tab/functionsv2/isolated-process)

Add the extension to your project by installing the [Microsoft.Azure.Functions.Worker.Extensions.Storage NuGet package, version 4.x].

---



**Applies to: programming-language-go,programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-java,programming-language-powershell**


 
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

For Go, register Blob Storage triggers in code by using `app.Blob()` and add a blank import for `github.com/azure/azure-functions-golang-worker/triggers/blob`. Blob input and output bindings aren't currently supported by the Go worker; use the Azure SDK for Go directly when you need additional blob operations.


**Applies to: programming-language-csharp**


## Binding types

The binding types supported for .NET depend on both the extension version and C# execution mode, which can be one of the following: 
   
# [Isolated worker model](#tab/isolated-process)

An isolated worker process class library compiled C# function runs in a process isolated from the runtime.  
   
# [In-process model](#tab/in-process)

An in-process class library is a compiled C# function runs in the same process as the Functions runtime.
 
---

Choose a version to see binding type details for the mode and version. 

# [Extension 5.x and higher](#tab/extensionv5/in-process)

The Azure Blobs extension supports parameter types according to the table below.

| Binding scenario | Parameter types |
|-|-|-| 
| Blob trigger | [Stream]<br/>`TextReader`<br/>`string`<br/>`byte[]`<br/>[BinaryData]<br/>[BlobClient]<sup>1</sup><br/>[BlockBlobClient]<sup>1</sup><br/>[PageBlobClient]<sup>1</sup><br/>[AppendBlobClient]<sup>1</sup><br/>[BlobBaseClient]<sup>1</sup>|
| Blob input (single blob)| [Stream]<br/>`TextReader`<br/>`string`<br/>`byte[]`<br/>[BinaryData]<br/>[BlobClient]<sup>1</sup><br/>[BlockBlobClient]<sup>1</sup><br/>[PageBlobClient]<sup>1</sup><br/>[AppendBlobClient]<sup>1</sup><br/>[BlobBaseClient]<sup>1</sup>|
| Blob input (multiple blobs from a container)| `IEnumerable<T>` where `T` is one of the single blob input binding types |
| Blob output (single blob) | [Stream]<br/>`TextWriter`<br/>`string`<br/>`byte[]` |
| Blob output (multiple blobs) | `ICollector<T>` or `IAsyncCollector<T>` where `T` is one of the single blob output binding types |

<sup>1</sup> The client types require the `Access` property of the attribute to be set to `FileAccess.ReadWrite`.

For examples using these types, see [the GitHub repository for the extension](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Blobs#examples). Learn more about types from the Azure SDK, how they are different from earlier versions, and how to migrate to them from the [Azure.Storage.Blobs Migration Guide](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/storage/Azure.Storage.Blobs/AzureStorageNetMigrationV12.md).

# [Earlier extension versions](#tab/functionsv2/in-process)

Earlier versions of the extension exposed types from the now deprecated [Microsoft.Azure.Storage.Blob] namespace. Newer types from [Azure.Storage.Blobs] are exclusive to **extension 5.x and higher**.

This version of the Azure Blobs extension supports parameter types according to the table below.

| Binding | Parameter types |
|-|-|-| 
| Blob trigger | [Stream]<br/>`TextReader`<br/>`string`<br/>`byte[]`<br/>[ICloudBlob]<sup>1</sup><br/>[CloudBlockBlob]<sup>1</sup><br/>[CloudPageBlob]<sup>1</sup><br/>[CloudAppendBlob]<sup>1</sup>|
| Blob input | [Stream]<br/>`TextReader`<br/>`string`<br/>`byte[]`<br/>[ICloudBlob]<sup>1</sup><br/>[CloudBlockBlob]<sup>1</sup><br/>[CloudPageBlob]<sup>1</sup><br/>[CloudAppendBlob]<sup>1</sup>|
| Blob output | [Stream]<br/>`TextWriter`<br/>`string`<br/>`byte[]` |

<sup>1</sup> These types require the `Access` property of the attribute to be set to `FileAccess.ReadWrite`.

<sup>2</sup> `IEnumerable<T>` provides an enumeration of blobs in the container. Here, `T` can be any of the other supported types.

# [Extension 5.x and higher](#tab/extensionv5/isolated-process)

The isolated worker process supports parameter types according to the tables below.

**Blob trigger**


The blob trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The blob content as a string. Use when the blob content is simple text. |
| `byte[]` | The bytes of the blob content. |
| JSON serializable types | When a blob contains JSON data, Functions tries to deserialize the JSON data into a plain-old CLR object (POCO) type. |
| [Stream]<sup>1</sup> | An input stream of the blob content. |
| [BlobClient]<sup>1</sup>,<br/>[BlockBlobClient]<sup>1</sup>,<br/>[PageBlobClient]<sup>1</sup>,<br/>[AppendBlobClient]<sup>1</sup>,<br/>[BlobBaseClient]<sup>1</sup> | A client connected to the blob. This set of types offers the most control for processing the blob and can be used to write back to the blob if the connection has sufficient permission. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs 6.0.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs/) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[Stream]: https://learn.microsoft.com/dotnet/api/system.io.stream

[BlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient
[BlockBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient
[PageBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.pageblobclient
[AppendBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.appendblobclient
[BlobBaseClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient


**Blob input binding**


When you want the function to process a single blob, the blob input binding can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The blob content as a string. Use when the blob content is simple text. |
| `byte[]` | The bytes of the blob content. |
| JSON serializable types | When a blob contains JSON data, Functions tries to deserialize the JSON data into a plain-old CLR object (POCO) type. |
| [Stream]<sup>1</sup> | An input stream of the blob content. |
| [BlobClient]<sup>1</sup>,<br/>[BlockBlobClient]<sup>1</sup>,<br/>[PageBlobClient]<sup>1</sup>,<br/>[AppendBlobClient]<sup>1</sup>,<br/>[BlobBaseClient]<sup>1</sup> | A client connected to the blob. This set of types offers the most control for processing the blob and can be used to write back to it if the connection has sufficient permission. |

When you want the function to process multiple blobs from a container, the blob input binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` or `List<T>` where `T` is one of the single blob input binding types | An array or list of multiple blobs. Each entry represents one blob from the container. You can also bind to any interfaces implemented by these types, such as `IEnumerable<T>`. |
| [BlobContainerClient]<sup>1</sup> | A client connected to the container. This type offers the most control for processing the container and can be used to write to it if the connection has sufficient permission. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs 6.0.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs/6.0.0) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[Stream]: https://learn.microsoft.com/dotnet/api/system.io.stream

[BlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient
[BlockBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient
[PageBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.pageblobclient
[AppendBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.appendblobclient
[BlobBaseClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient
[BlobContainerClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient


**Blob output binding**


When you want the function to write to a single blob, the blob output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The blob content as a string. Use when the blob content is simple text. |
| `byte[]` | The bytes of the blob content. |
| JSON serializable types | An object representing the content of a JSON blob. Functions attempts to serialize a plain-old CLR object (POCO) type into JSON data. |

When you want the function to write to multiple blobs, the blob output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is one of the single blob output binding types | An array containing content for multiple blobs. Each entry represents the content of one blob. |

For other output scenarios, create and use a [BlobClient] or [BlobContainerClient] with other types from [Azure.Storage.Blobs] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Azure.Storage.Blobs]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs
[BlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient
[BlobContainerClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient


# [Earlier extension versions](#tab/functionsv2/isolated-process)

Earlier versions of extensions in the isolated worker process only support binding to string parameters. Additional options are available to **extension 5.x and higher**.

---

[Stream]: https://learn.microsoft.com/dotnet/api/system.io.stream
[BinaryData]: https://learn.microsoft.com/dotnet/api/system.binarydata

[Azure.Storage.Blobs]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs
[BlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient
[BlockBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient
[PageBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.pageblobclient
[AppendBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.appendblobclient
[BlobBaseClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient
[BlobContainerClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient

[Microsoft.Azure.Storage.Blob]: https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.blob
[ICloudBlob]: https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.blob.icloudblob
[CloudBlockBlob]: https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.blob.cloudblockblob
[CloudPageBlob]: https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.blob.cloudpageblob
[CloudAppendBlob]: https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.blob.cloudappendblob




**Applies to: programming-language-python**


## SDK Binding Types

SDK Types for Azure Storage Blob are generally available! Follow the [Python SDK Bindings for Blob Sample](https://github.com/Azure-Samples/azure-functions-blob-sdk-bindings-python) to get started with SDK Types for Blob in Python. 
> **Important:**  
> Using SDK type bindings requires the [Python v2 programming model](functions-reference-python.md?pivots=python-mode-decorators#sdk-type-bindings).

---
| Binding | Parameter types | Samples |
| --- | --- | --- |
| Blob trigger | [BlobClient],<br/>[ContainerClient],<br/>[StorageStreamDownloader]<br/> | [`BlobClient`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_blobclient/function_app.py),<br/>[`ContainerClient`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_containerclient/function_app.py),<br/>[`StorageStreamDownloader`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_storagestreamdownloader/function_app.py) |
| Blob input | [BlobClient],<br/>[ContainerClient],<br/>[StorageStreamDownloader]<br/> | [`BlobClient`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_blobclient/function_app.py),<br/>[`ContainerClient`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_containerclient/function_app.py),<br/>[`StorageStreamDownloader`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_storagestreamdownloader/function_app.py) |

---

[BlobClient]: https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient
[ContainerClient]: https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient
[StorageStreamDownloader]: https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.storagestreamdownloader



## host.json settings

This section describes the function app configuration settings available for functions that use this binding. These settings only apply when using extension version 5.0.0 and higher. The example host.json file below contains only the version 2.x+ settings for this binding. For more information about function app configuration settings in versions 2.x and later versions, see [host.json reference for Azure Functions](functions-host-json.md).

> **Note:**
> This section doesn't apply to extension versions before 5.0.0. For those earlier versions, there aren't any function app-wide configuration settings for blobs.

```json
{
    "version": "2.0",
    "extensions": {
        "blobs": {
            "maxDegreeOfParallelism": 4,
            "poisonBlobThreshold": 1
        }
    }
}
```

| Property | Default | Description |
| --- | --- | --- |
| maxDegreeOfParallelism | 8 * (the number of available cores) | The integer number of concurrent invocations allowed for all blob-triggered functions in a given function app. The minimum allowed value is 1. |
| poisonBlobThreshold | 5 | The integer number of times to try processing a message before moving it to the poison queue. The minimum allowed value is 1. |

## Next steps

- [Run a function when blob storage data changes](functions-bindings-storage-blob-trigger.md)
- [Read blob storage data when a function runs](functions-bindings-storage-blob-input.md)
- [Write blob storage data from a function](functions-bindings-storage-blob-output.md)

[core tools]: functions-run-local.md
[Microsoft.Azure.WebJobs.Extensions.Storage.Blobs NuGet package]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Storage.Blobs
[Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs NuGet package]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs
[Microsoft.Azure.WebJobs.Extensions.Storage NuGet package, version 4.x]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Storage/4.0.5
[Microsoft.Azure.Functions.Worker.Extensions.Storage NuGet package, version 4.x]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage/4.0.4
[Update your extensions]: functions-bindings-register.md
[Azure Tools extension]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack


[C# scripting]: functions-reference-csharp.md
