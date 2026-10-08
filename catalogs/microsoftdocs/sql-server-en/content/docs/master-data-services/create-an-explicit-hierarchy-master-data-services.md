---
title: Create an Explicit Hierarchy
description: Create an Explicit Hierarchy (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "creating explicit hierarchies [Master Data Services]"
  - "explicit hierarchies, creating"
---
# Create an Explicit Hierarchy (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, create an explicit hierarchy when you need a ragged hierarchy in which members can exist at any level. Explicit hierarchies contain members from a single entity.  
  
 After you create an explicit hierarchy, you can add members to it in the **Explorer** functional area.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   The entity must be enabled for explicit hierarchies and collections.  
  
### To create an explicit hierarchy  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Manage Model** page, select a model from the grid and then click **Entities**.  
  
3.  On the **Manage Entity** page, from the grid, select the row for the entity that you want to create an explicit hierarchy for.  
  
4.  Click **Explicit Hierarchies**.  
  
5.  On the **Manage Explicit Hierarchy** page, click **Add**.  
  
6.  In the **Name** box, type a name for the hierarchy.  
  
7.  Optionally, clear the **Mandatory hierarchy** check box to create the hierarchy as a non-mandatory hierarchy. For more information about hierarchy types, see [Explicit Hierarchies (Master Data Services)](explicit-hierarchies-master-data-services.md).  
  
8.  Click **Save**.  
  
## Grid Columns  
 For each explicit hierarchy that you create, a row with seven columns is added to the grid. The following is a description of the columns.  
  
| Name | Description |
| --- | --- |
| Status | The entity status. When you click **Save** the following image is displayed that indicates that the entity is updating.<br /><br /> Icon for updating status<br /><br /> If there are errors when creating or editing an entity, the following image is displayed.<br /><br /> Icon for error status<br /><br /> If the status is OK, then the following image is displayed.<br /><br /> Icon for OK status |
| Name | The explicit hierarchy name. |
| Is Mandatory | Specifies whether the explicit hierarchy is mandatory. |
| Created By | The username of the user who created the explicit hierarchy. |
| Created On | The date and time when the explicit hierarchy was created. |
| Updated By | The username of the user who last updated the explicit hierarchy. |
| Updated On | The date and time when the explicit hierarchy was last updated. |
  
## Related content

- [Explicit Hierarchies (Master Data Services)](explicit-hierarchies-master-data-services.md)
- [Derived Hierarchies with Explicit Caps (Master Data Services)](derived-hierarchies-with-explicit-caps-master-data-services.md)
- [Change an Explicit Hierarchy Name (Master Data Services)](change-an-explicit-hierarchy-name-master-data-services.md)
- [Create a Consolidated Member (Master Data Services)](create-a-consolidated-member-master-data-services.md)
