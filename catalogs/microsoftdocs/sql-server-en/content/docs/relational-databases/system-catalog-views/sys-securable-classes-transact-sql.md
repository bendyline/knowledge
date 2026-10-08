---
title: "sys.securable_classes (Transact-SQL)"
description: sys.securable_classes (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "12/01/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "securable_classes_TSQL"
  - "securable_classes"
  - "sys.securable_classes_TSQL"
  - "sys.securable_classes"
helpviewer_keywords:
  - "sys.securable_classes catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# sys.securable_classes (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns a list of securable classes  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **class_desc** | **sysname** | Name of the class. |
| **class** | **int** | Numerical designation of the class. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Examples  
 The following example returns the securable classes supported by this instance of  SQL Server 
.  
  
```sql  
SELECT * FROM sys.securable_classes ORDER BY class;  
```  
  
## Related content

- [Securables](../security/securables.md)
