---
title: Azure IoT Hub device and service SDKs
description: Links to the Azure IoT Hub SDKs that you can use to build device apps and back-end apps.
author: sethmanheim

ms.author: sethm
ms.service: azure-iot-hub
ms.topic: concept-article
ms.date: 09/22/2026
ms.custom: [mqtt, 'Role: IoT Device', 'Role: Cloud Development']
---

# Azure IoT Hub SDKs

IoT Hub provides three categories of software development kits (SDKs) to help you build device and back-end applications:

* [**IoT Hub device SDKs**](#azure-iot-hub-device-sdks) enable you to build applications that run on your IoT devices using the device client or module client. These apps send telemetry to your IoT hub, and can also receive messages, jobs, methods, or twin updates from your IoT hub. You can use these SDKs to build device apps that use [Azure IoT Plug and Play](https://learn.microsoft.com/previous-versions/azure/iot/overview-iot-plug-and-play) conventions and models to advertise their capabilities to IoT Plug and Play-enabled applications. You can also use the module client to author modules for [Azure IoT Edge](../iot-edge/about-iot-edge.md).

* [**IoT Hub service SDKs**](#azure-iot-hub-service-sdks) enable you to build backend applications to manage your IoT hub, and can also send messages, schedule jobs, invoke direct methods, or send desired property updates to your IoT devices or modules.

* [**IoT Hub management SDKs**](#azure-iot-hub-management-sdks) help you build backend applications that manage the IoT hubs in your Azure subscription.

Microsoft also provides a set of SDKs for provisioning devices through and building backend services for the Device Provisioning Service. To learn more, see [Microsoft SDKs for IoT Hub Device Provisioning Service](../iot-dps/libraries-sdks.md).

Learn about the [benefits of developing using Azure IoT SDKs](https://azure.microsoft.com/blog/benefits-of-using-the-azure-iot-sdks-in-your-azure-iot-solution/).

To learn about the forward-looking, unified developer experience that spans IoT Hub and related services, see [Unified Azure IoT SDKs (preview) for IoT Hub and Azure Device Registry](../iot/device-registry/concept-unified-iot-sdks.md).


> **Note:**
> Some of the features mentioned in this article, like cloud-to-device messaging, device twins, and device management, are only available in the standard tier of IoT Hub. For more information about the basic and standard/free IoT Hub tiers, see [Choose the right IoT Hub tier and size for your solution](https://learn.microsoft.com/azure/iot-hub/iot-hub-scaling).

## Azure IoT Hub device SDKs


The Microsoft Azure IoT device SDKs contain code that facilitates building applications that connect to and are managed by Azure IoT Hub services. These SDKs can run on a general MPU-based computing device such as a PC, tablet, smartphone, or Raspberry Pi. The SDKs support development in C and in modern managed languages including in C#, Node.js, Python, and Java.

The SDKs are available in **multiple languages** providing the flexibility to choose which best suits your team and scenario.

| Language | Package | Source | Quickstarts | Samples | Reference |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **.NET** | [NuGet](https://www.nuget.org/packages/Microsoft.Azure.Devices.Client) | [GitHub](https://github.com/Azure/azure-iot-sdk-csharp) | [Connect to IoT Hub](https://learn.microsoft.com/azure/iot/tutorial-send-telemetry-iot-hub?pivots=programming-language-csharp) | [Samples](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples) | [Reference](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client) |
| **Python** | [pip](https://pypi.org/project/azure-iot-device/) | [GitHub](https://github.com/Azure/azure-iot-sdk-python) | [Connect to IoT Hub](https://learn.microsoft.com/azure/iot/tutorial-send-telemetry-iot-hub?pivots=programming-language-python) | [Samples](https://github.com/Azure/azure-iot-sdk-python/tree/main/samples) | [Reference](https://learn.microsoft.com/python/api/azure-iot-device) |
| **Node.js** | [npm](https://www.npmjs.com/package/azure-iot-device)  | [GitHub](https://github.com/Azure/azure-iot-sdk-node) | [Connect to IoT Hub](https://learn.microsoft.com/azure/iot/tutorial-send-telemetry-iot-hub?pivots=programming-language-nodejs) | [Samples](https://github.com/Azure/azure-iot-sdk-node/tree/main/device/samples) | [Reference](https://learn.microsoft.com/javascript/api/azure-iot-device/) |
| **Java** | [Maven](https://mvnrepository.com/artifact/com.microsoft.azure.sdk.iot/iot-device-client) | [GitHub](https://github.com/Azure/azure-iot-sdk-java) | [Connect to IoT Hub](https://learn.microsoft.com/azure/iot/tutorial-send-telemetry-iot-hub?pivots=programming-language-java) | [Samples](https://github.com/Azure/azure-iot-sdk-java/tree/main/iothub/device/iot-device-samples) | [Reference](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device) |
| **C** | [packages](https://github.com/Azure/azure-iot-sdk-c/blob/main/readme.md#getting-the-sdk) | [GitHub](https://github.com/Azure/azure-iot-sdk-c) | [Connect to IoT Hub](https://learn.microsoft.com/azure/iot/tutorial-send-telemetry-iot-hub?pivots=programming-language-ansi-c) | [Samples](https://github.com/Azure/azure-iot-sdk-c/tree/main/iothub_client/samples) | [Reference](https://azure.github.io/azure-iot-sdk-c/files.html) |

The Java device SDK includes [samples for Android](https://github.com/Azure/azure-iot-sdk-java/blob/main/doc/java-devbox-setup.md#building-for-android-device).

The C device SDK includes [samples for iOS that use CocoaPods](https://github.com/Azure/azure-iot-sdk-c/blob/main/iothub_client/samples/ios/CocoaPods-Samples.md).

> **Warning:**
> The **Azure IoT C SDK** isn't suitable for embedded applications due to its memory management and threading model. For embedded device SDK options, see the embedded device SDKs.


Learn more about the IoT Hub device SDKs in the [IoT device development documentation](iot-sdks.md).

### Embedded device SDKs


These SDKs were designed and created to run on devices with limited compute and memory resources and are implemented using the C language.

The embedded device SDKs are available for **multiple operating systems** providing the flexibility to choose which best suits your scenario.

| RTOS | SDK | Source | Samples | Reference |
| :--- | :--- | :--- | :--- | :--- |
| **Eclipse ThreadX** | Azure RTOS Middleware | [GitHub](https://github.com/eclipse-threadx/netxduo) | [Quickstarts](https://learn.microsoft.com/azure/iot/tutorial-devkit-mxchip-az3166-iot-hub) | [Reference](https://github.com/eclipse-threadx/netxduo/tree/master/addons/azure_iot) |
| **FreeRTOS** | FreeRTOS Middleware | [GitHub](https://github.com/Azure/azure-iot-middleware-freertos) | [Samples](https://github.com/Azure-Samples/iot-middleware-freertos-samples) | [Reference](https://azure.github.io/azure-iot-middleware-freertos) |
| **Bare Metal** | Azure SDK for Embedded C | [GitHub](https://github.com/Azure/azure-sdk-for-c) | [Samples](https://github.com/Azure/azure-sdk-for-c/blob/master/sdk/samples/iot/README.md) | [Reference](https://azure.github.io/azure-sdk/#embedded-c) |


## Azure IoT Hub service SDKs


The Azure IoT service SDKs contain code to facilitate building applications that interact directly with IoT Hub to manage devices and security.

| Platform | Package | Code Repository | Samples | Reference |
| --- | --- | --- | --- | --- |
| .NET | [NuGet](https://www.nuget.org/packages/Microsoft.Azure.Devices) | [GitHub](https://github.com/Azure/azure-iot-sdk-csharp) | [Samples](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/service/samples) | [Reference](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices) |
| Java | [Maven](https://mvnrepository.com/artifact/com.microsoft.azure.sdk.iot/iot-service-client) | [GitHub](https://github.com/Azure/azure-iot-service-sdk-java) | [Samples](https://github.com/Azure/azure-iot-service-sdk-java/tree/main/service/iot-service-samples) | [Reference](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service) |
| Node | [npm](https://www.npmjs.com/package/azure-iothub) | [GitHub](https://github.com/Azure/azure-iot-hub-node) | [Samples](https://github.com/Azure/azure-iot-hub-node/tree/main/samples) | [Reference](https://learn.microsoft.com/javascript/api/azure-iothub/) |
| Python | [pip](https://pypi.org/project/azure-iot-hub) | [GitHub](https://github.com/Azure/azure-iot-hub-python) | [Samples](https://github.com/Azure/azure-iot-hub-python/tree/main/samples) | [Reference](https://learn.microsoft.com/python/api/azure-iot-hub) |


## Azure IoT Hub management SDKs


The IoT Hub management SDKs help you build backend applications that manage the IoT hubs in your Azure subscription.

| Platform | Package | Code repository | Reference |
| --- | --- | --- | --- |
| .NET | [NuGet](https://www.nuget.org/packages/Azure.ResourceManager.IotHub/) | [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/iothub) | [Reference](https://learn.microsoft.com/dotnet/api/microsoft.azure.management.iothub) |
| Java | [Maven](https://mvnrepository.com/artifact/com.azure.resourcemanager/azure-resourcemanager-iothub) | [GitHub](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/iothub/azure-resourcemanager-iothub) | [Reference](https://learn.microsoft.com/java/api/overview/azure/resourcemanager-iothub-readme) |
| Node.js | [npm](https://www.npmjs.com/package/@azure/arm-iothub) | [GitHub](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iothub/arm-iothub) | [Reference](https://learn.microsoft.com/javascript/api/overview/azure/arm-iothub-readme) |
| Python | [pip](https://pypi.org/project/azure-mgmt-iothub/) | [GitHub](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/iothub/azure-mgmt-iothub) | [Reference](https://learn.microsoft.com/python/api/azure-mgmt-iothub) |


## SDKs for related Azure IoT services

Azure IoT SDKs are also available for the following services:

* [SDKs for IoT Hub Device Provisioning Service](../iot-dps/libraries-sdks.md): To help you provision devices through and build backend services for the Device Provisioning Service.

* [SDKs for Device Update for IoT Hub](../iot-hub-device-update/understand-device-update.md): To help you deploy over-the-air (OTA) updates for IoT devices.

## Next steps

Learn about [IoT asset and device development](concepts-manage-device-reconnections.md).
