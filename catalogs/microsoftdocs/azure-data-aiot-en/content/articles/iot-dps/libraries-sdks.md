---
title: IoT Hub Device Provisioning Service libraries and SDKs
description: Information about the device and service libraries available for developing solutions with Device Provisioning Service (CPS).
author: sethmanheim
ms.author: sethm
ms.date: 04/01/2026
ms.topic: reference
ms.service: azure-iot-hub
services: iot-dps
ms.custom: mvc
ms.subservice: azure-iot-hub-dps
ai-usage: ai-assisted
---

# Microsoft SDKs for IoT Hub Device Provisioning Service

The Microsoft SDKs for IoT Hub Device Provisioning Service (DPS) help you build device and backend applications that provision IoT devices to one or more IoT hubs. The SDKs handle the underlying transport and security protocols between your devices or backend apps and DPS, freeing you to focus on application development. By using the SDKs, you get support for future updates to DPS, including security updates. This article describes the three categories of SDKs, lists the DPS SDKs published in popular languages, and provides links to SDK references, samples, and quickstarts.

## SDK categories

Three categories of software development kits (SDKs) work with DPS:

- [DPS device SDKs](#device-sdks) provide data plane operations for devices. Use the device SDK to provision a device through DPS.

- [DPS service SDKs](#service-sdks) provide data plane operations for backend apps. Use the service SDKs to create and manage individual enrollments and enrollment groups, and to query and manage device registration records.

- [DPS management SDKs](#management-sdks) provide control plane operations for backend apps. Use the management SDKs to create and manage DPS instances and metadata. For example, use them to create and manage DPS instances in your subscription, to upload and verify certificates with a DPS instance, or to create and manage authorization policies or allocation policies in a DPS instance.

The DPS SDKs help to provision devices to your IoT hubs. Microsoft also provides a set of SDKs to help you build device apps and backend apps that communicate directly with Azure IoT Hub. For example, to help your provisioned devices send telemetry to your IoT hub, and, optionally, to receive messages and job, method, or twin updates from your IoT hub. To learn more, see [Azure IoT Hub SDKs](../iot-hub/iot-hub-devguide-sdks.md).

## Device SDKs

The DPS device SDKs enable your devices to register with DPS and receive their IoT hub assignment. Use the device SDKs to implement device-side provisioning with symmetric key, X.509 certificate, or TPM attestation. Platform device SDKs are available for devices that run a full operating system, and embedded device SDKs are available for resource-constrained and microcontroller-based devices.

### Platform device SDKs


The DPS device SDKs provide implementations of the [Register](https://learn.microsoft.com/rest/api/iot-dps/data-plane/runtime-registration/register-device) API and others that devices call to provision through DPS. The device SDKs can run on general MPU-based computing devices such as a PC, tablet, smartphone, or Raspberry Pi. The SDKs support development in C and in modern managed languages including in C#, Node.js, Python, and Java.

The following table lists the device SDKs available for each supported language.

| Platform | Package | Code repository | Samples | Quickstart | Reference |
| --- | --- | --- | --- | --- | --- |
| .NET | [NuGet](https://www.nuget.org/packages/Microsoft.Azure.Devices.Provisioning.Client/) | [GitHub](https://github.com/Azure/azure-iot-sdk-csharp/) | [Samples](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/provisioning/device/samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-create-simulated-device-x509?pivots=programming-language-csharp\&tabs=windows) | [Reference](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.provisioning.client) |
| C | [apt-get, MBED, Arduino IDE or iOS](https://github.com/Azure/azure-iot-sdk-c/blob/master/readme.md#packages-and-libraries) | [GitHub](https://github.com/Azure/azure-iot-sdk-c/blob/master/provisioning\_client) | [Samples](https://github.com/Azure/azure-iot-sdk-c/tree/main/provisioning_client/samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-create-simulated-device-x509?pivots=programming-language-ansi-c\&tabs=windows) | [Reference](https://github.com/Azure/azure-iot-sdk-c/) |
| Java | [Maven](https://mvnrepository.com/artifact/com.microsoft.azure.sdk.iot.provisioning/provisioning-device-client) | [GitHub](https://github.com/Azure/azure-iot-sdk-java/blob/main/provisioning) | [Samples](https://github.com/Azure/azure-iot-sdk-java/tree/main/provisioning/provisioning-device-client-samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-create-simulated-device-x509?pivots=programming-language-java\&tabs=windows) | [Reference](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.provisioning.device) |
| Node.js | [npm](https://www.npmjs.com/package/azure-iot-provisioning-device) | [GitHub](https://github.com/Azure/azure-iot-sdk-node/tree/main/provisioning) | [Samples](https://github.com/Azure/azure-iot-sdk-node/tree/main/provisioning/device/samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-create-simulated-device-x509?pivots=programming-language-nodejs\&tabs=windows) | [Reference](https://learn.microsoft.com/javascript/api/azure-iot-provisioning-device) |
| Python | [pip](https://pypi.org/project/azure-iot-device/) | [GitHub](https://github.com/Azure/azure-iot-sdk-python) | [Samples](https://github.com/Azure/azure-iot-sdk-python/tree/main/samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-create-simulated-device-x509?pivots=programming-language-python\&tabs=windows) | [Reference](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.provisioningdeviceclient) |

> **Warning:**
> The **C SDK** listed above is **not** suitable for embedded applications due to its memory management and threading model. For embedded devices, refer to the [Embedded device SDKs](#embedded-device-sdks).


### Embedded device SDKs


These SDKs were designed and created to run on devices with limited compute and memory resources and are implemented using the C language.

| RTOS | SDK | Source | Samples | Reference |
| :--- | :--- | :--- | :--- | :--- |
| **Eclipse ThreadX** | Azure RTOS Middleware | [GitHub](https://github.com/eclipse-threadx/netxduo) | [Quickstarts](https://learn.microsoft.com/azure/iot/tutorial-devkit-mxchip-az3166-iot-hub) | [Reference](https://github.com/eclipse-threadx/netxduo/tree/master/addons/azure_iot) |
| **FreeRTOS** | FreeRTOS Middleware | [GitHub](https://github.com/Azure/azure-iot-middleware-freertos) | [Samples](https://github.com/Azure-Samples/iot-middleware-freertos-samples) | [Reference](https://azure.github.io/azure-iot-middleware-freertos) |
| **Bare Metal** | Azure SDK for Embedded C | [GitHub](https://github.com/Azure/azure-sdk-for-c/tree/master/sdk/docs/iot) | [Samples](https://github.com/Azure/azure-sdk-for-c/blob/master/sdk/samples/iot/README.md) | [Reference](https://azure.github.io/azure-sdk/#embedded-c) |

Learn more about the device and embedded device SDKs in [IoT SDKs](https://learn.microsoft.com/azure/iot-hub/iot-sdks).


## Service SDKs


The DPS service SDKs help you build backend applications to manage enrollments and registration records in DPS instances.

| Platform | Package | Code repository | Samples | Quickstart | Reference |
| --- | --- | --- | --- | --- | --- |
| .NET | [NuGet](https://www.nuget.org/packages/Microsoft.Azure.Devices.Provisioning.Service/) | [GitHub](https://github.com/Azure/azure-iot-sdk-csharp/) | [Samples](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/provisioning/service/samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-enroll-device-tpm?pivots=programming-language-csharp\&tabs=symmetrickey) | [Reference](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.provisioning.service) |
| Java | [Maven](https://mvnrepository.com/artifact/com.microsoft.azure.sdk.iot.provisioning/provisioning-service-client) | [GitHub](https://github.com/Azure/azure-iot-sdk-java/blob/main/provisioning) | [Samples](https://github.com/Azure/azure-iot-sdk-java/tree/main/provisioning/provisioning-device-client-samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-enroll-device-tpm?pivots=programming-language-java\&tabs=symmetrickey) | [Reference](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.provisioning.service) |
| Node.js | [npm](https://www.npmjs.com/package/azure-iot-provisioning-service) | [GitHub](https://github.com/Azure/azure-iot-sdk-node/tree/main/provisioning) | [Samples](https://github.com/Azure/azure-iot-sdk-node/tree/main/provisioning/service/samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-enroll-device-tpm?pivots=programming-language-nodejs\&tabs=symmetrickey) | [Reference](https://learn.microsoft.com/javascript/api/azure-iot-provisioning-service) |


## Management SDKs


The DPS management SDKs help you build backend applications that manage the DPS instances and their metadata in your Azure subscription.

| Platform | Package | Code repository | Reference |
| --- | --- | --- | --- |
| .NET | [NuGet](https://www.nuget.org/packages/Microsoft.Azure.Management.DeviceProvisioningServices) | [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/deviceprovisioningservices/Azure.ResourceManager.DeviceProvisioningServices) | [Reference](https://learn.microsoft.com/dotnet/api/overview/azure/resourcemanager.deviceprovisioningservices-readme) |
| Java | [Maven](https://mvnrepository.com/artifact/com.azure.resourcemanager/azure-resourcemanager-deviceprovisioningservices) | [GitHub](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/deviceprovisioningservices/azure-resourcemanager-deviceprovisioningservices) | [Reference](https://learn.microsoft.com/java/api/com.azure.resourcemanager.deviceprovisioningservices) |
| Node.js | [npm](https://www.npmjs.com/package/@azure/arm-deviceprovisioningservices) | [GitHub](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices) | [Reference](https://learn.microsoft.com/javascript/api/overview/azure/arm-deviceprovisioningservices-readme) |
| Python | [pip](https://pypi.org/project/azure-mgmt-iothubprovisioningservices/) | [GitHub](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/iothub/azure-mgmt-iothubprovisioningservices) | [Reference](https://learn.microsoft.com/python/api/azure-mgmt-iothubprovisioningservices) |


## Next steps

The Device Provisioning Service documentation provides [tutorials](how-to-legacy-device-symm-key.md) and [additional samples](quick-create-simulated-device-tpm.md) that you can use to try out the SDKs and libraries.
