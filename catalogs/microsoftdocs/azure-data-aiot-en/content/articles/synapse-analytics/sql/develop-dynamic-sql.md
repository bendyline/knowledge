---
title: Use dynamic SQL in Synapse SQL
description: Tips for using dynamic SQL in Synapse SQL.
author: filippopovic
ms.author: fipopovi
ms.date: 04/15/2020
ms.service: azure-synapse-analytics
ms.subservice: sql
ms.topic: how-to
---

# Dynamic SQL in Synapse SQL

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

In this article, you'll find tips for using dynamic SQL and developing solutions using Synapse SQL.

## Dynamic SQL Example

When developing application code, you may need to use dynamic SQL to help deliver flexible, generic, and modular solutions.

> **Note:**
> Dedicated SQL pool does not support blob data types at this time. Not supporting blob data types might limit the size of your strings since blob data types include both varchar(max) and nvarchar(max) types. If you have used these types in your application code to build large strings, you need to break the code into chunks and use the EXEC statement instead.

A simple example:

```sql
DECLARE @sql_fragment1 VARCHAR(8000)=' SELECT name '
,       @sql_fragment2 VARCHAR(8000)=' FROM sys.system_views '
,       @sql_fragment3 VARCHAR(8000)=' WHERE name like ''%table%''';

EXEC( @sql_fragment1 + @sql_fragment2 + @sql_fragment3);
```

If the string is short, you can use [sp_executesql](https://learn.microsoft.com/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=azure-sqldw-latest\&preserve-view=true) as normal.

> **Note:**
> Statements executed as dynamic SQL will still be subject to all T-SQL validation rules.

## Next steps

For more development tips, see [development overview](develop-overview.md).
