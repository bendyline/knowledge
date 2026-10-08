---
title: Apache Kafka output binding for Azure Functions
description: Use Azure Functions to write messages to an Apache Kafka stream.
ms.topic: reference
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
ms.date: 08/31/2026
zone_pivot_groups: programming-languages-set-functions
---

# Apache Kafka output binding for Azure Functions

The output binding enables an Azure Functions app to send messages to a Kafka topic. 


> **Important:**
> Kafka bindings are available for Functions on the [Flex Consumption plan](flex-consumption-plan.md), [Elastic Premium Plan](functions-premium-plan.md), and [Dedicated (App Service) plan](dedicated-plan.md). They are only supported on version 4.x of the Functions runtime.

## Example
**Applies to: programming-language-go**

Go support isn't currently available for this binding.


**Applies to: programming-language-csharp**


How you use the binding depends on the C# modality in your function app. You can use one of the following modalities:

# [Isolated worker model](#tab/isolated-process)

A compiled C# function that uses an [isolated worker process class library](dotnet-isolated-process-guide.md) that runs in a process that's separate from the runtime.      

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

A compiled C# function that uses an [in-process class library](functions-dotnet-class-library.md) that runs in the same process as the Functions runtime.
 
---

The attributes you use depend on the specific event provider.

# [Confluent](#tab/confluent/in-process)

The following example shows a C# function that sends a single message to a Kafka topic, using data provided in an HTTP GET request.

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/Confluent/KafkaOutput.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

To send events in a batch, use an array of `KafkaEventData` objects, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/Confluent/KafkaOutputMany.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following function adds headers to the Kafka output data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/Confluent/KafkaOutputWithHeaders.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

For a complete set of working .NET examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/dotnet/Confluent/). 

# [Event Hubs](#tab/event-hubs/in-process)

The following example shows a C# function that sends a single message to a Kafka topic, using data provided in an HTTP GET request.

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/EventHub/KafkaOutput.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

To send events in a batch, use an array of `KafkaEventData` objects, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/EventHub/KafkaOutputMany.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following function adds headers to the Kafka output data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet/EventHub/KafkaOutputWithHeaders.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

For a complete set of working .NET examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/dotnet/EventHub). 

# [Confluent](#tab/confluent/isolated-process)

The following example uses a custom return type named `MultipleOutputType`, which consists of an HTTP response and a Kafka output. 

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/confluent/KafkaOutput.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

In the `MultipleOutputType` class, `Kevent` is the output binding variable for the Kafka binding.

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/confluent/KafkaOutput.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

To send a batch of events, pass a string array to the output type, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/confluent/KafkaOutputMany.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The string array is defined as the `Kevents` property on the class, and the output binding is defined on this property:  

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/confluent/KafkaOutputMany.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following function adds headers to the Kafka output data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/Confluent/KafkaOutputWithHeaders.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

For a complete set of working .NET examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/dotnet-isolated/confluent). 

# [Event Hubs](#tab/event-hubs/isolated-process)


The following example uses a custom return type named `MultipleOutputType`, which consists of an HTTP response and a Kafka output. 

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/eventhub/KafkaOutput.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

In the `MultipleOutputType` class, `Kevent` is the output binding variable for the Kafka binding.

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/eventhub/KafkaOutput.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

To send a batch of events, pass a string array to the output type, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/eventhub/KafkaOutputMany.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The string array is defined as the `Kevents` property on the class, and the output binding is defined on this property:  

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/eventhub/KafkaOutputMany.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following function adds headers to the Kafka output data:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/dotnet-isolated/eventhub/KafkaOutputWithHeaders.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

For a complete set of working .NET examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/dotnet-isolated/eventhub). 

---


**Applies to: programming-language-javascript,programming-language-typescript**

The usage of the output binding depends on your version of the Node.js programming model. 

# [Version 4](#tab/v4) 

In the Node.js v4 model, you define your output binding directly in your function code. For more information, see the [Azure Functions Node.js developer guide](functions-reference-node.md?pivots=nodejs-model-v4).

# [Version 3](#tab/v3)

In the Node.js v3 model, you define your output binding in a `function.json` file with your code. For more information, see the [Azure Functions Node.js developer guide](functions-reference-node.md?pivots=nodejs-model-v3).

