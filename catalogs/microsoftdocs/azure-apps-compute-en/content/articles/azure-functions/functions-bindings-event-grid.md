---
title: Azure Event Grid bindings for Azure Functions
description: Understand how to handle Event Grid events in Azure Functions.

ms.topic: reference
ms.date: 09/15/2026
ms.custom: fasttrack-edit, devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
zone_pivot_groups: programming-languages-set-functions
---

# Azure Event Grid bindings for Azure Functions

This reference shows how to connect to Azure Event Grid using Azure Functions triggers and bindings.  


Event Grid is an Azure service that sends HTTP requests to notify you about events that happen in publishers. A _publisher_ is the service or resource that originates the event. For example, an Azure blob storage account is a publisher, and [a blob upload or deletion is an event](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-event-overview.md). Some [Azure services have built-in support for publishing events to Event Grid](../event-grid/concepts.md#event-sources).

Event *handlers* receive and process events. Azure Functions is one of several [Azure services that have built-in support for handling Event Grid events](../event-grid/overview.md#event-handlers). Functions provides an Event Grid trigger, which invokes a function when an event is received from Event Grid. A similar output binding can be used to send events from your function to an [Event Grid custom topic](../event-grid/post-to-custom-topic.md).

You can also use an HTTP trigger to handle Event Grid Events. To learn more, see [Receive events to an HTTP endpoint](../event-grid/receive-events.md). We recommend using the Event Grid trigger over HTTP trigger. 
 

| Action | Type |
| --- | --- |
| Run a function when an Event Grid event is dispatched | [Trigger][trigger] |
| Sends an Event Grid event | [Output binding][binding] |
| Control the returned HTTP status code | [HTTP endpoint](../event-grid/receive-events.md) |


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

# [Extension v3.x](#tab/extensionv3/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 3.x._

This version of the extension supports updated Event Grid binding parameter types of [Azure.Messaging.CloudEvent][CloudEvent] and [Azure.Messaging.EventGrid.EventGridEvent][EventGridEvent].

Add this version of the extension to your project by installing the [NuGet package], version 3.x.

# [Extension v2.x](#tab/extensionv2/in-process)

_This section describes using a [class library](functions-dotnet-class-library.md). For [C# scripting], you would need to instead [install the extension bundle][Update your extensions], version 2.x._

Supports the default Event Grid binding parameter type of [Microsoft.Azure.EventGrid.Models.EventGridEvent](https://learn.microsoft.com/dotnet/api/microsoft.azure.eventgrid.models.eventgridevent). Event Grid extension versions earlier than 3.x don't support [CloudEvents schema](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/cloudevents-schema.md#azure-functions). To consume this schema, instead use an HTTP trigger, or switch to **Extension v3.x**.

Add the extension to your project by installing the [NuGet package], version 2.x.

# [Extension v3.x](#tab/extensionv3/isolated-process)

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventGrid), version 3.x.

# [Extension v2.x](#tab/extensionv2/isolated-process)

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventGrid), version 2.x. Event Grid extension versions earlier than 3.x don't support [CloudEvents schema](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/cloudevents-schema.md#azure-functions). To consume this schema, instead use an HTTP trigger.

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


Considerations for the Event Grid extension:

+ Event Grid extension versions earlier than 3.x don't support [CloudEvents schema](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/cloudevents-schema.md#azure-functions). To consume this schema, instead use an HTTP trigger.



**Applies to: programming-language-go**

Register Event Grid triggers in code by using `app.EventGrid()`. Event Grid output bindings aren't currently supported by the Go worker; use the Azure SDK for Go directly when you need to publish events.


**Applies to: programming-language-csharp**


## Binding types

The binding types supported for .NET depend on both the extension version and C# execution mode, which can be one of the following: 
   
# [Isolated worker model](#tab/isolated-process)

An isolated worker process class library compiled C# function runs in a process isolated from the runtime.  

# [In-process model](#tab/in-process)

An in-process class library is a compiled C# function runs in the same process as the Functions runtime.
 
---

Choose a version to see binding type details for the mode and version.

# [Extension v3.x](#tab/extensionv3/in-process)

The Event Grid extension supports parameter types according to the table below.

| Binding | Parameter types |
| --- | --- |
| Event Grid trigger | [CloudEvent]<br/>[EventGridEvent]<br/>[BinaryData]<br/>[Newtonsoft.Json.Linq.JObject][JObject]<br/>`string` |
| Event Grid output (single event) | [CloudEvent]<br/>[EventGridEvent]<br/>[BinaryData]<br/>[Newtonsoft.Json.Linq.JObject][JObject]<br/>`string` |
| Event Grid output (multiple events) | `ICollector<T>` or `IAsyncCollector<T>` where `T` is one of the single event types |

# [Extension v2.x](#tab/extensionv2/in-process)

This version of the extension supports parameter types according to the table below. It doesn't support for the [CloudEvents schema], which is exclusive to **Extension v3.x**.

| Binding | Parameter types |
| --- | --- |
| Event Grid trigger | [Microsoft.Azure.EventGrid.Models.EventGridEvent]<br/>[Newtonsoft.Json.Linq.JObject][JObject]<br/>`string` |
| Event Grid output | [Microsoft.Azure.EventGrid.Models.EventGridEvent]<br/>[Newtonsoft.Json.Linq.JObject][JObject]<br/>`string` |

# [Extension v3.x](#tab/extensionv3/isolated-process)

The isolated worker process supports parameter types according to the tables below. Support for binding to `Stream`, and to types from [Azure.Messaging] is in preview.

**Event Grid trigger**


When you want the function to process a single event, the Event Grid trigger can bind to the following types:

| Type | Description |
| --- | --- |
| JSON serializable types | Functions tries to deserialize the JSON data of the event into a plain-old CLR object (POCO) type. |
| `string` | The event as a string. |
| [BinaryData]<sup>1</sup> | The bytes of the event message. |
| [CloudEvent]<sup>1</sup> | The event object. Use when Event Grid is configured to deliver using the CloudEvents schema. |
| [EventGridEvent]<sup>1</sup> | The event object. Use when Event Grid is configured to deliver using the Event Grid schema. |

When you want the function to process a batch of events, the Event Grid trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `CloudEvent[]`<sup>1</sup>,<br/>`EventGridEvent[]`<sup>1</sup>,<br/>`string[]`,<br/>`BinaryData[]`<sup>1</sup> | An array of events from the batch. Each entry represents one event. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.EventGrid 3.3.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventGrid/3.3.0) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[CloudEvent]: https://learn.microsoft.com/dotnet/api/azure.messaging.cloudevent
[EventGridEvent]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventgrid.eventgridevent
[BinaryData]: https://learn.microsoft.com/dotnet/api/system.binarydata


**Event Grid output binding**


When you want the function to write a single event, the Event Grid output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The event as a string. |
| `byte[]` | The bytes of the event message. |
| JSON serializable types | An object representing a JSON event. Functions tries to serialize a plain-old CLR object (POCO) type into JSON data. |

When you want the function to write multiple events, the Event Grid output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is one of the single event types | An array containing multiple events. Each entry represents one event. |

For other output scenarios, create and use an [EventGridPublisherClient] with other types from [Azure.Messaging.EventGrid] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Azure.Messaging.EventGrid]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventgrid
[EventGridPublisherClient]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventgrid.eventgridpublisherclient


