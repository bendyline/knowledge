---
title: "sys.filegroups (Transact-SQL)"
description: sys.filegroups (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "05/24/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.filegroups_TSQL"
  - "filegroups"
  - "sys.filegroups"
  - "filegroups_TSQL"
helpviewer_keywords:
  - "sys.filegroups catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# sys.filegroups (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Contains a row for each data space that is a filegroup.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **\<inherited columns>** | -- | For a list of columns that this view inherits, see [sys.data_spaces (Transact-SQL)](sys-data-spaces-transact-sql.md). |
| **filegroup_guid** | **uniqueidentifier** | GUID for the filegroup.<br /><br /> NULL = PRIMARY filegroup |
| **log_filegroup_id** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 | In  SQL Server |
| , the value is NULL. |
| **is_read_only** | **bit** | 1 = Filegroup is read-only.<br /><br /> 0 = Filegroup is read/write. |
| **is_autogrow_all_files** | **bit** |
| **Applies to:** |
 

 and later versions.<br /><br /> 1 = When a file in the filegroup meets the autogrow threshold, all files in the filegroup grow.<br /><br /> 0 = When a file in the filegroup meets the autogrow threshold, only that file grows. This is the default.|  
  
## Permissions  
 Requires membership in the **public** role. For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [Data Spaces (Transact-SQL)](data-spaces-transact-sql.md)
