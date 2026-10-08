---
title: "sp_add_category (Transact-SQL)"
description: "Adds the specified category of jobs, alerts, or operators to the server."
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_add_category"
  - "sp_add_category_TSQL"
helpviewer_keywords:
  - "sp_add_category"
dev_langs:
  - "TSQL"
---
# sp_add_category (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Adds the specified category of jobs, alerts, or operators to the server. For alternative method, see [Create a Job Category](https://learn.microsoft.com/ssms/agent/create-a-job-category).



> **Important:**  
> On [Azure SQL Managed Instance](https://learn.microsoft.com/azure/sql-database/sql-database-managed-instance), most, but not all SQL Server Agent features are currently supported. See [Azure SQL Managed Instance T-SQL differences from SQL Server](https://learn.microsoft.com/azure/sql-database/sql-database-managed-instance-transact-sql-information#sql-server-agent) for details.

## Syntax

```syntaxsql
dbo.sp_add_category
    [ [ @class = ] 'class' ]
    [ , [ @type = ] 'type' ]
    , [ @name = ] N'name'
[ ; ]
```

## Arguments

#### [ @class = ] '*class*'

The class of the category to be added. *@class* is **varchar(8)** with a default value of `JOB`, and can be one of these values.

| Value | Description |
| --- | --- |
| `JOB` | Adds a job category. |
| `ALERT` | Adds an alert category. |
| `OPERATOR` | Adds an operator category. |

#### [ @type = ] '*type*'

The type of category to be added. *@type* is **varchar(12)**, with a default value of `LOCAL`, and can be one of these values.

| Value | Description |
| --- | --- |
| `LOCAL` | A local job category. |
| `MULTI-SERVER` | A multiserver job category. |
| `NONE` | A category for a class other than `JOB`. |

#### [ @name = ] N'*name*'

The name of the category to be added. The name must be unique within the specified class. *@name* is **sysname**, with no default.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

`sp_add_category` must be run from the `msdb` database.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

The following example creates a local job category named `AdminJobs`.

```sql
USE msdb;
GO

EXECUTE dbo.sp_add_category
    @class = N'JOB',
    @type = N'LOCAL',
    @name = N'AdminJobs';
GO
```

## Related content

- [sp_delete_category (Transact-SQL)](sp-delete-category-transact-sql.md)
- [sp_help_category (Transact-SQL)](sp-help-category-transact-sql.md)
- [sp_update_category (Transact-SQL)](sp-update-category-transact-sql.md)
- [dbo.sysjobs (Transact-SQL)](../system-tables/dbo-sysjobs-transact-sql.md)
- [dbo.sysjobservers (Transact-SQL)](../system-tables/dbo-sysjobservers-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
