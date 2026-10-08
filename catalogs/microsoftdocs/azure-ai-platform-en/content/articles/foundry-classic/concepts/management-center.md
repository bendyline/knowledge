---
title: "Management center overview (classic)"
description: "The management center in Microsoft Foundry portal provides a centralized hub for governance and management activities. (classic)"
ms.author: sgilley
author: sdgilley
ms.reviewer: aashishb
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.custom:
  - ignite-2024
  - dev-focus
ms.topic: concept-article
ms.date: 01/23/2026
ai-usage: ai-assisted
#customer intent: As an admin, I want a central location where I can perform governance and management activities.
---

# Management center overview (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



The management center is part of the Microsoft Foundry portal that streamlines governance and management activities. From the management center, you can manage:

- Foundry hubs and 
hub-based projects
- Azure AI 
Foundry projects
- Quotas for models and virtual machines (VMs)

    > **Note:**
    > VMs and VM quotas are only available for 
hub-based projects.

- User management and role assignment

To access the management center, sign in to [Foundry](https://ai.azure.com/?cid=learnDocs), select a project, and then select **Management center** from the bottom of the left menu. (You might have to scroll down to find it.)

Screenshot of the left menu of Foundry with the management center selected.

## Manage Foundry projects

Use the management center to create and configure 
Foundry projects. Use **All resources** to view all 
Foundry projects that you have access to, or to create new projects. Use the **Project** section (Project = Foundry project) of the left menu to manage and create individual 
Foundry projects on the Foundry resource.

Screenshot of the all resources, hub, and project sections of the management studio selected.

For more information, see [Create a 
Foundry project](../how-to/create-projects.md).

### Manage Foundry hubs and hub-based projects

You can also manage 
hub-based projects from the management center. The management center lists them in the **All resources** section. When you select a hub, the portal displays it in the left menu.

For more information, see [Create a 
hub-based project](../how-to/hub-create-projects.md).

## Manage resource utilization

View and manage quotas and usage metrics across multiple projects and Azure subscriptions. Use the **Quota** link from the left menu to view and manage quotas. VM quotas apply to hub-based projects only.

Screenshot of the quotas section of the management center.

For more information, see [Manage and increase quotas for resources](../how-to/quota.md).

## Govern access

With a project selected, use the __Users__ entry in the left menu to view and manage users and their roles.

> **Note:**
> You can only assign built-in roles for Foundry here.

For more information, see [Role-based access control](rbac-foundry.md#built-in-roles).

## Related content

- [Add a new connection to your project](../how-to/connections-add.md)
- [Security baseline](https://learn.microsoft.com/security/benchmark/azure/baselines/azure-ai-foundry-security-baseline)
- [Built-in policy to allow specific models](../how-to/built-in-policy-model-deployment.md)
- [Custom policy to allow specific models](../foundry-models/how-to/configure-deployment-policies.md)
