---
title: Create an Azure IoT Hub
titleSuffix: Azure IoT Hub
description: Learn how to create, manage, and delete Azure IoT hubs through the Azure portal, the Azure CLI, and PowerShell. Includes information about retrieving the service connection string.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.topic: how-to
ms.date: 06/25/2025
ms.custom:
  - 'Role: Cloud Development'
  - sfi-ropc-nochange
---

# Create and manage Azure IoT hubs

This article explains how to create an IoT hub without Azure Device Registry and certificate management integration. If you want to create an IoT hub integrated with these preview features, see [Get started with Device Registry and certificate management in IoT Hub (Preview)](iot-hub-device-registry-setup.md).

## Prerequisites

Prepare the following prerequisites, depending on which tool you use.

### [Azure portal](#tab/portal)

Access to the [Azure portal](https://portal.azure.com).

### [Azure CLI](#tab/cli)

* The Azure CLI installed on your development machine. If you don't have the Azure CLI, follow the steps provided in [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).

* A resource group in your Azure subscription. If you want to create a new resource group, use the [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) command:

  ```azurecli-interactive
  az group create --name <RESOURCE_GROUP_NAME> --location <REGION>
  ```

### [Azure PowerShell](#tab/powershell)

* Azure PowerShell installed on your development machine. If you don't have Azure PowerShell, follow the steps provided in [Install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell).
* A resource group in your Azure subscription. If you want to create a new resource group, use the [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.Resources/New-azResourceGroup) command:

   ```azurepowershell-interactive
   New-AzResourceGroup -Name <RESOURCE_GROUP_NAME> -Location "<REGION>"
   ```

---

## Create an IoT hub

### [Azure portal](#tab/portal)


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


### [Azure CLI](#tab/cli)

Use the [az iot hub create](https://learn.microsoft.com/cli/azure/iot/hub#az-iot-hub-create) command to create an IoT hub in your resource group. Use a globally unique name for your IoT hub. For example:

```azurecli-interactive
az iot hub create --name <NEW_NAME_FOR_YOUR_IOT_HUB> --resource-group <RESOURCE_GROUP_NAME> --sku S1
```

> **Important:**
> Because the IoT hub will be publicly discoverable as a DNS endpoint, be sure to avoid entering any sensitive or personally identifiable information when you name it.
>


The previous command creates an IoT hub in the S1 pricing tier. For more information, see [Azure IoT Hub pricing](https://azure.microsoft.com/pricing/details/iot-hub/).

### [Azure PowerShell](#tab/powershell)

Use the [New-AzIotHub](https://learn.microsoft.com/powershell/module/az.IotHub/New-azIotHub) command to create an IoT hub in your resource group. The name of the IoT hub must be globally unique. For example:

```azurepowershell-interactive
New-AzIotHub `
    -ResourceGroupName <RESOURCE_GROUP_NAME> `
    -Name <NEW_NAME_FOR_YOUR_IOT_HUB> `
    -SkuName S1 -Units 1 `
    -Location "<REGION>"
```

> **Important:**
> Because the IoT hub will be publicly discoverable as a DNS endpoint, be sure to avoid entering any sensitive or personally identifiable information when you name it.
>


The previous command creates an IoT hub in the S1 pricing tier. For more information, see [Azure IoT Hub pricing](https://azure.microsoft.com/pricing/details/iot-hub/).

---

## Connect to an IoT hub

Provide access permissions to applications and services that use IoT Hub functionality.

### Connect with a connection string

Connection strings are tokens that grant devices and services permissions to connect to IoT Hub based on shared access policies. Connection strings are an easy way to get started with IoT Hub and are used in many samples and tutorials. We don't recommend them for production scenarios.

For most sample scenarios, the service policy is sufficient. The service policy grants Service Connect permissions to access service endpoints. For more information about the other built-in shared access policies, see [Access control and permissions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-dev-guide-sas.md#access-control-and-permissions).

To get the IoT Hub connection string for the service policy, follow these steps:

#### [Azure portal](#tab/portal)

1. In the [Azure portal](https://portal.azure.com), select **Resource groups**. Select the resource group where your hub is located, and then select your hub from the list of resources.

1. On the service menu of your IoT hub, under **Security settings**, select **Shared access policies**.

1. From the list of policies, select the **service** policy.

1. Copy the primary connection string, and save the value.

#### [Azure CLI](#tab/cli)

Use the [az iot hub connection-string show](https://learn.microsoft.com/cli/azure/iot/hub/connection-string#az-iot-hub-connection-string-show) command to get a connection string for your IoT hub that grants the service policy permissions.

```azurecli-interactive
az iot hub connection-string show --hub-name <YOUR_IOT_HUB_NAME> --policy-name service
```

The service connection string should look similar to the following example:

```text
"HostName=<IOT_HUB_NAME>.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=<SHARED_ACCESS_KEY>"
```

#### [Azure PowerShell](#tab/powershell)

Use the [Get-AzIotHubConnectionString](https://learn.microsoft.com/powershell/module/az.iothub/get-aziothubconnectionstring) command to get a connection string for your IoT hub that grants the service policy permissions.

```azurepowershell-interactive
Get-AzIotHubConnectionString -ResourceGroupName "<YOUR_RESOURCE_GROUP>" -Name "<YOUR_IOT_HUB_NAME>" -KeyName "service"
```

The service connection string should look similar to the following example:

```text
"HostName=<IOT_HUB_NAME>.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=<SHARED_ACCESS_KEY>"
```

---

### Connect with role assignments

Authenticating access by using Microsoft Entra ID and controlling permissions by using Azure role-based access control provides improved security and ease of use over security tokens. To minimize potential security issues inherent in security tokens, we recommend that you enforce Microsoft Entra authentication whenever possible. For more information, see [Control access to IoT Hub by using Microsoft Entra ID](authenticate-authorize-azure-ad.md).

## Delete an IoT hub

When you delete an IoT hub, you lose the associated device identity registry. If you want to move or upgrade an IoT hub, or delete an IoT hub but keep the devices, consider [migrating an IoT hub by using the Azure CLI](migrate-hub-state-cli.md).

### [Azure portal](#tab/portal)

To delete an IoT hub, open your IoT hub in the Azure portal, and then choose **Delete**.

Screenshot that shows where to find the Delete button for an IoT hub in the Azure portal.

### [Azure CLI](#tab/cli)

To delete an IoT hub, run the [az iot hub delete](https://learn.microsoft.com/cli/azure/iot/hub#az-iot-hub-delete) command:

```azurecli-interactive
az iot hub delete --name <IOT_HUB_NAME> --resource-group <RESOURCE_GROUP_NAME>
```

### [Azure PowerShell](#tab/powershell)

To delete the IoT hub, use the [Remove-AzIotHub](https://learn.microsoft.com/powershell/module/az.iothub/remove-aziothub) command:

```azurepowershell-interactive
Remove-AzIotHub `
    -ResourceGroupName MyIoTRG1 `
    -Name MyTestIoTHub
```

---

## Other tools for managing IoT hubs

In addition to the Azure portal and the Azure CLI, the following tools are available to help you work with IoT hubs in whichever way supports your scenario:

* **IoT Hub resource provider REST API**: Use the [IoT Hub Resource](https://learn.microsoft.com/rest/api/iothub/iot-hub-resource) set of operations.
* **Azure Resource Manager templates, Bicep, or Terraform**: Use the [Microsoft.Devices/IoTHubs](https://learn.microsoft.com/azure/templates/microsoft.devices/iothubs) resource type. For examples, see [IoT Hub sample templates](https://learn.microsoft.com/samples/browse/?terms=iot%20hub\&languages=bicep%2Cjson).
* **Visual Studio Code**: Use the [Azure IoT Hub extension for Visual Studio Code](reference-iot-hub-extension.md).
