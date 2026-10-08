---
title: Azure Service Bus output bindings for Azure Functions
description: Learn to send Azure Service Bus messages from Azure Functions.
ms.assetid: daedacf0-6546-4355-a65c-50873e74f66b
ms.topic: reference
ms.date: 09/15/2026
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, powershell, python
zone_pivot_groups: programming-languages-set-functions
ms.custom:
  - devx-track-csharp
  - devx-track-python
  - devx-track-extended-java
  - devx-track-js
  - devx-track-ts
  - sfi-ropc-nochange
---

# Azure Service Bus output binding for Azure Functions

Use Azure Service Bus output binding to send queue or topic messages.

For information on setup and configuration details, see the [overview](functions-bindings-service-bus.md).

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



A C# function can be created by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. Isolated worker process is required to support C# functions running on LTS and non-LTS versions .NET and the .NET Framework. Extensions for isolated worker process functions use `Microsoft.Azure.Functions.Worker.Extensions.*` namespaces.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Functions runtime. In a variation of this model, Functions can be run using [C# scripting](functions-reference-csharp.md), which is supported primarily for C# portal editing. Extensions for in-process functions use `Microsoft.Azure.WebJobs.Extensions.*` namespaces.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)

This code defines and initializes the `ILogger`: 

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/ServiceBus/ServiceBusReceivedMessageFunctions.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-output.md)

This example shows a [C# function](dotnet-isolated-process-guide.md) that receives a message and writes it to a second queue:

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/ServiceBus/ServiceBusReceivedMessageFunctions.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-output.md)

&nbsp;
<hr/>

This example uses an HTTP trigger with an `OutputType` object to both send an HTTP response and write the output message. 

```csharp
[Function("HttpSendMsg")]
public async Task<OutputType> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req, FunctionContext context)
{
   _logger.LogInformation($"C# HTTP trigger function processed a request for {context.InvocationId}.");

   HttpResponseData response = req.CreateResponse(HttpStatusCode.OK);
   await response.WriteStringAsync("HTTP response: Message sent");
            
   return new OutputType()
   {
       OutputEvent = "MyMessage",
       HttpResponse = response
   };
}
```

This code defines the multiple output type `OutputType`, which includes the Service Bus output binding definition on `OutputEvent`:

```csharp
 public class OutputType
{
   [ServiceBusOutput("TopicOrQueueName", Connection = "ServiceBusConnection")]
   public string OutputEvent { get; set; }

   public HttpResponseData HttpResponse { get; set; }
}
```

# [In-process model](#tab/in-process)

The following example shows a [C# function](functions-dotnet-class-library.md) that sends a Service Bus queue message:

```csharp
[FunctionName("ServiceBusOutput")]
[return: ServiceBus("myqueue", Connection = "ServiceBusConnection")]
public static string ServiceBusOutput([HttpTrigger] dynamic input, ILogger log)
{
    log.LogInformation($"C# function processed: {input.Text}");
    return input.Text;
}
```
&nbsp;
<hr/>

Instead of using the return statement to send the message, this HTTP trigger function returns an HTTP response that is different from the output message.

```csharp
[FunctionName("HttpTrigger1")]
public static async Task<IActionResult> Run(
[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req, 
[ServiceBus("TopicOrQueueName", Connection = "ServiceBusConnection")] IAsyncCollector<string> message, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    await message.AddAsync("MyMessage");
    await message.AddAsync("MyMessage2");

    string responseMessage = "This HTTP triggered sent a message to Service Bus.";

    return new OkObjectResult(responseMessage);
}
```

---


**Applies to: programming-language-java**


The following example shows a Java function that sends a message to a Service Bus queue `myqueue` when triggered by an HTTP request.

```java
@FunctionName("httpToServiceBusQueue")
@ServiceBusQueueOutput(name = "message", queueName = "myqueue", connection = "AzureServiceBusConnection")
public String pushToQueue(
  @HttpTrigger(name = "request", methods = {HttpMethod.POST}, authLevel = AuthorizationLevel.ANONYMOUS)
  final String message,
  @HttpOutput(name = "response") final OutputBinding<T> result ) {
      result.setValue(message + " has been sent.");
      return message;
 }
```

 In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@QueueOutput` annotation on function parameters whose value would be written to a Service Bus queue. The parameter type should be `OutputBinding<T>`, where `T` is any native Java type of a plan old Java object (POJO).

Java functions can also write to a Service Bus topic. The following example uses the `@ServiceBusTopicOutput` annotation to describe the configuration for the output binding. 

```java
@FunctionName("sbtopicsend")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req", methods = {HttpMethod.GET, HttpMethod.POST}, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<String>> request,
            @ServiceBusTopicOutput(name = "message", topicName = "mytopicname", subscriptionName = "mysubscription", connection = "ServiceBusConnection") OutputBinding<String> message,
            final ExecutionContext context) {
        
        String name = request.getBody().orElse("Azure Functions");

        message.setValue(name);
        return request.createResponseBuilder(HttpStatus.OK).body("Hello, " + name).build();
        
    }
