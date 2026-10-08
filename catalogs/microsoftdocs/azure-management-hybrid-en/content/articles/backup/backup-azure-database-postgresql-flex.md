---
title: Configure backup for Azure Database for PostgreSQL - Flexible Server using Azure portal
description: Learn about how to configure backup for Azure Database for PostgreSQL - Flexible Server using Azure portal. 
ms.topic: how-to
ms.date: 01/22/2026
ms.service: azure-backup
ms.custom:
  - ignite-2024
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As a database administrator, I want to configure backup policies for Azure Database for PostgreSQL - Flexible Server using a portal, so that I can ensure data protection and manage retention effectively.
---

# Configure backup for Azure Database for PostgreSQL - Flexible Server using Azure portal

This article describes how to configure backup for Azure Database for PostgreSQL - Flexible Server using Azure portal. 

## Prerequisites

Before you configure backup for Azure Database for PostgreSQL - Flexible Server, ensure the following prerequisites are met:


- [Review the supported scenarios and known limitations](backup-azure-database-postgresql-flex-support-matrix.md) of Azure Database for PostgreSQL Flexible server backup.
- Identify or [create a Backup vault](create-manage-backup-vault.md#create-a-backup-vault) in the same region where you want to back up the Azure Database for PostgreSQL Server instance.
- Check that Azure Database for PostgreSQL Server is named in accordance with naming guidelines for Azure Backup. Learn about the [naming conventions](https://learn.microsoft.com/previous-versions/azure/postgresql/single-server/tutorial-design-database-using-azure-portal#create-an-azure-database-for-postgresql).
- Allow access permissions for PostgreSQL - Flexible Server. Learn about the [access permissions](backup-azure-database-postgresql-flex-overview.md#azure-backup-authentication-with-the-postgresql-server).
- [Create a back up policy](quick-backup-postgresql-flexible-server-portal.md).



## Configure backup

To configure backup for Azure Database for PostgreSQL – flexible server using Azure Backup, you can use one of the following methods:

- Azure Database for PostgreSQL – flexible server: Database manage pane
- Backup vault
- Resiliency

To configure backup on the Azure Database for PostgreSQL - Flexible Server via Resiliency, follow these steps:

1. Go to **Resiliency**, and then select **Overview** > **+ Configure protection**.

   Screenshot shows how to initiate the database protection.&#x20;

   Alternatively, for configuring backup from the **Backup vault** pane, go to the **Backup vault** > **Overview**, and then select **+ Backup**.

   To configure backup from the **Database manage** pane, go to the **PostgreSQL - flexible server** pane, and then select **Settings** > **LTR (Vaulted Backups)**.

2. On the **Configure protection** pane, select **Resource managed by** as **Azure**, **Datasource type** as **Azure PostgreSQL flexible server/elastic cluster**, and **Solution** as **Azure Backup**, and then select **Continue**.

3. On the **Configure Backup** pane, on the **Basics** tab, check if **Datasource type** appears as **Azure PostgreSQL flexible server/elastic cluster**, select **Select vault** under **Vault** and choose an existing Backup vault from the dropdown list, and then select **Next**.

   If you don't have a Backup vault, [create a new one](create-manage-backup-vault.md#create-a-backup-vault). 

4. On the **Backup policy** tab, select a Backup policy that defines the backup schedule and the retention duration, and then select **Next**.

   If you don't have a Backup policy, [create one on the go](backup-azure-database-postgresql-flex.md#create-a-backup-policy).

5. On the **Datasources** tab, select the backup type **v1 (logical backups)**.

   Screenshot shows the backup type selection for backup.

   > **Note:**
   > The backup type determines which stack protects the datasource. **v1 (logical backups)** uses the `pg_dump` based solution described in this article. A datasource can be protected by only one stack at a time, because multiple protection isn't supported.

6. On the **Select resources to backup** pane, select the flexible server to protect, and then select **Select**.

   > **Note:**
   > - Flexible servers larger than 1 TB aren't supported.
   > - Flexible servers on Premium SSD v2 storage aren't supported.
   > - Elastic clusters aren't supported.

   > **Tip:**
   > [Azure Backup for PostgreSQL flexible server and elastic cluster (v2)](backup-azure-postgresql-flex-server-elastic-cluster-v2-overview.md) takes physical backups from managed disk snapshots instead of logical (`pg_dump` based) backups, and addresses the limitations of the generally available v1 solution.
   > - It protects both PostgreSQL flexible servers and elastic clusters.
   > - It supports flexible servers and elastic clusters up to 32 TB on Premium SSD v1 and up to 64 TB on Premium SSD v2, instead of the 1-TB limit.

   Once you're on the **Datasources** tab,  the Azure Backup service validates if it has all the necessary access permissions to connect to the server. If one or more access permissions are missing, one of the following  error messages appears – **User cannot assign roles** or **Role assignment not done**.

   - **User cannot assign roles**: This message appears when you (the backup admin) don’t have the **write access** on the PostgreSQL - flexible Server as listed under **View details**. To assign the necessary permissions on the required resources, select **Download role assignment template** to fetch the ARM template,  and run the template as a PostgreSQL database administrator. Once the template is run successfully, select **Revalidate**.

   - **Role assignment not done**: This message appears when you (the backup admin) have the **write access** on the PostgreSQL – flexible Server to assign missing permissions as listed under **View details**. To grant permissions on the PostgreSQL - flexible Server inline, select **Assign missing roles**. 

     Once the process starts, the [missing access permissions](backup-azure-database-postgresql-overview.md#azure-backup-authentication-with-the-postgresql-server) on the PostgreSQL – flexible servers are granted to the backup vault. You can define the scope at which the access permissions must be granted. When the action is complete, revalidation starts.
 
7. Once the role assignment validation shows **Success**,  select **Next** to proceed to last step of submitting the operation.

8. On the **Review + configure** tab, select **Configure backup**.


### Create a backup policy

You can create a backup policy on the go during the backup configuration flow.

To create a backup policy, follow these steps: 

1. On the **Configure Backup** pane, select the **Backup policy** tab.

1. On the **Backup policy** tab, select **Create new** under **Backup policy**.

1. On the **Create Backup Policy** pane, on the **Basics** tab, enter a name for the new policy in **Policy name**.

4. On the **Schedule + retention** tab, under **Backup schedule**, define the backup frequency as **Weekly**.

   > **Note:**
   > The generally available v1 (`pg_dump` based) solution supports only weekly frequencies. If you choose daily frequency, only the first backup operation of the week runs, and the subsequent backup jobs in the same week fail.

   Screenshot shows how to define the backup schedule in the Backup policy.

   > **Tip:**
   > For daily backup schedules with a recovery point objective of one day, instead of one backup per week, try [Azure Backup for PostgreSQL flexible server and elastic cluster (v2)](backup-azure-postgresql-flex-server-elastic-cluster-v2-overview.md) which is in preview. The v2 solution takes physical backups from managed disk snapshots instead of logical (`pg_dump` based) backups.

5. Under **Retention settings**, select **Add retention rule**.

6. On the **Add retention** pane, define the retention period, and then select **Add**.

7. When you return to the **Create Backup Policy** pane, select **Review + create**.

    >**Note:**
    >The retention rules are evaluated in a predetermined order of priority. The priority is the highest for the yearly rule, followed by the monthly rule, and then the weekly rule. Default retention settings apply when no other rules qualify. For example, the same recovery point might be the first successful backup taken every week as well as the first successful backup taken every month. However, because the monthly rule has higher priority than the weekly rule, the retention corresponding to the first successful backup taken every month applies.

When the backup configuration is complete, you can [run an on-demand backup](tutorial-create-first-backup-azure-database-postgresql-flex.md#run-an-on-demand-backup) and [track the progress of the backup operation](tutorial-create-first-backup-azure-database-postgresql-flex.md#track-a-backup-job).


## Next steps

[Restore Azure Database for PostgreSQL - Flexible Server using Azure portal](restore-azure-database-postgresql-flex.md).
