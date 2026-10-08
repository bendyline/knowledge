---
title: "REGEXP_SPLIT_TO_TABLE (Transact-SQL)"
description: Returns a table of strings split, delimited by the regex pattern. If there's no match to the pattern, the function returns the string.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: abhtiwar, wiassaf, randolphwest
ms.date: 05/05/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
dev_langs:
  - TSQL
monikerRange: "=sql-server-ver17 || =sql-server-linux-ver17 || =azuresqldb-current || =azuresqldb-mi-current || =fabric-sqldb"
---

# REGEXP_SPLIT_TO_TABLE


**Applies to:**
 

 
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns a table of strings split, delimited by the regex pattern. If there's no match to the pattern, the function returns the string.

```syntaxsql
REGEXP_SPLIT_TO_TABLE
(
    string_expression,
    pattern_expression [ , flags ]
)
```

Requires database compatibility level 170. To set database compatibility level, review [ALTER DATABASE (Transact-SQL) compatibility level](../statements/alter-database-transact-sql-compatibility-level.md).

The compatibility level requirement doesn't apply if the [ALLOW_BUILTIN_TVF_IN_ALL_COMPAT_LEVELS](../statements/alter-database-scoped-configuration-transact-sql.md#allow-builtin-tvf-in-all-compat-levels) database-scoped configuration is enabled.

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


## Returns

`REGEXP_SPLIT_TO_TABLE` returns the following two-column table:

| Column name | Data type | Description |
| --- | --- | --- |
| `value` | Same type as `string_expression` or **varchar** | If the delimiter is found, it's the matching substring. Otherwise it's the whole expression. |
| `ordinal` | **bigint** | 1-based index value of each substring position from the input expression. |

Return a table split for `the quick brown fox jumps over the lazy dog`.

```sql
SELECT *
FROM REGEXP_SPLIT_TO_TABLE ('the quick brown fox jumps over the lazy dog', '\s+');
```

```output
Value  Ordinal
the    1
quick  2
brown  3
fox    4
jumps  5
over   6
the    7
lazy   8
dog    9
```

## Related content

- [Regular expressions](../../relational-databases/regular-expressions/overview.md)
- [Regular expressions functions (Transact-SQL)](regular-expressions-functions-transact-sql.md)
