---
title: Back Up an Azure Database for MySQL Flexible Server by Using Azure Backup
description: Learn how to back up an Azure Database for MySQL flexible server.
ms.topic: how-to
ms.date: 01/30/2026
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: "As a database administrator, I want to configure and manage backup policies for Azure Database for MySQL Flexible Server, so that I can ensure data protection and meet compliance requirements through scheduled and on-demand backups."
---

# Back up an Azure Database for MySQL flexible server by using Azure Backup (preview)


> **Important:**
> The preview solution for protecting Azure Database for MySQL flexible servers using Azure Backup is currently paused. Please refrain from configuring new backups until further notice. Rest assured, all existing backup data remains safe and available for restore. In the meantime, you can refer to the [blog post instructions](https://techcommunity.microsoft.com/blog/adformysql/azure-database-for-mysql-extending-long-term-retention-by-using-containers/3065164) to create long-term backups manually, ensuring compliance with your immediate needs.


This article describes how to back up your Azure Database for MySQL flexible server by using Azure Backup.

## Considerations for Azure Database for MySQL - Flexible Server backup

Before you start configuring backups for your Azure Database for MySQL flexible server, review the following important considerations for this preview feature:

- Currently, this feature supports only the *weekly backup* option. However, you can schedule the backups on multiple days of the week.

- Retention duration ranges from seven days to 10 years in the backup data store.

- Each retention rule requires inputs for specific backups, data store, and retention duration for the backups.

- The retention rules are evaluated in a predetermined order of priority. The priority is the highest for the yearly rule, followed by the monthly rule, and then the weekly rule.

  Default retention settings are applied when no other rules qualify. For example, the same recovery point might be the first successful backup taken every week in addition to the first successful backup taken every month. However, because the priority of the monthly rule is higher than the priority of the weekly rule, the retention that corresponds to the first successful backup taken every month applies.

- By default, the retention rule is set to three months if no retention rule is set.
  
Learn more about the [supported scenarios, considerations, and limitations](backup-azure-mysql-flexible-server-support-matrix.md).

## Create a backup policy for Azure Database for MySQL - Flexible Server

To create a backup policy, follow these steps:

1. [Create a Backup vault](create-manage-backup-vault.md#create-a-backup-vault).

2. Go to the Backup vault, and then select **+Backup** to open the **Configure backup** pane.

3. Under **Backup policy**, select **Create new**.

   Screenshot that shows how to start creating a new backup policy.

4. On the **Create Backup Policy** pane, enter a name for the new policy, and then select **Azure Database for MySQL (Preview)** for **Datasource type**.

5. On the **Schedule + retention** tab, select the **Backup schedule** values.

   Screenshot that shows the process to configure a backup schedule.

   Select the **Retention settings** values.

   Screenshot that shows how to configure a retention duration.

   You can add one or more retention rules. To add more retention rules, select **Add**.

6. You can move the backups from the backup data store to an archive data store after they expire according to the backup policy. To archive backups on expiry, select **On-expiry**.

7. Select **Review + create**.

## Configure a backup on Azure Database for MySQL - Flexible Server

You can configure a backup for the entire Azure Database for MySQL - Flexible Server instance.

To configure a backup, follow these steps:

1. In the Azure portal, go to the Backup vault, and then select **+Backup**.

   Screenshot that shows how to start a backup configuration.

   Screenshot that shows the Basics tab on the pane for configuring a backup.

   Alternatively, go to **Resiliency** >  **+Backup**.

2. Select the backup policy that you created, which defines the backup schedule and the retention duration.

   Screenshot that shows the selection of a backup policy.

3. Select the Azure Database for MySQL - Flexible Server instance to back up.

   You can choose an Azure Database for MySQL flexible server across subscriptions if it's in the same region as the vault.

   Screenshot that shows the selection of a database server for a backup.

4. Select **Add** and choose the Azure Database for MySQL flexible server that you want to back up.

   Screenshot that shows the selection of a datasource type.

   After the selection, the backup readiness check validates that the configuration is correct.

   Screenshot that shows a successful validation.

5. To resolve any access problems, select **Assign missing roles**.

6. Review  the configuration details, and then select **Configure backup**.

   Screenshot that shows how to finish a backup configuration.

   To track the progress, go to **Backup Instances**.

## Run an on-demand backup for Azure Database for MySQL - Flexible Server

To trigger an on-demand backup (a backup that's not in the schedule specified in the policy), follow these steps:

1. Go to the Backup vault, select **Backup instances**, and then select the backup instance for which you want to take a backup.

2. Select **Backup Now**.

   Screenshot that shows how to run an on-demand backup.

3. On the **MySQL database instance** pane, choose a retention rule from the list.

4. Select **Backup now**.

## Monitor a backup job for Azure Database for MySQL - Flexible Server

Azure Backup creates a job for scheduled backups or if you trigger on-demand backup operation for tracking. To view the backup job's status, go to **Backup jobs**.

Screenshot that shows a list of backup jobs.

The **Backup jobs** dashboard shows the operations and status for the *past 7 days*. You can select the time range and other filters to narrow down your selection.

To view the status of all backup jobs, select **All** for **Status**. The ongoing and past jobs of the backup instance appear.

Screenshot that shows how to view all jobs.

## Next steps

> 
> [Restore an Azure Database for MySQL flexible server (preview)](backup-azure-mysql-flexible-server-restore.md)
