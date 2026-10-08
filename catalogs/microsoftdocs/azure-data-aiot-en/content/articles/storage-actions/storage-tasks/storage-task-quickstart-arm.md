---
title: 'Quickstart: Create a storage task by using an Azure Resource Manager template (ARM template)'
titleSuffix: Azure Storage Actions
description: Learn how to create a storage task by using Azure Resource Manager template (ARM template).
ms.service: azure-storage-actions
author: normesta
ms.author: normesta
ms.topic: quickstart-arm
ms.custom: subject-armqs
ms.date: 05/05/2025
---

# Create a storage task by using Azure Resource Manager template (ARM template)

This quickstart describes how to create a storage task by using an Azure Resource Manager template (ARM template).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-arm.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the
**Deploy to Azure** button. The template will open in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/storage-task/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.storage.actions/storage-task/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-arm.md)

## Deploy the template

1. Select the following link to sign in to Azure and open a template. The template creates a key vault and a secret.

    Button to deploy the Resource Manager template to Azure.

2. Specify the subscription, resource group, and the storage task name. Then, select **Review + create** to deploy the template.

  You can also use the Azure PowerShell, Azure CLI, and REST API. To learn other deployment methods, see [Deploy templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-powershell.md).

## Review deployed resources

1. In the Azure portal, search for _Storage Tasks_. Then, under **Services**, select **Storage tasks - Azure Storage Actions**.

2. In the list of storage tasks, search for the name of the storage task that you deployed.

   > 
   > Screenshot of the deployed storage task as it appears in the Azure portal.


## Clean up resources

When no longer needed, delete the resource group. The resource group and all the resources in the
resource group are deleted. Use the following command to delete the resource group and all its contained resources.

### [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az group delete --name <resource-group-name>
```

### [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name <resource-group-name>
```

---

Replace `<resource-group-name>` with the name of your resource group.

## Next steps

Assign a storage task to a storage account.

> 
> [Create and manage a storage task assignment](storage-task-assignment-create.md)
