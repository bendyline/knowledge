---
title: "sp_delete_database_backuphistory (Transact-SQL)"
description: Deletes information about the specified database from the backup and restore history tables.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_delete_database_backuphistory"
  - "sp_delete_database_backuphistory_TSQL"
helpviewer_keywords:
  - "sp_delete_database_backuphistory"
dev_langs:
  - "TSQL"
---
# sp_delete_database_backuphistory (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Deletes information about the specified database from the backup and restore history tables.



## Syntax

```syntaxsql
dbo.sp_delete_database_backuphistory [ @database_name = ] N'database_name'
[ ; ]
```

## Arguments

#### [ @database_name = ] N'*database_name*'

Specifies the name of the database involved in backup and restore operations. *@database_name* is **sysname**, with no default.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

`sp_delete_database_backuphistory` must be run from the `msdb` database.

This stored procedure affects the following tables:

- [backupfile](../system-tables/backupfile-transact-sql.md)
- [backupfilegroup](../system-tables/backupfilegroup-transact-sql.md)
- [backupmediafamily](../system-tables/backupmediafamily-transact-sql.md)
- [backupmediaset](../system-tables/backupmediaset-transact-sql.md)
- [backupset](../system-tables/backupset-transact-sql.md)
- [restorefile](../system-tables/restorefile-transact-sql.md)
- [restorefilegroup](../system-tables/restorefilegroup-transact-sql.md)
- [restorehistory](../system-tables/restorehistory-transact-sql.md)

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

The following example deletes all entries for the  `AdventureWorks2025`  database in the backup-and-restore history tables.

```sql
USE msdb;
GO

EXECUTE sp_delete_database_backuphistory @database_name = 'AdventureWorks2022';
```

## Related content

- [sp_delete_backuphistory (Transact-SQL)](sp-delete-backuphistory-transact-sql.md)
- [Backup History and Header Information (SQL Server)](../backup-restore/backup-history-and-header-information-sql-server.md)
