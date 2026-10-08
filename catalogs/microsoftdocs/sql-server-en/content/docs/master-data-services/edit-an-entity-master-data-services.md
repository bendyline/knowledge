---
title: Edit an Entity
description: Edit an Entity (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "entities [Master Data Services], changing name"
---
# Edit an Entity (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, you can edit an entity.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To edit an entity  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Manage Model** page, select a model from the grid and then click **Entities**.  
  
3.  On the **Manage Entity** page, from the grid, select the row for the entity that you want to change and then click **Edit**.  
  
4.  In the **Name** box, type the updated name of the entity..  
  
5.  In the **Description** field, type the updated description of the entity.  
  
6.  In the **Name for staging tables** field, type the updated name for the staging table.  
  
7.  For the **Transaction Log Type** field, choose the updated transaction log type in the dropdown list.  
  
     For more information, see [Change the Entity Transaction Log Type (Master Data Services)](change-the-entity-transaction-log-type-master-data-services.md)  
  
8.  Select or unselect the **Create code values automatically** checkbox.  
  
     For more information, see [Automatic Code Creation (Master Data Services)](automatic-code-creation-master-data-services.md)  
  
9. Select or unselect the **Enable data Compression** checkbox. By default the row compression is turned on.  
  
     For more information, see [Data Compression](../relational-databases/data-compression/data-compression.md)  
  
## Status  
 The status column in the grid shows the status of the operation on the entity. When you click **Save entity**, the following image displays that indicates that the entity is updating.  
  
 Icon for updating status  
  
 If there are errors when creating or editing an entity, the following image displays.  
  
 Icon for error status  
  
 When the status is OK, the following image displays.  
  
 Icon for OK status  
  
## Related content

- [Explicit Hierarchies (Master Data Services)](explicit-hierarchies-master-data-services.md)
- [Delete an Entity (Master Data Services)](delete-an-entity-master-data-services.md)
- [Entities (Master Data Services)](entities-master-data-services.md)
