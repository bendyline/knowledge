---
title: "Disable managed back up to Azure Blob Storage"
description: This article shows you how to disable or pause SQL Server Managed Backup to Microsoft Azure at both the database and instance levels using Transact-SQL.
author: MashaMSFT
ms.author: mathoma
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: backup-restore
ms.topic: how-to
---
# Disable SQL Server Managed Backup to Microsoft Azure
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  This topic describes how to disable or pause  SQL Server managed backup to Microsoft Azure 
 at both the database and instance levels.  
  
##  <a name="DatabaseDisable"></a> Disable  SQL Server managed backup to Microsoft Azure 
 for a database  
 You can disable  SQL Server managed backup to Microsoft Azure 
 settings by using the system stored procedure, [managed_backup.sp_backup_config_basic (Transact-SQL)](../system-stored-procedures/managed-backup-sp-backup-config-basic-transact-sql.md). The *\@enable_backup* parameter is used to enable and disable  SQL Server managed backup to Microsoft Azure 
 configurations for a specific database, where 1 enables and 0 disables the configuration settings.  
  
#### To Disable  SQL Server managed backup to Microsoft Azure 
 for a specific database:  
  
1.  Connect to the  Database Engine 
.  
  
2.  From the Standard bar, click **New Query**.  
  
3.  Copy and paste the following example into the query window and click **Execute**.  
  
```sql
EXEC msdb.managed_backup.sp_backup_config_basic  
                @database_name = 'TestDB'   
                ,@enable_backup = 0;  
GO
```

> **Note:**
> You might also need to set the `@container_url` parameter depending on your configuration.
  
##  <a name="DatabaseAllDisable"></a> Disable  SQL Server managed backup to Microsoft Azure 
 for all the databases on the Instance  
 The following procedure is for when you want to disable  SQL Server managed backup to Microsoft Azure 
 configuration settings from all the databases that currently have  SQL Server managed backup to Microsoft Azure 
 enabled on the instance.  The configuration settings like the storage URL, retention, and the SQL Credential will remain in the metadata and can be used if  SQL Server managed backup to Microsoft Azure 
 is enabled for the database at a later time. If you want to just pause  SQL Server managed backup to Microsoft Azure 
 services temporarily, you can use the master switch explained in the later sections of this topic.  
  
#### To disable  SQL Server managed backup to Microsoft Azure 
 for all the databases:  
  
1.  Connect to the  Database Engine 
.  
  
2.  From the Standard bar, click **New Query**.  
  
3.  Copy and paste the following example into the query window and click **Execute**. The following example identifies if  SQL Server managed backup to Microsoft Azure 
 is configured at the instance level and all the  SQL Server managed backup to Microsoft Azure 
 enabled databases on the instance, and executes the system stored procedure **sp_backup_config_basic** to disable  SQL Server managed backup to Microsoft Azure 
.  
  
```sql
-- Create a working table to store the database names  
Declare @DBNames TABLE  
  
       (  
             RowID int IDENTITY PRIMARY KEY  
             ,DBName varchar(500)  
  
       )  
-- Define the variables  
DECLARE @rowid int  
DECLARE @dbname varchar(500)  
DECLARE @SQL varchar(2000)  
-- Get the database names from the system function  
  
INSERT INTO @DBNames (DBName)  
  
SELECT db_name  
       FROM   
  
       msdb.managed_backup.fn_backup_db_config (NULL)  
       WHERE is_managed_backup_enabled = 1 
       AND is_dropped = 0
  
       --Select DBName from @DBNames  
  
       select @rowid = min(RowID)  
       FROM @DBNames  
  
       WHILE @rowID IS NOT NULL  
       Begin  
  
             Set @dbname = (Select DBName From @DBNames Where RowID = @rowid)  
             Begin  
             Set @SQL = 'EXEC msdb.managed_backup.sp_backup_config_basic    
                @database_name= '''+'' + @dbname+ ''+''',   
                @enable_backup=0'  
  
            EXECUTE (@SQL)  
  
             END  
             Select @rowid = min(RowID)  
             From @DBNames Where RowID > @rowid  
  
       END  
```  
  
 To review the configuration settings for all the databases on the instance, use the following query:  
  
```sql
Use msdb;  
GO  
SELECT * FROM managed_backup.fn_backup_db_config (NULL);  
GO  
```  
  
##  <a name="InstanceDisable"></a> Disable Default  SQL Server managed backup to Microsoft Azure 
 settings for the Instance  
 Default settings at the instance level apply to all new databases created on that instance.  If you no longer need or require default settings, you can disable this configuration by using the **managed_backup.sp_backup_config_basic** system stored procedure with the *\@database_name* parameter set to NULL. Disabling does not remove the other configuration settings like the storage URL, retention setting, or the SQL Credential name. These settings will be used if  SQL Server managed backup to Microsoft Azure 
 is enabled for the instance at a later time.  
  
#### To disable  SQL Server managed backup to Microsoft Azure 
 default configuration settings:  
  
1.  Connect to the  Database Engine 
.  
  
2.  From the Standard bar, click **New Query**.  
  
3.  Copy and paste the following example into the query window and click **Execute**.  
  
    ```sql
    EXEC msdb.managed_backup.sp_backup_config_basic  
                    @enable_backup = 0;  
    GO
    ```  
  
##  <a name="InstancePause"></a> Pause  SQL Server managed backup to Microsoft Azure 
 at the Instance Level  
 There might be times when you need to temporarily pause the  SQL Server managed backup to Microsoft Azure 
 services for a short period time.  The **managed_backup.sp_backup_master_switch** system stored procedure allows you to disable  SQL Server managed backup to Microsoft Azure 
 service at the instance level.  The same stored procedure is used to resume  SQL Server managed backup to Microsoft Azure 
. The \@state parameter is used to define whether  SQL Server managed backup to Microsoft Azure 
 should be turned off or on.  
  
#### To Pause  SQL Server managed backup to Microsoft Azure 
 Services Using Transact-SQL:  
  
1.  Connect to the  Database Engine 
.  
  
2.  From the Standard bar, click **New Query**.  
  
3.  Copy and paste the following example into the query window and then click **Execute**  
  
```sql
Use msdb;  
GO  
EXEC managed_backup.sp_backup_master_switch @new_state=0;  
Go
```  
  
#### To resume  SQL Server managed backup to Microsoft Azure 
 Using Transact-SQL  
  
1.  Connect to the  Database Engine 
.  
  
2.  From the Standard bar, click **New Query**.  
  
3.  Copy and paste the following example into the query window and then click **Execute**.  
  
```sql
Use msdb;  
Go  
EXEC managed_backup.sp_backup_master_switch @new_state=1;  
GO  
```  
  
## Related content

- [Enable SQL Server managed backup to Azure](enable-sql-server-managed-backup-to-microsoft-azure.md)
