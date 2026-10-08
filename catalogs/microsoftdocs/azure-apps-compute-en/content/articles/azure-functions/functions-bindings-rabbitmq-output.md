---
title: RabbitMQ output bindings for Azure Functions
description: Learn to send RabbitMQ messages from Azure Functions.
author: cachai2
ms.topic: reference
ms.date: 01/21/2022
ms.author: cachai
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, python
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: programming-languages-set-functions-lang-workers
---

# RabbitMQ output binding for Azure Functions overview

Use the RabbitMQ output binding to send messages to a RabbitMQ queue.

> **Note:**
> The RabbitMQ bindings are only fully supported on [Elastic Premium](functions-premium-plan.md) and [Dedicated (App Service)](dedicated-plan.md) plans. [Flex Consumption](flex-consumption-plan.md) and [Consumption](consumption-plan.md) plans aren't yet supported.
>
> RabbitMQ bindings aren't supported by the Azure Functions v1.x runtime.

For information on setup and configuration details, see the [overview](functions-bindings-rabbitmq-output.md).

## Example

**Applies to: programming-language-csharp**



You can create a C# function by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. An isolated worker process is required to support C# functions running on long-term support (LTS) and non-LTS versions for .NET and the .NET Framework.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Azure Functions runtime.
* [C# script](functions-reference-csharp.md): Used primarily when you create C# functions in the Azure portal.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)
<!--
:::code language="csharp" source="~/azure-functions-dotnet-worker/samples/Extensions/RabbitMQ/RabbitMQFunction.cs" range="12-23":::
-->

# [In-process model](#tab/in-process)

The following example shows a [C# function](functions-dotnet-class-library.md) that sends a RabbitMQ message when triggered by a TimerTrigger every 5 minutes using the method return value as the output:

```cs
[FunctionName("RabbitMQOutput")]
[return: RabbitMQ(QueueName = "outputQueue", ConnectionStringSetting = "rabbitMQConnectionAppSetting")]
public static string Run([TimerTrigger("0 */5 * * * *")] TimerInfo myTimer, ILogger log)
{
    log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
    return $"{DateTime.Now}";
}
```

The following example shows how to use the IAsyncCollector interface to send messages.

```cs
[FunctionName("RabbitMQOutput")]
public static async Task Run(
[RabbitMQTrigger("sourceQueue", ConnectionStringSetting = "rabbitMQConnectionAppSetting")] string rabbitMQEvent,
[RabbitMQ(QueueName = "destinationQueue", ConnectionStringSetting = "rabbitMQConnectionAppSetting")]IAsyncCollector<string> outputEvents,
ILogger log)
{
     // send the message
    await outputEvents.AddAsync(JsonConvert.SerializeObject(rabbitMQEvent));
}
```

The following example shows how to send the messages as POCOs.

```cs
namespace Company.Function
{
    public class TestClass
    {
        public string x { get; set; }
    }
    public static class RabbitMQOutput{
        [FunctionName("RabbitMQOutput")]
        public static async Task Run(
        [RabbitMQTrigger("sourceQueue", ConnectionStringSetting = "rabbitMQConnectionAppSetting")] TestClass rabbitMQEvent,
        [RabbitMQ(QueueName = "destinationQueue", ConnectionStringSetting = "rabbitMQConnectionAppSetting")]IAsyncCollector<TestClass> outputPocObj,
        ILogger log)
        {
            // send the message
            await outputPocObj.AddAsync(rabbitMQEvent);
        }
    }
}
```

---


**Applies to: programming-language-java**


The following Java function uses the `@RabbitMQOutput` annotation from the [Java RabbitMQ types](https://mvnrepository.com/artifact/com.microsoft.azure.functions/azure-functions-java-library-rabbitmq) to describe the configuration for a RabbitMQ queue output binding. The function sends a message to the RabbitMQ queue when triggered by a TimerTrigger every 5 minutes.

```java
@FunctionName("RabbitMQOutputExample")
public void run(
@TimerTrigger(name = "keepAliveTrigger", schedule = "0 */5 * * * *") String timerInfo,
@RabbitMQOutput(connectionStringSetting = "rabbitMQConnectionAppSetting", queueName = "hello") OutputBinding<String> output,
final ExecutionContext context) {
    output.setValue("Some string");
}
```


**Applies to: programming-language-javascript**


The following example shows a RabbitMQ output binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding. The function reads in the message from an HTTP trigger and outputs it to the RabbitMQ queue.

Here's the binding data in the *function.json* file:

```json
{
    "bindings": [
        {
            "type": "httpTrigger",
            "direction": "in",
            "authLevel": "function",
            "name": "input",
            "methods": [
                "get",
                "post"
            ]
        },
        {
            "type": "rabbitMQ",
            "name": "outputMessage",
            "queueName": "outputQueue",
            "connectionStringSetting": "rabbitMQConnectionAppSetting",
            "direction": "out"
        }
    ]
}
```

Here's JavaScript code:

```javascript
module.exports = async function (context, input) {
    context.bindings.outputMessage = input.body;
};
```


**Applies to: programming-language-powershell**


**Applies to: programming-language-python**


The following example shows a RabbitMQ output binding in a *function.json* file and a Python function that uses the binding. The function reads in the message from an HTTP trigger and outputs it to the RabbitMQ queue.

Here's the binding data in the *function.json* file:

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
        },​​
        {
            "type": "rabbitMQ",
            "name": "outputMessage",
            "queueName": "outputQueue",
            "connectionStringSetting": "rabbitMQConnectionAppSetting",
            "direction": "out"
        }
    ]
}
```

In *_\_init_\_.py*:

```python
import azure.functions as func

