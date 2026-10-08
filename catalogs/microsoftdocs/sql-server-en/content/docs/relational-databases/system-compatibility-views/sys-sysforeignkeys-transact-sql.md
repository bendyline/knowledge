---
title: "sys.sysforeignkeys (Transact-SQL)"
description: "sys.sysforeignkeys (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysforeignkeys"
  - "sys.sysforeignkeys"
  - "sys.sysforeignkeys_TSQL"
  - "sysforeignkeys_TSQL"
helpviewer_keywords:
  - "sysforeignkeys system table"
  - "sys.sysforeignkeys compatibility view"
dev_langs:
  - "TSQL"
---
# sys.sysforeignkeys (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains information about the FOREIGN KEY constraints that are in the definitions of tables in the database.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **constid** | **int** | ID of the FOREIGN KEY constraint. |
| **fkeyid** | **int** | Object ID of the table with the FOREIGN KEY constraint. |
| **rkeyid** | **int** | Object ID of the table referenced in the FOREIGN KEY constraint. |
| **fkey** | **smallint** | ID of the referencing column. |
| **rkey** | **smallint** | ID of the referenced column. |
| **keyno** | **smallint** | Position of the column in the reference column list. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