```


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following example shows a timer triggered [TypeScript function](functions-reference-node.md?tabs=typescript) that sends a queue message every 5 minutes.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/serviceBusOutput1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-output.md)

To output multiple messages, return an array instead of a single object. For example:

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/serviceBusOutput2.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-output.md)

# [Model v3](#tab/nodejs-v3)

TypeScript samples aren't documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

The following example shows a timer triggered [JavaScript function](functions-reference-node.md) that sends a queue message every 5 minutes.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/serviceBusOutput1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-output.md)

To output multiple messages, return an array instead of a single object. For example:

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/serviceBusOutput2.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus-output.md)

# [Model v3](#tab/nodejs-v3)

The following example shows a Service Bus output binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding. The function uses a timer trigger to send a queue message every 15 seconds.

Here's the binding data in the *function.json* file:

```json
{
    "bindings": [
        {
            "schedule": "0/15 * * * * *",
            "name": "myTimer",
            "runsOnStartup": true,
            "type": "timerTrigger",
            "direction": "in"
        },
        {
            "name": "outputSbQueue",
            "type": "serviceBus",
            "queueName": "testqueue",
            "connection": "MyServiceBusConnection",
            "direction": "out"
        }
    ],
    "disabled": false
}
```

Here's JavaScript script code that creates a single message:

```javascript
module.exports = async function (context, myTimer) {
    var message = 'Service Bus queue message created at ' + timeStamp;
    context.log(message);   
    context.bindings.outputSbQueue = message;
};
```

Here's JavaScript script code that creates multiple messages:

```javascript
module.exports = async function (context, myTimer) {
    var message = 'Service Bus queue message created at ' + timeStamp;
    context.log(message);   
    context.bindings.outputSbQueue = [];
    context.bindings.outputSbQueue.push("1 " + message);
    context.bindings.outputSbQueue.push("2 " + message);
};
```

---


**Applies to: programming-language-powershell**


The following example shows a Service Bus output binding in a *function.json* file and a [PowerShell function](functions-reference-powershell.md) that uses the binding. 

Here's the binding data in the *function.json* file:

```json
{
  "bindings": [
    {
      "type": "serviceBus",
      "direction": "out",
      "connection": "AzureServiceBusConnectionString",
      "name": "outputSbMsg",
      "queueName": "outqueue",
      "topicName": "outtopic"
    }
  ]
}
```

Here's the PowerShell that creates a message as the function's output.

```powershell
param($QueueItem, $TriggerMetadata) 

Push-OutputBinding -Name outputSbMsg -Value @{ 
    name = $QueueItem.name 
    employeeId = $QueueItem.employeeId 
    address = $QueueItem.address 
} 
```


**Applies to: programming-language-python**


The following example demonstrates how to write out to a Service Bus topics and Service Bus queues in Python. The example depends on whether you use the [v1 or v2 Python programming model](functions-reference-python.md).

# [v2](#tab/python-v2)
This example shows how to write out to a Service Bus topic.

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.route(route="put_message")
@app.service_bus_topic_output(arg_name="message",
                              connection="AzureServiceBusConnectionString",
                              topic_name="outTopic")
def main(req: func.HttpRequest, message: func.Out[str]) -> func.HttpResponse:
    input_msg = req.params.get('message')
    message.set(input_msg)
    return 'OK'
```

This example shows how to write out to a Service Bus queue.

```python
import azure.functions as func

app = func.FunctionApp()

@app.route(route="put_message")
@app.service_bus_queue_output(
    arg_name="msg",
    connection="AzureServiceBusConnectionString",
    queue_name="outqueue")
def put_message(req: func.HttpRequest, msg: func.Out[str]):
    msg.set(req.get_body().decode('utf-8'))
    return 'OK'
```

# [v1](#tab/python-v1)
A Service Bus binding definition is defined in *function.json* where *type* is set to `serviceBus`. This example shows how to write out to a Service Bus topic.

```json
{
  "scriptFile": "__init__.py",
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "get",
        "post"
      ]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    },
    {
      "type": "serviceBus",
      "direction": "out",
      "connection": "AzureServiceBusConnectionString",
      "name": "msg",
      "topicName": "outTopic"
    }
  ]
}
```

In *_\_init_\_.py*, you can write out a message to the queue by passing a value to the `set` method.

