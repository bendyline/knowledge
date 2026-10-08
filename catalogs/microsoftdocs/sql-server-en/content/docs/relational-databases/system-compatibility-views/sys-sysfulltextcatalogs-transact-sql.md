---
title: "sys.sysfulltextcatalogs (Transact-SQL)"
description: "sys.sysfulltextcatalogs (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysfulltextcatalogs"
  - "sys.sysfulltextcatalogs_TSQL"
  - "sysfulltextcatalogs_TSQL"
  - "sys.sysfulltextcatalogs"
helpviewer_keywords:
  - "sys.sysfulltextcatalogs compatibility view"
  - "sysfulltextcatalogs system table"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sys.sysfulltextcatalogs (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Contains information about the full-text catalogs.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **ftcatid** | **smallint** | Identifier of the full-text catalog. |
| **name** | **sysname** | Full-text catalog name specified by the user. |
| **status** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **path** | **nvarchar(260)** | Root path specified by the user.<br /><br /> NULL = Path was not specified. The default (installation) path was used. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
