---
title: 'QuickStart: Create and configure Azure DDoS IP Protection - ARM template'
description: Learn how to create and enable Azure DDoS IP Protection using an Azure Resource Manager template (ARM template).
services: ddos-protection
author: duongau
ms.service: azure-ddos-protection
ms.topic: quickstart
ms.custom: mode-arm, devx-track-arm-template
ms.author: duau
ms.date: 03/05/2026
# Customer intent: As a network administrator, I want to deploy a DDoS IP Protection using an ARM template, so that I can safeguard my public IP addresses against distributed denial-of-service attacks.
---

# QuickStart: Create and configure Azure DDoS IP Protection using ARM template

In this QuickStart, you'll learn how to use an Azure Resource Manager template (ARM template) to create an IP address, then enable distributed denial of service (DDoS) IP Protection. Azure DDoS IP Protection is a pay-per-protected IP model that contains the same core engineering features as DDoS Network Protection.

Diagram of DDoS IP Protection protecting the Public IP address.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-ip-protection-template.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template will open in the Azure portal.

Button to deploy the Resource Manager template to Azure.


## Prerequisites

- If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


## Review the template

This template creates a single Standard SKU public IP with DDoS IP Protection enabled. The template used in this quickstart is from [Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/pip-with-ddos-ip-protection/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/pip-with-ddos-ip-protection/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-ip-protection-template.md)

The template defines one resource:

- [Microsoft.Network/publicIPAddresses](https://learn.microsoft.com/azure/templates/microsoft.network/change-log/publicipaddresses)

## Deploy the template

In this example, the template creates a new resource group and a Standard SKU public IP address with DDoS IP Protection enabled.

1. To sign in to Azure and open the template, select the **Deploy to Azure** button.

    Button to deploy the Resource Manager template to Azure.

1. Enter the values to create a new resource group, Public IP address, and enable DDoS IP Protection.

    Screenshot of DDoS IP Protection ARM template quickstart template.

    - **Subscription**: Name of the Azure subscription where the resources will be deployed.
    - **Resource group**: Select an existing resource group. In this example, we'll create a new *Resource group*. Select **Create new**, enter **MyResourceGroup**, then select **OK**.
    - **Region**: The region where the resource group is deployed. In this example, we'll select **East US**.
    - **Public Ip Name**: The name of the new Public IP Address. In this example, we'll enter **myStandardPublicIP**
    - **Sku**: SKU of the Public IP Address. In this example, we'll select **Standard**.  
    - **Public IP Allocation Method**: The Allocation Method used for the Public IP Address. In this example, we'll select **Static**. 
    - **Tier**: SKU Tier of the Public IP Address. In this example, we'll select **Regional**.
    - **Ddos Protection Mode**: DDoS Protection Mode of the Public IP Address. In this example, we'll select **Enabled**.
    - **Location**: Specify a location for the resources. In this example, we'll leave as default.

1. Select **Review + create**.
1. Verify that template validation passed and select **Create** to begin the deployment.

> **Note:**
> DDoS IP Protection is enabled only on Public IP Standard SKU.

## Review deployed resources

To copy the Azure CLI or Azure PowerShell command, select the **Copy** button. The **Try it** button opens Azure Cloud Shell to run the command.

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
#Gets the public IP address
$publicIp = Get-AzPublicIpAddress -Name myStandardPublicIP -ResourceGroupName MyResourceGroup 

#Checks and returns the status of the public IP address
 $publicIp


```

# [CLI](#tab/CLI)

```azurecli-interactive
    az network public-ip show \
        --resource-group MyResourceGroup \
        --name myStandardPublicIP \
```
---

The output shows the new resource and *protectionModeDDoS* shows IP Protection is **Enabled**.

# [PowerShell](#tab/PowerShell)

```Output
Name                     : myStandardPublicIP
ResourceGroupName        : MyResourceGroup
Location                 : eastus
Id                       : /subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/MyResourceGroup/providers/Microsoft.Network/publicIPAddresses/myStandardPublicIP
Etag                     : W/"aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e"
ResourceGuid             : aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e
ProvisioningState        : Succeeded
Tags                     : 
PublicIpAllocationMethod : Static
IpAddress                : 20.168.244.236
PublicIpAddressVersion   : IPv4
IdleTimeoutInMinutes     : 4
IpConfiguration          : null
DnsSettings              : null
DdosSettings             : {"ProtectionMode": "Enabled"}
Zones                    : {}
Sku                      : {"Name": "Standard","Tier": "Regional"}
IpTags                   : []
ExtendedLocation         : null
```

# [CLI](#tab/CLI)

```Output
{
  "ddosSettings": {
    "protectionMode": "Enabled"
  },
  "etag": "W/\"aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e\"",
  "id": "/subscriptions/bbbb1b1b-cc2c-dd3d-ee4e-ffffff5f5f5f/resourceGroups/MyResourceGroup/providers/Microsoft.Network/publicIPAddresses/myStandardPublicIP",
  "idleTimeoutInMinutes": 4,
  "ipAddress": "10.25.14.83",
  "ipTags": [],
  "location": "eastus",
  "name": "myStandardPublicIP",
  "provisioningState": "Succeeded",
  "publicIPAddressVersion": "IPv4",
  "publicIPAllocationMethod": "Static",
  "resourceGroup": "MyResourceGroup",
  "resourceGuid": "bbbb1b1b-cc2c-dd3d-ee4e-ffffff5f5f5f",
  "sku": {
    "name": "Standard",
    "tier": "Regional"
  },
  "type": "Microsoft.Network/publicIPAddresses"
}

```
---

## Clean up resources

When you're finished, you can delete the resources. The command deletes the resource group and all the resources it contains.

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name 'MyResourceGroup'
```

# [CLI](#tab/CLI)

```azurecli-interactive
az group delete --name MyResourceGroup
```
---

## Next steps

To learn how to view and configure telemetry for your protected public IP address, continue to the tutorials.

> 
> [View and configure DDoS protection telemetry](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/telemetry.md)
