---
title: "View or modify properties of a Policy-Based Management condition"
description: Learn to view or modify properties of a Policy-Based Management condition using SQL Server Management Studio (SSMS) or Transact-SQL (T-SQL).
author: VanMSFT
ms.author: vanto
ms.date: "10/05/2016"
ms.service: sql
ms.subservice: security
ms.topic: how-to
helpviewer_keywords:
  - "Policy-Based Management, view policy conditions"
  - "Policy-Based Management, modify policy conditions"
---
# View or Modify the Properties of a Policy-Based Management Condition
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  This topic describes how to view or modify the properties of a Policy-Based Management condition in  SQL Server 
 by using  SQL Server Management Studio 
 or  Transact-SQL .  
  
<a id="BeforeYouBegin"></a>
<a id="Permissions"></a>

## Permissions

Requires membership in the PolicyAdministratorRole role in the msdb database.  
  
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
  
#### To view or modify a condition's properties  
  
1.  In **Object Explorer**, click the plus sign to expand the server that contains the condition that you want to view or modify.  
  
2.  Click the plus sign to expand the **Management** folder.  
  
3.  Click the plus sign to expand **Policy Management**.  
  
4.  Click the plus sign to expand the **Conditions** folder.  
  
5.  Right-click the condition that you want to view or edit and select **Properties**. For more information on the available options in the **Open Condition -**_condition_name_ dialog box, see [Create New Condition or Open Condition Dialog Box, General Page](create-new-condition-or-open-condition-dialog-box-general-page.md), [Open Condition Dialog Box, Dependent Policies Page](open-condition-dialog-box-dependent-policies-page.md), [Create New Condition or Open Condition Dialog Box, Description Page](create-new-condition-or-open-condition-dialog-box-description-page.md), and [Advanced Edit (Condition) Dialog Box](advanced-edit-condition-dialog-box.md).  
  
6.  When finished, click **OK**.  

##  <a name="TsqlProcedure"></a> Using Transact-SQL  
  
#### To view a condition's properties  
  
1.  In **Object Explorer**, connect to an instance of  Database Engine 
.  
  
2.  On the Standard bar, click **New Query**.  
  
3.  Copy and paste the following example into the query window and click **Execute**.  
  
    ```  
    USE msdb;  
    GO  
    SELECT name,  
       description,  
       facet,  
       expression,  
       is_name_condition,  
       obj_name  
    FROM syspolicy_conditions;  
    GO  
  
    ```  
  
 For more information, see [syspolicy_conditions (Transact-SQL)](../system-catalog-views/syspolicy-conditions-transact-sql.md).
