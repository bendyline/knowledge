---
title: "sp_syspolicy_repair_policy_automation (Transact-SQL)"
description: "Repairs policy automation in Policy-Based Management."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_syspolicy_repair_policy_automation"
  - "sp_syspolicy_repair_policy_automation_TSQL"
helpviewer_keywords:
  - "sp_syspolicy_repair_policy_automation"
dev_langs:
  - "TSQL"
---
# sp_syspolicy_repair_policy_automation (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Repairs policy automation in Policy-Based Management. For example, you can use this stored procedure to repair triggers and jobs that are associated with policies that are configured to use "On schedule" or "On change" evaluation modes.



## Syntax

```syntaxsql
sp_syspolicy_repair_policy_automation
[ ; ]
```

## Arguments

This stored procedure has no parameters.

## Return code values

`0` (success) or `1` (failure).

## Remarks

You must run `sp_syspolicy_repair_policy_automation` in the context of the `msdb` system database.

## Permissions

Requires membership in the **PolicyAdministratorRole** fixed database role.

> **Important:**  
> Possible elevation of credentials: Users in the **PolicyAdministratorRole** role can create server triggers and schedule policy executions that can affect the operation of the instance of the  Database Engine 
. For example, users in the **PolicyAdministratorRole** role can create a policy that can prevent most objects from being created in the  Database Engine 
. Because of this possible elevation of credentials, the **PolicyAdministratorRole** role should be granted only to users who are trusted with controlling the configuration of the  Database Engine 
.


## Examples

The following example repairs policy automation.

```sql
EXECUTE msdb.dbo.sp_syspolicy_repair_policy_automation;
GO
```

## Related content

- [Policy-Based Management stored procedures (Transact-SQL)](policy-based-management-stored-procedures-transact-sql.md)
