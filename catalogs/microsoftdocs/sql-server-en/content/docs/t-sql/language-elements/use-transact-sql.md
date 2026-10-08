---
title: "USE (Transact-SQL)"
description: Changes the database context to the specified database or database snapshot.
author: rwestMSFT
ms.author: randolphwest
ms.date: 07/15/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
f1_keywords:
  - "USE_TSQL"
  - "USE"
helpviewer_keywords:
  - "USE statement"
  - "database context [SQL Server]"
  - "context changes [SQL Server]"
  - "modifying database context"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric"
---
# USE (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


Changes the database context to the specified database or database snapshot.



## Syntax

```syntaxsql
USE { database_name }
[ ; ]
```

## Arguments

#### *database_name*

The name of the database or database snapshot to which the user context is switched. Database and database snapshot names must comply with the rules for [identifiers](../../relational-databases/databases/database-identifiers.md).

In  Azure SQL Database 
, the database parameter can only refer to the current database. If a database other than the current database is provided, the `USE` statement doesn't switch between databases, and error code 40508 is returned. To change databases, you must directly connect to the database. The `USE` statement is marked as not applicable to  Azure SQL Database 
 at the top of this page, because even though you can have the `USE` statement in a batch, it doesn't do anything.

## Remarks

When a  SQL Server 
 login connects to  SQL Server 
, the login is automatically connected to its default database and acquires the security context of a database user. If no database user is created for the  SQL Server 
 login, the login connects as guest. If the database user doesn't have CONNECT permission on the database, the `USE` statement fails. If no default database is assigned to the login, its default database is set to `master`.

`USE` is executed at both compile and execution time and takes effect immediately. Therefore, statements that appear in a batch after the `USE` statement are executed in the specified database.

## Permissions

Requires `CONNECT` permission on the target database.

## Examples

The following example changes the database context to the  `AdventureWorks2025`  database.

```sql
USE AdventureWorks2022;
GO
```

## Related content

- [CREATE LOGIN (Transact-SQL)](../statements/create-login-transact-sql.md)
- [CREATE USER (Transact-SQL)](../statements/create-user-transact-sql.md)
- [Principals (Database Engine)](../../relational-databases/security/authentication-access/principals-database-engine.md)
- [CREATE DATABASE](../statements/create-database-transact-sql.md)
- [DROP DATABASE (Transact-SQL)](../statements/drop-database-transact-sql.md)
- [EXECUTE (Transact-SQL)](execute-transact-sql.md)
