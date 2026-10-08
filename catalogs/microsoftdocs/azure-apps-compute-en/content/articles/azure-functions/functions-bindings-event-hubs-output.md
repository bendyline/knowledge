---
title: Azure Event Hubs output binding for Azure Functions
description: Learn to write messages to Azure Event Hubs streams using Azure Functions.
ms.assetid: daf81798-7acc-419a-bc32-b5a41c6db56b
ms.topic: reference
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
ms.date: 09/15/2026
zone_pivot_groups: programming-languages-set-functions
---

# Azure Event Hubs output binding for Azure Functions

This article explains how to work with [Azure Event Hubs](../event-hubs/event-hubs-about.md) bindings for Azure Functions. Azure Functions supports trigger and output bindings for Event Hubs.

For information on setup and configuration details, see the [overview](functions-bindings-event-hubs.md).

Use the Event Hubs output binding to write events to an event stream. You must have send permission to an event hub to write events to it.

Make sure the required package references are in place before you try to implement an output binding.

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

**Applies to: programming-language-go**

Go support isn't currently available for this binding.


**Applies to: programming-language-csharp**


# [Isolated worker model](#tab/isolated-process)

The following example shows a [C# function](dotnet-isolated-process-guide.md) that writes a message string to an event hub, using the method return value as the output:

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/EventHubs/EventHubsFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-hubs-output.md)

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

The following example shows a [C# function](functions-dotnet-class-library.md) that writes a message to an event hub, using the method return value as the output:

```csharp
[FunctionName("EventHubOutput")]
[return: EventHub("outputEventHubMessage", Connection = "EventHubConnectionAppSetting")]
public static string Run([TimerTrigger("0 */5 * * * *")] TimerInfo myTimer, ILogger log)
{
    log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
    return $"{DateTime.Now}";
}
```

The following example shows how to use the `IAsyncCollector` interface to send a batch of messages. This scenario is common when you are processing messages coming from one event hub and sending the result to another event hub.

```csharp
[FunctionName("EH2EH")]
public static async Task Run(
    [EventHubTrigger("source", Connection = "EventHubConnectionAppSetting")] EventData[] events,
    [EventHub("dest", Connection = "EventHubConnectionAppSetting")]IAsyncCollector<EventData> outputEvents,
    ILogger log)
{
    foreach (EventData eventData in events)
    {
        // Do some processing:
        string newEventBody = DoSomething(eventData);
        
        // Queue the message to be sent in the background by adding it to the collector.
        // If only the event is passed, an Event Hubs partition to be assigned via
        // round-robin for each batch.
        await outputEvents.AddAsync(new EventData(newEventBody));
        
        // If your scenario requires that certain events are grouped together in an
        // Event Hubs partition, you can specify a partition key.  Events added with 
        // the same key will always be assigned to the same partition.        
        await outputEvents.AddAsync(new EventData(newEventBody), "sample-key");
    }
}
```
---


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following example shows a timer triggered [TypeScript function](functions-reference-node.md?tabs=typescript) that sends a single message to an event hub:

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/eventHubOutput1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-hubs-output.md)

To output multiple messages, return an array instead of a single object. For example:

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/eventHubOutput2.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-hubs-output.md)

# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

The following example shows a timer triggered [JavaScript function](functions-reference-node.md) that sends a single message to an event hub:

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/eventHubOutput1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-hubs-output.md)

To output multiple messages, return an array instead of a single object. For example:

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/eventHubOutput2.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-hubs-output.md)

# [Model v3](#tab/nodejs-v3)

The following example shows an event hub trigger binding in a *function.json* file and a function that uses the binding. The function writes an output message to an event hub.

The following example shows Event Hubs binding data in the *function.json* file.

```json
{
    "type": "eventHub",
    "name": "outputEventHubMessage",
    "eventHubName": "myeventhub",
    "connection": "MyEventHubSendAppSetting",
    "direction": "out"
}
```

Here's JavaScript code that sends a single message:

```javascript
module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    context.log('Message created at: ', timeStamp);   
    context.bindings.outputEventHubMessage = "Message created at: " + timeStamp;
    context.done();
};
```

Here's JavaScript code that sends multiple messages:

```javascript
module.exports = function(context) {
    var timeStamp = new Date().toISOString();
    var message = 'Message created at: ' + timeStamp;

    context.bindings.outputEventHubMessage = [];

    context.bindings.outputEventHubMessage.push("1 " + message);
    context.bindings.outputEventHubMessage.push("2 " + message);
    context.done();
};
```

---


**Applies to: programming-language-powershell**

 
Complete PowerShell examples are pending.

