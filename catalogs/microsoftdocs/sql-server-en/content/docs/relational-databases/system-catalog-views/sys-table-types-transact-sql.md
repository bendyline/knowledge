---
title: "sys.table_types (Transact-SQL)"
description: sys.table_types (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "table_types_TSQL"
  - "sys.table_types"
  - "sys.table_types_TSQL"
  - "table_types"
helpviewer_keywords:
  - "table types [SQL Server]"
  - "table-valued parameters, sys.table_types"
  - "sys.table_types"
  - "UDTT"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.table_types (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Displays properties of user-defined table types in  SQL Server 
. A table type is a type from which table variables or table-valued parameters could be declared. Each table type has a **type_table_object_id** that is a foreign key into the [sys.objects](sys-objects-transact-sql.md) catalog view. You can use this ID column to query various catalog views, in a way that is similar to an **object_id** column of a regular table, to discover the structure of the table type such as its columns and constraints.    
 
| Column name | Data type | Description |
| --- | --- | --- |
| *\<inherited columns>* |  | For a list of columns that this view inherits, see [sys.types (Transact-SQL)](sys-types-transact-sql.md). |
| **type_table_object_id** | **int** | Object identification number. This number is unique within a database. |
| **is_memory_optimized** | **bit** | **Applies to**:  SQL Server 2014 (12.x) |
 | and later.<br /><br /> The following are the possible values:<br /><br /> 0 = is not memory optimized<br /><br /> 1 = is memory optimized<br /><br /> A value of 0 is the default value.<br /><br /> Table types are always created with DURABILITY = SCHEMA_ONLY. Only the schema is persisted on disk. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [Use table-valued parameters (Database Engine)](../tables/use-table-valued-parameters-database-engine.md)
- [In-Memory OLTP overview and usage scenarios](../in-memory-oltp/overview-and-usage-scenarios.md)
