---
title: "sys.syspermissions (Transact-SQL)"
description: "sys.syspermissions (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.syspermissions_TSQL"
  - "syspermissions_TSQL"
  - "sys.syspermissions"
  - "syspermissions"
helpviewer_keywords:
  - "syspermissions system table"
  - "sys.syspermissions compatibility view"
dev_langs:
  - "TSQL"
---
# sys.syspermissions (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains information about permissions granted and denied to users, groups, and roles in the database.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **id** | **int** | ID of the object for object permissions.<br /><br /> 0 = Statement permissions. |
| **grantee** | **smallint** | ID of the user, group, or role affected by the permission. |
| **grantor** | **smallint** | ID of the user, group, or role that granted or denied the permission. |
| **actadd** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **actmod** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **seladd** | **varbinary(4000)** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **selmod** | **varbinary(4000)** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **updadd** | **varbinary(4000)** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **updmod** | **varbinary(4000)** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **refadd** | **varbinary(4000)** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **refmod** | **varbinary(4000)** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
