---
title: Make an Attribute Group Visible to Users
description: Make an Attribute Group Visible to Users (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Make an Attribute Group Visible to Users (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, make an attribute group visible to users or groups when you want users to have tabs above the grid in the **Explorer** functional area.  
  
 When you create an attribute group, it is automatically hidden from all users except the one who created it.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   At least one attribute group must exist. For more information, see [Create an Attribute Group (Master Data Services)](create-an-attribute-group-master-data-services.md).  
  
### To make an attribute group visible to users  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Manage Model** page, select a model from the grid and then click **Entities**.  
  
3.  On the **Manage Entity** page, from the grid, select the row for the entity that you want to edit the attribute group.  
  
4.  Click **Attribute Groups**.  
  
5.  On the **Manage Attribute Groups** page, select member type from the **Member Types** dropdown list to expand **Leaf**, **Consolidated** or **Collection**, depending on the type of group you want to make visible.  
  
6.  Select the attribute group you want to edit from the grid, and then click **Edit**.  
  
7.  Click a user or group in the **Available** box and click the **Add** arrow. To add all, click the **Add All** arrow.  
  
8.  Click **Save**.  
  
## Related content

- [Attribute Groups (Master Data Services)](attribute-groups-master-data-services.md)
- [Create an Attribute Group (Master Data Services)](create-an-attribute-group-master-data-services.md)