def main(req: func.HttpRequest, outputMessage: func.Out[str]) -> func.HttpResponse:
    input_msg = req.params.get('message')
    outputMessage.set(input_msg)
    return 'OK'
```


**Applies to: programming-language-csharp**


## Attributes

Both [isolated worker process](dotnet-isolated-process-guide.md) and [in-process](functions-dotnet-class-library.md) C# libraries use an attribute to define an output binding that writes to a RabbitMQ queue.

### [Extension v2.x+](#tab/extensionv2/isolated-process)

The `RabbitMQOutputAttribute` constructor accepts these parameters:

| Parameter | Description |
| --- | --- |
| **QueueName** | Name of the queue from which to receive messages. |
| **HostName** | This parameter is no longer supported and is ignored. It will be removed in a future version. |
| **ConnectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **UserNameSetting** | This parameter is no longer supported and is ignored. It will be removed in a future version. |
| **PasswordSetting** | This parameter is no longer supported and is ignored. It will be removed in a future version. |
| **Port** | Gets or sets the port used. Defaults to 0, which points to the RabbitMQ client's default port setting of `5672`. |
| **DisableCertificateValidation** | Gets or sets a value indicating whether certificate validation should be disabled. Not recommended for production. Does not apply when SSL is disabled. |

### [Extension v2.x+](#tab/extensionv2/in-process)

The `RabbitMQAttribute` constructor accepts these parameters:

| Parameter | Description |
| --- | --- |
| **QueueName** | Name of the queue from which to receive messages. |
| **ConnectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **DisableCertificateValidation** | Gets or sets a value indicating whether certificate validation should be disabled. Not recommended for production. Does not apply when SSL is disabled. |

### [Extension v1.x](#tab/extensionv1/isolated-process)

The `RabbitMQOutputAttribute` constructor accepts these parameters:

| Parameter | Description |
| --- | --- |
| **QueueName** | Name of the queue from which to receive messages. |
| **HostName** | Hostname of the queue, such as 10.26.45.210. Ignored when using `ConnectStringSetting`. |
| **UserNameSetting** | Name of the app setting that contains the username to access the queue, such as `UserNameSetting: "%< UserNameFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **PasswordSetting** | Name of the app setting that contains the password to access the queue, such as `PasswordSetting: "%< PasswordFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **ConnectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **Port** | Gets or sets the port used. Defaults to 0, which points to the RabbitMQ client's default port setting of `5672`. |

### [Extension v1.x](#tab/extensionv1/in-process)

The `RabbitMQAttribute` constructor accepts these parameters:

| Parameter | Description |
| --- | --- |
| **QueueName** | Name of the queue from which to receive messages. |
| **HostName** | Hostname of the queue, such as 10.26.45.210. Ignored when using `ConnectStringSetting`. |
| **UserNameSetting** | Name of the app setting that contains the username to access the queue, such as `UserNameSetting: "%< UserNameFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **PasswordSetting** | Name of the app setting that contains the password to access the queue, such as `PasswordSetting: "%< PasswordFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **ConnectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **Port** | Gets or sets the port used. Defaults to 0, which points to the RabbitMQ client's default port setting of `5672`. |

---


**Applies to: programming-language-java**

## Annotations

The `RabbitMQOutput` annotation allows you to create a function that runs when a RabbitMQ message is created.

### [Extension v2.x+](#tab/extensionv2)

The annotation supports the following configuration settings:

| Setting | Description |
| --- | --- |
| **queueName** | Name of the queue from which to receive messages. |
| **connectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **disableCertificateValidation** | Gets or sets a value indicating whether certificate validation should be disabled. Not recommended for production. Does not apply when SSL is disabled. |

