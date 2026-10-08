---
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.topic: include
ms.date: 02/17/2023
---
> 
> * [.NET](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/device-twins-dotnet.md)
> * [Python](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/device-twins-python.md)
> * [Node.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/device-twins-node.md)
> * [Java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/device-twins-java.md)

Device twins are JSON documents that store device state information, including metadata, configurations, and conditions. IoT Hub persists a device twin for each device that connects to it.

>**Note:**
>The features described in this article are available only in the standard tier of IoT Hub. For more information about the basic and standard/free IoT Hub tiers, see [Choose the right IoT Hub tier and size for your solution](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-scaling.md).


Use device twins to:

* Store device metadata from your solution back end.

* Report current state information such as available capabilities and conditions, for example, the connectivity method used, from your device app.

* Synchronize the state of long-running workflows, such as firmware and configuration updates, between a device app and a back-end app.

* Query your device metadata, configuration, or state.

Device twins are designed for synchronization and for querying device configurations and conditions. For more information about device twins, including when to use device twins, see [Understand device twins](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-devguide-device-twins.md).

IoT hubs store device twins, which contain the following elements:

* **Tags**. Device metadata accessible only by the solution back end.

* **Desired properties**. JSON objects modifiable by the solution back end and observable by the device app.

* **Reported properties**. JSON objects modifiable by the device app and readable by the solution back end.

Tags and properties can't contain arrays, but can contain nested objects.

The following illustration shows device twin organization:

Screenshot of a device twin concept diagram.

Additionally, the solution back end can query device twins based on all the above data.
For more information about device twins, see [Understand device twins](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-devguide-device-twins.md). For more information about querying, see [IoT Hub query language](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-devguide-query-language.md).
