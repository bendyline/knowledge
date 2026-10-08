---
title: DBCC SHOWRESULTCACHESPACEUSED (Transact-SQL)
description: DBCC SHOWRESULTCACHESPACEUSED shows the storage space used result set caching for an Azure Synapse Analytics database.
author: mstehrani
ms.author: emtehran
ms.reviewer: wiassaf, randolphwest
ms.date: 12/05/2022
ms.service: sql
ms.subservice: data-warehouse
ms.topic: reference
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest"
---

# DBCC SHOWRESULTCACHESPACEUSED (Transact-SQL)


**Applies to:**
 


 


Shows the storage space used result set caching for an  Azure Synapse Analytics  database.



## Syntax

```syntaxsql
DBCC SHOWRESULTCACHESPACEUSED
[;]
```

> **Note:**  
>  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 


## Remarks

The `DBCC SHOWRESULTCACHESPACEUSED` command doesn't take any parameters and returns the space used by the database where the command is run.

## Permissions

Requires **VIEW SERVER STATE** permission.

## Result sets

| Column | Data type | Description |
| --- | --- | --- |
| reserved_space | bigint | Total space used for the database, in KB. This number will change as the cached result set increases. |
| data_space | bigint | Space used for data, in KB. |
| index_space | bigint | Space used for indexes, in KB. |
| unused_space | bigint | Space that is part of the reserved space and not used, in KB. |

## Related content

- [Performance tuning with result set caching](https://learn.microsoft.com/azure/sql-data-warehouse/performance-tuning-result-set-caching)
- [ALTER DATABASE SET options (Transact-SQL)](../statements/alter-database-transact-sql-set-options.md?view=azure-sqldw-latest&preserve-view=true)
- [ALTER DATABASE (Transact-SQL)](../statements/alter-database-transact-sql.md?view=azure-sqldw-latest&preserve-view=true)
- [SET RESULT SET CACHING (Transact-SQL)](../statements/set-result-set-caching-transact-sql.md)
- [DBCC DROPRESULTSETCACHE (Transact-SQL)](dbcc-dropresultsetcache-transact-sql.md)
