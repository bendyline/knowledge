---
title: "sys.sysindexkeys (Transact-SQL)"
description: "sys.sysindexkeys (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysindexkeys"
  - "sys.sysindexkeys_TSQL"
  - "sysindexkeys_TSQL"
  - "sys.sysindexkeys"
helpviewer_keywords:
  - "sysindexkeys system table"
  - "sys.sysindexkeys compatibility view"
dev_langs:
  - "TSQL"
---
# sys.sysindexkeys (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains information about the keys or columns in an index of the database.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **id** | **int** | ID of the table. |
| **indid** | **smallint** | ID of the index. |
| **colid** | **smallint** | ID of the column. |
| **keyno** | **smallint** | Position of the column in the index. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
- [sys.index_columns (Transact-SQL)](../system-catalog-views/sys-index-columns-transact-sql.md)
