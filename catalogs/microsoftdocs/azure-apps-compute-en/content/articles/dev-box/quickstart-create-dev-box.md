---
title: 'Quickstart: Create and Access a Dev Box in the Cloud'
titleSuffix: Microsoft Dev Box
description: 'Set up your cloud dev environment: Create a dev box in Microsoft Dev Box and connect remotely. Get started quickly and work on projects from any device.'
services: dev-box
ms.service: dev-box
ms.custom:
  - build-2024
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:05/28/2025
  - ai-gen-description
ms.topic: quickstart
author: RoseHJM
ms.author: rosemalcolm
ms.date: 05/28/2025
---

# Quickstart: Create and connect to a dev box by using the Microsoft Dev Box developer portal


> **Important:**
> Microsoft Dev Box retires at 17:00 UTC on 18 September 2028. Start developing your retirement plan now to validate feature differences, secure licenses and capacity, and transition developer workflows to the recommended Microsoft solution.
>
> Transition your Microsoft Dev Box workflows to Windows 365 or another appropriate solution by 18 September 2028. Microsoft Dev Box retires fully on this date. The service begins its closing-down period at 16:00 UTC on 14 September 2026.
>
> [Microsoft Dev Box retirement guide](dev-box-retirement-guide.md)


Microsoft Dev Box provides cloud-based developer workstations that you can create and manage on demand. This quickstart shows you how to create a dev box in the Microsoft Dev Box developer portal and connect to it remotely. Follow these steps to quickly set up your cloud development environment and start working on your projects from anywhere.

Create and manage multiple dev boxes as a dev box user. Create a dev box for each task you're working on, and create multiple dev boxes in a single project to streamline your workflow. For example, switch to another dev box to fix a bug in a previous version, or to work on a different part of the application.

## Prerequisites

To complete this quickstart, you need:

