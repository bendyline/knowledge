---
title: "sp_syspolicy_delete_policy_category (Transact-SQL)"
description: "Deletes a policy category in Policy-Based Management."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_syspolicy_delete_policy_category_TSQL"
  - "sp_syspolicy_delete_policy_category"
helpviewer_keywords:
  - "sp_syspolicy_delete_policy_category"
dev_langs:
  - "TSQL"
---
# sp_syspolicy_delete_policy_category (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Deletes a policy category in Policy-Based Management.



## Syntax

```syntaxsql
dbo.sp_syspolicy_delete_policy_category
    [ [ @name = ] N'name' ]
    [ , [ @policy_category_id = ] policy_category_id ]
[ ; ]
```

## Arguments

#### [ @name = ] N'*name*'

The name of the policy category. *@name* is **sysname**, and must be specified if *@policy_category_id* is `NULL`.

#### [ @policy_category_id = ] *policy_category_id*

The identifier for the policy category. *@policy_category_id* is **int**, and must be specified if *@name* is `NULL`.

## Return code values

`0` (success) or `1` (failure).

## Remarks

You must run `sp_syspolicy_delete_policy_category` in the context of the `msdb` system database.

You must specify a value for *@name* or for *@policy_category_id*. Both can't be `NULL`. To obtain these values, query the `msdb.dbo.syspolicy_policy_categories` system view.

To delete a policy category, the category can't be referenced by any policies.

## Permissions

Requires membership in the **PolicyAdministratorRole** fixed database role.

> **Important:**  
> Possible elevation of credentials: Users in the **PolicyAdministratorRole** role can create server triggers and schedule policy executions that can affect the operation of the instance of the  Database Engine 
. For example, users in the **PolicyAdministratorRole** role can create a policy that can prevent most objects from being created in the  Database Engine 
. Because of this possible elevation of credentials, the **PolicyAdministratorRole** role should be granted only to users who are trusted with controlling the configuration of the  Database Engine 
.


## Examples

The following example deletes a policy category that is named `Finance`.

```sql
EXECUTE msdb.dbo.sp_syspolicy_delete_policy_category @name = N'Finance';
GO
```

## Related content

- [Policy-Based Management stored procedures (Transact-SQL)](policy-based-management-stored-procedures-transact-sql.md)
- [sp_syspolicy_add_policy_category (Transact-SQL)](sp-syspolicy-add-policy-category-transact-sql.md)
- [sp_syspolicy_update_policy_category (Transact-SQL)](sp-syspolicy-update-policy-category-transact-sql.md)
