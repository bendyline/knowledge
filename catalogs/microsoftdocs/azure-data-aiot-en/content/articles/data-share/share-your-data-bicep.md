---
title: 'Share outside your org (Bicep) - Azure Data Share quickstart'
description: Learn how to share data with customers and partners using Azure Data Share and Bicep.
author: chvukosw 
ms.author: chvukosw 
ms.service: azure-data-share
ms.topic: quickstart
ms.date: 01/21/2026
ms.custom: subject-armqs, mode-arm, devx-track-bicep
---

# Quickstart: Share data using Azure Data Share and Bicep

Learn how to set up a new Azure Data Share from an Azure storage account using Bicep, and start sharing your data with customers and partners outside of your Azure organization. For a list of the supported data stores, see [Supported data stores in Azure Data Share](supported-data-stores.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-share/share-your-data-bicep.md)

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the Bicep file

The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/data-share-share-storage-account/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.datashare/data-share-share-storage-account/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-share/share-your-data-bicep.md)

The following resources are defined in the Bicep file:

* [Microsoft.Storage/storageAccounts](https://learn.microsoft.com/azure/templates/microsoft.storage/storageaccounts):
* [Microsoft.Storage/storageAccounts/blobServices/containers](https://learn.microsoft.com/azure/templates/microsoft.storage/storageaccounts/blobservices/containers)
* [Microsoft.DataShare/accounts](https://learn.microsoft.com/azure/templates/microsoft.datashare/accounts)
* [Microsoft.DataShare/accounts/shares](https://learn.microsoft.com/azure/templates/microsoft.datashare/accounts/shares)
* [Microsoft.Storage/storageAccounts/providers/roleAssignments](https://learn.microsoft.com/azure/templates/microsoft.authorization/roleassignments)
* [Microsoft.DataShare/accounts/shares/dataSets](https://learn.microsoft.com/azure/templates/microsoft.datashare/accounts/shares/datasets)
* [Microsoft.DataShare/accounts/shares/invitations](https://learn.microsoft.com/azure/templates/microsoft.datashare/accounts/shares/invitations)
* [Microsoft.DataShare/accounts/shares/synchronizationSettings](https://learn.microsoft.com/azure/templates/microsoft.datashare/accounts/shares/synchronizationsettings)

## Deploy the Bicep file

1. Save the Bicep file as **main.bicep** to your local computer.
1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters projectName=<project-name> invitationEmail=<invitation-email>
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -projectName "<project-name>" -invitationEmail "<invitation-email>"
    ```

    ---

    > **Note:**
    > Replace **\<project-name\>** with a project name. The project name is used to generate resource names. Replace **\<invitation-email\>** with an email address for receiving data share invitations.

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

## Next step

In this quickstart, you learned how to create an Azure data share and invite recipients. To learn more about how a data consumer can accept and receive a data share, continue to the [accept and receive data](subscribe-to-data-share.md) tutorial.
