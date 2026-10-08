---
title: RabbitMQ trigger for Azure Functions
description: Learn how to run an Azure Function when a RabbitMQ message is created.
author: cachai2
ms.topic: reference
ms.date: 01/21/2022
ms.author: cachai
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, python
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: programming-languages-set-functions-lang-workers
---

# RabbitMQ trigger for Azure Functions overview

Use the RabbitMQ trigger to respond to messages from a RabbitMQ queue.

> **Note:**
> The RabbitMQ bindings are only fully supported on [Elastic Premium](functions-premium-plan.md) and [Dedicated (App Service)](dedicated-plan.md) plans. [Flex Consumption](flex-consumption-plan.md) and [Consumption](consumption-plan.md) plans aren't yet supported.
>
> RabbitMQ bindings aren't supported by the Azure Functions v1.x runtime.

For information on setup and configuration details, see the [overview](functions-bindings-rabbitmq.md).

## Example

**Applies to: programming-language-csharp**



You can create a C# function by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. An isolated worker process is required to support C# functions running on long-term support (LTS) and non-LTS versions for .NET and the .NET Framework.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Azure Functions runtime.
* [C# script](functions-reference-csharp.md): Used primarily when you create C# functions in the Azure portal.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

### [Isolated worker model](#tab/isolated-process)

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/RabbitMQ/RabbitMQFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-rabbitmq-trigger.md)

### [In-process model](#tab/in-process)

