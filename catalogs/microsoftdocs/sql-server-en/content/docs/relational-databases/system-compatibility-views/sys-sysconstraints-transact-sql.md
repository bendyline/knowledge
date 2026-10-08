---
title: "sys.sysconstraints (Transact-SQL)"
description: "sys.sysconstraints (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysconstraints"
  - "sys.sysconstraints"
  - "sysconstraints_TSQL"
  - "sys.sysconstraints_TSQL"
helpviewer_keywords:
  - "sys.sysconstraints compatibility view"
  - "sysconstraints system table"
dev_langs:
  - "TSQL"
---
# sys.sysconstraints (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains mappings of constraints to the objects that own the constraints within the database.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **constid** | **int** | Constraint number. |
| **id** | **int** | ID of the table that owns the constraint. |
| **colid** | **smallint** | ID of the column on which the constraint is defined.<br /><br /> 0 = Table constraint |
| **spare1** | **tinyint** | Reserved |
| **status** | **int** | Pseudo-bit-mask indicating the status. Possible values include the following:<br /><br /> 1 = PRIMARY KEY constraint<br /><br /> 2 = UNIQUE KEY constraint<br /><br /> 3 = FOREIGN KEY constraint<br /><br /> 4 = CHECK constraint<br /><br /> 5 = DEFAULT constraint<br /><br /> 16 = Column-level constraint<br /><br /> 32 = Table-level constraint |
| **actions** | **int** | Reserved |
| **error** | **int** | Reserved |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
