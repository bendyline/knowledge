---
title: "log_shipping_primary_databases (Transact-SQL)"
description: log_shipping_primary_databases (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "08/11/2025"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "log_shipping_primary_databases"
  - "log_shipping_primary_databases_TSQL"
helpviewer_keywords:
  - "log_shipping_primary_databases system table"
dev_langs:
  - "TSQL"
---
# log_shipping_primary_databases (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Stores one record for the primary database in a log shipping configuration. This table is stored in the **msdb** database.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **primary_id** | **uniqueidentifier** | The ID of the primary database for the log shipping configuration. |
| **primary_database** | **sysname** | The name of the primary database in the log shipping configuration. |
| **backup_directory** | **nvarchar(500)** | The directory where transaction log backup files from the primary server are stored. |
| **backup_share** | **nvarchar(500)** | The network or UNC path to the backup directory. |
| **backup_retention_period** | **int** | The length of time, in minutes, that a log backup file is retained in the backup directory before being deleted. |
| **backup_job_id** | **uniqueidentifier** | The  Microsoft |
  | SQL Server |
 | Agent job ID associated with the backup job on the primary server. |
| **monitor_server** | **sysname** | The name of the instance of the  Microsoft |
  | SQL Server Database Engine |
 | being used as a monitor server in the log shipping configuration. |
| **monitor_server_security_mode** | **bit** | The security mode used to connect to the monitor server.<br /><br /> 1 = Windows Authentication.<br /><br /> 0 =  SQL Server |
 | Authentication. |
| **last_backup_file** | **nvarchar(500)** | The absolute path of the most recent transaction log backup. |
| **last_backup_date** | **datetime** | The time and date of the last log backup operation. |
| **user_specified_monitor** | **bit** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
| <br /><br /> **sp_help_log_shipping_primary_database** and **sp_help_log_shipping_secondary_primary** use this column to control the display of monitor settings in  SQL Server Management Studio |
| .<br /><br /> 0 = When invoking either of these two stored procedures, the user did not specify an explicit value for the **\@monitor_server** parameter.<br /><br /> 1 = An explicit value was specified by the user. |
| **backup_compression** | **tinyint** | Indicates whether the log shipping configuration overrides the server-level backup compression behavior.<br /><br /> 0 = Disabled. Log backups are never compressed, regardless of the server-configured backup compression settings.<br /><br /> 1 = Enabled. Log backups are always compressed, regardless of the server-configured backup compression settings.<br /><br /> 2 = Uses the server configuration for the [View or Configure the backup compression default Server Configuration Option](../../database-engine/configure-windows/view-or-configure-the-backup-compression-default-server-configuration-option.md) server-configuration option. This is the default value.<br /><br /> Backup compression is supported only in the Enterprise edition of  SQL Server |
| . |
| **primary_connection_options** | **nvarchar(4000)** | Additional connection options for the connection made between the log shipping executable and the primary replica instance. <br /><br /> Available starting with  SQL Server 2025 (17.x) |
 | and later versions. |
| **monitor_connection_options** | **nvarchar(4000)** | Additional connection options for the connection made between the primary replica instance and the remote monitor. <br /><br /> Available starting with  SQL Server 2025 (17.x) |
 | and later versions. |
  
## Related content

- [About log shipping (SQL Server)](../../database-engine/log-shipping/about-log-shipping-sql-server.md)
- [sys.sp_add_log_shipping_primary_database (Transact-SQL)](../system-stored-procedures/sp-add-log-shipping-primary-database-transact-sql.md)
- [sys.sp_delete_log_shipping_primary_database (Transact-SQL)](../system-stored-procedures/sp-delete-log-shipping-primary-database-transact-sql.md)
- [sys.sp_help_log_shipping_primary_database (Transact-SQL)](../system-stored-procedures/sp-help-log-shipping-primary-database-transact-sql.md)
- [System Tables (Transact-SQL)](system-tables-transact-sql.md)
