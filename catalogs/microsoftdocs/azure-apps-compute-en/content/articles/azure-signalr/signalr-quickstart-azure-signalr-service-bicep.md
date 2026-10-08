---
title: 'Quickstart: Create an Azure SignalR Service - Bicep'
description: In this quickstart, learn how to create an Azure SignalR Service using Bicep.
author: vicancy
ms.author: lianwei
ms.date: 05/18/2022
ms.topic: quickstart
ms.service: azure-signalr-service
ms.custom: subject-armqs, mode-arm, devx-track-bicep
---

# Quickstart: Use Bicep to deploy Azure SignalR Service

This quickstart describes how to use Bicep to create an Azure SignalR Service using Azure CLI or PowerShell.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/signalr-quickstart-azure-signalr-service-bicep.md)

## Prerequisites

An Azure account with an active subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Review the Bicep file

The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/signalr/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.signalrservice/signalr/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/signalr-quickstart-azure-signalr-service-bicep.md)

The Bicep file defines one Azure resource:

* [**Microsoft.SignalRService/SignalR**](https://learn.microsoft.com/azure/templates/microsoft.signalrservice/signalr)

## Deploy the Bicep file

1. Save the Bicep file as **main.bicep** to your local computer.
1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep
    ```

    ---

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

For a step-by-step tutorial that guides you through the process of creating a Bicep file using Visual Studio Code, see:

> 
> [Quickstart: Create Bicep files with Visual Studio Code](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/bicep/quickstart-create-bicep-use-visual-studio-code.md)
