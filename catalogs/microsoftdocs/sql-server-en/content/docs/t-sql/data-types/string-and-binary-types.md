---
title: "String and Binary Types"
description: "Learn about the string and binary types in the Database Engine, including binary, varbinary, char, nchar, varchar, and nvarchar."
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 09/24/2024
ms.service: sql
ms.subservice: t-sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "data types [SQL Server]"
  - "LOB data [SQL Server]"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# String and binary types


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



 SQL Server 
 supports the following string and binary types.

| Type | Description |
| --- | --- |
| [binary and varbinary](binary-and-varbinary-transact-sql.md) | Binary data types of either fixed length or variable length. Converting data to the **binary** and **varbinary** data types is useful if **binary** data is the easiest way to move around data. |
| [char and varchar](char-and-varchar-transact-sql.md) | Character data types that are either fixed-size, **char**, or variable-size, **varchar**.<br /><br />Starting with  SQL Server 2019 (15.x) |
| , when a UTF-8 enabled collation is used, these data types store the full range of Unicode character data and use the UTF-8 character encoding. |
| [nchar and nvarchar](nchar-and-nvarchar-transact-sql.md) | Unicode character data types that are either fixed-size, **nchar**, or variable-size, **nvarchar**.<br /><br />Starting with  SQL Server 2012 (11.x) |
| , when a Supplementary Character (SC) enabled collation is used, these data types store the full range of Unicode character data and use the UTF-16 character encoding. |
| [ntext, text, and image](ntext-text-and-image-transact-sql.md) | Fixed and variable-length data types for storing large non-Unicode and Unicode character and binary data. Unicode data uses the Unicode UCS-2 character set.<br /><br />The **ntext**, **text**, and **image** data types will be removed in a future version of  SQL Server |
| . Avoid using these data types in new development work, and plan to modify applications that currently use them. |

## Related content

- [Data types (Transact-SQL)](data-types-transact-sql.md)
- [Numeric types](numeric-types.md)
- [String Functions](../../odbc/reference/appendixes/string-functions.md)
