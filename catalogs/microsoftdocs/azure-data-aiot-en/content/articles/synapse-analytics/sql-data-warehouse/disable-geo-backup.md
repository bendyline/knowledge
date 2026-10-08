---
title: Disable geo-backups
description: How-to guide for disabling geo-backups for a dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics
author: joannapea
ms.author: joanpo

ms.date: 07/23/2024
ms.service: azure-synapse-analytics
ms.subservice: sql-dw
ms.topic: how-to
ms.custom: sfi-image-nochange
---

# Disable geo-backups for a dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

In this article, you learn to disable geo-backups for your [dedicated SQL pool (formerly SQL DW)](sql-data-warehouse-overview-what-is.md) in the Azure portal.

## Disable geo-backups through Azure portal

Follow these steps to disable geo-backups for your dedicated SQL pool (formerly SQL DW):

> **Note:**
> If you disable geo-backups, you will no longer be able to recover your dedicated SQL pool (formerly SQL DW) to another Azure region.
> 
> - Disabling geo-backup results in the deletion of all existing geo-backups associated with the instance.
> - Once geo-backup is disabled, you cannot use existing geo-backups.
> - If the instance is active at the time of disabling geo-backup, all geo-backups will be deleted.
> - If the instance is paused, geo-backups will be deleted upon resuming the instance.

1. Sign in to your [Azure portal](https://portal.azure.com/) account.
1. Select the dedicated SQL pool (formerly SQL DW) resource where you would like to disable geo-backups. 
1. Under **Settings** in the left-hand navigation panel, select **Geo-backup policy**.

   A screenshot from the Azure portal, of the navigation menu, showing where to find the geo-backup policy page.

1. To disable geo-backups, select **Disabled**. 

   A screenshot from the Azure portal, of the disable geo-backup option.

1. Select **Save** to ensure that your settings are saved. 

   A screenshot from the Azure portal, showing the Save geo-backup settings button.

## Related content

- [Restore an existing dedicated SQL pool (formerly SQL DW)](sql-data-warehouse-restore-active-paused-dw.md)
- [Restore a deleted dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics](sql-data-warehouse-restore-deleted-dw.md)
