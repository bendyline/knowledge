---
title: 'QuickStart: Create and configure Azure DDoS Network Protection using Terraform'
description: In this article, you create and configure Azure DDoS Network Protection using Terraform
author: TomArcherMsft
ms.service: azure-ddos-protection
ms.topic: quickstart
ms.custom: devx-track-terraform
ms.author: tarcher
ms.date: 03/17/2026
content_well_notification: 
  - AI-contribution
ai-usage: ai-assisted
# Customer intent: As a cloud architect, I want to create and configure a DDoS protection plan using Terraform, so that I can enhance the security of my Azure virtual networks across multiple subscriptions.
---

# QuickStart: Create and configure Azure DDoS Network Protection using Terraform

This QuickStart describes how to use Terraform to create and enable a [distributed denial of service (DDoS) protection plan](ddos-protection-overview.md) and [Azure virtual network](https://learn.microsoft.com/azure/virtual-network/virtual-networks-overview). An Azure DDoS Network Protection plan defines a set of virtual networks that have DDoS protection enabled across subscriptions. You can configure one DDoS protection plan for your organization and link virtual networks from multiple subscriptions to the same plan.

Diagram of DDoS Network Protection.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-terraform.md)

In this article, you learn how to:

> 
> * Create a random value for the Azure resource group name using [random_pet](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/pet)
> * Create an Azure resource group using [azurerm_resource_group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group)
> * Create a random value for the virtual network name using [random_string](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string)
> * Create an Azure DDoS protection plan using [azurerm_network_ddos_protection_plan](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/network_ddos_protection_plan)
> * Create an Azure virtual network using [azurerm_virtual_network](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_network)

## Prerequisites

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-ddos-protection-plan). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-ddos-protection-plan/TestRecord.md).
> 
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test and run the sample Terraform code and make it the current directory.

1. Create a file named `providers.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-ddos-protection-plan/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-terraform.md)

1. Create a file named `main.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-ddos-protection-plan/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-terraform.md)

1. Create a file named `variables.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-ddos-protection-plan/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-terraform.md)

1. Create a file named `outputs.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-ddos-protection-plan/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-terraform.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-terraform.md)

## Verify the results

#### [Azure CLI](#tab/azure-cli)

1. Get the Azure resource group name.

    ```console
    resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the DDoS protection plan name.

    ```console
    ddos_protection_plan_name=$(terraform output -raw ddos_protection_plan_name)
    ```

1. Run [az network ddos-protection show](https://learn.microsoft.com/cli/azure/network/ddos-protection#az-network-ddos-protection-show) to display information about the new DDoS protection plan.

    ```azurecli
    az network ddos-protection show \
        --resource-group $resource_group_name \
        --name $ddos_protection_plan_name
    ```

#### [Azure PowerShell](#tab/azure-powershell)

1. Get the Azure resource group name.

    ```console
    $resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the DDoS protection plan name.

    ```console
    $ddos_protection_plan_name=$(terraform output -raw ddos_protection_plan_name)
    ```

1. Run [Get-AzDdosProtectionPlan](https://learn.microsoft.com/powershell/module/az.network/get-azddosprotectionplan) to display information about the new DDoS protection plan.

    ```azurepowershell
    Get-AzDdosProtectionPlan -ResourceGroupName $resource_group_name `
                             -Name $ddos_protection_plan_name
    ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next steps

>  
> [View and configure DDoS protection telemetry](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/telemetry.md)
