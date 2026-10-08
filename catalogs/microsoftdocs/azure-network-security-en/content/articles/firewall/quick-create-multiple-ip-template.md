---
title: 'Quickstart: Create an Azure Firewall with multiple public IP addresses - Resource Manager template'
description: In this quickstart, you learn how to use an Azure Resource Manager template (ARM template) to create an Azure Firewall with multiple public IP addresses.
author: duongau
ms.author: duau
ms.service: azure-firewall
ms.topic: quickstart
ms.date: 03/29/2026
ms.custom: subject-armqs, mode-arm, devx-track-arm-template
# Customer intent: As a network engineer, I want to use an Azure Resource Manager template to deploy an Azure Firewall with multiple public IP addresses, so that I can effectively manage remote connections to my virtual machines.
---

# Quickstart: Create an Azure Firewall with multiple public IP addresses - ARM template

In this quickstart, use an Azure Resource Manager template (ARM template) to deploy an Azure Firewall with multiple public IP addresses from a public IP address prefix. The deployed firewall has NAT rule collection rules that allow RDP connections to two Windows Server 2019 virtual machines.


Diagram showing the network configuration for this quickstart.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/quick-create-multiple-ip-template.md)

For more information about Azure Firewall with multiple public IP addresses, see [Deploy an Azure Firewall with multiple public IP addresses using Azure PowerShell](deploy-multi-public-ip-powershell.md).

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template opens in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Review the template

This template creates an Azure Firewall with two public IP addresses, along with the resources needed to support the Azure Firewall.

The template used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/fw-docs-qs).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/fw-docs-qs/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/quick-create-multiple-ip-template.md)

The template defines multiple Azure resources, including:

- [**Microsoft.Network/networkSecurityGroups**](https://learn.microsoft.com/azure/templates/microsoft.network/networksecuritygroups?pivots=deployment-language-arm-template)
- [**Microsoft.Network/publicIPPrefix**](https://learn.microsoft.com/azure/templates/microsoft.network/publicipprefixes?pivots=deployment-language-arm-template)
- [**Microsoft.Network/publicIPAddresses**](https://learn.microsoft.com/azure/templates/microsoft.network/publicipaddresses?pivots=deployment-language-arm-template)
- [**Microsoft.Network/virtualNetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks?pivots=deployment-language-arm-template)
- [**Microsoft.Compute/virtualMachines**](https://learn.microsoft.com/azure/templates/microsoft.compute/virtualmachines?pivots=deployment-language-arm-template)
- [**Microsoft.Storage/storageAccounts**](https://learn.microsoft.com/azure/templates/microsoft.storage/storageAccounts?pivots=deployment-language-arm-template)
- [**Microsoft.Network/networkInterfaces**](https://learn.microsoft.com/azure/templates/microsoft.network/networkinterfaces?pivots=deployment-language-arm-template)
- [**Microsoft.Network/azureFirewalls**](https://learn.microsoft.com/azure/templates/microsoft.network/azureFirewalls?pivots=deployment-language-arm-template)
- [**Microsoft.Network/routeTables**](https://learn.microsoft.com/azure/templates/microsoft.network/routeTables?pivots=deployment-language-arm-template)

## Deploy the template

Deploy the ARM template to Azure:

1. Select **Deploy to Azure** to sign in to Azure and open the template. The template creates an Azure Firewall, the network infrastructure, and two virtual machines.

   Button to deploy the Resource Manager template to Azure.

1. In the portal, on **Create an Azure Firewall with multiple IP public addresses**, enter or select the following values:
   - **Subscription**: Select from existing subscriptions.
   - **Resource group**: Select from existing resource groups or select **Create new**, and select **OK**.
   - **Location**: Select a location.
   - **Admin Username**: Enter a username for the administrator user account.
   - **Admin Password**: Enter an administrator password or key.

1. Select **I agree to the terms and conditions stated above** and then select **Purchase**. The deployment can take 10 minutes or longer to complete.

## Validate the deployment

In the Azure portal, review the deployed resources. Note the firewall public IP addresses.

Use Remote Desktop Connection to connect to the firewall public IP addresses. Successful connections demonstrate firewall NAT rules that allow the connection to the backend servers.

## Clean up resources

When you no longer need the resources that you created with the firewall, delete the resource group. Deleting the resource group removes the firewall and all the related resources.

To delete the resource group, call the `Remove-AzResourceGroup` cmdlet:

```azurepowershell-interactive
Remove-AzResourceGroup -Name "<your resource group name>"
```

## Next steps

> 
> [Tutorial: Deploy and configure Azure Firewall in a hybrid network using the Azure portal](tutorial-hybrid-portal.md)
