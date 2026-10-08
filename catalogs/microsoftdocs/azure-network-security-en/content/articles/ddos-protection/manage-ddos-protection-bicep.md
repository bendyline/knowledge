---
title: 'QuickStart: Create and configure Azure DDoS Network Protection - Bicep'
description: Learn how to create and enable an Azure DDoS Protection plan using Bicep.
services: ddos-protection
author: duongau
ms.service: azure-ddos-protection
ms.topic: quickstart
ms.custom: subject-armqs, mode-arm, devx-track-bicep
ms.author: duau
ms.date: 03/05/2026
# Customer intent: As a cloud infrastructure engineer, I want to create and configure an Azure DDoS protection plan using Bicep, so that I can effectively safeguard my virtual networks against DDoS attacks across multiple subscriptions.
---

# QuickStart: Create and configure Azure DDoS Network Protection using Bicep

This QuickStart describes how to use Bicep to create a distributed denial of service (DDoS) protection plan and virtual network, then enable the protection plan for the virtual network. An Azure DDoS Network Protection plan defines a set of virtual networks that have DDoS protection enabled across subscriptions. You can configure one DDoS protection plan for your organization and link virtual networks from multiple subscriptions to the same plan.

Diagram of DDoS Network Protection.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-bicep.md)

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the Bicep file

The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/create-and-enable-ddos-protection-plans).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/create-and-enable-ddos-protection-plans/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-bicep.md)

The Bicep file defines two resources:

- [Microsoft.Network/ddosProtectionPlans](https://learn.microsoft.com/azure/templates/microsoft.network/ddosprotectionplans)
- [Microsoft.Network/virtualNetworks](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks)

## Deploy the Bicep file

In this example, the Bicep file creates a new resource group, a DDoS protection plan, and a virtual network.

1. Save the Bicep file as **main.bicep** to your local computer.
1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters ddosProtectionPlanName=<plan-name> virtualNetworkName=<network-name>
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -ddosProtectionPlanName "<plan-name>" -virtualNetworkName "<network-name>"
    ```

    ---

    > **Note:**
    > Replace **\<plan-name\>** with a DDoS protection plan name. Replace **\<network-name\>** with a DDoS virtual network name.

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

> **Note:**
> To delete a DDoS protection plan, first dissociate all virtual networks from it.

## Next steps

To learn how to view and configure telemetry for your DDoS protection plan, continue to the tutorials.

> 
> [View and configure DDoS protection telemetry](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/telemetry.md)
