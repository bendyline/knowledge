---
title: Create a firmware analysis workspace using Terraform
description: In this article, you learn how to create a firmware analysis workspace using Terraform.
ms.topic: quickstart
ms.date: 09/09/2025
ms.custom: devx-track-terraform
author: karengu0
ms.author: karenguo
ai-usage: ai-assisted
ms.service: azure
ms.subservice: azure-firmware-analysis
content_well_notification: 
  - AI-contribution
#customer intent: I am a Terraform user who wants to create a firmware analysis workspace
---

# Create a firmware analysis workspace using Terraform

This quickstart describes how to use Terraform to create a **firmware analysis** workspace. A workspace is the Azure resource that stores your firmware uploads and analysis results for the firmware analysis service.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firmware-analysis/quickstart-firmware-analysis-terraform.md)

In this article, you learn how to:

> 
> * Create an Azure resource group with a random name  
> * Create a firmware analysis workspace  
> * Output the randomly generated values
> * Use Azure CLI and Azure PowerShell to view the new workspace

## Prerequisites

- An Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

## Implement the Terraform code

The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-firmware-analysis). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-firmware-analysis/TestRecord.md). See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test and run the sample Terraform code, and make it the current directory.

1. Create a file named `main.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-firmware-analysis/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firmware-analysis/quickstart-firmware-analysis-terraform.md)

1. Create a file named `outputs.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-firmware-analysis/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firmware-analysis/quickstart-firmware-analysis-terraform.md)

1. Create a file named `providers.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-firmware-analysis/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firmware-analysis/quickstart-firmware-analysis-terraform.md)

1. Create a file named `variables.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-firmware-analysis/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firmware-analysis/quickstart-firmware-analysis-terraform.md)

> **Important:**
> If you're using the 4.x azurerm provider, you must [explicitly specify the Azure subscription ID](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/4.0-upgrade-guide#specifying-subscription-id-is-now-mandatory) to authenticate to Azure before running the Terraform commands.
>
> One way to specify the Azure subscription ID without putting it in the `providers` block is to specify the subscription ID in an environment variable named `ARM_SUBSCRIPTION_ID`.
>
> For more information, see the [Azure provider reference documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs#argument-reference).

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firmware-analysis/quickstart-firmware-analysis-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firmware-analysis/quickstart-firmware-analysis-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firmware-analysis/quickstart-firmware-analysis-terraform.md)

## Verify the results

### [Azure CLI](#tab/azure-cli)

1. Get the resource group and workspace names.

    ```console
    resource_group=$(terraform output -raw resource_group_name)
    workspace_name=$(terraform output -raw workspace_name)
    ```

1. Run [`az firmwareanalysis workspace show`](https://learn.microsoft.com/cli/azure/firmwareanalysis/workspace?#az-firmwareanalysis-workspace-show) to view the newly created firmware analysis workspace.

    ```azurecli
    az firmwareanalysis workspace show --resource-group $resource_group --name $workspace_name
    ```

### [Azure PowerShell](#tab/azure-powershell)

1. Get the resource group and workspace names.

    ```powershell
    $resource_group_name = $(terraform output -raw resource_group_name)
    $workspace_name = $(terraform output -raw workspace_name)
    ```

1. Run [Get-AzFirmwareAnalysisWorkspace](https://learn.microsoft.com/powershell/module/az.firmwareanalysis/get-azfirmwareanalysisworkspace) to view the firmware analysis workspace.

    ```azurepowershell
    $params = @{
        ResourceGroupName = $resource_group_name
        ResourceType      = "Microsoft.IoTFirmwareDefense/workspaces"
        ResourceName      = $workspace_name
    }

    Get-AzResource @params
    ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firmware-analysis/quickstart-firmware-analysis-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot).

## Next step

> 
> [Analyze firmware images in the Azure portal](https://learn.microsoft.com/azure/firmware-analysis/quickstart-firmware-analysis-portal)
