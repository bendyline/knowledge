---
title: "sys.sysconfigures (Transact-SQL)"
description: "sys.sysconfigures (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.sysconfigures"
  - "sysconfigures"
  - "sys.sysconfigures_TSQL"
  - "sysconfigures_TSQL"
helpviewer_keywords:
  - "sys.sysconfigures compatibility view"
  - "sysconfigures system table"
dev_langs:
  - "TSQL"
---
# sys.sysconfigures (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains one row for each configuration option set by a user. **sysconfigures** contains the configuration options that are defined before the most recent startup of  SQL Server 
, plus any dynamic configuration options set since then.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **value** | **int** | User-modifiable value for the variable. This is used by the  Database Engine |
 | only if RECONFIGURE has been executed. |
| **config** | **int** | Configuration variable number. |
| **comment** | **nvarchar(255)** | Explanation of the configuration option. |
| **status** | **smallint** | Bitmap that indicates the status for the option. Possible values include the following:<br /><br /> 0 = Static. Setting takes effect when the server is restarted.<br /><br /> 1 = Dynamic. Variable takes effect when the RECONFIGURE statement is executed.<br /><br /> 2 = Advanced. Variable is displayed only when the **show advanced options** is set. Setting takes effect when the server is restarted.<br /><br /> 3 = Dynamic and advanced. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
