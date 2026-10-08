---
title: Azure Queue storage trigger for Azure Functions
description: Learn to run an Azure Function as Azure Queue storage data changes.
ms.topic: reference
ms.date: 04/04/2023
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

# Azure Queue storage trigger for Azure Functions

The queue storage trigger runs a function as messages are added to Azure Queue storage.

Azure Queue storage scaling decisions for the Consumption and Premium plans are done via target-based scaling. For more information, see [Target-based scaling](functions-target-based-scaling.md).

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


Use the queue trigger to start a function when a new item is received on a queue. The queue message is provided as input to the function.


A C# function can be created by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. Isolated worker process is required to support C# functions running on LTS and non-LTS versions .NET and the .NET Framework. Extensions for isolated worker process functions use `Microsoft.Azure.Functions.Worker.Extensions.*` namespaces.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Functions runtime. In a variation of this model, Functions can be run using [C# scripting](functions-reference-csharp.md), which is supported primarily for C# portal editing. Extensions for in-process functions use `Microsoft.Azure.WebJobs.Extensions.*` namespaces.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)

The following example shows a [C# function](dotnet-isolated-process-guide.md) that polls the `input-queue` queue and writes several messages to an output queue each time a queue item is processed.

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/Queue/QueueFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-trigger.md)

# [In-process model](#tab/in-process)

The following example shows a [C# function](functions-dotnet-class-library.md) that polls the `myqueue-items` queue and writes a log each time a queue item is processed.

```csharp
public static class QueueFunctions
{
    [FunctionName("QueueTrigger")]
    public static void QueueTrigger(
        [QueueTrigger("myqueue-items")] string myQueueItem, 
        ILogger log)
    {
        log.LogInformation($"C# function processed: {myQueueItem}");
    }
}
```

---


**Applies to: programming-language-java**


The following Java example shows a storage queue trigger function, which logs the triggered message placed into queue `myqueuename`.

```java
@FunctionName("queueprocessor")
public void run(
    @QueueTrigger(name = "msg",
                queueName = "myqueuename",
                connection = "myconnvarname") String message,
    final ExecutionContext context
) {
    context.getLogger().info(message);
}
```


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following example shows a queue trigger [TypeScript function](functions-reference-node.md?tabs=typescript). The function polls the `myqueue-items` queue and writes a log each time a queue item is processed.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/storageQueueTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-trigger.md)

