---
title: "jobs.sp_delete_target_group (Azure Elastic Jobs) (Transact-SQL)"
description: "jobs.sp_delete_target_group removes a target group in the Azure Elastic Jobs service for Azure SQL Database."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: azure-sql-database
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_delete_target_group_TSQL"
  - "sp_delete_target_group"
  - "jobs.sp_delete_target_group_TSQL"
  - "jobs.sp_delete_target_group"
helpviewer_keywords:
  - "sp_delete_target_group"
  - "jobs.sp_delete_target_group"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current"
---
# jobs.sp_delete_target_group (Azure Elastic Jobs) (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Deletes a target group in the [Azure Elastic Jobs service for Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/elastic-jobs-overview?view=azuresql-db\&preserve-view=true).



## Syntax

```syntaxsql
[jobs].sp_delete_target_group [ @target_group_name = ] 'target_group_name'
```

## Arguments

#### @target_group_name

The name of the target group to delete. *target_group_name* is nvarchar(128), with no default.

## Return code values

`0` (success) or `1` (failure).

## Remarks

Use [jobs.sp_delete_target_group_member](sp-delete-target-group-member-elastic-jobs-transact-sql.md) to remove servers or databases from a target group.

## Permissions

By default, members of the **sysadmin** fixed server role can execute this stored procedure.

## Examples

### Create a target group

The following example removes a target group named `ServerGroup1`.

```sql
-- Remove a target group member of type server
EXECUTE jobs.sp_delete_target_group @target_group_name = N'ServerGroup1';
```

## Related content

- [Elastic jobs in Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/elastic-jobs-overview?view=azuresql-db\&preserve-view=true)
- [Create, configure, and manage elastic jobs](https://learn.microsoft.com/azure/azure-sql/database/elastic-jobs-tutorial?view=azuresql-db\&preserve-view=true)
- [Create and manage elastic jobs by using T-SQL](https://learn.microsoft.com/azure/azure-sql/database/elastic-jobs-tsql-create-manage?view=azuresql-db\&preserve-view=true)
