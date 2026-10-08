---
title: View protected items and perform actions
description: Learn how to view protected items and perform actions
ms.topic: tutorial
ms.service: resiliency
ms.custom:
  - ignite-2023
  - ignite-2024
ms.date: 11/19/2025
author: AbhishekMallick-MS
ms.author: v-mallicka
---

# Tutorial: View protected items and perform actions

This tutorial describes how to view your datasources that are protected by one or more solutions and perform actions on them from Resiliency in Azure.



>**Important:**
>Azure Business Continuity Center is now Resiliency in Azure, a unified platform for Zone Resiliency, High Availability, Backup & Disaster Recovery, and Ransomware Protection that offers integrated experiences to ensure ongoing resilience of your applications. To try the zonal feature in Resiliency, fill out [this enrollment form](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9NW9IkjD2RCnDQwsmIfABFUNU5MWUVaN1FWWDYxMFY1VTNBM1FPVDM3OC4u&route=shorturl).


## Prerequisites

Before you start viewing protected items and take necessary actions, ensure you have the following prerequisites:

- [Review supported regions for Resiliency in Azure](resiliency-support-matrix.md).
- You need to have permission on the resources to view them in Resiliency.

## View protected items

As a resiliency admin, identify and configure protection for critical resources that don't have backup or replication configured. You can also view their protection details.
  
Resiliency in Azure provides you with centralized and at scale views for overseeing your protection landscape, offering a unified perspective across various solutions. 

To view protected items, follow these steps to view your protected items:

1.	On **Resiliency**, go to **Protection inventory** > **Protected items**.

    Screenshot shows the selection of protected items.

2.	On **Protected items**, you can see a list of all the protected items across the supported solution across the subscription, resource groups, location, type, and so on, along with their protection status.

   Resiliency in Azure allows you to change the default view using a scope picker. Select the **Change** corresponding to the **Currently showing: Protection details of Azure managed Active resources**.

   Screenshot shows the selection of change scope from scope picker.

3.	On the **Change scope** blade, to change the scope for **Security posture** view from the scope picker, select the required options:
    - **Resource managed by:**
        - **Azure resource**: resources managed by Azure
        - **Non-Azure resources**: resources not managed by Azure
    - **Resource status**: 
        - **Active resources**: Resources that are currently active, which aren't deleted.
        - **Deprovisioned resources** - Describes resources that no longer exist, yet their backup and recovery points are retained.
    - **Protected item details**:  
        - **Protection status** - protection status of protected item in primary and secondary regions
        - **Retention details**: Retention details for protected items

4.	To effectively look for specific items, you can utilize various filters, such as subscriptions, resource groups, location, resource type, and so on. 

5.	The summary cards display an aggregated count for each security level, considering the applied filters. Select these cards to refine the filtering of the Protected items table.

    Screenshot shows the selection of summary cards.

6.	To get information for a specific item, search by specific item name.

    Screenshot shows the selection for search item name.

7.	Use **Select columns** to add or remove columns.

    Screenshot shows the select columns selection on the menu.

8.	Resiliency in Azure provides built-in help to learn more about the protected item view and guidance on protection. On **Protected items**, select **Learn more about the importance of protection in both regions and status evaluation** to access it. 

    Screenshot shows learn more protected item view and guidance on protection selection.

9. On the **Importance of protection in primary and secondary regions** blade, the help provides guidance on the various security levels and the settings that are required to meet each level. 

    Screenshot shows learn more guidance blade.

