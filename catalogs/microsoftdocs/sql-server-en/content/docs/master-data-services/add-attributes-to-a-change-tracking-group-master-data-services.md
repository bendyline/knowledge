---
title: Add Attributes to Change Tracking Group
description: Add Attributes to a Change Tracking Group (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "change tracking groups [Master Data Services]"
  - "attributes [Master Data Services], change tracking groups"
  - "change tracking groups [Master Data Services], adding attributes"
---
# Add Attributes to a Change Tracking Group (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, add attributes to a change tracking group when you want to track changes to the attribute's values.  
  
> **Note:**  
>  After you add an attribute to a change tracking group, when values for the attribute change, the attribute is flagged as changed in the  Master Data Services 
 database. Create a business rule to take action based on the change.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   Attributes must exist to add to the change tracking group. For more information, see [Create a Text Attribute (Master Data Services)](create-a-text-attribute-master-data-services.md).  
  
### To add attributes to a change tracking group  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Manage Model** page, select a model from the grid and then click **Entities**.  
  
3.  On the **Manage Entity** page, select the row for the entity that you want to create an attribute for.  
  
4.  Click **Attributes**.  
  
5.  On the **Manage Attributes** page, do one of the following.  
  
    -   If the attribute is for leaf members, select **Leaf** from the **Member Types** list box.  
  
    -   If the attribute is for consolidated members, select **Consolidated** from the **Member Types** list box.  
  
    -   If the attribute is for collections, select **Collection** from the **Member Types** list box.  
  
6.  Select the row for the attribute you want to edit, and then click **Edit**.  
  
7.  Select the **Enable change tracking** check box.  
  
8.  In the **Change tracking group** box, type a number for the group.  
  
9. Click **Save attribute**.  
  
     For the edited attribute, the **Enable Change Tracking Group** column in the grid is changed to **Yes (Group: entered group number)**.  
  
10. Repeat this procedure for all attributes you want to include in the group. Use the same change tracking group number for each attribute in the group.  
  
## Related content

- [Create a Text Attribute (Master Data Services)](create-a-text-attribute-master-data-services.md)
- [Create a Domain-Based Attribute (Master Data Services)](create-a-domain-based-attribute-master-data-services.md)
- [Initiate Actions Based on Attribute Value Changes (Master Data Services)](initiate-actions-based-on-attribute-value-changes-master-data-services.md)