| Product | Requirements |
| --- | --- |
| Microsoft Dev Box | Your organization needs to set up Microsoft Dev Box with at least one project and dev box pool before you create a dev box. <br> - Platform engineers can follow these steps to set up Microsoft Dev Box: [Quickstart: Configure Microsoft Dev Box](quickstart-configure-dev-box-service.md). <br>**Permissions** <br> - You need permissions as a [Dev Box User](quickstart-configure-dev-box-service.md#provide-access-to-a-dev-box-project) for a project that has an available dev box pool. If you don't have permissions to a project, contact your admin. |
| Windows App | To connect to a dev box with the Windows App, install the Windows App on your device. <br> - [Download Windows App](https://apps.microsoft.com/detail/9n1f85v9t8bn?hl=en-us&gl=US) |

## Create a dev box

Microsoft Dev Box enables you to create cloud-hosted developer workstations in a self-service way. You can create and manage dev boxes by using the developer portal.

Depending on the project configuration and your permissions, you might have access to different projects and associated dev box configurations. If you have a choice of projects, images, and regions, select the resources that best fit your needs. For example, you might choose a region located near to you for the least latency.

You can create multiple dev boxes in a single project, and you can create multiple dev boxes in different projects. Project administrators can set limits on the number of dev boxes you can create in a project. If you reach the limit, you can't create any more dev boxes in that project until you delete one or more dev boxes.

> **Important:**
> Your organization must configure Microsoft Dev Box with at least one project and dev box pool before you can create a dev box. If you don't see any projects or dev box pools, contact your administrator.

Create a dev box in the Microsoft Dev Box developer portal:


1. Go to the [developer portal](https://aka.ms/devbox-portal). The landing page contains useful information and links. When you're ready, select **Sign in**. 

   Screenshot of the developer portal landing page with sign-in highlighted.

2. The first time you visit the developer portal, you're welcomed with a short tour. Select **Continue** to learn about the developer portal, or select **Skip** to go straight to the portal.

   Screenshot of the welcome tour in the developer portal.

#### [No existing dev boxes](#tab/no-existing-dev-boxes)

3. If you don't have any dev boxes, you see this screen. Select **New dev box**.

   Screenshot of the developer portal with new dev box highlighted.

#### [Existing dev boxes](#tab/existing-dev-boxes)

3. If you have existing dev boxes, you see this screen. Select **New** > **New dev box**.
 
   Screenshot of the developer portal with the New menu and Dev box option highlighted.
 
---

4. In **Add a dev box**, enter the following values:

   | Setting | Value |
   | --- | --- |
   | **Name** | Enter a name for your dev box. Dev box names must be unique within a project. |
   | **Project** | If available, select a project from the list. |
   | **Image** | If available, select an image from the list. Choose an image that contains the tools and code needed for your development tasks. |
   | **Region** | If available, select a region for your dev box. Choose a region close to you for least latency. |

   Screenshot of the dialog for adding a dev box in the developer portal.

      After you make your selections, the page shows the following information:

   - How many dev boxes you can create in the selected project, if the project has limits set.
   - Whether *Hibernation* is supported.
   - Whether you can apply *Customizations*.
   - The shutdown time if the pool where you're creating the dev box has a shutdown schedule.
   - A notification that the dev box creation process can take 25 minutes or longer.
   
5. Select **Create** to start creating your dev box.

6. Track the creation progress by using the dev box tile in the developer portal. The status changes from *Creating* to *Running* when the dev box is ready for you to connect.
      
   Screenshot of the developer portal showing the dev box card with a status of Creating.
   
      > **Note:**
   > If you get a vCPU quota error with a *QuotaExceeded* message, ask your admin to [request an increased quota limit](https://learn.microsoft.com/azure/dev-box/how-to-request-quota-increase). If your admin can't increase the quota limit now, try selecting another pool with a region close to your location. 


> **Tip:**
> A dev box is automatically started and running when the creation process finishes. Dev boxes incur costs whenever they're running.


## Connect to a dev box

After you create a dev box, connect to it remotely through the developer portal on your desktop, laptop, tablet, or phone. Microsoft Edge gives you the best experience. The developer portal lets you connect by using Windows App.

### Connect by using Windows App


1. To install the Windows App, select **Download Windows App** under **Quick actions** on the dev center home screen, or go to the [Windows App Microsoft Store page](https://apps.microsoft.com/detail/9n1f85v9t8bn). On the Store page, select **View in Store** to install the app.

1. To connect to your dev box by using the Windows App, [sign in to the developer portal](https://aka.ms/devbox-portal) and select **Connect via app** on the dev box tile.

   Screenshot of dev box tile, showing the Connect via app option.



> **Tip:**
> To ensure continued connectivity to your Dev Boxes, regular startup is required in accordance with [Azure Virtual Desktop (AVD) guidance](https://aka.ms/how-often-turn-on-vms). 

## Use multiple monitors


You can configure multiple monitors for your dev box to work on multiple tasks at the same time, such as debugging and writing code. You can also use multiple monitors to view different applications side by side.

To enable multiple monitors:

1. Sign in to the [developer portal](https://aka.ms/devbox-portal) and select the **Settings** icon at top right.
 
   Screenshot of the developer portal, showing the user settings icon in the top right corner.

1. In **User settings**, select **Use multiple monitors**, and then close **User settings**.
 
   Screenshot of the dev box user settings, showing the option for using multiple monitors.



## Clean up resources

In this quickstart, you created a dev box through the developer portal and connected to it by using a browser. 

When you no longer need your dev box, delete it:


1. Sign in to the [developer portal](https://aka.ms/devbox-portal).

1. For the dev box that you want to delete, on the **Actions** menu, select **Delete**.

   Screenshot of the dev box Actions menu with the Delete command.

1. To confirm the deletion, select **Delete**.

   Screenshot of the confirmation message about deleting a dev box.
 

## Related content

In this quickstart, you created a dev box through the developer portal and connected to it by using a browser. 

- Find out [What's new in Microsoft Dev Box](https://aka.ms/devbox/WhatsNew)
- Review the [Microsoft Dev Box retirement guide](dev-box-retirement-guide.md).
- Learn how to [Manage a dev box by using the Microsoft Dev Box developer portal](how-to-create-dev-boxes-developer-portal.md)
