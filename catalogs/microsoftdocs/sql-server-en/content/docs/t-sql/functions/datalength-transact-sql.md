---
title: "DATALENGTH (Transact-SQL)"
description: "DATALENGTH (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "08/20/2019"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DATALENGTH_TSQL"
  - "DATALENGTH"
helpviewer_keywords:
  - "number of bytes representing expression"
  - "data types [SQL Server], length"
  - "DATALENGTH function"
  - "expressions [SQL Server], length"
  - "lengths [SQL Server], data"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# DATALENGTH (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



This function returns the number of bytes used to represent any expression.

> **Note:**
> To return the number of characters in a string expression, use the [LEN](len-transact-sql.md) function.
  

  
## Syntax  
  
```syntaxsql
DATALENGTH ( expression )   
```  

## Arguments
*expression*  
An [expression](../language-elements/expressions-transact-sql.md) of any data type.
  
## Return types
**bigint** if *expression* has an **nvarchar(max)**, **varbinary(max)**, or **varchar(max)** data type; otherwise **int**.
  
## Remarks  
`DATALENGTH` becomes really helpful when used with data types that can store variable-length data, such as:
- **image**
- **ntext**
- **nvarchar**
- **text**
- **varbinary**
- **varchar**
  
For a NULL value, `DATALENGTH` returns NULL.
  
> **Note:**  
> Compatibility levels can affect return values. See [ALTER DATABASE Compatibility Level (Transact-SQL)](../statements/alter-database-transact-sql-compatibility-level.md) for more information about compatibility levels.  

> **Note:**
> Use the [LEN](len-transact-sql.md) to return the number of characters encoded into a given string expression, and [DATALENGTH](datalength-transact-sql.md) to return the size in bytes for a given string expression. These outputs may differ depending on the data type and type of encoding used in the column. For more information on storage differences between different encoding types, see [Collation and Unicode Support](../../relational-databases/collations/collation-and-unicode-support.md).

## Examples  
This example finds the length of the `Name` column in the `Product` table:
  
```sql
USE AdventureWorks2022  
GO
SELECT length = DATALENGTH(EnglishProductName), EnglishProductName  
FROM dbo.DimProduct  
ORDER BY EnglishProductName;  
GO  
```  
  
## Related content

- [LEN (Transact-SQL)](len-transact-sql.md)
- [CAST and CONVERT (Transact-SQL)](cast-and-convert-transact-sql.md)
- [Data types (Transact-SQL)](../data-types/data-types-transact-sql.md)
- [System Functions by category for Transact-SQL](../../relational-databases/system-functions/system-functions-category-transact-sql.md)
