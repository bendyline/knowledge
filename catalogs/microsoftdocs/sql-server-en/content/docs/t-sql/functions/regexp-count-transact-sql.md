---
title: "REGEXP_COUNT (Transact-SQL)"
description: REGEXP_COUNT returns the number of times that a matched expression pattern exists in a string.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: abhtiwar, wiassaf, randolphwest
ms.date: 11/18/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
dev_langs:
  - TSQL
monikerRange: "=sql-server-ver17 || =sql-server-linux-ver17 || =azuresqldb-current || =azuresqldb-mi-current || =fabric-sqldb"
---

# REGEXP_COUNT (Transact-SQL)


**Applies to:**
 

 
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Counts the number of times that a regular expression pattern is matched in a string.

```syntaxsql
REGEXP_COUNT
(
    string_expression,
    pattern_expression [ , start [ , flags ] ]
)
```

> **Note:**  
> Regular expressions are available in Azure SQL Managed Instance with the **SQL Server 2025** or **Always-up-to-date** [update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy).

## Arguments

#### *string_expression*


An expression of a character string.

Can be a constant, variable, or column of character string.

Data types: **char**, **nchar**, **varchar**, or **nvarchar**.

> **Note:**  
> The `REGEXP_*` functions support LOB types (**varchar(max)** and **nvarchar(max)**) up to 2 MB for the *string_expression* parameter.


#### *pattern_expression*


Regular expression pattern to match. Usually a text literal.

Data types: **char**, **nchar**, **varchar**, or **nvarchar**. *pattern_expression* supports a maximum character length of 8,000 bytes.


#### *start*

Specify the starting position for the search within the search string. Optional. Type is **int** or **bigint**.

The numbering is 1-based, meaning the first character in the expression is `1` and the value must be `>= 1`. If the start expression is less than `1`, the returned *pattern_expression* begins at the first character that is specified in *string_expression*. If the start expression is greater than the length of *string_expression*, the function returns `0`. The default is `1`.

If the start expression is less than `1`, the query returns an error.

#### *flags*


One or more characters that specify the modifiers used for searching for matches. Type is **varchar** or **char**, with a maximum of 30 characters.

For example, `ims`. The default is `c`. If an empty string `(' ')` is provided, it will be treated as the default value `('c')`. Supply `c` or any other character expressions. If flag contains multiple contradictory characters, then SQL Server uses the last character.

For example, if you specify `ic` the regex returns case-sensitive matching.

If the value contains a character other than those listed at [Supported flag values](#supported-flag-values), the query returns an error like the following example:

```output
Invalid flag provided. '<invalid character>' are not valid flags. Only {c,i,s,m} flags are valid.
```

##### Supported flag values

| Flag | Description |
| --- | --- |
| `i` | Case-insensitive (default `false`) |
| `m` | Multi-line mode: `^` and `$` match begin/end line in addition to begin/end text (default `false`) |
| `s` | Let `.` match `\n` (default `false`) |
| `c` | Case-sensitive (default `true`) |


## Return value

**int**

## Examples

Count how many times the letter `a` appears in each product name.

```sql
SELECT PRODUCT_NAME,
       REGEXP_COUNT(PRODUCT_NAME, 'a') AS A_COUNT
FROM PRODUCTS;
```

Count how many products have a name that ends with `ing`.

```sql
SELECT COUNT(*)
FROM PRODUCTS
WHERE REGEXP_COUNT(PRODUCT_NAME, 'ing$') > 0;
```

Count how many products have a name that contains three consecutive consonants, ignoring case.

```sql
SELECT COUNT(*)
FROM PRODUCTS
WHERE REGEXP_COUNT(PRODUCT_NAME, '[^aeiou]{3}', 1, 'i') > 0;
```

## Related content

- [Regular expressions](../../relational-databases/regular-expressions/overview.md)
- [Regular expressions functions (Transact-SQL)](regular-expressions-functions-transact-sql.md)
