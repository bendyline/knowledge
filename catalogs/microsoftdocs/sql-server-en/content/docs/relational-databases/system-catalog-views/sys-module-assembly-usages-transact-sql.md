---
title: "sys.module_assembly_usages (Transact-SQL)"
description: sys.module_assembly_usages (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "module_assembly_usages_TSQL"
  - "module_assembly_usages"
  - "sys.module_assembly_usages_TSQL"
  - "sys.module_assembly_usages"
helpviewer_keywords:
  - "sys.module_assembly_usages catalog view"
dev_langs:
  - "TSQL"
---
# sys.module_assembly_usages (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Returns a row for each module-to-assembly reference.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **object_id** | **int** | Object identification number of the SQL object. Is unique within a database. |
| **assembly_id** | **int** | ID of the assembly from which this module was created. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
