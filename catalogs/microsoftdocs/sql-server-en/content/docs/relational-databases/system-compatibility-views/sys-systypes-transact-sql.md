---
title: "sys.systypes (Transact-SQL)"
description: "sys.systypes (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.systypes_TSQL"
  - "systypes_TSQL"
  - "sys.systypes"
  - "systypes"
helpviewer_keywords:
  - "sys.systypes compatibility view"
  - "systypes system table"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# sys.systypes (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns one row for each system-supplied and each user-defined data type defined in the database.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **name** | **sysname** | Data type name. |
| **xtype** | **tinyint** | Physical storage type. |
| **status** | **tinyint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **xusertype** | **smallint** | Extended user type. Overflows or returns NULL if the number of data types exceeds 32,767. |
| **length** | **smallint** | Physical length of the data type. |
| **xprec** | **tinyint** | Internal precision, as used by the server. Not to be used in queries. |
| **xscale** | **tinyint** | Internal scale, as used by the server. Not to be used in queries. |
| **tdefault** | **int** | ID of the stored procedure that contains integrity checks for this data type. |
| **domain** | **int** | ID of the stored procedure that contains integrity checks for this data type. |
| **uid** | **smallint** | Schema ID of the owner of the type.<br /><br /> For databases upgraded from an earlier version of  SQL Server |
| , the schema ID is equal to the user ID of the owner.<br /><br /> **\*\* Important \*\*** If you use any of the following  SQL Server |
 | DDL statements, you must use the [sys.types](../system-catalog-views/sys-types-transact-sql.md) catalog view instead of **sys.systypes**.<br /><br /> ALTER AUTHORIZATION ON TYPE<br /><br /> CREATE TYPE<br /><br /> Overflows or returns NULL if the number of users and roles exceeds 32,767. |
| **reserved** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **collationid** | **int** | If character based, **collationid** is the id of the collation of the current database; otherwise, it is NULL. |
| **usertype** | **smallint** | User type ID. Overflows or returns NULL if the number of data types exceeds 32,767. |
| **variable** | **bit** | Variable-length data type.<br /><br /> 1 = True<br /><br /> 0 = False |
| **allownulls** | **bit** | Indicates the default nullability for this data type. This default value is overridden by if nullability is specified by using [CREATE TABLE](../../t-sql/statements/create-table-transact-sql.md) or [ALTER TABLE](../../t-sql/statements/alter-table-transact-sql.md). |
| **type** | **tinyint** | Physical storage data type. |
| **printfmt** | **varchar(255)** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **prec** | **smallint** | Level of precision for this data type.<br /><br /> -1 = **xml** or large value types. |
| **scale** | **tinyint** | Scale for this data type, based on precision.<br /><br /> NULL = Data type is nonnumeric. |
| **collation** | **sysname** | If character based, **collation** is the collation of the current database; otherwise, it is NULL. |
  
## Related content

- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
