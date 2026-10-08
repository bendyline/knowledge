---
title: Tutorial - Configure SAP HANA database instance snapshot backup 
description: In this tutorial, learn how to configure the SAP HANA database instance snapshot backup and run an on-demand backup.
ms.topic: tutorial
ms.date: 11/13/2025
ms.custom:
ms.service: azure-backup
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As a database administrator, I want to configure and run on-demand snapshot backups for my SAP HANA instance, so that I can ensure data protection and quick recovery options for my database.
---

# Tutorial: Configure SAP HANA database instance snapshot backup

This tutorial describes how to configure backup for SAP HANA database instance snapshot and run an on-demand backup using Azure CLI.

Azure Backup now performs an SAP HANA storage snapshot-based backup of an entire database instance. Backup combines an Azure managed disk full or incremental snapshot with HANA snapshot commands to provide instant HANA backup and restore.

For more information on the supported scenarios, see the [support matrix](sap-hana-backup-support-matrix.md#scenario-support) for SAP HANA.

## Before you start

Before you configure the database backup, consider the following prerequisites:

- Ensure that you have the [permissions for the backup operation](sap-hana-database-instances-backup.md#permissions-required-for-backup).
- [Create a Recovery Services vault](sap-hana-database-instances-backup.md#create-a-recovery-services-vault) for the backup and restore operations.
- [Create a backup policy](sap-hana-database-instances-backup.md#create-a-policy).


## Configure snapshot backup for SAP HANA database instance

Before you configure a snapshot backup in this section, [configure the backup for the database](https://learn.microsoft.com/azure/backup/backup-azure-sap-hana-database#configure-backup).

Then, to configure a snapshot backup, do the following:

1. In the Recovery Services vault, select **Backup**.

1. Select **SAP HANA in Azure VM** as the data source type, select a Recovery Services vault to use for backup, and then select **Continue**.

1. On the **Backup Goal** pane, under **Step 2: Configure Backup**, select **DB Instance via snapshot**, and then select **Configure Backup**.

   Screenshot that shows the 'DB Instance via snapshot' option.

1. On the **Configure Backup** pane, in the **Backup policy** dropdown list, select the database instance policy, and then select **Add/Edit** to check the available database instances.

   Screenshot that shows where to select and add a database instance policy.

   To edit a DB instance selection, select the checkbox that corresponds to the instance name, and then select **Add/Edit**.

1. On the **Select items to backup** pane, select the checkboxes next to the database instances that you want to back up, and then select **OK**.

   Screenshot that shows the 'Select items to backup' pane and a list of database instances.

   When you select HANA instances for backup, the Azure portal validates for missing permissions in the system-assigned managed identity that's assigned to the policy.

   If the permissions aren't present, you need to select **Assign missing roles/identity** to assign all permissions.

   The Azure portal then automatically re-validates the permissions, and the **Backup readiness** column displays the status as *Success*.

1. When the backup readiness check is successful, select **Enable backup**.

   Screenshot that shows that the HANA database instance backup is ready to be enabled.
 
## Run an on-demand backup for SAP HANA database instance snapshot

To run an on-demand backup, do the following:

1. In the Azure portal, select a Recovery Services vault.

1. In the Recovery Services vault, on the left pane, select **Backup items**.

1. By default, **Primary Region** is selected. Select **SAP HANA in Azure VM**.

1. On the **Backup Items** pane, select the **View details** link next to the SAP HANA snapshot instance.

   Screenshot that shows the 'View details' links next to the HANA database snapshot instances.

1. Select **Backup now**.

   Screenshot that shows the 'Backup now' button for starting a backup of a HANA database snapshot instance.

1. On the **Backup now** pane, select **OK**.

   Screenshot showing to trigger HANA database snapshot instance backup.

## Track a backup job for SAP HANA database instance snapshot

The Azure Backup service creates a job if you schedule backups or if you trigger an on-demand backup operation for tracking. To view the backup job status, do the following:

1. In the Recovery Services vault, on the left pane, select **Backup Jobs**.

   The jobs dashboard displays the status of the jobs that were triggered in the past 24 hours. To modify the time range, select **Filter**, and then make the required changes.

1. To review the details of a job, select the **View details** link next to the job name.

## Next steps

- [Learn how to restore an SAP HANA database instance snapshot in Azure VM](sap-hana-database-instances-restore.md).
- [Troubleshoot common issues with SAP HANA database instance backups](sap-hana-database-instance-troubleshoot.md).
