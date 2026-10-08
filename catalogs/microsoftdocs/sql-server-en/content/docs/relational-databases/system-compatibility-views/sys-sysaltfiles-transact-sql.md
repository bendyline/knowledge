---
title: "sys.sysaltfiles (Transact-SQL)"
description: "sys.sysaltfiles (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.sysaltfiles_TSQL"
  - "sys.sysaltfiles"
  - "sysaltfiles_TSQL"
  - "sysaltfiles"
helpviewer_keywords:
  - "sysaltfiles system table"
  - "sys.sysaltfiles compatibility view"
dev_langs:
  - "TSQL"
---
# sys.sysaltfiles (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Under special circumstances, contains rows corresponding to the files in a database.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **fileid** | **smallint** | File identification number. This is unique for each database. |
| **groupid** | **smallint** | File group identification number. |
| **size** | **int** | File size, in 8-kilobyte (KB) pages. |
| **maxsize** | **int** | Maximum file size, in 8-KB pages.<br /><br /> 0 = No growth.<br /><br /> -1 = File will grow until the disk is full.<br /><br /> 268435456 = Log file will grow to a maximum size of 2 TB.<br /><br /> Note: Databases that are upgraded with an unlimited log file size will report -1 for the maximum size of the log file. |
| **growth** | **int** | Growth size of the database.<br /><br /> 0 = No growth. Can be either the number of pages or the percentage of file size, depending on the value of status. If **status** is 0x100000, **growth** is the percentage of file size; otherwise, it is the number of pages. |
| **status** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **perf** | **int** | Reserved. |
| **dbid** | **smallint** | Database identification number of the database to which this file belongs. |
| **name** | **sysname** | Logical name of the file. |
| **filename** | **nvarchar(260)** | Name of the physical device. This includes the full path of the file. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