---

In these examples, the event providers are either Confluent or Azure Event Hubs. These examples show a Kafka output binding for a function that an HTTP request triggers and sends data from the request to the Kafka topic.

**Applies to: programming-language-javascript**

# [Confluent](#tab/confluent/v4)

```javascript
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  output,
} from "@azure/functions";

const kafkaOutput = output.generic({
  type: "kafka",
  direction: "out",
  topic: "topic",
  brokerList: "%BrokerList%",
  username: "ConfluentCloudUsername",
  password: "ConfluentCloudPassword",
  protocol: "saslSsl",
  authenticationMode: "plain",
});

export async function kafkaOutputWithHttp(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const body = await request.text();
  const queryName = request.query.get("name");
  const parsedbody = JSON.parse(body);
  const name = queryName || parsedbody.name || "world";
  context.extraOutputs.set(kafkaOutput, `Hello, ${parsedbody.name}!`);
  context.log(
    `Sending message to kafka: ${context.extraOutputs.get(kafkaOutput)}`
  );
  return {
    body: `Message sent to kafka with value: ${context.extraOutputs.get(
      kafkaOutput
    )}`,
    status: 200,
  };
}

const extraOutputs = [];
extraOutputs.push(kafkaOutput);

app.http("kafkaOutputWithHttp", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  extraOutputs,
  handler: kafkaOutputWithHttp,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript-v4/src/functions/kafkaOutputWithHttpTrigger.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Confluent](#tab/confluent/v3)

This `function.json` file defines the output binding for the Confluent provider:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaOutput/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following code sends a message to the topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaOutput/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Event Hubs](#tab/event-hubs/v3)

This `function.json` file defines the output binding for the Event Hubs provider:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaOutput/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following code sends a message to the topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaOutput/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

---

To send events in a batch, send an array of messages, as shown in these examples:

# [Confluent](#tab/confluent/v4)

```javascript
const { app, output } = require("@azure/functions");

const kafkaOutput = output.generic({
  type: "kafka",
  direction: "out",
  topic: "topic",
  brokerList: "%BrokerList%",
  username: "ConfluentCloudUsername",
  password: "ConfluentCloudPassword",
  protocol: "saslSsl",
  authenticationMode: "plain",
});

async function kafkaOutputManyWithHttp(request, context) {
  context.log(`Http function processed request for url "${request.url}"`);

  const queryName = request.query.get("name");
  const body = await request.text();
  const parsedbody = body ? JSON.parse(body) : {};
  parsedbody.name = parsedbody.name || "world";
  const name = queryName || parsedbody.name;
  context.extraOutputs.set(kafkaOutput, `Message one. Hello, ${name}!`);
  context.extraOutputs.set(kafkaOutput, `Message two. Hello, ${name}!`);
  return {
    body: `Messages sent to kafka.`,
    status: 200,
  };
}

const extraOutputs = [];
extraOutputs.push(kafkaOutput);

app.http("kafkaOutputManyWithHttp", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  extraOutputs,
  handler: kafkaOutputManyWithHttp,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript-v4/src/functions/kafkaOutputManyWithHttpTrigger.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Confluent](#tab/confluent/v3)

This code sends multiple messages as an array to the same topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaOutputMany/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Event Hubs](#tab/event-hubs/v3)

This code sends multiple messages as an array to the same topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaOutputMany/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

---

These examples show how to send an event message with headers to a Kafka topic:

# [Confluent](#tab/confluent/v4)

```javascript
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  output,
} from "@azure/functions";

const kafkaOutput = output.generic({
  type: "kafka",
  direction: "out",
  topic: "topic",
  brokerList: "%BrokerList%",
  username: "ConfluentCloudUsername",
  password: "ConfluentCloudPassword",
  protocol: "saslSsl",
  authenticationMode: "plain",
});

export async function kafkaOutputWithHttp(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const body = await request.text();
  const parsedbody = JSON.parse(body);
  // assuming body is of the format { "key": "key", "value": {JSON object} }
  context.extraOutputs.set(
    kafkaOutput,
    `{ "Offset":364,"Partition":0,"Topic":"test-topic","Timestamp":"2022-04-09T03:20:06.591Z", "Value": "${JSON.stringify(
      parsedbody.value
    ).replace(/"/g, '\\"')}", "Key":"${
      parsedbody.key
    }", "Headers": [{ "Key": "language", "Value": "javascript" }] }`
  );
  context.log(
    `Sending message to kafka: ${context.extraOutputs.get(kafkaOutput)}`
  );
  return {
    body: `Message sent to kafka with value: ${context.extraOutputs.get(
      kafkaOutput
    )}`,
    status: 200,
  };
}

