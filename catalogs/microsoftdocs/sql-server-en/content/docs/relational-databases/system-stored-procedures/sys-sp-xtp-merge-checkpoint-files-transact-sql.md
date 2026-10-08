---
title: "sys.sp_xtp_merge_checkpoint_files (Transact-SQL)"
description: "Merges all data and delta files in the transaction range specified."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.sp_xtp_merge_checkpoint_files_TSQL"
  - "sys.sp_xtp_merge_checkpoint_files"
helpviewer_keywords:
  - "sys.sp_xtp_merge_checkpoint_files"
dev_langs:
  - "TSQL"
---
# sys.sp_xtp_merge_checkpoint_files (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Merges all data and delta files in the transaction range specified.

> **Note:**  
> This stored procedure is deprecated in  SQL Server 2016 (13.x) 
. It's no longer needed, and can't be used, starting  SQL Server 2016 (13.x) 
.

For more information, see [Creating and Managing Storage for Memory-Optimized Objects](../in-memory-oltp/creating-and-managing-storage-for-memory-optimized-objects.md).



## Syntax

```syntaxsql
sys.sp_xtp_merge_checkpoint_files
    [ @database_name = ] N'database_name'
    , [ @transaction_lower_bound = ] transaction_lower_bound
    , [ @transaction_upper_bound = ] transaction_upper_bound
[ ; ]
```

## Arguments

#### [ @database_name = ] N'*database_name*'

The name of the database on which to invoke the merge. *@database_name* is **sysname**. If the database doesn't have in-memory tables, this procedure returns with user error. If the database is offline, it returns an error.

#### [ @transaction_lower_bound = ] *transaction_lower_bound*

The **bigint** lower bound of transactions for a data file as shown in [sys.dm_db_xtp_checkpoint_files](../system-dynamic-management-objects/sys-dm-db-xtp-checkpoint-files-transact-sql.md) corresponding to the start checkpoint file of the merge. An error is generated for an invalid transaction ID.

#### [ @transaction_upper_bound = ] *transaction_upper_bound*

The **bigint** upper bound of transactions for a data file as shown in [sys.dm_db_xtp_checkpoint_files](../system-dynamic-management-objects/sys-dm-db-xtp-checkpoint-files-transact-sql.md). An error is generated for an invalid transaction ID.

## Return code values

None.

## Cursors returned

None.

## Permissions

Requires **sysadmin** fixed server role and the **db_owner** fixed database role.

## Remarks

Merges all data and delta files in the valid range to produce a single data and delta file. This procedure doesn't honor the merge policy.

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [In-Memory OLTP overview and usage scenarios](../in-memory-oltp/overview-and-usage-scenarios.md)
