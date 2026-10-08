---
title: "!&gt; (Not Greater Than) (Transact-SQL)"
description: "!&gt; (Not Greater Than) (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/13/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "!>_TSQL"
  - "!>"
helpviewer_keywords:
  - "!> (not greater than)"
  - "not greater than operator (!>)"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---

# !&gt; (Not Greater Than) (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Compares two expressions (a comparison operator). When you compare non-null expressions, the result is TRUE if the left operand doesn't have a greater value than the right operand. Otherwise, the result is FALSE. Unlike the = (equality) comparison operator, the result of the !> comparison of two NULL values doesn't depend on the ANSI_NULLS setting.  
  

  
## Syntax  
  
```syntaxsql 
expression !> expression  
```  
  
## Arguments
 *expression*  
 Is any valid [expression](expressions-transact-sql.md). Both expressions must have implicitly convertible data types. The conversion depends on the rules of [data type precedence](../data-types/data-type-precedence-transact-sql.md).  
  
## Result Types  
 **Boolean**  
  
## Related content

- [Data types (Transact-SQL)](../data-types/data-types-transact-sql.md)
- [Operators (Transact-SQL)](operators-transact-sql.md)
