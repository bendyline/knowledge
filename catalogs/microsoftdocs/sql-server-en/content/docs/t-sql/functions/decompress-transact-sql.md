---
title: "DECOMPRESS (Transact-SQL)"
description: "DECOMPRESS function decompresses an input expression value, using the Gzip algorithm."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 03/09/2023
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DECOMPRESS"
  - "DECOMPRESS_TSQL"
helpviewer_keywords:
  - "DECOMPRESS function"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azuresqldb-mi-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqledge-current || =azure-sqldw-latest || =fabric || =fabric-sqldb"
---
# DECOMPRESS (Transact-SQL)


**Applies to:**
 

 and later versions 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


This function decompresses an input expression value, using the **Gzip** algorithm. `DECOMPRESS` returns a byte array in the **varbinary(max)** data type.



## Syntax

```syntaxsql
DECOMPRESS ( expression )
```

## Arguments

#### *expression*

A **varbinary(*n*)**, **varbinary(max)**, or **binary(*n*)** value. For more information, see [Expressions (Transact-SQL)](../language-elements/expressions-transact-sql.md).

## Return types

A value of data type **varbinary(max)**. `DECOMPRESS` uses the **Gzip** algorithm to decompress the input argument. You should explicitly cast the result to a target type if necessary.

## Remarks

## Examples

### A. Decompress Data at Query Time

This example shows how to return compressed table data:

```sql
SELECT _id,
    name,
    surname,
    datemodified,
    CAST(DECOMPRESS(info) AS NVARCHAR(MAX)) AS info
FROM player;
```

### B. Display compressed data using computed column

> **Note:**  
> This example does not apply to Azure Synapse Analytics.

This example shows how to create a table for decompressed data storage:

```sql
CREATE TABLE example_table (
    _id INT PRIMARY KEY IDENTITY,
    name NVARCHAR(MAX),
    surname NVARCHAR(MAX),
    info VARBINARY(MAX),
    info_json AS CAST(DECOMPRESS(info) AS NVARCHAR(MAX))
);
```

## Related content

- [COMPRESS (Transact-SQL)](compress-transact-sql.md)
