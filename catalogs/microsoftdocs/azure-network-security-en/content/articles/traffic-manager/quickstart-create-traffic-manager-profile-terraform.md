---
title: 'Quickstart: Create an Azure Traffic Manager profile using Terraform'
description: 'In this article, you create an Azure Traffic Manager profile using Terraform'
services: traffic-manager
ms.topic: quickstart
ms.custom: devx-track-terraform
ms.service: azure-traffic-manager
author: TomArcherMsft
ms.author: tarcher
ms.date: 6/8/2023
content_well_notification: 
  - AI-contribution
ai-usage: ai-assisted
# Customer intent: As a cloud architect, I want to create an Azure Traffic Manager profile using Terraform, so that I can efficiently manage and route user traffic based on performance.
---

# Quickstart: Create an Azure Traffic Manager profile using Terraform

This quickstart describes how to use Terraform to create a Traffic Manager profile with external endpoints using the performance routing method.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/quickstart-create-traffic-manager-profile-terraform.md)

In this article, you learn how to:

> 
> * Create a random value for the Azure resource group name using [random_pet](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/pet).
> * Create an Azure resource group using [azurerm_resource_group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group).
> * Create a random value for the Azure Traffic Manager profile name using [random_string](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string).
> * Create a random value for the Azure Traffic Manager profile DNS config relative name using [random_string](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string).
> * Create an Azure Traffic Manager profile using [azurerm_traffic_manager_profile](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/traffic_manager_profile).
> * Create two Azure Traffic Manager external endpoint using [azurerm_traffic_manager_external_endpoint](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/traffic_manager_external_endpoint).

## Prerequisites

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-traffic-manager-external-endpoint). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-traffic-manager-external-endpoint/TestRecord.md).
> 
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test and run the sample Terraform code and make it the current directory.

1. Create a file named `providers.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-traffic-manager-external-endpoint/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/quickstart-create-traffic-manager-profile-terraform.md)

1. Create a file named `main.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-traffic-manager-external-endpoint/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/quickstart-create-traffic-manager-profile-terraform.md)

1. Create a file named `variables.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-traffic-manager-external-endpoint/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/quickstart-create-traffic-manager-profile-terraform.md)

1. Create a file named `outputs.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-traffic-manager-external-endpoint/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/quickstart-create-traffic-manager-profile-terraform.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/quickstart-create-traffic-manager-profile-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/quickstart-create-traffic-manager-profile-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/quickstart-create-traffic-manager-profile-terraform.md)

## Verify the results

#### [Azure CLI](#tab/azure-cli)

1. Get the Azure resource group name.

    ```console
    resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the Traffic Manager profile name.

    ```console
    traffic_manager_profile_name=$(terraform output -raw azurerm_traffic_manager_profile_name)
    ```

1. Run [az network traffic-manager profile show](https://learn.microsoft.com/cli/azure/network/traffic-manager/profile#az-network-traffic-manager-profile-show) to display information about the new Traffic Manager profile.

    ```azurecli
    az network traffic-manager profile show \
        --resource-group $resource_group_name \
        --name $traffic_manager_profile_name
    ```

#### [Azure PowerShell](#tab/azure-powershell)

1. Get the Azure resource group name.

    ```console
    $resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the Traffic Manager profile name.

    ```console
    $traffic_manager_profile_name=$(terraform output -raw azurerm_traffic_manager_profile_name)
    ```

1. Run [Get-AzTrafficManagerProfile](https://learn.microsoft.com/powershell/module/az.trafficmanager/get-aztrafficmanagerprofile) to display information about the new Traffic Manager profile.

    ```azurepowershell
    Get-AzTrafficManagerProfile -ResourceGroupName $resource_group_name `
                                -Name $traffic_manager_profile_name
    ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/quickstart-create-traffic-manager-profile-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next steps

>  
> [Improve website response with Azure Traffic Manager](tutorial-traffic-manager-improve-website-response.md)