**Applies to: programming-language-python**

The following example shows an event hub trigger binding and a Python function that uses the binding. The function writes a message to an event hub. The example depends on whether you use the [v1 or v2 Python programming model](functions-reference-python.md).

# [v2](#tab/python-v2)

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="eventhub_output")
@app.route(route="eventhub_output")
@app.event_hub_output(arg_name="event",
                      event_hub_name="<EVENT_HUB_NAME>",
                      connection="<CONNECTION_SETTING>")
def eventhub_output(req: func.HttpRequest, event: func.Out[str]):
    body = req.get_body()
    if body is not None:
        event.set(body.decode('utf-8'))
    else:    
        logging.info('req body is none')
    return 'ok'
```

Here's Python code that sends multiple messages:
```python
import logging
import azure.functions as func
from typing import List

app = func.FunctionApp()

@app.function_name(name="eventhub_output")
@app.route(route="eventhub_output")
@app.event_hub_output(arg_name="event",
                      event_hub_name="<EVENT_HUB_NAME>",
                      connection="<CONNECTION_SETTING>")

def eventhub_output(req: func.HttpRequest, event: func.Out[List[str]]) -> func.HttpResponse:
    my_messages=["message1", "message2","message3"]
    event.set(my_messages)
    return func.HttpResponse(f"Messages sent")
```


# [v1](#tab/python-v1)

The following examples show Event Hubs binding data in the *function.json* file.

```json
{
    "type": "eventHub",
    "name": "$return",
    "eventHubName": "myeventhub",
    "connection": "MyEventHubSendAppSetting",
    "direction": "out"
}
```

Here's Python code that sends a single message:

```python
import datetime
import logging
import azure.functions as func


def main(timer: func.TimerRequest) -> str:
    timestamp = datetime.datetime.utcnow()
    logging.info('Message created at: %s', timestamp)
    return 'Message created at: {}'.format(timestamp)
```

Here's Python code that sends multiple messages:
```python
import logging
from typing import List
import azure.functions as func


