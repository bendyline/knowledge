---
title: Create an Attribute Group
description: Create an Attribute Group (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "attribute groups [Master Data Services], creating"
  - "creating attribute groups [Master Data Services]"
---
# Create an Attribute Group (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, create attribute groups when you want to display attributes on individual tabs in the **Explorer** grid.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   At least one attribute must exist. For more information, see [Create a Text Attribute (Master Data Services)](create-a-text-attribute-master-data-services.md).  
  
### To create an attribute group  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Manage Model** page, select a model from the grid and then click **Entities**.  
  
3.  On the **Manage Entity** page, from the grid, select the row for the entity that you want to create an attribute group for.  
  
4.  Click **Attribute Groups**.  
  
5.  On the Manage Attribute Groups page, do one of the following and then click **Add**.  
  
     If the attribute group is for leaf members, select **Leaf** from the **Member Types** dropdown list at the top of the page.  
  
     If the attribute group is for consolidated members, select **Consolidated** from the **Member Types** dropdown list.  
  
     If the attribute group is for collections, select **Collection** from the **Member Types** dropdown list.  
  
6.  Click **Leaf Groups**, **Consolidated Groups**, or **Collection Groups** to create an attribute group of leaf members, consolidated members, or collections respectively.  
  
7.  In the **Name** box, type a name for the attribute group. This name is displayed on the tab in **Explorer**.  
  
8.  To add an attribute, click the attribute in the **Available Attributes** box, and then click the **Add** arrow. To add all attributes, click the **Add All** arrow.  
  
9. Click the **Up** and **Down** arrows to change the left-to-right order of the attributes.  
  
10. Click users in the **Available Users** box, and then click the **Add** arrow. To add all users, click the **Add All** arrow.  
  
11. Click groups in the **Available Groups** box, and then click the **Add** arrow. To add all groups, click the **Add All** arrow.  
  
12. Click **Save**.  
  
## Related content

- [Attribute Groups (Master Data Services)](attribute-groups-master-data-services.md)
- [Attributes (Master Data Services)](attributes-master-data-services.md)
- [Change an Attribute Group Name (Master Data Services)](change-an-attribute-group-name-master-data-services.md)
- [Delete an Attribute Group (Master Data Services)](delete-an-attribute-group-master-data-services.md)
- [Leaf Permissions (Master Data Services)](leaf-permissions-master-data-services.md)
- [Make an Attribute Group Visible to Users (Master Data Services)](make-an-attribute-group-visible-to-users-master-data-services.md)
