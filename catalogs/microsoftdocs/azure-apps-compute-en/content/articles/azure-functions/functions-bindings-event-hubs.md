---
title: Azure Event Hubs bindings for Azure Functions
description: Learn to use Azure Event Hubs trigger and bindings in Azure Functions.
ms.assetid: daf81798-7acc-419a-bc32-b5a41c6db56b
ms.topic: reference
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
ms.date: 03/04/2022
zone_pivot_groups: programming-languages-set-functions
---

# Azure Event Hubs trigger and bindings for Azure Functions

This article explains how to work with [Azure Event Hubs](../event-hubs/event-hubs-about.md) bindings for Azure Functions. Azure Functions supports trigger and output bindings for Event Hubs.

| Action | Type |
| --- | --- |
| Respond to events sent to an event hub event stream. | [Trigger](functions-bindings-event-hubs-trigger.md) |
| Write events to an event stream | [Output binding](functions-bindings-event-hubs-output.md) |


**Applies to: programming-language-csharp**

## Install extension

The extension NuGet package you install depends on the C# mode you're using in your function app: 

### [Isolated worker model](#tab/isolated-process)

Functions execute in an isolated C# worker process. To learn more, see [Guide for running C# Azure Functions in an isolated worker process](dotnet-isolated-process-guide.md).

### [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Functions execute in the same process as the Functions host. To learn more, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md).

