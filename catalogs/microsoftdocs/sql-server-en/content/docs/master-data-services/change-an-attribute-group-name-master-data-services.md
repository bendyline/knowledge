---
title: Change an Attribute Group Name
description: Change an Attribute Group Name (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "attribute groups [Master Data Services], changing name"
---
# Change an Attribute Group Name (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, you can change the name of an attribute group.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To change an attribute group name  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Manage Model** page, select a model from the grid and then click **Entities**.  
  
3.  On the **Manage Entity** page, from the grid, select the row for the entity that you want to edit the attribute group.  
  
4.  Click **Attribute Groups**.  
  
5.  On the **Manage Attribute Groups** page, select member type from the **Member Types** dropdown list to expand **Leaf**, **Consolidated**, or **Collection**, depending on the type of group you want to update.  
  
6.  Click the name of the attribute group that you want to update, and then click **Edit**.  
  
7.  In the **Name** box, type the new name.  
  
8.  Click **Save group**.  
  
## Related content

- [Attribute Groups (Master Data Services)](attribute-groups-master-data-services.md)
- [Create an Attribute Group (Master Data Services)](create-an-attribute-group-master-data-services.md)
- [Delete an Attribute Group (Master Data Services)](delete-an-attribute-group-master-data-services.md)
