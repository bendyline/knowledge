---
title: "RTRIM (Transact-SQL)"
description: "The RTRIM Transact-SQL function returns a character string after truncating all trailing spaces."
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 02/09/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "RTRIM_TSQL"
  - "RTRIM"
helpviewer_keywords:
  - "RTRIM function"
  - "character strings [SQL Server], trailing blanks"
  - "blank characters [SQL Server]"
  - "trailing blanks"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || >=sql-server-ver15 || >=sql-server-ver16 || >=sql-server-linux-ver15 || >=sql-server-linux-ver16 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# RTRIM (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



**Applies to: <=sql-server-ver15 || <=sql-server-linux-ver15**
Returns a character string after truncating all trailing spaces.


**Applies to: \>=sql-server-ver16 || >=sql-server-linux-ver16 || =azure-sqldw-latest || =azuresqldb-current || =azuresqldb-mi-current || =fabric**
Removes space character `char(32)` or other specified characters from the end of a string.




## Syntax

Syntax for SQL Server prior to  SQL Server 2022 (16.x) 
:

```syntaxsql
RTRIM ( character_expression )
```

Syntax for  SQL Server 2022 (16.x) 
 and later, Azure SQL Managed Instance,  Azure SQL Database 
,  Azure Synapse Analytics , and Microsoft Fabric:

> **Important:**
> The database compatibility level must be set to 160 or higher to use the optional *characters* argument.

```syntaxsql
RTRIM ( character_expression , [ characters ] )
```

## Arguments

#### *character_expression*

An [expression](../language-elements/expressions-transact-sql.md) of character or binary data. *character_expression* can be a constant, variable, or column. *character_expression* must be of a data type, except **text**, **ntext**, and **image**, that is implicitly convertible to **varchar**. Otherwise, use [CAST](cast-and-convert-transact-sql.md) to explicitly convert *character_expression*.

#### *characters*

**Applies to**:  SQL Server 2022 (16.x) 
 and later.

A literal, variable, or function call of any non-LOB character type (**nvarchar**, **varchar**, **nchar**, or **char**) containing characters that should be removed. **nvarchar(max)** and **varchar(max)** types aren't allowed.

## Return types

Returns a character expression with a type of string argument where the space character `char(32)` or other specified characters are removed from the end of a *character_expression*. Returns `NULL` if input string is `NULL`.

## Remarks

To enable the optional *characters* positional argument, enable database compatibility level `160` on the databases that you connect to when executing queries.

## Examples

### A. Remove trailing spaces

The following example takes a string of characters that has spaces at the end of the sentence, and returns the text without the spaces at the end of the sentence.

```sql
SELECT RTRIM('Removes trailing spaces.   ');
```

 Here's the result set. 


  `Removes trailing spaces.`

### B. Remove trailing spaces with a variable

The following example demonstrates how to use `RTRIM` to remove trailing spaces from a character variable.

```sql
DECLARE @string_to_trim VARCHAR(60);  
SET @string_to_trim = 'Four spaces are after the period in this sentence.    ';  
SELECT @string_to_trim + ' Next string.';  
SELECT RTRIM(@string_to_trim) + ' Next string.';  
GO
```

 Here's the result set. 


```output
Four spaces are after the period in this sentence.     Next string.

Four spaces are after the period in this sentence. Next string.
```

**Applies to: \>=sql-server-ver16 || >=sql-server-linux-ver16**

### C. Remove specified characters from the end of a string

> **Important:**
> You will need your database compatibility level set to 160 to use the optional *characters* argument.

The following example removes the characters `abc.` from the end of the `.123abc.` string.

```sql
SELECT RTRIM('.123abc.' , 'abc.');
```

 Here's the result set. 


```output
.123
```


## Related content

- [LEFT (Transact-SQL)](left-transact-sql.md)
- [TRIM (Transact-SQL)](trim-transact-sql.md)
- [LTRIM (Transact-SQL)](ltrim-transact-sql.md)
- [RIGHT (Transact-SQL)](right-transact-sql.md)
- [STRING_SPLIT (Transact-SQL)](string-split-transact-sql.md)
- [SUBSTRING (Transact-SQL)](substring-transact-sql.md)
- [CAST and CONVERT (Transact-SQL)](cast-and-convert-transact-sql.md)
- [Data types (Transact-SQL)](../data-types/data-types-transact-sql.md)
