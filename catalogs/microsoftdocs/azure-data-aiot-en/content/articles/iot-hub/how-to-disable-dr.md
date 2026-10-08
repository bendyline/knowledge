---
title: Disable Disaster Recovery in Azure IoT Hub
titleSuffix: Azure IoT Hub
description: Learn how to disable disaster recovery failover for Azure IoT Hub in specific regions by using the Azure portal to manage data replication settings.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.topic: how-to
ms.date: 05/02/2025

#Customer intent: As an engineer responsible for business continuity, I want to learn how to disable disaster recovery in IoT Hub so that I can avoid data replication outside of the region.
ms.custom:
  - build-2025
---

# Disable disaster recovery in Azure IoT Hub

Azure IoT Hub provides Microsoft-initiated failover and manual failover by replicating data to a [paired region](https://learn.microsoft.com/azure/reliability/regions-paired) for each IoT hub. For some regions, you can avoid data replication outside of the region by disabling disaster recovery (DR) when you create an IoT hub.

## Prerequisites

To disable DR in IoT Hub, you need the following requirements:

- **An Azure subscription.** If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- **Regions that support disabling DR.** The following regions support disabling DR:

  - **Brazil South:** Paired region, South Central US

  - **Southeast Asia (Singapore):** Paired region, East Asia (Hong Kong SAR)

## Create an IoT hub without DR

To disable DR in the Azure portal, you need to complete the following steps:

1. Sign in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, [create your IoT hub](https://learn.microsoft.com/azure/iot-hub/create-hub?tabs=portal) in one of the [supported regions](#prerequisites). Ensure that **Disaster recovery enabled** isn't selected.

    Screenshot of the Azure portal that shows the DR option for an IoT hub in the Singapore region.

    Failover capabilities aren't available if you disable DR for an IoT hub.

    Screenshot that shows DR disabled for an IoT hub in the Singapore region.

You can also disable DR when you create an IoT hub by using an [Azure Resource Manager template](https://learn.microsoft.com/azure/templates/microsoft.devices/iothubs?pivots=deployment-language-arm-template).

## Disable DR for an existing IoT hub

You can only disable DR to avoid data replication when you create an IoT hub. If you want to configure an existing IoT hub to disable DR, create a new IoT hub that has DR disabled. Then manually migrate your existing IoT hub.

1. [Create a new IoT hub that has DR disabled](#create-an-iot-hub-without-dr).

1. To manually migrate your existing IoT hub, follow the [IoT hub migration steps](migrate-hub-state-cli.md#migrate-an-iot-hub).

## Related content

- [Reliability in IoT Hub](https://learn.microsoft.com/azure/reliability/reliability-iot-hub)
