---
title: "Regular Expressions Functions (Transact-SQL)"
description: Use the functions described in this article to match complex patterns and manipulate data in SQL Server with regular expressions.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: abhtiwar, randolphwest, wiassaf
ms.date: 11/18/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "Regular expressions functions"
  - "regex"
dev_langs:
  - TSQL
monikerRange: "=sql-server-ver17 || =sql-server-linux-ver17 || =azuresqldb-current || =azuresqldb-mi-current || =fabric-sqldb"
---

# Regular expressions functions (Transact-SQL)


**Applies to:**
 

 
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Use the functions described in this article to match complex patterns and manipulate data in SQL Server with regular expressions.

> **Note:**  
> Regular expressions are available in Azure SQL Managed Instance with the **SQL Server 2025** or **Always-up-to-date** [update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy).


| Function | Description |
| --- | --- |
| [REGEXP_LIKE](regexp-like-transact-sql.md) | Returns a Boolean value that indicates whether the text input matches the regex pattern. |
| [REGEXP_REPLACE](regexp-replace-transact-sql.md) | Returns a modified source string replaced by a replacement string, where occurrence of the regex pattern found. |
| [REGEXP_SUBSTR](regexp-substr-transact-sql.md) | Extracts parts of a string based on a regular expression pattern.<br /><br />Returns Nth occurrence of a substring that matches the regex pattern. |
| [REGEXP_INSTR](regexp-instr-transact-sql.md) | Returns the starting or ending position of the matched substring, depending on the option supplied. |
| [REGEXP_COUNT](regexp-count-transact-sql.md) | Returns a count of the number of times that regex pattern occurs in a string. |
| [REGEXP_MATCHES](regexp-matches-transact-sql.md) | Returns a table of captured substring(s) that match a regular expression pattern to a string. If no match is found, the function returns no row. |
| [REGEXP_SPLIT_TO_TABLE](regexp-split-to-table-transact-sql.md) | Returns a table of strings split, delimited by the regex pattern. If there's no match to the pattern, the function returns the string. |


## Related content

- [Regular expressions](../../relational-databases/regular-expressions/overview.md)
