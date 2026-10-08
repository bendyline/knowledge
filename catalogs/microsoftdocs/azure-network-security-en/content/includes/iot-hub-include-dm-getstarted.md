---
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.topic: include
ms.date: 01/30/2023
---

Back-end apps can use Azure IoT Hub primitives, such as [device twins](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-devguide-device-twins.md) and [direct methods](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-devguide-direct-methods.md), to remotely start and monitor device management actions on devices. This article shows you how a back-end app and a device app can work together to initiate and monitor a remote device reboot using IoT Hub.

>**Note:**
>The features described in this article are available only in the standard tier of IoT Hub. For more information about the basic and standard/free IoT Hub tiers, see [Choose the right IoT Hub tier and size for your solution](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-scaling.md).


Use a direct method to initiate device management actions (such as reboot, factory reset, and firmware update) from a back-end app in the cloud. The device is responsible for:

* Handling the method request sent from IoT Hub.

* Initiating the corresponding device-specific action on the device.

* Providing status updates through *reported properties* to IoT Hub.

You can use a back-end app in the cloud to run device twin queries to report on the progress of your device management actions.
