---
title: "sp_delete_category (Transact-SQL)"
description: Removes the specified category of jobs, alerts, or operators from the current server.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_delete_category_TSQL"
  - "sp_delete_category"
helpviewer_keywords:
  - "sp_delete_category"
dev_langs:
  - "TSQL"
---
# sp_delete_category (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Removes the specified category of jobs, alerts, or operators from the current server.



## Syntax

```syntaxsql
dbo.sp_delete_category
    [ @class = ] 'class'
    , [ @name = ] N'name'
[ ; ]
```

## Arguments

#### [ @class = ] '*class*'

The class of the category. *@class* is **varchar(8)**, with no default, and must be one of these values.

| Value | Description |
| --- | --- |
| `JOB` | Deletes a job category. |
| `ALERT` | Deletes an alert category. |
| `OPERATOR` | Deletes an operator category. |

#### [ @name = ] N'*name*'

The name of the category to be removed. *@name* is **sysname**, with no default.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

`sp_delete_category` must be run from the `msdb` database.

Deleting a category recategorizes any jobs, alerts, or operators in that category to the default category for the class.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

The following example deletes the job category named `AdminJobs`.

```sql
USE msdb;
GO

EXECUTE dbo.sp_delete_category
    @name = N'AdminJobs',
    @class = N'JOB';
GO
```

## Related content

- [sp_add_category (Transact-SQL)](sp-add-category-transact-sql.md)
- [sp_help_category (Transact-SQL)](sp-help-category-transact-sql.md)
- [sp_update_category (Transact-SQL)](sp-update-category-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
