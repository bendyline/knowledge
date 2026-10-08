---
title: include file
description: include file
author: sethmanheim
ms.service: azure-iot-hub
services: iot-hub
ms.topic: include
ms.date: 10/20/2021
ms.author: sethm
ms.custom:
  - include file
  - sfi-image-nochange
---
<!-- This tells how to get the connection string for the service shared access policy of your IoT hub -->

To get the IoT Hub connection string for the **service** policy, follow these steps:

1. In the [Azure portal](https://portal.azure.com), select **Resource groups**. Select the resource group where your hub is located, and then select your hub from the list of resources.

1. On the left-side pane of your IoT hub, select **Shared access policies**.

1. From the list of policies, select the **service** policy.

1. Copy the **Primary connection string** and save the value.

Screenshot that shows how to retrieve the connection string from your IoT Hub in the Azure portal.

For more information about IoT Hub shared access policies and permissions, see [Access control and permissions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-dev-guide-sas.md#access-control-and-permissions).
