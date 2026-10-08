---
title: "sys.sysdepends (Transact-SQL)"
description: "sys.sysdepends (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.sysdepends_TSQL"
  - "sysdepends"
  - "sysdepends_TSQL"
  - "sys.sysdepends"
helpviewer_keywords:
  - "sysdepends system table"
  - "sys.sysdepends compatibility view"
dev_langs:
  - "TSQL"
---
# sys.sysdepends (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains dependency information between objects (views, procedures, and triggers) in the database, and the objects (tables, views, and procedures) that are contained in their definition.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **id** | **int** | Object ID. |
| **depid** | **int** | Dependent object ID. |
| **number** | **smallint** | Procedure number. |
| **depnumber** | **smallint** | Dependent procedure number. |
| **status** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **deptype** | **tinyint** | Identifies the dependent object type:<br /><br /> 0 = Object or column (non-schema-bound references only<br /><br /> 1 = Object or column (schema-bound references) |
| **depdbid** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **depsiteid** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **selall** | **bit** | 1 = Object is used in a SELECT * statement.<br /><br /> 0 = No. |
| **resultobj** | **bit** | 1 = Object is being updated.<br /><br /> 0 = No. |
| **readobj** | **bit** | 1 = The object is being read.<br /><br /> 0 = No. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
- [sys.sp_depends (Transact-SQL)](../system-stored-procedures/sp-depends-transact-sql.md)
- [sys.sql_dependencies (Transact-SQL)](../system-catalog-views/sys-sql-dependencies-transact-sql.md)
