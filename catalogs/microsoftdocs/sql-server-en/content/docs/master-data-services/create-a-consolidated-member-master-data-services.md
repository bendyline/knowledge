---
title: Create a Consolidated Member
description: Create a Consolidated Member (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "creating consolidated members [Master Data Services]"
  - "members [Master Data Services], creating consolidated members"
  - "consolidated members [Master Data Services], creating"
---
# Create a Consolidated Member (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Manager 
, create a consolidated member when you want a parent node for an explicit hierarchy. If you want to add data in bulk, use the staging tables instead. For more information, see  [Import Data from Tables (Master Data Services)](import-data-from-tables-master-data-services.md).  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Explorer** functional area.  
  
-   You must have a minimum of **Update** permission to the consolidated model object for the entity you are adding a member to, as well as **Create permission** to Consolidated Type under the entity.  
  
### To create a consolidated member  
  
1.  On the  Master Data Manager 
 home page, from the **Model** list, select a model.  
  
2.  From the **Version** list, select a version.  
  
3.  Click **Explorer**.  
  
4.  From the menu bar, point to **Hierarchies** and click the name of the hierarchy you want to add a consolidated member to.  
  
5.  Above the grid, select either the **Consolidated members** or the **All consolidated members in hierarchy** option.  
  
6.  In the left-hand pane, select either a Root node or a consolidated member under which you want to create a consolidated member.  
  
7.  Click **Add**.  
  
8.  In the pane on the right, complete the fields.  
  
9. Optional. In the **Annotations** box, type a comment about why the member was added. All users who have access to the member can view the annotation.  
  
10. Click **OK**.  
  
## Related content

- [Create an Explicit Hierarchy (Master Data Services)](create-an-explicit-hierarchy-master-data-services.md)
- [Create a Leaf Member (Master Data Services)](create-a-leaf-member-master-data-services.md)
- [Members (Master Data Services)](members-master-data-services.md)
- [Explicit Hierarchies (Master Data Services)](explicit-hierarchies-master-data-services.md)
