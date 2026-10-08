---
title: "LTRIM (Transact-SQL)"
description: LTRIM returns a character string after truncating leading characters.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 05/16/2024
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "LTRIM"
  - "LTRIM_TSQL"
helpviewer_keywords:
  - "leading blanks"
  - "deleting blank spaces"
  - "characters [SQL Server], blanks"
  - "removing blank spaces"
  - "LTRIM function"
  - "blank characters [SQL Server]"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# LTRIM (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



**Applies to: <=sql-server-ver15 || <=sql-server-linux-ver15**
Returns a character string after truncating all leading spaces.


**Applies to: \>=sql-server-ver16 || >=sql-server-linux-ver16 || =azure-sqldw-latest || =azuresqldb-current || =azuresqldb-mi-current || =fabric**
Removes space character `char(32)` or other specified characters from the start of a string.




## Syntax

Syntax for SQL Server prior to  SQL Server 2022 (16.x) 
:

```syntaxsql
LTRIM ( character_expression )
```

Syntax for  SQL Server 2022 (16.x) 
 and later, Azure SQL Managed Instance,  Azure SQL Database 
,  Azure Synapse Analytics , and Microsoft Fabric:

> **Important:**
> You need your database compatibility level set to 160 to use the optional *characters* argument.

```syntaxsql
LTRIM ( character_expression , [ characters ] )
```

## Arguments

#### *character_expression*

An [expression](../language-elements/expressions-transact-sql.md) of character or binary data. *character_expression* can be a constant, variable, or column. *character_expression* must be of a data type, except **text**, **ntext**, and **image**, that is implicitly convertible to **varchar**. Otherwise, use [CAST](cast-and-convert-transact-sql.md) to explicitly convert *character_expression*.

#### *characters*

A literal, variable, or function call of any non-LOB character type (**nvarchar**, **varchar**, **nchar**, or **char**) containing characters that should be removed. **nvarchar(max)** and **varchar(max)** types aren't allowed.

## Return types

Returns a character expression with a type of string argument where the space character `char(32)` or other specified characters are removed from the beginning of a *character_expression*. Returns `NULL` if input string is `NULL`.

## Remarks

To enable the optional *characters* positional argument, enable database compatibility level `160` on the database that you connect to when executing queries.

## Examples

### A. Remove leading spaces

The following example uses LTRIM to remove leading spaces from a character expression.

```sql
SELECT LTRIM('     Five spaces are at the beginning of this string.');
```

 Here's the result set. 


```output
---------------------------------------------------------------
  Five spaces are at the beginning of this string.
  ```

### B: Remove leading spaces using a variable

The following example uses `LTRIM` to remove leading spaces from a character variable.

```sql
DECLARE @string_to_trim VARCHAR(60);
SET @string_to_trim = '     Five spaces are at the beginning of this string.';
SELECT
    @string_to_trim AS 'Original string',
    LTRIM(@string_to_trim) AS 'Without spaces';
GO
```

 Here's the result set. 


```output
Original string                                            Without spaces
-----------------------------------------------------   ---------------------------------------------
     Five spaces are at the beginning of this string.    Five spaces are at the beginning of this string.
```

### C. Remove specified characters from the beginning of a string

> **Important:**  
> You need your database compatibility level set to `160` to use the optional *characters* argument.

The following example removes the characters `123` from the beginning of the `123abc.` string.

```sql
SELECT LTRIM('123abc.' , '123.');
```

 Here's the result set. 


```output
abc.
```

## Related content

- [LEFT (Transact-SQL)](left-transact-sql.md)
- [TRIM (Transact-SQL)](trim-transact-sql.md)
- [RIGHT (Transact-SQL)](right-transact-sql.md)
- [RTRIM (Transact-SQL)](rtrim-transact-sql.md)
- [STRING_SPLIT (Transact-SQL)](string-split-transact-sql.md)
- [SUBSTRING (Transact-SQL)](substring-transact-sql.md)
- [Data types (Transact-SQL)](../data-types/data-types-transact-sql.md)
