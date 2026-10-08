---
title: "sys.syscurconfigs (Transact-SQL)"
description: "sys.syscurconfigs (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.syscurconfigs"
  - "sys.syscurconfigs_TSQL"
  - "syscurconfigs"
  - "syscurconfigs_TSQL"
helpviewer_keywords:
  - "sys.syscurconfigs compatibility view"
  - "syscurconfigs system table"
dev_langs:
  - "TSQL"
---
# sys.syscurconfigs (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains an entry for each current configuration option. Also, this view contains four entries that describe the configuration structure. **syscurconfigs** is built dynamically when queried by a user. For more information, see [sys.sysconfigures (Transact-SQL)](sys-sysconfigures-transact-sql.md).  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **value** | **int** | User-modifiable value for the variable. This is used by the  SQL Server Database Engine |
 | only if RECONFIGURE has been executed. |
| **config** | **smallint** | Configuration variable number. |
| **comment** | **nvarchar(255)** | Explanation of the configuration option. |
| **status** | **smallint** | Bitmap indicating the status for the option. Possible values include the following:<br /><br /> 0 = Static. Setting takes effect when the server is restarted.<br /><br /> 1 = Dynamic. Variable takes effect when the RECONFIGURE statement is executed.<br /><br /> 2 = Advanced. Variable is displayed only when the **show advanced options** is set.<br /><br /> 3 = Dynamic and advanced. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
