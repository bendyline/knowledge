---
title: "Tutorial: Create a lab in Teams or Canvas"
titleSuffix: Azure Lab Services
description: Learn how to create a lab by using the Teams or Canvas app for Azure Lab Services.
ms.topic: tutorial
ms.date: 07/04/2023
author: RoseHJM
ms.author: rosemalcolm
---

# Tutorial: Create a lab with the Azure Lab Services app in Teams or Canvas


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


With Azure Lab Services, you can create labs directly from within Microsoft Teams or Canvas. In this tutorial, you use the Azure Lab Services app for Microsoft Teams or Canvas to create and publish a lab. After you complete this tutorial, lab users can directly access their lab virtual machine from Teams or Canvas.

With the Azure Lab Services app for Teams or Canvas you can create and manage labs without having to leave the Teams or Canvas environment and lab user management is synchronized based team or course membership. Lab users are automatically registered for a lab and have a lab VM assigned to them. They can also access their lab VM directly from within Teams or Canvas.

Diagram that shows the steps involved in creating a lab with Azure Lab Services.

In this tutorial, you learn how to:

> 
> * Configure the Azure Lab Services app
> * Create a lab in Teams or Canvas
> * Publish the lab to create the lab VMs

## Prerequisites


- An Azure account with an active subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


