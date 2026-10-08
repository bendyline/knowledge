---
title: 'Quickstart: Create an Azure Stream Analytics job using Terraform'
description: In this article, you create an Azure Stream Analytics job using Terraform.
ms.service: azure-stream-analytics
ms.topic: quickstart
ms.custom: devx-track-terraform
author: spelluru
ms.author: spelluru
ms.date: 4/22/2023
content_well_notification: 
  - AI-contribution
ai-usage: ai-assisted
---

# Quickstart: Create an Azure Stream Analytics job using Terraform

This article shows how to create an [Azure Stream Analytics](stream-analytics-introduction.md) job using Terraform. Once the job is created, you validate the deployment.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/quick-create-terraform.md)

In this article, you learn how to:

> 
> * Create a random value for the Azure resource group name using [random_pet](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/pet).
> * Create an Azure resource group using [azurerm_resource_group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group).
> * Create a random value for the Azure Stream Analytics job name using [random_pet](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/pet).
> * Create an Azure Stream Analytics job using [azurerm_stream_analytics_job](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/stream_analytics_job).

## Prerequisites

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-stream-analytics-job). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart//101-stream-analytics-job/TestRecord.md).
> 
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test and run the sample Terraform code and make it the current directory.

1. Create a file named `providers.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-stream-analytics-job//providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/quick-create-terraform.md)

1. Create a file named `main.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-stream-analytics-job//main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/quick-create-terraform.md)

1. Create a file named `variables.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-stream-analytics-job//variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/quick-create-terraform.md)

1. Create a file named `outputs.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-stream-analytics-job//outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/quick-create-terraform.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/quick-create-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/quick-create-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/quick-create-terraform.md)

## Verify the results

#### [Azure CLI](#tab/azure-cli)

1. Get the Azure resource group name.

    ```console
    resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the new Azure Stream Analytics job name.

    ```console
   stream_analytics_job_name=$(terraform output -raw stream_analytics_job_name)
    ```

1. Run [az stream-analytics job show](https://learn.microsoft.com/cli/azure/stream-analytics/job#az-stream-analytics-job-show) to display information about the job.

    ```azurecli
    az stream-analytics job show \
    --resource-group $resource_group_name \
    --job-name $stream_analytics_job_name
    ```
    
#### [Azure PowerShell](#tab/azure-powershell)

1. Get the Azure resource group name.

    ```console
    $resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the new Azure Stream Analytics job name.

    ```console
    $stream_analytics_job_name=$(terraform output -raw stream_analytics_job_name)
    ```

1. Run [Get-AzStreamAnalyticsJob](https://learn.microsoft.com/powershell/module/az.streamanalytics/get-azstreamanalyticsjob) to display information about the job.

    ```azurepowershell
     Get-AzStreamAnalyticsJob `
        -ResourceGroupName $resource_group_name `
        -Name $stream_analytics_job_name
    ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/quick-create-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next steps

>  
> [Create a dedicated Azure Stream Analytics cluster using Azure portal](create-cluster.md)
