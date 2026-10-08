---
title: "smart_admin.sp_backup_master_switch (Transact-SQL)"
description: "Pauses or resumes the SQL Server Managed Backup to Microsoft Azure."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_ backup_master_switch"
  - "smart_admin.sp_backup_master_switch"
  - "sp_ backup_master_switch_TSQL"
  - "smart_admin.sp_backup_master_switch_TSQL"
helpviewer_keywords:
  - "sp_ backup_master_switch"
  - "smart_admin.sp_backup_master_switch"
dev_langs:
  - "TSQL"
---
# smart_admin.sp_backup_master_switch (Transact-SQL)


**Applies to:**
 

 and later versions

Pauses or resumes the  SQL Server managed backup to Microsoft Azure 
.

Use `managed_backup.sp_backup_master_switch` to temporarily pause and then resume  SQL Server managed backup to Microsoft Azure 
. This procedure makes sure that all the configurations settings remain, and are retained when the operations resume. When  SQL Server managed backup to Microsoft Azure 
 is paused the retention period isn't enforced.

In other words, there's no check to determine:

- whether files should be deleted from storage
- if there are corrupted backup files
- if there's a break in the log chain.



## Syntax

```syntaxsql
smart_admin.sp_backup_master_switch [ @new_state = ] { 0 | 1 }
[ ; ]
```

## Arguments

#### [ @new_state = ] { 0 | 1 }

Set the state of  SQL Server managed backup to Microsoft Azure 
. *@new_state* is **bit**. When set to a value of `0`, the operations are paused, and when set to a value of `1`, the operation resume.

## Return code values

`0` (success) or `1` (failure).

## Permissions

Requires membership in **db_backupoperator** database role, with ALTER ANY CREDENTIAL permissions, and EXECUTE permissions on `sp_delete_backuphistory` stored procedure.

## Examples

The following example can be used to pause  SQL Server managed backup to Microsoft Azure 
 on the instance it's executed on:

```sql
USE msdb;
GO

EXECUTE managed_backup.sp_backup_master_switch @new_state = 0;
GO
```

The following example can be used to resume  SQL Server managed backup to Microsoft Azure 
.

```sql
USE msdb;
GO

EXECUTE managed_backup.sp_backup_master_switch @new_state = 1;
GO
```

## Related content

- [SQL Server managed backup to Microsoft Azure](../backup-restore/sql-server-managed-backup-to-microsoft-azure.md)
