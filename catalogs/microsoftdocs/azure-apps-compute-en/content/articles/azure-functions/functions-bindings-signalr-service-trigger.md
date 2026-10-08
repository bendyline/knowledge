---
title: Azure Functions SignalR Service trigger binding
description: Learn to handle SignalR Service messages from Azure Functions.
author: Y-Sindo
ms.topic: reference
ms.devlang: csharp
# ms.devlang: csharp, javascript, python
ms.custom: devx-track-csharp, devx-track-extended-java, devx-track-js, devx-track-python
ms.date: 04/02/2024
ms.author: zityang
zone_pivot_groups: programming-languages-set-functions-lang-workers
---

# SignalR Service trigger binding for Azure Functions

Use the *SignalR* trigger binding to respond to messages sent from Azure SignalR Service. When function is triggered, messages passed to the function is parsed as a json object.

In SignalR Service serverless mode, SignalR Service uses the [Upstream](../azure-signalr/concept-upstream.md) feature to send messages from client to Function App. And Function App uses SignalR Service trigger binding to handle these messages. The general architecture is shown below:

SignalR Trigger Architecture

For information on setup and configuration details, see the [overview](functions-bindings-signalr-service.md).

## Example

**Applies to: programming-language-csharp**



You can create a C# function by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. An isolated worker process is required to support C# functions running on long-term support (LTS) and non-LTS versions for .NET and the .NET Framework.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Azure Functions runtime.
* [C# script](functions-reference-csharp.md): Used primarily when you create C# functions in the Azure portal.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)

The following sample shows a C# function that receives a message event from clients and logs the message content.

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/SignalR/SignalRTriggerFunctions.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-signalr-service-trigger.md)

> **Important:**
> Class based model of SignalR Service bindings in C# isolated worker doesn't optimize how you write SignalR triggers due to the limitation of C# worker model. For more information about class based model, see [Class based model](../azure-signalr/signalr-concept-serverless-development-config.md#class-based-model).

# [In-process model](#tab/in-process)

SignalR Service trigger binding for C# in-process model has two programming models. Class based model and traditional model. Class based model provides a consistent SignalR server-side programming experience. Traditional model provides more flexibility and is similar to other function bindings.

### With class-based model