The following example shows a [C# function](functions-dotnet-class-library.md) that reads and logs the RabbitMQ message as a [RabbitMQ Event](https://rabbitmq.github.io/rabbitmq-dotnet-client/api/RabbitMQ.Client.Events.BasicDeliverEventArgs.html):

```cs
[FunctionName("RabbitMQTriggerCSharp")]
public static void RabbitMQTrigger_BasicDeliverEventArgs(
    [RabbitMQTrigger("queue", ConnectionStringSetting = "rabbitMQConnectionAppSetting")] BasicDeliverEventArgs args,
    ILogger logger
    )
{
    logger.LogInformation($"C# RabbitMQ queue trigger function processed message: {Encoding.UTF8.GetString(args.Body)}");
}
```

The following example shows how to read the message as a POCO.

```cs
namespace Company.Function
{
    public class TestClass
    {
        public string x { get; set; }
    }

    public class RabbitMQTriggerCSharp{
        [FunctionName("RabbitMQTriggerCSharp")]
        public static void RabbitMQTrigger_BasicDeliverEventArgs(
            [RabbitMQTrigger("queue", ConnectionStringSetting = "rabbitMQConnectionAppSetting")] TestClass pocObj,
            ILogger logger
            )
        {
            logger.LogInformation($"C# RabbitMQ queue trigger function processed message: {pocObj}");
        }
    }
}
```

Like with JSON objects, an error will occur if the message isn't properly formatted as a C# object. If it is, it's then bound to the variable pocObj, which can be used for what whatever it's needed for.

---


**Applies to: programming-language-java**


The following Java function uses the `@RabbitMQTrigger` annotation from the [Java RabbitMQ types](https://mvnrepository.com/artifact/com.microsoft.azure.functions/azure-functions-java-library-rabbitmq) to describe the configuration for a RabbitMQ queue trigger. The function grabs the message placed on the queue and adds it to the logs.

```java
@FunctionName("RabbitMQTriggerExample")
public void run(
    @RabbitMQTrigger(connectionStringSetting = "rabbitMQConnectionAppSetting", queueName = "queue") String input,
    final ExecutionContext context)
{
    context.getLogger().info("Java HTTP trigger processed a request." + input);
}
```

**Applies to: programming-language-javascript**


The following example shows a RabbitMQ trigger binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding. The function reads and logs a RabbitMQ message.

Here's the binding data in the *function.json* file:

```json
{​​
    "bindings": [
        {​​
            "name": "myQueueItem",
            "type": "rabbitMQTrigger",
            "direction": "in",
            "queueName": "queue",
            "connectionStringSetting": "rabbitMQConnectionAppSetting"
        }​​
    ]
}​​
```
Here's the JavaScript script code:

```javascript
module.exports = async function (context, myQueueItem) {​​
    context.log('JavaScript RabbitMQ trigger function processed work item', myQueueItem);
}​​;
```


**Applies to: programming-language-python**


The following example demonstrates how to read a RabbitMQ queue message via a trigger.

A RabbitMQ binding is defined in *function.json* where *type* is set to `RabbitMQTrigger`.

```json
{​​
    "scriptFile": "__init__.py",
    "bindings": [
        {​​
            "name": "myQueueItem",
            "type": "rabbitMQTrigger",
            "direction": "in",
            "queueName": "queue",
            "connectionStringSetting": "rabbitMQConnectionAppSetting"
        }​​
    ]
}​​
```

```python
import logging
import azure.functions as func

def main(myQueueItem) -> None:
    logging.info('Python RabbitMQ trigger function processed a queue item: %s', myQueueItem)
```


**Applies to: programming-language-powershell**

PowerShell examples aren't currently available.

**Applies to: programming-language-csharp**

## Attributes

Both [isolated worker process](dotnet-isolated-process-guide.md) and [in-process](functions-dotnet-class-library.md) C# libraries use `RabbitMQTriggerAttribute` to define the function, where specific properties of the attribute depend on the extension version.

### [Extension v2.x+](#tab/extensionv2/isolated-process)

The attribute's constructor accepts these parameters:

| Parameter | Description |
| --- | --- |
| **QueueName** | Name of the queue from which to receive messages. |
| **HostName** | This parameter is no longer supported and is ignored. It will be removed in a future version. |
| **ConnectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **UserNameSetting** | This parameter is no longer supported and is ignored. It will be removed in a future version. |
| **PasswordSetting** | This parameter is no longer supported and is ignored. It will be removed in a future version. |
| **Port** | Gets or sets the port used. Defaults to 0, which points to the RabbitMQ client's default port setting of `5672`. |

### [Extension v2.x+](#tab/extensionv2/in-process)

The attribute constructor accepts these parameters:

| Parameter | Description |
| --- | --- |
| **QueueName** | Name of the queue from which to receive messages. |
| **ConnectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **DisableAck** | Optional value that defaults to `False`. Set to `True` when message acknowledgements from the service are disabled and are done manually using `RabbitMQMessageActions`. |
| **DisableCertificateValidation** | Boolean value that can be set to `true` indicating that certificate validation should be disabled. Default value is `false`. Not recommended for production. Doesn't apply when SSL is disabled. |

### [Extension v1.x](#tab/extensionv1/isolated-process)

The attribute's constructor accepts these parameters:

| Parameter | Description |
| --- | --- |
| **QueueName** | Name of the queue from which to receive messages. |
| **HostName** | Hostname of the queue, such as 10.26.45.210. Ignored when using `ConnectStringSetting`. |
| **ConnectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **UserNameSetting** | Name of the app setting that contains the username to access the queue, such as `UserNameSetting: "%< UserNameFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **PasswordSetting** | Name of the app setting that contains the password to access the queue, such as `PasswordSetting: "%< PasswordFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **Port** | Gets or sets the port used. Defaults to 0, which points to the RabbitMQ client's default port setting of `5672`. |

### [Extension v1.x](#tab/extensionv1/in-process)

The attribute's constructor accepts these parameters:

| Parameter | Description |
| --- | --- |
| **QueueName** | Name of the queue from which to receive messages. |
| **HostName** | Hostname of the queue, such as 10.26.45.210. Ignored when using `ConnectStringSetting`. |
| **ConnectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **UserNameSetting** | Name of the app setting that contains the username to access the queue, such as `UserNameSetting: "%< UserNameFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **PasswordSetting** | Name of the app setting that contains the password to access the queue, such as `PasswordSetting: "%< PasswordFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **Port** | Gets or sets the port used. Defaults to 0, which points to the RabbitMQ client's default port setting of `5672`. |

---


**Applies to: programming-language-java**


## Annotations

The `RabbitMQTrigger` annotation allows you to create a function that runs when a RabbitMQ message is created. 

### [Extension v2.x+](#tab/extensionv2)

The annotation supports the following configuration options:

| Parameter | Description |
| --- | --- |
| **queueName** | Name of the queue from which to receive messages. |
| **connectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **disableCertificateValidation** | Boolean value that can be set to `true` indicating that certificate validation should be disabled. Default value is `false`. Not recommended for production. Does not apply when SSL is disabled. |

### [Extension v1.x](#tab/extensionv1)

The annotation supports the following configuration options:

| Parameter | Description |
| --- | --- |
| **queueName** | Name of the queue from which to receive messages. |
| **hostName** | Hostname of the queue, such as 10.26.45.210. Ignored when using `ConnectStringSetting`. |
| **userNameSetting** | Name of the app setting that contains the username to access the queue, such as `UserNameSetting: "%< UserNameFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **passwordSetting** | Name of the app setting that contains the password to access the queue, such as `PasswordSetting: "%< PasswordFromSettings >%"`. Ignored when using `ConnectStringSetting`. |
| **connectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **port** | Gets or sets the port used. Defaults to 0, which points to the RabbitMQ client's default port setting of `5672`. |

---


**Applies to: programming-language-javascript,programming-language-python,programming-language-powershell**


## Configuration

The following table explains the binding configuration properties that you set in the *function.json* file.

### [Extension v2.x+](#tab/extensionv2)

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `RabbitMQTrigger`. |
| **direction** | Must be set to `in`. |
| **name** | The name of the variable that represents the queue in function code. |
| **queueName** | Name of the queue from which to receive messages. |
| **connectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **disableCertificateValidation** | Boolean value that can be set to `true` indicating that certificate validation should be disabled. Default value is `false`. Not recommended for production. Does not apply when SSL is disabled. |

### [Extension v1.x](#tab/extensionv1)

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `RabbitMQTrigger`. |
| **direction** | Must be set to `in`. |
| **name** | The name of the variable that represents the queue in function code. |
| **queueName** | Name of the queue from which to receive messages. |
| **hostName** | Hostname of the queue, such as 10.26.45.210. Ignored when using `connectStringSetting`. |
| **userNameSetting** | Name of the app setting that contains the username to access the queue, such as `UserNameSetting: "%< UserNameFromSettings >%"`. Ignored when using `connectStringSetting`. |
| **passwordSetting** | Name of the app setting that contains the password to access the queue, such as `PasswordSetting: "%< PasswordFromSettings >%"`. Ignored when using `connectStringSetting`. |
| **connectionStringSetting** | The name of the app setting that contains the connection string for your RabbitMQ server. This setting only takes an app setting key name, you can't directly set a connection string value. For more information, see [Connections](#connections). |
| **port** | Gets or sets the port used. Defaults to 0, which points to the RabbitMQ client's default port setting of `5672`. |

---

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 




See the [Example section](#example) for complete examples.

## Usage
**Applies to: programming-language-csharp**

The parameter type supported by the RabbitMQ trigger depends on the C# modality used.

### [Isolated worker model](#tab/isolated-process)

The RabbitMQ bindings currently support only string and serializable object types when running in an isolated process.

### [In-process model](#tab/in-process)

The default message type is [RabbitMQ Event](https://rabbitmq.github.io/rabbitmq-dotnet-client/api/RabbitMQ.Client.Events.BasicDeliverEventArgs.html), and the `Body` property of the RabbitMQ Event can be read as the types listed below:

* `An object serializable as JSON` - The message is delivered as a valid JSON string.
* `string`
* `byte[]`
* `POCO` - The message is formatted as a C# object. For complete code, see C# [example](#example).

---


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

### Dead letter queues

Dead letter queues and exchanges can't be controlled or configured from the RabbitMQ trigger.  To use dead letter queues, pre-configure the queue used by the trigger in RabbitMQ. Refer to the [RabbitMQ documentation](https://www.rabbitmq.com/dlx.html).

### Enable Runtime Scaling

In order for the RabbitMQ trigger to scale out to multiple instances, the **Runtime Scale Monitoring** setting must be enabled. 

In the portal, this setting can be found under **Configuration** > **Function runtime settings** for your function app.

VNETToggle

In the Azure CLI, you can enable **Runtime Scale Monitoring** by using this command:

```azurecli-interactive
az resource update -resource-group <RESOURCE_GROUP> -name <APP_NAME>/config/web \
    --set properties.functionsRuntimeScaleMonitoringEnabled=1 \
    --resource-type Microsoft.Web/sites
```

### Monitoring a RabbitMQ endpoint
To monitor your queues and exchanges for a certain RabbitMQ endpoint:

* Enable the [RabbitMQ management plugin](https://www.rabbitmq.com/management.html)
* Browse to `http://{node-hostname}:15672` and log in with your user name and password.

## Related article

- [Send RabbitMQ messages from Azure Functions (Output binding)](functions-bindings-rabbitmq-output.md)
