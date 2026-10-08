---
title: Create and manage lab plans
titleSuffix: Azure Lab Services
description: Learn how to create an Azure Lab Services lab plan, view all lab plans, or delete a lab plan in the Azure portal.
services: lab-services
ms.service: azure-lab-services
author: RoseHJM
ms.author: rosemalcolm
ms.topic: how-to
ms.date: 03/14/2023
---

# Create and manage lab plans in Azure Lab Services


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).



> **Note:**
> This article references features available in [lab plans](concept-lab-accounts-versus-lab-plans.md), which replaced lab accounts.


In Azure Lab Services, a lab plan is a container for managed lab types such as labs. An administrator sets up a lab plan with Azure Lab Services and provides access to lab owners who can create labs in the plan. This article describes how to create a lab plan, view all lab plans, or delete a lab plan.

## Prerequisites


- An Azure account with an active subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


- An Azure account with permission to manage a lab, such as the [Lab Creator](concept-lab-services-role-based-access-control.md#lab-creator-role), [Owner](concept-lab-services-role-based-access-control.md#owner-role), [Contributor](concept-lab-services-role-based-access-control.md#contributor-role), or [Lab Services Contributor](concept-lab-services-role-based-access-control.md#lab-services-contributor-role) Azure RBAC role. Learn more about the [Azure Lab Services built-in roles and assignment scopes](concept-lab-services-role-based-access-control.md).


## Create a lab plan

To create a lab plan, see [Quickstart: Set up resources to create labs](quick-create-resources.md).

## View lab plans

To view the list of lab plans in the Azure portal:

1. Sign in to the [Azure portal](https://portal.azure.com).

1. In the search box, enter *lab plan*, and then select **Lab plans**.

    Screenshot that shows how to search lab plan resources in the Azure portal.

1. View the list of lab plans.

    Screenshot that shows the list of lab plans in the Azure portal, highlighting the filter options.

    > **Tip:**
    > Use the filters to restrict the list of the resources by subscription, resource group, location, or other criteria.

## Delete a lab plan

> **Caution:**
> Deleting a lab plan will not delete any labs created from that lab plan.
> 
> Before you delete a lab plan, make sure to delete all associated labs, Azure Compute Gallery images, and other resources. If you're unable to delete these resources, create an [Azure Support request](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/newsupportrequest/) for Azure Lab Services.

To delete a lab plan in the Azure portal:

1. Sign in to the [Azure portal](https://portal.azure.com).

1. View the list of lab plans.

1. In the list, check the checkbox for the lab plan that you want to delete, and then select **Delete**.

    Screenshot that shows how to delete a lab plan in the Azure portal.

    Alternately, select the lab plan from the list, and then select **Delete** on the lab plan **Overview** page.

1. Enter **Yes** to confirm the delete action, and then select **Delete**.

    Screenshot that shows the delete lab plan confirmation page in the Azure portal.

## Next steps

See other articles in the **How-to guides** -> **Create and configure lab plans** section of the table-of-content (TOC).