> **Tip:**
> To avoid the default `unknown` type on the queue input, use the generic type parameter (for example, `app.storageQueue<string>(...)`). This requires `@azure/functions` version 4.11.0 or later. For more information, see [Usage](#usage).

The [message metadata section](#message-metadata) explains all of the other variables shown.

# [Model v3](#tab/nodejs-v3)

TypeScript samples aren't documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

The following example shows a queue trigger [JavaScript function](functions-reference-node.md). The function polls the `myqueue-items` queue and writes a log each time a queue item is processed.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/storageQueueTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-trigger.md)

The [usage](#usage) section explains `queueItem`. The [message metadata section](#message-metadata) explains all of the other variables shown.

# [Model v3](#tab/nodejs-v3)

The following example shows a queue trigger binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding. The function polls the `myqueue-items` queue and writes a log each time a queue item is processed.

Here's the *function.json* file:

```json
{
    "disabled": false,
    "bindings": [
        {
            "type": "queueTrigger",
            "direction": "in",
            "name": "myQueueItem",
            "queueName": "myqueue-items",
            "connection":"MyStorageConnectionAppSetting"
        }
    ]
}
```

The [configuration](#configuration) section explains these properties.

> **Note:**
> The name parameter reflects as `context.bindings.<name>` in the JavaScript code which contains the queue item payload. This payload is also passed as the second parameter to the function.

Here's the JavaScript code:

```javascript
module.exports = async function (context, message) {
    context.log('Node.js queue trigger function processed work item', message);
    // OR access using context.bindings.<name>
    // context.log('Node.js queue trigger function processed work item', context.bindings.myQueueItem);
    context.log('expirationTime =', context.bindingData.expirationTime);
    context.log('insertionTime =', context.bindingData.insertionTime);
    context.log('nextVisibleTime =', context.bindingData.nextVisibleTime);
    context.log('id =', context.bindingData.id);
    context.log('popReceipt =', context.bindingData.popReceipt);
    context.log('dequeueCount =', context.bindingData.dequeueCount);
};
```

The [usage](#usage) section explains `myQueueItem`, which is named by the `name` property in function.json.  The [message metadata section](#message-metadata) explains all of the other variables shown.

---


**Applies to: programming-language-powershell**


The following example demonstrates how to read a queue message passed to a function via a trigger.

A Storage queue trigger is defined in *function.json* file where `type` is set to `queueTrigger`.

```json
{
  "bindings": [
    {
      "name": "QueueItem",
      "type": "queueTrigger",
      "direction": "in",
      "queueName": "messages",
      "connection": "MyStorageConnectionAppSetting"
    }
  ]
}
```

The code in the *Run.ps1* file declares a parameter as `$QueueItem`, which allows you to read the queue message in your function.

```powershell
# Input bindings are passed in via param block.
param([string] $QueueItem, $TriggerMetadata)

# Write out the queue message and metadata to the information log.
Write-Host "PowerShell queue trigger function processed work item: $QueueItem"
Write-Host "Queue item expiration time: $($TriggerMetadata.ExpirationTime)"
Write-Host "Queue item insertion time: $($TriggerMetadata.InsertionTime)"
Write-Host "Queue item next visible time: $($TriggerMetadata.NextVisibleTime)"
Write-Host "ID: $($TriggerMetadata.Id)"
Write-Host "Pop receipt: $($TriggerMetadata.PopReceipt)"
Write-Host "Dequeue count: $($TriggerMetadata.DequeueCount)"
```


**Applies to: programming-language-python**


The following example demonstrates how to read a queue message passed to a function via a trigger. The example depends on whether you use the v1 or v2 Python programming model.

# [v2](#tab/python-v2)

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="QueueFunc")
@app.queue_trigger(arg_name="msg", queue_name="inputqueue",
                   connection="storageAccountConnectionString")  # Queue trigger
@app.queue_output(arg_name="outputQueueItem", queue_name="outqueue",
                 connection="storageAccountConnectionString")  # Queue output binding
def test_function(msg: func.QueueMessage,
                  outputQueueItem: func.Out[str]) -> None:
    logging.info('Python queue trigger function processed a queue item: %s',
                 msg.get_body().decode('utf-8'))
    outputQueueItem.set('hello')
```

# [v1](#tab/python-v1)

A Storage queue trigger is defined in *function.json* where *type* is set to `queueTrigger`.

```json
{
  "scriptFile": "__init__.py",
  "bindings": [
    {
      "name": "msg",
      "type": "queueTrigger",
      "direction": "in",
      "queueName": "messages",
      "connection": "AzureStorageQueuesConnectionString"
    }
  ]
}
```

The code *_\_init_\_.py* declares a parameter as `func.QueueMessage`, which allows you to read the queue message in your function.

```python
import logging
import json

import azure.functions as func

def main(msg: func.QueueMessage):
    logging.info('Python queue trigger function processed a queue item.')

    result = json.dumps({
        'id': msg.id,
        'body': msg.get_body().decode('utf-8'),
        'expiration_time': (msg.expiration_time.isoformat()
                            if msg.expiration_time else None),
        'insertion_time': (msg.insertion_time.isoformat()
                           if msg.insertion_time else None),
        'time_next_visible': (msg.time_next_visible.isoformat()
                              if msg.time_next_visible else None),
        'pop_receipt': msg.pop_receipt,
        'dequeue_count': msg.dequeue_count
    })

    logging.info(result)
```
---


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use the [QueueTriggerAttribute](https://github.com/Azure/azure-webjobs-sdk/blob/master/src/Microsoft.Azure.WebJobs.Extensions.Storage/Queues/QueueTriggerAttribute.cs) to define the function. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#queue-trigger).


# [Isolated worker model](#tab/isolated-process)

In [C# class libraries](dotnet-isolated-process-guide.md), the attribute's constructor takes the name of the queue to monitor, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/Queue/QueueFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-trigger.md)

This example also demonstrates setting the [connection string setting](#connections) in the attribute itself. 

# [In-process model](#tab/in-process)

In [C# class libraries](functions-dotnet-class-library.md), the attribute's constructor takes the name of the queue to monitor, as shown in the following example:

```csharp
[FunctionName("QueueTrigger")]
public static void Run(
    [QueueTrigger("myqueue-items")] string myQueueItem, 
    ILogger log)
{
    ...
}
```

You can set the `Connection` property to specify the app setting that contains the storage account connection string to use, as shown in the following example:

```csharp
[FunctionName("QueueTrigger")]
public static void Run(
    [QueueTrigger("myqueue-items", Connection = "StorageConnectionAppSetting")] string myQueueItem, 
    ILogger log)
{
    ....
}
```

---


**Applies to: programming-language-java**

## Annotations

The `QueueTrigger` annotation gives you access to the queue that triggers the function. The following example makes the queue message available to the function via the `message` parameter.

```java
package com.function;
import com.microsoft.azure.functions.annotation.*;
import java.util.Queue;
import com.microsoft.azure.functions.*;

public class QueueTriggerDemo {
    @FunctionName("QueueTriggerDemo")
    public void run(
        @QueueTrigger(name = "message", queueName = "messages", connection = "MyStorageConnectionAppSetting") String message,
        final ExecutionContext context
    ) {
        context.getLogger().info("Queue message: " + message);
    }
}
```

| Property | Description |
| --- | --- |
| `name` | Declares the parameter name in the function signature. When the function is triggered, this parameter's value has the contents of the queue message. |
| `queueName` | Declares the queue name in the storage account. |
| `connection` | Points to the storage account connection string. |


**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

For Python v2 functions defined using decorators, the following properties on the `queue_trigger` decorator define the Queue Storage trigger:

| Property | Description |
| --- | --- |
| `arg_name` | Declares the parameter name in the function signature. When the function is triggered, this parameter's value has the contents of the queue message. |
| `queue_name` | Declares the queue name in the storage account. |
| `connection` | Points to the storage account connection string. |

For Python functions defined by using function.json, see the Configuration section. 

**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `app.storageQueue()` method.

| Property | Description |
| --- | --- |
| **queueName** | The name of the queue to poll. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Queues. See [Connections](#connections). |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `queueTrigger`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | In the *function.json* file only. Must be set to `in`. This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that contains the queue item payload in the function code. |
| **queueName** | The name of the queue to poll. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Queues. See [Connections](#connections). |

---


**Applies to: programming-language-powershell,programming-language-python**

The following table explains the binding configuration properties that you set in the *function.json* file and the `QueueTrigger` attribute.

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `queueTrigger`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | In the *function.json* file only. Must be set to `in`. This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that contains the queue item payload in the function code. |
| **queueName** | The name of the queue to poll. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Queues. See [Connections](#connections). |



See the [Example section](#example) for complete examples.

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 


## Usage

<a name="encoding"></a>

> **Note:**
> Functions expect a *base64* encoded string. Any adjustments to the encoding type (in order to prepare data as a *base64* encoded string) need to be implemented in the calling service.

**Applies to: programming-language-csharp**


The usage of the Queue trigger depends on the extension package version, and the C# modality used in your function app, which can be one of these modes:

# [Isolated worker model](#tab/isolated-process)

An isolated worker process class library compiled C# function runs in a process isolated from the runtime.   

# [In-process class library](#tab/in-process)

An in-process class library is a compiled C# function runs in the same process as the Functions runtime.
 
---

Choose a version to see usage details for the mode and version. 

# [Extension 5.x+](#tab/extensionv5/in-process)

Access the message data by using a method parameter such as `string paramName`. The `paramName` is the value specified in the [QueueTriggerAttribute](https://github.com/Azure/azure-webjobs-sdk/blob/master/src/Microsoft.Azure.WebJobs.Extensions.Storage/Queues/QueueTriggerAttribute.cs). You can bind to any of the following types:

* Plain-old .NET CLR object (POCO)
* `string`
* `byte[]`
* [QueueMessage]

When binding to an object, the Functions runtime tries to deserialize the JSON payload into an instance of an arbitrary class defined in your code. For examples using [QueueMessage], see [the GitHub repository for the extension](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Queues#examples).


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

Access the message data by using a method parameter such as `string paramName`. The `paramName` is the value specified in the [QueueTriggerAttribute](https://github.com/Azure/azure-webjobs-sdk/blob/master/src/Microsoft.Azure.WebJobs.Extensions.Storage/Queues/QueueTriggerAttribute.cs). You can bind to any of the following types:

* Plain-old CLR object (POCO)
* `string`
* `byte[]`
* [CloudQueueMessage]

When binding to an object, the Functions runtime tries to deserialize the JSON payload into an instance of an arbitrary class defined in your code.  If you try to bind to [CloudQueueMessage] and get an error message, make sure that you have a reference to [the correct Storage SDK version](functions-bindings-storage-queue.md).


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


The queue trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The message content as a string. Use when the message is simple text.. |
| `byte[]` | The bytes of the message. |
| JSON serializable types | When a queue message contains JSON data, Functions tries to deserialize the JSON data into a plain-old CLR object (POCO) type. |
| [QueueMessage]<sup>1</sup> | The message. |
| [BinaryData]<sup>1</sup> | The bytes of the message. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues 5.2.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues/5.2.0) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[QueueMessage]: https://learn.microsoft.com/dotnet/api/azure.storage.queues.models.queuemessage
[BinaryData]: https://learn.microsoft.com/dotnet/api/system.binarydata

# [Extension 2.x+](#tab/extensionv2/isolated-process)

Earlier versions of this extension in the isolated worker process only support binding to strings. More options are available to **Extension 5.x+**.

---


<!--Any of the below pivots can be combined if the usage info is identical.-->
**Applies to: programming-language-java**

The [QueueTrigger](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.queuetrigger) annotation gives you access to the queue message that triggered the function.

**Applies to: programming-language-typescript**

### [Model v4](#tab/nodejs-v4)

Access the queue item as the first argument to your function. If the payload is JSON, the value is deserialized into an object.

Use the generic type parameter on `app.storageQueue<string>(...)` to type the queue trigger input. Without the generic, the input parameter defaults to `unknown`, which requires explicit type narrowing before you can use the value. Generic type support requires `@azure/functions` version 4.11.0 or later.

### [Model v3](#tab/nodejs-v3)

Access the queue item using `context.bindings.<NAME>` where `<NAME>` matches the value defined in *function.json*. If the payload is JSON, the value is deserialized into an object.

---


**Applies to: programming-language-javascript**

### [Model v4](#tab/nodejs-v4)

Access the queue item as the first argument to your function. If the payload is JSON, the value is deserialized into an object.

### [Model v3](#tab/nodejs-v3)

Access the queue item using `context.bindings.<NAME>` where `<NAME>` matches the value defined in *function.json*. If the payload is JSON, the value is deserialized into an object.

---


**Applies to: programming-language-powershell**

Access the queue message via string parameter that matches the name designated by binding's `name` parameter in the *function.json* file.

**Applies to: programming-language-python**

Access the queue message via the parameter typed as [QueueMessage](https://learn.microsoft.com/python/api/azure-functions/azure.functions.queuemessage).


## <a name="message-metadata"></a>Metadata

The queue trigger provides several [metadata properties](functions-bindings-expressions-patterns.md#trigger-metadata). These properties can be used as part of binding expressions in other bindings or as parameters in your code, for language workers that provide this access to message metadata. 

**Applies to: programming-language-csharp**

The message metadata properties are members of the [CloudQueueMessage] class.

**Applies to: programming-language-javascript,programming-language-typescript**

The message metadata properties can be accessed from `context.triggerMetadata`.

**Applies to: programming-language-powershell**

The message metadata properties can be accessed from the passed `$TriggerMetadata` parameter.


| Property | Type | Description |
| --- | --- | --- |
| `QueueTrigger` | `string` | Queue payload (if a valid string). If the queue message payload is a string, `QueueTrigger` has the same value as the variable named by the `name` property in *function.json*. |
| `DequeueCount` | `long` | The number of times this message has been dequeued. |
| `ExpirationTime` | `DateTimeOffset` | The time that the message expires. |
| `Id` | `string` | Queue message ID. |
| `InsertionTime` | `DateTimeOffset` | The time that the message was added to the queue. |
| `NextVisibleTime` | `DateTimeOffset` | The time that the message will next be visible. |
| `PopReceipt` | `string` | The message's pop receipt. |

**Applies to: programming-language-python**

The following message metadata properties can be accessed from the passed binding parameter (`msg` in previous [examples](#example)).

| Property | Description |
| --- | --- |
| `body` | Queue payload as a string. |
| `dequeue_count` | The number of times this message has been dequeued. |
| `expiration_time` | The time that the message expires. |
| `id` | Queue message ID. |
| `insertion_time` | The time that the message was added to the queue. |
| `time_next_visible` | The time that the message will next be visible. |
| `pop_receipt` | The message's pop receipt. |




## Connections

The `connection` property is set to a key in application settings that returns a value used by the Functions runtime to connect to the storage account used by the extension. The value of the connection property setting depends on the type of connection: 

+ **Managed identity connection**: The `connection` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to the storage account. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connection` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connection` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connection` property setting returns the actual storage account connection string. Because the connection string contains shared secret keys, you should consider using a managed identity connection, when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings). To obtain a connection string, follow the steps shown at [Manage storage account access keys](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md).

When you set `connection` to a key or key prefix named `AzureWebJobsStorage` or to an empty string, the binding extension uses the default host storage account. For more information, see [Optimize storage performance](storage-considerations.md#optimize-storage-performance). 

## Poison messages

When a queue trigger function fails, Azure Functions retries the function up to five times for a given queue message, including the first try. If all five attempts fail, the functions runtime adds a message to a queue named *&lt;originalqueuename&gt;-poison*. You can write a function to process messages from the poison queue by logging them or sending a  notification that manual attention is needed.

To handle poison messages manually, check the [dequeueCount](#message-metadata) of the queue message.


## Peek lock

The peek-lock pattern happens automatically for queue triggers, using the visibility mechanics provided by the storage service. As messages are dequeued by the triggered function, they're marked as invisible. Execution of a queue triggered function can have one of these results on message in the queue:

- Function execution completes successfully and the message is deleted from the queue.
- Function execution fails and the Functions host updates the visibility of the message based on the `visibilityTimeout` [setting in the host.json file](functions-bindings-storage-queue.md#host-json). The default visibility timeout is zero, which means that the message immediately reappears in the queue for reprocessing. Use the `visibilityTimeout` setting to delay the reprocessing of messages that fail to process. This timeout setting applies to all queue triggered functions in the function app.
- The Functions host crashes during function execution. When this uncommon event occurs, the host can't apply the `visibilityTimeout` to the message being processed. Instead, the message is left with the default 10 minute timeout set by the storage service. After 10 minutes, the message reappears in the queue for reprocessing. This service-defined default timeout can't be changed.   

## Polling algorithm

The queue trigger implements a random exponential back-off algorithm to reduce the effect of idle-queue polling on storage transaction costs.

The algorithm uses the following logic:

- When a message is found, the runtime waits 100 milliseconds and then checks for another message.
- When no message is found, it waits about 200 milliseconds before trying again.
- After subsequent failed attempts to get a queue message, the wait time continues to increase until it reaches the maximum wait time, which defaults to one minute.
- The maximum wait time is configurable via the `maxPollingInterval` property in the [host.json file](functions-bindings-storage-queue.md#host-json).

During local development, the maximum polling interval defaults to two seconds.

> **Note:**
> In regards to billing when hosting function apps in the Consumption plan, you are not charged for time spent polling by the runtime.

## Concurrency

When there are multiple queue messages waiting, the queue trigger retrieves a batch of messages and invokes function instances concurrently to process them. By default, the batch size is 16. When the number being processed gets down to 8, the runtime gets another batch and starts processing those messages. So the maximum number of concurrent messages being processed per function on one virtual machine (VM) is 24. This limit applies separately to each queue-triggered function on each VM. If your function app scales out to multiple VMs, each VM waits for triggers and attempt to run functions. For example, if a function app scales out to 3 VMs, the default maximum number of concurrent instances of one queue-triggered function is 72.

The batch size and the threshold for getting a new batch are configurable in the [host.json file](functions-host-json.md#queues). If you want to minimize parallel execution for queue-triggered functions in a function app, you can set the batch size to 1. This setting eliminates concurrency only so long as your function app runs on a single virtual machine (VM).

The queue trigger automatically prevents a function from processing a queue message multiple times simultaneously.

## host.json properties

The host.json file contains settings that control queue trigger behavior. See the [host.json settings](functions-bindings-storage-queue.md#host-json) section for details regarding available settings.

## Next steps

- [Write queue storage messages (Output binding)](functions-bindings-storage-queue-output.md)

<!-- LINKS -->

[CloudQueueMessage]: https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.queue.cloudqueuemessage
[QueueMessage]: https://learn.microsoft.com/dotnet/api/azure.storage.queues.models.queuemessage
