---
title: "Restore database: simple recovery model (Transact-SQL)"
description: This article explains how to restore a full SQL Server database backup under the simple recovery model using Transact-SQL.
author: MashaMSFT
ms.author: mathoma
ms.date: "12/17/2019"
ms.service: sql
ms.subservice: backup-restore
ms.topic: how-to
helpviewer_keywords:
  - "full backups [SQL Server]"
  - "database restores [SQL Server], full backups"
  - "backing up databases [SQL Server], full backups"
  - "database backups [SQL Server], full backups"
  - "restoring databases [SQL Server], full backups"
---
# Restore a database backup under the simple recovery model (Transact-SQL)

 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This topic explains how to restore a full database backup.  
  
> **Important:**  
>  The system administrator restoring the full database backup must be the only person currently using the database to be restored.  
  
## Prerequisites and Recommendations  
  
-   To restore a database that is encrypted, you must have access to the certificate or asymmetric key that was used to encrypt the database. Without the certificate or asymmetric key, the database cannot be restored. As a result, the certificate that is used to encrypt the database encryption key must be retained as long as the backup is needed. For more information, see [SQL Server Certificates and Asymmetric Keys](../security/sql-server-certificates-and-asymmetric-keys.md).  
  
-   For security purposes, we recommend that you do not attach or restore databases from unknown or untrusted sources. Such databases could contain malicious code that might execute unintended  Transact-SQL  code or cause errors by modifying the schema or the physical database structure. Before you use a database from an unknown or untrusted source, run [DBCC CHECKDB](../../t-sql/database-console-commands/dbcc-checkdb-transact-sql.md) on the database on a nonproduction server and also examine the code, such as stored procedures or other user-defined code, in the database.  
  
## Database Compatibility Level After Upgrade  
 The compatibility levels of the **tempdb**, **model**, **msdb** and **Resource** databases are set to the compatibility level of  SQL Server 
 after upgrade. The **master** system database retains the compatibility level it had before upgrade, unless that level was less than 100. If the compatibility level of **master** was less than 100 before upgrade, it is set to 100 after upgrade.  
  
 If the compatibility level of a user database was 100 or higher before upgrade, it remains the same after upgrade. If the compatibility level was 90 before upgrade, in the upgraded database, the compatibility level is set to 100, which is the lowest supported compatibility level in  SQL Server 2016 (13.x) 
 and greater.  
  
> **Note:**  
>  New user databases will inherit the compatibility level of the **model** database.  
  
## Procedures  
  
#### To restore a full database backup  
  
1.  Execute the RESTORE DATABASE statement to restore the full database backup, specifying:  
  
    -   The name of the database to restore.  
  
    -   The backup device from where the full database backup is restored.  
  
    -   The NORECOVERY clause if you have a transaction log or differential database backup to apply after restoring the full database backup.  
  
    > **Important:**  
    >  To restore a database that is encrypted, you must have access to the certificate or asymmetric key that was used to encrypt the database. Without the certificate or asymmetric key, the database cannot be restored. As a result, the certificate that is used to encrypt the database encryption key must be retained as long as the backup is needed. For more information, see [SQL Server Certificates and Asymmetric Keys](../security/sql-server-certificates-and-asymmetric-keys.md).  
  
2.  Optionally, specify:  
  
    -   The FILE clause to identify the backup set on the backup device to restore.  
  
> **Note:**  
>  If you restore an earlier version database to a newer version of  SQL Server 
, the database is automatically upgraded. Typically, the database becomes available immediately. However, if a  SQL Server 2005 (9.x) 
 database has full-text indexes, the upgrade process either imports, resets, or rebuilds them, depending on the setting of the  **upgrade_option** server property. If the upgrade option is set to import (**upgrade_option** = 2) or rebuild (**upgrade_option** = 0), the full-text indexes will be unavailable during the upgrade. Depending the amount of data being indexed, importing can take several hours, and rebuilding can take up to ten times longer. Note also that when the upgrade option is set to import, the associated full-text indexes are rebuilt if a full-text catalog is not available. To change the setting of the **upgrade_option** server property, use [sp_fulltext_service](../system-stored-procedures/sp-fulltext-service-transact-sql.md).  
  
## Example  
  
### Description  
 This example restores the  `AdventureWorks2025`  full database backup from tape.  
  
### Example  
  
```  
USE master;  
GO  
RESTORE DATABASE AdventureWorks2022  
   FROM TAPE = '\\.\Tape0';  
GO  
```  
  
## Related content

- [Complete Database Restores (Full Recovery Model)](complete-database-restores-full-recovery-model.md)
- [Complete Database Restores (Simple Recovery Model)](complete-database-restores-simple-recovery-model.md)
- [Full database backups (SQL Server)](full-database-backups-sql-server.md)
- [RESTORE Statements (Transact-SQL)](../../t-sql/statements/restore-statements-transact-sql.md)
- [Backup History and Header Information (SQL Server)](backup-history-and-header-information-sql-server.md)
- [Rebuild system databases](../databases/rebuild-system-databases.md)
