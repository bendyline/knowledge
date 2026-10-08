---
title: "Move Database using detach & attach (Transact-SQL)"
description: "Move a database using detach and attach (Transact-SQL)"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 06/03/2020
ms.service: sql
ms.topic: how-to
helpviewer_keywords:
  - "database attaching [SQL Server]"
  - "moving databases [SQL Server]"
  - "database detaching [SQL Server]"
  - "relocating databases [SQL Server]"
  - "detaching databases [SQL Server]"
  - "attaching databases [SQL Server]"
---
# Move a database using detach and attach (Transact-SQL)
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  This topic describes how to move a detached database to another location and re-attach it to the same or a different server instance in  SQL Server 
. However, we recommend that you move databases by using the ALTER DATABASE planned relocation procedure, instead of using detach and attach. For more information, see [Move User Databases](move-user-databases.md).  
  
> **Important:**  
>  We recommend that you do not attach or restore databases from unknown or untrusted sources. Such databases could contain malicious code that might execute unintended  Transact-SQL  code or cause errors by modifying the schema or the physical database structure. Before you use a database from an unknown or untrusted source, run [DBCC CHECKDB](../../t-sql/database-console-commands/dbcc-checkdb-transact-sql.md) on the database on a nonproduction server and also examine the code, such as stored procedures or other user-defined code, in the database.  
  
## Procedure  
  
#### To move a database by using detach and attach  
  
1.  Detach the database. For more information, see [Detach a Database](detach-a-database.md).  
  
2.  In a Windows Explorer or Windows Command Prompt window, move the detached database file or files and log file or files to the new location.  
  
     You should move the log files even if you intend to create new log files. In some cases, reattaching a database requires its existing log files. Therefore, always keep all the detached log files until the database has been successfully attached without them.  
  
    > **Note:**  
    >  If you try to attach the database without specifying the log file, the attach operation will look for the log file in its original location. If a copy of the log still exists in the original location, that copy is attached. To avoid using the original log file, either specify the path of the new log file or remove the original copy of the log file (after copying it to the new location).  
  
3.  Attach the copied files. For more information, see [Attach a Database](attach-a-database.md).  
  
## Example  
 The following example creates a copy of the  AdventureWorks2025  database named `MyAdventureWorks`. The  Transact-SQL  statements are executed in a Query Editor window that is connected to the server instance to which is attached.  
  
1.  Detach the  AdventureWorks2025  database by executing the following  Transact-SQL  statements:  
  
    ```sql
    USE master;  
    GO  
    EXEC sp_detach_db @dbname = N'AdventureWorks2022';  
    GO  
    ```  
  
2.  Using the method of your choice, copy the database files (AdventureWorks208R2_Data.mdf and AdventureWorks208R2_log) to: C:\MySQLServer\AdventureWorks208R2_Data.mdf and C:\MySQLServer\AdventureWorks208R2_Log.ldf, respectively.  
  
    > **Important:**  
    >  For a production database, place the database and transaction log on separate disks.  
  
     To copy files over the network to a disk on a remote computer, use the universal naming convention (UNC) name of the remote location. A UNC name takes the form **\\\\**_Servername_**\\**_Sharename_**\\**_Path_**\\**_Filename_. As with writing files to the local hard disk, the appropriate permissions that are required to read or write to a file on the remote disk must be granted to the user account used by the instance of  SQL Server 
.  
  
3.  Attach the moved database and, optionally, its log by executing the following  Transact-SQL  statements:  
  
    ```sql
    USE master;  
    GO  
    CREATE DATABASE MyAdventureWorks   
        ON (FILENAME = 'C:\MySQLServer\AdventureWorks2022_Data.mdf'),  
        (FILENAME = 'C:\MySQLServer\AdventureWorks2022_Log.ldf')  
        FOR ATTACH;  
    GO  
    ```  
  
     In  SQL Server Management Studio 
, a newly attached database is not immediately visible in Object Explorer. To view the database, in Object Explorer, click **View,** and then **Refresh**. When the **Databases** node is expanded in Object Explorer, the newly attached database now appears in the list of databases.  
  
## Related content

- [Database detach and attach (SQL Server)](database-detach-and-attach-sql-server.md)
