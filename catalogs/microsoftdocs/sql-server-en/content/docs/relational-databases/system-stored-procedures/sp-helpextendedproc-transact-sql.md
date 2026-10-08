---
title: "sys.sp_helpextendedproc (Transact-SQL)"
description: Reports the currently defined extended stored procedures and the name of the dynamic-link library (DLL) to which the procedure (function) belongs.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_helpextendedproc"
  - "sp_helpextendedproc_TSQL"
helpviewer_keywords:
  - "sp_helpextendedproc"
dev_langs:
  - "TSQL"
---
# sys.sp_helpextendedproc (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Reports the currently defined extended stored procedures and the name of the dynamic-link library (DLL) to which the procedure (function) belongs.

> **Note:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [Common language runtime (CLR) integration](../clr-integration/common-language-runtime-integration-overview.md) instead.



## Syntax

```syntaxsql
sys.sp_helpextendedproc [ [ @funcname = ] N'funcname' ]
[ ; ]
```

## Arguments

#### [ @funcname = ] N'*funcname*'

The name of the extended stored procedure for which information is reported. *@funcname* is **sysname**, with a default of `NULL`.

## Return code values

`0` (success) or `1` (failure).

## Result set

| Column name | Data type | Description |
| --- | --- | --- |
| `name` | **sysname** | Name of the extended stored procedure. |
| `dll` | **nvarchar(255)** | Name of the DLL. |

## Remarks

When *@funcname* is specified, `sp_helpextendedproc` reports on the specified extended stored procedure. When this parameter isn't supplied, `sp_helpextendedproc` returns all extended stored procedure names and the DLL names to which each extended stored procedure belongs.

## Permissions

Permission to execute `sp_helpextendedproc` is granted to **public**.

## Examples

### A. Reporting help on all extended stored procedures

The following example reports on all extended stored procedures.

```sql
USE master;
GO

EXECUTE sp_helpextendedproc;
GO
```

### B. Reporting help on a single extended stored procedure

The following example reports on the `xp_cmdshell` extended stored procedure.

```sql
USE master;
GO

EXECUTE sp_helpextendedproc xp_cmdshell;
GO
```

## Related content

- [sys.sp_addextendedproc (Transact-SQL)](sp-addextendedproc-transact-sql.md)
- [sys.sp_dropextendedproc (Transact-SQL)](sp-dropextendedproc-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
