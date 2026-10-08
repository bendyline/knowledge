---
title: Create a user defined restore point for a dedicated SQL pool
description: Learn how to use the Azure portal to create a user-defined restore point for dedicated SQL pool in Azure Synapse Analytics.
author: joannapea
ms.author: joanpo

ms.date: 01/23/2024
ms.service: azure-synapse-analytics
ms.subservice: sql
ms.topic: how-to
ms.custom: sfi-image-nochange
---
# User-defined restore points

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

In this article, you'll learn to create a new user-defined restore point for a dedicated SQL pool in Azure Synapse Analytics by using the Azure portal.

## Create user-defined restore points through the Azure portal

User-defined restore points can also be created through Azure portal.

1. Sign in to your [Azure portal](https://portal.azure.com/) account.

1. Navigate to the dedicated SQL pool that you want to create a restore point for.

1. Select **Overview** from the left pane, select **+ New restore point**. If the New Restore Point button isn't enabled, make sure that the dedicated SQL pool isn't paused.

    Screenshot from the Azure portal, on the Overview page of a SQL pool. The New Restore Point button is highlighted.

1. Specify a name for your user-defined restore point and select **Apply**. User-defined restore points have a default retention period of seven days.

    Screenshot from the Azure portal, providing the name of new user-defined restore point.

## Next step

> 
> [Restore an existing dedicated SQL pool](restore-sql-pool.md)
