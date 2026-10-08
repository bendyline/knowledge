---
ROBOTS: NOINDEX
title: 'Quickstart: Create an Azure CDN profile and endpoint using Terraform'
titleSuffix: Azure Content Delivery Network
description: In this article, you create an Azure CDN profile and endpoint using Terraform
services: cdn
ms.service: azure-content-delivery-network
ms.topic: quickstart
ms.date: 02/28/2026
ms.custom: devx-track-terraform
author: TomArcherMsft
ms.author: tarcher
content_well_notification:
  - AI-contribution
ai-usage: ai-assisted
# Customer intent: "As a cloud engineer, I want to create an Azure CDN profile and endpoint using Terraform, so that I can efficiently manage content delivery and scale my application."
---

# Quickstart: Create an Azure CDN profile and endpoint using Terraform


> **Important:**
> Azure CDN Standard from Microsoft (classic) retires on **September 30, 2027**. Because the service is retiring, it no longer supports profile creation, new domain onboarding, or managed certificates. To avoid service disruption, ⁠[**migrate to Azure Front Door Standard or Premium**](https://learn.microsoft.com/azure/cdn/migrate-tier). For more information, see ⁠[**Azure CDN Standard from Microsoft (classic) retirement**](https://azure.microsoft.com/updates?id=Azure-CDN-Standard-from-Microsoft-classic-will-be-retired-on-30-September-2027).

This article shows how to use Terraform to create an [Azure CDN profile and endpoint](https://learn.microsoft.com/azure/cdn/cdn-overview) using [Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-terraform.md)

In this article, you learn how to:

> 
> - Create a random pet name for the Azure resource group name using [random_pet](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/pet)
> - Create an Azure resource group using [azurerm_resource_group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group)
> - Create a random string for the CDN endpoint name using [random_string](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string)
> - Create an Azure CDN profile using [azurerm_cdn_profile](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cdn_profile)
> - Create an Azure CDN endpoint using [azurerm_cdn_endpoint](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cdn_endpoint)

## Prerequisites

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-cdn-with-custom-origin). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/blob/master/quickstart/101-cdn-with-custom-origin/TestRecord.md).
>
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test and run the sample Terraform code and make it the current directory.

1. Create a file named `main.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-cdn-with-custom-origin/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-terraform.md)

1. Create a file named `outputs.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-cdn-with-custom-origin/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-terraform.md)

1. Create a file named `providers.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-cdn-with-custom-origin/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-terraform.md)

1. Create a file named `variables.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-cdn-with-custom-origin/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-terraform.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-terraform.md)

## Verify the results

<a name='azure-cli'></a>

#### [Azure CLI](#tab/azure-cli)

1. Get the Azure resource group name in which the Azure CDN profile and endpoint were created.

    ```console
    resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the CDN profile name.

    ```console
    cdn_profile_name=$(terraform output -raw cdn_profile_name)
    ```

1. Get the CDN endpoint name.

    ```console
    cdn_endpoint_endpoint_name=$(terraform output -raw cdn_endpoint_endpoint_name)
    ```

1. Run [az cdn custom-domain show](https://learn.microsoft.com/cli/azure/cdn/custom-domain#az-cdn-custom-domain-show) to show details of the custom domain you created in this article.

    ```azurecli
    az cdn endpoint show --resource-group $resource_group_name \
                         --profile-name $cdn_profile_name \
                         --name $cdn_endpoint_endpoint_name
    ```

#### [Azure PowerShell](#tab/azure-powershell)

1. Get the Azure resource group name in which the Azure CDN profile and endpoint were created.

    ```console
    $resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the CDN profile name.

    ```console
    $cdn_profile_name=$(terraform output -raw cdn_profile_name)
    ```

1. Get the CDN endpoint name.

    ```console
    $cdn_endpoint_endpoint_name=$(terraform output -raw cdn_endpoint_endpoint_name)
    ```

1. Run [Get-AzCdnEndpoint](https://learn.microsoft.com/powershell/module/az.cdn/get-azcdnendpoint) to show details of the custom domain you created in this article.

    ```console
    Get-AzCdnEndpoint -ResourceGroupName $resource_group_name `
                      -ProfileName $cdn_profile_name `
                      -Name $cdn_endpoint_endpoint_name
    ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next steps

> 
> [Tutorial: Use CDN to serve static content from a web app](cdn-add-to-web-app.md)
