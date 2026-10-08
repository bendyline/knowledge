---
title: Azure Cosmos DB bindings for Functions
description: Understand how to use Azure Cosmos DB triggers and bindings in Azure Functions.
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

# Azure Cosmos DB trigger and bindings for Azure Functions overview

This set of articles explains how to work with [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/serverless-computing-database) bindings in Azure Functions. Azure Functions supports trigger, input, and output bindings for Azure Cosmos DB. For an end-to-end scenario that uses the Azure Cosmos DB extension, see [Quickstart: Respond to database changes in Azure Cosmos DB using Azure Functions](scenario-database-changes-azure-cosmosdb.md).

| Action | Type |
| --- | --- |
| Run a function when an Azure Cosmos DB document is created or modified | [Trigger](functions-bindings-cosmosdb-v2-trigger.md) |
| Read an Azure Cosmos DB document | [Input binding](functions-bindings-cosmosdb-v2-input.md) |
| Save changes to an Azure Cosmos DB document | [Output binding](functions-bindings-cosmosdb-v2-output.md) |

> **Important:**
> This version of the Azure Cosmos DB binding extension supports [Azure Functions version 4.x](functions-versions.md). If your app still uses version 1.x of the Functions runtime, instead see [Azure Cosmos DB bindings for Azure Functions 1.x](functions-bindings-cosmosdb.md).

## Supported APIs


This table indicates how to connect to the various Azure Cosmos DB APIs from your function code:

| API | Recommendation |
| --- | --- |
| [Azure Cosmos DB for NoSQL](https://learn.microsoft.com/azure/cosmos-db/nosql/) | Use the [Azure Cosmos DB binding extension](functions-bindings-cosmosdb-v2.md) |
| [Azure DocumentDB](https://learn.microsoft.com/azure/documentdb/) | [Use a native client SDK](https://learn.microsoft.com/azure/cosmos-db/mongodb/how-to-dotnet-get-started). |
| [Azure Cosmos DB for MongoDB](https://learn.microsoft.com/azure/cosmos-db/mongodb/) | [Use a native client SDK](https://learn.microsoft.com/azure/cosmos-db/mongodb/how-to-dotnet-get-started). |
| [Azure Cosmos DB for Table](https://learn.microsoft.com/azure/cosmos-db/table/) | Use version 5.x or later of the [Azure Tables binding extension](functions-bindings-storage-table.md). |
| [Azure Cosmos DB for Apache Cassandra](https://learn.microsoft.com/azure/cosmos-db/cassandra) | [Use a native client SDK](https://learn.microsoft.com/azure/cosmos-db/postgresql/howto-connect). |
| [Azure Cosmos DB for Apache Gremlin (Graph API)](https://learn.microsoft.com/azure/cosmos-db/gremlin/) | [Use a native client SDK](https://learn.microsoft.com/azure/cosmos-db/gremlin/support#compatible-client-libraries) |
| [Azure Cosmos DB for PostgreSQL](https://learn.microsoft.com/azure/cosmos-db/postgresql/) | [Use a native client SDK](https://learn.microsoft.com/azure/cosmos-db/postgresql/howto-connect). |


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

# [Extension 4.x+](#tab/extensionv4/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 4.x._

This version of the Azure Cosmos DB bindings extension introduces the ability to [connect using an identity instead of a secret](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).

This version also changes the types that you can bind to, replacing the types from the v2 SDK `Microsoft.Azure.DocumentDB` with newer types from the v3 SDK [Microsoft.Azure.Cosmos](https://learn.microsoft.com/azure/cosmos-db/sql/sql-api-sdk-dotnet-standard). Learn more about how these new types are different and how to migrate to them from the [SDK migration guide](https://learn.microsoft.com/azure/cosmos-db/migrate-dotnet-v3), [trigger](functions-bindings-cosmosdb-v2-trigger.md), [input binding](functions-bindings-cosmosdb-v2-input.md), and [output binding](functions-bindings-cosmosdb-v2-output.md) examples.

This extension version is available as a [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.CosmosDB), version 4.x.

# [Extension 3.x](#tab/functionsv2/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 2.x or 3.x._

Working with the trigger and bindings requires that you reference the appropriate NuGet package. Install the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.CosmosDB/3.0.10), version 3.x.

# [Extension 4.x+](#tab/extensionv4/isolated-process)

This version of the Azure Cosmos DB bindings extension introduces the ability to [connect using an identity instead of a secret](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.CosmosDB/), version 4.x.

If you're writing your application using F#, you must also configure this extension as part of the app's [startup configuration](dotnet-isolated-process-guide.md#start-up-and-configuration). In the call to `ConfigureFunctionsWorkerDefaults()` or `ConfigureFunctionsWebApplication()`, add a delegate that takes an `IFunctionsWorkerApplication` parameter. Then within the body of that delegate, call `ConfigureCosmosDBExtension()` on the object:

```fsharp
let hostBuilder = new HostBuilder()
hostBuilder.ConfigureFunctionsWorkerDefaults(fun (context: HostBuilderContext) (appBuilder: IFunctionsWorkerApplicationBuilder) ->
    appBuilder.ConfigureCosmosDBExtension() |> ignore
) |> ignore
```

# [Extension 3.x](#tab/functionsv2/isolated-process)

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.CosmosDB/), version 3.x.

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


**Applies to: programming-language-java**

Because of schema changes in the Azure Cosmos DB SDK, version 4.x of the Azure Cosmos DB extension requires [azure-functions-java-library V3.0.0](https://central.sonatype.com/artifact/com.microsoft.azure.functions/azure-functions-java-library/3.0.0) for Java functions. 



**Applies to: programming-language-go**

Register Azure Cosmos DB triggers in code by using `app.CosmosDB()`. Azure Cosmos DB input and output bindings aren't currently supported by the Go worker; use the Azure SDK for Go directly when you need to read or write documents outside the trigger payload.

**Applies to: programming-language-csharp**


## Binding types

The binding types supported for .NET depend on both the extension version and C# execution mode, which can be one of the following: 
   
# [Isolated worker model](#tab/isolated-process)

An isolated worker process class library compiled C# function runs in a process isolated from the runtime.  

# [In-process model](#tab/in-process)

An in-process class library is a compiled C# function runs in the same process as the Functions runtime.
 
---

Choose a version to see binding type details for the mode and version. 

# [Extension 4.x+](#tab/extensionv4/in-process)

The Azure Cosmos DB extension supports parameter types according to the table below.

| Binding scenario | Parameter types |
|-|-|-| 
| Cosmos DB trigger (single document) | JSON serializable types<sup>1</sup> |
| Cosmos DB trigger (batch of documents) | `IEnumerable<T>`where `T` is a JSON serializable type<sup>1</sup> |
| Cosmos DB input (single document) | JSON serializable types<sup>1</sup><br/> | 
| Cosmos DB input (query returning multiple documents) | [CosmosClient]<br/>`IEnumerable<T>` where `T` is a JSON serializable type<sup>1</sup> |
| Cosmos DB output (single document) | JSON serializable types<sup>1</sup> |
| Cosmos DB output (multiple documents) | `ICollector<T>` or `IAsyncCollector<T>` where `T` is a JSON serializable type<sup>1</sup> |

<sup>1</sup> Documents containing JSON data can be deserialized into known plain-old CLR object (POCO) types.

# [Extension 3.x](#tab/functionsv2/in-process)

Earlier versions of the extension exposed types from the now deprecated [Microsoft.Azure.Documents] namespace. Newer types from [Microsoft.Azure.Cosmos] are exclusive to **extension 4.x and higher**.

# [Extension 4.x+](#tab/extensionv4/isolated-process)

The isolated worker process supports parameter types according to the tables below. Support for binding to types from [Microsoft.Azure.Cosmos]is in preview.

**Cosmos DB trigger**


When you want the function to process a single document, the Cosmos DB trigger can bind to the following types:

| Type | Description |
| --- | --- |
| JSON serializable types | Functions tries to deserialize the JSON data of the document from the Cosmos DB change feed into a plain-old CLR object (POCO) type. |

When you want the function to process a batch of documents, the Cosmos DB trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `IEnumerable<T>`where `T` is a JSON serializable type | An enumeration of entities included in the batch. Each entry represents one document from the Cosmos DB change feed. |


**Cosmos DB input binding**


When you want the function to process a single document, the Cosmos DB input binding can bind to the following types:

| Type | Description |
| --- | --- |
| JSON serializable types | Functions attempts to deserialize the JSON data of the document into a plain-old CLR object (POCO) type. |

When you want the function to process multiple documents from a query, the Cosmos DB input binding can bind to the following types:

| Type | Description |
| --- | --- |
| `IEnumerable<T>`where `T` is a JSON serializable type | An enumeration of entities returned by the query. Each entry represents one document. |
| [CosmosClient]<sup>1</sup> | A client connected to the Cosmos DB account. |
| [Database]<sup>1</sup> | A client connected to the Cosmos DB database. |
| [Container]<sup>1</sup> | A client connected to the Cosmos DB container. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.CosmosDB 4.4.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.CosmosDB/4.4.0) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[CosmosClient]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.cosmosclient
[Database]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.database
[Container]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.container


**Cosmos DB output binding**


When you want the function to write to a single document, the Cosmos DB output binding can bind to the following types:

| Type | Description |
| --- | --- |
| JSON serializable types | An object representing the JSON content of a document. Functions attempts to serialize a plain-old CLR object (POCO) type into JSON data. |

When you want the function to write to multiple documents, the Cosmos DB output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is JSON serializable type | An array containing multiple documents. Each entry represents one document. |

For other output scenarios, create and use a [CosmosClient] with other types from [Microsoft.Azure.Cosmos] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Microsoft.Azure.Cosmos]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos
[CosmosClient]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.cosmosclient


# [Extension 3.x](#tab/functionsv2/isolated-process)

Earlier versions of extensions in the isolated worker process only support binding to JSON serializable types. Additional options are available to **extension 4.x and higher**.

---

[Microsoft.Azure.Cosmos]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos
[CosmosClient]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.cosmosclient
[Database]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.database
[Container]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.container

[Microsoft.Azure.Documents]: https://learn.microsoft.com/dotnet/api/microsoft.azure.documents
[DocumentClient]: https://learn.microsoft.com/dotnet/api/microsoft.azure.documents.client.documentclient



**Applies to: programming-language-python**


## SDK Binding Types

SDK Type support for Azure Cosmos is in Preview. Follow the [Python SDK Bindings for CosmosDB Sample](https://github.com/Azure-Samples/azure-functions-cosmosdb-sdk-bindings-python) to get started with SDK Types for Cosmos in Python. 
> **Important:**  
> Using SDK type bindings requires the [Python v2 programming model](functions-reference-python.md?pivots=python-mode-decorators#sdk-type-bindings).

---
| Binding | Parameter types | Samples |
| --- | --- | --- |
| CosmosDB input | [ContainerProxy],<br/>[CosmosClient],<br/>[DatabaseProxy]<br/> | [`ContainerProxy`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_containerproxy/function_app.py),<br/>[`CosmosClient`](https://github.com/Azure/azure-functions-python-extensions/tree/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_cosmosclient/function_app.py),<br/>[`DatabaseProxy`](https://github.com/Azure/azure-functions-python-extensions/tree/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_databaseproxy/function_app.py)<br/> |

---

[CosmosClient]: https://learn.microsoft.com/python/api/azure-cosmos/azure.cosmos.cosmosclient
[DatabaseProxy]: https://learn.microsoft.com/python/api/azure-cosmos/azure.cosmos.databaseproxy
[ContainerProxy]: https://learn.microsoft.com/python/api/azure-cosmos/azure.cosmos.containerproxy



## Exceptions and return codes

| Binding | Reference |
| --- | --- |
| Azure Cosmos DB | [HTTP status codes for Azure Cosmos DB](https://learn.microsoft.com/rest/api/cosmos-db/http-status-codes-for-cosmosdb) |

<a name="host-json"></a>

## host.json settings


This section describes the configuration settings available for this binding in version 2.x and later. Settings in the host.json file apply to all functions in a function app instance. For more information about function app configuration settings, see [host.json reference for Azure Functions](functions-host-json.md).

# [Extension 4.x+](#tab/extensionv4)

```json
{
    "version": "2.0",
    "extensions": {
        "cosmosDB": {
            "connectionMode": "Gateway",
            "userAgentSuffix": "MyDesiredUserAgentStamp"
        }
    }
}
```

| Property | Default | Description |
| --- | --- | --- |
| **connectionMode** | `Gateway` | The connection mode used by the function when connecting to the Azure Cosmos DB service. Options: `Direct` connects directly to backend replicas over TCP and can provide lower latency, and `Gateway` routes requests through a front-end gateway over HTTPS. For more information, see [Azure Cosmos DB SDK connection modes](https://learn.microsoft.com/azure/cosmos-db/nosql/sdk-connection-modes). |
| **userAgentSuffix** | n/a | Adds the specified string value to all requests made by the trigger or binding to the service. This makes it easier for you to track the activity in Azure Monitor, based on a specific function app and filtering by `User Agent`. |


# [Extension 3.x](#tab/functionsv2)

```json
{
    "version": "2.0",
    "extensions": {
        "cosmosDB": {
            "connectionMode": "Gateway",
            "protocol": "Https",
            "leaseOptions": {
                "leasePrefix": "prefix1"
            }
        }
    }
}
```

| Property | Default | Description |
| --- | --- | --- |
| **connectionMode** | `Gateway` | The connection mode used by the function when connecting to the Azure Cosmos DB service. Options: `Direct` connects directly to backend replicas over TCP and can provide lower latency, and `Gateway` routes requests through a front-end gateway over HTTPS. For more information, see [Azure Cosmos DB SDK connection modes](https://learn.microsoft.com/azure/cosmos-db/nosql/sdk-connection-modes). |
| **protocol** | `Https` | The connection protocol used by the function when connection to the Azure Cosmos DB service. Read [here for an explanation of both modes](https://learn.microsoft.com/azure/cosmos-db/performance-tips#networking). |
| **leasePrefix** | n/a | Lease prefix to use across all functions in an app. |

---

## Next steps

- [Run a function when an Azure Cosmos DB document is created or modified (Trigger)](functions-bindings-cosmosdb-v2-trigger.md)
- [Read an Azure Cosmos DB document (Input binding)](functions-bindings-cosmosdb-v2-input.md)
- [Save changes to an Azure Cosmos DB document (Output binding)](functions-bindings-cosmosdb-v2-output.md)

[extension bundle]: extension-bundles.md
[Update your extensions]: functions-bindings-register.md

[C# scripting]: functions-reference-csharp.md