See [Class based model](../azure-signalr/signalr-concept-serverless-development-config.md#class-based-model) for details.

```cs
public class HubName1 : ServerlessHub
{
    [FunctionName("SignalRTest")]
    public Task SendMessage([SignalRTrigger]InvocationContext invocationContext, string message, ILogger logger)
    {
        logger.LogInformation($"Receive {message} from {invocationContext.ConnectionId}.");
    }
}
```

### With a traditional model

Traditional model obeys the convention of Azure Function developed by C#. If you're not familiar with it, you can learn from [documents](functions-dotnet-class-library.md).

```cs
[FunctionName("SignalRTest")]
public static Task Run([SignalRTrigger("SignalRTest", "messages", "SendMessage", parameterNames: new string[] {"message"})]InvocationContext invocationContext, string message, ILogger logger)
{
    logger.LogInformation($"Receive {message} from {invocationContext.ConnectionId}.");
}
```

Because it can be hard to use `ParameterNames` in the trigger, the following example shows you how to use the `SignalRParameter` attribute to define the `message` attribute.

```cs
[FunctionName("SignalRTest")]
public static Task Run([SignalRTrigger("SignalRTest", "messages", "SendMessage")]InvocationContext invocationContext, [SignalRParameter]string message, ILogger logger)
{
    logger.LogInformation($"Receive {message} from {invocationContext.ConnectionId}.");
}
```

---



**Applies to: programming-language-java**

SignalR trigger isn't currently supported for Java.


**Applies to: programming-language-python,programming-language-powershell**



Here's binding data in the *function.json* file:

```json
{
    "type": "signalRTrigger",
    "name": "invocation",
    "hubName": "hubName1",
    "category": "messages",
    "event": "SendMessage",
    "parameterNames": [
        "message"
    ],
    "direction": "in"
}
```


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

```javascript
app.generic("function1",
    {
        trigger: { "type": "signalRTrigger", "name": "invocation", "direction": "in", "hubName": "hubName1", "event": "SendMessage", "category": "messages" },
        handler: (triggerInput, context) => {
            context.log(`Receive ${triggerInput.Arguments[0]} from ${triggerInput.ConnectionId}.`)
        }
    })
```

# [Model v3](#tab/nodejs-v3)


Here's binding data in the *function.json* file:

```json
{
    "type": "signalRTrigger",
    "name": "invocation",
    "hubName": "hubName1",
    "category": "messages",
    "event": "SendMessage",
    "parameterNames": [
        "message"
    ],
    "direction": "in"
}
```

Here's the JavaScript code:

```javascript
module.exports = function (context, invocation) {
    context.log(`Receive ${context.bindingData.message} from ${invocation.ConnectionId}.`)
};
```

**Applies to: programming-language-powershell**


Complete PowerShell examples are pending.

**Applies to: programming-language-python**


Here's the Python code:

```python
import logging
import json
import azure.functions as func

def main(invocation) -> None:
    invocation_json = json.loads(invocation)
    logging.info("Receive {0} from {1}".format(invocation_json['Arguments'][0], invocation_json['ConnectionId']))
```


**Applies to: programming-language-csharp**


## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use the `SignalRTrigger` attribute to define the function. C# script instead uses a [function.json configuration file](#configuration).

# [Isolated worker model](#tab/isolated-process)

The following table explains the properties of the `SignalRTrigger` attribute.

| Attribute property | Description |
| --- | --- |
| **HubName** | This value must be set to the name of the SignalR hub for the function to be triggered. |
| **Category** | This value must be set as the category of messages for the function to be triggered. The category can be one of the following values: <ul><li>**connections**: Including *connected* and *disconnected* events</li><li>**messages**: Including all other events except those in *connections* category</li></ul> |
| **Event** | This value must be set as the event of messages for the function to be triggered. For *messages* category, event is the *target* in [invocation message](https://github.com/dotnet/aspnetcore/blob/master/src/SignalR/docs/specs/HubProtocol.md#invocation-message-encoding) that clients send. For *connections* category, only *connected* and *disconnected* is used. |
| **ParameterNames** | (Optional) A list of names that binds to the parameters. |
| **ConnectionStringSetting** | The name of the app setting or settings collection that contains the SignalR Service connection string, which defaults to `AzureSignalRConnectionString`. |

# [In-process model](#tab/in-process)

The following table explains the properties of the `SignalRTrigger` attribute.

| Attribute property | Description |
| --- | --- |
| **HubName** | This value must be set to the name of the SignalR hub for the function to be triggered. |
| **Category** | This value must be set as the category of messages for the function to be triggered. The category can be one of the following values: <ul><li>**connections**: Including *connected* and *disconnected* events</li><li>**messages**: Including all other events except those in *connections* category</li></ul> |
| **Event** | This value must be set as the event of messages for the function to be triggered. For *messages* category, event is the *target* in [invocation message](https://github.com/dotnet/aspnetcore/blob/master/src/SignalR/docs/specs/HubProtocol.md#invocation-message-encoding) that clients send. For *connections* category, only *connected* and *disconnected* is used. |
| **ParameterNames** | (Optional) A list of names that binds to the parameters. |
| **ConnectionStringSetting** | The name of the app setting or settings collection that contains the SignalR Service connection string, which defaults to `AzureSignalRConnectionString`. |

---


**Applies to: programming-language-java**


## Annotations

There isn't currently a supported Java annotation for a SignalR trigger.

**Applies to: programming-language-powershell,programming-language-python**


## Configuration

The following table explains the binding configuration properties that you set in the *function.json* file.

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `SignalRTrigger`. |
| **direction** | Must be set to `in`. |
| **name** | Variable name used in function code for trigger invocation context object. |
| **hubName** | This value must be set to the name of the SignalR hub for the function to be triggered. |
| **category** | This value must be set as the category of messages for the function to be triggered. The category can be one of the following values: <ul><li>**connections**: Including *connected* and *disconnected* events</li><li>**messages**: Including all other events except those in *connections* category</li></ul> |
| **event** | This value must be set as the event of messages for the function to be triggered. For *messages* category, event is the *target* in [invocation message](https://github.com/dotnet/aspnetcore/blob/master/src/SignalR/docs/specs/HubProtocol.md#invocation-message-encoding) that clients send. For *connections* category, only *connected* and *disconnected* is used. |
| **parameterNames** | (Optional) A list of names that binds to the parameters. |
| **connectionStringSetting** | The name of the app setting or settings collection that contains the SignalR Service connection string, which defaults to `AzureSignalRConnectionString`. |



See the [Example section](#example) for complete examples.

## Usage


### Connections

The `connectionStringSetting` property is set to a key in application settings that returns a value used by the Functions runtime to connect to the Azure SignalR Service instance used by the extension. The value of this connection property setting depends on the type of connection: 

+ **Managed identity connection**: The `connectionStringSetting` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to the service endpoint. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connectionStringSetting` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connectionStringSetting` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connectionStringSetting` property setting returns the actual SignalR service connection string. Because the connection string contains shared secret keys, you should consider using a managed identity connection, when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings). To obtain a connection string, follow the steps shown at [How to get connection strings](../azure-signalr/concept-connection-string.md#how-to-get-connection-strings).

The Functions host looks for a key or key prefix named `AzureSignalRConnectionString` when connecting to your SignalR service. Otherwise, it uses the key value set in  `connectionStringSetting` to obtain the required connection information.
  

### Payloads

The trigger input type is declared as either `InvocationContext` or a custom type. If you choose `InvocationContext`, you get full access to the request content. For a custom type, the runtime tries to parse the JSON request body to set the object properties.

### InvocationContext

`InvocationContext` contains all the content in the message sent from a SignalR service, which includes the following properties:

| Property | Description |
| --- | --- |
| Arguments | Available for *messages* category. Contains *arguments* in [invocation message](https://github.com/dotnet/aspnetcore/blob/master/src/SignalR/docs/specs/HubProtocol.md#invocation-message-encoding) |
| Error | Available for *disconnected* event. It can be Empty if the connection closed with no error, or it contains the error messages. |
| Hub | The hub name that the message belongs to. |
| Category | The category of the message. |
| Event | The event of the message. |
| ConnectionId | The connection ID of the client that sends the message. |
| UserId | The user identity of the client that sends the message. |
| Headers | The headers of the request. |
| Query | The query of the request when clients connect to the service. |
| Claims | The claims of the client. |

### Using `ParameterNames`

The property `ParameterNames` in `SignalRTrigger` lets you bind arguments of invocation messages to the parameters of functions. You can use the name you defined as part of [binding expressions](functions-bindings-expressions-patterns.md) in other binding or as parameters in your code. That gives you a more convenient way to access arguments of `InvocationContext`.

Say you have a JavaScript SignalR client trying to invoke method `broadcast` in Azure Function with two arguments `message1`, `message2`.

```javascript
await connection.invoke("broadcast", message1, message2);
```

After you set `parameterNames`, the names you defined correspond to the arguments sent on the client side.

```cs
[SignalRTrigger(parameterNames: new string[] {"arg1, arg2"})]
```

Then, the `arg1` contains the content of `message1`, and `arg2` contains the content of `message2`.

### `ParameterNames` considerations

For the parameter binding, the order matters. If you're using `ParameterNames`, the order in `ParameterNames` matches the order of the arguments you invoke in the client. If you're using attribute `[SignalRParameter]` in C#, the order of arguments in Azure Function methods matches the order of arguments in clients.

`ParameterNames` and attribute `[SignalRParameter]` **cannot** be used at the same time, or you'll get an exception.

### SignalR Service integration

SignalR Service needs a URL to access Function App when you're using SignalR Service trigger binding. The URL should be configured in **Upstream Settings** on the SignalR Service side.

Upstream Portal

When using SignalR Service trigger, the URL can be simple and formatted as follows:

```http
<Function_App_URL>/runtime/webhooks/signalr?code=<API_KEY>
```

The `Function_App_URL` can be found on Function App's Overview page and the `API_KEY` is generated by Azure Function. You can get the `API_KEY` from `signalr_extension` in the **App keys** blade of Function App.
API key

If you want to use more than one Function App together with one SignalR Service, upstream can also support complex routing rules. Find more details at [Upstream settings](../azure-signalr/concept-upstream.md).

### Step-by-step sample

You can follow the sample in GitHub to deploy a chat room on Function App with SignalR Service trigger binding and upstream feature: [Bidirectional chat room sample](https://github.com/aspnet/AzureSignalR-samples/tree/master/samples/BidirectionChat)

## Next steps

* [Azure Functions development and configuration with Azure SignalR Service](../azure-signalr/signalr-concept-serverless-development-config.md)
* [SignalR Service Trigger binding sample](https://github.com/aspnet/AzureSignalR-samples/tree/master/samples/BidirectionChat)
* [SignalR Service Trigger binding sample in isolated worker process](https://github.com/aspnet/AzureSignalR-samples/tree/master/samples/DotnetIsolated-BidirectionChat)
