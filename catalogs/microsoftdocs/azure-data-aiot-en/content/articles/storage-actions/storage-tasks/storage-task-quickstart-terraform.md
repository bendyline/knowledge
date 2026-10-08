---
title: 'Quickstart: Create a storage task using Terraform'
titleSuffix: Azure Storage Actions Preview
description: Learn how to create a storage task using Terraform. A storage task can perform on blobs in one or more Azure Storage accounts. 
author: normesta
ms.service: azure-storage-actions
ms.custom: devx-track-terraform;build-2023-metadata-update
ms.topic: quickstart
ms.author: normesta
ms.date: 05/05/2025
#customer intent: As a Terraform user, I want to see how to create a storage task using Terraform.
content_well_notification: 
  - AI-contribution
---

# Quickstart: Create a storage task using Terraform

A storage task can perform operations on blobs in an Azure Storage account. As you create a task, you can define the conditions that must be met by each object (container or blob), and the operations to perform on the object. You can also identify one or more Azure Storage account targets. See [What are Azure Storage Actions?](../overview.md)

In this how-to article, you learn how to create a storage task using Terraform.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-terraform.md)

In this article, you learn how to:

> 
> * Generate a random name for the resource group.
> * Create a new Azure resource group with the generated name.
> * Generate a random string to be used as the storage task name.
> * Calculate a future date by offsetting the current date by a certain number of days.
> * Create a new Azure API resource of type "Microsoft.StorageActions/storageTasks".
> * Specify the required providers for Terraform, including their sources and versions.
> * Configure the Azure provider with specific features.
> * Define several variables, including the location of the resource group, the prefix for the resource group name, the number of offset days, and the description of the storage task.

## Prerequisites

- Create an Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

## Implement the Terraform code

The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-azure-storage-actions-create-storage-task). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-azure-storage-actions-create-storage-task/TestRecord.md). See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test and run the sample Terraform code, and make it the current directory.

1. Create a file named `providers.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-storage-actions-create-storage-task/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-terraform.md)

1. Create a file named `main.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-storage-actions-create-storage-task/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-terraform.md)

1. Create a file named `variables.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-storage-actions-create-storage-task/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-terraform.md)

1. Create a file named `outputs.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-storage-actions-create-storage-task/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-terraform.md)

> **Important:**
> If you're using the 4.x azurerm provider, you must [explicitly specify the Azure subscription ID](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/4.0-upgrade-guide#specifying-subscription-id-is-now-mandatory) to authenticate to Azure before running the Terraform commands.
>
> One way to specify the Azure subscription ID without putting it in the `providers` block is to specify the subscription ID in an environment variable named `ARM_SUBSCRIPTION_ID`.
>
> For more information, see the [Azure provider reference documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs#argument-reference).

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-terraform.md)

## Verify the results

#### [Azure PowerShell](#tab/azure-powershell)

1. Get the Azure resource group name.

    ```console
    $resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the storage task name.

    ```console
    $storage_task_name=$(terraform output -raw storage_task_name)
    ```

1. Run [Get-AzStorageActionTask](https://learn.microsoft.com/powershell/module/az.storageaction/get-azstorageactiontask) to get the storage task properties.

    ```azurepowershell
    Get-AzStorageActionTask -Name $storage_task_name -ResourceGroupName $resource_group_name
    ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage-actions/storage-tasks/storage-task-quickstart-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot).

## Next steps

[Create and manage a storage task assignment](storage-task-assignment-create.md)
