---
title: 'Deploy an Azure Batch account and two pools with a start task - Terraform'
description: In this article, you deploy an Azure Batch account and two pools with a start task using Terraform.
ms.topic: quickstart
ms.date: 06/16/2026
ms.custom: devx-track-terraform
ms.service: azure-batch
author: Padmalathas
ms.author: padmalathas
content_well_notification: 
  - AI-contribution
ai-usage: ai-assisted
# Customer intent: As a Terraform user, I want to deploy an Azure Batch account and associated resources, so that I can efficiently manage and process large-scale tasks using cloud infrastructure.
---

# Deploy an Azure Batch account and two pools with a start task - Terraform

In this quickstart, you create an Azure Batch account, an Azure Storage account, and two Batch pools using Terraform. Batch is a cloud-based job scheduling service that parallelizes and distributes the processing of large volumes of data across many computers. It's typically used for tasks like rendering 3D graphics, analyzing large datasets, or processing video. In this case, the resources created include a Batch account (which is the central organizing entity for distributed processing tasks), a Storage account for holding the data to be processed, and two Batch pools, which are groups of virtual machines that execute the tasks.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-deploy-batch-account-two-pools-start-task-terraform.md)

> 
> * Specify the required version of Terraform and the required providers.
> * Define the Azure provider with no additional features.
> * Define variables for the resource group location and name prefix.
> * Generate a random name for the Azure resource group.
> * Create a resource group with the generated name at a specified location.
> * Generate a random string for the Storage account name.
> * Create a Storage account with the generated name in the created resource group.
> * Generate a random string for the Batch account name.
> * Create a Batch account with the generated name in the created resource group and linked to the created Storage account.
> * Generate a random name for the Batch pool.
> * Create a Batch pool with a fixed scale in the created resource group and linked to the created Batch account.
> * Create a Batch pool with autoscale in the created resource group and linked to the created Batch account.
> * Output the names of the created resource group, Storage account, Batch account, and both Batch pools.

## Prerequisites

- Create an Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-batch-pools-with-start-task). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-batch-pools-with-start-task/TestRecord.md).
> 
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform).

1. Create a directory in which to test and run the sample Terraform code, and make it the current directory.

1. Create a file named `main.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-batch-pools-with-start-task/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-deploy-batch-account-two-pools-start-task-terraform.md)

1. Create a file named `outputs.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-batch-pools-with-start-task/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-deploy-batch-account-two-pools-start-task-terraform.md)

1. Create a file named `providers.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-batch-pools-with-start-task/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-deploy-batch-account-two-pools-start-task-terraform.md)

1. Create a file named `variables.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-batch-pools-with-start-task/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-deploy-batch-account-two-pools-start-task-terraform.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-deploy-batch-account-two-pools-start-task-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-deploy-batch-account-two-pools-start-task-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-deploy-batch-account-two-pools-start-task-terraform.md)

## Verify the results

### [Azure CLI](#tab/azure-cli)

Run [`az batch account show`](https://learn.microsoft.com/cli/azure/batch/account#az-batch-account-show) to view the Batch account.

```azurecli
az batch account show --name <batch_account_name> --resource-group <resource_group_name>
```

In the above command, replace `<batch_account_name>` with the name of your Batch account and `<resource_group_name>` with the name of your resource group.

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/quick-deploy-batch-account-two-pools-start-task-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot).

## Next steps

> 
> [See more articles about Batch accounts](https://learn.microsoft.com/search/?terms=Azure%20batch%20account%20and%20terraform).
