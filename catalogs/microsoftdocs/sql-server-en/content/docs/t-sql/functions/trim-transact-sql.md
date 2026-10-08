---
title: "TRIM (Transact-SQL)"
description: "Removes the space character or other specified characters from the start and end of a string."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "TRIM"
  - "TRIM_TSQL"
helpviewer_keywords:
  - "TRIM function"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || =azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# TRIM (Transact-SQL)


**Applies to:**
 



 and later versions 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



**Applies to: \=azure-sqldw-latest**

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).



Removes the space character `char(32)` or other specified characters from the start and end of a string.

Starting with  SQL Server 2022 (16.x) 
, optionally removes the space character `char(32)` or other specified characters from the start, end, or both sides of a string.



## Syntax

Syntax for  SQL Server 2019 (15.x) 
 and earlier versions, and  Azure Synapse Analytics :

```syntaxsql
TRIM ( [ characters FROM ] string )
```

Syntax for  SQL Server 2022 (16.x) 
 and later versions, Azure SQL Managed Instance,  Azure SQL Database 
, and Microsoft Fabric:

**Applies to: \=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || = azuresqldb-mi-current**
> **Important:**  
> You need your database compatibility level set to `160` to use the `LEADING`, `TRAILING`, or `BOTH` keywords.


```syntaxsql
TRIM ( [ LEADING | TRAILING | BOTH ] [characters FROM ] string )
```

## Arguments

**Applies to: \>=sql-server-2017 || =azuresqldb-current || >=sql-server-linux-2017 || = azuresqldb-mi-current || =fabric || =fabric-sqldb**
#### [ LEADING | TRAILING | BOTH ]

**Applies to:**  SQL Server 2022 (16.x) 
 and later versions, Azure SQL Managed Instance,  Azure SQL Database 
, and Microsoft Fabric:

The optional first argument specifies which side of the string to trim:

- `LEADING` removes characters specified from the start of a string.

- `TRAILING` removes characters specified from the end of a string.

- `BOTH` (default positional behavior) removes characters specified from the start and end of a string.


#### *characters*

A literal, variable, or function call of any non-LOB character type (**nvarchar**, **varchar**, **nchar**, or **char**) containing characters that should be removed. **nvarchar(max)** and **varchar(max)** types aren't allowed.

#### *string*

An expression of any character type (**nvarchar**, **varchar**, **nchar**, or **char**) where characters should be removed.

## Return types

Returns a character expression with a type of string argument where the space character `char(32)` or other specified characters are removed from both sides. Returns `NULL` if input string is `NULL`.

## Remarks

By default, the `TRIM` function removes the space character from both the start and the end of the string. This behavior is equivalent to `LTRIM(RTRIM(@string))`.

**Applies to: \=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || = azuresqldb-mi-current**
To enable the optional `LEADING`, `TRAILING`, or `BOTH` positional arguments in  SQL Server 2022 (16.x) 
, you must enable database compatibility level `160` on the database that you're connecting to when executing queries.


- With optional `LEADING` positional argument, the behavior is equivalent to `LTRIM(@string, characters)`.
- With optional `TRAILING` positional argument, the behavior is equivalent to `RTRIM(@string, characters)`.

## Examples

### A. Remove the space character from both sides of string

The following example removes spaces from before and after the word `test`.

```sql
SELECT TRIM( '     test    ') AS Result;
```

 Here's the result set. 


```output
test
```

### B. Remove specified characters from both sides of string

The following example provides a list of possible characters to remove from a string.

```sql
SELECT TRIM( '.,! ' FROM '     #     test    .') AS Result;
```

 Here's the result set. 


```output
#     test
```

In this example, only the trailing period and spaces from before `#` and after the word `test` were removed. The other characters were ignored because they didn't exist in the string.

### C. Remove specified characters from the start of a string

**Applies to: \=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || = azuresqldb-mi-current**
> **Important:**  
> You need your database compatibility level set to `160` to use the `LEADING`, `TRAILING`, or `BOTH` keywords.

The following example removes the leading `.` from the start of the string before the word `test`.

```sql
SELECT TRIM(LEADING '.,! ' FROM  '     .#     test    .') AS Result;
```

 Here's the result set. 


```output
#     test    .
```

### D. Remove specified characters from the end of a string

**Applies to: \=azure-sqldw-latest || =azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current**
> **Important:**  
> You need your database compatibility level set to `160` to use the `LEADING`, `TRAILING`, or `BOTH` keywords.


The following example removes the trailing `.` from the end of the string after the word `test`.

```sql
SELECT TRIM(TRAILING '.,! ' FROM '     .#     test    .') AS Result;
```

 Here's the result set. 


```output
     .#     test
```

### E. Remove specified characters from the beginning and end of a string

**Applies to: \=azure-sqldw-latest || =azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current**
> **Important:**  
> You need your database compatibility level set to `160` to use the `LEADING`, `TRAILING`, or `BOTH` keywords.


The following example removes the characters `123` from the beginning and end of the string `123abc123`.

```sql
SELECT TRIM(BOTH '123' FROM '123abc123') AS Result;
```

 Here's the result set. 


```output
abc
```

## Related content

- [LEFT (Transact-SQL)](left-transact-sql.md)
- [LTRIM (Transact-SQL)](ltrim-transact-sql.md)
- [RIGHT (Transact-SQL)](right-transact-sql.md)
- [RTRIM (Transact-SQL)](rtrim-transact-sql.md)
- [STRING_SPLIT (Transact-SQL)](string-split-transact-sql.md)
- [SUBSTRING (Transact-SQL)](substring-transact-sql.md)