const extraOutputs = [];
extraOutputs.push(kafkaOutput);

app.http("kafkaOutputWithHttp", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  extraOutputs,
  handler: kafkaOutputWithHttp,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript-v4/src/functions/kafkaOutputWithHttpTriggerWithHeaders.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Confluent](#tab/confluent/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaOutputWithHeader/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Event Hubs](#tab/event-hubs/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/javascript/KafkaOutputWithHeader/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

---

# [Version 4](#tab/v4) 

For a complete set of working JavaScript examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/tree/dev/samples/javascript-v4/src/functions).

# [Version 3](#tab/v3)

For a complete set of working JavaScript examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/javascript/).

---


**Applies to: programming-language-typescript**


# [Confluent](#tab/confluent/v4)

```typescript
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  output,
} from "@azure/functions";

const kafkaOutput = output.generic({
  type: "kafka",
  direction: "out",
  topic: "topic",
  brokerList: "%BrokerList%",
  username: "ConfluentCloudUsername",
  password: "ConfluentCloudPassword",
  protocol: "saslSsl",
  authenticationMode: "plain",
});

export async function kafkaOutputWithHttp(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const body = await request.text();
  const queryName = request.query.get("name");
  const parsedbody = JSON.parse(body);
  const name = queryName || parsedbody.name || "world";
  context.extraOutputs.set(kafkaOutput, `Hello, ${parsedbody.name}!`);
  context.log(
    `Sending message to kafka: ${context.extraOutputs.get(kafkaOutput)}`
  );
  return {
    body: `Message sent to kafka with value: ${context.extraOutputs.get(
      kafkaOutput
    )}`,
    status: 200,
  };
}

const extraOutputs = [];
extraOutputs.push(kafkaOutput);

app.http("kafkaOutputWithHttp", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  extraOutputs,
  handler: kafkaOutputWithHttp,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript-v4/src/functions/kafkaOutputWithHttpTrigger.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Confluent](#tab/confluent/v3)

This `function.json` file defines the output binding for the Confluent provider:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaOutput/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following code sends a message to the topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaOutput/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Event Hubs](#tab/event-hubs/v3)

This `function.json` file defines the output binding for the Event Hubs provider:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaOutput/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following code sends a message to the topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaOutput/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

---

To send events in a batch, send an array of messages, as shown in these examples:

# [Confluent](#tab/confluent/v4)

```typescript
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  output,
} from "@azure/functions";

const kafkaOutput = output.generic({
  type: "kafka",
  direction: "out",
  topic: "topic",
  brokerList: "%BrokerList%",
  username: "ConfluentCloudUsername",
  password: "ConfluentCloudPassword",
  protocol: "saslSsl",
  authenticationMode: "plain",
});

export async function kafkaOutputManyWithHttp(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const queryName = request.query.get("name");
  const body = await request.text();
  const parsedbody = body ? JSON.parse(body) : {};
  parsedbody.name = parsedbody.name || "world";
  const name = queryName || parsedbody.name;
  context.extraOutputs.set(kafkaOutput, `Message one. Hello, ${name}!`);
  context.extraOutputs.set(kafkaOutput, `Message two. Hello, ${name}!`);
  return {
    body: `Messages sent to kafka.`,
    status: 200,
  };
}

const extraOutputs = [];
extraOutputs.push(kafkaOutput);

