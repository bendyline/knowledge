---
title: "sys.filetable_system_defined_objects (Transact-SQL)"
description: sys.filetable_system_defined_objects (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.filetable_system_defined_objects_TSQL"
  - "filetable_system_defined_objects"
  - "filetable_system_defined_objects_TSQL"
  - "sys.filetable_system_defined_objects"
helpviewer_keywords:
  - "sys.filetable_system_defined_objects catalog view"
dev_langs:
  - "TSQL"
---
# sys.filetable_system_defined_objects (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Displays a list of the system-defined objects that are related to FileTables. Contains one row for each system-defined object.  
  
 When you create a FileTable, related objects such as constraints and indexes are created at the same time. You cannot alter or drop these objects; they disappear only when the FileTable itself is dropped.  
  
 For more information about FileTables, see [FileTables (SQL Server)](../blob/filetables-sql-server.md).  
  
| Column | Data type | Description |
| --- | --- | --- |
| **object_id** | **int** | Object ID of the system-defined object related to a FileTable.<br /><br /> References the object in **sys.objects**. |
| **parent_object_id** | **int** | Object ID of the parent FileTable.<br /><br /> References the object in **sys.objects**. |
  
## Related content

- [Create, alter, or drop a FileTable](../blob/create-alter-and-drop-filetables.md)
- [Manage FileTables](../blob/manage-filetables.md)
