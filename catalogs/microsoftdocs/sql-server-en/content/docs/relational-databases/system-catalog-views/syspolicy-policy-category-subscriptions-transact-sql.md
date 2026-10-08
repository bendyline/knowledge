---
title: "syspolicy_policy_category_subscriptions (Transact-SQL)"
description: syspolicy_policy_category_subscriptions (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "syspolicy_policy_category_subscriptions_TSQL"
  - "syspolicy_policy_category_subscriptions"
helpviewer_keywords:
  - "syspolicy_policy_group_subscriptions view"
dev_langs:
  - "TSQL"
---
# syspolicy_policy_category_subscriptions (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Displays one row for each Policy-Based Management subscription in the instance of  SQL Server 
. Each row describes a target and policy category pair. The following table describes the columns in the syspolicy_policy_group_subscriptions view.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| policy_category_subscription_id | **int** | Identifier of this record. |
| target_type | **sysname** | Type of database object that is the target of this subscription. |
| target_object | **sysname** | Name of the target object. |
| policy_category_id | **int** | ID of the policy category that is applied to the target. |
  
## Remarks  
 This view shows the targets that are subscribed to policy categories.  
  
## Permissions  
 Requires membership in the PolicyAdministratorRole role in the msdb database.  
  
## Related content

- [Administer Servers by Using Policy-Based Management](../policy-based-management/administer-servers-by-using-policy-based-management.md)
- [Policy-Based Management Views (Transact-SQL)](policy-based-management-views-transact-sql.md)
