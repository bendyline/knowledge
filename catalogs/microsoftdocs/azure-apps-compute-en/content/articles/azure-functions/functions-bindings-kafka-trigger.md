---
title: Apache Kafka trigger for Azure Functions
description: Use Azure Functions to run your code based on events from an Apache Kafka stream.
ms.topic: reference
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
ms.date: 08/31/2026
zone_pivot_groups: programming-languages-set-functions
---

# Apache Kafka trigger for Azure Functions

Use the Apache Kafka trigger in Azure Functions to run your function code in response to messages in Kafka topics. You can also use a [Kafka output binding](functions-bindings-kafka-output.md) to write from your function to a topic. For information on setup and configuration details, see [Apache Kafka bindings for Azure Functions overview](functions-bindings-kafka.md).


> **Important:**
> Kafka bindings are available for Functions on the [Flex Consumption plan](flex-consumption-plan.md), [Elastic Premium Plan](functions-premium-plan.md), and [Dedicated (App Service) plan](dedicated-plan.md). They are only supported on version 4.x of the Functions runtime.

## Example
**Applies to: programming-language-go**

Go support isn't currently available for this binding.


**Applies to: programming-language-csharp**


The usage of the trigger depends on the C# modality used in your function app, which can be one of the following modes:

# [Isolated worker model](#tab/isolated-process)

A compiled C# function that uses an [isolated worker process class library](dotnet-isolated-process-guide.md) that runs in a process that's separate from the runtime.   

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

A compiled C# function that uses an [in-process class library](functions-dotnet-class-library.md) that runs in the same process as the Functions runtime.
 
---

The attributes you use depend on the specific event provider.

# [Confluent (in-process)](#tab/confluent/in-process)

The following example shows a C# function that reads and logs the Kafka message as a Kafka event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/Confluent/KafkaTrigger.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

To receive events in a batch, use an input string or `KafkaEventData` as an array, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/Confluent/KafkaTriggerMany.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following function logs the message and headers for the Kafka Event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/Confluent/KafkaTriggerWithHeaders.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

You can define a generic [Avro schema] for the event passed to the trigger. The following string value defines the generic Avro schema:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/KafkaFunctionSample/AvroGenericTriggers.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

In the following function, an instance of `GenericRecord` is available in the `KafkaEvent.Value` property:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/KafkaFunctionSample/AvroGenericTriggers.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

You can define a specific [Avro schema] for the event passed to the trigger. The following code defines the `UserRecord` class:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/KafkaFunctionSample/User.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

In the following function, an instance of `UserRecord` is available in the `KafkaEvent.Value` property:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/KafkaFunctionSample/AvroSpecificTriggers.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

For a complete set of working .NET examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/dotnet/). 

# [Event Hubs (in-process)](#tab/event-hubs/in-process)

The following example shows a C# function that reads and logs the Kafka message as a Kafka event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/EventHub/KafkaTrigger.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

To receive events in a batch, use a string array or `KafkaEventData` array as input, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/EventHub/KafkaTriggerMany.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following function logs the message and headers for the Kafka Event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/EventHub/KafkaTriggerWithHeaders.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

You can define a generic [Avro schema] for the event passed to the trigger. The following string value defines the generic Avro schema:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/KafkaFunctionSample/AvroGenericTriggers.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

In the following function, an instance of `GenericRecord` is available in the `KafkaEvent.Value` property:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/KafkaFunctionSample/AvroGenericTriggers.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

You can define a specific [Avro schema] for the event passed to the trigger. The following code defines the `UserRecord` class:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/KafkaFunctionSample/User.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

In the following function, an instance of `UserRecord` is available in the `KafkaEvent.Value` property:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/KafkaFunctionSample/AvroSpecificTriggers.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

For a complete set of working .NET examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/dotnet/). 

# [Confluent (isolated process)](#tab/confluent/isolated-process)

The following example shows a C# function that reads and logs the Kafka message as a Kafka event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/confluent/KafkaTrigger.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

To receive events in a batch, use a string array as input, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/confluent/KafkaTriggerMany.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following function logs the message and headers for the Kafka Event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/Confluent/KafkaTriggerWithHeaders.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

For a complete set of working .NET examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/dotnet-isolated/). 

# [Event Hubs (isolated process)](#tab/event-hubs/isolated-process)

The following example shows a C# function that reads and logs the Kafka message as a Kafka event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/eventhub/KafkaTrigger.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

To receive events in a batch, use a string array as input, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/eventhub/KafkaTriggerMany.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following function logs the message and headers for the Kafka Event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/eventhub/KafkaTriggerWithHeaders.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

For a complete set of working .NET examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/dotnet-isolated/). 

---


**Applies to: programming-language-javascript,programming-language-typescript**

The usage of the trigger depends on your version of the Node.js programming model. 

# [Version 4](#tab/v4) 

In the Node.js v4 model, you define your trigger directly in your function code. For more information, see the [Azure Functions Node.js developer guide](functions-reference-node.md?pivots=nodejs-model-v4).

# [Version 3](#tab/v3)

In the Node.js v3 model, you define your trigger in a `function.json` file with your code. For more information, see the [Azure Functions Node.js developer guide](functions-reference-node.md?pivots=nodejs-model-v3).

---

In these examples, the event providers are either Confluent or Azure Event Hubs. These examples show how to define a Kafka trigger for a function that reads a Kafka message.  

**Applies to: programming-language-javascript**

