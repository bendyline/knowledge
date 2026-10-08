---
title: Triggers and Bindings in Azure Functions
description: Learn how to use triggers and bindings to connect your Azure function to online events and cloud-based services.
ms.topic: concept-article
ms.date: 09/10/2026
ms.custom: devdivchpfy22, devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
zone_pivot_groups: programming-languages-set-functions
ai-usage: ai-assisted
---

# Azure Functions triggers and bindings

In this article, you learn the high-level concepts surrounding triggers and bindings for functions.

Triggers cause a function to run. A trigger defines how a function is invoked, and a function must have exactly one trigger. Triggers can also pass data into your function, as you would with method calls.

Binding to a function is a way of declaratively connecting your functions to other resources. Bindings either pass data into your function (an *input binding*) or enable you to write data out from your function (an *output binding*) by using *binding parameters*. Your function trigger is essentially a special type of input binding.

You can mix and match bindings to suit your function's specific scenario. Bindings are optional, and a function might have one or multiple input and/or output bindings.

Triggers and bindings let you avoid hardcoding access to other services. Your function receives data (for example, the content of a queue message) in function parameters. You send data (for example, to create a queue message) by using the return value of the function.

Consider the following examples of how you could implement functions:

| Example scenario | Trigger | Input binding | Output binding |
| --- | --- | --- | --- |
| A new queue message arrives, which runs a function to write to another queue. | Queue<sup>*</sup> | *None* | Queue<sup>*</sup> |
| A scheduled job reads Azure Blob Storage contents and creates a new Azure Cosmos DB document. | Timer | Blob Storage | Azure Cosmos DB |
| Azure Event Grid is used to read an image from Blob Storage and a document from Azure Cosmos DB to send an email. | Event Grid | Blob Storage and Azure Cosmos DB | SendGrid |

<sup>\*</sup> Represents different queues.

These examples aren't meant to be exhaustive, but they illustrate how you can use triggers and bindings together. For a more comprehensive set of scenarios, see [Azure Functions scenarios](functions-scenarios.md).

> **Tip:**
> Azure Functions doesn't require you to use input and output bindings to connect to Azure services. You can always create an Azure SDK client in your code and use it instead for your data transfers. For more information, see [Connect to services](functions-reference.md#connect-to-services).

## Trigger and binding definitions

The following example shows an HTTP-triggered function with an output binding that writes a message to an Azure Storage queue.

**Applies to: programming-language-csharp**

For C# class library functions, you configure triggers and bindings by decorating methods and parameters with C# attributes. The specific attribute that you apply might depend on the C# runtime model:

### [Isolated worker model](#tab/isolated-process)

You define the HTTP trigger (`HttpTrigger`) on the `Run` method for a function named `HttpExample` that returns a `MultiResponse` object:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-isolated/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-triggers-bindings.md)

This example shows the `MultiResponse` object definition. The object definition returns `HttpResponse` to the HTTP request and writes a message to a storage queue by using a `QueueOutput` binding:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-isolated/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-triggers-bindings.md)

For more information, see the [C# guide for isolated worker models](dotnet-isolated-process-guide.md#methods-recognized-as-functions).

### [In-process model](#tab/in-process)

You define the HTTP trigger (`HttpTrigger`) on the `Run` method for a function named `HttpExample`. This function writes to a storage queue that the `Queue` and `StorageAccount` attributes define on the `msg` parameter:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-triggers-bindings.md)

