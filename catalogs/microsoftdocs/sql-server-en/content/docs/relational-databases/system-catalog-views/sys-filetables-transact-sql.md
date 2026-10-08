---
title: "sys.filetables (Transact-SQL)"
description: sys.filetables (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "filetables"
  - "filetables_TSQL"
  - "sys.filetables"
  - "sys.filetables_TSQL"
helpviewer_keywords:
  - "sys.filetables catalog view"
dev_langs:
  - "TSQL"
---
# sys.filetables (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Returns a row for each FileTable in  SQL Server 
. For more information about FileTables, see [FileTables (SQL Server)](../blob/filetables-sql-server.md).    
  
| Column name | Data type | Description |
| --- | --- | --- |
| **object_id** |  | Object identification number. Is unique within a database.<br /><br /> For more information, [sys.objects (Transact-SQL)](sys-objects-transact-sql.md). |
| **is_enabled** | **bit** | 1 = FileTable is in 'enabled' state. |
| **directory_name** | **varchar(255)** | Name of the root directory for a FileTable. |
| **filename_collation_id** |  | Is the collation identifier defined for the FileTable |
| **filename_collation_name** |  | Is the collation name defined for the FileTable. |
  
## Related content

- [Manage FileTables](../blob/manage-filetables.md)
- [FileTables (SQL Server)](../blob/filetables-sql-server.md)
