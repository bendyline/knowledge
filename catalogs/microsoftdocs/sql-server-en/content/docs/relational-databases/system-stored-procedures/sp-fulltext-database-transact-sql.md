---
title: "sys.sp_fulltext_database (Transact-SQL)"
description: sp_fulltext_database is included for backward compatibility only.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_fulltext_database_TSQL"
  - "sp_fulltext_database"
helpviewer_keywords:
  - "sp_fulltext_database"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sys.sp_fulltext_database (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





This is supported for backward compatibility only. `sp_fulltext_database` doesn't disable the Full-Text Engine for a given database. All user-created databases in  SQL Server 
 are always enabled for full-text indexing.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use  Management Studio
 instead.



## Syntax

```syntaxsql
sys.sp_fulltext_database [ @action = ] 'action'
[ ; ]
```

## Arguments

#### [ @action = ] '*action*'

The action to be performed. *@action* is **varchar(20)**, and can be one of these values.

| Value | Description |
| --- | --- |
| **enable** | Supported for backward compatibility only. It rebuilds all full-text catalogs of the database if the previous state of full-text is `disabled`. |
| **disable** | Supported for backward compatibility only. |

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

In  SQL Server 2008 (10.0.x) 
 and later versions, full-text indexing can't be turned off. Disabling full-text indexing doesn't remove rows from `sysfulltextcatalogs` and doesn't indicate that full-text enabled tables are no longer marked for full-text indexing. All the full-text metadata definitions are still in the system tables.

## Permissions

Only members of the **sysadmin** fixed server role and **db_owner** fixed database role can execute `sp_fulltext_database`.

## Related content

- [DATABASEPROPERTYEX (Transact-SQL)](../../t-sql/functions/databasepropertyex-transact-sql.md)
- [FULLTEXTSERVICEPROPERTY (Transact-SQL)](../../t-sql/functions/fulltextserviceproperty-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
