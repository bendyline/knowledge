---
title: "Azure SQL Database: Manage long-term backup retention"
description: Learn how to store and restore automated backups for Azure SQL Database in Azure storage (for up to 10 years) using the Azure portal, Azure CLI, and PowerShell.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dinethi, mathoma
ms.date: 09/25/2025
ms.service: azure-sql-database
ms.subservice: backup-restore
ms.topic: how-to
monikerRange: "=azuresql||=azuresql-db"
ms.custom:
  - devx-track-azurepowershell
  - devx-track-azurecli
  - sfi-image-nochange
---

# Manage Azure SQL Database long-term backup retention



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> 
> * [Azure SQL Database](long-term-backup-retention-configure.md?view=azuresql-db&preserve-view=true)
> * [Azure SQL Managed Instance](../managed-instance/long-term-backup-retention-configure.md?view=azuresql-mi&preserve-view=true)

With Azure SQL Database, you can set a [long-term backup retention](long-term-retention-overview.md) (LTR) policy to automatically retain backups in separate Azure Blob storage containers for up to 10 years. You can then recover a database using these backups using the Azure portal, Azure CLI, or PowerShell.

> **Important:**
> Some older APIs used for long-term retention (LTR) backup operations are deprecated and no longer supported. Avoid using legacy PowerShell cmdlets such as `Copy-AzSqlDatabaseLongTermRetentionBackup`. Use the supported restore methods described in this article instead.

## Prerequisites

<a id="permissions"></a>

# [Portal](#tab/portal)

An active Azure subscription.

# [Azure CLI](#tab/azure-cli)

Prepare your environment for the Azure CLI.

[Include unavailable in this source snapshot: ~/../reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/long-term-backup-retention-configure.md)

# [PowerShell](#tab/powershell)

Prepare your environment for PowerShell.

