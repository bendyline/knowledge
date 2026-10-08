---
title: "sp_syspolicy_set_config_history_retention (Transact-SQL)"
description: "Specifies the number of days to keep policy evaluation history for Policy-Based Management."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_syspolicy_set_config_history_retention_TSQL"
  - "sp_syspolicy_set_config_history_retention"
helpviewer_keywords:
  - "sp_syspolicy_set_config_history_retention"
dev_langs:
  - "TSQL"
---
# sp_syspolicy_set_config_history_retention (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Specifies the number of days to keep policy evaluation history for Policy-Based Management.



## Syntax

```syntaxsql
dbo.sp_syspolicy_set_config_history_retention [ @value = ] value
[ ; ]
```

## Arguments

#### [ @value = ] *value*

The number of days to retain Policy-Based Management history. *@value* is **sqlvariant**.

## Return code values

`0` (success) or `1` (failure).

## Remarks

You must run `sp_syspolicy_set_config_history_retention` in the context of the `msdb` system database.

If *@value* is set to `0`, the history isn't automatically removed.

To view the current value for history retention, run the following query:

```sql
SELECT current_value
FROM msdb.dbo.syspolicy_configuration
WHERE name = 'HistoryRetentionInDays';
```

## Permissions

Requires membership in the **PolicyAdministratorRole** fixed database role.

> **Important:**  
> Possible elevation of credentials: Users in the **PolicyAdministratorRole** role can create server triggers and schedule policy executions that can affect the operation of the instance of the  Database Engine 
. For example, users in the **PolicyAdministratorRole** role can create a policy that can prevent most objects from being created in the  Database Engine 
. Because of this possible elevation of credentials, the **PolicyAdministratorRole** role should be granted only to users who are trusted with controlling the configuration of the  Database Engine 
.


## Examples

The following example sets the policy evaluation history retention to 28 days.

```sql
EXECUTE msdb.dbo.sp_syspolicy_set_config_history_retention @value = 28;
GO
```

## Related content

- [Policy-Based Management stored procedures (Transact-SQL)](policy-based-management-stored-procedures-transact-sql.md)
- [sp_syspolicy_configure (Transact-SQL)](sp-syspolicy-configure-transact-sql.md)
