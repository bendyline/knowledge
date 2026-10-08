---
title: Include file
description: Include file
author: sdgilley
ms.reviewer: deeikele
ms.author: sgilley
ms.service: microsoft-foundry
ms.topic: include
ms.date: 01/03/2025
ms.custom: include, build-2024, ignite-2024
---


 To create a 
hub-based project in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs), follow these steps:
 
1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.




1. 
What you do next depends on where you are:
* **If you're not in a project, or you don't have any projects yet**: Select **Create new** in the top right to create a new 
Foundry project

    Screenshot shows how to create a new project in Foundry.

* **If you're in a project**: Select the project breadcrumb, then select **Create new resource**.

    Screenshot shows creating a new project from a breadcrumb.



1. Select **AI hub resource**, then select **Next**.
1. Enter a name for the project.
1. If you have a hub, you'll see the one you most recently used selected.  
   * If you have access to more than one hub, you can select a different hub from the dropdown.
   * If you want to create a new one, select **Create a new hub** from the dropdown.  

      Screenshot of the project details page within the create project dialog.

1. If you don't have a hub, a default one is created for you. 
1. Select **Create**. 

Or, if you want to customize a new hub, follow the steps in the next section before you select **Create**.

### Customize the hub

A 
hub-based project exists inside a hub. A hub allows you to share configurations like data connections with all projects, and to centrally manage security settings and spend. If you're part of a team, hubs are shared across other team members in your subscription. For more information about the relationship between hubs and projects, see the [hubs and projects overview](../concepts/ai-resources.md) documentation.

When you create a new hub, you must have **Owner** or **Contributor** permissions on the selected resource group. If you're part of a team and don't have these permissions, your administrator should create a hub for you.

> **Tip:**
> While you can create a hub as part of the project creation, you have more control and can set more advanced settings for the hub if you create it separately. For example, you can customize network security or the underlying Azure Storage account. For more information, see [How to create and manage a Microsoft Foundry hub](../how-to/create-azure-ai-resource.md).

When you create a new hub as part of the project creation, default settings are provided. If you want to customize these settings, do so before you create the project:

1. In the **Create a project** form, select the arrow on the right side.

    Screenshot of the customize button within the create project dialog.

1. Select an existing **Resource group** you want to use, or leave the default to create a new resource group.

    > **Tip:**
    > Especially for getting started we recommend you create a new resource group for your project. The resource group allows you to easily manage the project and all of its resources together. When you create a project, several resources are created in the resource group, including a hub, a container registry, and a storage account.

1. Select a **Location** or use the default. The location is the region where the hub is hosted. The location of the hub is also the location of the project. Foundry Tools availability differs per region. For example, certain models might not be available in certain regions.

1. Select **Create a project**. You see progress of the resource creation. The project is created when the process is complete.
