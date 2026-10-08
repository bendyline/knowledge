---
author: mattchenderson
ms.service: azure-functions
ms.topic: include
ms.date: 07/10/2023
ms.author: mahender
---

When you want the function to process a single message, the Service Bus trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The message as a string. Use when the message is simple text. |
| `byte[]` | The bytes of the message. |
| JSON serializable types | When an event contains JSON data, Functions tries to deserialize the JSON data into a plain-old CLR object (POCO) type. |
| [ServiceBusReceivedMessage]<sup>1</sup> | The message object.<br/><br/>When binding to `ServiceBusReceivedMessage`, you can optionally also include a parameter of type [ServiceBusMessageActions]<sup>1,2</sup> to perform [message settlement] actions. |

When you want the function to process a batch of messages, the Service Bus trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is one of the single message types | An array of events from the batch. Each entry represents one event.<br/><br/>When binding to `ServiceBusReceivedMessage[]`, you can optionally also include a parameter of type [ServiceBusMessageActions]<sup>1,2</sup> to perform [message settlement] actions. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.ServiceBus 5.14.1 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.ServiceBus/5.14.1) and the [common dependencies for SDK type bindings](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/dotnet-isolated-process-guide.md#sdk-types).

<sup>2</sup> When using `ServiceBusMessageActions`, set the [`AutoCompleteMessages` property of the trigger attribute](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-trigger.md#attributes) to `false`. This prevents the runtime from attempting to complete messages after a successful function invocation.

[ServiceBusReceivedMessage]: https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusreceivedmessage
[ServiceBusMessageActions]: https://github.com/Azure/azure-functions-dotnet-worker/blob/main/extensions/Worker.Extensions.ServiceBus/src/ServiceBusMessageActions.cs
[message settlement]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/message-transfers-locks-settlement.md#peeklock
