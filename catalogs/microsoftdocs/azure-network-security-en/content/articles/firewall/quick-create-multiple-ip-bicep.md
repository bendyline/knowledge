---
title: 'Quickstart: Create an Azure Firewall with multiple public IP addresses - Bicep'
description: In this quickstart, you learn how to use a Bicep file to create an Azure Firewall with multiple public IP addresses.
author: mumian
ms.author: jgao
ms.service: azure-firewall
ms.topic: quickstart
ms.date: 03/29/2026
ms.custom:
  - subject-armqs
  - mode-arm
  - devx-track-bicep
  - sfi-image-nochange
# Customer intent: As a cloud architect, I want to deploy an Azure Firewall with multiple public IP addresses using a Bicep file, so that I can enable secure remote access to my virtual machines efficiently.
---

# Quickstart: Create an Azure Firewall with multiple public IP addresses - Bicep

In this quickstart, use a Bicep file to deploy an Azure Firewall with multiple public IP addresses from a public IP address prefix. The deployed firewall has NAT rule collection rules that allow RDP connections to two Windows Server 2019 virtual machines.

Diagram showing the network configuration for this quickstart.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/quick-create-multiple-ip-bicep.md)

For more information about Azure Firewall with multiple public IP addresses, see [Deploy an Azure Firewall with multiple public IP addresses using Azure PowerShell](deploy-multi-public-ip-powershell.md).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Review the Bicep file

This Bicep file creates an Azure Firewall with two public IP addresses, along with the necessary resources to support the Azure Firewall.

The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/fw-docs-qs).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/fw-docs-qs/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/quick-create-multiple-ip-bicep.md)

The template defines multiple Azure resources:

- [**Microsoft.Network/networkSecurityGroups**](https://learn.microsoft.com/azure/templates/microsoft.network/networksecuritygroups)
- [**Microsoft.Network/publicIPPrefix**](https://learn.microsoft.com/azure/templates/microsoft.network/publicipprefixes)
- [**Microsoft.Network/publicIPAddresses**](https://learn.microsoft.com/azure/templates/microsoft.network/publicipaddresses)
- [**Microsoft.Network/virtualNetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks)
- [**Microsoft.Compute/virtualMachines**](https://learn.microsoft.com/azure/templates/microsoft.compute/virtualmachines)
- [**Microsoft.Storage/storageAccounts**](https://learn.microsoft.com/azure/templates/microsoft.storage/storageAccounts)
- [**Microsoft.Network/networkInterfaces**](https://learn.microsoft.com/azure/templates/microsoft.network/networkinterfaces)
- [**Microsoft.Network/azureFirewalls**](https://learn.microsoft.com/azure/templates/microsoft.network/azureFirewalls)
- [**Microsoft.Network/routeTables**](https://learn.microsoft.com/azure/templates/microsoft.network/routeTables)

## Deploy the Bicep file

1. Save the Bicep file as **main.bicep** on your local computer.
1. Deploy the Bicep file by using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters adminUsername=<admin-username>
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -adminUsername "<admin-username>"
    ```

    ---

    > **Note:**
    > Replace **\<admin-username\>** with the admin username for the backend server.

    You're prompted to enter the admin password.

    When the deployment finishes, you see a message indicating the deployment succeeded.

## Validate the deployment

In the Azure portal, review the deployed resources. Note the firewall public IP addresses.

Use Remote Desktop Connection to connect to the firewall public IP addresses. A successful connection demonstrates firewall NAT rules that allow the connection to the backend servers.

## Clean up resources

When you no longer need the resources that you created with the firewall, delete the resource group. This action removes the firewall and all the related resources.

To delete the resource group, use the `Remove-AzResourceGroup` cmdlet:

```azurepowershell-interactive
Remove-AzResourceGroup -Name "exampleRG"
```

## Next steps

> 
> [Tutorial: Deploy and configure Azure Firewall in a hybrid network using the Azure portal](tutorial-hybrid-portal.md)