For more information, see the [C# guide for in-process models](functions-dotnet-class-library.md#methods-recognized-as-functions).

---

Legacy C# script functions use a `function.json` definition file. For more information, see the [Azure Functions C# script (.csx) developer reference](functions-reference-csharp.md).


**Applies to: programming-language-java**

For Java functions, you configure triggers and bindings by annotating specific methods and parameters. You define this HTTP trigger (`@HttpTrigger`) on the `run` method for a function named `HttpExample`. The function writes to a storage queue named `outqueue` that the `@QueueOutput` annotation defines on the `msg` parameter:

[Code reference unavailable in this source snapshot: ~/functions-quickstart-java/functions-add-output-binding-storage-queue/src/main/java/com/function/Function.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-triggers-bindings.md)

For more information, see the [Java developer guide](functions-reference-java.md#triggers-and-annotations).


**Applies to: programming-language-javascript,programming-language-typescript**

The way that you define triggers and bindings for Node.js functions depends on the specific version of Node.js for Azure Functions:

### [v4](#tab/node-v4)

In Node.js for Azure Functions version 4, you configure triggers and bindings by using objects exported from the `@azure/functions` module. For more information, see the [Node.js developer guide](functions-reference-node.md?pivots=nodejs-model-v4#extra-inputs-and-outputs).

### [v3](#tab/node-v3)

In Node.js for Azure Functions version 3, you configure triggers and bindings in a function-specific `function.json` file in the same folder as your code. For more information, see the [Node.js developer guide](functions-reference-node.md?pivots=nodejs-model-v3#extra-inputs-and-outputs).

---



**Applies to: programming-language-javascript**

### [v4](#tab/node-v4)

The exported `app` object's `http` method defines an HTTP trigger. The `storageQueue` method on `output` defines an output binding on this trigger.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/storageQueueOutput1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-triggers-bindings.md)

### [v3](#tab/node-v3)

This example `function.json` file defines the HTTP trigger function that returns an HTTP response and writes to a storage queue:

```json
{
  "bindings": [
    {
      "type": "httpTrigger",
      "direction": "in",
      "authLevel": "function",
      "name": "input"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    },
    {
      "type": "queue",
      "direction": "out",
      "name": "myQueueItem",
      "queueName": "outqueue",
      "connection": "MyStorageConnectionAppSetting"
    }
  ]
}
```

---



**Applies to: programming-language-typescript**

### [v4](#tab/node-v4)

The exported `app` object's `http` method defines an HTTP trigger. The `storageQueue` method on `output` defines an output binding on this trigger.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/storageQueueOutput1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-triggers-bindings.md)

### [v3](#tab/node-v3)

This example `function.json` file defines the HTTP trigger function that returns an HTTP response and writes to a storage queue:

```json
{
  "bindings": [
    {
      "type": "httpTrigger",
      "direction": "in",
      "authLevel": "function",
      "name": "input"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    },
    {
      "type": "queue",
      "direction": "out",
      "name": "myQueueItem",
      "queueName": "outqueue",
      "connection": "MyStorageConnectionAppSetting"
    }
  ]
}
```



**Applies to: programming-language-powershell**

This example `function.json` file defines the function:

[Code reference unavailable in this source snapshot: ~/functions-docs-powershell/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-triggers-bindings.md)

For more information, see the [PowerShell developer guide](functions-reference-powershell.md#bindings).


**Applies to: programming-language-python**

The way that you define the function depends on the version of Python for Azure Functions:

### [v2](#tab/python-v2)

In Python for Azure Functions version 2, you define the function directly in code by using decorators:

[Code reference unavailable in this source snapshot: ~/functions-docs-python-v2/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-triggers-bindings.md)

### [v1](#tab/python-v1)

In Python for Azure Functions version 1, this example `function.json` file defines an HTTP trigger function that returns an HTTP response and writes to a storage queue:

[Code reference unavailable in this source snapshot: ~/functions-docs-powershell/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-triggers-bindings.md)

---



## Binding considerations

- Not all services support both input and output bindings. See your specific binding extension for [specific code examples for bindings](#code-examples-for-bindings).

- Triggers and bindings are defined differently depending on the development language. Make sure to select your language at the [top](#top) of this article.

- Trigger and binding names are limited to alphanumeric characters and `_`, the underscore.

## Task to add bindings to a function

You can connect your function to other services by using input or output bindings. Add a binding by adding its specific definitions to your function. To learn how, see [Add bindings to an existing function in Azure Functions](add-bindings-existing-function.md).

Azure Functions supports multiple bindings, which you must configure correctly. For example, a function can read data from a queue (input binding) and write data to a database (output binding) at the same time.

## Supported bindings

This table shows the triggers and bindings available in Azure Functions:<sup>1</sup>

| Type | Trigger | Input | Output |
| --- | :---: | :---: | :---: |
| [Blob Storage](functions-bindings-storage-blob.md) | ✔ | ✔ | ✔ |
| [Azure Cosmos DB](functions-bindings-cosmosdb-v2.md) | ✔ | ✔ | ✔ |
| [Azure Data Explorer](functions-bindings-azure-data-explorer.md) |  | ✔ | ✔ |
| [Azure SQL](functions-bindings-azure-sql.md) | ✔ | ✔ | ✔ |
| [Dapr](functions-bindings-dapr.md)<sup>3</sup> | ✔ | ✔ | ✔ |
| [Event Grid](functions-bindings-event-grid.md) | ✔ |  | ✔ |
| [Event Hubs](functions-bindings-event-hubs.md) | ✔ |  | ✔ |
| [HTTP and webhooks](functions-bindings-http-webhook.md) | ✔ |  | ✔ |
| [IoT Hub](functions-bindings-event-iot.md) | ✔ |  |  |
| [Kafka](functions-bindings-kafka.md)<sup>2</sup> | ✔ |  | ✔ |
| [Model Context Protocol](functions-bindings-mcp.md) | ✔ |  |  |
| [Queue Storage](functions-bindings-storage-queue.md) | ✔ |  | ✔ |
| [Redis](functions-bindings-cache.md) | ✔ | ✔ | ✔ |
| [RabbitMQ](functions-bindings-rabbitmq.md)<sup>2</sup> | ✔ |  | ✔ |
| [SendGrid](functions-bindings-sendgrid.md) |  |  | ✔ |
| [Service Bus](functions-bindings-service-bus.md) | ✔ |  | ✔ |
| [Azure SignalR Service](functions-bindings-signalr-service.md) | ✔ | ✔ | ✔ |
| [Table Storage](functions-bindings-storage-table.md) |  | ✔ | ✔ |
| [Timer](functions-bindings-timer.md) | ✔ |  |  |
| [Twilio](functions-bindings-twilio.md) |  |  | ✔ |
| [Managed connector](functions-connectors-overview.md) | ✔ |  |  |

1. Register all bindings except HTTP and timer. See [Register Azure Functions binding extensions](functions-bindings-register.md).
1. Triggers aren't supported in the Consumption plan. This binding type requires [runtime-driven triggers](functions-target-based-scaling.md#premium-plan-with-runtime-scale-monitoring-enabled).
1. This binding type is supported in Kubernetes, Azure IoT Edge, and other self-hosted modes only.


For information about which bindings are in preview or are approved for production use, see [Supported languages](supported-languages.md).

Specific versions of binding extensions are supported only while the underlying service SDK is supported. Changes to support in the underlying service SDK version affect the support for the consuming extension.

### Managed connectors

Managed connectors in [Azure Connector Namespace](../connector-namespace/connector-namespace-overview.md) extend the services available through supported bindings. You can use connector triggers and SDK actions to integrate with services such as Microsoft 365, Teams, and SharePoint while Connector Namespace manages webhooks, authentication, and retries. To learn more, see [Use managed connectors in Azure Functions](functions-connectors-overview.md).

## SDK types

Azure Functions binding extensions use Azure service SDKs to connect to Azure services. The specific SDK types used by bindings can affect how you work with the data in your functions. Some bindings support SDK-specific types that provide richer functionality and better integration with the service, while others use more generic types like strings or byte arrays. When available, using SDK-specific types can provide benefits such as better type safety, easier data manipulation, and access to service-specific features.

This table indicates binding extensions that currently support SDK types:

**Applies to: programming-language-csharp**



| Extension | Types | Support level |
| --- | --- | --- |
| [Azure Blob Storage][blob-sdk-types] | `BlobClient`<br/>`BlobContainerClient`<br/>`BlockBlobClient`<br/>`PageBlobClient`<br/>`AppendBlobClient` | Trigger: GA<br/>Input: GA |
| [Azure Cosmos DB][cosmos-sdk-types] | `CosmosClient`<br/>`Database`<br/>`Container` | Input: GA |
| [Azure Event Grid][eventgrid-sdk-types] | `CloudEvent`<br/>`EventGridEvent` | Trigger: GA |
| [Azure Event Hubs][eventhub-sdk-types] | `EventData`<br/>`EventHubProducerClient` | Trigger: GA |
| [Azure Queue Storage][queue-sdk-types] | `QueueClient`<br/>`QueueMessage` | Trigger: GA |
| [Azure Service Bus][servicebus-sdk-types] | `ServiceBusClient`<br/>`ServiceBusReceiver`<br/>`ServiceBusSender`<br/>`ServiceBusMessage` | Trigger: GA |
| [Azure Table Storage][tables-sdk-types] | `TableClient`<br/>`TableEntity` | Input: GA |

Considerations for SDK types:

+ When using [binding expressions](functions-bindings-expressions-patterns.md) that rely on trigger data, SDK types for the trigger itself cannot be used.
+ For output scenarios where you might use an SDK type, create and work with SDK clients directly instead of using an output binding.
+ The Azure Cosmos DB trigger uses the [Azure Cosmos DB change feed](https://learn.microsoft.com/azure/cosmos-db/change-feed) and exposes change feed items as JSON-serializable types. As a result, SDK types aren't supported for this trigger.

[blob-sdk-types]: functions-bindings-storage-blob.md?tabs=isolated-process%2Cextensionv5&pivots=programming-language-csharp#binding-types
[cosmos-sdk-types]: functions-bindings-cosmosdb-v2.md?tabs=isolated-process%2Cextensionv4&pivots=programming-language-csharp#binding-types
[tables-sdk-types]: functions-bindings-storage-table.md?tabs=isolated-process%2Ctable-api&pivots=programming-language-csharp#binding-types
[eventgrid-sdk-types]: functions-bindings-event-grid.md?tabs=isolated-process%2Cextensionv3&pivots=programming-language-csharp#binding-types
[queue-sdk-types]: functions-bindings-storage-queue.md?tabs=isolated-process%2Cextensionv5&pivots=programming-language-csharp#binding-types
[eventhub-sdk-types]: functions-bindings-event-hubs.md?tabs=isolated-process%2Cextensionv5&pivots=programming-language-csharp#binding-types
[servicebus-sdk-types]: functions-bindings-service-bus.md?tabs=isolated-process%2Cextensionv5&pivots=programming-language-csharp#binding-types

For more information, see [SDK types](dotnet-isolated-process-guide.md#sdk-types) in the C# developer guide.

**Applies to: programming-language-python**



| Extension | Types | Support level | Samples |
| --- | --- | --- | --- |
| [Azure Blob Storage](functions-bindings-storage-blob.md) | `BlobClient`<br/>`ContainerClient`<br/>`StorageStreamDownloader` | Trigger: GA<br/>Input: GA | [Quickstart](https://github.com/Azure-Samples/azure-functions-blob-sdk-bindings-python)<br/>[`BlobClient`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_blobclient/function_app.py)<br/>[`ContainerClient`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_containerclient/function_app.py)<br/>[`StorageStreamDownloader`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_storagestreamdownloader/function_app.py) |
| [Azure Cosmos DB](functions-bindings-cosmosdb-v2.md) | `CosmosClient`<br/>`DatabaseProxy`<br/>`ContainerProxy` | Input: preview | [Quickstart](https://github.com/Azure-Samples/azure-functions-cosmosdb-sdk-bindings-python)<br/> [`ContainerProxy`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_containerproxy/function_app.py)<br/>[`CosmosClient`](https://github.com/Azure/azure-functions-python-extensions/tree/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_cosmosclient/function_app.py)<br/>[`DatabaseProxy`](https://github.com/Azure/azure-functions-python-extensions/tree/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_databaseproxy/function_app.py) |
| [Azure Event Hubs](functions-bindings-event-hubs.md) | `EventData` | Trigger: preview | [Quickstart](https://github.com/Azure-Samples/azure-functions-eventhub-sdk-bindings-python)<br/> [`EventData`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-eventhub/samples/eventhub_samples_eventdata/function_app.py) |
| [Azure Service Bus](functions-bindings-service-bus.md) | `ServiceBusReceivedMessage` | Trigger: preview | [Quickstart](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-servicebus/samples/README.md)<br/> [`ServiceBusReceivedMessage`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-servicebus/samples/servicebus_samples_single/function_app.py) |

Considerations for SDK types:

+ For output scenarios where you might use an SDK type, create and work with SDK clients directly instead of using an output binding.
+ The Azure Cosmos DB trigger uses the [Azure Cosmos DB change feed](https://learn.microsoft.com/azure/cosmos-db/change-feed) and exposes change feed items as JSON-serializable types. As a result, SDK types aren't supported for this trigger.


SDK types are supported only when using the Python v2 programming model. For more information, see [SDK type bindings](functions-reference-python.md#sdk-type-bindings) in the Python developer guide.

**Applies to: programming-language-javascript,programming-language-typescript**


| Extension | Types | Support level |
| --- | --- | --- |
| [Azure Blob Storage](functions-bindings-storage-blob.md) | `BlobClient`<br/>`ContainerClient`<br/>`ReadableStream` | Preview |
| [Azure Service Bus](functions-bindings-service-bus.md) | `ServiceBusClient`<br/>`ServiceBusReceiver`<br/>`ServiceBusSender`<br/>`ServiceBusMessage` | Preview |

SDK types are supported only when using the Node v4 programming model. For more information, see [SDK types](#sdk-types) in the Node.js developer guide.

**Applies to: programming-language-java**


| Extension | Types | Support level |
| --- | --- | --- |
| [Azure Blob Storage](functions-bindings-storage-blob.md) | `BlobClient`<br/>`BlobContainerClient` | Preview |

For more information, see [SDK types](functions-reference-java.md#sdk-types) in the Java developer guide.

**Applies to: programming-language-powershell**

>**Important:**  
>SDK types aren't currently supported for PowerShell apps.


**Applies to: programming-language-go**

Go supports SDK client injection for triggers that provide Azure SDK clients. During the public preview, Blob Storage triggers can receive an authenticated Azure SDK `*blob.Client` directly in the handler.

| Extension | Types | Support level |
| --- | --- | --- |
| [Azure Blob Storage](functions-bindings-storage-blob.md) | `*blob.Client` | Preview |

For more information, see [Extension triggers](functions-reference-go.md#extension-triggers) in the Go developer reference.


**Applies to: programming-language-python**


## Agent bindings


> **Important:**
> Agent bindings for Python function apps are currently in preview. Features, package names, and configuration can change before general availability.

Agent bindings let you inject an `Agent` object into a Python function while retaining standard Azure Functions triggers, bindings, and application logic. Use agent bindings when part of a function workflow benefits from agentic reasoning but your function code must remain in control of execution.

Agent bindings also support Durable Functions orchestrations. The replay-safe `context.call_agent()` API runs agent operations in an activity so that orchestration replay remains deterministic.

Agent bindings are available for the Python v2 programming model. For more information, see [Agent bindings for Python function apps](functions-agent-bindings.md).



## Code examples for bindings

Use the following table to find more examples of specific binding types that show you how to work with bindings in your functions. First, choose the language tab that corresponds to your project.


**Applies to: programming-language-csharp**

Binding code for C# depends on the [specific process model](dotnet-isolated-process-guide.md#benefits-of-the-isolated-worker-model).

### [Isolated process](#tab/isolated-process)

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-storage-blob-input.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-storage-blob-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Blobs) |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-csharp#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-csharp#examples) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-csharp) |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-azure-sql-input.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-azure-sql-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://learn.microsoft.com/samples/azure-samples/azure-sql-binding-func-dotnet-todo/todo-backend-dotnet-azure-sql-bindings-azure-functions/) |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-event-grid-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-event-hubs-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-dotnet-azd) |
| Model Context Protocol | [Tool Trigger](functions-bindings-mcp-tool-trigger.md?tabs=attribute\&pivots=programming-language-csharp#example)<br/>[Resource Trigger](functions-bindings-mcp-resource-trigger.md?tabs=attribute\&pivots=programming-language-csharp#example)<br/>[Prompt Trigger](functions-bindings-mcp-prompt-trigger.md?tabs=attribute\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-storage-queue-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Queues/samples/functionapp) |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-rabbitmq-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?tabs=isolated-process\&pivots=programming-language-csharp#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-service-bus-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/servicebus/Microsoft.Azure.WebJobs.Extensions.ServiceBus) |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-signalr-service-input.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-signalr-service-output.md?tabs=isolated-process\&pivots=programming-language-csharp) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?tabs=isolated-process\&pivots=programming-language-csharp)<br/>[Output](functions-bindings-storage-table-output.md?tabs=isolated-process\&pivots=programming-language-csharp) |  |
| Timer | [Trigger](functions-bindings-timer.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Twilio | [Output](functions-bindings-twilio.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Managed connectors | [Trigger](functions-connectors-overview.md?pivots=programming-language-csharp#connector-based-triggers) | [Link](https://github.com/Azure-Samples/functions-connectors-net) |


### [In-process](#tab/in-process)

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-storage-blob-input.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-storage-blob-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Blobs) |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-csharp#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-csharp#examples) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-csharp) |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-azure-sql-input.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-azure-sql-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://learn.microsoft.com/samples/azure-samples/azure-sql-binding-func-dotnet-todo/todo-backend-dotnet-azure-sql-bindings-azure-functions/) |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-event-grid-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-event-hubs-output.md?tabs=in-process\&pivots=programming-language-csharp#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?tabs=in-process\&pivots=programming-language-csharp#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-dotnet-azd) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-storage-queue-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Queues/samples/functionapp) |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-rabbitmq-output.md?tabs=in-process\&pivots=programming-language-csharp#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?tabs=in-process\&pivots=programming-language-csharp#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-service-bus-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/servicebus/Microsoft.Azure.WebJobs.Extensions.ServiceBus) |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-signalr-service-input.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-signalr-service-output.md?tabs=in-process\&pivots=programming-language-csharp) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?tabs=in-process\&pivots=programming-language-csharp)<br/>[Output](functions-bindings-storage-table-output.md?tabs=in-process\&pivots=programming-language-csharp) |  |
| Timer | [Trigger](functions-bindings-timer.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Twilio | [Output](functions-bindings-twilio.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |

---


**Applies to: programming-language-java**

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?pivots=programming-language-java#example)<br/>[Input](functions-bindings-storage-blob-input.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-storage-blob-output.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?pivots=programming-language-java#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/java-functions-eventhub-cosmosdb) |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-java#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-java#examples) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-java) |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?pivots=programming-language-java#example)<br/>[Input](functions-bindings-azure-sql-input.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-azure-sql-output.md?pivots=programming-language-java#example) |  |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-event-grid-output.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-event-hubs-output.md?pivots=programming-language-java#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?pivots=programming-language-java#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?pivots=programming-language-java#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| Model Context Protocol | [Tool Trigger](functions-bindings-mcp-tool-trigger.md?tabs=attribute\&pivots=programming-language-java#example)<br/>[Resource Trigger](functions-bindings-mcp-resource-trigger.md?tabs=attribute\&pivots=programming-language-java#example)<br/>[Prompt Trigger](functions-bindings-mcp-prompt-trigger.md?tabs=attribute\&pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/remote-mcp-functions-java) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-storage-queue-output.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-rabbitmq-output.md?pivots=programming-language-java#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?pivots=programming-language-java#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-service-bus-output.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?pivots=programming-language-java#example)<br/>[Input](functions-bindings-signalr-service-input.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-signalr-service-output.md?pivots=programming-language-java) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?pivots=programming-language-java)<br/>[Output](functions-bindings-storage-table-output.md?pivots=programming-language-java) |  |
| Timer | [Trigger](functions-bindings-timer.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| Twilio | [Output](functions-bindings-twilio.md?pivots=programming-language-java#example) |  |

**Applies to: programming-language-javascript,programming-language-typescript**

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?pivots=programming-language-javascript#example)<br/>[Input](functions-bindings-storage-blob-input.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-storage-blob-output.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure-Samples/azure-functions-blob-sdk-bindings-nodejs) |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?pivots=programming-language-javascript#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure-Samples/functions-docs-javascript/tree/master/functions-add-output-binding-cosmosdb-cli-v4-programming-model) |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-javascript#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-javascript#examples) |  |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?pivots=programming-language-javascript#example)<br/>[Input](functions-bindings-azure-sql-input.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-azure-sql-output.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-node) |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-event-grid-output.md?pivots=programming-language-javascript#example) |  |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-event-hubs-output.md?pivots=programming-language-javascript#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?pivots=programming-language-javascript#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure-Samples/functions-docs-javascript/tree/master/functions-typescript) |
| Model Context Protocol | [Tool Trigger](functions-bindings-mcp-tool-trigger.md?tabs=attribute\&pivots=programming-language-typescript#example)<br/>[Resource Trigger](functions-bindings-mcp-resource-trigger.md?tabs=attribute\&pivots=programming-language-typescript#example)<br/>[Prompt Trigger](functions-bindings-mcp-prompt-trigger.md?tabs=attribute\&pivots=programming-language-typescript#example) | [Link](https://github.com/Azure-Samples/remote-mcp-functions-typescript) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-storage-queue-output.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure-Samples/functions-docs-javascript/tree/master/functions-add-output-binding-storage-queue-cli-v4-programming-model) |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-rabbitmq-output.md?pivots=programming-language-javascript#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?pivots=programming-language-javascript#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-service-bus-output.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure-Samples/azure-functions-servicebus-sdk-bindings-nodejs/tree/main/serviceBusSampleWithComplete) |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?pivots=programming-language-javascript#example)<br/>[Input](functions-bindings-signalr-service-input.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-signalr-service-output.md?pivots=programming-language-javascript) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?pivots=programming-language-javascript)<br/>[Output](functions-bindings-storage-table-output.md?pivots=programming-language-javascript) |  |
| Timer | [Trigger](functions-bindings-timer.md?pivots=programming-language-javascript#example) |  |
| Twilio | [Output](functions-bindings-twilio.md?pivots=programming-language-javascript#example) |  |
| Managed connectors | [Trigger](functions-connectors-overview.md?pivots=programming-language-typescript#connector-based-triggers) | [Link](https://github.com/Azure-Samples/functions-connectors-typescript) |

**Applies to: programming-language-powershell**

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?pivots=programming-language-powershell#example)<br/>[Input](functions-bindings-storage-blob-input.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-storage-blob-output.md?pivots=programming-language-powershell#example) |  |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?pivots=programming-language-powershell#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?pivots=programming-language-powershell#example) |  |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?pivots=programming-language-powershell#example)<br/>[Input](functions-bindings-azure-sql-input.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-azure-sql-output.md?pivots=programming-language-powershell#example) |  |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-event-grid-output.md?pivots=programming-language-powershell#example) |  |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-event-hubs-output.md?pivots=programming-language-powershell#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?pivots=programming-language-powershell#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?pivots=programming-language-powershell#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-powershell-azd) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-storage-queue-output.md?pivots=programming-language-powershell#example) |  |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-rabbitmq-output.md?pivots=programming-language-powershell#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?pivots=programming-language-powershell#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-service-bus-output.md?pivots=programming-language-powershell#example) |  |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?pivots=programming-language-powershell#example)<br/>[Input](functions-bindings-signalr-service-input.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-signalr-service-output.md?pivots=programming-language-powershell) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?pivots=programming-language-powershell)<br/>[Output](functions-bindings-storage-table-output.md?pivots=programming-language-powershell) |  |
| Timer | [Trigger](functions-bindings-timer.md?pivots=programming-language-powershell#example) |  |
| Twilio | [Output](functions-bindings-twilio.md?pivots=programming-language-powershell#example) |  |

**Applies to: programming-language-python**

Binding code for Python depends on the Python model version.

### [v2](#tab/python-v2)

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-storage-blob-input.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-storage-blob-output.md?tabs=python-v2\&pivots=programming-language-python#example) | [Link](https://github.com/Azure-Samples/azure-functions-blob-sdk-bindings-python) |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?tabs=python-v2\&pivots=programming-language-python#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-python-azd-cosmosdb) |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-python#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-python#examples) |  |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-azure-sql-input.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-azure-sql-output.md?tabs=python-v2\&pivots=programming-language-python#example) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-python) |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-event-grid-output.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-event-hubs-output.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?tabs=python-v2\&pivots=programming-language-python#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-python-http-azd) |
| Model Context Protocol | [Tool Trigger](functions-bindings-mcp-tool-trigger.md?tabs=attribute\&pivots=programming-language-python#example)<br/>[Resource Trigger](functions-bindings-mcp-resource-trigger.md?tabs=attribute\&pivots=programming-language-python#example)<br/>[Prompt Trigger](functions-bindings-mcp-prompt-trigger.md?tabs=attribute\&pivots=programming-language-python#example) | [Link](https://github.com/Azure-Samples/remote-mcp-functions-python) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-storage-queue-output.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-rabbitmq-output.md?tabs=python-v2\&pivots=programming-language-python#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-service-bus-output.md?tabs=python-v2\&pivots=programming-language-python#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-python-azd-service-bus) |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-signalr-service-input.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-signalr-service-output.md?tabs=python-v2\&pivots=programming-language-python) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?tabs=python-v2\&pivots=programming-language-python)<br/>[Output](functions-bindings-storage-table-output.md?tabs=python-v2\&pivots=programming-language-python) |  |
| Timer | [Trigger](functions-bindings-timer.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| Twilio | [Output](functions-bindings-twilio.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| Managed connectors | [Trigger](functions-connectors-overview.md?pivots=programming-language-python#connector-based-triggers) | [Link](https://github.com/Azure-Samples/functions-connectors-python) |

### [v1](#tab/python-v1)
| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-storage-blob-input.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-storage-blob-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-python#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-python#examples) |  |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-azure-sql-input.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-azure-sql-output.md?tabs=python-v1\&pivots=programming-language-python#example) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-python) |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-event-grid-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-event-hubs-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-storage-queue-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-rabbitmq-output.md?tabs=python-v1\&pivots=programming-language-python#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-service-bus-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-signalr-service-input.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-signalr-service-output.md?tabs=python-v1\&pivots=programming-language-python) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?tabs=python-v1\&pivots=programming-language-python)<br/>[Output](functions-bindings-storage-table-output.md?tabs=python-v1\&pivots=programming-language-python) |  |
| Timer | [Trigger](functions-bindings-timer.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Twilio | [Output](functions-bindings-twilio.md?tabs=python-v1\&pivots=programming-language-python#example) |  |

---



## Custom bindings

You can create custom input and output bindings. You must author bindings in .NET, but you can consume them from any supported language. For more information about creating custom bindings, see [Creating custom input and output bindings](https://github.com/Azure/azure-webjobs-sdk/wiki/Creating-custom-input-and-output-bindings).

## Related content

- [Binding expressions and patterns](functions-bindings-expressions-patterns.md)
- [Register Azure Functions binding extensions](functions-bindings-register.md)
- [Manually run a non-HTTP-triggered function](functions-manually-run-non-http.md)
- [Handling binding errors](functions-bindings-error-pages.md)
