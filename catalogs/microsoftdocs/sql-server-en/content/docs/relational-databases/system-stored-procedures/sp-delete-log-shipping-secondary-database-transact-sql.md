---
title: "sys.sp_delete_log_shipping_secondary_database (Transact-SQL)"
description: Removes a secondary database and removes the local history and remote history.
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_delete_log_shipping_secondary_database_TSQL"
  - "sp_delete_log_shipping_secondary_database"
helpviewer_keywords:
  - "sp_delete_log_shipping_secondary_database"
dev_langs:
  - "TSQL"
---
# sys.sp_delete_log_shipping_secondary_database (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This stored procedure removes a secondary database and removes the local history and remote history.



## Syntax

```syntaxsql
sys.sp_delete_log_shipping_secondary_database
    [ @secondary_database = ] N'secondary_database'
    [ , [ @ignoreremotemonitor = ] ignoreremotemonitor ]
[ ; ]
```

## Arguments

#### [ @secondary_database = ] N'*secondary_database*'

The name of the secondary database. *@secondary_database* is **sysname**, with no default.

#### [ @ignoreremotemonitor = ] *ignoreremotemonitor*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

`sp_delete_log_shipping_secondary_database` must be run from the `master` database on the secondary server.

## Permissions

Only members of the **sysadmin** fixed server role can run this procedure.

## Related content

- [About log shipping (SQL Server)](../../database-engine/log-shipping/about-log-shipping-sql-server.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
