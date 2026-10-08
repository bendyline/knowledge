---
title: Restore Azure Cosmos DB account using Azure portal
description: Learn about how to restore Azure Cosmos DB account.
ms.topic: how-to
ms.date: 08/27/2026
ms.service: azure-backup
ms.custom:
  - build-2026
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: "As a database administrator, I want to restore Azure Cosmos DB backups, so that I can ensure data recovery for compliance and manage database configurations effectively."
---

# Restore Azure Cosmos DB account (preview) using Azure portal

This article describes how to restore an Azure Cosmos DB account (preview) backed up using Azure portal.

Learn about the [supported regions, scenarios, and the limitations](backup-azure-cosmos-db-support-matrix.md) for Azure Cosmos DB backup (preview).

## Prerequisites

Before you restore from Azure Cosmos DB backups (preview), review the following prerequisites:

- Check that you have the required permissions for the restore operation.

- Verify that the target Azure Cosmos DB account is empty.

## Restore Azure Cosmos DB account

To restore Azure Cosmos DB account, follow these steps:

1. Go to **Resiliency**, and then select **Overview** > **Recover**.

   Alternatively, to restore backup from the **Backup vault** pane, go to the **Backup vault** > **Overview**, and select **Restore**.

2. On the **Recover** pane, select **Resource managed by** as **Azure**, **Datasource type** as **Azure Cosmos DB (Preview)**, and **Solution** as **Azure Backup**.
  
3. Select the **protected item** for which you want to restore the backup, and then select **Continue**.

4. On the **Restore** pane, on the **Restore point** tab, select **Select restore point** and choose the restore point you want to restore.
   
   The latest restore point is pre-populated.

   Screenshot shows the restore point selection.

>**Note:**
>When you select an incremental recovery point, Azure Backup automatically restores the full backup chain - the parent full backup and every incremental backup up to the point you select. Azure Backup verifies that all dependent recovery points are present before the restore begins. Restores from an incremental recovery point can take longer than restores from a full backup because the chain is reconstructed. 

5. On the **Restore parameters** tab, for **Restore configuration**, choose the target Azure Cosmos DB account details by selecting **Select**. 

   Screenshot shows the restore parameters selection.

6. Select the subscription and resource group and then choose the target Azure Cosmos DB account.

   Screenshot shows the selected restore parameters.
 
7. To check the restore parameters permissions before the final review and restore, select **Validate**. After validation is successful, select **Review + restore**.

   Screenshot shows the restore parameters validation.

8. On the **Review + restore** tab, select **Restore** to restore the selected Azure Cosmos DB account backup in a target Azure Cosmos DB account.

   Screenshot to review and restore backup.
        
You can track the restore job under **Backup jobs**.
              
## Next steps

[Manage vaulted backup of Azure Cosmos DB account using Azure portal (preview)](backup-azure-cosmos-db-manage.md).