app.http("kafkaOutputManyWithHttp", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  extraOutputs,
  handler: kafkaOutputManyWithHttp,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript-v4/src/functions/kafkaOutputManyWithHttpTrigger.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Confluent](#tab/confluent/v3)

This code sends multiple messages as an array to the same topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaOutputMany/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Event Hubs](#tab/event-hubs/v3)

This code sends multiple messages as an array to the same topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaOutputMany/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

---

These examples show how to send an event message with headers to a Kafka topic:

# [Confluent](#tab/confluent/v4)

```typescript
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  output,
} from "@azure/functions";

const kafkaOutput = output.generic({
  type: "kafka",
  direction: "out",
  topic: "topic",
  brokerList: "%BrokerList%",
  username: "ConfluentCloudUsername",
  password: "ConfluentCloudPassword",
  protocol: "saslSsl",
  authenticationMode: "plain",
});

export async function kafkaOutputWithHttp(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const body = await request.text();
  const parsedbody = JSON.parse(body);
  // assuming body is of the format { "key": "key", "value": {JSON object} }
  context.extraOutputs.set(
    kafkaOutput,
    `{ "Offset":364,"Partition":0,"Topic":"test-topic","Timestamp":"2022-04-09T03:20:06.591Z", "Value": "${JSON.stringify(
      parsedbody.value
    ).replace(/"/g, '\\"')}", "Key":"${
      parsedbody.key
    }", "Headers": [{ "Key": "language", "Value": "typescript" }] }`
  );
  context.log(
    `Sending message to kafka: ${context.extraOutputs.get(kafkaOutput)}`
  );
  return {
    body: `Message sent to kafka with value: ${context.extraOutputs.get(
      kafkaOutput
    )}`,
    status: 200,
  };
}

const extraOutputs = [];
extraOutputs.push(kafkaOutput);

