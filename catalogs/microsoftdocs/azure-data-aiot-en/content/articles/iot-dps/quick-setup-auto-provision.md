---
title: Quickstart - Set up in portal
titleSuffix: Azure IoT Hub Device Provisioning Service
description: Quickstart - Set up the Azure IoT Hub Device Provisioning Service (DPS) in the Microsoft Azure portal
author: sethmanheim
ms.author: sethm
manager: lizross
ms.date: 08/16/2024
ms.topic: quickstart
ms.service: azure-iot-hub
services: iot-dps
ms.subservice: azure-iot-hub-dps
ms.custom:
  - mvc
  - mode-ui
  - sfi-image-nochange
---

# Quickstart: Set up IoT Hub Device Provisioning Service with the Azure portal

In this quickstart, you learn how to set up Azure IoT Hub Device Provisioning Service in the Azure portal. Device Provisioning Service enables zero-touch, just-in-time device provisioning to any IoT hub. The Device Provisioning Service enables customers to provision millions of IoT devices in a secure and scalable manner, without requiring human intervention. Azure IoT Hub Device Provisioning Service supports IoT devices with TPM, symmetric key, and X.509 certificate authentications.

Before you can provision your devices, you first perform the following steps:

> 
> * Use the Azure portal to create an IoT hub
> * Use the Azure portal to create an IoT Hub Device Provisioning Service instance
> * Link the IoT hub to the Device Provisioning Service instance

## Prerequisites

If you don't have an Azure subscription, create a [free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

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


## Create a new IoT Hub Device Provisioning Service instance

1. In the Azure portal, select **Create a resource**.

1. From the **Categories** menu, select **Internet of Things**, and then select **IoT Hub Device Provisioning Service**.

1. On the **Basics** tab, provide the following information:
    
    | Property | Value |
    | --- | --- |
    | **Subscription** | Select the subscription to use for your Device Provisioning Service instance. |
    | **Resource group** | This field allows you to create a new resource group, or choose an existing one to contain the new instance. Choose the same resource group that contains the IoT hub that you created in the previous steps. By putting all related resources in a group together, you can manage them together. |
    | **Name** | Provide a unique name for your new Device Provisioning Service instance. If the name you enter is available, a green check mark appears. |
    | **Region** | Select a location that's close to your devices. For resiliency and reliability, we recommend deploying to one of the regions that support [Availability Zones](iot-dps-ha-dr.md). |

    Screenshot showing the Basics tab of the IoT Hub device provisioning service. Enter basic information about your Device Provisioning Service instance in the portal.

1. Select **Review + create** to validate your provisioning service.

1. Select **Create** to start the deployment of your Device Provisioning Service instance.

1. After the deployment successfully completes, select **Go to resource** to view your Device Provisioning Service instance.

## Link the IoT hub and your Device Provisioning Service instance

In this section, you add a configuration to the Device Provisioning Service instance. This configuration sets the IoT hub to which the instance provisions IoT devices.

1. In the **Settings** menu of your Device Provisioning Service instance, select **Linked IoT hubs**.

1. Select **Add**.

1. On the **Add link to IoT hub** panel, provide the following information: 

    | Property | Value |
    | --- | --- |
    | **Subscription** | Select the subscription containing the IoT hub that you want to link with your new Device Provisioning Service instance. |
    | **IoT hub** | Select the IoT hub to link with your new Device Provisioning System instance. |
    | **Access Policy** | Select **iothubowner (RegistryWrite, ServiceConnect, DeviceConnect)** as the credentials for establishing the link with the IoT hub. |

    Screenshot showing how to link an IoT hub to the Device Provisioning Service instance in the portal.

1. Select **Save**.

1. Select **Refresh**. You should now see the selected hub under the list of **Linked IoT hubs**.

## Clean up resources

The rest of the Device Provisioning Service quickstarts and tutorials use the resources that you created in this quickstart. However, if you don't plan on doing any more quickstarts or tutorials, delete these resources.

To clean up resources in the Azure portal:

1. In the Azure portal, navigate to the resource group that you used in this quickstart.

1. If you want to delete the resource group and all of the resources it contains, select **Delete resource group**.

   Otherwise, select your Device Provisioning Service instance and your IoT hub from the list of resources, then select **Delete**.  

## Next steps

In this quickstart, you deployed an IoT hub and a Device Provisioning Service instance, and then linked the two resources. To learn how to use this setup to provision a device, continue to the quickstart for creating a device.

> 
> [Quickstart: Provision a simulated symmetric key device](quick-create-simulated-device-symm-key.md)
