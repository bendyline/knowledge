---
title: "sysmail_help_status_sp (Transact-SQL)"
description: "Displays the status of Database Mail queues."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysmail_help_status_sp"
  - "sysmail_help_status_sp_TSQL"
helpviewer_keywords:
  - "sysmail_help_status_sp"
dev_langs:
  - "TSQL"
---
# sysmail_help_status_sp (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Displays the status of Database Mail queues. Use `sysmail_start_sp` to start the Database Mail queues and `sysmail_stop_sp` to stop the Database Mail queues.



## Syntax

```syntaxsql
sysmail_help_status_sp
[ ; ]
```

## Return code values

`0` (success) or `1` (failure).

## Result set

| Column name | Data type | Description |
| --- | --- | --- |
| `Status` | **nvarchar(7)** | The status of the Database Mail. Possible values are `STARTED` and `STOPPED`. |

## Permissions

Requires `CONTROL SERVER` permission on the server, or membership in the **db_owner** database role in the `msdb` database.

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

The following example displays the status of Database Mail.

```sql
EXECUTE msdb.dbo.sysmail_help_status_sp;
GO
```

Result set:

```output
Status
-------
STARTED
```

## Related content

- [Database Mail external program](../database-mail/database-mail-external-program.md)
- [sysmail_start_sp (Transact-SQL)](sysmail-start-sp-transact-sql.md)
- [sysmail_stop_sp (Transact-SQL)](sysmail-stop-sp-transact-sql.md)