> **Note:**
> This article uses the Azure Az PowerShell module, which is the recommended PowerShell module for interacting with Azure. To get started with the Az PowerShell module, see [Install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-az-ps). To learn how to migrate to the Az PowerShell module, see [Migrate Azure PowerShell from AzureRM to Az](https://learn.microsoft.com/powershell/azure/migrate-from-azurerm-to-az).

> **Important:**
> The PowerShell Azure Resource Manager (AzureRM) module was deprecated on February 29, 2024. All future development should use the Az.Sql module. Users are advised to migrate from AzureRM to the Az PowerShell module to ensure continued support and updates. The AzureRM module is no longer maintained or supported. The arguments for the commands in the Az PowerShell module and in the AzureRM modules are substantially identical. For more about their compatibility, see [Introducing the new Az PowerShell module](https://learn.microsoft.com/powershell/azure/new-azureps-module-az).

---

## Permissions

To view and restore LTR backups, including `Get-AzSqlDatabaseLongTermRetentionBackup` and `Restore-AzSqlDatabase`, you need:

- Subscription Owner role or
- Subscription Contributor role or
- SQL Server Contributor role or
- Custom role with the following permissions:

   `Microsoft.Sql/locations/longTermRetentionBackups/read`
   `Microsoft.Sql/locations/longTermRetentionServers/longTermRetentionBackups/read`
   `Microsoft.Sql/locations/longTermRetentionServers/longTermRetentionDatabases/longTermRetentionBackups/read`

To delete LTR backups, including `Remove-AzSqlDatabaseLongTermRetentionBackup`, you need to be a member of one of the following roles:

- Subscription Owner role or
- Subscription Contributor role or
- Custom role with the following permission:

   `Microsoft.Sql/locations/longTermRetentionServers/longTermRetentionDatabases/longTermRetentionBackups/delete`

> **Note:**
> The SQL Server Contributor role does not have permission to delete LTR backups.

Azure role-based access control (RBAC) permissions could be granted in either *subscription* or *resource group* scope. However, to access LTR backups that belong to a dropped server, this permission must be granted in the *subscription* scope of that server:

   `Microsoft.Sql/locations/longTermRetentionServers/longTermRetentionDatabases/longTermRetentionBackups/delete`

## Create long-term retention policies

# [Portal](#tab/portal)

You can configure SQL Database to [retain automated backups](long-term-retention-overview.md) for a period longer than the retention period for your service tier.

1. In the Azure portal, navigate to your server and then select **Backups**. Select the **Retention policies** tab to modify your backup retention settings.

   Screenshot of the Azure portal showing the retention policies experience.

1. On the Retention policies tab, select the database(s) on which you want to set or modify long-term backup retention policies. Unselected databases will not be affected.

   Screenshot of the Azure portal of the retention policies tab to configure backup retention policies.

1. In the **Configure policies** pane, specify your desired retention period for weekly, monthly, or yearly backups. Choose a retention period of '0' to indicate that no long-term backup retention should be set.

   Screenshot of the Azure portal, the configure policies pane.

1. Select **Apply** to apply the chosen retention settings to all selected databases.

> **Important:**
> When you enable a long-term backup retention policy, it may take up to 7 days for the first backup to become visible and available to restore. For details of the LTR backup cadence, see [long-term backup retention](long-term-retention-overview.md). 


# [Azure CLI](#tab/azure-cli)

Run the [az sql db ltr-policy set](https://learn.microsoft.com/cli/azure/sql/db/ltr-policy#az-sql-db-ltr-policy-set) command to create an LTR policy. The following example sets a long-term retention policy for 12 weeks for the weekly backup.

```azurecli
az sql db ltr-policy set \
   --resource-group mygroup \
   --server myserver \
   --name mydb \
   --weekly-retention "P12W"
```

This example sets a retention policy for 12 weeks for the weekly backup, 5 years for the yearly backup, and the week of April 15 in which to take the yearly LTR backup.

```azurecli
az sql db ltr-policy set \
   --resource-group mygroup \
   --server myserver \
   --name mydb \
   --weekly-retention "P12W" \
   --yearly-retention "P5Y" \
   --week-of-year 16
```

# [PowerShell](#tab/powershell)

```powershell
# get the SQL server
$subId = "<subscriptionId>"
$serverName = "<serverName>"
$resourceGroup = "<resourceGroupName>"
$dbName = "<databaseName>"

Connect-AzAccount
Select-AzSubscription -SubscriptionId $subId

$server = Get-AzSqlServer -ServerName $serverName -ResourceGroupName $resourceGroup

# create LTR policy with WeeklyRetention = 12 weeks. MonthlyRetention and YearlyRetention = 0 by default.
Set-AzSqlDatabaseBackupLongTermRetentionPolicy -ServerName $serverName -DatabaseName $dbName `
    -ResourceGroupName $resourceGroup -WeeklyRetention P12W

# create LTR policy with WeeklyRetention = 12 weeks, YearlyRetention = 5 years and WeekOfYear = 16 (week of April 15). MonthlyRetention = 0 by default.
Set-AzSqlDatabaseBackupLongTermRetentionPolicy -ServerName $serverName -DatabaseName $dbName `
    -ResourceGroupName $resourceGroup -WeeklyRetention P12W -YearlyRetention P5Y -WeekOfYear 16
```

---

## View backups and restore from a backup

View the backups that are retained for a specific database with an LTR policy, and restore from those backups.

> **Note:**
> If the logical server has been deleted, use Azure CLI or PowerShell commands to view and restore LTR backups.


> **Note:**
> Restoring databases between the Hyperscale service tier and the other service tiers of Azure SQL Database is not currently supported.


# [Portal](#tab/portal)

<a id="delete-ltr-backups"></a>

1. In the Azure portal, navigate to your server and then select **Backups**. To view the available LTR backups for a specific database, select **Manage** under the **Available LTR backups** column. A pane appears with a list of the available LTR backups for the selected database.

   Screenshot of the Azure portal, showing available backups.

1. In the **Available LTR backups** pane that appears, review the available backups. Select a backup to restore from.

   Screenshot of the Azure portal where you can view available LTR backups.

1. To restore from an available LTR backup, select the backup from which you want to restore, and then select **Restore**.

   Screenshot of the Azure portal where you can restore from available LTR backup.

1. Choose a name for your new database, then select **Review + Create** to review the details of your Restore. Select **Create** to restore your database from the chosen backup.

   Screenshot of the Azure portal where you can configure restore details.

1. On the toolbar, select the notification icon to view the status of the restore job.

   Screenshot of the Azure portal that shows restore job progress.

1. When the restore job is completed, open the **SQL databases** page to view the newly restored database.

> **Note:**
> From here, you can connect to the restored database using [SQL Server Management Studio](https://learn.microsoft.com/sql/ssms/sql-server-management-studio-ssms) to perform needed tasks, such as to [extract a bit of data from the restored database to copy into the existing database or to delete the existing database and rename the restored database to the existing database name](recovery-using-backups.md#point-in-time-restore).

# [Azure CLI](#tab/azure-cli)

### View LTR policies

Run the [az sql db ltr-policy show](https://learn.microsoft.com/cli/azure/sql/db/ltr-policy#az-sql-db-ltr-policy-show) command to view the LTR policy for a single database on your server.

```azurecli
az sql db ltr-policy show \
    --resource-group mygroup \
    --server myserver \
    --name mydb
```

### View LTR backups

Use the [az sql db ltr-backup list](https://learn.microsoft.com/cli/azure/sql/db/ltr-backup#az-sql-db-ltr-backup-list) command to list the LTR backups for a database. You can use this command to find the `name` parameter for use in other commands.

```azurecli
az sql db ltr-backup list \
   --location eastus2 \
   --server myserver \
   --database mydb
```

### Restore from LTR backups

Run the [az sql db ltr-backup restore](https://learn.microsoft.com/cli/azure/sql/db/ltr-backup#az-sql-db-ltr-backup-restore) command to restore your database from an LTR backup. You can run [az sql db ltr-backup show](https://learn.microsoft.com/cli/azure/sql/db/ltr-backup#az-sql-db-ltr-backup-show) to get the `backup-id`.

1. Create a variable for the `backup-id` with the command `az sql db ltr-backup show' for future use.

   ```azurecli
   get_backup_id=$(az sql db ltr-backup show 
       --location eastus2 \
       --server myserver \
       --database mydb \
       --name "3214b3fb-fba9-43e7-96a3-09e35ffcb336;132292152080000000" \
       --query 'id' \
       --output tsv)
   ```

1. Restore your database from the LTR backup.

    ```azurecli
    az sql db ltr-backup restore \
       --dest-database targetdb \
       --dest-server myserver \
       --dest-resource-group mygroup \
       --backup-id $get_backup_id
    ```

> **Important:**
> To restore from an LTR backup after the server or resource group has been deleted, you must have permissions scoped to the server's subscription and that subscription must be active. You must also omit the optional -ResourceGroupName parameter.

> **Note:**
> From here, you can connect to the restored database using SQL Server Management Studio to perform needed tasks, like database swapping. See [point in time restore](recovery-using-backups.md#point-in-time-restore).

# [PowerShell](#tab/powershell)

### View LTR policies

This example shows how to list the LTR policies within a server.

```powershell
# get all LTR policies within a server
$ltrPolicies = Get-AzSqlDatabase -ResourceGroupName $resourceGroup -ServerName $serverName | `
    Get-AzSqlDatabaseLongTermRetentionPolicy

# get the LTR policy of a specific database
$ltrPolicies = Get-AzSqlDatabaseBackupLongTermRetentionPolicy -ServerName $serverName -DatabaseName $dbName `
    -ResourceGroupName $resourceGroup
```

### Clear an LTR policy

This example shows how to clear an LTR policy from a database.

```powershell
Set-AzSqlDatabaseBackupLongTermRetentionPolicy -ServerName $serverName -DatabaseName $dbName `
    -ResourceGroupName $resourceGroup -RemovePolicy
```

### View LTR backups

This example shows how to list the LTR backups within a server.

```powershell
# get the list of all LTR backups in a specific Azure region
# backups are grouped by the logical database id, within each group they are ordered by the timestamp, the earliest backup first
$ltrBackups = Get-AzSqlDatabaseLongTermRetentionBackup -Location $server.Location

# get the list of LTR backups from the Azure region under the named server
$ltrBackups = Get-AzSqlDatabaseLongTermRetentionBackup -Location $server.Location -ServerName $serverName

# get the LTR backups for a specific database from the Azure region under the named server
$ltrBackups = Get-AzSqlDatabaseLongTermRetentionBackup -Location $server.Location -ServerName $serverName -DatabaseName $dbName

# list LTR backups only from live databases (you have option to choose All/Live/Deleted)
$ltrBackups = Get-AzSqlDatabaseLongTermRetentionBackup -Location $server.Location -DatabaseState Live

# only list the latest LTR backup for each database
$ltrBackups = Get-AzSqlDatabaseLongTermRetentionBackup -Location $server.Location -ServerName $serverName -OnlyLatestPerDatabase
```

### Restore from LTR backups

> **Warning:**
> The `Copy-AzSqlDatabaseLongTermRetentionBackup` cmdlet uses a deprecated API and is not supported. Do not use this cmdlet. Use the supported restore methods documented in this article.

This example shows how to restore from an LTR backup. Note, this interface did not change but the resource ID parameter now requires the LTR backup resource ID.

```powershell
# restore a specific LTR backup as an P1 database on the server $serverName of the resource group $resourceGroup
Restore-AzSqlDatabase -FromLongTermRetentionBackup -ResourceId $ltrBackup.ResourceId -ServerName $serverName -ResourceGroupName $resourceGroup `
    -TargetDatabaseName $dbName -ServiceObjectiveName P1
```

> **Important:**
> - To restore from an LTR backup after the server or resource group has been deleted, you must have permissions scoped to the server's subscription and that subscription must be active. You must also omit the optional `-ResourceGroupName` parameter.
> - If you are using LTR backups to meet compliance or other mission-critical requirements, consider conducting periodic recovery drills to verify that LTR backups can be restored, and that the restore results in an expected database state.

> **Note:**
> From here, you can connect to the restored database using SQL Server Management Studio to perform needed tasks, such as to extract a bit of data from the restored database to copy into the existing database or to delete the existing database and rename the restored database to the existing database name. See [point in time restore](recovery-using-backups.md#point-in-time-restore).

---

## Delete LTR backups

Delete backups that are retained for a specific database with an LTR policy.

> **Important:**
> Deleting LTR backup is non-reversible. To delete an LTR backup after the server has been deleted you must have Subscription scope permission. You can set up notifications about each delete in Azure Monitor by filtering for operation 'Deletes a long term retention backup'. The activity log contains information on who and when made the request. See [Create activity log alerts](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-activity-log) for detailed instructions.

# [Portal](#tab/portal)

1. In the Azure portal, navigate to the logical server of the Azure SQL Database. 
1. Select **Backups**. To view the available LTR backups for a specific database, select **Manage** under the **Available LTR backups** column. A pane appears with a list of the available LTR backups for the selected database.
1. In the **Available LTR backups** pane that appears, review the available backups. Select a backup to delete. Select **Delete**.

# [Azure CLI](#tab/azure-cli)

1. Use [az sql db ltr-backup list](https://learn.microsoft.com/cli/azure/sql/db/ltr-backup#az-sql-db-ltr-backup-list) to find the backup `name`.
1. Run the [az sql db ltr-backup delete](https://learn.microsoft.com/cli/azure/sql/db/ltr-backup#az-sql-db-ltr-backup-delete) command to remove an LTR backup.
    ```azurecli
    az sql db ltr-backup delete \
       --location eastus2 \
       --server myserver \
       --database mydb \
       --name "3214b3fb-fba9-43e7-96a3-09e35ffcb336;132292152080000000"
    ```
    

# [PowerShell](#tab/powershell)

This example shows how to delete an LTR backup from the list of backups.

1. Identify backups with [View LTR backups](#view-ltr-backups-1).
1. Use `Remove-AzSqlDatabaseLongTermRetentionBackup` to delete a backup.
    ```powershell
    # remove the earliest backup
    $ltrBackup = $ltrBackups[0]
    Remove-AzSqlDatabaseLongTermRetentionBackup -ResourceId $ltrBackup.ResourceId
    ```

---

## Best practices

If you use LTR backups to meet compliance or other mission-critical requirements:

- Verify the LTR backups are taken as per the configured policy by following steps outlined in [view backups](long-term-backup-retention-configure.md#view-backups-and-restore-from-a-backup) section either using Portal, Azure CLI or PowerShell.
- Consider conducting periodic recovery drills to verify that restore of LTR backups results in expected database state.

## Related content

- To learn about service-generated automatic backups, see [automatic backups](automated-backups-overview.md)
- To learn about long-term backup retention, see [long-term backup retention](long-term-retention-overview.md)