# [Confluent](#tab/confluent/v4)

```javascript
const { app } = require("@azure/functions");

async function kafkaTrigger(event, context) {
  context.log("Event Offset: " + event.Offset);
  context.log("Event Partition: " + event.Partition);
  context.log("Event Topic: " + event.Topic);
  context.log("Event Timestamp: " + event.Timestamp);
  context.log("Event Key: " + event.Key);
  context.log("Event Value (as string): " + event.Value);

  let event_obj = JSON.parse(event.Value);

  context.log("Event Value Object: ");
  context.log("   Value.registertime: ", event_obj.registertime.toString());
  context.log("   Value.userid: ", event_obj.userid);
  context.log("   Value.regionid: ", event_obj.regionid);
  context.log("   Value.gender: ", event_obj.gender);
}

app.generic("Kafkatrigger", {
  trigger: {
    type: "kafkaTrigger",
    direction: "in",
    name: "event",
    topic: "topic",
    brokerList: "%BrokerList%",
    username: "%ConfluentCloudUserName%",
    password: "%ConfluentCloudPassword%",
    consumerGroup: "$Default",
    protocol: "saslSsl",
    authenticationMode: "plain",
    dataType: "string"
  },
  handler: kafkaTrigger,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript-v4/src/functions/kafkaTrigger.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Confluent](#tab/confluent/v3)

This `function.json` file defines the trigger for the Confluent provider:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTrigger/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTrigger/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Event Hubs](#tab/event-hubs/v3)

This `function.json` file defines the trigger for the Event Hubs provider:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTrigger/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTrigger/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

To receive events in a batch, set the `cardinality` value to `many`, as shown in these examples:

# [Confluent](#tab/confluent/v4)

```javascript
const { app } = require("@azure/functions");

async function kafkaTriggerMany(events, context) {
  for (const event of events) {
    context.log("Event Offset: " + event.Offset);
    context.log("Event Partition: " + event.Partition);
    context.log("Event Topic: " + event.Topic);
    context.log("Event Key: " + event.Key);
    context.log("Event Timestamp: " + event.Timestamp);
    context.log("Event Value (as string): " + event.Value);

    let event_obj = JSON.parse(event.Value);

    context.log("Event Value Object: ");
    context.log("   Value.registertime: ", event_obj.registertime.toString());
    context.log("   Value.userid: ", event_obj.userid);
    context.log("   Value.regionid: ", event_obj.regionid);
    context.log("   Value.gender: ", event_obj.gender);
  }
}

