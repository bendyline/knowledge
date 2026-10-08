---
title: Add Conditions to a Business Rule
description: Add Multiple Conditions to a Business Rule (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "business rules [Master Data Services], multiple conditions"
---
# Add Multiple Conditions to a Business Rule (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, add multiple **AND** or **OR** conditions to a business rule when you want a more complex rule.  
  
> **Note:**  
>  If you create a business rule that uses the **OR** operator, consider creating a separate rule for each conditional statement that can be evaluated independently. You can then exclude rules as needed, providing more flexibility and easier troubleshooting.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   A business rule must exist. For more information, see [Create and Publish a Business Rule (Master Data Services)](create-and-publish-a-business-rule-master-data-services.md).  
  
### To add multiple conditions to a business rule  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  From the menu bar, point to **Manage** and click **Business Rules**.  
  
3.  On the **Business Rules/** page, from the **Model** dropdown list, select a model.  
  
4.  From the **Entity** dropdown list, select an entity.  
  
5.  From the **Member Types** dropdown list, select a type of member.  
  
6.  Click the row for the business rule you want to edit.  
  
7.  Click **Edit**.  
  
8.  Under the **If** block, from the logical operator dropdown list on the left, select **AND/OR/NOT**.  
  
9. Click **Add**. A panel will be displayed.  
  
10. From the **Attribute** dropdown list, select an attribute.  
  
11. From the **Operator** dropdown list, select a condition.  
  
12. Complete any required fields.  
  
13. Click **Save**. A new row will be added to the **If** grid.  
  
14. Optionally, to add more conditions, complete steps 8-13.  
  
    > **Tip:**  
    >  To delete a condition, select the condition and right-click on it and click **Delete**.  
  
    > **Tip:**  
    >  You can select multiple conditions and right-click to group them inside a logical operator, or to ungroup conditions inside a specific logical operator.  
  
## Related content

- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
- [Change a Business Rule Name (Master Data Services)](change-a-business-rule-name-master-data-services.md)
- [Configure Business Rules to Send Notifications (Master Data Services)](configure-business-rules-to-send-notifications-master-data-services.md)
