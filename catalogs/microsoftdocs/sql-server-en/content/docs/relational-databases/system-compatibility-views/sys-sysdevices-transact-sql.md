---
title: "sys.sysdevices (Transact-SQL)"
description: "sys.sysdevices (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysdevices"
  - "sysdevices_TSQL"
  - "sys.sysdevices"
  - "sys.sysdevices_TSQL"
helpviewer_keywords:
  - "sys.sysdevices compatibility view"
  - "sysdevices system table"
dev_langs:
  - "TSQL"
---
# sys.sysdevices (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains one row for each disk backup file, tape backup file, and database file.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **name** | **sysname** | Logical name of the backup file or database file. |
| **size** | **int** | Size of the file in 2-kilobyte (KB) pages. |
| **low** | **int** | Maintained for backward compatibility only. |
| **high** | **int** | Maintained for backward compatibility only. |
| **status** | **smallint** | Bitmap indicating the type of device:<br /><br /> 1 = Default disk<br /><br /> 2 = Physical disk<br /><br /> 4 = Logical disk<br /><br /> 8 = Skip header<br /><br /> 16 = Backup file<br /><br /> 32 = Serial writes<br /><br /> 4096 = Read-only |
| **cntrltype** | **smallint** | Controller type:<br /><br /> 0 = Non-CD-ROM database file<br /><br /> 2 = Disk backup file<br /><br /> 3 - 4 = Diskette backup file<br /><br /> 5 = Tape backup file<br /><br /> 6 = Named-pipe file |
| **phyname** | **nvarchar(260)** | Name of the physical file. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
