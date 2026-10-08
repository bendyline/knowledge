---
title: "Use Terraform to create Microsoft Foundry (classic)"
description: "In this article, you create a Microsoft Foundry resource, a Microsoft Foundry project, using Terraform infrastructure as code templates. (classic)"
ms.topic: how-to
ms.date: 04/08/2026
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.reviewer: deeikele 
ms.author: sgilley
author: sdgilley
ms.custom: 
  - classic-and-new
  - devx-track-terraform
  - update-code2
  - dev-focus
content_well_notification: 
  - AI-contribution
ai-usage: ai-assisted
#customer intent: As a Terraform user, I want to see how to configure Microsoft Foundry using Terraform, so I can automate my setup.
ROBOTS: NOINDEX, NOFOLLOW
---

# Use Terraform to manage Microsoft Foundry resources (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../foundry/how-to/create-resource-terraform.md)

Use Terraform to automate the creation of [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs) resources, projects, deployments, and connections.

You can use either the Terraform [AzAPI Provider](https://learn.microsoft.com/azure/developer/terraform/overview-azapi-provider) or [AzureRM Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cognitive_account) to manage Foundry resources. The AzAPI provider lets you access all Foundry control plane configurations including preview features. The AzureRM variant is limited to core management capabilities.

The following table shows which actions each provider supports:

| Action | AzAPI Provider | AzureRM Provider |
| --- | --- | --- |
| Create a resource group | ✅ | ✅ |
| Create a Foundry resource | ✅ | ✅ |
| Configure deployments | ✅ | ✅ |
| Configure projects | ✅ | ✅ |
| Configure a connection to knowledge and tools | ✅ | - |
| Configure a capability host (for advanced tool configurations like [Agent standard setup](../agents/concepts/capability-hosts.md)) | ✅ | - |

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)


## Prerequisites


An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 


- 
Access to a role that allows you to create a Foundry resource, such as **Foundry Account Owner** or **Foundry Owner** on the subscription or resource group. For more information about permissions, see [Role-based access control for Microsoft Foundry](../../foundry/concepts/rbac-foundry.md#permissions-for-each-built-in-role).

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

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic/code/providers.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)

1. Create a file named `main.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic/code/main.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)

1. Create a file named `variables.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic/code/variables.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)

# [AzureRM Provider](#tab/azurerm)

1. Create a directory to test and run the sample Terraform code. Make this directory your current directory.

1. Create a file named `providers.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic-azurerm/code/providers.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)

1. Create a file named `main.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic-azurerm/code/main.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)

1. Create a file named `variables.tf` and add the following code.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-terraform/00-basic-azurerm/code/variables.tf](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)

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

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)


## Verify your deployment

Run the following commands to verify deployed resources:

```terraform
terraform state list
terraform output
```


## Customize security and compliance

To meet security and compliance requirements, customize Foundry with security configurations and by bringing your own storage resources. For example, when using the Agent service, you can opt to bring your own Azure Cosmos DB database, Azure AI Search instance, and Azure Storage Account to store your threads and messages.

For advanced setup samples, see the following repositories:

- [Foundry Samples](https://github.com/microsoft-foundry/foundry-samples/tree/main/infrastructure/infrastructure-setup-terraform) repository contains example Terraform configurations for the most common enterprise security configurations.
- [Terraform Azure Verified Module (Cognitive Services account)](https://registry.terraform.io/modules/Azure/avm-res-cognitiveservices-account/azurerm/latest) is a generic module set to manage the Azure resource type used by Foundry, Azure OpenAI, Azure Speech, Azure Language.
- [Terraform Azure Verified Pattern Module (Foundry)](https://registry.terraform.io/modules/Azure/avm-ptn-aiml-ai-foundry/azurerm/latest) is a reference implementation for Foundry.
- [Terraform Azure Verified Pattern Module (Azure AI and ML Landing Zone)](https://registry.terraform.io/modules/Azure/avm-ptn-aiml-landing-zone/azurerm/latest) provides a reference for the set of resources typically created alongside Foundry for an end-to-end sample.

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-resource-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot).

## Next steps

- [See AzureRM reference docs for Foundry](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cognitive_account)
- [Learn more about AzAPI provider](https://learn.microsoft.com/azure/developer/terraform/overview-azapi-provider)
