---
title: Azure Tables bindings for Azure Functions
description: Understand how to use Azure Tables bindings in Azure Functions.
ms.topic: reference
ms.date: 09/15/2026
ms.custom: devx-track-csharp, devx-track-python, devx-track-extended-java, devx-track-js
zone_pivot_groups: programming-languages-set-functions-lang-workers
---
 
# Azure Tables bindings for Azure Functions

Azure Functions integrates with [Azure Tables](https://learn.microsoft.com/azure/cosmos-db/table/introduction) via [triggers and bindings](functions-triggers-bindings.md). Integrating with Azure Tables allows you to build functions that read and write data using [Azure Cosmos DB for Table](https://learn.microsoft.com/azure/cosmos-db/table/introduction) and [Azure Table Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/tables/table-storage-overview.md).

| Action | Type |
| --- | --- |
| Read table data in a function | [Input binding](functions-bindings-storage-table-input.md) |
| Allow a function to write table data | [Output binding](functions-bindings-storage-table-output.md) |

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

The process for installing the extension varies depending on the extension version:

<a name="storage-extension"></a>
<a name="table-api-extension"></a>

# [Azure Tables extension](#tab/table-api/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 4.x._


This version introduces the ability to [connect using an identity instead of a secret](manage-connections.md?tabs=identity#define-connections). For a tutorial on configuring your function apps with managed identities, see the [creating a function app with identity-based connections tutorial](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-identity-based-connections-tutorial.md). 

This version allows you to bind to types from [`Azure.Data.Tables`][Azure.Data.Tables]. It also introduces the ability to use Azure Cosmos DB for Table.

This extension is available by installing the [Microsoft.Azure.WebJobs.Extensions.Tables NuGet package][table-api-package] into a project using version 5.x or higher of the extensions for [blobs](functions-bindings-storage-blob.md?tabs=in-process%2Cextensionv5) and [queues](functions-bindings-storage-queue.md?tabs=in-process%2Cextensionv5).

Using the .NET CLI:

```dotnetcli
# Install the Azure Tables extension
dotnet add package Microsoft.Azure.WebJobs.Extensions.Tables

# Update the combined Azure Storage extension (to a version which no longer includes Azure Tables)
dotnet add package Microsoft.Azure.WebJobs.Extensions.Storage
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


# [Combined Azure Storage extension](#tab/storage-extension/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 2.x._

Working with the bindings requires that you reference the appropriate NuGet package. Tables are included in a combined package for Azure Storage. Install the [Microsoft.Azure.WebJobs.Extensions.Storage NuGet package][storage-4.x], version 3.x or 4.x. 

> **Note:**
> Tables have been moved out of this package starting in its 5.x version. You need to instead use version 4.x of the extension NuGet package or additionally include the [Azure Tables extension](#table-api-extension) when using version 5.x.

# [Azure Tables extension](#tab/table-api/isolated-process)


This version introduces the ability to [connect using an identity instead of a secret](manage-connections.md?tabs=identity#define-connections). For a tutorial on configuring your function apps with managed identities, see the [creating a function app with identity-based connections tutorial](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-identity-based-connections-tutorial.md). 

This version allows you to bind to types from [`Azure.Data.Tables`](https://learn.microsoft.com/dotnet/api/azure.data.tables). It also introduces the ability to use Azure Cosmos DB for Table.

This extension is available by installing the [Microsoft.Azure.Functions.Worker.Extensions.Tables NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Tables) into a project using version 5.x or higher of the extensions for [blobs](functions-bindings-storage-blob.md?tabs=isolated-process%2Cextensionv5) and [queues](functions-bindings-storage-queue.md?tabs=isolated-process%2Cextensionv5).

Using the .NET CLI:

```dotnetcli
# Install the Azure Tables extension
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Tables --version 1.0.0

# Update the combined Azure Storage extension (to a version which no longer includes Azure Tables)
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Storage --version 5.0.0
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


If you're writing your application using F#, you must also configure this extension as part of the app's [startup configuration](dotnet-isolated-process-guide.md#start-up-and-configuration). In the call to `ConfigureFunctionsWorkerDefaults()` or `ConfigureFunctionsWebApplication()`, add a delegate that takes an `IFunctionsWorkerApplication` parameter. Then within the body of that delegate, call `ConfigureTablesExtension()` on the object:

```fsharp
let hostBuilder = new HostBuilder()
hostBuilder.ConfigureFunctionsWorkerDefaults(fun (context: HostBuilderContext) (appBuilder: IFunctionsWorkerApplicationBuilder) ->
    appBuilder.ConfigureTablesExtension() |> ignore
) |> ignore
```

# [Combined Azure Storage extension](#tab/storage-extension/isolated-process)

Tables are included in a combined package for Azure Storage. Install the [Microsoft.Azure.Functions.Worker.Extensions.Storage NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage/4.0.4), version 4.x. 

> **Note:**
> Tables have been moved out of this package starting in its 5.x version. You need to instead use version 4.x of the extension NuGet package or additionally include the [Azure Tables extension](#table-api-extension) when using version 5.x.

---



**Applies to: programming-language-javascript,programming-language-python,programming-language-java,programming-language-powershell**


 
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




**Applies to: programming-language-csharp**


## Binding types

The binding types supported for .NET depend on both the extension version and C# execution mode, which can be one of the following: 
   
# [Isolated worker model](#tab/isolated-process)

An isolated worker process class library compiled C# function runs in a process isolated from the runtime.  

# [In-process model](#tab/in-process)

An in-process class library is a compiled C# function runs in the same process as the Functions runtime.
 
---

Choose a version to see binding type details for the mode and version.

# [Azure Tables extension](#tab/table-api/in-process)

The Azure Tables extension supports parameter types according to the table below.

| Binding scenario | Parameter types |
| --- | --- |
| Table input (single entity) | A type deriving from [ITableEntity] |
| Table input (multiple entities from query) | `IEnumerable<T>` where `T` derives from [ITableEntity]<br/>[TableClient] |
| Table output (single entity) | A type deriving from [ITableEntity] |
| Table output (multiple entities) | [TableClient]<br/>`ICollector<T>` or `IAsyncCollector<T>` where `T` implements `ITableEntity` |

# [Combined Azure Storage extension](#tab/storage-extension/in-process)

Earlier versions of the extension exposed types from the now deprecated [Microsoft.Azure.Cosmos.Table] namespace. Newer types from [Azure.Data.Tables] are exclusive to the **Azure Tables extension**.

This version of the extension supports parameter types according to the table below.

| Binding scenario | Parameter types |
| --- | --- |
| Table input | A plain old CLR object (POCO) representing the entity<br/>[CloudTable] |
| Table output | A plain old CLR object (POCO) representing the entity<br/>[CloudTable] |

# [Azure Tables extension](#tab/table-api/isolated-process)

The isolated worker process supports parameter types according to the tables below. Support for binding to types from [Azure.Data.Tables] is in preview.

**Azure Tables input binding**


When working with a single table entity, the Azure Tables input binding can bind to the following types:

| Type | Description |
| --- | --- |
| A JSON serializable type that implements [ITableEntity] | Functions attempts to deserialize the entity into a plain-old CLR object (POCO) type. The type must implement [ITableEntity] or have a string `RowKey` property and a string `PartitionKey` property. |
| [TableEntity]<sup>1</sup> | The entity as a dictionary-like type. |

When working with multiple entities from a query, the Azure Tables input binding can bind to the following types:

| Type | Description |
| --- | --- |
| `IEnumerable<T>` where `T` implements [ITableEntity] | An enumeration of entities returned by the query. Each entry represents one entity. The type `T` must implement [ITableEntity] or have a string `RowKey` property and a string `PartitionKey` property. |
| [TableClient]<sup>1</sup> | A client connected to the table. This offers the most control for processing the table and can be used to write to it if the connection has sufficient permission. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.Tables 1.2.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Tables/1.2.0) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[ITableEntity]: https://learn.microsoft.com/dotnet/api/azure.data.tables.itableentity
[TableClient]: https://learn.microsoft.com/dotnet/api/azure.data.tables.tableclient
[TableEntity]: https://learn.microsoft.com/dotnet/api/azure.data.tables.tableentity


**Azure Tables output binding**


When you want the function to write to a single entity, the Azure Tables output binding can bind to the following types:

| Type | Description |
| --- | --- |
| A JSON serializable type that implements [ITableEntity] | Functions attempts to serialize a plain-old CLR object (POCO) type as the entity. The type must implement [ITableEntity] or have a string `RowKey` property and a string `PartitionKey` property. |

When you want the function to write to multiple entities, the Azure Tables output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is one of the single entity types | An array containing multiple entities. Each entry represents one entity. |

For other output scenarios, create and use a [TableClient] with other types from [Azure.Data.Tables] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Azure.Data.Tables]: https://learn.microsoft.com/dotnet/api/azure.data.tables
[TableClient]: https://learn.microsoft.com/dotnet/api/azure.data.tables.tableclient


# [Combined Azure Storage extension](#tab/storage-extension/isolated-process)

Earlier versions of extensions in the isolated worker process only support binding to plain-old CLR object (POCO) types. Additional options are available to the **Azure Tables extension**.

---

[ITableEntity]: https://learn.microsoft.com/dotnet/api/azure.data.tables.itableentity
[TableClient]: https://learn.microsoft.com/dotnet/api/azure.data.tables.tableclient

[CloudTable]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.table.cloudtable




## Next steps

- [Read table data when a function runs](functions-bindings-storage-table-input.md)
- [Write table data from a function](functions-bindings-storage-table-output.md)

[Azure.Data.Tables]: https://learn.microsoft.com/dotnet/api/azure.data.tables

[Microsoft.Azure.Cosmos.Table]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.table

[storage-4.x]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Storage/4.0.5
[table-api-package]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Tables/


[Update your extensions]: functions-bindings-register.md

[C# scripting]: functions-reference-csharp.md