- An Azure account with permission to manage a lab, such as the [Lab Creator](concept-lab-services-role-based-access-control.md#lab-creator-role), [Owner](concept-lab-services-role-based-access-control.md#owner-role), [Contributor](concept-lab-services-role-based-access-control.md#contributor-role), or [Lab Services Contributor](concept-lab-services-role-based-access-control.md#lab-services-contributor-role) Azure RBAC role. Learn more about the [Azure Lab Services built-in roles and assignment scopes](concept-lab-services-role-based-access-control.md).


- An Azure lab plan. If you don't have a lab plan yet, follow the steps in [Quickstart: Set up resources to create labs](quick-create-resources.md).

# [Teams](#tab/teams)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


- To add the Azure Lab Services Teams app to a channel, your account needs to be an owner of the team in Microsoft Teams.

# [Canvas](#tab/canvas)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


- To add the Azure Lab Services app to Canvas, your Canvas account needs [Admin permissions](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-is-the-Admin-role/ta-p/78).

---

## Configure the Azure Lab Services app

# [Teams](#tab/teams)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


Before you can create and manage labs in Teams, you need to configure Teams to use the Azure Lab Services app and to grant access to your lab plan. Follow these steps to [configure Teams for Azure Lab Services](how-to-configure-teams-for-lab-plans.md).

After you configured Teams, you can now access the Azure Lab Services app from a channel in Teams. All users that are a member of the team are automatically added as lab users, and assigned a lab virtual machine.

In the next step, you use the Azure Lab Services app to create a lab.

# [Canvas](#tab/canvas)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


Before you can create and manage labs in Canvas, you need to configure Canvas to use the Azure Lab Services app and to grant access to your lab plan. Follow these steps to [configure Canvas for Azure Lab Services](how-to-configure-canvas-for-lab-plans.md).

After you configured Canvas, you can now access the Azure Lab Services app from a course in Canvas. All course members are automatically added as lab users, and assigned a lab virtual machine.

In the next step, you use the Azure Lab Services app to create a lab.

---

## Access the Azure Lab Services app

# [Teams](#tab/teams)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


1. Open Microsoft Teams, and select your team and channel.

    You should see the **Azure Lab Services** tab.

1. Select the **Azure Lab Services** tab.

    If you don't have any labs, you should see the welcome page. Otherwise, you can see the list of labs you created earlier.

    Screenshot that shows the Azure Lab Services tab in Teams.

    > **Tip:**
    > Use the **Show** filter to switch between your labs and all labs you have access to.

# [Canvas](#tab/canvas)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


1. Sign into Canvas, and select your course.

    If you're authenticated in Canvas as an educator, you'll see a sign in screen before you can use the Azure Lab Services app. Sign in here with a Microsoft Entra account or Microsoft account that was added as a lab creator.

1. Select **Azure Lab Services** from the course navigation menu.

    If you don't have any labs, you should see the welcome page. Otherwise, you can see the list of labs you created earlier.

    Screenshot that shows the welcome page in Canvas.

---

## Create a new lab

A lab contains the configuration and settings for creating lab VMs. All lab VMs within a lab are identical. You use the Azure Lab Services app to create a lab in the lab plan.

> **Important:**
> You can only see labs in Teams or Canvas that you created with the Azure Lab Services app. If you created a lab in the Azure Lab Services website, it is not visible in Teams or Canvas.

1. Select **Create lab** to start creating a new lab.

1. On the **New Lab** page, enter the following information, and then select **Next**:

    | Field | Description |
    | --- | --- |
    | **Name** | Enter *programming-101*. |
    | **Virtual machine image** | Select *Windows Server 2022 Datacenter*. |
    | **Virtual machine size** | Select *Small*. |
    | **Location** | Leave the default value. |

    Some virtual machine sizes might not be available depending on the lab plan region and your subscription core limit. Learn more about [virtual machine sizes in the administrator's guide](administrator-guide.md#vm-sizing) and how to [request additional capacity](how-to-request-capacity-increase.md).

    You can [enable or disable specific virtual machine images](specify-marketplace-images.md#enable-and-disable-images) by configuring the lab plan.

1. On the **Virtual machine credentials** page, specify a default **username** and **password**, and then select **Next**.

    By default, all the lab VMs use the same credentials.

    > **Important:**
    > Make a note of username and password. They won't be shown again.

1. On the **Lab policies** page, leave the default values and select **Next**.

    The default settings enable secure shell (SSH) access to the lab virtual machine, provide users with 10 quota hours, and shuts down the lab VMs when there's no activity.

1. On the **Template virtual machine settings** page, select **Use virtual machine image without customization**.

    In this tutorial, you use the VM image as-is, known as a *templateless VM*. Azure Lab Services also supports creating a *template VM*, which lets you make configuration changes or install software on top of the VM image.

    Screenshot of the Template virtual machine settings page, with the option selected to create a templateless VM.

1. Select **Finish** to start the lab creation. It might take several minutes for the lab creation to finish.

1. When the lab creation finishes, you can see the lab details in the **Template** page.

    Screenshot of the Template page for a templateless lab.

## Publish the lab

Azure Lab Services doesn't create the lab virtual machines until you publish the lab. When you publish the lab, the lab virtual machines are created, and assigned to the individual lab users.

To publish the lab:

1. On the **Template** page, select **Publish** on the toolbar.

   Screenshot of Azure Lab Services template page, highlighting the Publish button.

1. On the **Publish** page, select **Publish** to start publishing the lab.

   > **Warning:**
   > Publishing is an irreversible action, and can't be undone.

1. Wait until the publishing process finishes. You can track the publishing status on the **Template** page.

1. On the **Virtual machine pool** page, confirm that there's a lab VM for each lab user. The lab VMs are in the *Stopped* state.

    When you create a lab in Teams or Canvas, Azure Lab Services automatically manages the lab user list based on the team or course membership. When you add or remove users in Teams or Canvas, Azure Lab Services automatically assigns or withdraws access to the lab.
    
    Azure Lab Services also automatically manages the lab capacity (the number of lab virtual machines) and assigns the lab virtual machines to lab users. You can view the lab virtual machines and their assignments in the **Virtual machine pool** page:
    
    Screenshot of the Virtual machine pool page for a templateless lab.

## Troubleshooting

This section outlines common error messages that you might see, along with the steps to resolve them.

- Insufficient permissions to create lab.

  In Canvas, an educator will see a message indicating that they don't have sufficient permission. Educators should contact their Azure admin so they can be [added as a **Lab Creator**](quick-create-resources.md#add-a-user-to-the-lab-creator-role). For example, educators can be added as a **Lab Creator** to the resource group that contains their lab.

- Message that there isn't enough capacity to create lab VMs.

  [Request a limit increase](capacity-limits.md#request-a-limit-increase) which needs to be done by an Azure Labs Services administrator.

- Lab users see a warning that the lab isn't available yet.

  In Canvas, you'll see the following message if the educator hasn't published the lab yet. Educators must [publish the lab](tutorial-setup-lab.md#publish-lab) and [sync users](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-manage-user-lists-within-canvas.md#sync-users) for students to have access to a lab.

  Troubleshooting -> This lab is not available yet.

- Lab users or educators are prompted to grant access.

  Before a lab user or educator can first access their lab, some browsers require that they first grant Azure Lab Services access to the browser's local storage. To grant access, educators and students should select the **Grant access** button when they're prompted:

  Screenshot of page to grant Azure Lab Services access to use local storage for the browser.

  Educators and students see the message **Access granted** when access is successfully granted to Azure Lab Services. The educator or student should then reload the browser window to start using Azure Lab Services.

  Screenshot of access granted page in Azure Lab Services.

  > **Important:**
  > Ensure that students and educators are using an up-to-date version of their browser. For older browser versions, students and educators might experience issues with being able to successfully grant access to Azure Lab Services.

  - Educator isn't prompted for their credentials after they select sign-in.
  
  When an educator accesses Azure Lab Services within their course, they might be prompted to sign in. Ensure that the browser's settings allow popups from the url of your Canvas instance, otherwise the popup might be blocked by default.

    Azure Lab Services sign-in screen.

## Next steps

In this tutorial, you configured the Azure Lab Services app for Teams or Canvas and created and published a lab. Azure Lab Services automatically manages the lab users and assigns a lab virtual machine to each lab user. You can further configure the lab to [add a lab schedule](how-to-create-schedules.md) or modify the lab settings.

- Learn how you can [access and connect to a lab virtual machine from within Teams or Canvas](tutorial-access-lab-virtual-machine-teams-canvas.md).
