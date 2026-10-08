---
title: "sp_create_openrowset_statistics (Transact-SQL)"
description: sp_create_openrowset_statistics creates column statistics for a column in the OPENROWSET path of Azure Synapse SQL resources.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.topic: "reference"
f1_keywords:
  - "sp_create_openrowset_statistics_TSQL"
  - "sp_create_openrowset_statistics"
helpviewer_keywords:
  - "sp_create_openrowset_statistics"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || =azuresqldb-mi-current"
---
# sp_create_openrowset_statistics (Transact-SQL)


**Applies to:**
 


 

Azure Synapse Analytics (serverless SQL pool only)](../../sql-server/sql-docs-navigation-guide.md#applies-to)

  


In Azure SQL Managed Instance, this procedure is used to create column statistics in external data sources via `OPENROWSET`.

This procedure is also used to create column statistics for a column in the `OPENROWSET` path of Azure Synapse serverless SQL pools. For more information, see [Statistics in Synapse SQL](https://learn.microsoft.com/azure/synapse-analytics/sql/develop-tables-statistics).



## Syntax

```syntaxsql
sys.sp_create_openrowset_statistics [ @stmt = ] N'statement_text'
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### [ @stmt = ] N'*stmt*'

Specifies a Transact-SQL statement that returns column values to be used for statistics. You can use `TABLESAMPLE` within the *@stmt* to specify samples of data to be used. If `TABLESAMPLE` isn't specified, `FULLSCAN` is used. For CSV data sources, only `FULLSCAN` is supported.

`<tablesample_clause> ::= TABLESAMPLE ( sample_number PERCENT )`

## Remarks

Use `sys.sp_create_openrowset_statistics` to create statistics on external data sources via `OPENROWSET`. Currently, you can create single-column statistics only.

Statistics metadata isn't available for `OPENROWSET` columns.

For statistics on external table columns, use `CREATE STATISTICS` instead. For more information, see [Create statistics for external table column](https://learn.microsoft.com/azure/synapse-analytics/sql/develop-tables-statistics#examples-create-statistics-for-external-table-column).

## Permissions

Requires `ADMINISTER BULK OPERATIONS` or `ADMINISTER DATABASE BULK OPERATIONS` permissions.

## Examples

For usage scenarios and examples, review [Create statistics for column in OPENROWSET path](https://learn.microsoft.com/azure/synapse-analytics/sql/develop-tables-statistics#examples-create-statistics-for-column-in-openrowset-path).

## Related content

- [sp_drop_openrowset_statistics (Transact-SQL)](sp-drop-openrowset-statistics.md)
- [Statistics in Synapse SQL](https://learn.microsoft.com/azure/synapse-analytics/sql/develop-tables-statistics)
