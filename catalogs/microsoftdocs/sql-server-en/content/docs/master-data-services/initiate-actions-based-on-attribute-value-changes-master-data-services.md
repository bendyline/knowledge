---
title: Initiate Actions Based on Attribute Value Changes
description: Initiate Actions Based on Attribute Value Changes (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "business rules [Master Data Services], tracking attribute changes"
  - "change tracking groups [Master Data Services], initiating actions"
---
# Initiate Actions Based on Attribute Value Changes (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, create a business rule to initiate actions based on changes to attribute values. For example, when a specific attribute value changes, you may want to change a value, send a notification, or start an external workflow.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   Your attributes must be in a change tracking group. See [Add Attributes to a Change Tracking Group (Master Data Services)](add-attributes-to-a-change-tracking-group-master-data-services.md) for more information.  
  
### To create a business rule to initiate actions based on attribute value changes  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  From the menu bar, point to **Manage** and click **Business Rules**.  
  
3.  On the **Business Rule Maintenance** page, from the **Model** list, select a model.  
  
4.  From the **Entity** list, select an entity.  
  
5.  From the **Member Type** list, select a type of member for the business rule to apply to.  
  
6.  From the **Attribute** list, select an attribute or leave the default of **All**.  
  
7.  Click **Add business rule**.  
  
8.  Click **Edit selected business rule**.  
  
9. In the **Components** pane, expand the **Conditions** node.  
  
10. Under the **Value comparison** node, drag **has changed** to the **IF** pane's **Conditions** label.  
  
11. In the **Edit Condition** pane, in the **Change tracking group** box, type the number of the change tracking group that you assigned as part of the prerequisites.  
  
12. In the **Edit Condition** pane, click **Save item**.  
  
13. In the **Components** pane, expand the **Actions** node.  
  
14. Click an action and drag it to the **THEN** pane's **Action** label.  
  
15. In the **Attributes** pane, click an attribute and drag it to the **Edit Action** pane's **Select attribute** label.  
  
16. In the **Edit Action** pane, complete any required fields.  
  
17. In the **Edit Action** pane, click **Save item**.  
  
18. Click **Back**.  
  
19. Optionally, on the **Business Rules Maintenance** page, for the row that contains your business rule, double-click a cell in the **Name**, **Description**, or **Notification** column to update the value.  
  
    > **Note:**  
    >  Notifications are sent only for rules that include a validation action.  
  
20. Click **Publish business rules**.  
  
21. On the confirmation dialog box, click **OK**. The rule's status changes to **Active**.  
  
## Related content

- [Add Attributes to a Change Tracking Group (Master Data Services)](add-attributes-to-a-change-tracking-group-master-data-services.md)
- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
- [Validate Specific Members against Business Rules (Master Data Services)](validate-specific-members-against-business-rules-master-data-services.md)
- [Validate a Version against Business Rules (Master Data Services)](validate-a-version-against-business-rules-master-data-services.md)
