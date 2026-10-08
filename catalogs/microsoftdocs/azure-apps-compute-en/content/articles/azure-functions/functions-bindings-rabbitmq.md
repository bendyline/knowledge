---
title: Azure RabbitMQ bindings for Azure Functions
description: Learn to send Azure RabbitMQ triggers and bindings in Azure Functions.
ms.topic: reference
ms.date: 08/20/2025
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: programming-languages-set-functions-lang-workers
---


# RabbitMQ bindings for Azure Functions overview

Azure Functions integrates with [RabbitMQ](https://www.rabbitmq.com/) via [triggers and bindings](functions-triggers-bindings.md). 

> **Note:**
> The RabbitMQ bindings are only fully supported on [Elastic Premium](functions-premium-plan.md) and [Dedicated (App Service)](dedicated-plan.md) plans. [Flex Consumption](flex-consumption-plan.md) and [Consumption](consumption-plan.md) plans aren't yet supported.
>
> RabbitMQ bindings aren't supported by the Azure Functions v1.x runtime.

The Azure Functions RabbitMQ extension allows you to send and receive messages using the RabbitMQ API with Functions.

| Action | Type |
| --- | --- |
| Run a function when a RabbitMQ message comes through the queue | [Trigger](functions-bindings-rabbitmq-trigger.md) |
| Send RabbitMQ messages | [Output binding](functions-bindings-rabbitmq-output.md) |

## Prerequisites

Before working with the RabbitMQ extension, you must [set up your RabbitMQ endpoint](https://github.com/Azure/azure-functions-rabbitmq-extension/wiki/Setting-up-a-RabbitMQ-Endpoint). To learn more about RabbitMQ, see the [getting started page](https://www.rabbitmq.com/getstarted.html).

**Applies to: programming-language-csharp**


## Install extension

The extension NuGet package you install depends on the C# mode you're using in your function app: 

# [Isolated worker model](#tab/isolated-process)

Functions execute in an isolated C# worker process. To learn more, see [Guide for running C# Azure Functions in an isolated worker process](dotnet-isolated-process-guide.md).

Add the extension to your project by installing this [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Rabbitmq).

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Functions execute in the same process as the Functions host. To learn more, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md).

Add the extension to your project by installing this [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.RabbitMQ).

---


**Applies to: programming-language-javascript,programming-language-python,programming-language-java,programming-language-powershell**

 
## Install bundle

To be able to use this binding extension in your app, make sure that the *host.json* file in the root of your project contains this `extensionBundle` reference:


```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[4.0.0, 5.0.0)"
    }
}
```

In this example, the `version` value of `[4.0.0, 5.0.0)` instructs the Functions host to use a bundle version that is at least `4.0.0` but less than `5.0.0`, which includes all potential versions of 4.x. This notation effectively maintains your app on the latest available minor version of the v4.x extension bundle. 

When possible, you should use the latest extension bundle major version and allow the runtime to automatically maintain the latest minor version. You can view the contents of the latest bundle on the [extension bundles release page](https://github.com/Azure/azure-functions-extension-bundles/releases/latest). For more information, see [Azure Functions extension bundles](extension-bundles.md).


## host.json settings


This section describes the configuration settings available for this binding in version 2.x and later. Settings in the host.json file apply to all functions in a function app instance. For more information about function app configuration settings, see [host.json reference for Azure Functions](functions-host-json.md).

```json
{
    "version": "2.0",
    "extensions": {
        "rabbitMQ": {
            "prefetchCount": 100,
            "queueName": "queue",
            "connectionString": "%<MyConnectionAppSetting>%",
            "port": 10
        }
    }
}
```

| Property | Default | Description |
| --- | --- | --- |
| `prefetchCount` | 30 | Gets or sets the number of messages that the message receiver can simultaneously request and is cached. |
| `queueName` | n/a | Name of the queue to receive messages from. |
| `connectionString` | n/a | The app setting that contains the RabbitMQ message queue connection string. |
| `port` | 0 | (ignored if using connectionString) Gets or sets the Port used. Defaults to 0, which points to rabbitmq client's default port setting: 5672. |

## Related articles

- [Run a function when a RabbitMQ message is created (Trigger)](functions-bindings-rabbitmq-trigger.md)
- [Send RabbitMQ messages from Azure Functions (Output binding)](functions-bindings-rabbitmq-output.md)
