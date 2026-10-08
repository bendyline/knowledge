---
title: Add Members to a Collection
description: Add Members to a Collection (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "collections [Master Data Services], adding members"
---
# Add Members to a Collection (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, you can add leaf and consolidated members to a collection.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Explorer** functional area.  
  
-   You must have a minimum of **Update** permission to the collection model object that you are adding members to.  
  
-   A collection must exist. For more information, see [Create a Collection (Master Data Services)](create-a-collection-master-data-services.md).  
  
### To add members to a collection  
  
1.  On the  Master Data Manager 
 home page, from the **Model** list, select a model.  
  
2.  From the **Version** list, select a version.  
  
3.  Click **Explorer**.  
  
4.  From the menu bar, point to **Collections** and click *entity_name*.  
  
5.  In the grid, click the row for the collection you want to add members to.  
  
6.  Click the **Collection Members** tab.  
  
7.  Click **Edit Members**.  
  
8.  To filter the list of available members, select from the list on the left.  
  
9. Click the row with the member you want to add and click **Add**.  
  
10. Optionally, rearrange collection members by clicking **Up** or **Down**.  
  
11. Optionally, set weight values by clicking the value in the **Weight** column.  
  
## Related content

- [Collections (Master Data Services)](collections-master-data-services.md)
