---
title: "sp_query_store_remove_plan (Transact-SQL)"
description: "Removes a single plan from the Query Store."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "SYS.SP_QUERY_STORE_REMOVE_PLAN_TSQL"
  - "SP_QUERY_STORE_REMOVE_PLAN_TSQL"
  - "SP_QUERY_STORE_REMOVE_PLAN"
  - "SYS.SP_QUERY_STORE_REMOVE_PLAN"
helpviewer_keywords:
  - "sys.sp_query_store_remove_plan"
  - "sp_query_store_remove_plan"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sp_query_store_remove_plan (Transact-SQL)


**Applies to:**
 

 and later versions 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Removes a single plan from the Query Store.



## Syntax

```syntaxsql
sp_query_store_remove_plan [ @plan_id = ] plan_id
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### [ @plan_id = ] *plan_id*

The ID of the query plan to be removed. *@plan_id* is **bigint**, with no default.

## Return code values

`0` (success) or `1` (failure).

## Permissions

Requires the ALTER permission on the database.

## Examples

The following example returns information about the queries in the Query Store.

```sql
SELECT txt.query_text_id,
       txt.query_sql_text,
       pl.plan_id,
       qry.*
FROM sys.query_store_plan AS pl
     INNER JOIN sys.query_store_query AS qry
         ON pl.query_id = qry.query_id
     INNER JOIN sys.query_store_query_text AS txt
         ON qry.query_text_id = txt.query_text_id;
```

After you identify the *plan_id* that you want to delete, use the following example to delete a query plan.

```sql
EXECUTE sp_query_store_remove_plan 3;
```

## Related content

- [sp_query_store_force_plan (Transact-SQL)](sp-query-store-force-plan-transact-sql.md)
- [sp_query_store_remove_query (Transact-SQL)](sp-query-store-remove-query-transact-sql.md)
- [sp_query_store_unforce_plan (Transact-SQL)](sp-query-store-unforce-plan-transact-sql.md)
- [sp_query_store_reset_exec_stats (Transact-SQL)](sp-query-store-reset-exec-stats-transact-sql.md)
- [sp_query_store_flush_db (Transact-SQL)](sp-query-store-flush-db-transact-sql.md)
- [Query Store catalog views (Transact-SQL)](../system-catalog-views/query-store-catalog-views-transact-sql.md)
- [Monitor performance by using the Query Store](../performance/monitoring-performance-by-using-the-query-store.md)
