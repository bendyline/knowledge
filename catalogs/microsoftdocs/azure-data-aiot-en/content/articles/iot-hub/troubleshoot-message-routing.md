---
title: Troubleshoot Azure IoT message routing
description: How to perform troubleshooting for Azure IoT Hub message routing
author: sethmanheim

ms.author: sethm
ms.service: azure-iot-hub
ms.topic: troubleshooting
ms.date: 05/06/2020
---

# Troubleshooting message routing

This article provides monitoring and troubleshooting guidance for common issues and resolution for IoT Hub [message routing](iot-hub-devguide-messages-d2c.md).

## Monitoring message routing

We recommend you monitor [IoT Hub metrics related to message routing and endpoints](monitor-iot-hub-reference.md#routing-metrics) to give you an overview of the messages sent. You can also create a diagnostic setting to send operations for [**routes** in IoT Hub resource logs](monitor-iot-hub-reference.md#routes-category) to Azure Monitor Logs, Event Hubs, or Azure Storage for custom processing. To learn more about using metrics, resource logs, and diagnostic settings, see [Monitor IoT Hub](monitor-iot-hub.md). For a tutorial, see [Set up and use metrics and resource logs with an IoT hub](tutorial-use-metrics-and-diags.md).

We also recommend enabling the [fallback route](iot-hub-devguide-messages-d2c.md#fallback-route) if you want to maintain messages that don't match the query on any of the routes. These messages can be retained in the [built-in endpoint](iot-hub-devguide-messages-read-builtin.md) for the number of retention days configured.

## Top issues

The following are the most common issues observed with message routing. To start troubleshooting, select the issue for detailed steps.

* [Messages from my devices aren't being routed as expected](#messages-from-my-devices-are-not-being-routed-as-expected)
* [I suddenly stopped getting messages at the built-in Event Hubs endpoint](#i-suddenly-stopped-getting-messages-at-the-built-in-endpoint)

### Messages from my devices are not being routed as expected

To troubleshoot this issue, analyze the following information.

#### The routing metrics for this endpoint

All the [IoT Hub metrics related to routing](monitor-iot-hub-reference.md#routing-metrics) are prefixed with *Routing*. You can combine information from multiple metrics to identify root cause for issues. For example, use metric **Routing Deliveries** to identify the number of messages that were delivered to an endpoint or dropped when they didn't match queries on any of the routes and fallback route was disabled. Check the **Routing Latency** metric to observe whether latency for message delivery is steady or increasing. A growing latency can indicate a problem with a specific endpoint and we recommend checking [the health of the endpoint](#the-health-of-the-endpoint). These routing metrics also have [dimensions](monitor-iot-hub-reference.md#metric-dimensions) that provide details on the metric like the endpoint type, specific endpoint name, and a reason why the message wasn't delivered.

#### The resource logs for any operational issues

Observe the [**Routes** resource logs](monitor-iot-hub-reference.md#routes-category) to get more information on the routing and endpoint [operations](#operation-names) or identify errors and relevant [error code](#common-error-codes) to understand the issue further. For example, the operation name **RouteEvaluationError** in the log indicates the route couldn't be evaluated because of an issue with the message format. Use the tips provided for the specific [operation names](#operation-names) to mitigate the issue. When an event is logged as an error, the log also provides more information on why the evaluation failed. For example, if the operation name is **EndpointUnhealthy**, an [Error code](#common-error-codes) of 403004 indicates the endpoint ran out of space.

#### The health of the endpoint

Use the REST API [Get Endpoint Health](https://learn.microsoft.com/rest/api/iothub/iothubresource/getendpointhealth#iothubresource_getendpointhealth) to get health status of the endpoints. This API also provides information on the last time a message was successfully sent to the endpoint, the [last known error](#last-known-errors-for-iot-hub-routing-endpoints), last known error time, and the last time a send attempt was made for this endpoint. Use the possible mitigation provided for the specific [last known error](#last-known-errors-for-iot-hub-routing-endpoints).

### I suddenly stopped getting messages at the built-in endpoint

To troubleshoot this issue, analyze the following information.

#### Was a new route created?

Once a route is created, data stops flowing to the built-in-endpoint, unless a route is created to that endpoint. To ensure messages continues to flow to the built-in-endpoint if a new route is added, configure a route to the *events* endpoint. 

#### Was the Fallback route disabled?

The fallback route sends all the messages that don't satisfy any of the query conditions on any of the existing routes to the [built-in-Event Hubs](iot-hub-devguide-messages-read-builtin.md) (messages/events), that is compatible with [Event Hubs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/index.yml). If message routing is turned on, you can enable the fallback route capability. If there are no routes to the built-in endpoint and a fallback route is enabled, only messages that don't match any query conditions on routes are sent to the built-in-endpoint. Also, if all existing routes are deleted, the fallback route must be enabled to receive all data at the built-in-endpoint.

You can enable or disable the fallback route in the Azure portal by using the Message Routing blade for the IoT hub. You can also use the Azure Resource Manager for [FallbackRouteProperties](https://learn.microsoft.com/rest/api/iothub/iothubresource/createorupdate#fallbackrouteproperties) to use a custom endpoint for a fallback route.

## Last known errors for IoT Hub routing endpoints

<a id="last-known-errors"></a>  <!-- why are we using anchors? robin -->
[Get Endpoint Health](https://learn.microsoft.com/rest/api/iothub/iothubresource/getendpointhealth#iothubresource_getendpointhealth) in the REST API gives the health status of the endpoints and the last known error, to identify the reason an endpoint isn't healthy. This table lists the most common errors.

| Last Known Error | Description/when it occurs | Possible Mitigation |
| --- | --- | --- |
| Transient | A transient error occurred and IoT Hub will retry the operation. | Observe [routes resource logs](monitor-iot-hub-reference.md#routes-category). |
| InternalError | An error occurred while delivering a message to an endpoint. | This error is an internal exception but also observe the [routes resource logs](monitor-iot-hub-reference.md#routes-category). |
| Unauthorized | IoT Hub isn't authorized to send messages to the specified endpoint. | Validate that the connection string is up to date for the endpoint. If it changed, consider an update on your IoT Hub. If the endpoint uses managed identity, check that the IoT Hub principal has the required permissions on the target. |
| Throttled | IoT Hub is being throttled while writing messages into the endpoint. | Review the throttle limits for the affected endpoint. Modify configurations for the endpoint to scale up if needed. |
| Timeout | Operation timeout. | Retry the operation. |
| Not Found | Target resource doesn't exist. | Ensure that the target resource exists. |
| Container Not Found | Storage container doesn't exist. | Ensure the storage container exists. |
| Container disabled | Storage container is disabled. | Ensure the storage container is enabled. |
| MaxMessageSizeExceeded | Message routing has a message size limit of 256 Kb. The message size being routed exceeded this limit. | Check if message size can be reduced by using fewer application properties or fewer message enrichments. |
| PartitioningAndDuplicateDetectionNotSupported | Service bus might not have duplicate detection enabled. | Disable duplicate detection from Service Bus or consider using an entity without duplicate detection. |
| SessionfulEntityNotSupported | Service bus might not have sessions enabled. | Disable session from Service Bus or consider using an entity without sessions. |
| NoMatchingSubscriptionsForMessage | There's no subscription to write message on the service bus topic. | Create a subscription for IoT Hub messages to be routed to. |
| EndpointExternallyDisabled | Endpoint isn't in an active state so IoT Hub can send messages to it. | Enable the endpoint to bring it back to active state. |
| DeviceMaximumQueueDepthExceeded | Service bus size limit has been reached. | Consider removing messages from the target Event Hubs to allow new messages to be ingested into the Event Hubs. |

## Routes resource logs

The following are the operation names and error codes logged in the [routes resource logs](monitor-iot-hub-reference.md#routes-category).

<a id="diagnostics-operation-names"></a>
### Operation Names


<!-- operation names for the diag logs for IoT Hub -->

| Operation Name | Level | Description |
| --- | --- | --- |
| UndefinedRouteEvaluation | Information | The message cannot be evaluated with a giving condition. For example, if a property in the route query condition is absent in the message. Learn more about [routing query syntax](iot-hub-devguide-routing-query-syntax.md). |
| RouteEvaluationError | Error | There was an error evaluating the message because of an issue with the message format. For example, this error will be logged if the content encoding not specified or Content type not valid in the message. These must be set in the [system properties](iot-hub-devguide-routing-query-syntax.md#system-properties). |
| DroppedMessage | Error | Message was dropped and not routed. This could be due to reasons like message didn't match any routing query or endpoint was dead and message could not be delivered after several retries. We recommend getting more details on the endpoint by using the REST API [get endpoint health](https://learn.microsoft.com/rest/api/iothub/iothubresource/getendpointhealth#iothubresource_getendpointhealth). |
| EndpointUnhealthy | Error | Endpoint has not been accepting messages from IoT Hub and IoT Hub is trying to resend the messages. We recommend observing the last known error via the REST API [get endpoint health](https://learn.microsoft.com/rest/api/iothub/iothubresource/getendpointhealth#iothubresource_getendpointhealth). |
| EndpointDead | Error | Endpoint has not been accepting messages from IoT Hub for over an hour. We recommend observing the last known error via the REST API [get endpoint health](https://learn.microsoft.com/rest/api/iothub/iothubresource/getendpointhealth#iothubresource_getendpointhealth). |
| EndpointHealthy | Information | Endpoint is healthy and receiving messages from IoT Hub. This message is not logged continuously, but logged only when the endpoint becomes healthy again. This message means IoT Hub was unable to send messages to the endpoint, but the endpoint is now healthy. |
| OrphanedMessage | Information | The message does not match to any route. |
| InvalidMessage | Error | Message is invalid because of incompatibility with the endpoint. We recommend check configurations of the endpoint. |


The operations *UndefinedRouteEvaluation*, *RouteEvaluationError* and *OrphanedMessage* are throttled and logged no more than once a minute per IoT Hub.

<a id="diagnostics-error-codes"></a>
### Common error codes


<!-- Error codes output by the diagnostic logs (2.2.1.1.5)-->


| Error Code | Description |
| --- | --- |
| 401002 | IoT Hub Unauthorized Access |
| 413001 | Message too large |
| 403004 | Device maximum queue depth exceeded |
| 503008 | Receive link throttled |
| 500000 | Generic Server error |
| 401 | Unauthorized |
| 503 | Service Unavailable |
| 500001 | Server Error |
| 400103 | Invalid Content Encoding Or Content Type |
| 404001 | Device Not found |

## Next steps

If you need more help, you can contact the Azure experts on the [Microsoft Q&A and Stack Overflow forums](https://azure.microsoft.com/support/forums/). Alternatively, you can file an Azure support incident. Go to the [Azure support site](https://azure.microsoft.com/support/options/) and select **Get Support**.