app.http("kafkaOutputWithHttp", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  extraOutputs,
  handler: kafkaOutputWithHttp,
});
```

# [Event Hubs](#tab/event-hubs/v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript-v4/src/functions/kafkaOutputWithHttpTriggerWithHeaders.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Confluent](#tab/confluent/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaOutputWithHeaders/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Event Hubs](#tab/event-hubs/v3)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/typescript/KafkaOutputWithHeaders/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

---

# [Version 4](#tab/v4) 

For a complete set of working TypeScript examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/tree/dev/samples/typescript-v4/src/functions).

# [Version 3](#tab/v3)

For a complete set of working TypeScript examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/typescript/). 


**Applies to: programming-language-powershell**


The specific properties of the function.json file depend on your event provider, which in these examples are either Confluent or Azure Event Hubs. The following examples show a Kafka output binding for a function that an HTTP request triggers and sends data from the request to the Kafka topic.

The following function.json defines the trigger for the specific provider in these examples:

# [Confluent](#tab/confluent)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaOutput/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Event Hubs](#tab/event-hubs)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaOutput/function.eventhub.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

---

The following code sends a message to the topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaOutput/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following code sends multiple messages as an array to the same topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaOutputMany/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following example shows how to send an event message with headers to the same Kafka topic: 

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/powershell/KafkaOutputWithHeaders/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

For a complete set of working PowerShell examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/powershell/). 

---


**Applies to: programming-language-python**

The usage of the output binding depends on your version of the Python programming model. 

# [Version 2](#tab/v2) 

In the Python v2 model, you define your output binding directly in your function code using decorators. For more information, see the [Azure Functions Python developer guide](functions-reference-python.md?pivots=python-mode-decorators).

# [Version 1](#tab/v1)

In the Python v1 model, you define your output binding in the `function.json` with your function code. For more information, see the [Azure Functions Python developer guide](functions-reference-python.md?pivots=python-mode-configuration).

---

These examples show a Kafka output binding for a function that an HTTP request triggers and sends data from the request to the Kafka topic.

# [Version 2](#tab/v2)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python-v2/kafka_output.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Version 1](#tab/v1)

This `function.json` file defines the output binding:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaOutput/function.confluent.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

This code sends a message to the topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaOutput/main.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

---

To send events in a batch, send an array of messages, as shown in these examples:

# [Version 2](#tab/v2)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python-v2/kafka_output.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Version 1](#tab/v1)

This code sends multiple messages as an array to the same topic:

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaOutputMany/main.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

---

These examples show how to send an event message with headers to a Kafka topic:

# [Version 2](#tab/v2)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python-v2/kafka_output.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

# [Version 1](#tab/v1)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/python/KafkaOutputWithHeaders/__init__.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

---

# [Version 2](#tab/v2) 

For a complete set of working Python examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/python-v2/).

# [Version 1](#tab/v1)

For a complete set of working Python examples, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/blob/dev/samples/python/). 

---


**Applies to: programming-language-java**


The annotations you use to configure the output binding depend on the specific event provider.

# [Confluent](#tab/confluent)

The following function sends a message to the Kafka topic.

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/confluent/src/main/java/com/contoso/kafka/SampleKafkaOutput.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following example shows how to send multiple messages to a Kafka topic. 

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/confluent/src/main/java/com/contoso/kafka/KafkaOutputMany.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

In this example, the output binding parameter is changed to string array.

The last example uses these `KafkaEntity` and `KafkaHeader` classes: 

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/confluent/src/main/java/com/contoso/kafka/entity/KafkaEntity.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/confluent/src/main/java/com/contoso/kafka/entity/KafkaHeaders.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following example function sends a message with headers to a Kafka topic.

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/confluent/src/main/java/com/contoso/kafka/KafkaOutputWithHeaders.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

For a complete set of working Java examples for Confluent, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/tree/dev/samples/java/confluent/src/main/java/com/contoso/kafka). 

# [Event Hubs](#tab/event-hubs)

The following function sends a message to the Kafka topic.

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/eventhub/src/main/java/com/contoso/kafka/SampleKafkaOutput.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following example shows how to send multiple messages to a Kafka topic. 

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/eventhub/src/main/java/com/contoso/kafka/KafkaOutputMany.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

In this example, the output binding parameter is changed to string array.

The last example uses these `KafkaEntity` and `KafkaHeader` classes: 

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/eventhub/src/main/java/com/contoso/kafka/entity/KafkaEntity.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/eventhub/src/main/java/com/contoso/kafka/entity/KafkaHeaders.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

The following example function sends a message with headers to a Kafka topic.

[Code reference unavailable in this source snapshot: ~/azure-functions-kafka-extension/samples/java/eventhub/src/main/java/com/contoso/kafka/KafkaOutputWithHeaders.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka-output.md)

For a complete set of working Java examples for Confluent, see the [Kafka extension repository](https://github.com/Azure/azure-functions-kafka-extension/tree/dev/samples/java/eventhub/src/main/java/com/contoso/kafka). 

---


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use the `Kafka` attribute to define the function trigger. 

The following table explains the properties you can set by using this attribute:

| Parameter | Description |
| --- | --- |
| **BrokerList** | (Required) The list of Kafka brokers to which the output is sent. See [Connections](#connections) for more information. |
| **Topic** | (Required) The topic to which the output is sent. |
| **AvroSchema** | (Optional) Schema of a generic record of message value when using the Avro protocol. |
| **KeyAvroSchema** | (Optional) Schema of a generic record of message key when using the Avro protocol. |
| **KeyDataType** | (Optional) Data type to send the message key as to Kafka Topic. If `KeyAvroSchema` is set, this value is generic record. Accepted values are `Int`, `Long`, `String`, and `Binary`. |
| **MaxMessageBytes** | (Optional) The maximum size of the output message being sent (in MB), with a default value of `1`. |
| **BatchSize** | (Optional) Maximum number of messages batched in a single message set, with a default value of `10000`. |
| **EnableIdempotence** | (Optional) When set to `true`, guarantees that messages are successfully produced exactly once and in the original produce order, with a default value of `false` |
| **MessageTimeoutMs** | (Optional) The local message timeout, in milliseconds. This value is only enforced locally and limits the time a produced message waits for successful delivery, with a default `300000`. A time of `0` is infinite. This value is the maximum time used to deliver a message (including retries). Delivery error occurs when either the retry count or the message timeout are exceeded. |
| **RequestTimeoutMs** | (Optional) The acknowledgment timeout of the output request, in milliseconds, with a default of `5000`. |
| **MaxRetries** | (Optional) The number of times to retry sending a failing Message, with a default of `2`. Retrying may cause reordering, unless `EnableIdempotence` is set to `true`. |
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
[KafkaOutput(
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

The `KafkaOutput` annotation enables you to create a function that writes to a specific topic. Supported options include the following elements:

| Element | Description |
| --- | --- |
| **name** | The name of the variable that represents the brokered data in function code. |
| **brokerList** | (Required) The list of Kafka brokers to which the output is sent. See [Connections](#connections) for more information. |
| **topic** | (Required) The topic to which the output is sent. |
| **dataType** | Defines how Functions handles the parameter value. By default, the value is obtained as a string and Functions tries to  deserialize the string to actual plain-old Java object (POJO). When `string`, the input is treated as just a string. When `binary`, the message is received as binary data, and Functions tries to deserialize it to an actual parameter type byte[]. |
| **avroSchema** | (Optional) Schema of a generic record when using the Avro protocol. ([Currently not supported for Java](https://github.com/Azure/azure-functions-java-library/issues/198).) |
| **maxMessageBytes** | (Optional) The maximum size of the output message being sent (in MB), with a default value of `1`. |
| **batchSize** | (Optional) Maximum number of messages batched in a single message set, with a default value of `10000`. |
| **enableIdempotence** | (Optional) When set to `true`, guarantees that messages are successfully produced exactly once and in the original produce order, with a default value of `false`. |
| **messageTimeoutMs** | (Optional) The local message timeout, in milliseconds. This value is only enforced locally and limits the time a produced message waits for successful delivery, with a default `300000`. A time of `0` is infinite. This value is the maximum time used to deliver a message (including retries). Delivery error occurs when either the retry count or the message timeout are exceeded. |
| **requestTimeoutMs** | (Optional) The acknowledgment timeout of the output request, in milliseconds, with a default of `5000`. |
| **maxRetries** | (Optional) The number of times to retry sending a failing Message, with a default of `2`. Retrying might cause reordering, unless `EnableIdempotence` is set to `true`. |
| **authenticationMode** | (Optional) The authentication mode when using Simple Authentication and Security Layer (SASL) authentication. The supported values are `NotSet` (default), `Gssapi`, `Plain`, `ScramSha256`, `ScramSha512`. |
| **username** | (Optional) The username for SASL authentication. Not supported when `AuthenticationMode` is `Gssapi`. See [Connections](#connections) for more information. |
| **password** | (Optional) The password for SASL authentication. Not supported when `AuthenticationMode` is `Gssapi`. See [Connections](#connections) for more information. |
| **protocol** | (Optional) The security protocol used when communicating with brokers. The supported values are `NotSet` (default), `plaintext`, `ssl`, `sasl_plaintext`, `sasl_ssl`. |
| **sslCaLocation** | (Optional) Path to CA certificate file for verifying the broker's certificate. |
| **sslCertificateLocation** | (Optional) Path to the client's certificate. |
| **sslKeyLocation** | (Optional) Path to client's private key (PEM) used for authentication. |
| **sslKeyPassword** | (Optional) Password for client's certificate. |
| **schemaRegistryUrl** | (Optional) URL for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **schemaRegistryUsername** | (Optional) Username for the Avro Schema Registry. See [Connections](#connections) for more information. |
| **schemaRegistryPassword** | (Optional) Password for the Avro Schema Registry. See [Connections](#connections) for more information. |


**Applies to: programming-language-javascript,programming-language-powershell**


## Configuration

The following table explains the binding configuration properties that you set in the *function.json* file.

| _function.json_ property | Description |
| --- | --- |
| **type** | Set to `kafka`. |
| **direction** | Set to `out`. |
| **name** | The name of the variable that represents the brokered data in function code. |
| **brokerList** | (Required) The list of Kafka brokers to which the output is sent. See [Connections](#connections) for more information. |
| **topic** | (Required) The topic to which the output is sent. |
| **avroSchema** | (Optional) Schema of a generic record when using the Avro protocol. |
| **keyAvroSchema** | (Optional) Schema of a generic record of message key when using the Avro protocol. |
| **keyDataType** | (Optional) Data type to send the message key as to Kafka Topic. If `keyAvroSchema` is set, this value is generic record. Accepted values are `Int`, `Long`, `String`, and `Binary`. |
| **maxMessageBytes** | (Optional) The maximum size of the output message being sent (in MB), with a default value of `1`. |
| **batchSize** | (Optional) Maximum number of messages batched in a single message set, with a default value of `10000`. |
| **enableIdempotence** | (Optional) When set to `true`, guarantees that messages are successfully produced exactly once and in the original produce order, with a default value of `false`. |
| **messageTimeoutMs** | (Optional) The local message timeout, in milliseconds. This value is only enforced locally and limits the time a produced message waits for successful delivery, with a default `300000`. A time of `0` is infinite. This value is the maximum time used to deliver a message (including retries). Delivery error occurs when either the retry count or the message timeout are exceeded. |
| **requestTimeoutMs** | (Optional) The acknowledgment timeout of the output request, in milliseconds, with a default of `5000`. |
| **maxRetries** | (Optional) The number of times to retry sending a failing Message, with a default of `2`. Retrying might cause reordering, unless `EnableIdempotence` is set to `true`. |
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
| **type** | Set to `kafka`. |
| **direction** | Set to `out`. |
| **name** | The name of the variable that represents the brokered data in function code. |
| **broker_list** | (Required) The list of Kafka brokers to which the output is sent. See [Connections](#connections) for more information. |
| **topic** | (Required) The topic to which the output is sent. |
| **avroSchema** | (Optional) Schema of a generic record when using the Avro protocol. |
| **maxMessageBytes** | (Optional) The maximum size of the output message being sent (in MB), with a default value of `1`. |
| **batchSize** | (Optional) Maximum number of messages batched in a single message set, with a default value of `10000`. |
| **enableIdempotence** | (Optional) When set to `true`, guarantees that messages are successfully produced exactly once and in the original produce order, with a default value of `false`. |
| **messageTimeoutMs** | (Optional) The local message timeout, in milliseconds. This value is only enforced locally and limits the time a produced message waits for successful delivery, with a default `300000`. A time of `0` is infinite. This value is the maximum time used to deliver a message (including retries). Delivery error occurs when either the retry count or the message timeout are exceeded. |
| **requestTimeoutMs** | (Optional) The acknowledgment timeout of the output request, in milliseconds, with a default of `5000`. |
| **maxRetries** | (Optional) The number of times to retry sending a failing Message, with a default of `2`. Retrying might cause reordering, unless `EnableIdempotence` is set to `true`. |
| **authentication_mode** | (Optional) The authentication mode when using Simple Authentication and Security Layer (SASL) authentication. The supported values are `NOTSET` (default), `Gssapi`, `Plain`, `ScramSha256`, `ScramSha512`. |
| **username** | (Optional) The username for SASL authentication. Not supported when `authentication_mode` is `Gssapi`. See [Connections](#connections) for more information. |
| **password** | (Optional) The password for SASL authentication. Not supported when `authentication_mode` is `Gssapi`. See [Connections](#connections) for more information. |
| **protocol** | (Optional) The security protocol used when communicating with brokers. The supported values are `NOTSET` (default), `plaintext`, `ssl`, `sasl_plaintext`, `sasl_ssl`. |
| **sslCaLocation** | (Optional) Path to CA certificate file for verifying the broker's certificate. |
| **sslCertificateLocation** | (Optional) Path to the client's certificate. |
| **sslKeyLocation** | (Optional) Path to client's private key (PEM) used for authentication. |
| **sslKeyPassword** | (Optional) Password for client's certificate. |
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

Both key and value types work with built-in [Avro](http://avro.apache.org/docs/current/) and [Protobuf](https://developers.google.com/protocol-buffers/) serialization.


**Applies to: programming-language-javascript,programming-language-python,programming-language-powershell**

The offset, partition, and timestamp for the event are generated at runtime. You can set only the value and headers inside the function. You set the topic in the function.json file.


Make sure you have access to the Kafka topic where you want to write. You configure the binding with access and connection credentials to the Kafka topic. 

In a Premium plan, you must enable runtime scale monitoring for the Kafka output to scale out to multiple instances. To learn more, see [Enable runtime scaling](functions-bindings-kafka.md#enable-runtime-scaling).

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

- [Run a function from an Apache Kafka event stream](functions-bindings-kafka-trigger.md)
