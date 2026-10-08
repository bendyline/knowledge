---
title: "|= (Bitwise OR Assignment) (Transact-SQL)"
description: Performs a bitwise logical OR operation between two integer values, and sets a value to the result of the operation.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/07/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "|="
  - "|=_TSQL"
helpviewer_keywords:
  - "compound operators, |="
  - "assignment operators, |="
  - "augmented operators, |="
  - "|= (bitwise OR equals)"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---

# |= (Bitwise OR assignment) (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Performs a bitwise logical `OR` operation between two integer values, and sets a value to the result of the operation.



## Syntax

```syntaxsql
expression |= expression
```

## Arguments

#### *expression*

Any valid [expression](expressions-transact-sql.md) of any one of the data types in the numeric category, except the **bit** data type.

## Return types

Returns the data type of the argument with the higher precedence. For more information, see [Data type precedence](../data-types/data-type-precedence-transact-sql.md).

## Remarks

For more information, see [&#124; (Bitwise OR)](bitwise-or-transact-sql.md).

## Related content

- [Compound operators (Transact-SQL)](compound-operators-transact-sql.md)
- [Expressions (Transact-SQL)](expressions-transact-sql.md)
- [Operators (Transact-SQL)](operators-transact-sql.md)
- [Bitwise operators (Transact-SQL)](bitwise-operators-transact-sql.md)
