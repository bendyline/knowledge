---
title: "Backup and Restore Tables (Transact-SQL)"
description: Backup and Restore Tables (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
helpviewer_keywords:
  - "system tables [SQL Server], backup tables"
  - "backup system tables [SQL Server]"
  - "system tables [SQL Server], restore tables"
  - "restore system tables [SQL Server]"
dev_langs:
  - "TSQL"
---
# Backup and Restore Tables (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  The topics in this section describe the system tables that store information used by database backup and restore operations.  
  
## In This Section  
 [backupfile](backupfile-transact-sql.md)  
 Contains one row for each data or log file of a database.  
  
 [backupfilegroup](backupfilegroup-transact-sql.md)  
 Contains one row for each filegroup in a database at the time of backup.  
  
 [backupmediafamily](backupmediafamily-transact-sql.md)  
 Contains a row for each media family.  
  
 [backupmediaset](backupmediaset-transact-sql.md)  
 Contains one row for each backup media set.  
  
 [backupset](backupset-transact-sql.md)  
 Contains a row for each backup set.  
  
 [logmarkhistory](logmarkhistory-transact-sql.md)  
 Contains one row for each marked transaction that has been committed.  
  
 [restorefile](restorefile-transact-sql.md)  
 Contains one row for each restored file. These include files restored indirectly by filegroup name.  
  
 [restorefilegroup](restorefilegroup-transact-sql.md)  
 Contains one row for each restored filegroup.  
  
 [restorehistory](restorehistory-transact-sql.md)  
 Contains one row for each restore operation.  
  
 [suspect_pages](suspect-pages-transact-sql.md)  
 Contains one row per page that failed with an 824 error (with a limit of 1,000 rows).  
  
 [sysopentapes](sysopentapes-transact-sql.md)  
 Contains one row for each currently open tape device.
