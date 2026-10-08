---
title: Azure IoT Hub trigger for Azure Functions
description: Learn to respond to events sent to an IoT hub event stream in Azure Functions.
ms.topic: reference
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
ms.date: 03/04/2022
zone_pivot_groups: programming-languages-set-functions
---

# Azure IoT Hub trigger for Azure Functions

This article explains how to work with Azure Functions bindings for IoT Hub. The IoT Hub support is based on the [Azure Event Hubs Binding](functions-bindings-event-hubs.md).

For information on setup and configuration details, see the [overview](functions-bindings-event-iot.md).

> **Important:**
> While the following code samples use the Event Hubs API, the given syntax is applicable for IoT Hub functions.


Use the function trigger to respond to an event sent to an event hub event stream. You need read access to the underlying event hub to set up the trigger. When the function is triggered, the message passed to the function is typed as a string.

Event Hubs scaling decisions for the Consumption and Premium plans are done via Target Based Scaling. For more information, see [Target Based Scaling](functions-target-based-scaling.md).

For information about how Azure Functions responds to events sent to an event hub event stream using triggers, see [Integrate Event Hubs with serverless functions on Azure](https://learn.microsoft.com/azure/architecture/serverless/event-hubs-functions/event-hubs-functions#consuming-events-with-azure-functions).

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



For a complete end-to-end example of using the Event Hubs trigger, see [Process real-time events by using Azure Functions](scenario-real-time-events-processing.md).

## Example

**Applies to: programming-language-csharp**


# [Isolated worker model](#tab/isolated-process)

The following example shows a [C# function](dotnet-isolated-process-guide.md) that is triggered based on an event hub, where the input message string is written to the logs:

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/EventHubs/EventHubsFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-trigger.md)

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

The following example shows a [C# function](functions-dotnet-class-library.md) that logs the message body of the Event Hubs trigger.

```csharp
[FunctionName("EventHubTriggerCSharp")]
public void Run([EventHubTrigger("samples-workitems", Connection = "EventHubConnectionAppSetting")] string myEventHubMessage, ILogger log)
{
    log.LogInformation($"C# function triggered to process a message: {myEventHubMessage}");
}
```

To get access to [event metadata](#event-metadata) in function code, bind to an [EventData](https://learn.microsoft.com/dotnet/api/microsoft.servicebus.messaging.eventdata) object. You can also access the same properties by using binding expressions in the method signature. The following example shows both ways to get the same data:

```csharp
[FunctionName("EventHubTriggerCSharp")]
public void Run(
    [EventHubTrigger("samples-workitems", Connection = "EventHubConnectionAppSetting")] EventData myEventHubMessage,
    DateTime enqueuedTimeUtc,
    Int64 sequenceNumber,
    string offset,
    ILogger log)
{
    log.LogInformation($"Event: {Encoding.UTF8.GetString(myEventHubMessage.Body)}");
    // Metadata accessed by binding to EventData
    log.LogInformation($"EnqueuedTimeUtc={myEventHubMessage.SystemProperties.EnqueuedTimeUtc}");
    log.LogInformation($"SequenceNumber={myEventHubMessage.SystemProperties.SequenceNumber}");
    log.LogInformation($"Offset={myEventHubMessage.SystemProperties.Offset}");
    // Metadata accessed by using binding expressions in method parameters
    log.LogInformation($"EnqueuedTimeUtc={enqueuedTimeUtc}");
    log.LogInformation($"SequenceNumber={sequenceNumber}");
    log.LogInformation($"Offset={offset}");
}
```

To receive events in a batch, make `string` or `EventData` an array.  

> **Note:**
> When receiving in a batch, you cannot bind to method parameters like in the above example with `DateTime enqueuedTimeUtc` and must receive these from each `EventData` object  

```cs
[FunctionName("EventHubTriggerCSharp")]
public void Run([EventHubTrigger("samples-workitems", Connection = "EventHubConnectionAppSetting")] EventData[] eventHubMessages, ILogger log)
{
    foreach (var message in eventHubMessages)
    {
        log.LogInformation($"C# function triggered to process a message: {Encoding.UTF8.GetString(message.Body)}");
        log.LogInformation($"EnqueuedTimeUtc={message.SystemProperties.EnqueuedTimeUtc}");
    }
}
```
---


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following example shows an Event Hubs trigger [TypeScript function](functions-reference-node.md?tabs=typescript). The function reads [event metadata](#event-metadata) and logs the message.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/eventHubTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-trigger.md)

To receive events in a batch, set `cardinality` to `many`, as shown in the following example.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/eventHubTrigger2.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-trigger.md)

# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

The following example shows an Event Hubs trigger [JavaScript function](functions-reference-node.md). The function reads [event metadata](#event-metadata) and logs the message.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/eventHubTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-trigger.md)

To receive events in a batch, set `cardinality` to `many`, as shown in the following example.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/eventHubTrigger2.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-trigger.md)

# [Model v3](#tab/nodejs-v3)

The following example shows an Event Hubs trigger binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding. The function reads [event metadata](#event-metadata) and logs the message.

```json
{
  "type": "eventHubTrigger",
  "name": "myEventHubMessage",
  "direction": "in",
  "eventHubName": "MyEventHub",
  "connection": "myEventHubReadConnectionAppSetting"
}
```

Here's the JavaScript code:

```javascript
module.exports = function (context, myEventHubMessage) {
    context.log('Function triggered to process a message: ', myEventHubMessage);
    context.log('EnqueuedTimeUtc =', context.bindingData.enqueuedTimeUtc);
    context.log('SequenceNumber =', context.bindingData.sequenceNumber);
    context.log('Offset =', context.bindingData.offset);

    context.done();
};
```

To receive events in a batch, set `cardinality` to `many` in the *function.json* file, as shown in the following examples.

```json
{
  "type": "eventHubTrigger",
  "name": "eventHubMessages",
  "direction": "in",
  "eventHubName": "MyEventHub",
  "cardinality": "many",
  "connection": "myEventHubReadConnectionAppSetting"
}
```

Here's the JavaScript code:

```javascript
module.exports = function (context, eventHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array ${eventHubMessages}`);

    eventHubMessages.forEach((message, index) => {
        context.log(`Processed message ${message}`);
        context.log(`EnqueuedTimeUtc = ${context.bindingData.enqueuedTimeUtcArray[index]}`);
        context.log(`SequenceNumber = ${context.bindingData.sequenceNumberArray[index]}`);
        context.log(`Offset = ${context.bindingData.offsetArray[index]}`);
    });

    context.done();
};
```

---


**Applies to: programming-language-powershell**


Here's the PowerShell code:

```powershell
param($eventHubMessages, $TriggerMetadata)

Write-Host "PowerShell eventhub trigger function called for message array: $eventHubMessages"

$eventHubMessages | ForEach-Object { Write-Host "Processed message: $_" }
```


**Applies to: programming-language-python**

This example uses SDK types to directly access the underlying [`EventData`](https://learn.microsoft.com/python/api/azure-eventhub/azure.eventhub.eventdata) object provided by the Event Hubs trigger: 

The function reads the event body and logs it.
```python
import logging
import azure.functions as func
import azurefunctions.extensions.bindings.eventhub as eh

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.event_hub_message_trigger(
    arg_name="event", event_hub_name="EVENTHUB_NAME", connection="EventHubConnection"
)
def eventhub_trigger(event: eh.EventData):
    logging.info(
        "Python EventHub trigger processed an event %s",
        event.body_as_str()
    )
```
For examples of using the EventData type, see the [`EventData`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-eventhub/samples/eventhub_samples_eventdata/function_app.py) samples. For a step-by-step tutorial on how to include SDK-type bindings in your function app, follow the [Python SDK Bindings for Event Hubs Sample](https://github.com/Azure-Samples/azure-functions-eventhub-sdk-bindings-python).

> **Note:**  
> Known limitations include:
> - The `enqueued_time` property is not supported.
> - Batch message support is supported with runtime version 4.1039 or greater.

To learn more, including what other SDK type bindings are supported, see [SDK type bindings](functions-reference-python.md#sdk-type-bindings).

The following example shows an Event Hubs trigger binding and a Python function that uses the binding. The function reads [event metadata](#event-metadata) and logs the message. The example depends on whether you use the [v1 or v2 Python programming model](functions-reference-python.md).

# [v2](#tab/python-v2)

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="EventHubTrigger1")
@app.event_hub_message_trigger(arg_name="myhub", 
                               event_hub_name="<EVENT_HUB_NAME>",
                               connection="<CONNECTION_SETTING>") 
def test_function(myhub: func.EventHubEvent):
    logging.info('Python EventHub trigger processed an event: %s',
                myhub.get_body().decode('utf-8'))
```

# [v1](#tab/python-v1)

The following examples show Event Hubs binding data in the *function.json* file.

```json
{
  "type": "eventHubTrigger",
  "name": "event",
  "direction": "in",
  "eventHubName": "MyEventHub",
  "connection": "myEventHubReadConnectionAppSetting"
}
```

Here's the Python code:

```python
import logging
import azure.functions as func


def main(event: func.EventHubEvent):
    logging.info(f'Function triggered to process a message: {event.get_body().decode()}')
    logging.info(f'  EnqueuedTimeUtc = {event.enqueued_time}')
    logging.info(f'  SequenceNumber = {event.sequence_number}')
    logging.info(f'  Offset = {event.offset}')

    # Metadata
    for key in event.metadata:
        logging.info(f'Metadata: {key} = {event.metadata[key]}')
```

---


**Applies to: programming-language-java**


The following example shows an Event Hubs trigger binding which logs the message body of the Event Hubs trigger.

```java
@FunctionName("ehprocessor")
public void eventHubProcessor(
  @EventHubTrigger(name = "msg",
                  eventHubName = "myeventhubname",
                  connection = "myconnvarname") String message,
       final ExecutionContext context )
       {
          context.getLogger().info(message);
 }
```

 In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `EventHubTrigger` annotation on parameters whose value comes from the event hub. Parameters with these annotations cause the function to run when an event arrives. This annotation can be used with native Java types, POJOs, or nullable values using `Optional<T>`.


The following example illustrates extensive use of `SystemProperties` and other Binding options for further introspection of the Event along with providing a well-formed `BlobOutput` path that is Date hierarchical.

```java
package com.example;
import java.util.Map;
import java.time.ZonedDateTime;

import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;

/**
 * Azure Functions with Event Hub trigger.
 * and Blob Output using date in path along with message partition ID
 * and message sequence number from EventHub Trigger Properties
 */
public class EventHubReceiver {

    @FunctionName("EventHubReceiver")
    @StorageAccount("bloboutput")
                                
    public void run(
            @EventHubTrigger(name = "message",
                eventHubName = "%eventhub%",
                consumerGroup = "%consumergroup%",
                connection = "eventhubconnection",
                cardinality = Cardinality.ONE)
            String message,
            
            final ExecutionContext context,
            
            @BindingName("Properties") Map<String, Object> properties,
            @BindingName("SystemProperties") Map<String, Object> systemProperties,
            @BindingName("PartitionContext") Map<String, Object> partitionContext,
            @BindingName("EnqueuedTimeUtc") Object enqueuedTimeUtc,

            @BlobOutput(
                name = "outputItem",
                path = "iotevents/{datetime:yy}/{datetime:MM}/{datetime:dd}/{datetime:HH}/" +
                       "{datetime:mm}/{PartitionContext.PartitionId}/{SystemProperties.SequenceNumber}.json")
            OutputBinding<String> outputItem) {

        var et = ZonedDateTime.parse(enqueuedTimeUtc + "Z"); // needed as the UTC time presented does not have a TZ
                                                             // indicator
        context.getLogger().info("Event hub message received: " + message + ", properties: " + properties);
        context.getLogger().info("Properties: " + properties);
        context.getLogger().info("System Properties: " + systemProperties);
        context.getLogger().info("partitionContext: " + partitionContext);
        context.getLogger().info("EnqueuedTimeUtc: " + et);

        outputItem.setValue(message);
    }
}

```



**Applies to: programming-language-go**


The following example shows an Event Hubs trigger function that logs incoming event messages:

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
	app.EventHub("eventHubTrigger", processEvent,
		sdk.WithEventHubName("myeventhub"),
		sdk.WithConnection("EventHubConnection"),
	)
	worker.Start(app)
}

func processEvent(ctx context.Context, event bindings.EventHubMessage) error {
	log.Printf("Event Hub trigger processed a message: %s", event.Body)
	return nil
}
```



**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use attributes to configure the trigger. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#event-hubs-trigger).

# [Isolated worker model](#tab/isolated-process)

Use the `EventHubTriggerAttribute` to define a trigger on an event hub, which supports the following properties.

| Parameters | Description |
| --- | --- |
| **EventHubName** | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. Can be referenced in [app settings](functions-bindings-expressions-patterns.md#binding-expressions---app-settings), like `%eventHubName%` |
| **ConsumerGroup** | An optional property that sets the [consumer group](../event-hubs/event-hubs-features.md#event-consumers) used to subscribe to events in the hub. When omitted, the `$Default` consumer group is used. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Event Hubs. To learn more, see [Connections](#connections). |

# [In-process model](#tab/in-process)

In [C# class libraries](functions-dotnet-class-library.md), use the [EventHubTriggerAttribute], which supports the following properties.

| Parameters | Description |
| --- | --- |
| **EventHubName** | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. Can be referenced in [app settings](functions-bindings-expressions-patterns.md#binding-expressions---app-settings), like `%eventHubName%` |
| **ConsumerGroup** | An optional property that sets the [consumer group](../event-hubs/event-hubs-features.md#event-consumers) used to subscribe to events in the hub. When omitted, the `$Default` consumer group is used. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Event Hubs. To learn more, see [Connections](#connections). |

---



**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

For Python v2 functions defined using a decorator, the following properties on the `event_hub_message_trigger`:

| Property | Description |
| --- | --- |
| `arg_name` | The name of the variable that represents the event item in function code. |
| `event_hub_name` | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. |
| `connection` | The name of an app setting or setting collection that specifies how to connect to Event Hubs. See [Connections](#connections). |

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.


**Applies to: programming-language-java**

## Annotations

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the [EventHubTrigger](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhubtrigger) annotation, which supports the following settings:

+ [name](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhuboutput.name)
+ [dataType](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhuboutput.datatype)
+ [eventHubName](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhuboutput.eventhubname)
+ [connection](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhuboutput.connection)
+ [cardinality](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhubtrigger.cardinality)
+ [consumerGroup](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhubtrigger.consumergroup)


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-powershell**


## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `app.eventHub()` method.

| Property | Description |
| --- | --- |
| **eventHubName** | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. Can be referenced via [app settings](functions-bindings-expressions-patterns.md#binding-expressions---app-settings) `%eventHubName%` |
| **consumerGroup** | An optional property that sets the [consumer group](../event-hubs/event-hubs-features.md#event-consumers) used to subscribe to events in the hub. If omitted, the `$Default` consumer group is used. |
| **cardinality** | Set to `many` in order to enable batching. If omitted or set to `one`, a single message is passed to the function. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Event Hubs. See [Connections](#connections). |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `eventHubTrigger`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to `in`. This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that represents the event item in function code. |
| **eventHubName** | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. Can be referenced via [app settings](functions-bindings-expressions-patterns.md#binding-expressions---app-settings) `%eventHubName%` |
| **consumerGroup** | An optional property that sets the [consumer group](../event-hubs/event-hubs-features.md#event-consumers) used to subscribe to events in the hub. If omitted, the `$Default` consumer group is used. |
| **cardinality** | Set to `many` in order to enable batching. If omitted or set to `one`, a single message is passed to the function. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Event Hubs. See [Connections](#connections). |

---


**Applies to: programming-language-powershell,programming-language-python**


The following table explains the trigger configuration properties that you set in the *function.json* file.

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `eventHubTrigger`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to `in`. This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that represents the event item in function code. |
| **eventHubName** | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. Can be referenced via [app settings](functions-bindings-expressions-patterns.md#binding-expressions---app-settings) `%eventHubName%` |
| **consumerGroup** | An optional property that sets the [consumer group](../event-hubs/event-hubs-features.md#event-consumers) used to subscribe to events in the hub. If omitted, the `$Default` consumer group is used. |
| **cardinality** | Set to `many` in order to enable batching. If omitted or set to `one`, a single message is passed to the function. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Event Hubs. See [Connections](#connections). |
| **dataType** | An optional property that sets the type of the trigger input. Choose `string` or `binary` if the input is not valid JSON. |



When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 


## Usage

To learn more about how Event Hubs trigger and IoT Hub trigger scales, see [Consuming Events with Azure Functions](https://learn.microsoft.com/azure/architecture/serverless/event-hubs-functions/event-hubs-functions#consuming-events-with-azure-functions).

**Applies to: programming-language-python**

Functions also supports Python SDK type bindings for Azure Event Hubs, which lets you work with data using these underlying SDK types:

+ [`EventData`](https://learn.microsoft.com/python/api/azure-eventhub/azure.eventhub.eventdata)

> **Important:**  
> Support for Event Hubs SDK types in Python is in Preview and is only supported for the Python v2 programming model. For more information, see [SDK types in Python](functions-reference-python.md#sdk-type-bindings).



**Applies to: programming-language-csharp**

The parameter type supported by the Event Hubs output binding depends on the Functions runtime version, the extension package version, and the C# modality used. 

# [Extension v5.x+](#tab/extensionv5/in-process)

In-process C# class library functions supports the following types:

+ [Azure.Messaging.EventHubs.EventData](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata)
+ String
+ Byte array
+ Plain-old CLR object (POCO)

This version of [EventData](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata) drops support for the legacy `Body` type in favor of [EventBody](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata.eventbody).

# [Extension v3.x+](#tab/extensionv3/in-process)

In-process C# class library functions supports the following types:

+ [Microsoft.Azure.EventHubs.EventData](https://learn.microsoft.com/dotnet/api/microsoft.azure.eventhubs.eventdata)
+ String
+ Byte array
+ Plain-old CLR object (POCO)

# [Extension v5.x+](#tab/extensionv5/isolated-process)


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


# [Extension v3.x+](#tab/extensionv3/isolated-process)

Requires you to define a custom type, or use a string. More options are available to **Extension v5.x+**.

---


**Applies to: programming-language-java**

The parameter type can be one of the following:

+ Any native Java types such as int, String, byte[].
+ Nullable values using Optional.
+ Any POJO type.

To learn more, see the [EventHubTrigger](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhubtrigger) reference.



## Event metadata

The Event Hubs trigger provides several [metadata properties](functions-bindings-expressions-patterns.md). Metadata properties can be used as part of binding expressions in other bindings or as parameters in your code. The properties come from the [EventData](https://learn.microsoft.com/dotnet/api/microsoft.servicebus.messaging.eventdata) class.

| Property | Type | Description |
| --- | --- | --- |
| `PartitionContext` | [PartitionContext](https://learn.microsoft.com/dotnet/api/microsoft.servicebus.messaging.partitioncontext) | The `PartitionContext` instance. |
| `EnqueuedTimeUtc` | `DateTime` | The enqueued time in UTC. |
| `Offset` | `string` | The offset of the data relative to the event hub partition stream. The offset is a marker or identifier for an event within the Event Hubs stream. The identifier is unique within a partition of the Event Hubs stream. |
| `PartitionKey` | `string` | The partition to which event data should be sent. |
| `Properties` | `IDictionary<String,Object>` | The user properties of the event data. |
| `SequenceNumber` | `Int64` | The logical sequence number of the event. |
| `SystemProperties` | `IDictionary<String,Object>` | The system properties, including the event data. |

See [code examples](#example) that use these properties earlier in this article.

[EventHubTriggerAttribute]: https://learn.microsoft.com/dotnet/api/microsoft.azure.webjobs.eventhubtriggerattribute


## Connections

The `connection` property references environment configuration that contains the name of an application setting with a connection string. You get this connection string by selecting the **Connection Information** button for the [namespace](../event-hubs/event-hubs-create.md#create-an-event-hubs-namespace). The connection string must be for an Event Hubs namespace, not the event hub itself.

The connection string must have at least **read** permissions to activate the function. 

Store this connection string in an application setting with a name that matches the value you specify in the `connection` property of the binding configuration.

> **Note:**  
> The IoT Hub trigger doesn't support identity-based connections. If you need to use managed identities end-to-end, you can instead use IoT Hub Routing to send data to an event hub you control. In that way, outbound routing can be authenticated by using managed identity and the event is read [from that event hub using managed identity](functions-bindings-event-hubs-trigger.md?tabs=identity-based#connections).

## host.json properties

The [host.json](functions-host-json.md#eventhub) file contains settings that control Event Hubs trigger behavior. See the [host.json settings](functions-bindings-event-iot.md#hostjson-settings) section for details regarding available settings.

## Next steps

- [Write events to an event stream (Output binding)](functions-bindings-event-hubs-output.md)
