---
title: "/= (Division Assignment) (Transact-SQL)"
description: Divides one number by another and sets a value to the result of the operation.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/07/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "/=_TSQL"
  - "/="
helpviewer_keywords:
  - "compound operators, /="
  - "assignment operators, /="
  - "augmented operators, /="
  - "/= (divide equals)"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---

# /= (Division assignment) (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Divides one number by another and sets a value to the result of the operation. For example, if a variable `@x` equals `34`, then `@x /= 2` takes the original value of `@x`, divides by `2`, and sets `@x` to that new value (`17`).



## Syntax

```syntaxsql
expression /= expression
```

## Arguments

#### *expression*

Any valid [expression](expressions-transact-sql.md) of any one of the data types in the numeric category, except the **bit** data type.

## Return types

Returns the data type of the argument with the higher precedence. For more information, see [Data type precedence](../data-types/data-type-precedence-transact-sql.md).

## Remarks

For more information, see [/ (Division)](divide-transact-sql.md).

## Examples

The following example sets a variable to 17.5, then uses the `/=` operator to set the variable to half of its original value.

```sql
DECLARE @myVariable DECIMAL(5, 2);
SET @myVariable = 17.5;
SET @myVariable /= 2;
SELECT @myVariable AS ResultVariable;
```

 Here's the result set. 


| ResultVariable |
| --- |
| 8.75 |

## Related content

- [Compound operators (Transact-SQL)](compound-operators-transact-sql.md)
- [Expressions (Transact-SQL)](expressions-transact-sql.md)
- [Operators (Transact-SQL)](operators-transact-sql.md)