### [Extension v1.x](#tab/extensionv1)

The annotation supports the following configuration settings:

| Setting | Description |
| --- | --- |
| **queueName** | Name of the queue from which to receive messages. |
| **hostName** | Hostname of the queue, such as 10.26.45.210. Ignored when using `ConnectStringSetting`. |
| **userNameSetting** | Name of the app setting that contains the username to access the queue, such as `UserNameSetting: "%< UserNameFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **passwordSetting** | Name of the app setting that contains the password to access the queue, such as `PasswordSetting: "%< PasswordFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **connectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **port** | Gets or sets the port used. Defaults to 0, which points to the RabbitMQ client's default port setting of `5672`. |

---


**Applies to: programming-language-javascript,programming-language-csharp,programming-language-python,programming-language-powershell**

 
## Configuration

The following table explains the binding configuration properties that you set in the *function.json* file.

### [Extension v2.x+](#tab/extensionv2)

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `RabbitMQ`. |
| **direction** | Must be set to `out`. |
| **name** | The name of the variable that represents the queue in function code. |
| **queueName** | Name of the queue to send messages to. |
| **connectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **disableCertificateValidation** | Gets or sets a value indicating whether certificate validation should be disabled. Not recommended for production. Does not apply when SSL is disabled. |

### [Extension v1.x](#tab/extensionv1)

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `RabbitMQ`. |
| **direction** | Must be set to `out`. |
| **name** | The name of the variable that represents the queue in function code. |
| **queueName** | Name of the queue to send messages to. |
| **hostName** | Hostname of the queue, such as 10.26.45.210. Ignored when using `connectStringSetting`. |
| **userName** | Name of the app setting that contains the username to access the queue, such as UserNameSetting: "< UserNameFromSettings >". Ignored when using `connectStringSetting`. |
| **password** | Name of the app setting that contains the password to access the queue, such as UserNameSetting: "< UserNameFromSettings >". Ignored when using `connectStringSetting`. |
| **connectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **port** | Gets or sets the Port used. Defaults to 0, which points to the RabbitMQ client's default port setting of `5672`. |

---

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 




See the [Example section](#example) for complete examples.

## Usage  
**Applies to: programming-language-csharp**

The parameter type supported by the RabbitMQ trigger depends on the Functions runtime version, the extension package version, and the C# modality used.

### [Isolated worker model](#tab/isolated-process)

The RabbitMQ bindings currently support only string and serializable object types when running in an isolated worker process.

### [In-process model](#tab/in-process)

Use the following parameter types for the output binding:

* `byte[]` - If the parameter value is null when the function exits, Functions doesn't create a message.
* `string` - If the parameter value is null when the function exits, Functions doesn't create a message.
* `POCO` - The message is formatted as a C# object.

When working with C# functions:

* Async functions need a return value or `IAsyncCollector` instead of an `out` parameter.

---


**Applies to: programming-language-java**

Use the following parameter types for the output binding:

* `byte[]` - If the parameter value is null when the function exits, Functions doesn't create a message.
* `string` - If the parameter value is null when the function exits, Functions doesn't create a message.
* `POJO` - If the parameter value isn't formatted as a Java object, an error will be received.

**Applies to: programming-language-javascript**

  
The queue message is available via `context.bindings.<NAME>` where `<NAME>` matches the name defined in function.json. If the payload is JSON, the value is deserialized into an object.


### Connections

> **Important:**
> The RabbitMQ binding doesn't support Microsoft Entra authentication and managed identities. You can use Azure Key Vault to centrally managed your RabbitMQ connection strings. To learn more, see [Manage Connections](manage-connections.md). 
>
> Starting with version 2.x of the extension, `hostName`, `userNameSetting`, and `passwordSetting` are no longer supported to define a connection to the RabbitMQ server. You must instead use `connectionStringSetting`.

The `connectionStringSetting` property can only accept the name of a key-value pair in app settings. You can't directly set a connection string value in the binding. 

For example, when you have set `connectionStringSetting` to `rabbitMQConnection` in your binding definition, your function app must have an app setting named `rabbitMQConnection` that returns either a connection value like `amqp://myuser:***@contoso.rabbitmq.example.com:5672` or an [Azure Key Vault reference](../app-service/app-service-key-vault-references.md).

When running locally, you must also have the key value for `connectionStringSetting` defined in your *local.settings.json* file. Otherwise, your app can't connect to the service from your local computer and an error occurs.

## Related articles 

- [Run a function when a RabbitMQ message is created (Trigger)](functions-bindings-rabbitmq-trigger.md)
