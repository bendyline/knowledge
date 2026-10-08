---
title: "sys.sysremotelogins (Transact-SQL)"
description: "sys.sysremotelogins (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysremotelogins"
  - "sysremotelogins_TSQL"
  - "sys.sysremotelogins"
  - "sys.sysremotelogins_TSQL"
helpviewer_keywords:
  - "sysremotelogins system table"
  - "sys.sysremotelogins compatibility view"
dev_langs:
  - "TSQL"
---
# sys.sysremotelogins (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains one row for each remote user that is permitted to call remote stored procedures on an instance of  Microsoft 
  SQL Server 
.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **remoteserverid** | **smallint** | Remote server identification. |
| **remoteusername** | **sysname** | Login name of the user on a remote server. |
| **status** | **smallint** | Returns 0. |
| **sid** | **varbinary(85)** | Microsoft |
 | Windows user security ID. |
| **changedate** | **datetime** | Date and time the remote user was added. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
