---
title: 'Quickstart: Create an Azure Web PubSub service with a Bicep file'
description: Learn how to create an Azure Web PubSub service by using a Bicep file to create the resource, and PowerShell or Azure CLI for deployment to a resource group.
author: grminch
ms.author: lianwei
ms.date: 06/15/2022
ms.topic: quickstart
ms.service: azure-web-pubsub
ms.custom: subject-armqs, devx-track-azurecli, devx-track-bicep
---

# Quickstart: Use Bicep to deploy Azure Web PubSub service

This quickstart describes how to use Bicep to create an Azure Web PubSub service using Azure CLI or PowerShell.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/quickstart-bicep-template.md)

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the Bicep file

The template used in this quickstart is from [Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/azure-web-pubsub/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.web/azure-web-pubsub/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/quickstart-bicep-template.md)

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
