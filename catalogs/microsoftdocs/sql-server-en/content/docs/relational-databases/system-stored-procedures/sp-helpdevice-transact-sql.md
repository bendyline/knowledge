---
title: "sys.sp_helpdevice (Transact-SQL)"
description: sp_helpdevice reports information about SQL Server backup devices.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_helpdevice"
  - "sp_helpdevice_TSQL"
helpviewer_keywords:
  - "sp_helpdevice"
dev_langs:
  - "TSQL"
---
# sys.sp_helpdevice (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Reports information about  SQL Server 
 backup devices.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  We recommend that you use the [sys.backup_devices](../system-catalog-views/sys-backup-devices-transact-sql.md) catalog view instead



## Syntax

```syntaxsql
sys.sp_helpdevice [ [ @devname = ] N'devname' ]
[ ; ]
```

## Arguments

#### [ @devname = ] N'*devname*'

The name of the backup device for which information is reported. *@devname* is **sysname**, with a default of `NULL`.

## Return code values

`0` (success) or `1` (failure).

## Result set

| Column name | Data type | Description |
| --- | --- | --- |
| `device_name` | **sysname** | Logical device name. |
| `physical_name` | **nvarchar(260)** | Physical file name. |
| `description` | **nvarchar(255)** | Description of the device. |
| `status` | **int** | A number that corresponds to the status description in the `description` column. |
| `cntrltype` | **smallint** | Controller type of the device:<br /><br />`2` = Disk device<br />`5` = Tape device |
| `size` | **int** | Device size in 2-KB pages. |

## Remarks

If *@devname* is specified, `sp_helpdevice` displays information about the specified dump device. If *@devname* isn't specified, `sp_helpdevice` displays information about all dump devices in the `sys.backup_devices` catalog view.

Dump devices are added to the system by using `sp_addumpdevice`.

## Permissions

Requires membership in the **public** role.

## Examples

The following example reports information about all dump devices on an instance of  SQL Server 
.

```sql
EXECUTE sp_helpdevice;
```

## Related content

- [sys.sp_addumpdevice (Transact-SQL)](sp-addumpdevice-transact-sql.md)
- [sys.sp_dropdevice (Transact-SQL)](sp-dropdevice-transact-sql.md)
- [Database Engine stored procedures (Transact-SQL)](database-engine-stored-procedures-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
