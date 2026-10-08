---
title: "sys.sysperfinfo (Transact-SQL)"
description: "sys.sysperfinfo (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysperfinfo_TSQL"
  - "sys.sysperfinfo_TSQL"
  - "sys.sysperfinfo"
  - "sysperfinfo"
helpviewer_keywords:
  - "sys.sysperfinfo compatibility view"
  - "sysperfinfo system table"
dev_langs:
  - "TSQL"
---
# sys.sysperfinfo (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains a  Microsoft 
  SQL Server Database Engine 
 representation of the internal performance counters that can be displayed through the Windows System Monitor.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **object_name** | **nchar(128)** | Performance object name, such as **SQLServer:LockManager** or **SQLServer:BufferManager**. |
| **counter_name** | **nchar(128)** | Name of the performance counter within the object, such as **Page Requests** or **Locks Requested**. |
| **instance_name** | **nchar(128)** | Named instance of the counter. For example, there are counters maintained for each type of lock, such as **Table**, **Page**, **Key**, and so on. The instance name distinguishes between similar counters. |
| **cntr_value** | **bigint** | Actual counter value. Frequently, this will be a level or monotonically increasing counter that counts occurrences of the instance event. |
| **cntr_type** | **int** | Type of counter as defined by the Windows performance architecture. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
