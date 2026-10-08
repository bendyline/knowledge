---
title: 'Quickstart: Create an Azure Firewall with Availability Zones - Bicep'
description: In this quickstart, you deploy Azure Firewall using Bicep. The virtual network has one virtual network with three subnets. Two Windows Server virtual machines, a jump box, and a server are deployed.
author: duongau
ms.author: duau
ms.service: azure-firewall
ms.topic: quickstart
ms.date: 03/28/2026
ms.custom: subject-armqs, mode-arm, devx-track-bicep
# Customer intent: "As a cloud administrator, I want to deploy an Azure Firewall using Bicep in a virtual network with multiple subnets, so that I can manage network security effectively and ensure high availability across Availability Zones."
---

# Quickstart: Deploy Azure Firewall with Availability Zones - Bicep

In this quickstart, use Bicep to deploy an Azure Firewall in three Availability Zones.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/deploy-bicep.md)

The Bicep file creates a test network environment with a firewall. The network has one virtual network with three subnets: *AzureFirewallSubnet*, *ServersSubnet*, and *JumpboxSubnet*. The *ServersSubnet* and *JumpboxSubnet* subnets each have a single, two-core Windows Server virtual machine.

The firewall is in the *AzureFirewallSubnet* subnet, and has an application rule collection with a single rule that allows access to `www.microsoft.com`.

A user-defined route points network traffic from the *ServersSubnet* subnet through the firewall, where the firewall rules are applied.

For more information about Azure Firewall, see [Deploy and configure Azure Firewall using the Azure portal](tutorial-firewall-deploy-portal.md).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Review the Bicep file

This Bicep file creates an Azure Firewall with Availability Zones, along with the necessary resources to support the Azure Firewall.

The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/azurefirewall-with-zones-sandbox).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/azurefirewall-with-zones-sandbox/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/deploy-bicep.md)

The Bicep file defines multiple Azure resources, including:

- [**Microsoft.Storage/storageAccounts**](https://learn.microsoft.com/azure/templates/microsoft.storage/storageAccounts)
- [**Microsoft.Network/routeTables**](https://learn.microsoft.com/azure/templates/microsoft.network/routeTables)
- [**Microsoft.Network/networkSecurityGroups**](https://learn.microsoft.com/azure/templates/microsoft.network/networksecuritygroups)
- [**Microsoft.Network/virtualNetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks)
- [**Microsoft.Network/publicIPAddresses**](https://learn.microsoft.com/azure/templates/microsoft.network/publicipaddresses)
- [**Microsoft.Network/networkInterfaces**](https://learn.microsoft.com/azure/templates/microsoft.network/networkinterfaces)
- [**Microsoft.Compute/virtualMachines**](https://learn.microsoft.com/azure/templates/microsoft.compute/virtualmachines)
- [**Microsoft.Network/azureFirewalls**](https://learn.microsoft.com/azure/templates/microsoft.network/azureFirewalls)

## Deploy the Bicep file

1. Save the Bicep file as `main.bicep` on your local computer.
1. Deploy the Bicep file by using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters adminUsername=<admin-user>
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -adminUsername "<admin-user>"
    ```

    ---

    > **Note:**
    > Replace **\<admin-user\>** with the administrator sign-in username for the virtual machine. You're prompted to enter **adminPassword**.

  When the deployment finishes, you see a message indicating the deployment succeeded.

## Review deployed resources

Use the Azure portal, Azure CLI, or Azure PowerShell to validate the deployment and review the deployed resources.

# [CLI](#tab/CLI)

```azurecli-interactive
az resource list --resource-group exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Get-AzResource -ResourceGroupName exampleRG
```

---

To learn about the syntax and properties for a firewall in a Bicep file, see [Microsoft.Network/azureFirewalls](https://learn.microsoft.com/azure/templates/microsoft.network/azurefirewalls).

## Clean up resources

When you no longer need the resources, use the Azure portal, Azure CLI, or Azure PowerShell to remove the resource group, firewall, and all related resources.

# [CLI](#tab/CLI)

```azurecli-interactive
az group delete --name exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name exampleRG
```

---

## Next steps

Next, you can monitor the Azure Firewall logs.

> 
> [Tutorial: Monitor Azure Firewall logs](monitor-firewall.md)
