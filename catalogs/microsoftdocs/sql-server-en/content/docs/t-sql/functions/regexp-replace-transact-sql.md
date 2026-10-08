---
title: "REGEXP_REPLACE (Transact-SQL)"
description: REGEXP_REPLACE Returns a modified source string replaced by a replacement string.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: abhtiwar, wiassaf, randolphwest
ms.date: 05/13/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
dev_langs:
  - TSQL
monikerRange: "=sql-server-ver17 || =sql-server-linux-ver17 || =azuresqldb-current || =azuresqldb-mi-current || =fabric-sqldb"
---

# REGEXP_REPLACE (Transact-SQL)


**Applies to:**
 

 
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns a modified source string replaced by a replacement string, where the occurrence of the regular expression pattern found. If no matches are found, the function returns the original string.

```syntaxsql
REGEXP_REPLACE
(
    string_expression,
    pattern_expression [ , string_replacement [ , start [ , occurrence [ , flags ] ] ] ]
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


#### *string_replacement*

String expression that specifies the replacement string for matching substrings and replaces the substrings matched by the pattern. The `string_replacement` can be of **char**, **varchar**, **nchar**, **nvarchar**, **varchar(max)**, or **nvarchar(max)** data types (LOB types are supported up to 2 MB). If an empty string (`''`) is specified, the function removes all matched substrings and returns the resulting string. The default replacement string is the empty string (`''`).

The string_replacement can contain \n, where n is 1 through 9, to indicate that the source substring matching the n'th parenthesized group (subexpression) of the pattern should be inserted, and it can contain `&` to indicate that the substring matching the entire pattern should be inserted. Write \ if you need to put a literal backslash in the replacement text.

For example

```sql
REGEXP_REPLACE('123-456-7890', '(\d{3})-(\d{3})-(\d{4})', '(\1) \2-\3')
```

Returns:

```output
(123) 456-7890
```

If the provided `\n` in `string_replacement` is greater than the number of groups in the *pattern_expression*, then the function ignores the value.

For example:

```sql
REGEXP_REPLACE('123-456-7890', '(\d{3})-(\d{3})-(\d{4})', '(\1) (\4)-xxxx')
```

Returns:

```output
(123) ()-xxxx
```

#### *start*

Specify the starting position for the search within the search string. Optional. Type is **int** or **bigint**.

The numbering is 1-based, meaning the first character in the expression is `1` and the value must be `>= 1`. If the start expression is less than `1`, returns error. If the start expression is greater than the length of *string_expression*, the function returns *string_expression*. The default is `1`.

#### *occurrence*

An expression (positive integer) that specifies which occurrence of the pattern expression in the source string should be searched or replaced. The default value is `0`, which means all occurrences of the *pattern_expression* are replaced. For a positive integer `n`, it searches *string_expression* for the `n`th occurrence, continuing the search from the character immediately following each previous match.

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

Expression.

## Examples

Replace all occurrences of `a` or `e` with `X` in the product names.

```sql
SELECT REGEXP_REPLACE(PRODUCT_NAME, '[ae]', 'X', 1, 0, 'i')
FROM PRODUCTS;
```

Replace the first occurrence of `cat` or `dog` with `pet` in the product descriptions

```sql
SELECT REGEXP_REPLACE(PRODUCT_DESCRIPTION, 'cat|dog', 'pet', 1, 1, 'i')
FROM PRODUCTS;
```

Replace the last four digits of the phone numbers with asterisks

```sql
SELECT REGEXP_REPLACE(PHONE_NUMBER, '\d{4}$', '****')
FROM CUSTOMERS;
```

## Related content

- [Regular expressions](../../relational-databases/regular-expressions/overview.md)
- [Regular expressions functions (Transact-SQL)](regular-expressions-functions-transact-sql.md)
