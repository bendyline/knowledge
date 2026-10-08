---
title: Review security posture
description: Learn how to review security posture
ms.topic: tutorial
ms.service: resiliency
ms.custom:
  - ignite-2023
  - ignite-2024
ms.date: 11/19/2025
author: AbhishekMallick-MS
ms.author: v-mallicka
---

# Tutorial: Review security posture

This tutorial describes how to review and modify the security level for protected items in Resiliency in Azure.



>**Important:**
>Azure Business Continuity Center is now Resiliency in Azure, a unified platform for Zone Resiliency, High Availability, Backup & Disaster Recovery, and Ransomware Protection that offers integrated experiences to ensure ongoing resilience of your applications. To try the zonal feature in Resiliency, fill out [this enrollment form](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9NW9IkjD2RCnDQwsmIfABFUNU5MWUVaN1FWWDYxMFY1VTNBM1FPVDM3OC4u&route=shorturl).


Azure Backup provides security features at the vault level to safeguard the backup data stored in it. The vault security measures encompass the settings associated with the Azure Backup solution for the vault and apply to the protected data sources contained within the vault.

Resiliency in Azure allows you to view the security level for each protected item from the security posture view.

## View security level

To view the security level for protected items, follow these steps:

1. On **Resiliency**, go to **Security + Threat management** > **Security posture**.

    Screenshot shows the security posture selection.

2. On **Security posture**, you can see a list of all the protected items and their security level across subscription, resource groups, location, type, and so on, along with their properties.

    Screenshot shows the security level of selected items in a table selection.

   To effectively look for specific items, use the filters, such as subscriptions, resource groups, location, resource type, and so on. 

3.	To change the default view in Resiliency using the **scope picker** from **Currently showing: Protection status details of Azure managed Active resources**, select **Change**.

    Screenshot shows the change scope view.

4. On the **Change scope** blade, to change the scope for **Security posture** view from the scope picker, select the following options, and select **Update**.
    - **Resource status**: 
        - **Active resources** - Resources that are currently active, which aren't deleted.
        - **Deprovisioned resources** - Describes resources that no longer exist, yet their backup and recovery points are retained.

   The resiliency Security assessment score shows the percentage and count of the protected items having adequate or maximum security.

   Screenshot shows resiliency security assessment selection view.

5. On **Security posture**, the summary cards display an aggregated count for each security level, considering the applied filters. Select these cards to refine the filtering of the Protected items table.

   The security level shows the security settings configured through the implemented solutions for data protection.

   Screenshot shows the summary cards view.

6. To get information for a specific item, search by the item name.

    Screenshot shows the search specific item search box view.

7. Use **Select columns** to add or remove columns.

    Screenshot shows the select columns selection.

8. Select the item name or select the more icon **…** > **View details** action menu to navigate and view further details for an item.

   Screenshot shows the view details selection.

9.	Resiliency in Azure provides built-in help to learn more about these security levels. Select **learn more** to access it.

    Screenshot shows learn more selections.

     On the **Security level details** blade, the help provides guidance on the various security levels and the settings that are required to meet each level. 

     Screenshot shows the security levels details selection.

## Modify security level

In Resiliency in Azure, you can change the security level for a protected item. 

To modify the security level for an item, follow these steps:

1. On **Resiliency**, go to **Security + Threat management** > **Security posture**, and then select an **item name** for a datasource. 

    Screenshot shows the item name selection for a datasource.

2.	On the **item details** page, you can view the vault used to protect the item. Select the vault name.

    Screenshot shows the select vault name selection on item details page.

3.	On the vault **properties** page, modify the security settings as required.

    Screenshot shows the modify-security settings option on properties page.

     It might take a while to get the security level settings implemented in Resiliency.

     When you modify the security setting for a vault, it gets applied to all the protected datasources by Azure Backup in that vault.

## Next steps

- [Manage a vault](manage-vault.md).
- [Review security posture](tutorial-review-security-posture.md).
