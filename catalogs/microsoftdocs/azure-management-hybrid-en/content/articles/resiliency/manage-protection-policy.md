---
title: Manage protection policy for resources
description: In this article, you learn how to manage backup and replication policies to protect your resources.
ms.topic: how-to
ms.date: 11/19/2025
ms.service: resiliency
ms.custom:
  - ignite-2023
  - ignite-2024
author: AbhishekMallick-MS
ms.author: v-mallicka
---

# Manage backup and replication policies for your resources

This article describes how to view your protection policies (backup and replication policies), and performs actions related to them using Resiliency in Azure. 

By using Resiliency, you can centrally manage the lifecycle of your replication and backup protection policies for both Azure Backup or Azure Site Recovery.



>**Important:**
>Azure Business Continuity Center is now Resiliency in Azure, a unified platform for Zone Resiliency, High Availability, Backup & Disaster Recovery, and Ransomware Protection that offers integrated experiences to ensure ongoing resilience of your applications. To try the zonal feature in Resiliency, fill out [this enrollment form](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9NW9IkjD2RCnDQwsmIfABFUNU5MWUVaN1FWWDYxMFY1VTNBM1FPVDM3OC4u&route=shorturl).


## Prerequisites

Before you start managing policies, ensure you have the required resource permissions to view them in the Resiliency in Azure.

## View protection policies

Use Resiliency to view all your existing protection policies (backup and replication policies) from a single location and manage their lifecycle as needed.

To view the protection policies, follow these steps:

1.	On **Resiliency**, go to **Manage** > **Protection policies**. 
    In this view, you can see a list of all the backup and replication policies across subscription, resource groups, location, type etc. along with their properties. 
    
    Screenshot showing list of policies.

1.	You can also select the policy name or the ellipsis (`...`) icon to view the policy action menu and navigate to further details. 
    Screenshot showing View policy page.
 
1.	To look for specific policy, you can use various filters, such as subscriptions, resource groups, location, and resource type, and more. 
1.	Using the solution filter, you can customize the view to show only backup policies or only replication policies.
    You can also search by the vault name to get specific information.
    Screenshot showing policy filtering page.
 
1.	Resiliency allows you to change the default view using a scope picker. Select the **Change** option beside the **Currently showing:** details displayed at the top.
    Screenshot showing \*\*Change scope\*\* page.
 
8.	To change the scope for protection policies pane using the scope-picker, select the required options:
    - **Resource managed by**: 
        - **Azure resource**: resources managed by Azure
        - **Non-Azure resources**: resources not managed by Azure
9.	You can use **Select columns** to add or remove columns. 
    Screenshot showing \*select columns\* option.

   You can also query information for your backup and replication policies at no extra cost using Azure Resource Graph (ARG). ARG is an Azure service designed to extend Azure Resource Management. It aims to provide efficient resource exploration with the ability to query at scale across a given set of subscriptions. 
 
   To get started with querying information for your backup and replication policies using ARG, you can use the sample query provided by selecting **Open query**.

   Screenshot shows how to check for queries to view backup and replication policies.

## Next steps

- [Configure protection](tutorial-configure-protection-datasource.md).
- [View protectable resources](tutorial-view-protectable-resources.md)
