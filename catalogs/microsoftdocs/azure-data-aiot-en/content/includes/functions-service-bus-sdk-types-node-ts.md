---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 12/15/2025
ms.author: glenga 
---

This example uses the SDK type [`ServiceBusReceivedMessage`](https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusreceivedmessage) obtained from `ServiceBusMessageContext` provided by the Service Bus trigger:

[Code reference unavailable in this source snapshot: ~/functions-nodejs-extensions/azure-functions-nodejs-extensions-servicebus/samples/serviceBusSampleWithComplete/src/functions/serviceBusTopicTrigger.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-service-bus-sdk-types-node-ts.md)

For another example using SDK types see the [exponential backoff strategy sample](https://github.com/Azure/azure-functions-nodejs-extensions/blob/main/azure-functions-nodejs-extensions-servicebus/samples/serviceBusTriggerExponentialBackOff/src/functions/serviceBusTopicTrigger.ts).
