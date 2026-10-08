---
title: "sp_help_category (Transact-SQL)"
description: Provides information about the specified classes of jobs, alerts, or operators.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_help_category"
  - "sp_help_category_TSQL"
helpviewer_keywords:
  - "sp_help_category"
dev_langs:
  - "TSQL"
---
# sp_help_category (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Provides information about the specified classes of jobs, alerts, or operators.



## Syntax

```syntaxsql
dbo.sp_help_category
    [ [ @class = ] 'class' ]
    [ , [ @type = ] 'type' ]
    [ , [ @name = ] N'name' ]
    [ , [ @suffix = ] suffix ]
[ ; ]
```

## Arguments

#### [ @class = ] '*class*'

Specifies the class about which information is requested. *@class* is **varchar(8)**, and can be one of these values.

| Value | Description |
| --- | --- |
| `JOB` (default) | Provides information about a job category. |
| `ALERT` | Provides information about an alert category. |
| `OPERATOR` | Provides information about an operator category. |

#### [ @type = ] '*type*'

The type of category for which information is requested. *@type* is **varchar(12)**, and can be one of these values.

| Value | Description |
| --- | --- |
| `LOCAL` | Local job category. |
| `MULTI-SERVER` | Multiserver job category. |
| `NONE` | Category for a class other than `JOB`. |

#### [ @name = ] N'*name*'

The name of the category for which information is requested. *@name* is **sysname**, with a default of `NULL`.

#### [ @suffix = ] *suffix*

Specifies whether the `category_type` column in the result set is an ID or a name. *@suffix* is **bit**, with a default of `0`.

- `1` shows the `category_type` as a name.
- `0` shows the `category_type` as an ID.

## Return code values

`0` (success) or `1` (failure).

## Result set

When *@suffix* is `0`, `sp_help_category` returns the following result set:

| Column name | Data type | Description |
| --- | --- | --- |
| `category_id` | **int** | Category ID |
| `category_type` | **tinyint** | Type of category:<br /><br />`1` = Local<br />`2` = Multiserver<br />`3` = None |
| `name` | **sysname** | Category name |

When *@suffix* is `1`, `sp_help_category` returns the following result set:

| Column name | Data type | Description |
| --- | --- | --- |
| `category_id` | **int** | Category ID |
| `category_type` | **sysname** | Type of category. One of `LOCAL`, `MULTI-SERVER`, or `NONE` |
| `name` | **sysname** | Category name |

## Remarks

`sp_help_category` must be run from the `msdb` database.

If no parameters are specified, the result set provides information about all of the job categories.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


Other users must be granted one of the following  SQL Server 
 Agent fixed database roles in the `msdb` database:

- **SQLAgentUserRole**
- **SQLAgentReaderRole**
- **SQLAgentOperatorRole**

For details about the permissions of these roles, see [SQL Server Agent Fixed Database Roles](https://learn.microsoft.com/ssms/agent/sql-server-agent-fixed-database-roles).

## Examples

### A. Return local job information

The following example returns information about jobs that are administered locally.

```sql
USE msdb;
GO

EXECUTE dbo.sp_help_category @type = N'LOCAL';
GO
```

### B. Return alert information

The following example returns information about the Replication alert category.

```sql
USE msdb;
GO

EXECUTE dbo.sp_help_category
    @class = N'ALERT',
    @name = N'Replication';
GO
```

## Related content

- [sp_add_category (Transact-SQL)](sp-add-category-transact-sql.md)
- [sp_delete_category (Transact-SQL)](sp-delete-category-transact-sql.md)
- [sp_update_category (Transact-SQL)](sp-update-category-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
