---
title: "sys.dm_exec_valid_use_hints (Transact-SQL)"
description: sys.dm_exec_valid_use_hints (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "11/17/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.dm_exec_valid_use_hints"
  - "sys.dm_exec_valid_use_hints_TSQL"
  - "dm_exec_valid_use_hints"
  - "dm_exec_valid_use_hints_TSQL"
helpviewer_keywords:
  - "sys.dm_exec_valid_use_hints management view"
dev_langs:
  - "TSQL"
---
# sys.dm_exec_valid_use_hints (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns [USE HINT](../../t-sql/queries/hints-transact-sql-query.md#use_hint) supported hint names. It lists one hint name per row.  
  
Use this DMV to see the list of all supported hints under the USE HINT notation.  
  
| Column Name | Data Type | Description |
| --- | --- | --- |
| name | **sysname** | The name of the hint. |

See [Query Hints](../../t-sql/queries/hints-transact-sql-query.md#use_hint) for descriptions of each hint.

Introduced in  SQL Server 2016 (13.x) 
 SP1.
  
## Related content

- [System dynamic management views and functions](system-dynamic-management-objects.md)
- [Database related dynamic management views (Transact-SQL)](database-related-dynamic-management-views-transact-sql.md)