In a variation of this model, Functions can be run using [C# scripting], which is supported primarily for C# portal editing. To update existing binding extensions for C# script apps running in the portal without having to republish your function app, see [Update your extensions].

---

The functionality of the extension varies depending on the extension version:

### [Extension v6.x+](#tab/extensionv6/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 4.x._


This version introduces the ability to [connect using an identity instead of a secret](manage-connections.md?tabs=identity#define-connections). For a tutorial on configuring your function apps with managed identities, see the [creating a function app with identity-based connections tutorial](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-identity-based-connections-tutorial.md). 

This version uses the newer Event Hubs binding type [Azure.Messaging.EventHubs.EventData](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata).

This extension version is available by installing the [NuGet package], version 6.x.

### [Extension v5.x](#tab/extensionv5/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 3.x or later._


This version introduces the ability to [connect using an identity instead of a secret](manage-connections.md?tabs=identity#define-connections). For a tutorial on configuring your function apps with managed identities, see the [creating a function app with identity-based connections tutorial](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-identity-based-connections-tutorial.md). 

This version uses the newer Event Hubs binding type [Azure.Messaging.EventHubs.EventData](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata).

This extension version is available by installing the [NuGet package], version 5.x.

### [Extension v3.x+](#tab/extensionv3/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 2.x._

Supports the original Event Hubs binding parameter type of [Microsoft.Azure.EventHubs.EventData](https://learn.microsoft.com/dotnet/api/microsoft.azure.eventhubs.eventdata).

Add the extension to your project by installing the [NuGet package], version 3.x or 4.x.

### [Extension v6.x+](#tab/extensionv6/isolated-process)


This version introduces the ability to [connect using an identity instead of a secret](manage-connections.md?tabs=identity#define-connections). For a tutorial on configuring your function apps with managed identities, see the [creating a function app with identity-based connections tutorial](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-identity-based-connections-tutorial.md). 

This version supports configuration of triggers and bindings through [Aspire integration](aspire-integration.md#connection-configuration-with-aspire).

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventHubs), version 6.x.

### [Extension v5.x](#tab/extensionv5/isolated-process)


This version introduces the ability to [connect using an identity instead of a secret](manage-connections.md?tabs=identity#define-connections). For a tutorial on configuring your function apps with managed identities, see the [creating a function app with identity-based connections tutorial](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-identity-based-connections-tutorial.md). 

This version supports configuration of triggers and bindings through [Aspire integration](aspire-integration.md#connection-configuration-with-aspire).

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventHubs), version 5.x.

### [Extension v3.x+](#tab/extensionv3/isolated-process)

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventHubs), version 4.x.

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



**Applies to: programming-language-csharp**


## Binding types

The binding types supported for .NET depend on both the extension version and C# execution mode, which can be one of the following options: 
   
### [Isolated worker model](#tab/isolated-process)

An isolated worker process class library compiled C# function runs in a process isolated from the runtime.  


### [In-process model](#tab/in-process)

An in-process class library is a compiled C# function runs in the same process as the Functions runtime.
 
---

Choose a version to see binding type details for the mode and version.

### [Extension v6.x+](#tab/extensionv6/in-process)

The Event Hubs extension supports parameter types according to the table below.

| Binding scenario | Parameter types |
| --- | --- |
| Event Hubs trigger (single event) | [Azure.Messaging.EventHubs.EventData]<br/>JSON serializable types<sup>1</sup><br/>`string`<br/>`byte[]`<br/>[BinaryData] |
| Event Hubs trigger (batch of events) | `EventData[]`<br/>`string[]` |
| Event Hubs output (single event) | [Azure.Messaging.EventHubs.EventData]<br/>JSON serializable types<sup>1</sup><br/>`string`<br/>`byte[]`<br/>[BinaryData] |
| Event Hubs output (multiple events) | `ICollector<T>` or `IAsyncCollector<T>` where `T` is one of the single event types |

<sup>1</sup> Events containing JSON data can be deserialized into known plain-old CLR object (POCO) types.

### [Extension v5.x](#tab/extensionv5/in-process)

The Event Hubs extension supports parameter types according to the table below.

| Binding scenario | Parameter types |
| --- | --- |
| Event Hubs trigger (single event) | [Azure.Messaging.EventHubs.EventData]<br/>JSON serializable types<sup>1</sup><br/>`string`<br/>`byte[]`<br/>[BinaryData] |
| Event Hubs trigger (batch of events) | `EventData[]`<br/>`string[]` |
| Event Hubs output (single event) | [Azure.Messaging.EventHubs.EventData]<br/>JSON serializable types<sup>1</sup><br/>`string`<br/>`byte[]`<br/>[BinaryData] |
| Event Hubs output (multiple events) | `ICollector<T>` or `IAsyncCollector<T>` where `T` is one of the single event types |

<sup>1</sup> Events containing JSON data can be deserialized into known plain-old CLR object (POCO) types.

### [Extension v3.x+](#tab/extensionv3/in-process)

Earlier versions of the extension exposed types from the now deprecated [Microsoft.Azure.EventHubs] namespace. Newer types from [Azure.Messaging.EventHubs] are exclusive to **Extension v5.x+**.

This version of the extension supports parameter types according to the table below.

| Binding scenario | Parameter types |
| --- | --- |
| Event Hubs trigger (single message) | [Microsoft.Azure.EventHubs.EventData]<br/>JSON serializable types<sup>1</sup><br/>`string`<br/>`byte[]` |
| Event Hubs trigger (batch) | `EventData[]`<br/>`string[]` |
| Event Hubs output | [Microsoft.Azure.EventHubs.EventData]<br/>JSON serializable types<sup>1</sup><br/>`string`<br/>`byte[]` |

<sup>1</sup> Events containing JSON data can be deserialized into known plain-old CLR object (POCO) types.

### [Extension v6.x+](#tab/extensionv6/isolated-process)

The isolated worker process supports parameter types according to the tables below. Support for binding to types from [Azure.Messaging.EventHubs] is in preview.

**Event Hubs trigger**


When you want the function to process a single event, the Event Hubs trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The event as a string. Use when the event is simple text. |
| `byte[]` | The bytes of the event. |
| JSON serializable types | When an event contains JSON data, Functions tries to deserialize the JSON data into a plain-old CLR object (POCO) type. |
| [Azure.Messaging.EventHubs.EventData]<sup>1</sup> | The event object.<br/>If you are migrating from any older versions of the Event Hubs SDKs, note that this version drops support for the legacy `Body` type in favor of [EventBody](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata.eventbody). |

When you want the function to process a batch of events, the Event Hubs trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `string[]` | An array of events from the batch, as strings. Each entry represents one event. |
| `EventData[]` <sup>1</sup> | An array of events from the batch, as instances of [Azure.Messaging.EventHubs.EventData]. Each entry represents one event. |
| `T[]` where `T` is a JSON serializable type<sup>1</sup> | An array of events from the batch, as instances of a custom POCO type. Each entry represents one event. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.EventHubs 5.5.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventHubs/5.5.0) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[Azure.Messaging.EventHubs.EventData]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata


**Event Hubs output binding**


When you want the function to write a single event, the Event Hubs output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The event as a string. Use when the event is simple text. |
| `byte[]` | The bytes of the event. |
| JSON serializable types | An object representing the event. Functions tries to serialize a plain-old CLR object (POCO) type into JSON data. |

When you want the function to write multiple events, the Event Hubs output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is one of the single event types | An array containing multiple events. Each entry represents one event. |

For other output scenarios, create and use an [EventHubProducerClient] with other types from [Azure.Messaging.EventHubs] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Azure.Messaging.EventHubs]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs
[EventHubProducerClient]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient


### [Extension v5.x](#tab/extensionv5/isolated-process)

The isolated worker process supports parameter types according to the tables below. Support for binding to types from [Azure.Messaging.EventHubs] is in preview.

**Event Hubs trigger**


When you want the function to process a single event, the Event Hubs trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The event as a string. Use when the event is simple text. |
| `byte[]` | The bytes of the event. |
| JSON serializable types | When an event contains JSON data, Functions tries to deserialize the JSON data into a plain-old CLR object (POCO) type. |
| [Azure.Messaging.EventHubs.EventData]<sup>1</sup> | The event object.<br/>If you are migrating from any older versions of the Event Hubs SDKs, note that this version drops support for the legacy `Body` type in favor of [EventBody](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata.eventbody). |

When you want the function to process a batch of events, the Event Hubs trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `string[]` | An array of events from the batch, as strings. Each entry represents one event. |
| `EventData[]` <sup>1</sup> | An array of events from the batch, as instances of [Azure.Messaging.EventHubs.EventData]. Each entry represents one event. |
| `T[]` where `T` is a JSON serializable type<sup>1</sup> | An array of events from the batch, as instances of a custom POCO type. Each entry represents one event. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.EventHubs 5.5.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventHubs/5.5.0) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[Azure.Messaging.EventHubs.EventData]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata


**Event Hubs output binding**


When you want the function to write a single event, the Event Hubs output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The event as a string. Use when the event is simple text. |
| `byte[]` | The bytes of the event. |
| JSON serializable types | An object representing the event. Functions tries to serialize a plain-old CLR object (POCO) type into JSON data. |

When you want the function to write multiple events, the Event Hubs output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is one of the single event types | An array containing multiple events. Each entry represents one event. |

For other output scenarios, create and use an [EventHubProducerClient] with other types from [Azure.Messaging.EventHubs] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Azure.Messaging.EventHubs]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs
[EventHubProducerClient]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient


### [Extension v3.x+](#tab/extensionv3/isolated-process)

Earlier versions of the extension in the isolated worker process only support binding to strings and JSON serializable types. More options are available to  **Extension v5.x+**.

---

[Azure.Messaging.EventHubs.EventData]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata
[Microsoft.Azure.EventHubs.EventData]: https://learn.microsoft.com/dotnet/api/microsoft.azure.eventhubs.eventdata



**Applies to: programming-language-go**

For Go, Event Hubs trigger handlers receive `bindings.EventHubMessage`. Register Event Hubs triggers in code by using `app.EventHub()`. Event Hubs output bindings aren't currently supported by the Go worker; use the Azure SDK for Go directly when you need to send events.


**Applies to: programming-language-python**


## SDK binding types

SDK types for Azure Event Hubs are in preview. To get started with SDK types for Event Hubs in Python, see the [Python SDK bindings for Event Hubs sample](https://github.com/Azure-Samples/azure-functions-eventhub-sdk-bindings-python).
> **Important:**  
> Using SDK type bindings requires the [Python v2 programming model](functions-reference-python.md#sdk-type-bindings).

---
| Binding | Parameter types | Samples |
| --- | --- | --- |
| EventHub trigger | [EventData] | [`EventData`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-eventhub/samples/eventhub_samples_eventdata/function_app.py) |

---

[EventData]: https://learn.microsoft.com/python/api/azure-eventhub/azure.eventhub.eventdata




## host.json settings
<a name="host-json"></a>

The [host.json](functions-host-json.md#eventhub) file contains settings that control behavior for the Event Hubs trigger. The configuration is different depending on the extension version.

### [Extension v5.x/v6.x+](#tab/extensionv5+extensionv6)

```json
{
    "version": "2.0",
    "extensions": {
        "eventHubs": {
            "maxEventBatchSize" : 100,
            "minEventBatchSize" : 25,
            "maxWaitTime" : "00:05:00",            
            "batchCheckpointFrequency" : 1,
            "prefetchCount" : 300,
            "transportType" : "amqpWebSockets",
            "webProxy" : "https://proxyserver:8080",
            "customEndpointAddress" : "amqps://company.gateway.local",
            "targetUnprocessedEventThreshold" : 75,
            "initialOffsetOptions" : {
                "type" : "fromStart",
                "enqueuedTimeUtc" : ""
            },
            "clientRetryOptions":{
                "mode" : "exponential",
                "tryTimeout" : "00:01:00",
                "delay" : "00:00:00.80",
                "maximumDelay" : "00:01:00",
                "maximumRetries" : 3
            }
        }
    }
}  
```

| Property | Default | Description |
| --- | --- | --- |
| maxEventBatchSize<sup>2</sup> | 100 | The maximum number of events included in a batch for a single invocation. Must be at least 1. |
| minEventBatchSize<sup>1</sup> | 1 | The minimum number of events desired in a batch. The minimum applies only when the function is receiving multiple events and must be less than `maxEventBatchSize`.<br/>The minimum size isn't strictly guaranteed. A partial batch is dispatched when a full batch can't be prepared before the `maxWaitTime` has elapsed. Partial batches are also likely for the first invocation of the function after scaling takes place. |
| maxWaitTime<sup>1</sup> | 00:01:00 | The maximum interval that the trigger should wait to fill a batch before invoking the function. The wait time is only considered when `minEventBatchSize` is larger than 1 and is otherwise ignored. If less than `minEventBatchSize` events were available before the wait time elapses, the function is invoked with a partial batch. The longest allowed wait time is 10 minutes.<br/><br/>**NOTE:** This interval is not a strict guarantee for the exact timing on which the function is invoked. There is a small margin of error due to timer precision. When scaling takes place, the first invocation with a partial batch may occur more quickly or may take up to twice the configured wait time. |
| batchCheckpointFrequency | 1 | The number of batches to process before creating a checkpoint for the event hub.<br/><br/>**NOTE:** Setting this value above 1 for hosting plans supported by [target based scaling](functions-target-based-scaling.md#considerations) can cause incorrect scaling behavior. The platform calculates unprocessed queue size as "current position - checkpointed position", which may incorrectly indicate unprocessed messages when batches have been processed but not yet checkpointed, preventing proper scale-in when no messages remain. |
| prefetchCount | 300 | The number of events that is eagerly requested from Event Hubs and held in a local cache to allow reads to avoid waiting on a network operation |
| transportType | amqpTcp | The protocol and transport that is used for communicating with Event Hubs. Available options: `amqpTcp`, `amqpWebSockets` |
| webProxy | null | The proxy to use for communicating with Event Hubs over web sockets. A proxy cannot be used with the `amqpTcp` transport. |
| customEndpointAddress | null | The address to use when establishing a connection to Event Hubs, allowing network requests to be routed through an application gateway or other path needed for the host environment. The fully qualified namespace for the event hub is still needed when a custom endpoint address is used, and it must be specified explicitly or via the connection string. |
| targetUnprocessedEventThreshold<sup>1</sup> | null | The desired number of unprocessed events per function instance. The threshold is used in target-based scaling to override the default scaling threshold inferred from the `maxEventBatchSize` option. When set, the total unprocessed event count is divided by this value to determine the number of function instances needed. The instance count is rounded up to a number that creates a balanced partition distribution. |
| initialOffsetOptions/type | fromStart | The location in the event stream to start processing when a checkpoint does not exist in storage. Applies to all partitions. For more information, see the [OffsetType documentation](https://learn.microsoft.com/dotnet/api/microsoft.azure.webjobs.eventhubs.offsettype). Available options: `fromStart`, `fromEnd`, `fromEnqueuedTime` |
| initialOffsetOptions/enqueuedTimeUtc | null | Specifies the enqueued time of the event in the stream from which to start processing. When `initialOffsetOptions/type` is configured as `fromEnqueuedTime`, this setting is mandatory. Supports time in any format supported by [DateTime.Parse()](https://learn.microsoft.com/dotnet/standard/base-types/parsing-datetime), such as `2020-10-26T20:31Z`. For clarity, you should also specify a timezone. When timezone isn't specified, Functions assumes the local timezone of the machine running the function app, which is UTC when running on Azure. |
| clientRetryOptions/mode | exponential | The approach to use for calculating retry delays. Exponential mode retries attempts with a delay based on a back-off strategy where each attempt will increase the duration that it waits before retrying. The fixed mode retries attempts at fixed intervals with each delay having a consistent duration. Available options: `exponential`, `fixed` |
| clientRetryOptions/tryTimeout | 00:01:00 | The maximum duration to wait for an Event Hubs operation to complete, per attempt. |
| clientRetryOptions/delay | 00:00:00.80 | The delay or back-off factor to apply between retry attempts. |
| clientRetryOptions/maximumDelay | 00:00:01 | The maximum delay to allow between retry attempts. |
| clientRetryOptions/maximumRetries | 3 | The maximum number of retry attempts before considering the associated operation to have failed. |

<sup>1</sup> Using `minEventBatchSize` and `maxWaitTime` requires [v5.3.0](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.EventHubs/5.3.0) of the `Microsoft.Azure.WebJobs.Extensions.EventHubs` package, or a later version.

<sup>2</sup> The default `maxEventBatchSize` changed in [v6.0.0](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.EventHubs/6.0.0) of the `Microsoft.Azure.WebJobs.Extensions.EventHubs` package.  In earlier versions, this was 10.

The `clientRetryOptions` are used to retry operations between the Functions host and Event Hubs (such as fetching events and sending events).  Refer to guidance on [Azure Functions error handling and retries](functions-bindings-error-pages.md#retries) for information on applying retry policies to individual functions.

For a reference of host.json in Azure Functions 2.x and beyond, see [host.json reference for Azure Functions](functions-host-json.md).

### [Extension v3.x+](#tab/extensionv3)

```json
{
    "version": "2.0",
    "extensions": {
        "eventHubs": {
            "batchCheckpointFrequency": 1,
            "eventProcessorOptions": {
                "maxBatchSize": 256,
                "prefetchCount": 512
            },
            "initialOffsetOptions": {
                "type": "fromStart",
                "enqueuedTimeUtc": ""
            }
        }
    }
}  
```

| Property | Default | Description |
| --- | --- | --- |
| batchCheckpointFrequency | 1 | The number of event batches to process before creating an Event Hubs cursor checkpoint.<br/><br/>**NOTE:** Setting this value above 1 for hosting plans supported by [target based scaling](functions-target-based-scaling.md#considerations) can cause incorrect scaling behavior. The platform calculates unprocessed queue size as "current position - checkpointed position", which may incorrectly indicate unprocessed messages when batches have been processed but not yet checkpointed, preventing proper scale-in when no messages remain. |
| eventProcessorOptions/maxBatchSize | 10 | The maximum event count received per receive loop. |
| eventProcessorOptions/prefetchCount | 300 | The default prefetch count used by the underlying `EventProcessorHost`. The minimum allowed value is 10. |
| initialOffsetOptions/type<sup>1</sup> | fromStart | The location in the event stream from which to start processing when a checkpoint doesn't exist in storage. Options are `fromStart` , `fromEnd` or `fromEnqueuedTime`. `fromEnd` processes new events that were enqueued after the function app started running. Applies to all partitions. For more information, see the [EventProcessorOptions documentation](https://learn.microsoft.com/dotnet/api/microsoft.azure.eventhubs.processor.eventprocessoroptions.initialoffsetprovider). |
| initialOffsetOptions/enqueuedTimeUtc<sup>1</sup> | null | Specifies the enqueued time of the event in the stream from which to start processing. When `initialOffsetOptions/type` is configured as `fromEnqueuedTime`, this setting is mandatory. Supports time in any format supported by [DateTime.Parse()](https://learn.microsoft.com/dotnet/standard/base-types/parsing-datetime), such as  `2020-10-26T20:31Z`. For clarity, you should also specify a timezone. When timezone isn't specified, Functions assumes the local timezone of the machine running the function app, which is UTC when running on Azure. For more information, see the [EventProcessorOptions documentation](https://learn.microsoft.com/dotnet/api/microsoft.azure.eventhubs.processor.eventprocessoroptions.initialoffsetprovider). |

<sup>1</sup> Support for `initialOffsetOptions` begins with [EventHubs v4.2.0](https://github.com/Azure/azure-functions-eventhubs-extension/releases/tag/v4.2.0).

For a reference of host.json in Azure Functions 2.x and beyond, see [host.json reference for Azure Functions](functions-host-json.md).

---


[NuGet package]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.EventHubs
[extension bundle]: extension-bundles.md
[Update your extensions]: functions-bindings-register.md

[Microsoft.Azure.EventHubs]: https://learn.microsoft.com/dotnet/api/microsoft.azure.eventhubs
[Azure.Messaging.EventHubs]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs

[C# scripting]: functions-reference-csharp.md


## Next steps

- [Respond to events sent to an event hub event stream (Trigger)](functions-bindings-event-hubs-trigger.md)
- [Write events to an event stream (Output binding)](functions-bindings-event-hubs-output.md)
