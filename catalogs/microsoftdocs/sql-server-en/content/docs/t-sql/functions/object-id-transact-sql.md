---
title: "OBJECT_ID (Transact-SQL)"
description: OBJECT_ID returns the database object identification number of a schema-scoped object.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 04/29/2024
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "OBJECT_ID"
  - "OBJECT_ID_TSQL"
helpviewer_keywords:
  - "objects [SQL Server], IDs"
  - "identification numbers [SQL Server], database objects"
  - "checking object exists"
  - "IDs [SQL Server], database objects"
  - "OBJECT_ID function"
  - "database objects [SQL Server], IDs"
  - "displaying object IDs"
  - "viewing object IDs"
  - "verifying object exists"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# OBJECT_ID (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns the database object identification number of a schema-scoped object.

Objects that aren't schema-scoped, such as Data Definition Language (DDL) triggers, can't be queried by using `OBJECT_ID`. For objects that aren't found in the [sys.objects](../../relational-databases/system-catalog-views/sys-objects-transact-sql.md) catalog view, obtain the object identification numbers by querying the appropriate catalog view. For example, to return the object identification number of a DDL trigger, use `SELECT OBJECT_ID FROM sys.triggers WHERE name = 'DatabaseTriggerLog'`.



## Syntax

```syntaxsql
OBJECT_ID ( ' [ database_name . [ schema_name ] . | schema_name . ]
  object_name' [ , 'object_type' ] )
```

## Arguments

#### N'*object_name*'

The object to be used. *object_name* is either **varchar** or **nvarchar**. A **varchar** value of *object_name* is implicitly converted to **nvarchar**. Specifying the database and schema names is optional.

#### N'*object_type*'

The schema-scoped object type. *object_type* is either **varchar** or **nvarchar**. A **varchar** value of *object_type* is implicitly converted to **nvarchar**. For a list of object types, see the **type** column in [sys.objects (Transact-SQL)](../../relational-databases/system-catalog-views/sys-objects-transact-sql.md).

## Return types

**int**

## Exceptions

For a spatial index, `OBJECT_ID` returns `NULL`.

Returns `NULL` on error.

A user can only view the metadata of securables that the user owns, or on which the user is granted permission. This means that metadata-emitting, built-in functions such as `OBJECT_ID` might return `NULL` if the user doesn't have any permission on the object. For more information, see [Metadata Visibility Configuration](../../relational-databases/security/metadata-visibility-configuration.md).

## Remarks

When the parameter to a system function is optional, the current database, host computer, server user, or database user is assumed. You must always follow built-in functions with parentheses.

When a temporary table name is specified, the database name must come before the temporary table name, unless the current database is `tempdb`. For example:

```sql
SELECT OBJECT_ID('tempdb..#mytemptable');
```

System functions can be used in the select list, in the `WHERE` clause, and anywhere an expression is allowed. For more information, see [Expressions (Transact-SQL)](../language-elements/expressions-transact-sql.md) and [WHERE (Transact-SQL)](../queries/where-transact-sql.md).

## Examples

The code samples in this article use the  `AdventureWorks2025` ,  `AdventureWorksDW2025` , or  `AdventureWorksLT2025`  sample database, which you can download from the [Azure Data SQL Samples Repository](https://github.com/microsoft/sql-server-samples) GitHub repository.

### A. Return the object ID for a specified object

The following example returns the object ID for the `Production.WorkOrder` table in the  `AdventureWorks2025`  database.

```sql
USE master;
GO

SELECT OBJECT_ID(N'AdventureWorks2022.Production.WorkOrder') AS 'Object ID';
GO
```

### B. Verify that an object exists

The following example checks for the existence of a specified table by verifying that the table has an object ID. If the table exists, it is deleted. If the table doesn't exist, the `DROP TABLE` statement isn't executed.

```sql
USE AdventureWorks2022;
GO

IF OBJECT_ID (N'dbo.AWBuildVersion', N'U') IS NOT NULL
DROP TABLE dbo.AWBuildVersion;
GO
```

### C. Use OBJECT_ID to specify the value of a system function parameter

The following example returns information for all indexes and partitions of the `Person.Address` table in the  `AdventureWorks2025`  database by using the [sys.dm_db_index_operational_stats](../../relational-databases/system-dynamic-management-objects/sys-dm-db-index-operational-stats-transact-sql.md) function.

> **Note:**  
>  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 


When you use the  Transact-SQL  functions `DB_ID` and `OBJECT_ID` to return a parameter value, always make sure that a valid ID is returned. If the database or object name can't be found, such as when they don't exist or are spelled incorrectly, both functions return `NULL`. The `sys.dm_db_index_operational_stats` function interprets `NULL` as a wildcard value that specifies all databases or all objects. Because this operation can be an unintentional, the example in this section demonstrates the safe way to determine database and object IDs.

```sql
DECLARE @db_id INT;
DECLARE @object_id INT;

SET @db_id = DB_ID(N'AdventureWorks2022');
SET @object_id = OBJECT_ID(N'AdventureWorks2022.Person.Address');

IF @db_id IS NULL
BEGIN
    PRINT N'Invalid database';
END;
ELSE IF @object_id IS NULL
BEGIN
    PRINT N'Invalid object';
END;
ELSE
BEGIN
    SELECT *
    FROM [sys].dm_db_index_operational_stats(@db_id, @object_id, NULL, NULL);
END;
GO
```

## Examples:  Azure Synapse Analytics 

### D. Return the object ID for a specified object

The following example returns the object ID for the `FactFinance` table in the   **AdventureWorksPDW2022**  
 database.

```sql
SELECT OBJECT_ID('AdventureWorksPDW2012.dbo.FactFinance') AS 'Object ID';
```

## Related content

- [Metadata functions (Transact-SQL)](metadata-functions-transact-sql.md)
- [sys.objects (Transact-SQL)](../../relational-databases/system-catalog-views/sys-objects-transact-sql.md)
- [sys.dm_db_index_operational_stats (Transact-SQL)](../../relational-databases/system-dynamic-management-objects/sys-dm-db-index-operational-stats-transact-sql.md)
- [OBJECT_DEFINITION (Transact-SQL)](object-definition-transact-sql.md)
- [OBJECT_NAME (Transact-SQL)](object-name-transact-sql.md)
