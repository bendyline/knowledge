---
title: "sys.synonyms (Transact-SQL)"
description: sys.synonyms (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.synonyms_TSQL"
  - "synonyms_TSQL"
  - "sys.synonyms"
  - "synonyms"
helpviewer_keywords:
  - "sys.synonyms catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# sys.synonyms (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Contains a row for each synonym object that is **sys.objects.type** = SN.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **\<Columns inherited from sys.objects>** |  | For a list of columns that this view inherits, see [sys.objects (Transact-SQL)](sys-objects-transact-sql.md). |
| **base_object_name** | **nvarchar(1035)** | Fully quoted name of the object to which the user of this synonym is redirected. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
