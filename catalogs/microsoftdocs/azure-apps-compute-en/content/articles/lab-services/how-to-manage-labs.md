---
title: View and manage labs
description: Learn how to create a lab, configure a lab, view all the labs, or delete a lab. 
services: lab-services
ms.service: azure-lab-services
author: RoseHJM
ms.author: rosemalcolm
ms.topic: how-to
ms.date: 07/04/2023
---

# Manage labs in Azure Lab Services


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


This article describes how to create and delete labs. It also shows you how to view all the labs in a lab plan.

## Prerequisites


- An Azure account with an active subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


- An Azure account with permission to manage a lab, such as the [Lab Creator](concept-lab-services-role-based-access-control.md#lab-creator-role), [Owner](concept-lab-services-role-based-access-control.md#owner-role), [Contributor](concept-lab-services-role-based-access-control.md#contributor-role), or [Lab Services Contributor](concept-lab-services-role-based-access-control.md#lab-services-contributor-role) Azure RBAC role. Learn more about the [Azure Lab Services built-in roles and assignment scopes](concept-lab-services-role-based-access-control.md).


- An Azure lab plan. If you don't have a lab plan yet, follow the steps in [Quickstart: Set up resources to create labs](quick-create-resources.md).

- One or more labs. To create a lab, see [Tutorial: Create a lab](tutorial-setup-lab.md).

## View all labs

# [Lab Services website](#tab/lab-services-website)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


1. Navigate to Lab Services web portal: [https://labs.azure.com](https://labs.azure.com).

1. Select **Sign in**. Select or enter a **user ID** that is a member of the **Lab Creator** role in the lab plan, and enter password. Azure Lab Services supports organizational accounts and Microsoft accounts.

    
If you have an Administrator or Lab Owner role in two or more Microsoft Entra tenants, you can switch between tenants in the Lab Services web portal ([https://labs.azure.com](https://labs.azure.com)) by selecting the control at the upper right, as shown in the following screenshot: 

Screenshot of the control for switching between tenants in the Azure Lab Services portal.


1. Confirm that you see all the labs in the selected resource group.

    On the lab's tile, you can see the number of virtual machines in the lab and the quota for each user.

    Screenshot that shows the list of labs in the Azure Lab Services website.

1. Use the drop-down list at the top to select a different lab plan. You see labs in the selected lab plan.

> **Note:**
> If you're granted access but are unable to view the labs from other people, you might select *All labs* instead of *My labs* in the **Show** filter.

# [Teams](#tab/teams)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


To access your lab in Teams:

1. Sign into Microsoft Teams with your organizational account.

1. Select the team and channel that contain the lab.

1. Select the **Azure Lab Services** tab.

    Confirm that you see all labs for the lab plan that's associated with the Teams channel.

    Screenshot that shows the list of labs in Microsoft Teams.

# [Canvas](#tab/canvas)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


1. Sign into Canvas, and select your course.

1. Select **Azure Lab Services** from the course navigation menu.

    Confirm that you see all labs for the lab plan that's associated with the course.

    Screenshot that shows the list of labs in Canvas.

---

## Use a non-organizational account as a lab creator

You can access the Azure Lab Services website to create and manage labs without an organizational account (a guest account). In this case, you need a Microsoft account, or a GitHub or non-Microsoft email account that is linked to a Microsoft account.

### Use a non-Microsoft email account


You can use non-Microsoft email accounts to register and sign in to a lab. However, the registration requires that you first create a Microsoft account that's linked to your non-Microsoft email address.

You might already have a Microsoft account that's linked to your non-Microsoft email address. For example, users already have a Microsoft account if you used this email address with other Microsoft products or services, such as Office, Skype, OneDrive, or Windows.

When you use the lab registration link to sign into a lab, you're prompted for your email address and password. If you sign in with a non-Microsoft account that's not linked to a Microsoft account, you receive the following error message:

Screenshot that shows the sign-in error message for the Azure Lab Services website.

Follow these steps to [sign up for a new Microsoft account](https://signup.live.com).


### Use a GitHub Account


You can use an existing GitHub account to register and sign into a lab. If you already have a Microsoft account that's linked to your GitHub account, you can sign in and continue the lab registration process.

To link your GitHub account to a Microsoft account:

1. Select the **Sign-in options** link:

    Screenshot that shows the Microsoft sign in window, highlighting the Sign-in options link.

1. In the **Sign-in options** window, select **Sign in with GitHub**.

    Screenshot that shows the Microsoft sign-in options window, highlighting the option to sign in with GitHub.

    At the prompt, you then create a Microsoft account that's linked to your GitHub account. The linking happens automatically when you select **Next**. You're then immediately signed in and connected to the lab.


## Delete a lab

1. On the tile for the lab, select three dots (...) in the corner, and then select **Delete**.

    Screenshot that shows the list of labs in the Azure Lab Services website, highlighting the Delete button.

1. On the **Delete lab** dialog box, select **Delete** to continue with the deletion.

## Switch to another lab

To switch to another lab from the current, select the drop-down list of labs at the top.

Screenshot that shows how to select a different lab using the lab selector control in the Azure Lab Services website.

To switch to a different group, select the left drop-down and choose the lab plan's resource group.  To switch to a different lab account, select the left drop-down and choose the lab account name.  The Azure Lab Services portal organizes labs by lab plan's resource group/lab account, then by lab name.

## Next steps

See the following articles:

- [As a lab owner, set up and publish templates](how-to-create-manage-template.md)
- [As a lab owner, configure and control usage of a lab](how-to-manage-lab-users.md)
- [As a lab user, access labs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-use-lab.md)
