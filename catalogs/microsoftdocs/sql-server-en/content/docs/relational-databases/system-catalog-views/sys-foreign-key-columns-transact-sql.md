---
title: "sys.foreign_key_columns (Transact-SQL)"
description: sys.foreign_key_columns (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "04/05/2022"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.foreign_key_columns"
  - "foreign_key_columns"
  - "sys.foreign_key_columns_TSQL"
  - "foreign_key_columns_TSQL"
helpviewer_keywords:
  - "sys.foreign_key_columns catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# sys.foreign_key_columns (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Contains a row for each column, or set of columns, that comprise a foreign key.
  
| Column name | Data type | Description |
| --- | --- | --- |
| **constraint_object_id** | **int** | ID of the FOREIGN KEY constraint. |
| **constraint_column_id** | **int** | ID of the column, or set of columns, that comprise the FOREIGN KEY (*1..n* where n is the number of columns). |
| **parent_object_id** | **int** | ID of the parent of the constraint, which is the referencing object. |
| **parent_column_id** | **int** | ID of the parent column, which is the referencing column. |
| **referenced_object_id** | **int** | ID of the referenced object, which has the candidate key. |
| **referenced_column_id** | **int** | ID of the referenced column (candidate key column). |
  
## Permissions

The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Example query

The following Transact-SQL query retrieves all foreign keys in the database, including their related tables and columns.

```sql
SELECT fk.name AS ForeignKeyName
    , t_parent.name AS ParentTableName
    , c_parent.name AS ParentColumnName
    , t_child.name AS ReferencedTableName
    , c_child.name AS ReferencedColumnName
FROM sys.foreign_keys fk 
INNER JOIN sys.foreign_key_columns fkc
    ON fkc.constraint_object_id = fk.object_id
INNER JOIN sys.tables t_parent
    ON t_parent.object_id = fk.parent_object_id
INNER JOIN sys.columns c_parent
    ON fkc.parent_column_id = c_parent.column_id  
    AND c_parent.object_id = t_parent.object_id 
INNER JOIN sys.tables t_child
    ON t_child.object_id = fk.referenced_object_id
INNER JOIN sys.columns c_child
    ON c_child.object_id = t_child.object_id
    AND fkc.referenced_column_id = c_child.column_id
ORDER BY t_parent.name, c_parent.name;
```
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [Querying the SQL Server System Catalog FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-catalog-views/querying-the-sql-server-system-catalog-faq.yml)
