---
title: "sp_syspolicy_purge_health_state (Transact-SQL)"
description: "Deletes the policy health states in Policy-Based Management."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_syspolicy_purge_health_state_TSQL"
  - "sp_syspolicy_purge_health_state"
helpviewer_keywords:
  - "sp_syspolicy_purge_health_state"
dev_langs:
  - "TSQL"
---
# sp_syspolicy_purge_health_state (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Deletes the policy health states in Policy-Based Management. Policy health states are visual indicators within Object Explorer (a scroll symbol with a red "X") that help you to determine which nodes have failed a policy evaluation.



## Syntax

```syntaxsql
dbo.sp_syspolicy_purge_health_state
    [ [ @target_tree_root_with_id = ] N'target_tree_root_with_id' ]
[ ; ]
```

## Arguments

#### [ @target_tree_root_with_id = ] N'*target_tree_root_with_id*'

Represents the node in Object Explorer where you want to clear the health state. *@target_tree_root_with_id* is **nvarchar(400)**, with a default of `NULL`.

You can specify values from the target_query_expression_with_id column of the `msdb.dbo.syspolicy_system_health_state` system view.

## Return code values

`0` (success) or `1` (failure).

## Remarks

You must run `sp_syspolicy_purge_health_state` in the context of the `msdb` system database.

If you run this stored procedure without any parameters, the system health state is deleted for all nodes in Object Explorer.

## Permissions

Requires membership in the **PolicyAdministratorRole** fixed database role.

> **Important:**  
> Possible elevation of credentials: Users in the **PolicyAdministratorRole** role can create server triggers and schedule policy executions that can affect the operation of the instance of the  Database Engine 
. For example, users in the **PolicyAdministratorRole** role can create a policy that can prevent most objects from being created in the  Database Engine 
. Because of this possible elevation of credentials, the **PolicyAdministratorRole** role should be granted only to users who are trusted with controlling the configuration of the  Database Engine 
.


## Examples

The following example deletes the health states for a specific node in Object Explorer.

```sql
EXECUTE msdb.dbo.sp_syspolicy_purge_health_state
    @target_tree_root_with_id = 'Server/Database[@ID=7]';
GO
```

## Related content

- [Policy-Based Management stored procedures (Transact-SQL)](policy-based-management-stored-procedures-transact-sql.md)
