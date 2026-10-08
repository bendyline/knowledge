---
title: Include file
description: Include file
author: sdgilley
ms.reviewer: deeikele
ms.author: sgilley
ms.service: microsoft-foundry
ms.topic: include
ms.date: 08/27/2026
ms.custom: include
ai-usage: ai-assisted
---

## Prerequisites


An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 


- 
Access to a role that allows you to create a Foundry resource, such as **Foundry Account Owner** or **Foundry Owner** on the subscription or resource group. For more information about permissions, see [Role-based access control for Microsoft Foundry](../concepts/rbac-foundry.md#permissions-for-each-built-in-role).

> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli). Run `az login`, and then run `az account show` to verify your active subscription.
- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).

## Create a basic Foundry configuration

# [AzAPI Provider](#tab/azapi)

1. Create a directory to test and run the sample Terraform code. Make this directory your current directory.

1. Create a file named `versions.tf` and add the required provider sources.

    ```terraform
    terraform {
        required_providers {
            azapi = {
                source  = "Azure/azapi"
                version = "~> 2.5"
            }
            random = {
                source  = "hashicorp/random"
                version = "~> 3.6"
            }
        }
    }
    ```

1. Create a file named `providers.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic/code/providers.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/how-to-create-resource-terraform-1.md)

1. Create a file named `main.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic/code/main.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/how-to-create-resource-terraform-1.md)

1. Create a file named `variables.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic/code/variables.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/how-to-create-resource-terraform-1.md)

# [AzureRM Provider](#tab/azurerm)

1. Create a directory to test and run the sample Terraform code. Make this directory your current directory.

1. Create a file named `providers.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic-azurerm/code/providers.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/how-to-create-resource-terraform-1.md)

1. Create a file named `main.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic-azurerm/code/main.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/how-to-create-resource-terraform-1.md)

1. Create a file named `variables.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic-azurerm/code/variables.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/how-to-create-resource-terraform-1.md)

---

Set the required variables in your current shell. Replace `eastus` if you want to deploy to another supported region.

```console
export TF_VAR_subscription_id=$(az account show --query id --output tsv)
export TF_VAR_location=eastus
```

Run `test -n "$TF_VAR_subscription_id" && echo "Subscription configured."` to verify that the subscription variable is set.

**References:**
- [AzAPI provider documentation](https://learn.microsoft.com/azure/developer/terraform/overview-azapi-provider)
- [AzureRM cognitive_account resource](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cognitive_account)
- [Foundry Terraform samples](https://github.com/microsoft-foundry/foundry-samples/tree/main/infrastructure/infrastructure-setup-terraform)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/how-to-create-resource-terraform-1.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/how-to-create-resource-terraform-1.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/how-to-create-resource-terraform-1.md)
