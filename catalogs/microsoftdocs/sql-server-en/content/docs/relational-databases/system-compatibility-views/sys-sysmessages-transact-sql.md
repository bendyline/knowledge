---
title: "sys.sysmessages (Transact-SQL)"
description: "sys.sysmessages (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.sysmessages"
  - "sysmessages"
  - "sysmessages_TSQL"
  - "sys.sysmessages_TSQL"
helpviewer_keywords:
  - "sysmessages system table"
  - "sys.sysmessages compatibility view"
dev_langs:
  - "TSQL"
---
# sys.sysmessages (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains one row for each system error or warning that can be returned by the  SQL Server Database Engine 
. The  Database Engine 
 displays the error description on the user's screen.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **error** | **int** | Unique error number. |
| **severity** | **tinyint** | Severity level of the error. |
| **dlevel** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **description** | **nvarchar(255)** | Explanation of the error with placeholders for parameters. |
| **msglangid** | **smallint** | System message group ID. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
