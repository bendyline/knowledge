---
title: "sp_syspolicy_set_log_on_success (Transact-SQL)"
description: "Specifies whether successful policy evaluations are logged in the Policy History log for Policy-Based Management."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_syspolicy_set_log_on_success_TSQL"
  - "sp_syspolicy_set_log_on_success"
helpviewer_keywords:
  - "sp_syspolicy_set_log_on_success"
dev_langs:
  - "TSQL"
---
# sp_syspolicy_set_log_on_success (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Specifies whether successful policy evaluations are logged in the Policy History log for Policy-Based Management.



## Syntax

```syntaxsql
dbo.sp_syspolicy_set_log_on_success [ @value = ] value
[ ; ]
```

## Arguments

#### [ @value = ] *value*

Determines whether successful policy evaluations are logged. *@value* is **sqlvariant**, and can be one of the following values:

- `0` or `false` - Successful policy evaluations aren't logged.
- `1` or `true` - Successful policy evaluations are logged.

## Return code values

`0` (success) or `1` (failure).

## Remarks

You must run `sp_syspolicy_set_log_on_success` in the context of the `msdb` system database.

When *@value* is set to `0` or to `false`, only failed policy evaluations are logged.

## Permissions

Requires membership in the **PolicyAdministratorRole** fixed database role.

> **Important:**  
> Possible elevation of credentials: Users in the **PolicyAdministratorRole** role can create server triggers and schedule policy executions that can affect the operation of the instance of the  Database Engine 
. For example, users in the **PolicyAdministratorRole** role can create a policy that can prevent most objects from being created in the  Database Engine 
. Because of this possible elevation of credentials, the **PolicyAdministratorRole** role should be granted only to users who are trusted with controlling the configuration of the  Database Engine 
.


## Examples

The following example enables the logging of successful policy evaluations.

```sql
EXECUTE msdb.dbo.sp_syspolicy_set_log_on_success @value = 1;
GO
```

## Related content

- [Policy-Based Management stored procedures (Transact-SQL)](policy-based-management-stored-procedures-transact-sql.md)
- [sp_syspolicy_configure (Transact-SQL)](sp-syspolicy-configure-transact-sql.md)
