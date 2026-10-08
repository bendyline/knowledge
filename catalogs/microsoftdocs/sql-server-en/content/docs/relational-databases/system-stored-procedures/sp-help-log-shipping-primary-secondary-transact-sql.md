---
title: "sys.sp_help_log_shipping_primary_secondary (Transact-SQL)"
description: Returns information regarding all the secondary databases for a given primary database.
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_help_log_shipping_primary_secondary"
  - "sp_help_log_shipping_primary_secondary_TSQL"
helpviewer_keywords:
  - "sp_help_log_shipping_primary_secondary"
dev_langs:
  - "TSQL"
---
# sys.sp_help_log_shipping_primary_secondary (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This stored procedure returns information regarding all the secondary databases for a given primary database.



## Syntax

```syntaxsql
sys.sp_help_log_shipping_primary_secondary
    [ @primary_database = ] N'primary_database'
[ ; ]
```

## Arguments

#### [ @primary_database = ] N'*primary_database*'

The name of the database on the primary server. *@primary_database* is **sysname**, with no default.

## Return code values

`0` (success) or `1` (failure).

## Result set

| Column name | Description |
| --- | --- |
| `secondary_server` | The name of the secondary instance of the  SQL Server Database Engine |
 | in the log shipping configuration. |
| `secondary_database` | The name of the secondary database in the log shipping configuration. |

## Remarks

`sp_help_log_shipping_primary_secondary` must be run from the `master` database on the primary server.

## Permissions

Only members of the **sysadmin** fixed server role can run this procedure.

## Examples

This example illustrates using `sp_help_log_shipping_primary_secondary` to retrieve a list of secondary databases associate with the primary database  `AdventureWorks2025` .

```sql
EXECUTE master.dbo.sp_help_log_shipping_primary_secondary @primary_database = N'AdventureWorks';
GO
```

## Related content

- [About log shipping (SQL Server)](../../database-engine/log-shipping/about-log-shipping-sql-server.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
