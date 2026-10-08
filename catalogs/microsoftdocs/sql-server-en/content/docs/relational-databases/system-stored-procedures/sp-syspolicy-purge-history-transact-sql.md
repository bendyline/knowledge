---
title: "sp_syspolicy_purge_history (Transact-SQL)"
description: "Removes the policy evaluation history according to the history retention interval setting."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_syspolicy_purge_history_TSQL"
  - "sp_syspolicy_purge_history"
helpviewer_keywords:
  - "sp_syspolicy_purge_history"
dev_langs:
  - "TSQL"
---
# sp_syspolicy_purge_history (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Removes the policy evaluation history according to the history retention interval setting.



## Syntax

```syntaxsql
dbo.sp_syspolicy_purge_history [ [ @include_system = ] include_system ]
[ ; ]
```

## Arguments

This stored procedure has no parameters.

#### [ @include_system = ] *include_system*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Remarks

You must run `sp_syspolicy_purge_history` in the context of the `msdb` system database.

To view the history retention interval, you can use the following query:

```sql
SELECT current_value
FROM msdb.dbo.syspolicy_configuration
WHERE name = N'HistoryRetentionInDays';
GO
```

If the history retention interval is set to `0`, policy evaluation history isn't removed.

## Permissions

Requires membership in the **PolicyAdministratorRole** fixed database role.

> **Important:**  
> Possible elevation of credentials: Users in the **PolicyAdministratorRole** role can create server triggers and schedule policy executions that can affect the operation of the instance of the  Database Engine 
. For example, users in the **PolicyAdministratorRole** role can create a policy that can prevent most objects from being created in the  Database Engine 
. Because of this possible elevation of credentials, the **PolicyAdministratorRole** role should be granted only to users who are trusted with controlling the configuration of the  Database Engine 
.


## Examples

The following example removes the policy evaluation history.

```sql
EXECUTE msdb.dbo.sp_syspolicy_purge_history;
GO
```

## Related content

- [Policy-Based Management stored procedures (Transact-SQL)](policy-based-management-stored-procedures-transact-sql.md)
- [sp_syspolicy_set_config_history_retention (Transact-SQL)](sp-syspolicy-set-config-history-retention-transact-sql.md)
- [sp_syspolicy_delete_policy_execution_history (Transact-SQL)](sp-syspolicy-delete-policy-execution-history-transact-sql.md)
