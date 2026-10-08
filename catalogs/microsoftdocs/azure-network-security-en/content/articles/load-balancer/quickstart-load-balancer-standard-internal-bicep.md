---
title: 'Quickstart: Create an internal Azure load balancer - Bicep'
description: This quickstart shows how to create an internal Azure load balancer using Bicep.
services: load-balancer
author: mbender-ms
ms.service: azure-load-balancer
ms.topic: quickstart
ms.author: mbender
ms.date: 01/28/2026
ms.custom: template-quickstart, subject-armqs, mode-arm, devx-track-bicep,engagement-fy23
# Customer intent: As a cloud architect, I want to create an internal load balancer using a Bicep file, so that I can efficiently distribute traffic among virtual machines in a secure network environment.
---

# Quickstart: Create an internal load balancer to load balance VMs using Bicep

In this quickstart, you learn to use a Bicep file to create an internal Azure load balancer. The internal load balancer distributes traffic to virtual machines in a virtual network located in the load balancer's backend pool. Along with the internal load balancer, this template creates a virtual network, network interfaces, a NAT Gateway, and an Azure Bastion instance.

Diagram of resources deployed for internal load balancer.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-bicep.md)

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the Bicep file

The Bicep file used in this quickstart is from the [Azure Quickstart Templates](https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.network/internal-loadbalancer-create/main.bicep).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/internal-loadbalancer-create/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-bicep.md)

Multiple Azure resources have been defined in the Bicep file:

- [**Microsoft.Network/virtualNetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualNetworks): Virtual network for load balancer and virtual machines.
- [**Microsoft.Network/networkInterfaces**](https://learn.microsoft.com/azure/templates/microsoft.network/networkInterfaces): Network interfaces for virtual machines.
- [**Microsoft.Network/loadBalancers**](https://learn.microsoft.com/azure/templates/microsoft.network/loadBalancers): Internal load balancer.
- [**Microsoft.Network/natGateways**](https://learn.microsoft.com/azure/templates/microsoft.network/natGateways)
- [**Microsoft.Network/publicIPAddresses**](https://learn.microsoft.com/azure/templates/microsoft.network/publicipaddresses): Public IP addresses for the NAT Gateway and Azure Bastion.
- [**Microsoft.Compute/virtualMachines**](https://learn.microsoft.com/azure/templates/microsoft.compute/virtualmachines): Virtual machines in the backend pool.
- [**Microsoft.Network/bastionHosts**](https://learn.microsoft.com/azure/templates/microsoft.network/bastionhosts): Azure Bastion instance.
- [**Microsoft.Network/virtualNetworks/subnets**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks/subnets): Subnets for the virtual network.
- [**Microsoft.Storage/storageAccounts**](https://learn.microsoft.com/azure/templates/microsoft.storage/storageaccounts): Storage account for the virtual machines.

## Deploy the Bicep file

1. Save the Bicep file as **main.bicep** to your local computer.
1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters adminUsername=AzureAdmin
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -adminUsername "<admin-user>"
    ```

    ---

    > **Note:**
    > Replace **\<admin-user\>** with the admin username. You'll also be prompted to enter **adminPassword**.

    When the deployment finishes, you should see a message indicating the deployment succeeded.

## Review deployed resources

Use the Azure portal, Azure CLI, or Azure PowerShell to list the deployed resources in the resource group.

# [CLI](#tab/CLI)

```azurecli-interactive
az resource list --resource-group exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Get-AzResource -ResourceGroupName exampleRG
```

---

## Clean up resources

When no longer needed, use the Azure portal, Azure CLI, or Azure PowerShell to delete the resource group and its resources.

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

For a step-by-step tutorial that guides you through the process of creating a Bicep file, see:

> 
> [Quickstart: Create Bicep files with Visual Studio Code](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/bicep/quickstart-create-bicep-use-visual-studio-code.md)
