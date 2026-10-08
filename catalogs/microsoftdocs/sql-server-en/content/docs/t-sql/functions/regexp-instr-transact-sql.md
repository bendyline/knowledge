---
title: "REGEXP_INSTR (Transact-SQL)"
description: REGEXP_INSTR Returns the starting or ending position of the matched substring.
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

# REGEXP_INSTR (Transact-SQL)


**Applies to:**
 

 
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns the starting or ending position of the matched substring, depending on the value of the `return_option` argument.

```syntaxsql
REGEXP_INSTR
(
    string_expression,
    pattern_expression [ , start [ , occurrence [ , return_option [ , flags [ , group ] ] ] ] ]
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

Specifies the starting position for the search within the search string. Optional. Type is **int** or **bigint**.

The numbering is 1-based, meaning the first character in the expression is `1` and the value must be `>= 1`. If the start expression is less than `1`, returns error. If the start expression is greater than the length of *string_expression*, the function returns `0`. The default is `1`.

#### *occurrence*

An expression (positive integer) that specifies which occurrence of the pattern expression within the source string to be searched or replaced. Default is `1`. Searches at the first character of the *string_expression*. For a positive integer `n`, it searches for the `nth` occurrence beginning with the first character following the first occurrence of the *pattern_expression*, and so forth.

#### *return_option*

Specifies whether to return the beginning or ending position of the matched substring. Use `0` for the beginning, and `1` for the end. The default value is `0`. The query returns error for any other value.

#### *flag*


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


#### *group*

Specifies which capture group (`subexpression`) of a *pattern_expression* determines the position within *string_expression* to return. The group is a fragment of pattern enclosed in parentheses and can be nested. The groups are numbered in the order in which their left parentheses appear in pattern. The value is an integer and must be `>= 0` and must not be greater than the number of groups in the *pattern_expression*. The default value is `0`, which indicates that the position is based on the string that matches the entire *pattern_expression*.

If the value is greater than the number of groups in *pattern_expression*, the function returns `0`.

## Return value

Integer.

## Examples

Find the position of the first substring that contains only digits in the `PRODUCT_DESCRIPTION` column.

```sql
SELECT REGEXP_INSTR(PRODUCT_DESCRIPTION, '\d+')
FROM PRODUCTS;
```

Find the position of the third occurrence of the letter `a` (case-insensitive) in the `PRODUCT_NAME` column.

```sql
SELECT REGEXP_INSTR(PRODUCT_NAME, 'a', 1, 3, 0, 'i')
FROM PRODUCTS;
```

Find the position of the end of the first substring that starts with `t` and ends with `e` (case-sensitive) in the `PRODUCT_DESCRIPTION` column.

```sql
SELECT REGEXP_INSTR(PRODUCT_DESCRIPTION, 't.*?e', 1, 1, 1)
FROM PRODUCTS;
```

## Related content

- [Regular expressions](../../relational-databases/regular-expressions/overview.md)
- [Regular expressions functions (Transact-SQL)](regular-expressions-functions-transact-sql.md)