```python
import azure.functions as func

def main(req: azf.HttpRequest, msg: azf.Out[str]):
    msg.set(req.get_body().decode('utf-8'))

    return 'OK'
```

This example shows how to write out to a Service Bus queue.

```json
{
  "scriptFile": "__init__.py",
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "get",
        "post"
      ]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    },
    {
      "type": "serviceBus",
      "direction": "out",
      "connection": "AzureServiceBusConnectionString",
      "name": "msg",
      "queueName": "outqueue"
    }
  ]
}
```

```python
import azure.functions as func

def main(req: func.HttpRequest, msg: func.Out[str]) -> func.HttpResponse:

    input_msg = req.params.get('message')

    msg.set(input_msg)

    return 'OK'
```

---


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use attributes to define the output binding. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#service-bus-output).

# [Isolated worker model](#tab/isolated-process)

In [C# class libraries](dotnet-isolated-process-guide.md), use the [ServiceBusOutputAttribute](https://github.com/Azure/azure-functions-dotnet-worker/blob/main/extensions/Worker.Extensions.ServiceBus/src/ServiceBusOutputAttribute.cs) to define the queue or topic written to by the output.

The following table explains the properties you can set using the attribute:

| Property | Description |
| --- | --- |
| **EntityType** | Sets the entity type as either `Queue` for sending messages to a queue or `Topic` when sending messages to a topic. |
| **QueueOrTopicName** | Name of the topic or queue to send messages to. Use `EntityType` to set the destination type. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |

# [In-process model](#tab/in-process)

In [C# class libraries](functions-dotnet-class-library.md), use the [ServiceBusAttribute](https://github.com/Azure/azure-functions-servicebus-extension/blob/master/src/Microsoft.Azure.WebJobs.Extensions.ServiceBus/ServiceBusAttribute.cs).

The following table explains the properties you can set using the attribute:

| Property | Description |
| --- | --- |
| **QueueName** | Name of the queue. Set only if sending queue messages, not for a topic. |
| **TopicName** | Name of the topic. Set only if sending topic messages, not for a queue. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |

Here's an example that shows the attribute applied to the return value of the function:

```csharp
[FunctionName("ServiceBusOutput")]
[return: ServiceBus("myqueue")]
public static string Run([HttpTrigger] dynamic input, ILogger log)
{
    ...
}
```

You can set the `Connection` property to specify the name of an app setting that contains the Service Bus connection string to use, as shown in the following example:

```csharp
[FunctionName("ServiceBusOutput")]
[return: ServiceBus("myqueue", Connection = "ServiceBusConnection")]
public static string Run([HttpTrigger] dynamic input, ILogger log)
{
    ...
}
```

For a complete example, see [Example](#example).

You can use the `ServiceBusAccount` attribute to specify the Service Bus account to use at class, method, or parameter level. For more information, see [Attributes](functions-bindings-service-bus-trigger.md#attributes) in the trigger reference.

---



**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

For Python v2 functions defined using a decorator, the following properties on the `service_bus_topic_output`:

| Property | Description |
| --- | --- |
| `arg_name` | The name of the variable that represents the queue or topic message in function code. |
| `queue_name` | Name of the queue. Set only if sending queue messages, not for a topic. |
| `topic_name` | Name of the topic. Set only if sending topic messages, not for a queue. |
| `connection` | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.


**Applies to: programming-language-java**

## Annotations

The `ServiceBusQueueOutput` and `ServiceBusTopicOutput` annotations are available to write a message as a function output. The parameter decorated with these annotations must be declared as an `OutputBinding<T>` where `T` is the type corresponding to the message's type.

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 



**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `output.serviceBusQueue()` method.

| Property | Description |
| --- | --- |
| **queueName** | Name of the queue. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |

The following table explains the properties that you can set on the `options` object passed to the `output.serviceBusTopic()` method.

| Property | Description |
| --- | --- |
| **topicName** | Name of the topic. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `serviceBus`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to `out`. This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that represents the queue or topic message in function code. Set to "$return" to reference the function return value. |
| **queueName** | Name of the queue. Set only if sending queue messages, not for a topic. |
| **topicName** | Name of the topic. Set only if sending topic messages, not for a queue. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |

---

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 



**Applies to: programming-language-powershell,programming-language-python**


The following table explains the binding configuration properties that you set in the *function.json* file and the `ServiceBus` attribute.

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `serviceBus`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to `out`. This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that represents the queue or topic message in function code. Set to "$return" to reference the function return value. |
| **queueName** | Name of the queue. Set only if sending queue messages, not for a topic. |
| **topicName** | Name of the topic. Set only if sending topic messages, not for a queue. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Service Bus. See [Connections](#connections). |

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 




See the [Example section](#example) for complete examples.

## Usage

**Applies to: programming-language-csharp**


All C# modalities and extension versions support the following output parameter types:

| Type | Description |
| --- | --- |
| **[System.String](https://learn.microsoft.com/dotnet/api/system.string)** | Use when the message to write is simple text. When the parameter value is null when the function exits, Functions doesn't create a message. |
| **byte[]** | Use for writing binary data messages. When the parameter value is null when the function exits, Functions doesn't create a message. |
| **Object** | When a message contains JSON, Functions serializes the object into a JSON message payload. When the parameter value is null when the function exits, Functions creates a message with a null object. |

Messaging-specific parameter types contain extra message metadata and aren't compatible with JSON serialization. As a result, it isn't possible to use `ServiceBusMessage` with the output binding in the isolated model. The specific types supported by the output binding depend on the extension package version and the C# modality used.

# [Extension v5.x](#tab/extensionv5/in-process)

Use the [ServiceBusMessage](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusmessage) type when sending messages with metadata. Parameters are defined as `return` type attributes. Use an `ICollector<T>` or `IAsyncCollector<T>` to write multiple messages. A message is created when you call the `Add` method.

When the parameter value is null when the function exits, Functions doesn't create a message.


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

Use the [Message](https://learn.microsoft.com/dotnet/api/microsoft.azure.servicebus.message) type when sending messages with metadata. Parameters are defined as `return` type attributes. Use an `ICollector<T>` or `IAsyncCollector<T>` to write multiple messages. A message is created when you call the `Add` method.


> On 30 September 2026, we'll retire the Azure Service Bus SDK libraries WindowsAzure.ServiceBus, Microsoft.Azure.ServiceBus, and com.microsoft.azure.servicebus, which don't conform to Azure SDK guidelines. We'll also end support of the SBMP protocol, so you'll no longer be able to use this protocol after 30 September 2026. Migrate to the latest Azure SDK libraries, which offer critical security updates and improved capabilities, before that date.
>
>Although the older libraries can still be used beyond 30 September 2026, they'll no longer receive official support and updates from Microsoft. For more information, see the [support retirement announcement](https://azure.microsoft.com/updates/retirement-notice-update-your-azure-service-bus-sdk-libraries-by-30-september-2026/).

When the parameter value is null when the function exits, Functions doesn't create a message.


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


When you want the function to write a single message, the Service Bus output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The message as a string. Use when the message is simple text. |
| `byte[]` | The bytes of the message. |
| JSON serializable types | An object representing the message. Functions attempts to serialize a plain-old CLR object (POCO) type into JSON data. |

When you want the function to write multiple messages, the Service Bus output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is one of the single message types | An array containing multiple message. Each entry represents one message. |

For other output scenarios, create and use a [ServiceBusClient] with other types from [Azure.Messaging.ServiceBus] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Azure.Messaging.ServiceBus]: https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus
[ServiceBusClient]: https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient


# [Earlier extension versions](#tab/functionsv2/isolated-process)

Earlier versions of this extension in the isolated worker process only support binding to messaging-specific types. More options are available to **Extension 5.x and higher**

---


The queue or topic must already exist; if you specify a queue or topic that doesn't exist, the function fails.

<!--Any of the below pivots can be combined if the usage info is identical.-->
**Applies to: programming-language-java**

Use the [Azure Service Bus SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/index.yml) rather than the built-in output binding.

**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

Access the output message by returning the value directly or using `context.extraOutputs.set()`.

# [Model v3](#tab/nodejs-v3)

Access the output message by using `context.bindings.<name>` where `<name>` is the value specified in the `name` property of *function.json*.

---


**Applies to: programming-language-powershell**

Output to the Service Bus is available via the `Push-OutputBinding` cmdlet where you pass arguments that match the name designated by binding's name parameter in the *function.json* file.

**Applies to: programming-language-python**

The output function parameter must be defined as `func.Out[str]` or `func.Out[bytes]`. Refer to the [output example](#example) for details. 
Alternatively, you can use the [Azure Service Bus SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/index.yml) rather than the built-in output binding.

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

## Exceptions and return codes

| Binding | Reference |
| --- | --- |
| Service Bus | [Service Bus Error Codes](../service-bus-messaging/service-bus-messaging-exceptions.md) |
| Service Bus | [Service Bus Limits](../service-bus-messaging/service-bus-quotas.md) |

## Next steps

- [Run a function when a Service Bus queue or topic message is created (Trigger)](functions-bindings-service-bus-trigger.md)

[upgrade your application to Functions 4.x]: migrate-version-1-version-4.md
