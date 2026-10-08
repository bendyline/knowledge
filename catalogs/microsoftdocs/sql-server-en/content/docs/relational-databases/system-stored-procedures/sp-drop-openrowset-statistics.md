---
title: "sp_drop_openrowset_statistics (Transact-SQL)"
description: "The sp_drop_openrowset_statistics system stored procedure removes column statistics for a column in the OPENROWSET path of Azure Synapse SQL resources."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.topic: "reference"
f1_keywords:
  - "sp_drop_openrowset_statistics_TSQL"
  - "sp_drop_openrowset_statistics"
helpviewer_keywords:
  - "sp_drop_openrowset_statistics"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || =azuresqldb-mi-current"
---
# sp_drop_openrowset_statistics (Transact-SQL)


**Applies to:**
 


 

Azure Synapse Analytics (serverless SQL pool only)](../../sql-server/sql-docs-navigation-guide.md#applies-to)

  


In Azure SQL Managed Instance, this procedure is used to drop column statistics in external data sources via `OPENROWSET`.

This procedure is also used to drop column statistics for a column in the `OPENROWSET` path of Azure Synapse serverless SQL pools. For more information, see [Statistics in Synapse SQL](https://learn.microsoft.com/azure/synapse-analytics/sql/develop-tables-statistics).

There's no direct method to update existing statistics. Instead, drop and create statistics using [sp_create_openrowset_statistics](sp-create-openrowset-statistics.md).



## Syntax

```syntaxsql
sys.sp_drop_openrowset_statistics
[ @stmt = ] N'stmt'
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### [ @stmt = ] N'*stmt*'

Specifies a Transact-SQL statement that returns column values to be used for statistics. You can use `TABLESAMPLE` within *@stmt* to specify samples of data to be used. If `TABLESAMPLE` isn't specified, `FULLSCAN` is used.

`<tablesample_clause> ::= TABLESAMPLE ( sample_number PERCENT )`

## Remarks

Statistics metadata isn't available for `OPENROWSET` columns.

## Permissions

Requires `ADMINISTER BULK OPERATIONS` or `ADMINISTER DATABASE BULK OPERATIONS` permissions.

## Examples

For usage scenarios and examples, review [Update statistics](https://learn.microsoft.com/azure/synapse-analytics/sql/develop-tables-statistics#examples-update-statistics-1).

## Related content

- [sp_create_openrowset_statistics (Transact-SQL)](sp-create-openrowset-statistics.md)
- [Statistics in Synapse SQL](https://learn.microsoft.com/azure/synapse-analytics/sql/develop-tables-statistics)