def main(req: func.HttpRequest, messages:func.Out[List[str]]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    messages.set([{"message1"}, {"message2"}])
    return func.HttpResponse(f"Messages sent")
```

---


**Applies to: programming-language-java**

The following example shows a Java function that writes a message containing the current time to an event hub.

```java
@FunctionName("sendTime")
@EventHubOutput(name = "event", eventHubName = "samples-workitems", connection = "AzureEventHubConnection")
public String sendTime(
   @TimerTrigger(name = "sendTimeTrigger", schedule = "0 */5 * * * *") String timerInfo)  {
     return LocalDateTime.now().toString();
 }
```

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@EventHubOutput` annotation on parameters whose value would be published to Event Hubs.  The parameter should be of type `OutputBinding<T>` , where `T` is a POJO or any native Java type.


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use attribute to configure the binding. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#event-hubs-output).

# [Isolated worker model](#tab/isolated-process)

Use the [EventHubOutputAttribute] to define an output binding to an event hub, which supports the following properties.

| Parameters | Description |
| --- | --- |
| **EventHubName** | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Event Hubs. To learn more, see [Connections](#connections). |

# [In-process model](#tab/in-process)

Use the [EventHubAttribute] to define an output binding to an event hub, which supports the following properties.

| Parameters | Description |
| --- | --- |
| **EventHubName** | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Event Hubs. To learn more, see [Connections](#connections). |

---


**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

For Python v2 functions defined using a decorator, these properties are supported for `event_hub_output`:

| Property | Description |
| --- | --- |
| `arg_name` | The variable name used in function code that represents the event. |
| `event_hub_name` | he name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. |
| `connection` | The name of an app setting or setting collection that specifies how to connect to Event Hubs. To learn more, see [Connections](#connections). |

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.


**Applies to: programming-language-java**

## Annotations

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the [EventHubOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhuboutput) annotation on parameters whose value would be published to Event Hubs. The following settings are supported on the annotation:

+ [name](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhuboutput.name)
+ [dataType](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhuboutput.datatype)
+ [eventHubName](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhuboutput.eventhubname)
+ [connection](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhuboutput.connection)


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-powershell**


## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `output.eventHub()` method.

| Property | Description |
| --- | --- |
| **eventHubName** | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Event Hubs. To learn more, see [Connections](#connections). |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `eventHub`. |
| **direction** | Must be set to `out`. This parameter is set automatically when you create the binding in the Azure portal. |
| **name** | The variable name used in function code that represents the event. |
| **eventHubName** | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Event Hubs. To learn more, see [Connections](#connections). |

---


**Applies to: programming-language-powershell,programming-language-python**


The following table explains the binding configuration properties that you set in the *function.json* file.

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `eventHub`. |
| **direction** | Must be set to `out`. This parameter is set automatically when you create the binding in the Azure portal. |
| **name** | The variable name used in function code that represents the event. |
| **eventHubName** | The name of the event hub. When the event hub name is also present in the connection string, that value overrides this property at runtime. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Event Hubs. To learn more, see [Connections](#connections). |



When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 


## Usage

**Applies to: programming-language-csharp**

The parameter type supported by the Event Hubs output binding depends on the extension package version and the C# modality used.

# [Extension v5.x+](#tab/extensionv5/in-process)

In-process C# class library functions supports the following types:

+ [Azure.Messaging.EventHubs.EventData](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata)
+ String
+ Byte array
+ Plain-old CLR object (POCO)

This version of [EventData](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata) drops support for the legacy `Body` type in favor of [EventBody](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventdata.eventbody).

Send messages by using a method parameter such as `out string paramName`. To write multiple messages, you can use `ICollector<EventData>` or `IAsyncCollector<EventData>` in place of `out string`.  Partition keys may only be used with `IAsyncCollector<EventData>`.

# [Extension v3.x+](#tab/extensionv3/in-process)

In-process C# class library functions supports the following types:

+ [Microsoft.Azure.EventHubs.EventData](https://learn.microsoft.com/dotnet/api/microsoft.azure.eventhubs.eventdata)
+ String
+ Byte array
+ Plain-old CLR object (POCO)

Send messages by using a method parameter such as `out string paramName`. To write multiple messages, you can use `ICollector<string>` or `IAsyncCollector<string>` in place of `out string`.

# [Extension v5.x+](#tab/extensionv5/isolated-process)


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


# [Extension v3.x+](#tab/extensionv3/isolated-process)

Requires you to define a custom type, or use a string. Additional options are available in **Extension v5.x+**.

---


**Applies to: programming-language-java**


There are two options for outputting an Event Hubs message from a function by using the [EventHubOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.eventhuboutput) annotation:

- **Return value**: By applying the annotation to the function itself, the return value of the function is persisted as an Event Hubs message.

- **Imperative**: To explicitly set the message value, apply the annotation to a specific parameter of the type [`OutputBinding<T>`](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.OutputBinding), where `T` is a POJO or any native Java type. With this configuration, passing a value to the `setValue` method persists the value as an Event Hubs message.

**Applies to: programming-language-powershell**

 
Complete PowerShell examples are pending.

**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

Access the output message by returning the value directly or using `context.extraOutputs.set()`.

# [Model v3](#tab/nodejs-v3)

Access the output event by using `context.bindings.<name>` where `<name>` is the value specified in the `name` property of *function.json*.

---


**Applies to: programming-language-python**


There are two options for outputting an Event Hubs message from a function:

- **Return value**: Set the `name` property in *function.json* to `$return`. With this configuration, the function's return value is persisted as an Event Hubs message.

- **Imperative**: Pass a value to the [set](https://learn.microsoft.com/python/api/azure-functions/azure.functions.out#set-val--t-----none) method of the parameter declared as an [Out](https://learn.microsoft.com/python/api/azure-functions/azure.functions.out) type. The value passed to `set` is persisted as an Event Hubs message.

The output function parameter must be defined as `func.Out[func.EventHubEvent]` or `func.Out[List[func.EventHubEvent]]`. Refer to the [output example](#example) for details.





## Connections

The `connection` property is set to a key in application settings that returns a value used by the Functions runtime to connect to the Event Hubs namespace that contains the event hub used by the extension. The value of the connection property setting depends on the type of connection: 

+ **Managed identity connection**: The `connection` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to the namespace. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connection` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connection` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connection` property setting returns the actual connection string of the namespace. The connection string must be for an Event Hubs namespace, not the event hub itself. Because the connection string contains shared secret keys, you should consider using a managed identity connection, when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings). 

To learn how to obtain the connection string for your Event Hubs namespace, see [Get an Event Hubs connection string](https://learn.microsoft.com/azure/event-hubs/event-hubs-get-connection-string).

## Exceptions and return codes

| Binding | Reference |
| --- | --- |
| Event Hubs | [Operations Guide](https://learn.microsoft.com/rest/api/eventhub/publisher-policy-operations) |

## Next steps

- [Respond to events sent to an event hub event stream (Trigger)](functions-bindings-event-hubs-trigger.md)
 

[EventHubAttribute]: https://learn.microsoft.com/dotnet/api/microsoft.azure.webjobs.eventhubattribute
