---
title: Azure Queue storage output binding for Azure Functions
description: Learn to create Azure Queue storage messages in Azure Functions.
ms.topic: reference
ms.date: 03/06/2023
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, powershell, python
zone_pivot_groups: programming-languages-set-functions
ms.custom:
  - devx-track-csharp
  - cc996988-fb4f-47
  - devx-track-python
  - devx-track-extended-java
  - devx-track-js
  - devx-track-ts
  - sfi-ropc-nochange
---

# Azure Queue storage output bindings for Azure Functions

Azure Functions can create new Azure Queue storage messages by setting up an output binding.

For information on setup and configuration details, see the [overview](functions-bindings-storage-queue.md).

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

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/Queue/QueueFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-output.md)

# [In-process model](#tab/in-process)

The following example shows a [C# function](functions-dotnet-class-library.md) that creates a queue message for each HTTP request received.

```csharp
[StorageAccount("MyStorageConnectionAppSetting")]
public static class QueueFunctions
{
    [FunctionName("QueueOutput")]
    [return: Queue("myqueue-items")]
    public static string QueueOutput([HttpTrigger] dynamic input,  ILogger log)
    {
        log.LogInformation($"C# function processed: {input.Text}");
        return input.Text;
    }
}
```

---

For an end-to-end example of how to configure an output binding to Queue storage, see one of these articles:

+ [Connect functions to Azure Storage using Visual Studio](functions-add-output-binding-storage-queue-vs.md)
+ [Connect functions to Azure Storage using Visual Studio Code](functions-add-output-binding-storage-queue-vs-code.md?pivots=programming-language-csharp)
+ [Connect functions to Azure Storage using command line tools](functions-add-output-binding-storage-queue-cli.md?pivots=programming-language-csharp)

**Applies to: programming-language-java**


The following example shows a Java function that creates a queue message for when triggered by an  HTTP request.

```java
@FunctionName("httpToQueue")
@QueueOutput(name = "item", queueName = "myqueue-items", connection = "MyStorageConnectionAppSetting")
 public String pushToQueue(
     @HttpTrigger(name = "request", methods = {HttpMethod.POST}, authLevel = AuthorizationLevel.ANONYMOUS)
     final String message,
     @HttpOutput(name = "response") final OutputBinding<String> result) {
       result.setValue(message + " has been added.");
       return message;
 }
```

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@QueueOutput` annotation on parameters whose value would be written to Queue storage.  The parameter type should be `OutputBinding<T>`, where `T` is any native Java type of a POJO.

For an end-to-end example of how to configure an output binding to Queue storage, see one of these articles:

+ [Connect functions to Azure Storage using Visual Studio Code](functions-add-output-binding-storage-queue-vs-code.md?pivots=programming-language-java)
+ [Connect functions to Azure Storage using command line tools](functions-add-output-binding-storage-queue-cli.md?pivots=programming-language-java)

**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following example shows an HTTP triggered [TypeScript function](functions-reference-node.md?tabs=typescript) that creates a queue item for each HTTP request received.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/storageQueueOutput1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-output.md)

To output multiple messages, return an array instead of a single object. For example:

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/storageQueueOutput2.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-output.md)

# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

The following example shows an HTTP triggered [JavaScript function](functions-reference-node.md) that creates a queue item for each HTTP request received.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/storageQueueOutput1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-output.md)

To output multiple messages, return an array instead of a single object. For example:

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/storageQueueOutput2.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-output.md)

For an end-to-end example of how to configure an output binding to Queue storage, see one of these articles:

+ [Connect functions to Azure Storage using Visual Studio Code](functions-add-output-binding-storage-queue-vs-code.md?pivots=programming-language-javascript)
+ [Connect functions to Azure Storage using command line tools](functions-add-output-binding-storage-queue-cli.md?pivots=programming-language-javascript)

# [Model v3](#tab/nodejs-v3)

The following example shows an HTTP trigger binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding. The function creates a queue item for each HTTP request received.

Here's the *function.json* file:

```json
{
  "bindings": [
    {
      "type": "httpTrigger",
      "direction": "in",
      "authLevel": "function",
      "name": "input"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    },
    {
      "type": "queue",
      "direction": "out",
      "name": "myQueueItem",
      "queueName": "outqueue",
      "connection": "MyStorageConnectionAppSetting"
    }
  ]
}
```

The [configuration](#configuration) section explains these properties.

Here's the JavaScript code:

```javascript
module.exports = async function (context, input) {
    context.bindings.myQueueItem = input.body;
};
```

You can send multiple messages at once by defining a message array for the `myQueueItem` output binding. The following JavaScript code sends two queue messages with hard-coded values for each HTTP request received.

```javascript
module.exports = async function(context) {
    context.bindings.myQueueItem = ["message 1","message 2"];
};
```

---


**Applies to: programming-language-powershell**


The following code examples demonstrate how to output a queue message from an HTTP-triggered function. The configuration section with the `type` of `queue` defines the output binding.

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "Request",
      "methods": [
        "get",
        "post"
      ]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "Response"
    },
    {
      "type": "queue",
      "direction": "out",
      "name": "Msg",
      "queueName": "outqueue",
      "connection": "MyStorageConnectionAppSetting"
    }
  ]
}
```

Using this binding configuration, a PowerShell function can create a queue message using `Push-OutputBinding`. In this example, a message is created from a query string or body parameter.

```powershell
using namespace System.Net

# Input bindings are passed in via param block.
param($Request, $TriggerMetadata)

# Write to the Azure Functions log stream.
Write-Host "PowerShell HTTP trigger function processed a request."

# Interact with query parameters or the body of the request.
$message = $Request.Query.Message
Push-OutputBinding -Name Msg -Value $message
Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = 200
    Body = "OK"
})
```

To send multiple messages at once, define a message array and use `Push-OutputBinding` to send messages to the Queue output binding.

```powershell
using namespace System.Net

# Input bindings are passed in via param block.
param($Request, $TriggerMetadata)

# Write to the Azure Functions log stream.
Write-Host "PowerShell HTTP trigger function processed a request."

# Interact with query parameters or the body of the request.
$message = @("message1", "message2")
Push-OutputBinding -Name Msg -Value $message
Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = 200
    Body = "OK"
})
```

For an end-to-end example of how to configure an output binding to Queue storage, see one of these articles:

+ [Connect functions to Azure Storage using Visual Studio Code](functions-add-output-binding-storage-queue-vs-code.md?pivots=programming-language-powershell)
+ [Connect functions to Azure Storage using command line tools](functions-add-output-binding-storage-queue-cli.md?pivots=programming-language-powershell)

**Applies to: programming-language-python**


The following example demonstrates how to output single and multiple values to storage queues. The configuration needed for *function.json* is the same either way. The example depends on whether you use the [v1 or v2 Python programming model](functions-reference-python.md).

# [v2](#tab/python-v2)

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="QueueOutput1")
@app.route(route="message")
@app.queue_output(arg_name="msg", 
                  queue_name="<QUEUE_NAME>", 
                  connection="<CONNECTION_SETTING>")
