---
title: Azure Quickstart - Create a Batch account - Azure Resource Manager template
description: This quickstart shows how to create a Batch account by using an ARM template.
ms.date: 06/16/2026
ms.topic: quickstart
ms.custom: subject-armqs, mode-arm, devx-track-arm-template
# Customer intent: "As a cloud developer, I want to deploy a Batch account using an ARM template, so that I can manage compute resources and workloads efficiently in my Azure environment."
---

# Quickstart: Create a Batch account by using ARM template

Get started with Azure Batch by using an Azure Resource Manager template (ARM template) to create a Batch account, including storage. You need a Batch account to create compute resources (pools of compute nodes) and Batch jobs. You can link an Azure Storage account with your Batch account, which is useful to deploy applications and store input and output data for most real-world workloads.

After completing this quickstart, you'll understand the key concepts of the Batch service and be ready to try Batch with more realistic workloads at larger scale.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-create-template.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template opens in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

You must have an active Azure subscription.

- [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-create-template.md)

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/batchaccount-with-storage/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.batch/batchaccount-with-storage/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-create-template.md)

Two Azure resources are defined in the template:

- [Microsoft.Storage/storageAccounts](https://learn.microsoft.com/azure/templates/microsoft.storage/storageaccounts): Creates a storage account.
- [Microsoft.Batch/batchAccounts](https://learn.microsoft.com/azure/templates/microsoft.batch/batchaccounts): Creates a Batch account.

## Deploy the template

1. Select the following image to sign in to Azure and open a template. The template creates an Azure Batch account and a storage account.

   Button to deploy the Resource Manager template to Azure.

1. Select or enter the following values.

   Resource Manager template, Batch account creation, deploy portal

   - **Subscription**: select an Azure subscription.
   - **Resource group**: select **Create new**, enter a unique name for the resource group, and then click **OK**.
   - **Location**: select a location. For example, **Central US**.
   - **Batch Account Name**: Leave the default value.
   - **Storage Accountsku**: select a storage account type. For example, **Standard_LRS**.
   - **Location**: Leave the default so that the resources are in the same location as your resource group.

1. Select **Review + create**, then select **Create**.

After a few minutes, you should see a notification that the Batch account was successfully created.

In this example, the Azure portal is used to deploy the template. In addition to the Azure portal, you can also use the Azure PowerShell, Azure CLI, and REST API. To learn other deployment methods, see [Deploy templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-powershell.md).

## Validate the deployment

You can validate the deployment in the Azure portal by navigating to the resource group you created. In the **Overview** screen, confirm that the Batch account and the storage account are present.

## Clean up resources

If you plan to continue with more [tutorials](tutorial-parallel-dotnet.md), you might want to leave these resources in place. Or, if you no longer need them, you can [delete the resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/delete-resource-group.md?tabs=azure-portal#delete-resource-group), which also deletes the Batch account and the storage account that you created.

## Next steps

In this quickstart, you created a Batch account and a storage account. To learn more about Azure Batch, continue to the Azure Batch tutorials.

> 
> [Azure Batch tutorials](tutorial-parallel-dotnet.md)
