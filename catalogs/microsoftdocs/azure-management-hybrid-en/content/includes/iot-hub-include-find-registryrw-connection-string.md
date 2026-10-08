---
title: include file
description: include file
author: sethmanheim
ms.service: azure-iot-hub
services: iot-hub
ms.topic: include
ms.date: 08/07/2019
ms.author: sethm
ms.custom:
  - include file
  - sfi-image-nochange
---
<!-- This tells how to get the connection string for the registryReadWrite shared access policy of your IoT hub -->

To get the IoT Hub connection string for the **registryReadWrite** policy, follow these steps:

1. In the [Azure portal](https://portal.azure.com), select **Resource groups**. Select the resource group where your hub is located, and then select your hub from the list of resources.

2. On the left-side pane of your hub, select **Shared access policies**.

3. From the list of policies, select the **registryReadWrite** policy.

4. Copy the **Primary connection string** and save the value.

   Screen capture that shows how to retrieve the connection string

For more information about IoT Hub shared access policies and permissions, see [Access control and permissions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-dev-guide-sas.md#access-control-and-permissions).
