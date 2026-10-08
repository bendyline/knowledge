---
title: 'Quickstart: Deploy Using Terraform'
description: 'In this article, you create an Azure AI Search service using Terraform.'
ms.topic: quickstart
ms.date: 07/20/2026
ms.update-cycle: 365-days
ms.custom:
  - devx-track-terraform
  - ignite-2023
author: mattwojo
ms.author: mattwoj
ms.service: azure-ai-search
content_well_notification:
  - AI-contribution
ai-usage: ai-assisted
---

# Quickstart: Deploy Azure AI Search service using Terraform


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).


This article shows how to use Terraform to create an [Azure AI Search service](search-what-is-azure-search.md) by using [Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-terraform.md)

In this article, you learn how to:

> 
> * Create a random pet name for the Azure resource group name by using [random_pet](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/pet)
> * Create an Azure resource group by using [azurerm_resource_group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group)
> * Create a random string by using [random_string](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string)
> * Create an Azure AI Search service by using [azurerm_search_service](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/search_service)

## Prerequisites

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

## Implement the Terraform code

> **Note:**
> For more information, see [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform).

1. Create a directory to test and run the sample Terraform code. Make it the current directory.

1. Create a file named `main.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-cognitive-search/main.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-terraform.md)

1. Create a file named `outputs.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-cognitive-search/outputs.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-terraform.md)

1. Create a file named `providers.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-cognitive-search/providers.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-terraform.md)

1. Create a file named `variables.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-cognitive-search/variables.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-terraform.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-terraform.md)

## Verify the results

1. Get the Azure resource name where you created the Azure AI Search service.

    ```console
    resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the Azure AI Search service name.

    ```console
    azurerm_search_service_name=$(terraform output -raw azurerm_search_service_name)
    ```

1. Run [az search service show](https://learn.microsoft.com/cli/azure/search/service#az-search-service-show) to show the Azure AI Search service you created in this article.

    ```azurecli
    az search service show --name $azurerm_search_service_name \
                           --resource-group $resource_group_name
    ```

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next steps

> 
> [Create an Azure AI Search index using the Azure portal](search-get-started-portal.md)
