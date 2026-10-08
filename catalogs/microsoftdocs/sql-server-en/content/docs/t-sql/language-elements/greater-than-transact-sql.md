---
title: "&gt; (Greater Than) (Transact-SQL)"
description: "&gt; (Greater Than) (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/13/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - ">_TSQL"
  - ">"
helpviewer_keywords:
  - "greater than operator (>)"
  - "> (greater than operator)"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# &gt; (Greater Than) (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Compares two expressions (a comparison operator) in  SQL Server 
. When you compare nonnull expressions, the result is TRUE if the left operand has a value higher than the right operand; otherwise, the result is FALSE. If either or both operands are NULL, see the topic [SET ANSI_NULLS (Transact-SQL)](../statements/set-ansi-nulls-transact-sql.md).  
  
 
  
## Syntax  
  
```syntaxsql
expression > expression  
```  
  
## Arguments
 *expression*  
 Is any valid [expression](expressions-transact-sql.md). Both expressions must have implicitly convertible data types. The conversion depends on the rules of [data type precedence](../data-types/data-type-precedence-transact-sql.md).  
  
## Result Types  
 **Boolean**  
  
## Examples  
  
### A. Using > in a simple query  
 The following example returns all rows in the `HumanResources.Department` table that have a value in `DepartmentID` that is greater than the value 13.  
  
```sql  
--Uses AdventureWorks  
  
SELECT DepartmentID, Name  
FROM HumanResources.Department  
WHERE DepartmentID > 13  
ORDER BY DepartmentID;  
  
```  
  
  Here's the result set. 
  
  
```  
DepartmentID Name  
------------ --------------------------------------------------  
14           Facilities and Maintenance  
15           Shipping and Receiving  
16           Executive  
  
(3 row(s) affected)  
  
```  
  
### B. Using > to compare two variables  
  
```sql  
DECLARE @a INT = 45, @b INT = 40;  
SELECT IIF ( @a > @b, 'TRUE', 'FALSE' ) AS Result;  
```  
  
  Here's the result set. 
  
  
```  
Result  
------  
TRUE  
  
(1 row(s) affected)  
  
```  
  
## Related content

- [Logical Functions - IIF (Transact-SQL)](../functions/logical-functions-iif-transact-sql.md)
- [Data types (Transact-SQL)](../data-types/data-types-transact-sql.md)
- [Operators (Transact-SQL)](operators-transact-sql.md)