def main(req: func.HttpRequest, msg: func.Out[str]) -> func.HttpResponse:
    input_msg = req.params.get('name')
    logging.info(input_msg)
    
    msg.set(input_msg)
    
    logging.info(f'name: {name}')
    return 'OK'
```

For an end-to-end example of how to configure an output binding to Queue storage, see one of these articles:

+ [Connect functions to Azure Storage using Visual Studio Code](functions-add-output-binding-storage-queue-vs-code.md?pivots=programming-language-python)
+ [Connect functions to Azure Storage using command line tools](functions-add-output-binding-storage-queue-cli.md?pivots=programming-language-python)
  
# [v1](#tab/python-v1)

A Storage queue binding is defined in *function.json* where *type* is set to `queue`.

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
      "type": "queue",
      "direction": "out",
      "name": "msg",
      "queueName": "outqueue",
      "connection": "AzureStorageQueuesConnectionString"
    }
  ]
}
```

To set an individual message on the queue, you pass a single value to the `set` method.

```python
import azure.functions as func

def main(req: func.HttpRequest, msg: func.Out[str]) -> func.HttpResponse:

    input_msg = req.params.get('message')

    msg.set(input_msg)

    return 'OK'
```

To create multiple messages on the queue, declare a parameter as the appropriate list type and pass an array of values (that match the list type) to the `set` method.

