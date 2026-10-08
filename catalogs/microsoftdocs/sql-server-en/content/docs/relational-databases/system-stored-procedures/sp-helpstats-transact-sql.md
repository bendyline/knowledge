---
title: "sys.sp_helpstats (Transact-SQL)"
description: sp_helpstats returns statistics information about columns and indexes on the specified table.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sp_helpstats"
  - "sp_helpstats_TSQL"
helpviewer_keywords:
  - "sp_helpstats"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.sp_helpstats (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns statistics information about columns and indexes on the specified table.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  To obtain information about statistics, query the [sys.stats](../system-catalog-views/sys-stats-transact-sql.md) and [sys.stats_columns](../system-catalog-views/sys-stats-columns-transact-sql.md) catalog views.



## Syntax

```syntaxsql
sys.sp_helpstats
    [ @objname = ] N'objname'
    [ , [ @results = ] N'results' ]
[ ; ]
```

## Arguments

#### [ @objname = ] N'*objname*'

Specifies the table on which to provide statistics information. *@objname* is **nvarchar(776)**, with no default. A one-part or two-part name can be specified.

#### [ @results = ] N'*results*'

Specifies the extent of information to provide. *@results* is **nvarchar(5)**, with a default of `STATS`.

- `ALL` lists statistics for all indexes and also columns that have statistics created on them.
- `STATS` only lists statistics not associated with an index.

## Return code values

`0` (success) or `1` (failure).

## Result set

The following table describes the columns in the result set.

| Column name | Description |
| --- | --- |
| `statistics_name` | The name of the statistics. Returns **sysname** and can't be `NULL`. |
| `statistics_keys` | The keys on which statistics are based. Returns **nvarchar(2078)** and can't be `NULL`. |

## Remarks

Use `DBCC SHOW_STATISTICS` to display detailed statistics information about any particular index or statistics. For more information, see [DBCC SHOW_STATISTICS](../../t-sql/database-console-commands/dbcc-show-statistics-transact-sql.md) and [sp_helpindex](sp-helpindex-transact-sql.md).

## Permissions

Requires membership in the **public** role.

## Examples

The following example creates single-column statistics for all eligible columns for all user tables in the  `AdventureWorks2025`  database by executing `sp_createstats`. Then, `sp_helpstats` is run to find the resultant statistics created on the `Customer` table.

```sql
USE AdventureWorks2022;
GO

EXECUTE sp_createstats;
GO

EXECUTE sp_helpstats
    @objname = 'Sales.Customer',
    @results = 'ALL';
```

 Here's the result set. 


```output
statistics_name               statistics_keys
---------------------------- ----------------
_WA_Sys_00000003_22AA2996     AccountNumber
AK_Customer_AccountNumber     AccountNumber
AK_Customer_rowguid           rowguid
CustomerType                  CustomerType
IX_Customer_TerritoryID       TerritoryID
ModifiedDate                  ModifiedDate
PK_Customer_CustomerID        CustomerID
```

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [Database Engine stored procedures (Transact-SQL)](database-engine-stored-procedures-transact-sql.md)
