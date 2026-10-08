---
title: Apache Kafka bindings for Azure Functions
description: Learn to integrate Azure Functions with an Apache Kafka stream.
ms.topic: reference
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
ms.date: 08/03/2026
zone_pivot_groups: programming-languages-set-functions-lang-workers
---

# Apache Kafka bindings for Azure Functions overview

The Kafka extension for Azure Functions enables you to write values to [Apache Kafka](https://kafka.apache.org/) topics by using an output binding. You can also use a trigger to invoke your functions in response to messages in Kafka topics. 


> **Important:**
> Kafka bindings are available for Functions on the [Flex Consumption plan](flex-consumption-plan.md), [Elastic Premium Plan](functions-premium-plan.md), and [Dedicated (App Service) plan](dedicated-plan.md). They are only supported on version 4.x of the Functions runtime.

| Action | Type |
| --- | --- |
| Run a function based on a new Kafka event. | [Trigger](functions-bindings-kafka-trigger.md) |
| Write to the Kafka event stream. | [Output binding](functions-bindings-kafka-output.md) |

**Applies to: programming-language-csharp**


## Install extension

The extension NuGet package you install depends on the C# mode you're using in your function app: 

# [Isolated worker model](#tab/isolated-process)

Functions run in an isolated C# worker process. To learn more, see [Guide for running C# Azure Functions in an isolated worker process](dotnet-isolated-process-guide.md).

Add the extension to your project by installing this [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Kafka).


# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Functions run in the same process as the Functions host. For more information, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md).

Add the extension to your project by installing this [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Kafka).


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



## Enable runtime scaling

To allow your functions to scale properly on the Premium plan when using Kafka triggers and bindings, you need to enable runtime scale monitoring. 


# [Azure portal](#tab/portal)

1. In the Azure portal, in your function app, select **Configuration**.
1. On the **Function runtime settings** tab, for **Runtime Scale Monitoring**, select **On**.

   Screenshot of the Azure portal area for enabling runtime scaling.

# [Azure CLI](#tab/azure-cli)

Use the following Azure CLI command to enable runtime scale monitoring:

```azurecli-interactive
az resource update -g <RESOURCE_GROUP> -n <FUNCTION_APP_NAME>/config/web --set properties.functionsRuntimeScaleMonitoringEnabled=1 --resource-type Microsoft.Web/sites
```

---



## host.json settings

This section describes the configuration settings available for this binding in versions 3.x and higher. Settings in the host.json file apply to all functions in a function app instance. For more information about function app configuration settings in versions 3.x and later versions, see the [host.json reference for Azure Functions](functions-host-json.md).

```json
{
    "version": "2.0",
    "extensions": {
        "kafka": {
            "maxBatchSize": 64,
            "SubscriberIntervalInSeconds": 1,
            "ExecutorChannelCapacity": 1,
            "ChannelFullRetryIntervalInMs": 50
        }
    }
}

```

| Property | Default | Type | Description |
| --- | --- | --- | --- |
| ChannelFullRetryIntervalInMs | 50 | Trigger | Defines the subscriber retry interval, in milliseconds, used when attempting to add items to an at-capacity channel. |
| ExecutorChannelCapacity | 1 | Both | Defines the channel message capacity. Once capacity is reached, the Kafka subscriber pauses until the function catches up. |
| MaxBatchSize | 64 | Trigger | The maximum number of messages collected in an internal batch before the messages are dispatched. This value is an upper limit, not a minimum batch size. |
| SubscriberIntervalInSeconds | 1 | Trigger | The maximum time, in seconds, that the trigger waits before dispatching a nonempty internal batch that hasn't reached `MaxBatchSize`. This setting doesn't define a minimum interval between individual function invocations. |

> **Note:**
> `MaxBatchSize` and `SubscriberIntervalInSeconds` control how the extension collects messages internally. They don't automatically enable batch delivery to your function. With single-message cardinality, messages from an internal batch are delivered as separate function invocations. To receive the messages in a single invocation, use an array parameter and configure batch delivery for your programming model, such as `IsBatched = true` or `cardinality` set to `MANY`. For examples, see [Apache Kafka trigger for Azure Functions](functions-bindings-kafka-trigger.md#example).

The following properties, which are inherited from the [Apache Kafka C/C++ client library](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md), are also supported in the `kafka` section of host.json, for either triggers or both output bindings and triggers:

| Property | Applies to | librdkafka equivalent |
| --- | --- | --- |
| AutoCommitIntervalMs | Trigger | `auto.commit.interval.ms` |
| AutoOffsetReset | Trigger | `auto.offset.reset` |
| FetchMaxBytes | Trigger | `fetch.max.bytes` |
| LibkafkaDebug | Both | `debug` |
| MaxPartitionFetchBytes | Trigger | `max.partition.fetch.bytes` |
| MaxPollIntervalMs | Trigger | `max.poll.interval.ms` |
| MetadataMaxAgeMs | Both | `metadata.max.age.ms` |
| QueuedMinMessages | Trigger | `queued.min.messages` |
| QueuedMaxMessagesKbytes | Trigger | `queued.max.messages.kbytes` |
| ReconnectBackoffMs | Trigger | `reconnect.backoff.max.ms` |
| ReconnectBackoffMaxMs | Trigger | `reconnect.backoff.max.ms` |
| SessionTimeoutMs | Trigger | `session.timeout.ms` |
| SocketKeepaliveEnable | Both | `socket.keepalive.enable` |
| StatisticsIntervalMs | Trigger | `statistics.interval.ms` |


## Next steps

- [Run a function from an Apache Kafka event stream](functions-bindings-kafka-trigger.md)
 
[extension bundle]: extension-bundles.md