app.generic("kafkaTriggerMany", {
  trigger: {
    type: "kafkaTrigger",
    direction: "in",
    name: "event",
    topic: "topic",
    brokerList: "%BrokerList%",
    username: "%ConfluentCloudUserName%",
    password: "%ConfluentCloudPassword%",
    consumerGroup: "$Default",
    protocol: "saslSsl",
    authenticationMode: "plain",
    dataType: "string",
    cardinality: "MANY"
  },
  handler: kafkaTriggerMany,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript-v4/src/functions/kafkaTriggerMany.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Confluent](#tab/confluent/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTriggerMany/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code parses the array of events and logs the event data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTriggerMany/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code logs the header data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTriggerManyWithHeaders/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Event Hubs](#tab/event-hubs/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTriggerMany/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code parses the array of events and logs the event data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTriggerMany/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code logs the header data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTriggerManyWithHeaders/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

You can define a generic [Avro schema] for the event passed to the trigger. This example defines the trigger for the specific provider with a generic Avro schema:

# [Confluent](#tab/confluent/v4)

```javascript
const { app } = require("@azure/functions");

async function kafkaAvroGenericTrigger(event, context) {
  context.log("Processed kafka event: ", event);
  if (context.triggerMetadata?.key !== undefined) {
    context.log("message key: ", context.triggerMetadata?.key);
  }
}

app.generic("kafkaAvroGenericTrigger", {
  trigger: {
    type: "kafkaTrigger",
    direction: "in",
    name: "event",
    protocol: "SASLSSL",
    password: "EventHubConnectionString",
    dataType: "string",
    topic: "topic",
    authenticationMode: "PLAIN",
    avroSchema:
      '{"type":"record","name":"Payment","namespace":"io.confluent.examples.clients.basicavro","fields":[{"name":"id","type":"string"},{"name":"amount","type":"double"},{"name":"type","type":"string"}]}',
    consumerGroup: "$Default",
    username: "$ConnectionString",
    brokerList: "%BrokerList%",
  },
  handler: kafkaAvroGenericTrigger,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript-v4/src/functions/kafkaAvroGenericTrigger.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Confluent](#tab/confluent/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTriggerAvroGeneric/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTriggerAvroGeneric/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Event Hubs](#tab/event-hubs/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTriggerAvroGeneric/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaTriggerAvroGeneric/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

# [Version 4](#tab/v4) 

For a complete set of working JavaScript examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/tree/dev/samples/javascript-v4/src/functions).

# [Version 3](#tab/v3)

For a complete set of working JavaScript examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/javascript/).

---


**Applies to: programming-language-typescript**


# [Confluent](#tab/confluent/v4)

```typescript
import { app, InvocationContext } from "@azure/functions";

// This is a sample interface that describes the actual data in your event.
interface EventData {
  registertime: number;
  userid: string;
  regionid: string;
  gender: string;
}

export async function kafkaTrigger(
  event: any,
  context: InvocationContext
): Promise<void> {
  context.log("Event Offset: " + event.Offset);
  context.log("Event Partition: " + event.Partition);
  context.log("Event Topic: " + event.Topic);
  context.log("Event Timestamp: " + event.Timestamp);
  context.log("Event Value (as string): " + event.Value);

  let event_obj: EventData = JSON.parse(event.Value);

  context.log("Event Value Object: ");
  context.log("   Value.registertime: ", event_obj.registertime.toString());
  context.log("   Value.userid: ", event_obj.userid);
  context.log("   Value.regionid: ", event_obj.regionid);
  context.log("   Value.gender: ", event_obj.gender);
}

app.generic("Kafkatrigger", {
  trigger: {
    type: "kafkaTrigger",
    direction: "in",
    name: "event",
    topic: "topic",
    brokerList: "%BrokerList%",
    username: "%ConfluentCloudUserName%",
    password: "%ConfluentCloudPassword%",
    consumerGroup: "$Default",
    protocol: "saslSsl",
    authenticationMode: "plain",
    dataType: "string"
  },
  handler: kafkaTrigger,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript-v4/src/functions/kafkaTrigger.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Confluent](#tab/confluent/v3)

This `function.json` file defines the trigger for the Confluent provider:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTrigger/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTrigger/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Event Hubs](#tab/event-hubs/v3)

This `function.json` file defines the trigger for the Event Hubs provider:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTrigger/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTrigger/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

To receive events in a batch, set the `cardinality` value to `many`, as shown in these examples:

# [Confluent](#tab/confluent/v4)

```typescript
import { app, InvocationContext } from "@azure/functions";

// This is a sample interface that describes the actual data in your event.
interface EventData {
    registertime: number;
    userid: string;
    regionid: string;
    gender: string;
}

interface KafkaEvent {
    Offset: number;
    Partition: number;
    Topic: string;
    Timestamp: number;
    Value: string;
}

export async function kafkaTriggerMany(
    events: any,
    context: InvocationContext
): Promise<void> {
    for (const event of events) {
        context.log("Event Offset: " + event.Offset);
        context.log("Event Partition: " + event.Partition);
        context.log("Event Topic: " + event.Topic);
        context.log("Event Timestamp: " + event.Timestamp);
        context.log("Event Value (as string): " + event.Value);

        let event_obj: EventData = JSON.parse(event.Value);

        context.log("Event Value Object: ");
        context.log("   Value.registertime: ", event_obj.registertime.toString());
        context.log("   Value.userid: ", event_obj.userid);
        context.log("   Value.regionid: ", event_obj.regionid);
        context.log("   Value.gender: ", event_obj.gender);
    }
}

app.generic("kafkaTriggerMany", {
  trigger: {
    type: "kafkaTrigger",
    direction: "in",
    name: "event",
    topic: "topic",
    brokerList: "%BrokerList%",
    username: "%ConfluentCloudUserName%",
    password: "%ConfluentCloudPassword%",
    consumerGroup: "$Default",
    protocol: "saslSsl",
    authenticationMode: "plain",
    dataType: "string",
    cardinality: "MANY"
  },
  handler: kafkaTriggerMany,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript-v4/src/functions/kafkaTriggerMany.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Confluent](#tab/confluent/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTriggerMany/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code parses the array of events and logs the event data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTriggerMany/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code logs the header data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTriggerManyWithHeaders/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Event Hubs](#tab/event-hubs/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTriggerMany/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code parses the array of events and logs the event data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTriggerMany/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code logs the header data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTriggerManyWithHeaders/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

You can define a generic [Avro schema] for the event passed to the trigger. This example defines the trigger for the specific provider with a generic Avro schema:

# [Confluent](#tab/confluent/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript-v4/src/functions/kafkaAvroGenericTrigger.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Event Hubs](#tab/event-hubs/v4)

```typescript
import { app, InvocationContext } from "@azure/functions";

export async function kafkaAvroGenericTrigger(
  event: any,
  context: InvocationContext
): Promise<void> {
  context.log("Processed kafka event: ", event);
  context.log(
    `Message ID: ${event.id}, amount: ${event.amount}, type: ${event.type}`
  );
  if (context.triggerMetadata?.key !== undefined) {
    context.log(`Message Key : ${context.triggerMetadata?.key}`);
  }
}

app.generic("kafkaAvroGenericTrigger", {
  trigger: {
    type: "kafkaTrigger",
    direction: "in",
    name: "event",
    protocol: "SASLSSL",
    password: "EventHubConnectionString",
    dataType: "string",
    topic: "topic",
    authenticationMode: "PLAIN",
    avroSchema:
      '{"type":"record","name":"Payment","namespace":"io.confluent.examples.clients.basicavro","fields":[{"name":"id","type":"string"},{"name":"amount","type":"double"},{"name":"type","type":"string"}]}',
    consumerGroup: "$Default",
    username: "$ConnectionString",
    brokerList: "%BrokerList%",
  },
  handler: kafkaAvroGenericTrigger,
});
```

# [Confluent](#tab/confluent/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTriggerAvroGeneric/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTriggerAvroGeneric/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Event Hubs](#tab/event-hubs/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTriggerAvroGeneric/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaTriggerAvroGeneric/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

# [Version 4](#tab/v4) 

For a complete set of working TypeScript examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/tree/dev/samples/typescript-v4/src/functions).

# [Version 3](#tab/v3)

For a complete set of working TypeScript examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/typescript/).

---


**Applies to: programming-language-powershell**


The specific properties of the `function.json` file depend on your event provider. In these examples, the event providers are either Confluent or Azure Event Hubs. The following examples show a Kafka trigger for a function that reads and logs a Kafka message.

The following `function.json` file defines the trigger for the specific provider:

# [Confluent](#tab/confluent)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaTrigger/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Event Hubs](#tab/event-hubs)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaTrigger/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

The following code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaTrigger/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

To receive events in a batch, set the `cardinality` value to `many` in the function.json file, as shown in the following examples:

# [Confluent](#tab/confluent)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaTriggerMany/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Event Hubs](#tab/event-hubs)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaTriggerMany/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

The following code parses the array of events and logs the event data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaTriggerMany/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following code logs the header data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaTriggerManyWithHeaders/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

You can define a generic [Avro schema] for the event passed to the trigger. The following function.json defines the trigger for the specific provider with a generic Avro schema:

# [Confluent](#tab/confluent)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaTriggerAvroGeneric/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Event Hubs](#tab/event-hubs)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaTriggerAvroGeneric/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

The following code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaTriggerAvroGeneric/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

For a complete set of working PowerShell examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/powershell/). 


**Applies to: programming-language-python**

The usage of the trigger depends on your version of the Python programming model. 

# [Version 2](#tab/v2) 

In the Python v2 model, you define your trigger directly in your function code using decorators. For more information, see the [Azure Functions Python developer guide](functions-reference-python.md?pivots=python-mode-decorators).

# [Version 1](#tab/v1)

In the Python v1 model, you define your trigger in the `function.json` with your function code. For more information, see the [Azure Functions Python developer guide](functions-reference-python.md?pivots=python-mode-configuration).

---

These examples show how to define a Kafka trigger for a function that reads a Kafka message.

# [Version 2](#tab/v2)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python-v2/kafka_trigger.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Version 1](#tab/v1)

This `function.json` file defines the trigger:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaTrigger/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaTrigger/main.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

This example receives events in a batch by setting the `cardinality` value to `many`.

# [Version 2](#tab/v2)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python-v2/kafka_trigger.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Version 1](#tab/v1)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaTriggerMany/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code parses the array of events and logs the event data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaTriggerMany/main.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code logs the header data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaTriggerManyWithHeaders/__init__.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

You can define a generic [Avro schema] for the event passed to the trigger. 

# [Version 2](#tab/v2)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python-v2/kafka_trigger_avro.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

# [Version 1](#tab/v1)

This `function.json` defines the trigger with a generic Avro schema:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaTriggerAvroGeneric/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

This code runs when the function is triggered:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaTriggerAvroGeneric/main.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

---

# [Version 2](#tab/v2) 

For a complete set of working Python examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/python-v2/).

# [Version 1](#tab/v1)

For a complete set of working Python examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/python/).

---


**Applies to: programming-language-java**


The annotations you use to configure your trigger depend on the specific event provider.

# [Confluent](#tab/confluent)

The following example shows a Java function that reads and logs the content of the Kafka event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/confluent/src/main/java/com/contoso/kafka/SampleKafkaTrigger.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

To receive events in a batch, use an input string as an array, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/confluent/src/main/java/com/contoso/kafka/KafkaTriggerMany.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following function logs the message and headers for the Kafka Event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/confluent/src/main/java/com/contoso/kafka/KafkaTriggerManyWithHeaders.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

You can define a generic [Avro schema] for the event passed to the trigger. The following function defines a trigger for the specific provider with a generic Avro schema:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/confluent/src/main/java/com/contoso/kafka/avro/generic/KafkaTriggerAvroGeneric.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

For a complete set of working Java examples for Confluent, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/tree/dev/samples/java/confluent/src/main/java/com/contoso/kafka). 

# [Event Hubs](#tab/event-hubs)

The following example shows a Java function that reads and logs the content of the Kafka event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/eventhub/src/main/java/com/contoso/kafka/SampleKafkaTrigger.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

To receive events in a batch, use an input string as an array, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/eventhub/src/main/java/com/contoso/kafka/KafkaTriggerMany.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

The following function logs the message and headers for the Kafka Event:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/eventhub/src/main/java/com/contoso/kafka/KafkaTriggerManyWithHeaders.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

You can define a generic [Avro schema] for the event passed to the trigger. The following function defines a trigger for the specific provider with a generic Avro schema:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/eventhub/src/main/java/com/contoso/kafka/avro/generic/KafkaTriggerAvroGeneric.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-trigger.md)

For a complete set of working Java examples for Event Hubs, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/tree/dev/samples/java/confluent/src/main/java/com/contoso/kafka). 

---


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use the `KafkaTriggerAttribute` to define the function trigger. 

The following table explains the properties you can set by using this trigger attribute:

| Parameter | Description |
| --- | --- |
| **BrokerList** | (Required) The list of Kafka brokers monitored by the trigger. See [Connections](#connections) for more information. |
| **Topic** | (Required) The topic monitored by the trigger. |
| **ConsumerGroup** | (Optional) Kafka consumer group used by the trigger. |
| **AvroSchema** | (Optional) Schema of a generic record of message value when using the Avro protocol. |
| **KeyAvroSchema** | (Optional) Schema of a generic record of message key when using the Avro protocol. |
| **KeyDataType** | (Optional) Data type to receive the message key as from Kafka Topic. If `KeyAvroSchema` is set, this value is generic record. Accepted values are `Int`, `Long`, `String`, and `Binary`. |
| **AuthenticationMode** | (Optional) The authentication mode when using Simple Authentication and Security Layer (SASL) authentication. The supported values are `NotSet` (default), `Gssapi`, `Plain`, `ScramSha256`, `ScramSha512`, and `OAuthBearer`. |
| **Username** | (Optional) The username for SASL authentication. Not supported when `AuthenticationMode` is `Gssapi`. See [Connections](#connections) for more information. |
| **Password** | (Optional) The password for SASL authentication. Not supported when `AuthenticationMode` is `Gssapi`. See [Connections](#connections) for more information. |
| **Protocol** | (Optional) The security protocol used when communicating with brokers. The supported values are `NotSet` (default), `plaintext`, `ssl`, `sasl_plaintext`, `sasl_ssl`. |
| **SslCaLocation** | (Optional) Path to CA certificate file for verifying the broker's certificate. |
| **SslCertificateLocation** | (Optional) Path to the client's certificate. |
| **SslKeyLocation** | (Optional) Path to client's private key (PEM) used for authentication. |
| **SslKeyPassword** | (Optional) Password for client's certificate. |
| **SslCertificatePEM** | (Optional) Client certificate in PEM format as a string. See [Connections](#connections) for more information. |
| **SslKeyPEM** | (Optional) Client private key in PEM format as a string. See [Connections](#connections) for more information. |
| **SslCaPEM** | (Optional) CA certificate in PEM format as a string. See [Connections](#connections) for more information. |
| **SslCertificateandKeyPEM** | (Optional) Client certificate and key in PEM format as a string. See [Connections](#connections) for more information. |
| **SchemaRegistryUrl** | (Optional) URL for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **SchemaRegistryUsername** | (Optional) Username for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **SchemaRegistryPassword** | (Optional) Password for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **OAuthBearerMethod** | (Optional) OAuth Bearer method. Accepted values are `oidc` and `default`. |
| **OAuthBearerClientId** | (Optional) When `OAuthBearerMethod` is set to `oidc`, this specifies the OAuth bearer client ID. See [Connections](#connections) for more information. |
| **OAuthBearerClientSecret** | (Optional) When `OAuthBearerMethod` is set to `oidc`, this specifies the OAuth bearer client secret. See [Connections](#connections) for more information. |
| **OAuthBearerScope** | (Optional) Specifies the scope of the access request to the broker. |
| **OAuthBearerTokenEndpointUrl** | (Optional) OAuth/OIDC issuer token endpoint HTTP(S) URI used to retrieve token when `oidc` method is used. See [Connections](#connections) for more information. |
| **HttpsCaLocation** | (Optional) File or directory path to CA certificates for verifying the OAuth/OIDC token endpoint certificate. The special value `probe` uses the operating system's default certificate paths. Supported only by the isolated worker model. |
| **HttpsCaPem** | (Optional) CA certificate for verifying the OAuth/OIDC token endpoint certificate in PEM format. Supported only by the isolated worker model. |
| **OAuthBearerExtensions** | (Optional) Comma-separated list of key=value pairs to be provided as additional information to broker when `oidc` method is used. For example: `supportFeatureX=true,organizationId=sales-emea`. |

> **Important:**
> The `HttpsCaLocation` and `HttpsCaPem` options aren't currently support on dynamic scale plans. At this time, you can only use these properties when your function app is hosted in a [Dedicated (App Service) plan](dedicated-plan.md).

For the isolated worker model, use an app setting expression for `HttpsCaPem` instead of putting the PEM value in the attribute:

```csharp
[KafkaTrigger(
    "BrokerList",
    "topic",
    HttpsCaPem = "%KafkaHttpsCaPem%"
)]
```

In Azure, set the `KafkaHttpsCaPem` app setting to a [Key Vault reference](https://learn.microsoft.com/azure/app-service/app-service-key-vault-references) for the secret that contains the PEM value. This `KafkaHttpsCaPem` setting might look like this example, where `<keyVaultName>` is the name of your vault:

```text
@Microsoft.KeyVault(SecretUri=https://<keyVaultName>.vault.azure.net/secrets/httpscapem)
```


**Applies to: programming-language-java**


## Annotations

The `KafkaTrigger` annotation enables you to create a function that runs when it receives a topic. Supported options include the following elements:

| Element | Description |
| --- | --- |
| **name** | (Required) The name of the variable that represents the queue or topic message in function code. |
| **brokerList** | (Required) The list of Kafka brokers monitored by the trigger. See [Connections](#connections) for more information. |
| **topic** | (Required) The topic monitored by the trigger. |
| **cardinality** | (Optional) Indicates the cardinality of the trigger input. The supported values are `ONE` (default) and `MANY`. Use `ONE` when the input is a single message and `MANY` when the input is an array of messages. When you use `MANY`, you must also set a `dataType`. |
| **dataType** | Defines how Functions handles the parameter value. By default, the value is obtained as a string and Functions tries to  deserialize the string to actual plain-old Java object (POJO). When `string`, the input is treated as just a string. When `binary`, the message is received as binary data, and Functions tries to deserialize it to an actual parameter type byte[]. |
| **consumerGroup** | (Optional) Kafka consumer group used by the trigger. |
| **avroSchema** | (Optional) Schema of a generic record when using the Avro protocol. |
| **authenticationMode** | (Optional) The authentication mode when using Simple Authentication and Security Layer (SASL) authentication. The supported values are `NotSet` (default), `Gssapi`, `Plain`, `ScramSha256`, `ScramSha512`. |
| **username** | (Optional) The username for SASL authentication. Not supported when `AuthenticationMode` is `Gssapi`. See [Connections](#connections) for more information. |
| **password** | (Optional) The password for SASL authentication. Not supported when `AuthenticationMode` is `Gssapi`. See [Connections](#connections) for more information. |
| **protocol** | (Optional) The security protocol used when communicating with brokers. The supported values are `NotSet` (default), `plaintext`, `ssl`, `sasl_plaintext`, `sasl_ssl`. |
| **sslCaLocation** | (Optional) Path to CA certificate file for verifying the broker's certificate. |
| **sslCertificateLocation** | (Optional) Path to the client's certificate. |
| **sslKeyLocation** | (Optional) Path to client's private key (PEM) used for authentication. |
| **sslKeyPassword** | (Optional) Password for client's certificate. |
| **lagThreshold** | (Optional) Lag threshold for the trigger. |
| **schemaRegistryUrl** | (Optional) URL for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **schemaRegistryUsername** | (Optional) Username for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **schemaRegistryPassword** | (Optional) Password for the Avro Schema Registry. See [Connections](#connections) for more information. |



**Applies to: programming-language-javascript,programming-language-powershell**


## Configuration

The following table explains the binding configuration properties that you set in the *function.json* file.

| _function.json_ property | Description |
| --- | --- |
| **type** | (Required) Set to `kafkaTrigger`. |
| **direction** | (Required) Set to `in`. |
| **name** | (Required) The name of the variable that represents the brokered data in function code. |
| **brokerList** | (Required) The list of Kafka brokers monitored by the trigger.  See [Connections](#connections) for more information. |
| **topic** | (Required) The topic monitored by the trigger. |
| **cardinality** | (Optional) Indicates the cardinality of the trigger input. The supported values are `ONE` (default) and `MANY`. Use `ONE` when the input is a single message and `MANY` when the input is an array of messages. When you use `MANY`, you must also set a `dataType`. |
| **dataType** | Defines how Functions handles the parameter value. By default, the value is obtained as a string and Functions tries to  deserialize the string to actual plain-old Java object (POJO). When `string`, the input is treated as just a string. When `binary`, the message is received as binary data, and Functions tries to deserialize it to an actual byte array parameter type. |
| **consumerGroup** | (Optional) Kafka consumer group used by the trigger. |
| **avroSchema** | (Optional) Schema of a generic record when using the Avro protocol. |
| **keyAvroSchema** | (Optional) Schema of a generic record of message key when using the Avro protocol. |
| **keyDataType** | (Optional) Data type to receive the message key as from Kafka Topic. If `keyAvroSchema` is set, this value is generic record. Accepted values are `Int`, `Long`, `String`, and `Binary`. |
| **authenticationMode** | (Optional) The authentication mode when using Simple Authentication and Security Layer (SASL) authentication. The supported values are `NotSet` (default), `Gssapi`, `Plain`, `ScramSha256`, `ScramSha512`. |
| **username** | (Optional) The username for SASL authentication. Not supported when `AuthenticationMode` is `Gssapi`. See [Connections](#connections) for more information. |
| **password** | (Optional) The password for SASL authentication. Not supported when `AuthenticationMode` is `Gssapi`. See [Connections](#connections) for more information. |
| **protocol** | (Optional) The security protocol used when communicating with brokers. The supported values are `NotSet` (default), `plaintext`, `ssl`, `sasl_plaintext`, `sasl_ssl`. |
| **sslCaLocation** | (Optional) Path to CA certificate file for verifying the broker's certificate. |
| **sslCertificateLocation** | (Optional) Path to the client's certificate. |
| **sslKeyLocation** | (Optional) Path to client's private key (PEM) used for authentication. |
| **sslKeyPassword** | (Optional) Password for client's certificate. |
| **sslCertificatePEM** | (Optional) Client certificate in PEM format as a string. See [Connections](#connections) for more information. |
| **sslKeyPEM** | (Optional) Client private key in PEM format as a string. See [Connections](#connections) for more information. |
| **sslCaPEM** | (Optional) CA certificate in PEM format as a string. See [Connections](#connections) for more information. |
| **sslCertificateandKeyPEM** | (Optional) Client certificate and key in PEM format as a string. See [Connections](#connections) for more information. |
| **lagThreshold** | (Optional) Lag threshold for the trigger. |
| **schemaRegistryUrl** | (Optional) URL for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **schemaRegistryUsername** | (Optional) Username for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **schemaRegistryPassword** | (Optional) Password for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **oAuthBearerMethod** | (Optional) OAuth Bearer method. Accepted values are `oidc` and `default`. |
| **oAuthBearerClientId** | (Optional) When `oAuthBearerMethod` is set to `oidc`, this specifies the OAuth bearer client ID. See [Connections](#connections) for more information. |
| **oAuthBearerClientSecret** | (Optional) When `oAuthBearerMethod` is set to `oidc`, this specifies the OAuth bearer client secret. See [Connections](#connections) for more information. |
| **oAuthBearerScope** | (Optional) Specifies the scope of the access request to the broker. |
| **oAuthBearerTokenEndpointUrl** | (Optional) OAuth/OIDC issuer token endpoint HTTP(S) URI used to retrieve token when `oidc` method is used. See [Connections](#connections) for more information. |


**Applies to: programming-language-python**


## Configuration

The following table explains the binding configuration properties that you set in the *function.json* file. Python uses snake_case naming conventions for configuration properties.

| _function.json_ property | Description |
| --- | --- |
| **type** | (Required) Set to `kafkaTrigger`. |
| **direction** | (Required) Set to `in`. |
| **name** | (Required) The name of the variable that represents the brokered data in function code. |
| **broker_list** | (Required) The list of Kafka brokers monitored by the trigger. See [Connections](#connections) for more information. |
| **topic** | (Required) The topic monitored by the trigger. |
| **cardinality** | (Optional) Indicates the cardinality of the trigger input. The supported values are `ONE` (default) and `MANY`. Use `ONE` when the input is a single message and `MANY` when the input is an array of messages. When you use `MANY`, you must also set a `data_type`. |
| **data_type** | Defines how Functions handles the parameter value. By default, the value is obtained as a string and Functions tries to deserialize the string to actual plain-old Java object (POJO). When `string`, the input is treated as just a string. When `binary`, the message is received as binary data, and Functions tries to deserialize it to an actual parameter type byte[]. |
| **consumerGroup** | (Optional) Kafka consumer group used by the trigger. |
| **avroSchema** | (Optional) Schema of a generic record when using the Avro protocol. |
| **authentication_mode** | (Optional) The authentication mode when using Simple Authentication and Security Layer (SASL) authentication. The supported values are `NOTSET` (default), `Gssapi`, `Plain`, `ScramSha256`, `ScramSha512`. |
| **username** | (Optional) The username for SASL authentication. Not supported when `authentication_mode` is `Gssapi`. See [Connections](#connections) for more information. |
| **password** | (Optional) The password for SASL authentication. Not supported when `authentication_mode` is `Gssapi`. See [Connections](#connections) for more information. |
| **protocol** | (Optional) The security protocol used when communicating with brokers. The supported values are `NOTSET` (default), `plaintext`, `ssl`, `sasl_plaintext`, `sasl_ssl`. |
| **sslCaLocation** | (Optional) Path to CA certificate file for verifying the broker's certificate. |
| **sslCertificateLocation** | (Optional) Path to the client's certificate. |
| **sslKeyLocation** | (Optional) Path to client's private key (PEM) used for authentication. |
| **sslKeyPassword** | (Optional) Password for client's certificate. |
| **lag_threshold** | (Optional) Lag threshold for the trigger. |
| **schema_registry_url** | (Optional) URL for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **schema_registry_username** | (Optional) Username for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **schema_registry_password** | (Optional) Password for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **o_auth_bearer_method** | (Optional) OAuth Bearer method. Accepted values are `oidc` and `default`. |
| **o_auth_bearer_client_id** | (Optional) When `o_auth_bearer_method` is set to `oidc`, this specifies the OAuth bearer client ID. See [Connections](#connections) for more information. |
| **o_auth_bearer_client_secret** | (Optional) When `o_auth_bearer_method` is set to `oidc`, this specifies the OAuth bearer client secret. See [Connections](#connections) for more information. |
| **o_auth_bearer_scope** | (Optional) Specifies the scope of the access request to the broker. |
| **o_auth_bearer_token_endpoint_url** | (Optional) OAuth/OIDC issuer token endpoint HTTP(S) URI used to retrieve token when `oidc` method is used. See [Connections](#connections) for more information. |

> **Note:**
> Certificate PEM-related properties and Avro key-related properties aren't yet available in the Python library.



## Usage

**Applies to: programming-language-csharp**


# [Isolated worker model](#tab/isolated-process)

The Kafka trigger currently supports Kafka events as strings and string arrays that are JSON payloads.

# [In-process model](#tab/in-process)

The Kafka trigger passes Kafka events to the function as `KafkaEventData<string>` objects or arrays. The trigger also supports strings and string arrays that are JSON payloads.
 
---


**Applies to: programming-language-javascript,programming-language-python,programming-language-powershell**


The Kafka trigger passes Kafka messages to the function as strings. The trigger also supports string arrays that are JSON payloads.



In a Premium plan, you must enable runtime scale monitoring for the Kafka output to scale out to multiple instances. To learn more, see [Enable runtime scaling](functions-bindings-kafka.md#enable-runtime-scaling). 

You can't use the **Test/Run** feature of the **Code + Test** page in the Azure portal to work with Kafka triggers. You must instead send test events directly to the topic being monitored by the trigger.  

For a complete set of supported host.json settings for the Kafka trigger, see [host.json settings](functions-bindings-kafka.md#hostjson-settings). 


## Connections

The Kafka binding extension doesn't support managed identity connections. You must use one of these methods to authenticate your Kafka connections:

+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: Store your Kafka credentials (passwords, API keys, certificates) in Azure Key Vault and reference them from your app settings. Your function app connects to Key Vault using managed identities. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: Store connection settings in Azure App Configuration, which can also reference Key Vault for secrets. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration).
+ **Shared secret**: Store credentials directly in app settings (encrypted at rest). For more information, see [Define shared secret connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about connection security, see [Manage connections in Azure Functions](manage-connections.md).

> **Important:**
> Credential settings must reference an [application setting](functions-how-to-use-azure-function-app-settings.md#settings). Don't hard-code credentials in your code or configuration files. When running locally, use the [local.settings.json file](functions-develop-local.md#local-settings-file) for your credentials, and don't publish the local.settings.json file.

### [Confluent](#tab/confluent)

When connecting to a managed Kafka cluster provided by [Confluent in Azure](https://www.confluent.io/azure/), you can use one of the following authentication methods.

> **Note:**
> When using the Flex Consumption plan, file location-based certificate authentication properties (`SslCaLocation`, `SslCertificateLocation`, `SslKeyLocation`) aren't supported. Instead, use the PEM-based certificate properties (`SslCaPEM`, `SslCertificatePEM`, `SslKeyPEM`, `SslCertificateandKeyPEM`) or store certificates in Azure Key Vault. 

#### Schema Registry

To make use of schema registry provided by Confluent in Kafka Extension, set the following credentials:

| Setting | Recommended Value | Description |
| --- | --- | --- |
| **SchemaRegistryUrl** | `SchemaRegistryUrl` | URL of the schema registry service used for schema management. Usually of the format `https://psrc-xyz.us-east-2.aws.confluent.cloud` |
| **SchemaRegistryUsername** | `CONFLUENT_API_KEY` | Username for basic auth on schema registry (if required). |
| **SchemaRegistryPassword** | `CONFLUENT_API_SECRET` | Password for basic auth on schema registry (if required). |

#### Username/Password authentication

While using this form of authentication, make sure that `Protocol` is set to either `SaslPlaintext` or `SaslSsl`, `AuthenticationMode` is set to `Plain`, `ScramSha256` or `ScramSha512` and, if the CA cert being used is different from the default ISRG Root X1 cert, make sure to update `SslCaLocation` or `SslCaPEM`.

| Setting | Recommended value | Description |
| --- | --- | --- |
| **BrokerList** | `BootstrapServer` | App setting named `BootstrapServer` contains the value of bootstrap server found in Confluent Cloud settings page. The value resembles `xyz-xyzxzy.westeurope.azure.confluent.cloud:9092`. |
| **Username** | `ConfluentCloudUsername` | App setting named `ConfluentCloudUsername` contains the API access key from the Confluent Cloud web site. |
| **Password** | `ConfluentCloudPassword` | App setting named `ConfluentCloudPassword` contains the API secret obtained from the Confluent Cloud web site. |
| **SslCaPEM** | `%SSLCaPemCertificate%` | App setting named `SSLCaPemCertificate` that references an Azure Key Vault secret containing the CA certificate in PEM format. |

#### SSL authentication

Ensure that `Protocol` is set to `SSL`.

| Setting | Recommended Value | Description |
| --- | --- | --- |
| **BrokerList** | `BootstrapServer` | App setting named `BootstrapServer` contains the value of bootstrap server found in Confluent Cloud settings page. The value resembles `xyz-xyzxzy.westeurope.azure.confluent.cloud:9092`. |
| **SslCaPEM** | `%SslCaCertificatePem%` | App setting named `SslCaCertificatePem` that references an Azure Key Vault secret containing the CA certificate in PEM format. |
| **SslCertificatePEM** | `%SslClientCertificatePem%` | App setting named `SslClientCertificatePem` that references an Azure Key Vault secret containing the client certificate in PEM format. |
| **SslKeyPEM** | `%SslClientKeyPem%` | App setting named `SslClientKeyPem` that references an Azure Key Vault secret containing the client private key in PEM format. |
| **SslCertificateandKeyPEM** | `%SslClientCertificateAndKeyPem%` | App setting named `SslClientCertificateAndKeyPem` that references an Azure Key Vault secret containing the concatenated client certificate and client private key in PEM format. |
| **SslKeyPassword** | `%SslClientKeyPassword%` | App setting named `SslClientKeyPassword` that references an Azure Key Vault secret containing the password for the private key (if any). |

Store certificate and private key values in Azure Key Vault rather than directly in your function app settings. Set the corresponding app setting to a [Key Vault reference](https://learn.microsoft.com/azure/app-service/app-service-key-vault-references), such as:

```text
@Microsoft.KeyVault(SecretUri=https://<keyVaultName>.vault.azure.net/secrets/<secretName>)
```

#### OAuth authentication

When using OAuth authentication, configure the OAuth-related properties in your binding definitions.

### [Event Hubs](#tab/event-hubs)

When connecting to Event Hubs, make sure that the following authentication credentials for your Event Hubs instance are set in your trigger or binding:

| Setting | Recommended value | Description |
| --- | --- | --- |
| **BrokerList** | `BootstrapServer` | App setting named `BootstrapServer` contains the fully qualified domain name of your Event Hubs instance. The value resembles `<MY_NAMESPACE_NAME>.servicebus.windows.net:9093`. |
| **Username** | `$ConnectionString` | Actual value is obtained from the connection string. |
| **Password** | `%EventHubsConnectionString%` | App setting named `EventHubsConnectionString` contains the connection string for your Event Hubs namespace. To learn more, see [Get an Event Hubs connection string](../event-hubs/event-hubs-get-connection-string.md). |

---

The string values you use for these settings must be present as [application settings in Azure](functions-how-to-use-azure-function-app-settings.md#settings) or in the `Values` collection in the [local.settings.json file](functions-develop-local.md#local-settings-file) during local development.

You should also set the `Protocol` and `AuthenticationMode` in your binding definitions.

## Next steps

- [Write to an Apache Kafka stream from a function](functions-bindings-kafka-output.md)

[Avro schema]: http://avro.apache.org/docs/current/
