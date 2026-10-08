---
title: Azure IoT device and service SDKs
description: A list of the IoT SDKs and libraries. Includes SDKs for device development and SDKs for building service applications.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.topic: reference
ms.date: 09/22/2026
ai-usage: ai-assisted

---

# Azure IoT device and service SDKs

This reference lists the Azure SDKs you can use to build IoT solutions, including device, service, and management SDKs for IoT Hub and Device Provisioning Service (DPS), and links to Azure Digital Twins control plane and data plane APIs.

Looking ahead, the [unified Azure IoT SDKs (preview)](../iot/device-registry/concept-unified-iot-sdks.md) bring these device and service capabilities together across IoT Hub and Azure Device Registry.

## Device SDKs


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


Use the device SDKs to develop code to run on IoT devices that connect to IoT Hub or IoT Central.

### Embedded device SDKs


These SDKs were designed and created to run on devices with limited compute and memory resources and are implemented using the C language.

The embedded device SDKs are available for **multiple operating systems** providing the flexibility to choose which best suits your scenario.

| RTOS | SDK | Source | Samples | Reference |
| :--- | :--- | :--- | :--- | :--- |
| **Eclipse ThreadX** | Azure RTOS Middleware | [GitHub](https://github.com/eclipse-threadx/netxduo) | [Quickstarts](https://learn.microsoft.com/azure/iot/tutorial-devkit-mxchip-az3166-iot-hub) | [Reference](https://github.com/eclipse-threadx/netxduo/tree/master/addons/azure_iot) |
| **FreeRTOS** | FreeRTOS Middleware | [GitHub](https://github.com/Azure/azure-iot-middleware-freertos) | [Samples](https://github.com/Azure-Samples/iot-middleware-freertos-samples) | [Reference](https://azure.github.io/azure-iot-middleware-freertos) |
| **Bare Metal** | Azure SDK for Embedded C | [GitHub](https://github.com/Azure/azure-sdk-for-c) | [Samples](https://github.com/Azure/azure-sdk-for-c/blob/master/sdk/samples/iot/README.md) | [Reference](https://azure.github.io/azure-sdk/#embedded-c) |


Use the embedded device SDKs to develop code to run on IoT devices that connect to IoT Hub or IoT Central.

To learn more about when to use the embedded device SDKs, see [C SDK and Embedded C SDK usage scenarios](https://learn.microsoft.com/previous-versions/azure/iot/concepts-using-c-sdk-and-embedded-c-sdk).

### Device SDK lifecycle and support

This section summarizes the Azure IoT Device SDK lifecycle and support policy. For more information, see [Azure SDK Lifecycle and support policy](https://azure.github.io/azure-sdk/policies_support.html).

#### Package lifecycle

Packages are released in the following categories. Each category has a defined support structure.

1. **Beta** - Also known as Preview or Release Candidate. Available for early access and feedback purposes and **is not recommended** for use in production. The preview version support is limited to GitHub issues. Preview releases typically live for less than six months, after which they're either deprecated or released as active.

1. **Active** - Generally available and fully supported, receives new feature updates, as well as bug and security fixes. Use the **latest version** because that version receives fixes and updates.

1. **Deprecated** - Superseded by a more recent release. Deprecation occurs at the same time the new release becomes active. Deprecated releases address the most critical bug fixes and security fixes for another **12 months**.

#### Get support

If you experience problems while using the Azure IoT SDKs, seek support through the following options:

* **Reporting bugs** - All customers can report bugs on the issues page for the GitHub repository associated with the relevant SDK. 

* **Microsoft Customer Support team** - Users who have a [support plan](https://azure.microsoft.com/support/plans/) can engage the Microsoft Customer Support team by creating a support ticket directly from the [Azure portal](https://portal.azure.com/signin/index/?feature.settingsportalinstance=mpac).

## IoT Hub service SDKs


The Azure IoT service SDKs contain code to facilitate building applications that interact directly with IoT Hub to manage devices and security.

| Platform | Package | Code Repository | Samples | Reference |
| --- | --- | --- | --- | --- |
| .NET | [NuGet](https://www.nuget.org/packages/Microsoft.Azure.Devices) | [GitHub](https://github.com/Azure/azure-iot-sdk-csharp) | [Samples](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/service/samples) | [Reference](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices) |
| Java | [Maven](https://mvnrepository.com/artifact/com.microsoft.azure.sdk.iot/iot-service-client) | [GitHub](https://github.com/Azure/azure-iot-service-sdk-java) | [Samples](https://github.com/Azure/azure-iot-service-sdk-java/tree/main/service/iot-service-samples) | [Reference](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service) |
| Node | [npm](https://www.npmjs.com/package/azure-iothub) | [GitHub](https://github.com/Azure/azure-iot-hub-node) | [Samples](https://github.com/Azure/azure-iot-hub-node/tree/main/samples) | [Reference](https://learn.microsoft.com/javascript/api/azure-iothub/) |
| Python | [pip](https://pypi.org/project/azure-iot-hub) | [GitHub](https://github.com/Azure/azure-iot-hub-python) | [Samples](https://github.com/Azure/azure-iot-hub-python/tree/main/samples) | [Reference](https://learn.microsoft.com/python/api/azure-iot-hub) |


To learn more about using the service SDKs to interact with devices through an IoT hub, see [IoT Plug and Play service developer guide](https://learn.microsoft.com/previous-versions/azure/iot/concepts-developer-guide-service).

## IoT Hub management SDKs


The IoT Hub management SDKs help you build backend applications that manage the IoT hubs in your Azure subscription.

| Platform | Package | Code repository | Reference |
| --- | --- | --- | --- |
| .NET | [NuGet](https://www.nuget.org/packages/Azure.ResourceManager.IotHub/) | [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/iothub) | [Reference](https://learn.microsoft.com/dotnet/api/microsoft.azure.management.iothub) |
| Java | [Maven](https://mvnrepository.com/artifact/com.azure.resourcemanager/azure-resourcemanager-iothub) | [GitHub](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/iothub/azure-resourcemanager-iothub) | [Reference](https://learn.microsoft.com/java/api/overview/azure/resourcemanager-iothub-readme) |
| Node.js | [npm](https://www.npmjs.com/package/@azure/arm-iothub) | [GitHub](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iothub/arm-iothub) | [Reference](https://learn.microsoft.com/javascript/api/overview/azure/arm-iothub-readme) |
| Python | [pip](https://pypi.org/project/azure-mgmt-iothub/) | [GitHub](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/iothub/azure-mgmt-iothub) | [Reference](https://learn.microsoft.com/python/api/azure-mgmt-iothub) |


Alternatives to the management SDKs include the [Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-create-using-cli.md), [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-create-using-powershell.md), and [REST API](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-rm-rest.md).

## DPS device SDKs


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


### DPS embedded device SDKs


These SDKs were designed and created to run on devices with limited compute and memory resources and are implemented using the C language.

| RTOS | SDK | Source | Samples | Reference |
| :--- | :--- | :--- | :--- | :--- |
| **Eclipse ThreadX** | Azure RTOS Middleware | [GitHub](https://github.com/eclipse-threadx/netxduo) | [Quickstarts](https://learn.microsoft.com/azure/iot/tutorial-devkit-mxchip-az3166-iot-hub) | [Reference](https://github.com/eclipse-threadx/netxduo/tree/master/addons/azure_iot) |
| **FreeRTOS** | FreeRTOS Middleware | [GitHub](https://github.com/Azure/azure-iot-middleware-freertos) | [Samples](https://github.com/Azure-Samples/iot-middleware-freertos-samples) | [Reference](https://azure.github.io/azure-iot-middleware-freertos) |
| **Bare Metal** | Azure SDK for Embedded C | [GitHub](https://github.com/Azure/azure-sdk-for-c/tree/master/sdk/docs/iot) | [Samples](https://github.com/Azure/azure-sdk-for-c/blob/master/sdk/samples/iot/README.md) | [Reference](https://azure.github.io/azure-sdk/#embedded-c) |

Learn more about the device and embedded device SDKs in [IoT SDKs](https://learn.microsoft.com/azure/iot-hub/iot-sdks).


## DPS service SDKs


The DPS service SDKs help you build backend applications to manage enrollments and registration records in DPS instances.

| Platform | Package | Code repository | Samples | Quickstart | Reference |
| --- | --- | --- | --- | --- | --- |
| .NET | [NuGet](https://www.nuget.org/packages/Microsoft.Azure.Devices.Provisioning.Service/) | [GitHub](https://github.com/Azure/azure-iot-sdk-csharp/) | [Samples](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/provisioning/service/samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-enroll-device-tpm?pivots=programming-language-csharp\&tabs=symmetrickey) | [Reference](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.provisioning.service) |
| Java | [Maven](https://mvnrepository.com/artifact/com.microsoft.azure.sdk.iot.provisioning/provisioning-service-client) | [GitHub](https://github.com/Azure/azure-iot-sdk-java/blob/main/provisioning) | [Samples](https://github.com/Azure/azure-iot-sdk-java/tree/main/provisioning/provisioning-device-client-samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-enroll-device-tpm?pivots=programming-language-java\&tabs=symmetrickey) | [Reference](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.provisioning.service) |
| Node.js | [npm](https://www.npmjs.com/package/azure-iot-provisioning-service) | [GitHub](https://github.com/Azure/azure-iot-sdk-node/tree/main/provisioning) | [Samples](https://github.com/Azure/azure-iot-sdk-node/tree/main/provisioning/service/samples) | [Quickstart](https://learn.microsoft.com/azure/iot-dps/quick-enroll-device-tpm?pivots=programming-language-nodejs\&tabs=symmetrickey) | [Reference](https://learn.microsoft.com/javascript/api/azure-iot-provisioning-service) |


## DPS management SDKs


The DPS management SDKs help you build backend applications that manage the DPS instances and their metadata in your Azure subscription.

| Platform | Package | Code repository | Reference |
| --- | --- | --- | --- |
| .NET | [NuGet](https://www.nuget.org/packages/Microsoft.Azure.Management.DeviceProvisioningServices) | [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/deviceprovisioningservices/Azure.ResourceManager.DeviceProvisioningServices) | [Reference](https://learn.microsoft.com/dotnet/api/overview/azure/resourcemanager.deviceprovisioningservices-readme) |
| Java | [Maven](https://mvnrepository.com/artifact/com.azure.resourcemanager/azure-resourcemanager-deviceprovisioningservices) | [GitHub](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/deviceprovisioningservices/azure-resourcemanager-deviceprovisioningservices) | [Reference](https://learn.microsoft.com/java/api/com.azure.resourcemanager.deviceprovisioningservices) |
| Node.js | [npm](https://www.npmjs.com/package/@azure/arm-deviceprovisioningservices) | [GitHub](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices) | [Reference](https://learn.microsoft.com/javascript/api/overview/azure/arm-deviceprovisioningservices-readme) |
| Python | [pip](https://pypi.org/project/azure-mgmt-iothubprovisioningservices/) | [GitHub](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/iothub/azure-mgmt-iothubprovisioningservices) | [Reference](https://learn.microsoft.com/python/api/azure-mgmt-iothubprovisioningservices) |


## Azure Digital Twins control plane APIs


The control plane APIs are [ARM](https://learn.microsoft.com/azure/azure-resource-manager/management/overview) APIs used to manage your Azure Digital Twins instance as a whole, so they cover operations like creating or deleting your entire instance. You'll also use these APIs to create and delete endpoints.

To call the APIs directly, reference the latest Swagger folder in the [control plane Swagger repo](https://github.com/Azure/azure-rest-api-specs/tree/main/specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/DigitalTwins/stable). This folder also includes a folder of examples that show the usage.

Here are the SDKs currently available for the Azure Digital Twins control plane APIs.

| SDK language | Package link | Reference documentation | Source code |
| --- | --- | --- | --- |
| .NET (C#) | [Azure.ResourceManager.DigitalTwins on NuGet](https://www.nuget.org/packages/Azure.ResourceManager.DigitalTwins) | [Reference for Azure DigitalTwins SDK for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins) | [Microsoft Azure Digital Twins management client library for .NET on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/digitaltwins/Azure.ResourceManager.DigitalTwins) |
| Java | [azure-resourcemanager-digitaltwins on Maven](https://repo1.maven.org/maven2/com/azure/resourcemanager/azure-resourcemanager-digitaltwins/) | [Reference for Resource Management - Digital Twins](https://learn.microsoft.com/java/api/overview/azure/digital-twins) | [Azure Resource Manager AzureDigitalTwins client library for Java on GitHub](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/digitaltwins) |
| JavaScript | [AzureDigitalTwinsManagement client library for JavaScript on npm](https://www.npmjs.com/package/@azure/arm-digitaltwins) |  | [AzureDigitalTwinsManagement client library for JavaScript on GitHub](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/arm-digitaltwins) |
| Python | [azure-mgmt-digitaltwins on PyPI](https://pypi.org/project/azure-mgmt-digitaltwins/) |  | [Microsoft Azure SDK for Python on GitHub](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/digitaltwins/azure-mgmt-digitaltwins) |
| Go | [azure-sdk-for-go/services/digitaltwins/mgmt](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/services/digitaltwins/mgmt) |  | [Azure SDK for Go on GitHub](https://github.com/Azure/azure-sdk-for-go) |


## Azure Digital Twins data plane APIs


The data plane APIs are the Azure Digital Twins APIs used to manage the elements within your Azure Digital Twins instance. They include operations like creating routes, uploading models, creating relationships, and managing twins, and can be broadly divided into the following categories:

* `DigitalTwinModels` - The DigitalTwinModels category contains APIs to manage the [models](https://learn.microsoft.com/azure/digital-twins/concepts-models) in an Azure Digital Twins instance. Management activities include upload, validation, retrieval, and deletion of models authored in DTDL.
* `DigitalTwins` - The DigitalTwins category contains the APIs that let developers create, modify, and delete [digital twins](https://learn.microsoft.com/azure/digital-twins/concepts-twins-graph) and their relationships in an Azure Digital Twins instance.
* `Query` - The Query category lets developers [find sets of digital twins in the twin graph](https://learn.microsoft.com/azure/digital-twins/how-to-query-graph) across relationships.
* `Event Routes` - The Event Routes category contains APIs to [route data](https://learn.microsoft.com/azure/digital-twins/concepts-route-events), through the system and to downstream services.
* `Import Jobs` - The Import Jobs API lets you manage a long running, asynchronous action to [import models, twins, and relationships in bulk](https://learn.microsoft.com/azure/digital-twins/concepts-apis-sdks#bulk-import-with-the-import-jobs-api).
* `Delete Jobs` - The Delete Jobs API lets you manage a long running, asynchronous action to [delete all models, twins, and relationships in an instance](https://learn.microsoft.com/azure/digital-twins/concepts-apis-sdks#bulk-delete-with-the-delete-jobs-api).

To call the APIs directly, reference the latest Swagger folder in the [data plane Swagger repo](https://github.com/Azure/azure-rest-api-specs/tree/main/specification/digitaltwins/data-plane/DigitalTwins). This folder also includes a folder of examples that show the usage. You can also view the [data plane API reference documentation](https://learn.microsoft.com/rest/api/azure-digitaltwins/).

Here are the SDKs currently available for the Azure Digital Twins data plane APIs.

| SDK language | Package link | Reference documentation | Source code |
| --- | --- | --- | --- |
| .NET (C#) | [Azure.DigitalTwins.Core on NuGet](https://www.nuget.org/packages/Azure.DigitalTwins.Core) | [Reference for Azure IoT Digital Twins client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins.core-readme) | [Azure IoT Digital Twins client library for .NET on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/digitaltwins/Azure.DigitalTwins.Core) |
| Java | [com.azure:azure-digitaltwins-core on Maven](https://search.maven.org/artifact/com.azure/azure-digitaltwins-core/1.0.0/jar) | [Reference for Azure Digital Twins SDK for Java](https://learn.microsoft.com/java/api/overview/azure/digital-twins) | [Azure IoT Digital Twins client library for Java on GitHub](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/digitaltwins/azure-digitaltwins-core) |
| JavaScript | [Azure Azure Digital Twins Core client library for JavaScript on npm](https://www.npmjs.com/package/@azure/digital-twins-core) | [Reference for @azure/digital-twins-core](https://learn.microsoft.com/javascript/api/@azure/digital-twins-core) | [Azure Azure Digital Twins Core client library for JavaScript on GitHub](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/digital-twins-core) |
| Python | [Azure Azure Digital Twins Core client library for Python on PyPI](https://pypi.org/project/azure-digitaltwins-core/) | [Reference for azure-digitaltwins-core](https://learn.microsoft.com/python/api/azure-digitaltwins-core/azure.digitaltwins.core) | [Azure Azure Digital Twins Core client library for Python on GitHub](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/digitaltwins/azure-digitaltwins-core) |


## Next steps

Suggested next steps include:

- [Device developer guide](https://learn.microsoft.com/previous-versions/azure/iot/concepts-developer-guide-device)
- [Service developer guide](https://learn.microsoft.com/previous-versions/azure/iot/concepts-developer-guide-service)