10.	On **Protected items**, the **Protected items details** table shows the protection status for each protected item in the primary and secondary regions.

    - **Resource name**: Lists the underlying resource that is protected.
    - **Protected item**: Shows the name of the protected resource.
    - **Configured solutions**: Shows the number of solutions protecting the resource.
    - **Protection status**: Protected items should be recoverable in both the primary and secondary regions. Protection status in the primary region refers to the region in which datasource is hosted. Protection status in secondary region refers to the paired or target region in which datasource can be recovered if the primary region isn't accessible.
    
    The protection status can be Pending protection (protection is triggered and in progress), Protection disabled (protection is turned off, for example, in a soft-deleted state for Azure Backup), Protection paused (protection is stopped but data is retained as per the solution provider), or Protected.

    If the datasource is protected by multiple solutions (two or more), the protection status is determined in the following order:

    -  When one or more solutions indicate that the protection status is disabled, then the protected item status is shown as **Protection disabled**.
    - When one or more solutions indicate that the protection status is paused, then the protected item status is shown as **Protection paused**.
    - When one or more solutions indicate that the protection status is pending, then the protected item status is shown as **Pending protection**.
    - When all the configured solutions indicate that the protection status is protected, then the protected item status is shown as **Protected**.
    - If there's no protection for a datasource in primary or secondary region, then the protected item status for that region is shown as **Not protected**.
    - For example, if a resource is protected by both Azure Backup (with status **Protection paused**) and Azure Site Recovery (with status **Protected**), then the protection status for the region displays **Protection paused**.

11.	Under **Scope**, when you choose the retention details, the view loads the retention information for the protected items. The Protected items retention table shows the retention details for each protected item in the primary and secondary regions.
    - **Resource name**: Lists the underlying resource that is protected.
    - **Protected item**: Shows the name of the protected resource.
    - **Configured solutions**: Shows the number of solutions protecting the resource.
    - Retention in primary
    - Retention in secondary

    Screenshot shows the protected items in the retention table.

You can also query information on protection for your resources at no extra cost using Azure Resource Graph (ARG). ARG is an Azure service designed to extend Azure Resource Management. It aims to provide efficient resource exploration with the ability to query at scale across a given set of subscriptions. 

To get started with querying information on protection for your resources using ARG, you can use the sample query provided, by selecting **Open query**.

Screenshot shows how to get sample query to view protected resource details.

## View Protected item details

To view more details for a specific protected item, follow these steps:

1.	On **Resiliency**, go to **Protection inventory** > **Protected items**.

    Screenshot showing the selection of protected items.

2.	On **Protected items**, select the item name or select the more icon **…** > **View details** action menu to navigate and view further details for an item.

    Screenshot shows the view details selection.

3.	On the item details view, you can see more information for item.

    Screenshot shows the item details view.

4.	The view also allows you to change the default view using the **scope picker** from **Currently showing: Protection status details**, select **Change**.

    Screenshot shows protection status details button selected in Change scope.

5.	On the **Change scope** blade, to change the scope for **Security posture** view from the scope-picker, select the required options:
    - **Protection status** - protection status of the protected item in primary and secondary regions
    - **Retention details** - retention details for protected items
    - **Security posture details** - security details for protected items
    - **Alert details** - alerts fired details for protected items
    - **Health details** - health details for protected items 

## Perform actions

With the protected items view, you can choose to perform actions from:

1.	The menu available at the top of the view for actions like configure protection, recover, and so on. Using this option allows you to select multiple data sources.

    Screenshot shows the configure action and recover selection on the menu.

2.	The menu on individual items in Protected items view. This option allows you to perform actions for the single resource.

    Screenshot shows the protected items view.

3.	When **Solutions filter** is set to **ALL**, common actions across the solutions are available on the item like 
    - **Enhance protection** – Allows you to protect the items with the other solutions than the ones that are already used to protect the item. 
    - **Recover** – Allows you to perform the available recovery actions for the solutions with which the item is protected, that is, configured solutions.
    - **View details** – Allows you to view more information for the protected item. 

    Screenshot shows the select solution filter selection.

4.	Choose a specific solution in the filter and notice solution specific actions command bar (appears over the protected items table and on the Protected item) by selecting the more icon **…** corresponding to the specific item.

    Screenshot shows the select more icon view.

## Next steps

For more information about Resiliency and how it works, check out [Configure protection from Resiliency](tutorial-configure-protection-datasource.md).
