---
title: "sys.sysfilegroups (Transact-SQL)"
description: "sys.sysfilegroups (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysfilegroups_TSQL"
  - "sys.sysfilegroups"
  - "sysfilegroups"
  - "sys.sysfilegroups_TSQL"
helpviewer_keywords:
  - "sysfilegroups system table"
  - "sys.sysfilegroups compatibility view"
dev_langs:
  - "TSQL"
---
# sys.sysfilegroups (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains one row for each file group in a database. There is at least one entry in this table that is for the primary file group.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **groupid** | **smallint** | Group identification number unique for each database. |
| **allocpolicy** | **smallint** | Reserved |
| **status** | **int** | 0x8 = Read-only<br /><br /> 0x10 = Default |
| **groupname** | **sysname** | Name of the file group. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
