---
title: "sp_syscollector_delete_execution_log_tree (Transact-SQL)"
description: Deletes all the log entries for the run of a single collection set.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_syscollector_delete_execution_log_tree_TSQL"
  - "sp_syscollector_delete_execution_log_tree"
helpviewer_keywords:
  - "sp_syscollector_delete_execution_log_tree"
  - "data collector [SQL Server], stored procedures"
dev_langs:
  - "TSQL"
---
# sp_syscollector_delete_execution_log_tree (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Deletes all the log entries for the run of a single collection set. It also deletes the log entries from the  SSIS 
 tables for that run.



## Syntax

```syntaxsql
dbo.sp_syscollector_delete_execution_log_tree
    [ @log_id = ] log_id
    [ , [ @from_collection_set = ] from_collection_set ]
[ ; ]
```

## Arguments

#### [ @log_id = ] *log_id*

The unique identifier for the collection set log. *@log_id* is **bigint**, with no default.

#### [ @from_collection_set = ] *from_collection_set*

The identifier for the collection set. *@from_collection_set* is **bit**, with a default of an empty string.

## Return code values

`0` (success) or `1` (failure).

## Permissions

Requires membership in the **dc_operator** (with EXECUTE permission) fixed database role to execute this procedure.

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
