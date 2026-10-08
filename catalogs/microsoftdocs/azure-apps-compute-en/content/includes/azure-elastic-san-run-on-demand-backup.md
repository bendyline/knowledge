---
author: AbhishekMallick-MS
ms.service: azure-backup
ms.topic: include
ms.date: 09/03/2026
ms.author: v-mallicka
---

## Run an on-demand backup for Azure Elastic SAN volume by using the Azure portal

To run an on-demand backup for an Azure Elastic SAN volume, follow these steps:

1. Go to **Resiliency**, and select **Protection Inventory** > **Protected items**.
1. On the **Protected items** pane, filter **Datasource type** by **Elastic SAN volumes**, and select the Elastic SAN instance you want to back up.
1. On the selected **Elastic SAN instance** pane, under **Associated items**, select a protected item from the list.

   Screenshot that shows the selection of a backup instance to trigger backup.

1. On the selected **protected item** pane, select **Backup Now**.

   Screenshot that shows how to start backup.

When a backup job finishes, the service creates a Managed Disk incremental snapshot (restore point) in the snapshot resource group with the name pattern `AzureBackup_<datasource guid>_<timestamp>`. The backup policy retains the restore point according to the retention duration you set.
