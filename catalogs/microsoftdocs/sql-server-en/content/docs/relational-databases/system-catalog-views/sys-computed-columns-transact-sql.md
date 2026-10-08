---
title: "sys.computed_columns (Transact-SQL)"
description: sys.computed_columns (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "05/25/2021"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.computed_columns_TSQL"
  - "sys.computed_columns"
  - "computed_columns_TSQL"
  - "computed_columns"
helpviewer_keywords:
  - "sys.computed_columns catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.computed_columns (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Contains a row for each column found in **sys.columns** that is a computed-column.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **\<Inherited columns>** |  | The **sys.computed_columns** view returns all columns in the **sys.columns** view. It also returns the additional columns described below. For a description of the columns that the **sys.computed_columns** view inherits from **sys.columns**, see [sys.columns (Transact-SQL)](sys-columns-transact-sql.md). The value of the **is_computed** column is always set to 1 in the **sys.computed_columns** view. |
| **definition** | **nvarchar(max)** | SQL text that defines this computed-column. |
| **uses_database_collation** | **bit** | 1 = The column definition depends on the default collation of the database for correct evaluation; otherwise, 0. Such a dependency prevents changing the database default collation. |
| **is_persisted** | **bit** | Computed column is persisted. |
 

  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
