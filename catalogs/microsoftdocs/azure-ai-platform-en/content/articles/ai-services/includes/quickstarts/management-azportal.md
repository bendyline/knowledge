---
title: "Quickstart: Create a Foundry resource in the Azure portal"
titleSuffix: Foundry Tools
description: Get started with Foundry Tools by creating a Foundry resource in the Azure portal.
manager: mcleans
ms.date: 09/15/2025
ms.service: foundry-tools
ms.topic: quickstart
ms.custom:
  - ignite-2023
  - build-2025
keywords:
  - Foundry Tools
  - cognitive intelligence
  - cognitive solutions
  - ai services
---

## Prerequisites

* A valid Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* Azure RBAC role to create resources. You need one of the following roles assigned on your Azure subscription or resource group:
  * Contributor
  * Owner
  * Custom role with `Microsoft.CognitiveServices/accounts/write` permission

## Create a new Microsoft Foundry resource

If your organization requires customized Azure configurations like alternative names, security controls or cost tags, you might need to use the [Azure portal](https://portal.azure.com) or [template options](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/create-resource-template.md) to comply with your organization's Azure Policy compliance.

The Foundry resource is listed under **Foundry** > **Foundry** in the Azure portal. The API kind is **AIServices**. Look for the logo as shown here:

Screenshot of the Foundry resource in the Azure portal.

> **Tip:**
> [Foundry portal](https://ai.azure.com/?cid=learnDocs) provides a way to [create a new Foundry resource](https://learn.microsoft.com/azure/ai-foundry/how-to/create-projects?tabs=ai-foundry) with basic, defaulted, settings. 

To create a Foundry resource in the Azure portal follow these instructions:

1. Select this **Foundry** resource link: [https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry)

1. On the **Create** page, provide the following information:

    | Project details | Description |
    | --- | --- |
    | **Subscription** | Select one of your available Azure subscriptions. |
    | **Resource group** | The Azure resource group that will contain your Foundry resource. You can create a new group or add it to a preexisting group. |
    | **Region** | The location of your Foundry Tool instance. Different locations may introduce latency, but have no impact on the runtime availability of your resource. |
    | **Name** | A descriptive name for your Foundry resource. For example, *MyAIServicesResource*. |

1. Configure other settings for your resource as needed, read and accept the conditions (as applicable), and then select **Review + create**.

> **Tip:**
> If your subscription doesn't allow you to create a Foundry resource, you might need to enable the privilege of that [Azure resource provider](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-providers-and-types#register-resource-provider) using the [Azure portal](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-providers-and-types#azure-portal), [PowerShell command](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-providers-and-types#azure-powershell) or an [Azure CLI command](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-providers-and-types#azure-cli). If you are not the subscription owner, ask someone with the role of *Owner* or *Admin* to complete the registration for you or ask for the **/register/action** privileges to be granted to your account.

## Clean up resources

If you want to clean up and remove a Foundry resource, you can delete the resource or resource group. Deleting the resource group also deletes any other resources contained in the group.

1. In the Azure portal, expand the menu on the left side to open the menu of services, and choose **Resource Groups** to display the list of your resource groups.
1. Locate the resource group containing the resource to be deleted.
1. If you want to delete the entire resource group, select the resource group name. On the next page, Select **Delete resource group**, and confirm.
1. If you want to delete only the Foundry resource, select the resource group to see all the resources within it. On the next page, select the resource that you want to delete, select the ellipsis menu for that row, and select **Delete**.