```python
import azure.functions as func
import typing

def main(req: func.HttpRequest, msg: func.Out[typing.List[str]]) -> func.HttpResponse:

    msg.set(['one', 'two'])

    return 'OK'
```

---


**Applies to: programming-language-csharp**

## Attributes

The attribute that defines an output binding in C# libraries depends on the mode in which the C# class library runs.


# [Isolated worker model](#tab/isolated-process)

When running in an isolated worker process, you use the [QueueOutputAttribute](https://github.com/Azure/azure-functions-dotnet-worker/blob/main/extensions/Worker.Extensions.Storage.Queues/src/QueueOutputAttribute.cs), which takes the name of the queue, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/Queue/QueueFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-output.md)

Only returned variables are supported when running in an isolated worker process. Output parameters can't be used. 

# [In-process model](#tab/in-process)

In [C# class libraries](functions-dotnet-class-library.md), use the [QueueAttribute](https://learn.microsoft.com/dotnet/api/microsoft.azure.webjobs.queueattribute). C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#queue-output).

The attribute applies to an `out` parameter or the return value of the function. The attribute's constructor takes the name of the queue, as shown in the following example:

```csharp
[FunctionName("QueueOutput")]
[return: Queue("myqueue-items")]
public static string Run([HttpTrigger] dynamic input,  ILogger log)
{
    ...
}
```

You can set the `Connection` property to specify the storage account to use, as shown in the following example:

```csharp
[FunctionName("QueueOutput")]
[return: Queue("myqueue-items", Connection = "StorageConnectionAppSetting")]
public static string Run([HttpTrigger] dynamic input,  ILogger log)
{
    ...
}
```

You can use the `StorageAccount` attribute to specify the storage account at class, method, or parameter level. For more information, see Trigger - attributes.

---


**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

For Python v2 functions defined using a decorator, the following properties on the `queue_output`:

| Property | Description |
| --- | --- |
| `arg_name` | The name of the variable that represents the queue in function code. |
| `queue_name` | The name of the queue. |
| `connection` | The name of an app setting or setting collection that specifies how to connect to Azure Queues. See [Connections](#connections). |

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.


**Applies to: programming-language-java**

## Annotations

The [QueueOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.queueoutput) annotation allows you to write a message as the output of a function. The following example shows an HTTP-triggered function that creates a queue message.

```java
package com.function;
import java.util.*;
import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;

public class HttpTriggerQueueOutput {
    @FunctionName("HttpTriggerQueueOutput")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req", methods = {HttpMethod.GET, HttpMethod.POST}, authLevel = AuthorizationLevel.FUNCTION) HttpRequestMessage<Optional<String>> request,
            @QueueOutput(name = "message", queueName = "messages", connection = "MyStorageConnectionAppSetting") OutputBinding<String> message,
            final ExecutionContext context) {

        message.setValue(request.getQueryParameters().get("name"));
        return request.createResponseBuilder(HttpStatus.OK).body("Done").build();
    }
}
```

| Property | Description |
| --- | --- |
| `name` | Declares the parameter name in the function signature. When the function is triggered, this parameter's value has the contents of the queue message. |
| `queueName` | Declares the queue name in the storage account. |
| `connection` | Points to the storage account connection string. |

The parameter associated with the [QueueOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.queueoutput) annotation is typed as an [OutputBinding\<T>](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.outputbinding) instance.

**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `output.storageQueue()` method.

| Property | Description |
| --- | --- |
| **queueName** | The name of the queue. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Queues. See [Connections](#connections). |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `queue`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to `out`. This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that represents the queue in function code. Set to `$return` to reference the function return value. |
| **queueName** | The name of the queue. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Queues. See [Connections](#connections). |

---

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 



**Applies to: programming-language-powershell,programming-language-python**


The following table explains the binding configuration properties that you set in the *function.json* file.

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `queue`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to `out`. This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that represents the queue in function code. Set to `$return` to reference the function return value. |
| **queueName** | The name of the queue. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Queues. See [Connections](#connections). |

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 




See the [Example section](#example) for complete examples.

## Usage

**Applies to: programming-language-csharp**

The usage of the Queue output binding depends on the extension package version and the C# modality used in your function app, which can be one of the following:

# [Isolated worker model](#tab/isolated-process)

An isolated worker process class library compiled C# function runs in a process isolated from the runtime.   
   
# [In-process model](#tab/in-process)

An in-process class library is a compiled C# function runs in the same process as the Functions runtime.
 
---

Choose a version to see usage details for the mode and version. 

# [Extension 5.x+](#tab/extensionv5/in-process)

Write a single queue message by using a method parameter such as `out T paramName`. You can use the method return type instead of an `out` parameter, and `T` can be any of the following types:

* An object serializable as JSON
* `string`
* `byte[]`
* [QueueMessage]

For examples using these types, see [the GitHub repository for the extension](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Queues#examples).

You can write multiple messages to the queue by using one of the following types: 

* `ICollector<T>` or `IAsyncCollector<T>`
* [QueueClient]

For examples using [QueueMessage] and [QueueClient], see [the GitHub repository for the extension](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Queues#examples).


While the attribute takes a `Connection` property, you can also use the [StorageAccountAttribute](https://github.com/Azure/azure-webjobs-sdk/blob/master/src/Microsoft.Azure.WebJobs/StorageAccountAttribute.cs) to specify a storage account connection. You can do this when you need to use a different storage account than other functions in the library. The constructor takes the name of an app setting that contains a storage connection string. The attribute can be applied at the parameter, method, or class level. The following example shows class level and method level:

```csharp
[StorageAccount("ClassLevelStorageAppSetting")]
public static class AzureFunctions
{
    [FunctionName("StorageTrigger")]
    [StorageAccount("FunctionLevelStorageAppSetting")]
    public static void Run( //...
{
    ...
}
```

The storage account to use is determined in the following order:

* The trigger or binding attribute's `Connection` property.
* The `StorageAccount` attribute applied to the same parameter as the trigger or binding attribute.
* The `StorageAccount` attribute applied to the function.
* The `StorageAccount` attribute applied to the class.
* The default storage account for the function app, which is defined in the `AzureWebJobsStorage` application setting.


# [Extension 2.x+](#tab/extensionv2/in-process)

Write a single queue message by using a method parameter such as `out T paramName`. You can use the method return type instead of an `out` parameter, and `T` can be any of the following types:

* An object serializable as JSON
* `string`
* `byte[]`
* [CloudQueueMessage] 

You can write multiple messages to the queue by using one of the following types: 

* `ICollector<T>` or `IAsyncCollector<T>`
* [CloudQueue](https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.queue.cloudqueue)


While the attribute takes a `Connection` property, you can also use the [StorageAccountAttribute](https://github.com/Azure/azure-webjobs-sdk/blob/master/src/Microsoft.Azure.WebJobs/StorageAccountAttribute.cs) to specify a storage account connection. You can do this when you need to use a different storage account than other functions in the library. The constructor takes the name of an app setting that contains a storage connection string. The attribute can be applied at the parameter, method, or class level. The following example shows class level and method level:

```csharp
[StorageAccount("ClassLevelStorageAppSetting")]
public static class AzureFunctions
{
    [FunctionName("StorageTrigger")]
    [StorageAccount("FunctionLevelStorageAppSetting")]
    public static void Run( //...
{
    ...
}
```

The storage account to use is determined in the following order:

* The trigger or binding attribute's `Connection` property.
* The `StorageAccount` attribute applied to the same parameter as the trigger or binding attribute.
* The `StorageAccount` attribute applied to the function.
* The `StorageAccount` attribute applied to the class.
* The default storage account for the function app, which is defined in the `AzureWebJobsStorage` application setting.


# [Extension 5.x+](#tab/extensionv5/isolated-process)


When you want the function to write a single message, the queue output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The message content as a string. Use when the message is simple text. |
| `byte[]` | The bytes of the message. |
| JSON serializable types | An object representing the content of a JSON message. Functions tries to serialize a plain-old CLR object (POCO) type into JSON data. |

When you want the function to write multiple messages, the queue output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is one of the single message types | An array containing content for multiple messages. Each entry represents one message. |

For other output scenarios, create and use a [QueueClient] with other types from [Azure.Storage.Queues] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Azure.Storage.Queues]: https://learn.microsoft.com/dotnet/api/azure.storage.queues
[QueueClient]: https://learn.microsoft.com/dotnet/api/azure.storage.queues.queueclient


# [Extension 2.x+](#tab/extensionv2/isolated-process)

Isolated worker process currently only supports binding to string parameters.

---


<!--Any of the below pivots can be combined if the usage info is identical.-->
**Applies to: programming-language-java**

There are two options for writing to a queue from a function by using the [QueueOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.queueoutput) annotation:

- **Return value**: By applying the annotation to the function itself, the return value of the function is written to the queue.

- **Imperative**: To explicitly set the message value, apply the annotation to a specific parameter of the type [`OutputBinding<T>`](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.outputbinding), where `T` is a POJO or any native Java type. With this configuration, passing a value to the `setValue` method writes the value to the queue.


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

Access the output queue item by returning the value directly or using `context.extraOutputs.set()`. You can use a string or a JSON-serializable object for the queue item payload.

# [Model v3](#tab/nodejs-v3)

Access the output queue item by using `context.bindings.<name>` where `<name>` is the value specified in the `name` property of *function.json*. You can use a string or a JSON-serializable object for the queue item payload.

---


**Applies to: programming-language-powershell**

  
Output to the queue message is available via `Push-OutputBinding` where you pass arguments that match the name designated by binding's `name` parameter in the *function.json* file.


**Applies to: programming-language-python**

  
There are two options for writing from your function to the configured queue:

- **Return value**: Set the `name` property in *function.json* to `$return`. With this configuration, the function's return value is persisted as a Queue storage message.

- **Imperative**: Pass a value to the [set](https://learn.microsoft.com/python/api/azure-functions/azure.functions.out#set-val--t-----none) method of the parameter declared as an [Out](https://learn.microsoft.com/python/api/azure-functions/azure.functions.out) type. The value passed to `set` is persisted as a Queue storage message.

The output function parameter must be defined as `func.Out[func.QueueMessage]`, `func.Out[str]`, or `func.Out[bytes]`. Refer to the [output example](#example) for details.




## Connections

The `connection` property is set to a key in application settings that returns a value used by the Functions runtime to connect to the storage account used by the extension. The value of the connection property setting depends on the type of connection: 

+ **Managed identity connection**: The `connection` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to the storage account. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connection` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connection` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connection` property setting returns the actual storage account connection string. Because the connection string contains shared secret keys, you should consider using a managed identity connection, when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings). To obtain a connection string, follow the steps shown at [Manage storage account access keys](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md).

When you set `connection` to a key or key prefix named `AzureWebJobsStorage` or to an empty string, the binding extension uses the default host storage account. For more information, see [Optimize storage performance](storage-considerations.md#optimize-storage-performance). 

## Exceptions and return codes

| Binding | Reference |
| --- | --- |
| Queue | [Queue Error Codes](https://learn.microsoft.com/rest/api/storageservices/queue-service-error-codes) |
| Blob, Table, Queue | [Storage Error Codes](https://learn.microsoft.com/rest/api/storageservices/fileservices/common-rest-api-error-codes) |
| Blob, Table, Queue | [Troubleshooting](https://learn.microsoft.com/rest/api/storageservices/fileservices/troubleshooting-api-operations) |

## Next steps

- [Run a function as queue storage data changes (Trigger)](functions-bindings-storage-queue-trigger.md)

<!-- LINKS -->

[CloudQueueMessage]: https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.queue.cloudqueuemessage
[QueueMessage]: https://learn.microsoft.com/dotnet/api/azure.storage.queues.models.queuemessage
[QueueClient]: https://learn.microsoft.com/dotnet/api/azure.storage.queues.queueclient
