---
title: "SET PARSEONLY (Transact-SQL)"
description: "Examines the syntax of each Transact-SQL statement and returns any error messages without compiling or executing the statement."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: randolphwest
ms.date: 06/06/2023
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "PARSEONLY_TSQL"
  - "SET_PARSEONLY_TSQL"
  - "PARSEONLY"
  - "SET PARSEONLY"
helpviewer_keywords:
  - "parsing [SQL Server], SET PARSEONLY statement"
  - "checking syntax"
  - "PARSEONLY option"
  - "syntax [SQL Server], verifying"
  - "verifying syntax"
  - "SET PARSEONLY statement"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# SET PARSEONLY (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Examines the syntax of each  Transact-SQL  statement and returns any error messages without compiling or executing the statement.



## Syntax

```syntaxsql
SET PARSEONLY { ON | OFF }
[ ; ]
```

## Remarks

When `SET PARSEONLY` is `ON`,  SQL Server 
 only parses the statement. When `SET PARSEONLY` is `OFF`,  SQL Server 
 compiles and executes the statement.

The setting of `SET PARSEONLY` is set at parse time and not at execute or run time.

Don't use `PARSEONLY` in a stored procedure or a trigger. `SET PARSEONLY` returns offsets if the `OFFSETS` option is `ON` and no errors occur.

## Permissions

Requires membership in the **public** role.

## Related content

- [SET Statements (Transact-SQL)](set-statements-transact-sql.md)
- [SET OFFSETS (Transact-SQL)](set-offsets-transact-sql.md)
