---
title: "xp_sscanf (Transact-SQL)"
description: "Reads data from the string into the argument locations specified by each format argument."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "xp_sscanf_TSQL"
  - "xp_sscanf"
helpviewer_keywords:
  - "xp_sscanf"
dev_langs:
  - "TSQL"
---
# xp_sscanf (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Reads data from the string into the argument locations specified by each format argument.



## Syntax

```syntaxsql
xp_sscanf { 'string' OUTPUT , 'format' } [ , 'argument' [ , ...n ] ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### '*string*' OUTPUT

The character string to read the argument values from.

When `OUTPUT` is specified, *string* puts the value of *argument* in the output parameter.

#### '*format*'

A formatted character string, similar to the values supported by the C-language `sscanf` function. Currently, only the `%s` format argument is supported.

#### '*argument*'

A **varchar** variable set to the value of the corresponding *format* argument.

#### *n*

A placeholder that indicates that a maximum of 50 arguments can be specified.

## Return code values

`0` (success) or `1` (failure).

## Result set

`xp_sscanf` returns the following message:

```output
Command(s) completed successfully.
```

## Permissions

Requires membership in the **public** role.

## Examples

The following example uses `xp_sscanf` to extract two values from a source string based on their positions in the format of the source string.

```sql
DECLARE @filename AS VARCHAR (20), @message AS VARCHAR (20);

EXECUTE xp_sscanf 'sync -b -fproducts10.tmp -rrandom', 'sync -b -f%s -r%s',
    @filename OUTPUT,
    @message OUTPUT;

SELECT @filename,
       @message;
```

 Here's the result set. 


```output
(No column name) (No column name)
---------------- --------------------
products10.tmp   random
```

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [General extended stored procedures (Transact-SQL)](general-extended-stored-procedures-transact-sql.md)
- [xp_sprintf (Transact-SQL)](xp-sprintf-transact-sql.md)