# [Extension v2.x](#tab/extensionv2/isolated-process)

Earlier versions of this extension in the isolated worker process only support binding to strings and plain-old CLR object (POCO) types. Additional options are available to **Extension v3.x**.

---

[CloudEvent]: https://learn.microsoft.com/dotnet/api/azure.messaging.cloudevent
[EventGridEvent]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventgrid.eventgridevent
[BinaryData]: https://learn.microsoft.com/dotnet/api/system.binarydata

[JObject]: https://www.newtonsoft.com/json/help/html/t_newtonsoft_json_linq_jobject.htm
[Microsoft.Azure.EventGrid.Models.EventGridEvent]: https://learn.microsoft.com/dotnet/api/microsoft.azure.eventgrid.models.eventgridevent
[upgrade your application to Functions 4.x]: migrate-version-1-version-4.md



## host.json settings

The Event Grid trigger uses a webhook HTTP request, which can be configured using the same [*host.json* settings as the HTTP Trigger](functions-bindings-http-webhook.md#hostjson-settings).

## Next steps

* If you have questions, submit an issue to the team [here](https://github.com/Azure/azure-sdk-for-net/issues)
* [Event Grid trigger][trigger]
* [Event Grid output binding][binding]
* [Run a function when an Event Grid event is dispatched](functions-bindings-event-grid-trigger.md)
* [Dispatch an Event Grid event](functions-bindings-event-grid-trigger.md)

[Azure.Messaging]: https://learn.microsoft.com/dotnet/api/azure.messaging
[Azure.Messaging.EventGrid]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventgrid

[binding]: functions-bindings-event-grid-output.md
[trigger]: functions-bindings-event-grid-trigger.md
[extension bundle]: extension-bundles.md
[NuGet package]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.EventGrid
[Update your extensions]: functions-bindings-register.md

[CloudEvents schema]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/cloudevents-schema.md#azure-functions

[C# scripting]: functions-reference-csharp.md
