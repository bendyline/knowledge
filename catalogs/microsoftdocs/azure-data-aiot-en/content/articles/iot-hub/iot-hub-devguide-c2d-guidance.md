---
title: Azure IoT Hub cloud-to-device options
description: This article provides guidance on when to use direct methods, device twin's desired properties, or cloud-to-device messages for cloud-to-device communications. 
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.topic: concept-article
ms.date: 05/22/2025
ms.custom:  [amqp, mqtt, 'Role: Cloud Development', 'Role: IoT Device']
---

# Cloud-to-device communications guidance

This article helps you choose the appropriate cloud-to-device communication option in Azure IoT Hub based on your scenario requirements. IoT Hub supports three primary options for cloud-to-device communication: direct methods, device twin's desired properties, and cloud-to-device messages.

## Ways to communicate from cloud to device

IoT Hub provides three options for device apps to expose functionality to a back-end app:

* [Direct methods](iot-hub-devguide-direct-methods.md) for communications that require immediate confirmation of the result. Direct methods are often used for interactive control of devices such as turning on a fan.

* [Device twin's desired properties](iot-hub-devguide-device-twins.md) for long-running commands intended to put the device into a certain desired state. For example, set the telemetry send interval to 30 minutes.

* [Cloud-to-device messages](iot-hub-devguide-messages-c2d.md) for one-way notifications to the device app.

To learn how [Azure IoT Plug and Play](https://learn.microsoft.com/previous-versions/azure/iot/overview-iot-plug-and-play) uses these options to control IoT Plug and Play devices, see [IoT Plug and Play service developer guide](https://learn.microsoft.com/previous-versions/azure/iot/concepts-developer-guide-service).

>**Note:**
>The features described in this article are available only in the standard tier of IoT Hub. For more information about the basic and standard/free IoT Hub tiers, see [Choose the right IoT Hub tier and size for your solution](iot-hub-scaling.md).


## Comparison of cloud-to-device communication options

The following table compares the various cloud-to-device communication options in IoT Hub based on common factors.

| Factor | Direct methods | Device twin's desired properties | Cloud-to-device messages |
| --- | --- | --- | --- |
| Scenario | Commands that require immediate confirmation, such as turning on a fan. | Long-running commands intended to put the device into a certain desired state. For example, set the telemetry send interval to 30 minutes. | One-way notifications to the device app. |
| Data flow | Two-way. The device app can respond to the method right away. The solution back end receives the outcome contextually to the request. | One-way. The device app receives a notification with the property change. | One-way. The device app receives the message. |
| Durability | Disconnected devices aren't contacted. The solution back end is notified that the device isn't connected. | Property values are preserved in the device twin. Device will read it at next reconnection. Property values are retrievable with the [IoT Hub query language](iot-hub-devguide-query-language.md). | IoT Hub can retain messages for up to 48 hours. |
| Targets | Single device using **deviceId**, or multiple devices using [jobs](iot-hub-devguide-jobs.md). | Single device using **deviceId**, or multiple devices using [jobs](iot-hub-devguide-jobs.md). | Single device by **deviceId**. |
| Size | Maximum direct method payload size is 128 KB for the request and 128 KB for the response. | Maximum desired properties size is 32 KB. | Up to 64-KB messages. |
| Frequency | High. For more information, see [IoT Hub quotas and throttling](iot-hub-devguide-quotas-throttling.md). | Medium. For more information, see [IoT Hub quotas and throttling](iot-hub-devguide-quotas-throttling.md). | Low. For more information, see [IoT Hub quotas and throttling](iot-hub-devguide-quotas-throttling.md). |
| Protocol | Available using MQTT or AMQP. | Available using MQTT or AMQP. | Available on all protocols. Device must poll when using HTTPS. |

Learn how to use direct methods, desired properties, and cloud-to-device messages in the following tutorials:

* [Control a device connected to an IoT hub](quickstart-control-device.md)
* [Configure your devices from a back-end service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/tutorial-device-twins.md) 
* [Send and receive cloud-to-device messages](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/c2d-messaging-node.md)
