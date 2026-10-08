---
title: Assign a lab creator
titleSuffix: Azure Lab Services
description: This article shows how to add a user to the Lab Creator role for a lab plan in Azure Lab Services. Lab creators can create labs within the lab plan.
services: lab-services
ms.service: azure-lab-services
author: RoseHJM
ms.author: rosemalcolm
ms.topic: how-to
ms.date: 07/04/2023
ms.custom: subject-rbac-steps
---

# Add lab creators to a lab plan in Azure Lab Services


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).



> **Note:**
> This article references features available in [lab plans](concept-lab-accounts-versus-lab-plans.md), which replaced lab accounts.


This article describes how to add users as lab creators to a lab account or lab plan in Azure Lab Services. Users with the Lab Creator role can create labs and manage labs for the lab account or lab plan.

## Prerequisites

- To add lab creators to a lab plan, your Azure account needs to have the [Owner](concept-lab-services-role-based-access-control.md#owner-role) Azure RBAC role assigned on the resource group. Learn more about the [Azure Lab Services built-in roles](concept-lab-services-role-based-access-control.md).

<a name='add-azure-ad-user-account-to-lab-creator-role'></a>

## Add Microsoft Entra user account to Lab Creator role


To create or edit a lab in the Azure Lab Services website ([https://labs.azure.com](https://labs.azure.com)), your Azure account must be assigned the [Lab Creator role](concept-lab-services-role-based-access-control.md#lab-creator-role) in Azure RBAC. If you assign the Lab Creator role to a user on the lab plan's resource group, that user can create labs for all lab plans in the resource group. Learn more about [Azure Lab Services built-in roles](concept-lab-services-role-based-access-control.md).

> **Note:**
> Owners of a lab plan can automatically create labs and do not need to be assigned the Lab Creator role.

1. Select the resource group that contains the lab plan.

1. From the **Access control (IAM)** page, select **Add** > **Add role assignment**.

    Screenshot that shows the Access control (IAM) page with Add role assignment menu option highlighted.

1. On the **Role** tab, select the *Lab Creator* role.

    Screenshot that shows the Add roll assignment page with Role tab selected.

1. On the **Members** tab, select the user you want to add to the *Lab Creators* role.

1. On the **Review + assign** tab, select **Review + assign** to assign the role.

> **Warning:**
> When you create a lab, you are automatically granted Owner permissions of the lab. If you have the Lab Creator role on the lab plan level, you may notice a short delay in being able to access the newly created lab. This delay is because the Owner permissions need to propagate. To overcome this issue, you might assign a role that allows you to view labs, such as Lab Creator, on the resource group that contains the lab plan.


If you're using a lab account, assign the Lab Creator role on the lab account. 

## Add a guest user as a lab creator

If you need to add an external user as a lab creator, you need to add the external user as a guest account in the Microsoft Entra ID that is linked to your Azure subscription.

The following types of email accounts can be used:

- A Microsoft-domain email account, such as *outlook.com*, *hotmail.com*, *msn.com*, or *live.com*.
- A non-Microsoft email account, such as one provided by Yahoo! or Google. The user needs to [link the account with a Microsoft account](how-to-manage-labs.md#use-a-non-organizational-account-as-a-lab-creator).
- A GitHub account. The user needs to [link the account with a Microsoft account](how-to-manage-labs.md#use-a-non-organizational-account-as-a-lab-creator).

To add a guest user as a lab creator:

1. Follow these steps to [add guest users to Microsoft Entra ID](https://learn.microsoft.com/azure/active-directory/external-identities/b2b-quickstart-add-guest-users-portal).

    If using an email account that's provided by your university’s Microsoft Entra ID, you don't have to add them as a guest account.

1. Follow these steps to [assign the Lab Creator role to the Microsoft Entra user account](#add-azure-ad-user-account-to-lab-creator-role).

> **Important:**
> Only lab creators need an account in Microsoft Entra connected to the Azure subscription. For account requirements for lab users see [Access a lab in Azure Lab Services](how-to-access-lab-virtual-machine.md).

## Next steps

See the following articles:

- [As a lab owner, create and manage labs](how-to-manage-labs.md)
- [As a lab owner, set up and publish templates](how-to-create-manage-template.md)
- [As a lab owner, configure and control usage of a lab](how-to-manage-lab-users.md)
- [As a lab user, access labs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-use-lab.md)
