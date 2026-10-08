---
title: Azure Service Bus trigger for Azure Functions
description: Learn to run an Azure Function when as Azure Service Bus messages are created.
ms.assetid: daedacf0-6546-4355-a65c-50873e74f66b
ms.topic: reference
ms.date: 09/23/2026
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, powershell, python
zone_pivot_groups: programming-languages-set-functions
ms.custom:
  - devx-track-csharp
  - devx-track-python
  - devx-track-extended-java
  - devx-track-js
  - devx-track-ts
  - build-2025
  - sfi-ropc-nochange
---

# Azure Service Bus trigger for Azure Functions

Use the Service Bus trigger to respond to messages from a Service Bus queue or topic. 
Starting with extension version 3.1.0, you can trigger on a session-enabled queue or topic.

For information on setup and configuration details, see the [overview](functions-bindings-service-bus.md).

Service Bus scaling decisions for the Consumption and Premium plans are made based on target-based scaling. For more information, see [Target-based scaling](functions-target-based-scaling.md).

**Applies to: programming-language-javascript,programming-language-typescript**


> **Important:**
> This article uses tabs to support multiple versions of the Node.js programming model. The v4 model is generally available and is designed to have a more flexible and intuitive experience for JavaScript and TypeScript developers. For more details about how the v4 model works, refer to the [Azure Functions Node.js developer guide](functions-reference-node.md). To learn more about the differences between v3 and v4, refer to the [migration guide](functions-node-upgrade-v4.md). 


**Applies to: programming-language-python**

Azure Functions supports two programming models for Python. The way that you define your bindings depends on your chosen programming model.

# [v2](#tab/python-v2)
The Python v2 programming model lets you define bindings using decorators directly in your Python function code. For more information, see the [Python developer guide](functions-reference-python.md?pivots=python-mode-decorators#programming-model).

# [v1](#tab/python-v1)
The Python v1 programming model requires you to define bindings in a separate *function.json* file in the function folder. For more information, see the [Python developer guide](functions-reference-python.md?pivots=python-mode-configuration#programming-model).

---

This article supports both programming models.



## Example

**Applies to: programming-language-csharp**



A C# function can be created by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. Isolated worker process is required to support C# functions running on LTS and non-LTS versions .NET and the .NET Framework. Extensions for isolated worker process functions use `Microsoft.Azure.Functions.Worker.Extensions.*` namespaces.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Functions runtime. In a variation of this model, Functions can be run using [C# scripting](functions-reference-csharp.md), which is supported primarily for C# portal editing. Extensions for in-process functions use `Microsoft.Azure.WebJobs.Extensions.*` namespaces.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)

This code defines and initializes the `ILogger`: 

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/ServiceBus/ServiceBusReceivedMessageFunctions.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-trigger.md)

This example shows a [C# function](dotnet-isolated-process-guide.md) that receives a single Service Bus queue message and writes it to the logs:

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/ServiceBus/ServiceBusReceivedMessageFunctions.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-trigger.md)

This example shows a [C# function](dotnet-isolated-process-guide.md) that receives multiple Service Bus queue messages in a single batch and writes each to the logs:

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/ServiceBus/ServiceBusReceivedMessageFunctions.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-trigger.md)

This example shows a [C# function](dotnet-isolated-process-guide.md) that receives multiple Service Bus queue messages, writes it to the logs, and then settles the message as completed:

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/ServiceBus/ServiceBusReceivedMessageFunctions.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-trigger.md)

# [In-process model](#tab/in-process)

The following example shows a [C# function](functions-dotnet-class-library.md) that reads [message metadata](#message-metadata) and
logs a Service Bus queue message:

```cs
[FunctionName("ServiceBusQueueTriggerCSharp")]                    
public static void Run(
    [ServiceBusTrigger("myqueue", Connection = "ServiceBusConnection")] 
    string myQueueItem,
    Int32 deliveryCount,
    DateTime enqueuedTimeUtc,
    string messageId,
    ILogger log)
{
    log.LogInformation($"C# ServiceBus queue trigger function processed message: {myQueueItem}");
    log.LogInformation($"EnqueuedTimeUtc={enqueuedTimeUtc}");
    log.LogInformation($"DeliveryCount={deliveryCount}");
    log.LogInformation($"MessageId={messageId}");
}
```
---


**Applies to: programming-language-java**


The following Java function uses the `@ServiceBusQueueTrigger` annotation from the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime) to describe the configuration for a Service Bus queue trigger. The  function grabs the message placed on the queue and adds it to the logs.

```java
@FunctionName("sbprocessor")
 public void serviceBusProcess(
    @ServiceBusQueueTrigger(name = "msg",
                             queueName = "myqueuename",
                             connection = "myconnvarname") String message,
   final ExecutionContext context
 ) {
     context.getLogger().info(message);
 }
```

Java functions can also be triggered when a message is added to a Service Bus topic. The following example uses the `@ServiceBusTopicTrigger` annotation to describe the trigger configuration.

```java
@FunctionName("sbtopicprocessor")
    public void run(
        @ServiceBusTopicTrigger(
            name = "message",
            topicName = "mytopicname",
            subscriptionName = "mysubscription",
            connection = "ServiceBusConnection"
        ) String message,
        final ExecutionContext context
    ) {
        context.getLogger().info(message);
    }
```

**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)


