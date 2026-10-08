---
title: "sp_syspolicy_update_policy_category_subscription (Transact-SQL)"
description: "Updates a policy category subscription for a specified database."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_syspolicy_update_policy_category_subscription_TSQL"
  - "sp_syspolicy_update_policy_category_subscription"
helpviewer_keywords:
  - "sp_syspolicy_update_policy_category_subscription"
dev_langs:
  - "TSQL"
---
# sp_syspolicy_update_policy_category_subscription (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Updates a policy category subscription for a specified database.



## Syntax

```syntaxsql
dbo.sp_syspolicy_update_policy_category_subscription
    [ @policy_category_subscription_id = ] policy_category_subscription_id
    [ , [ @target_type = ] N'target_type' ]
    [ , [ @target_object = ] N'target_object' ]
    [ , [ @policy_category = ] N'policy_category' ]
[ ; ]
```

## Arguments

#### [ @policy_category_subscription_id = ] *policy_category_subscription_id*

The identifier for the policy category subscription that you want to update. *@policy_category_subscription_id* is **int**, and is required.

#### [ @target_type = ] N'*target_type*'

The target type of the category subscription. *@target_type* is **sysname**, with a default of `NULL`.

If you specify *@target_type*, the value must be set to `DATABASE`.

#### [ @target_object = ] N'*target_object*'

The name of the database that will subscribe to the policy category. *@target_object* is **sysname**, with a default of `NULL`.

#### [ @policy_category = ] N'*policy_category*'

The name of the policy category that you want the database to subscribe to. *@policy_category* is **sysname**, with a default of `NULL`.

## Return code values

`0` (success) or `1` (failure).

## Remarks

You must run `sp_syspolicy_update_policy_category_subscription` in the context of the `msdb` system database.

To obtain values for *@policy_category_subscription_id* and for *@policy_category*, you can use the following query:

```sql
SELECT a.policy_category_subscription_id,
       a.target_type,
       a.target_object,
       b.name AS policy_category
FROM msdb.dbo.syspolicy_policy_category_subscriptions AS a
     INNER JOIN msdb.dbo.syspolicy_policy_categories AS b
         ON a.policy_category_id = b.policy_category_id;
```

## Permissions

Requires membership in the **PolicyAdministratorRole** fixed database role.

> **Important:**  
> Possible elevation of credentials: Users in the **PolicyAdministratorRole** role can create server triggers and schedule policy executions that can affect the operation of the instance of the  Database Engine 
. For example, users in the **PolicyAdministratorRole** role can create a policy that can prevent most objects from being created in the  Database Engine 
. Because of this possible elevation of credentials, the **PolicyAdministratorRole** role should be granted only to users who are trusted with controlling the configuration of the  Database Engine 
.


## Examples

The following example updates an existing policy category subscription so that the  `AdventureWorks2025`  database subscribes to the `Finance` policy category.

```sql
EXECUTE msdb.dbo.sp_syspolicy_update_policy_category_subscription
    @policy_category_subscription_id = 1,
    @target_object = 'AdventureWorks2022',
    @policy_category = 'Finance';
GO
```

## Related content

- [Policy-Based Management stored procedures (Transact-SQL)](policy-based-management-stored-procedures-transact-sql.md)
- [sp_syspolicy_add_policy_category_subscription (Transact-SQL)](sp-syspolicy-add-policy-category-subscription-transact-sql.md)
- [sp_syspolicy_delete_policy_category_subscription (Transact-SQL)](sp-syspolicy-delete-policy-category-subscription-transact-sql.md)
