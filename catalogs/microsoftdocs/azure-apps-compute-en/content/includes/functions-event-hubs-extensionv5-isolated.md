---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 05/07/2025
ms.author: glenga
---
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

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.EventHubs 5.5.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventHubs/5.5.0) and the [common dependencies for SDK type bindings](../articles/azure-functions/dotnet-isolated-process-guide.md#sdk-types).

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

For other output scenarios, create and use an [EventHubProducerClient] with other types from [Azure.Messaging.EventHubs] directly. See [Register Azure clients](../articles/azure-functions/dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Azure.Messaging.EventHubs]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs
[EventHubProducerClient]: https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient
