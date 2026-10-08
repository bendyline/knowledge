---
title: Create protection policy for resources
description: In this article, you learn how to create backup and replication policies to protect your resources.
ms.topic: how-to
ms.date: 11/19/2025
ms.service: resiliency
ms.custom:
  - ignite-2023
  - ignite-2024
author: AbhishekMallick-MS
ms.author: v-mallicka
---

# Create backup and replication policies for your resources

This article describes how to create a backup and replication policy. The policy works for backups with Azure Backup and replication with Azure Site Recovery. 

A backup policy defines when backups are taken, and how long they're retained. [Learn more](../backup/guidance-best-practices.md#backup-policy-considerations) on the guidelines when creating a backup policy. 

Replication policy defines the settings for recovery point retention history and app-consistent snapshot frequency. By default, [Site Recovery](../site-recovery/site-recovery-overview.md) creates a new replication policy with default settings of 24 hours for recovery point retention.  



>**Important:**
>Azure Business Continuity Center is now Resiliency in Azure, a unified platform for Zone Resiliency, High Availability, Backup & Disaster Recovery, and Ransomware Protection that offers integrated experiences to ensure ongoing resilience of your applications. To try the zonal feature in Resiliency, fill out [this enrollment form](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9NW9IkjD2RCnDQwsmIfABFUNU5MWUVaN1FWWDYxMFY1VTNBM1FPVDM3OC4u&route=shorturl).


## Prerequisites

Before you create a backup policy, [review](../backup/guidance-best-practices.md#backup-policy-considerations) the guidelines for creating a backup policy. 

## Create policy

To create a policy, follow these steps:

1. On **Resiliency**, go to **Manage** > **Protection Policies**.
    Screenshot showing \*\*Protection Policies\*\* page.

1. On **Protection polices**, select **+Create policy**.  
    Screenshot showing \*\*+Create policy\*\* option.

1. Select the type of policy you want to create. 
    Screenshot showing policy options.

    >**Note:**
    > Based on the selected policy step, specific configuration page opens. For example, if you choose *backup policy* opens **Start: Create Policy** page for Azure Backup. Choosing *replication policy* opens the **Start: Create Policy** page for Azure Site Recovery.
1. Select **Continue** and navigate to the specific configuration page based on the selected policy type and complete the workflow.
    >**Note:**
    > It can take a while to create the vault. Monitor the status notifications in the **Notifications** pane at the top of the page.
1. After the vault is created, it appears in the list of vaults as part of the Resiliency experiences. If the vault doesn't appear, select **Refresh**.


## Next steps 

- [Manage protection policies](manage-protection-policy.md).
- [Configure protection](tutorial-configure-protection-datasource.md).
