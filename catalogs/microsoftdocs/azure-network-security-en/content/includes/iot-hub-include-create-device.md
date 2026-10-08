---
 title: include file
 description: include file
 services: iot-hub
 author: SoniaLopezBravo
 ms.service: azure-iot-hub
 ms.topic: include
 ms.date: 12/20/2022
 ms.author: sonialopez
 ms.custom:
   - include file
   - sfi-image-nochange
---
<!-- put the ## header in the file that includes this file -->

In this section, you create a device identity in the identity registry in your IoT hub. A device can't connect to a hub unless it has an entry in the identity registry. For more information, see the [IoT Hub developer guide](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-devguide-identity-registry.md#identity-registry-operations).

1. In your IoT hub navigation menu, open **Devices**, then select **Add Device** to add a device in your IoT hub.

    Screen capture that shows how to create a device identity in the portal.

1. In **Create a device**, provide a name for your new device, such as **myDeviceId**, and select **Save**. This action creates a device identity for your IoT hub. Leave **Auto-generate keys** checked so that the primary and secondary keys will be generated automatically.

    Screen capture that shows how to add a new device.

    > **Important:**
> The device ID may be visible in the logs collected for customer support and troubleshooting, so make sure to avoid any sensitive information while naming it.
>

1. After the device is created, open the device from the list in the **Devices** pane. Copy the value of **Primary connection string**. This connection string is used by device code to communicate with the IoT hub.

    By default, the keys and connection strings are masked because they're sensitive information. If you click the eye icon, they're revealed. It's not necessary to reveal them to copy them with the copy button.

    Screen capture that shows the device connection string.

> **Note:**
> The IoT Hub identity registry only stores device identities to enable secure access to the IoT hub. It stores device IDs and keys to use as security credentials, and an enabled/disabled flag that you can use to disable access for an individual device. If your application needs to store other device-specific metadata, it should use an application-specific store. For more information, see [IoT Hub developer guide](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-devguide-identity-registry.md).