This example uses the SDK type [`ServiceBusReceivedMessage`](https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusreceivedmessage) obtained from `ServiceBusMessageContext` provided by the Service Bus trigger:

[Code reference unavailable in this source snapshot: ~/functions-nodejs-extensions/azure-functions-nodejs-extensions-servicebus/samples/serviceBusSampleWithComplete/src/functions/serviceBusTopicTrigger.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-trigger.md)

For another example using SDK types see the [exponential backoff strategy sample](https://github.com/Azure/azure-functions-nodejs-extensions/blob/main/azure-functions-nodejs-extensions-servicebus/samples/serviceBusTriggerExponentialBackOff/src/functions/serviceBusTopicTrigger.ts). 


For more information, see [SDK types](functions-triggers-bindings.md#sdk-types) in the Node.js reference article. 

The following example shows a Service Bus trigger [TypeScript function](functions-triggers-bindings.md?tabs=typescript). The function reads [message metadata](#message-metadata) and logs a Service Bus queue message.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/serviceBusTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-trigger.md)

# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

The following example shows a Service Bus trigger [JavaScript function](functions-reference-node.md). The function reads [message metadata](#message-metadata) and logs a Service Bus queue message.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/serviceBusTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-trigger.md)

# [Model v3](#tab/nodejs-v3)

The following example shows a Service Bus trigger binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding. The function reads [message metadata](#message-metadata) and logs a Service Bus queue message.

Here's the binding data in the *function.json* file:

```json
{
"bindings": [
    {
    "queueName": "testqueue",
    "connection": "MyServiceBusConnection",
    "name": "myQueueItem",
    "type": "serviceBusTrigger",
    "direction": "in"
    }
],
"disabled": false
}
```

Here's the JavaScript script code:

```javascript
module.exports = async function(context, myQueueItem) {
    context.log('Node.js ServiceBus queue trigger function processed message', myQueueItem);
    context.log('EnqueuedTimeUtc =', context.bindingData.enqueuedTimeUtc);
    context.log('DeliveryCount =', context.bindingData.deliveryCount);
    context.log('MessageId =', context.bindingData.messageId);
};
```

---


**Applies to: programming-language-powershell**


The following example shows a Service Bus trigger binding in a *function.json* file and a [PowerShell function](functions-reference-powershell.md) that uses the binding. 

Here's the binding data in the *function.json* file:

```json
{
  "bindings": [
    {
      "name": "mySbMsg",
      "type": "serviceBusTrigger",
      "direction": "in",
      "topicName": "mytopic",
      "subscriptionName": "mysubscription",
      "connection": "AzureServiceBusConnectionString"
    }
  ]
}
```

Here's the function that runs when a Service Bus message is sent.

```powershell
param([string] $mySbMsg, $TriggerMetadata)

Write-Host "PowerShell ServiceBus queue trigger function processed message: $mySbMsg"
```


**Applies to: programming-language-python**

This example uses SDK types to directly access the underlying [`ServiceBusReceivedMessage`](https://learn.microsoft.com/python/api/azure-servicebus/azure.servicebus.servicebusreceivedmessage) object provided by the Service Bus trigger:

#### [Queue](#tab/queue)

[Code reference unavailable in this source snapshot: ~/functions-python-extensions/azurefunctions-extensions-bindings-servicebus/samples/servicebus_samples_single/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-trigger.md)

#### [Topic](#tab/topic)

[Code reference unavailable in this source snapshot: ~/functions-python-extensions/azurefunctions-extensions-bindings-servicebus/samples/servicebus_samples_single/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-trigger.md)

---

The function reads various properties of the `ServiceBusReceivedMessage` type and logs them.

For more examples using Service Bus SDK types, see the [`ServiceBusReceivedMessage`](https://github.com/Azure/azure-functions-python-extensions/tree/dev/azurefunctions-extensions-bindings-servicebus/samples/servicebus_samples_single) samples. For a step-by-step tutorial on how to include SDK-type bindings in your function app, follow the [Python SDK Bindings for Service Bus Sample](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-servicebus/samples/README.md).

> **Note:**  
> Known limitations include:
> - The `message` property is not supported.
> - Batch message support requires version 4.1039 or later of the Functions runtime.

To learn more, including what other SDK type bindings are supported, see [SDK type bindings](functions-reference-python.md#sdk-type-bindings).

This example demonstrates how to read a Service Bus queue message via a trigger. The example depends on whether you use the [v1 or v2 Python programming model](functions-reference-python.md).

# [v2](#tab/python-v2)

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="ServiceBusQueueTrigger1")
@app.service_bus_queue_trigger(arg_name="msg", 
                               queue_name="<QUEUE_NAME>", 
                               connection="<CONNECTION_SETTING>")
def test_function(msg: func.ServiceBusMessage):
    logging.info('Python ServiceBus queue trigger processed message: %s',
                 msg.get_body().decode('utf-8'))
```

# [v1](#tab/python-v1)

A Service Bus binding is defined in *function.json* where *type* is set to `serviceBusTrigger` and the queue is set by `queueName`.

```json
{
  "scriptFile": "__init__.py",
  "bindings": [
    {
      "name": "msg",
      "type": "serviceBusTrigger",
      "direction": "in",
      "queueName": "inputqueue",
      "connection": "AzureServiceBusConnectionString"
    }
  ]
}
```

The code in *_\_init_\_.py* declares a parameter as `func.ServiceBusMessage`, which allows you to read the queue message in your function.

```python
import azure.functions as func

import logging
import json

def main(msg: func.ServiceBusMessage):
    logging.info('Python ServiceBus queue trigger processed message.')

    result = json.dumps({
        'message_id': msg.message_id,
        'body': msg.get_body().decode('utf-8'),
        'content_type': msg.content_type,
        'expiration_time': msg.expiration_time,
        'label': msg.label,
        'partition_key': msg.partition_key,
        'reply_to': msg.reply_to,
        'reply_to_session_id': msg.reply_to_session_id,
        'scheduled_enqueue_time': msg.scheduled_enqueue_time,
        'session_id': msg.session_id,
        'time_to_live': msg.time_to_live,
        'to': msg.to,
        'user_properties': msg.user_properties,
        'metadata' : msg.metadata
    }, default=str)

    logging.info(result)
```

---

The following example demonstrates how to read a Service Bus queue topic via a trigger.

# [v2](#tab/python-v2)

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="ServiceBusTopicTrigger1")
@app.service_bus_topic_trigger(arg_name="message", 
                               topic_name="TOPIC_NAME", 
                               connection="CONNECTION_SETTING", 
                               subscription_name="SUBSCRIPTION_NAME")
def test_function(message: func.ServiceBusMessage):
    message_body = message.get_body().decode("utf-8")
    logging.info("Python ServiceBus topic trigger processed message.")
    logging.info("Message Body: " + message_body)
```

# [v1](#tab/python-v1)

A Service Bus binding is defined in *function.json* where *type* is set to `serviceBusTrigger`, the topic is set by `topicName`, and the subscription is set by `subscriptionName`.

```json
{
  "scriptFile": "__init__.py",
  "bindings": [
   {
     "type": "serviceBusTrigger",
     "direction": "in",
     "name": "msg",
     "topicName": "inputtopic",
     "subscriptionName": "inputsubscription",
     "connection": "AzureServiceBusConnectionString"
   }
  ]
}
```

The code in *_\_init_\_.py* declares a parameter as `func.ServiceBusMessage`, which allows you to read the topic in your function.

```python
import json

import azure.functions as azf


def main(msg: azf.ServiceBusMessage) -> str:
    result = json.dumps({
        'message_id': msg.message_id,
        'body': msg.get_body().decode('utf-8'),
        'content_type': msg.content_type,
        'delivery_count': msg.delivery_count,
        'expiration_time': (msg.expiration_time.isoformat() if
                            msg.expiration_time else None),
        'label': msg.label,
        'partition_key': msg.partition_key,
        'reply_to': msg.reply_to,
        'reply_to_session_id': msg.reply_to_session_id,
        'scheduled_enqueue_time': (msg.scheduled_enqueue_time.isoformat() if
                                   msg.scheduled_enqueue_time else None),
        'session_id': msg.session_id,
        'time_to_live': msg.time_to_live,
        'to': msg.to,
        'user_properties': msg.user_properties,
    })

    logging.info(result)
```

---


**Applies to: programming-language-go**


The following example shows an Azure Service Bus queue trigger function that logs incoming messages:

```go
package main

import (
	"context"
	"log"

	"github.com/azure/azure-functions-golang-worker/sdk"
	"github.com/azure/azure-functions-golang-worker/sdk/bindings"
	"github.com/azure/azure-functions-golang-worker/worker"
)

func main() {
	app := sdk.FunctionApp()
	app.ServiceBusQueue("serviceBusQueueTrigger", processMessage,
		sdk.WithQueueName("myqueue"),
		sdk.WithConnection("ServiceBusConnection"),
	)
	worker.Start(app)
}

func processMessage(ctx context.Context, msg bindings.ServiceBusMessage) error {
	log.Printf("Service Bus queue trigger processed message: %s", msg.Body)
  log.Printf("Message ID: %s", msg.MessageId)
	return nil
}
```


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use the [ServiceBusTriggerAttribute](https://github.com/Azure/azure-functions-servicebus-extension/blob/master/src/Microsoft.Azure.WebJobs.Extensions.ServiceBus/ServiceBusTriggerAttribute.cs) attribute to define the function trigger. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#service-bus-trigger).

# [Isolated worker model](#tab/isolated-process)

The following table explains the properties you can set using this trigger attribute:

| Property | Description |
| --- | --- |
| **QueueName** | Name of the queue to monitor. Set only if monitoring a queue, not for a topic. |
| **TopicName** | Name of the topic to monitor. Set only if monitoring a topic, not for a queue. |
| **SubscriptionName** | Name of the subscription to monitor. Set only if monitoring a topic, not for a queue. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |
| **IsBatched** | Messages are delivered in batches. Requires an array or collection type. |
| **IsSessionsEnabled** | `true` if connecting to a [session-aware](../service-bus-messaging/message-sessions.md) queue or subscription. `false` otherwise, which is the default value. |
| **AutoCompleteMessages** | `true` if the trigger should automatically complete the message after a successful invocation. `false` if it should not, such as when you are [handling message settlement in code](#usage). If not explicitly set, the behavior is based on the [`autoCompleteMessages` configuration in `host.json`][host-json-autoComplete]. |

# [In-process model](#tab/in-process)

The following table explains the properties you can set using this trigger attribute:

| Property | Description |
| --- | --- |
| **QueueName** | Name of the queue to monitor. Set only if monitoring a queue, not for a topic. |
| **TopicName** | Name of the topic to monitor. Set only if monitoring a topic, not for a queue. |
| **SubscriptionName** | Name of the subscription to monitor. Set only if monitoring a topic, not for a queue. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |
| **IsBatched** | Messages are delivered in batches. Requires an array or collection type. |
| **IsSessionsEnabled** | `true` if connecting to a [session-aware](../service-bus-messaging/message-sessions.md) queue or subscription. `false` otherwise, which is the default value. |
| **AutoComplete** | `true` Whether the trigger should automatically call complete after processing, or if the function code will manually call complete.<br/><br/>If set to `true`, the trigger completes the message automatically if the function execution completes successfully, and abandons the message otherwise.<br/><br/>When set to `false`, you are responsible for calling [ServiceBusReceiver](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusreceiver) methods to complete, abandon, or deadletter the message, session, or batch. When an exception is thrown (and none of the `ServiceBusReceiver` methods are called), then the lock remains. Once the lock expires, the message is requeued with the `DeliveryCount` incremented and the lock is automatically renewed. |

---
When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 



**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

For Python v2 functions defined using a decorator, the following properties on the `service_bus_queue_trigger`:

| Property | Description |
| --- | --- |
| `arg_name` | The name of the variable that represents the queue or topic message in function code. |
| `queue_name` | Name of the queue to monitor. Set only if monitoring a queue, not for a topic. |
| `connection` | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |
| `cardinality` | Set to `"many"` or `func.Cardinality.MANY` to enable batching. If omitted or set to `"one"` or `func.Cardinality.ONE`, a single message is passed to the function. |

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.


**Applies to: programming-language-java**

## Annotations

The `ServiceBusQueueTrigger` annotation allows you to create a function that runs when a Service Bus queue message is created. Configuration options available include the following properties:

| Property | Description |
| --- | --- |
| **name** | The name of the variable that represents the queue or topic message in function code. |
| **queueName** | Name of the queue to monitor.  Set only if monitoring a queue, not for a topic. |
| **topicName** | Name of the topic to monitor. Set only if monitoring a topic, not for a queue. |
| **subscriptionName** | Name of the subscription to monitor. Set only if monitoring a topic, not for a queue. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |
| **cardinality** | Set to `Cardinality.MANY` to enable batching. If omitted or set to `Cardinality.ONE`, a single message is passed to the function. |

The `ServiceBusTopicTrigger` annotation allows you to designate a topic and subscription to target what data triggers the function.

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 


See the trigger [example](#example) for more detail.


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `app.serviceBusQueue()` or `app.serviceBusTopic()` methods.

| Property | Description |
| --- | --- |
| **queueName** | Name of the queue to monitor. Set only if monitoring a queue, not for a topic. |
| **topicName** | Name of the topic to monitor. Set only if monitoring a topic, not for a queue. |
| **subscriptionName** | Name of the subscription to monitor. Set only if monitoring a topic, not for a queue. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |
| **isSessionsEnabled** | `true` if connecting to a [session-aware](../service-bus-messaging/message-sessions.md) queue or subscription. `false` otherwise, which is the default value. |
| **autoComplete** | Must be `true` for non-C# functions, which means that the trigger should either automatically call complete after processing, or the function code manually calls complete.<br/><br/>When set to `true`, the trigger completes the message automatically if the function execution completes successfully, and abandons the message otherwise.<br/><br/>Exceptions in the function results in the runtime call `abandonAsync` in the background. If no exception occurs, then `completeAsync` is called in the background. |
| **cardinality** | Set to `"many"` to enable batching. If omitted or set to `"one"`, a single message is passed to the function. |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `serviceBusTrigger`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to "in". This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that represents the queue or topic message in function code. |
| **queueName** | Name of the queue to monitor.  Set only if monitoring a queue, not for a topic. |
| **topicName** | Name of the topic to monitor. Set only if monitoring a topic, not for a queue. |
| **subscriptionName** | Name of the subscription to monitor. Set only if monitoring a topic, not for a queue. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |
| **isSessionsEnabled** | `true` if connecting to a [session-aware](../service-bus-messaging/message-sessions.md) queue or subscription. `false` otherwise, which is the default value. |
| **autoComplete** | Must be `true` for non-C# functions, which means that the trigger should either automatically call complete after processing, or the function code manually calls complete.<br/><br/>When set to `true`, the trigger completes the message automatically if the function execution completes successfully, and abandons the message otherwise.<br/><br/>Exceptions in the function results in the runtime call `abandonAsync` in the background. If no exception occurs, then `completeAsync` is called in the background. |

---

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 



**Applies to: programming-language-powershell,programming-language-python**


The following table explains the binding configuration properties that you set in the *function.json* file.

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `serviceBusTrigger`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to "in". This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that represents the queue or topic message in function code. |
| **queueName** | Name of the queue to monitor.  Set only if monitoring a queue, not for a topic. |
| **topicName** | Name of the topic to monitor. Set only if monitoring a topic, not for a queue. |
| **subscriptionName** | Name of the subscription to monitor. Set only if monitoring a topic, not for a queue. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |
| **isSessionsEnabled** | `true` if connecting to a [session-aware](../service-bus-messaging/message-sessions.md) queue or subscription. `false` otherwise, which is the default value. |
| **autoComplete** | Must be `true` for non-C# functions, which means that the trigger should either automatically call complete after processing, or the function code manually calls complete.<br/><br/>When set to `true`, the trigger completes the message automatically if the function execution completes successfully, and abandons the message otherwise.<br/><br/>Exceptions in the function results in the runtime call `abandonAsync` in the background. If no exception occurs, then `completeAsync` is called in the background. |
| **cardinality** | Set to `"many"` to enable batching. If omitted or set to `"one"`, a single message is passed to the function. |

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 




See the [Example section](#example) for complete examples.

## Usage

**Applies to: programming-language-csharp**

The following parameter types are supported by all C# modalities and extension versions:

| Type | Description |
| --- | --- |
| **[System.String](https://learn.microsoft.com/dotnet/api/system.string)** | Use when the message is simple text. |
| **byte[]** | Use for binary data messages. |
| **Object** | When a message contains JSON, Functions tries to deserialize the JSON data into known plain-old CLR object type. |

Messaging-specific parameter types contain additional message metadata. The specific types supported by the Service Bus trigger depend on the extension package version and the C# modality used.

# [Extension v5.x](#tab/extensionv5/in-process)

Use the [ServiceBusReceivedMessage](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusreceivedmessage) type to receive message metadata from Service Bus Queues and Subscriptions. To learn more, see [Messages, payloads, and serialization](../service-bus-messaging/service-bus-messages-payloads.md).

In [C# class libraries](functions-dotnet-class-library.md), the attribute's constructor takes the name of the queue or the topic and subscription. 


Use the `Connection` property of the `ServiceBusTrigger` attribute to specify the name of an app setting that contains the Service Bus connection string:

```csharp
[FunctionName("ServiceBusQueueTriggerCSharp")]
public static void Run(
  [ServiceBusTrigger("myqueue", Connection = "ServiceBusAppSetting")]
  string myQueueItem,
  ILogger log)
{
  // ...
}
```


# [Earlier extension versions](#tab/functionsv2/in-process)

Use the [Message](https://learn.microsoft.com/dotnet/api/microsoft.azure.servicebus.message) type to receive messages with metadata. To learn more, see [Messages, payloads, and serialization](../service-bus-messaging/service-bus-messages-payloads.md).


> On 30 September 2026, we'll retire the Azure Service Bus SDK libraries WindowsAzure.ServiceBus, Microsoft.Azure.ServiceBus, and com.microsoft.azure.servicebus, which don't conform to Azure SDK guidelines. We'll also end support of the SBMP protocol, so you'll no longer be able to use this protocol after 30 September 2026. Migrate to the latest Azure SDK libraries, which offer critical security updates and improved capabilities, before that date.
>
>Although the older libraries can still be used beyond 30 September 2026, they'll no longer receive official support and updates from Microsoft. For more information, see the [support retirement announcement](https://azure.microsoft.com/updates/retirement-notice-update-your-azure-service-bus-sdk-libraries-by-30-september-2026/).

In [C# class libraries](functions-dotnet-class-library.md), the attribute's constructor takes the name of the queue or the topic and subscription. 


Use the `Connection` property of the `ServiceBusTrigger` attribute to specify the name of an app setting that contains the Service Bus connection string:

```csharp
[FunctionName("ServiceBusQueueTriggerCSharp")]
public static void Run(
  [ServiceBusTrigger("myqueue", Connection = "ServiceBusAppSetting")]
  string myQueueItem,
  ILogger log)
{
  // ...
}
```


# [Extension 5.x and higher](#tab/extensionv5/isolated-process)


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

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.ServiceBus 5.14.1 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.ServiceBus/5.14.1) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

<sup>2</sup> When using `ServiceBusMessageActions`, set the [`AutoCompleteMessages` property of the trigger attribute](functions-bindings-service-bus-trigger.md#attributes) to `false`. This prevents the runtime from attempting to complete messages after a successful function invocation.

[ServiceBusReceivedMessage]: https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusreceivedmessage
[ServiceBusMessageActions]: https://github.com/Azure/azure-functions-dotnet-worker/blob/main/extensions/Worker.Extensions.ServiceBus/src/ServiceBusMessageActions.cs
[message settlement]: ../service-bus-messaging/message-transfers-locks-settlement.md#peeklock


# [Earlier extension versions](#tab/functionsv2/isolated-process)

Earlier versions of this extension in the isolated worker process only support binding to messaging-specific types. Additional options are available to **extension 5.x and higher**

---

When the `Connection` property isn't defined, Functions looks for an app setting named `AzureWebJobsServiceBus`, which is the default name for the Service Bus connection string. You can also set the `Connection` property to specify the name of an application setting that contains the Service Bus connection string to use.


**Applies to: programming-language-java**


The incoming Service Bus message is available via a `ServiceBusQueueMessage` or `ServiceBusTopicMessage` parameter.


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

Access the queue or topic message as the first argument to your function. The Service Bus message is passed into the function as either a string or JSON object.

# [Model v3](#tab/nodejs-v3)

Access the queue or topic message by using `context.bindings.<name from function.json>`. The Service Bus message is passed into the function as either a string or JSON object.

---


**Applies to: programming-language-powershell**

The Service Bus instance is available via the parameter configured in the *function.json* file's name property.

**Applies to: programming-language-python**

The queue message is available to the function via a parameter typed as `func.ServiceBusMessage`. The Service Bus message is passed into the function as either a string or JSON object.

Functions also support Python SDK type bindings for Azure Service Bus, which lets you work with data using these underlying SDK types:

+ [`ServiceBusReceivedMessage`](https://learn.microsoft.com/python/api/azure-servicebus/azure.servicebus.servicebusreceivedmessage)

> **Important:**  
> Support for Service Bus SDK types support in Python is in Preview and is only supported for the Python v2 programming model. For more information, see [SDK types in Python](functions-reference-python.md#sdk-type-bindings).



For a complete example, see [the examples section](#example).


## Connections

The `connection` property is a reference to a key in application settings that returns a value used by the Functions runtime to connect to the Service Bus instance used by the extension. The value of the connection property setting depends on the type of connection: 

+ **Managed identity connection**: The `connection` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to the Service Bus. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connection` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connection` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connection` property setting returns the actual connection string for the Service Bus instance. Because the connection string contains shared secret keys, you should consider using a managed identity connection, when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings). 

To obtain a connection string, follow the steps shown at [Get the management credentials](../service-bus-messaging/service-bus-dotnet-get-started-with-queues.md#get-the-connection-string). The connection string must be for a Service Bus namespace, not limited to a specific queue or topic.

If the app setting name begins with `AzureWebJobs`, you can specify only the remainder of the name. For example, if you set `connection` to `MyServiceBus`, the Functions runtime looks for an app setting named `AzureWebJobsMyServiceBus`. If you leave `connection` empty, the Functions runtime uses the default Service Bus connection string in the app setting that is named `AzureWebJobsServiceBus`.

### Scaling permissions

The Service Bus extension uses the Service Bus Administration API (`GetQueueRuntimePropertiesAsync` / `GetSubscriptionRuntimePropertiesAsync`) to retrieve accurate message counts for scale decisions. This API requires additional permissions beyond what is needed to send or receive messages:

- **SAS connection strings**: The SAS policy must include the **Manage** access right.
- **Identity-based connections**: The identity must be assigned the **Azure Service Bus Data Owner** role, or a custom role that includes `Microsoft.ServiceBus/namespaces/*/read`.

When the connection lacks these permissions you don't see errors at startup. Instead, the extension silently falls back to using peek-based message estimation, which is less accurate and could result in delayed or incorrect scaling decisions.

> **Tip:**
> For production workloads that rely on auto-scaling, include the **Manage** access right (SAS) or assign the **Azure Service Bus Data Owner** role (identity-based connections) to ensure accurate scale behavior. connection string in the app setting that is named `AzureWebJobsServiceBus`.

## Poison messages

Poison message handling can't be controlled or configured in Azure Functions. Service Bus handles poison messages itself.

## PeekLock behavior

The Functions runtime receives a message in [PeekLock mode](../service-bus-messaging/service-bus-performance-improvements.md#service-bus-receive-modes).

**Applies to: programming-language-javascript,programming-language-typescript,programming-language-java,programming-language-python,programming-language-powershell**

 By default, the runtime calls `Complete` on the message if the function finishes successfully, or calls `Abandon` if the function fails. You can disable automatic completion through with the [`autoCompleteMessages` property in `host.json`][host-json-autoComplete].

**Applies to: programming-language-csharp**

 By default, the runtime calls `Complete` on the message if the function finishes successfully, or calls `Abandon` if the function fails. You can disable automatic completion through with the [`autoCompleteMessages` property in `host.json`][host-json-autoComplete] or through a [property on the trigger attribute](#attributes). You should disable automatic completion if your function code handles message settlement.


If the function runs longer than the `PeekLock` timeout, the lock is automatically renewed as long as the function is running. The `maxAutoRenewDuration` is configurable in *host.json*, which maps to [ServiceBusProcessor.MaxAutoLockRenewalDuration](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.maxautolockrenewalduration). The default value of this setting is 5 minutes.

**Applies to: programming-language-csharp**

## Message metadata

Messaging-specific types let you easily retrieve [metadata as properties of the object](functions-bindings-expressions-patterns.md#trigger-metadata). These properties depend on the extension package version and the C# modality used.

# [Extension v5.x](#tab/extensionv5/in-process)

These properties are members of the [ServiceBusReceivedMessage](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusreceivedmessage) class.

| Property | Type | Description |
| --- | --- | --- |
| `ApplicationProperties` | `ApplicationProperties` | Properties set by the sender. |
| `ContentType` | `string` | A content type identifier utilized by the sender and receiver for application-specific logic. |
| `CorrelationId` | `string` | The correlation ID. |
| `DeliveryCount` | `Int32` | The number of deliveries. |
| `EnqueuedTime` | `DateTime` | The enqueued time in UTC. |
| `ScheduledEnqueueTimeUtc` | `DateTime` | The scheduled enqueued time in UTC. |
| `ExpiresAt` | `DateTime` | The expiration time in UTC. |
| `MessageId` | `string` | A user-defined value that Service Bus can use to identify duplicate messages, if enabled. |
| `ReplyTo` | `string` | The reply to queue address. |
| `Subject` | `string` | The application-specific label which can be used in place of the `Label` metadata property. |
| `To` | `string` | The send to address. |

# [Earlier extension versions](#tab/functionsv2/in-process)

These properties are members of the [Message](https://learn.microsoft.com/dotnet/api/microsoft.azure.servicebus.message) class.


> On 30 September 2026, we'll retire the Azure Service Bus SDK libraries WindowsAzure.ServiceBus, Microsoft.Azure.ServiceBus, and com.microsoft.azure.servicebus, which don't conform to Azure SDK guidelines. We'll also end support of the SBMP protocol, so you'll no longer be able to use this protocol after 30 September 2026. Migrate to the latest Azure SDK libraries, which offer critical security updates and improved capabilities, before that date.
>
>Although the older libraries can still be used beyond 30 September 2026, they'll no longer receive official support and updates from Microsoft. For more information, see the [support retirement announcement](https://azure.microsoft.com/updates/retirement-notice-update-your-azure-service-bus-sdk-libraries-by-30-september-2026/).

| Property | Type | Description |
| --- | --- | --- |
| `ContentType` | `string` | A content type identifier utilized by the sender and receiver for application-specific logic. |
| `CorrelationId` | `string` | The correlation ID. |
| `DeliveryCount` | `Int32` | The number of deliveries. |
| `ScheduledEnqueueTimeUtc` | `DateTime` | The scheduled enqueued time in UTC. |
| `ExpiresAtUtc` | `DateTime` | The expiration time in UTC. |
| `Label` | `string` | The application-specific label. |
| `MessageId` | `string` | A user-defined value that Service Bus can use to identify duplicate messages, if enabled. |
| `ReplyTo` | `string` | The reply to queue address. |
| `To` | `string` | The send to address. |
| `UserProperties` | `IDictionary<string, object>` | Properties set by the sender. |

# [Extension 5.x and higher](#tab/extensionv5/isolated-process)

These properties are members of the [ServiceBusReceivedMessage](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusreceivedmessage) class.

| Property | Type | Description |
| --- | --- | --- |
| `ApplicationProperties` | `ApplicationProperties` | Properties set by the sender. |
| `ContentType` | `string` | A content type identifier utilized by the sender and receiver for application-specific logic. |
| `CorrelationId` | `string` | The correlation ID. |
| `DeliveryCount` | `Int32` | The number of deliveries. |
| `EnqueuedTime` | `DateTime` | The enqueued time in UTC. |
| `ScheduledEnqueueTimeUtc` | `DateTime` | The scheduled enqueued time in UTC. |
| `ExpiresAt` | `DateTime` | The expiration time in UTC. |
| `MessageId` | `string` | A user-defined value that Service Bus can use to identify duplicate messages, if enabled. |
| `ReplyTo` | `string` | The reply to queue address. |
| `Subject` | `string` | The application-specific label which can be used in place of the `Label` metadata property. |
| `To` | `string` | The send to address. |


# [Earlier extension versions](#tab/functionsv2/isolated-process)

Earlier versions of this extension in the isolated worker process only support binding to messaging-specific types. Additional options are available to **Extension 5.x and higher**

---



## Next steps

- [Send Azure Service Bus messages from Azure Functions (Output binding)](functions-bindings-service-bus-output.md)


[upgrade your application to Functions 4.x]: migrate-version-1-version-4.md
[host-json-autoComplete]: functions-bindings-service-bus.md#hostjson-settings
