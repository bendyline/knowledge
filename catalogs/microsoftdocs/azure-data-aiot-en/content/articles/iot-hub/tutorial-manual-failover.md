---
title: Tutorial - Manually failover an Azure IoT hub
description: Learn how to perform a manual failover of your IoT hub to a different region and then return it to the original region.
author: sethmanheim
manager: lizross
ms.service: azure-iot-hub
services: iot-hub
ms.topic: tutorial
ms.date: 11/17/2022
ms.author: sethm
ms.custom:
  - [mvc,mqtt]
  - build-2025
#Customer intent: As an IT Pro, I want to be able to perform a manual failover of my IoT hub to a different region, and then return it to the original region.
---

# Tutorial: Perform manual failover for an IoT hub

Manual failover is a feature of the IoT Hub service that allows customers to [failover](https://en.wikipedia.org/wiki/Failover) their hub's operations from a primary region to the corresponding [Azure geo-paired region](https://learn.microsoft.com/azure/reliability/cross-region-replication-azure). The manual failover feature is offered to customers at no additional cost for IoT hubs created after May 18, 2017.

> **Note:**
> Manual failover can be done in the event of a regional disaster or an extended service outage. You can also perform a planned failover to test your disaster recovery capabilities, although we recommend using a test IoT hub rather than one running in production. 

In this tutorial, you perform the following tasks:

> 
>
> * Using the Azure portal, create an IoT hub.
> * Perform a failover.
> * See the hub running in the secondary location.
> * Perform a failback to return the IoT hub's operations to the primary location. 
> * Confirm the hub is running correctly in the right location.

For more information about manual failover and Microsoft-initiated failover with IoT Hub, see [Reliability in Azure IoT Hub](https://learn.microsoft.com/azure/reliability/reliability-iot-hub).

## Prerequisites

* An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Create an IoT hub


This section describes how to create an IoT hub by using the [Azure portal](https://portal.azure.com).

1. Sign in to the [Azure portal](https://portal.azure.com).

1. On the Azure home page, select **+ Create a resource**.

1. From the **Categories** menu, select **Internet of Things**, and then select **IoT Hub**.

1. On the **Basics** tab, fill in the fields that are listed in the following table.

   > **Important:**
> Because the IoT hub will be publicly discoverable as a DNS endpoint, be sure to avoid entering any sensitive or personally identifiable information when you name it.
>


   | Property | Value |
   | --- | --- |
   | **Subscription** | Select the subscription to use for your hub. |
   | **Resource group** | Select a resource group or create a new one. To create a new one, select **Create new** and fill in the name you want to use. |
   | **IoT hub name** | Enter a name for your hub. This name must be globally unique, with a length between 3 and 50 alphanumeric characters. The name can also include the dash (`-`) character. |
   | **Region** | Select the region closest to you where you want your hub to be located. |
   | **Tier** | Select the tier that you want to use for your hub. Tier selection depends on how many features you want and how many messages you send through your solution per day.<br><br>The free tier is intended for testing and evaluation. The free tier allows 500 devices to be connected to the hub and up to 8,000 messages per day. Each Azure subscription can create one IoT hub in the free tier.<br><br>To compare the features available to each tier, select **Compare tiers**. For more information, see [Choose the right IoT Hub tier and size for your solution](https://learn.microsoft.com/azure/iot-hub/iot-hub-scaling). |
   | **Daily message limit** | Select the maximum daily quota of messages for your hub. The available options depend on the tier you select for your hub. To see the available messaging and pricing options, select **See all options**, and select the option that best matches the needs of your hub. For more information, see [IoT Hub quotas and throttling](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-quotas-throttling). |

   Screenshot that shows how to create an IoT hub in the Azure portal.

   > **Note:**
   > Prices shown are for example purposes only.

1. Select **Next: Networking** to continue creating your hub.

1. On the **Networking** tab, fill in the following fields:

   | Property | Value |
   | --- | --- |
   | **Connectivity configuration** | Choose the endpoints that devices can use to connect to your IoT hub. Accept the default setting **Public access** for this example. You can change this setting after the IoT hub is created. For more information, see [IoT Hub endpoints](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-endpoints). |
   | **Minimum Transport Layer Security (TLS) version** | Select the minimum [TLS version](https://learn.microsoft.com/azure/iot-hub/iot-hub-tls-support#tls-12-enforcement-available-in-select-regions) supported by your IoT hub. After the IoT hub is created, this value can't be changed. Accept the default setting **1.0** for this example. |

   Screenshot that shows how to choose the endpoints that can connect to a new IoT hub.

1. Select **Next: Management** to continue creating your hub.

1. On the **Management** tab, accept the default settings. If you want, you can modify any of the following fields:

   | Property | Value |
   | --- | --- |
   | **Permission model** | This property decides how you manage access to your IoT hub. It's part of role-based access control. Allow shared access policies or choose only role-based access control. For more information, see [Control access to IoT Hub by using Microsoft Entra ID](https://learn.microsoft.com/azure/iot-hub/iot-hub-dev-guide-azure-ad-rbac). |
   | **Assign me** | This property allows access to IoT Hub data APIs to manage elements within an instance. If you have access to role assignments, select the **IoT Hub Data Contributor role** to grant yourself full access to the data APIs.<br><br>To assign Azure roles, you must have `Microsoft.Authorization/roleAssignments/write` permissions, such as [User Access Administrator](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#user-access-administrator) or [Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#owner). |
   | **Device-to-cloud partitions** | This property relates the device-to-cloud messages to the number of simultaneous readers of the messages. Most IoT hubs need only four partitions. |

   Screenshot that shows how to set the role-based access control and scale for a new IoT hub.

1. Select **Next: Add-ons** to continue to the next screen.

1. On the **Add-ons** tab, accept the default settings. If you want, you can modify any of the following fields:

   | Property | Value |
   | --- | --- |
   | **Enable Device Update for IoT Hub** | Turn on **Device Update for IoT Hub** to enable over-the-air updates for your devices. If you select this option, you're prompted to provide information to provision a Device Update for IoT Hub account and instance. For more information, see [What is Device Update for IoT Hub?](https://learn.microsoft.com/azure/iot-hub-device-update/understand-device-update). |
   | **Enable Defender for IoT** | Turn on **Defender for IoT** to add an extra layer of protection to IoT and your devices. This option isn't available for hubs in the free tier. For more information, see [Security recommendations for IoT Hub](https://learn.microsoft.com/azure/defender-for-iot/device-builders/concept-recommendations) in [Microsoft Defender for IoT](https://learn.microsoft.com/azure/defender-for-iot/device-builders) documentation. |

   Screenshot that shows how to set the optional add-ons for a new IoT hub.

   > **Note:**
   > Prices shown are for example purposes only.

1. Select **Next: Tags** to continue to the next screen.

    Tags are name/value pairs. You can assign the same tag to multiple resources and resource groups to categorize resources and consolidate billing. In this document, you don't add any tags. For more information, see [Use tags to organize your Azure resources and management hierarchy](https://learn.microsoft.com/azure/azure-resource-manager/management/tag-resources).

    Screenshot that shows how to assign tags for a new IoT hub.

1. Select **Next: Review + create** to review your choices.

1. Select **Create** to start the deployment of your new hub. Your deployment might progress for a few minutes while the hub is being created. After the deployment is finished, select **Go to resource** to open the new hub.


## Perform a manual failover

> **Note:**
> There is a limit of two failovers and two failbacks per day for an IoT hub.

1. Navigate to your IoT hub in the Azure portal.

1. Under **Hub settings** on the navigation menu, select **Failover**.

   Screenshot showing IoT Hub properties pane.

1. On the **Failover** pane, you see the **Current location** and the **Failover location** listed for your IoT hub. The current location always indicates the location in which the hub is currently active. The failover location is the standard [Azure geo-paired region](https://learn.microsoft.com/azure/reliability/cross-region-replication-azure) that is paired to the current location. You cannot change the location values.

1. At the top of the **Failover** pane, select **Start failover**.

   Screenshot showing Manual Failover pane.

1. In the confirmation pane, fill in the name of your IoT hub to confirm it's the one you want to failover. Then, to initiate the failover, select **Failover**.

   Screenshot showing Manual Failover confirmation pane.

   The amount of time it takes to perform the manual failover is proportional to the number of devices that are registered for your hub. For example, if you have 100,000 devices, it might take 15 minutes, but if you have five million devices, it might take an hour or longer.

   While the manual failover process is running, a banner appears to tell you a manual failover is in progress.

   If you select **Overview** to view the IoT hub details, you see a banner telling you that the hub is in the middle of a manual failover.

   After it's finished, the current and failover regions on the Manual Failover page are flipped and the hub is active again. In this example, the current location is now `WestCentralUS` and the failover location is now `West US 2`.

   Screenshot showing failover is complete.

   The overview page also shows a banner indicating that the failover is complete and the IoT Hub is running in the paired region.

## Perform a failback

After you have performed a manual failover, you can switch the hub's operations back to the original primary region. This action is called a *failback*. If you have just performed a failover, you have to wait about an hour before you can request a failback. If you try to perform the failback in a shorter amount of time, an error message is displayed.

A failback is performed just like a manual failover. These are the steps:

1. To perform a failback, return to the **Failover** pane for your IoT hub.

2. Select **Start failover** at the top of the **Failover** pane.

3. In the confirmation pane, fill in the name of your IoT hub to confirm it's the one you want to failback. To then initiate the failback, select **Failover**.

   Screenshot showing Manual Failover confirmation pane.

   After the failback is complete, your IoT hub again shows the original region as the current location and the paired region as the failover location, as you saw originally.

## Clean up resources

To remove the resources you've created for this tutorial, delete the resource group. This action deletes all resources contained within the group. In this case, it removes the IoT hub and the resource group itself.

1. Click **Resource Groups**.

2. Locate and select the resource group that contains your IoT hub.

3. If you want to delete the entire group and all the resources in it, select **Delete resource group**. When prompted, enter the name of the resource group and select **Delete** to confirm the action.

   If you only want to delete specific resources from the group, check the boxes next to each resource you want to delete then select **Delete**. When prompted, type **yes** and select **Delete** to confirm the action.

## Next steps

In this tutorial, you learned how to configure and perform a manual failover, and how to initiate a failback.

Advance to the next tutorial to learn how to configure your device from a back-end service.

> 
> [Configure your devices](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/tutorial-device-twins.md)
