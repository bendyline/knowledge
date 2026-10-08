---
title: Delete a Member or Collection
description: Delete a Member or Collection (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "collections [Master Data Services], deleting"
  - "leaf members [Master Data Services], deleting"
  - "deleting members [Master Data Services]"
  - "members [Master Data Services], deleting"
  - "consolidated members [Master Data Services], deleting"
---
# Delete a Member or Collection (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Manager 
, delete a member or collection when you no longer need it. If you want to delete members in bulk, use the staging tables instead. For more information, see [Import Data from Tables (Master Data Services)](import-data-from-tables-master-data-services.md)  
  
> **Note:**  
>  You cannot delete a member if it is used as a domain-based attribute value for another member.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Explorer** functional area.  
  
-   For members, you must have a minimum of **Delete** permission to the leaf model object you are deleting a member from.  
  
-   For collections, you must have a minimum of **Update** permission to the leaf collection object you are deleting.  
  
### To delete a member or collection  
  
1.  On the  Master Data Manager 
 home page, from the **Model** list, select a model.  
  
2.  From the **Version** list, select a version.  
  
3.  Click **Explorer**.  
  
4.  To delete:  
  
    -   A leaf member, from the menu bar, point to **Entities** and click the name of the entity that contains the member.  
  
    -   A consolidated member, from the menu bar, point to **Hierarchies** and click the name of the hierarchy that contains the member. Then click the node in the hierarchy that contains the member.  
  
    -   A collection, from the menu bar, point to **Collections** and click the name of the entity that contains the collection.  
  
5.  In the grid, click the row of the member or collection you want to delete.  
  
6.  Click **Delete Member**, **Delete**, or **Delete Collection**.  
  
7.  Entity Administrators will also see a menu option to Purge (hard-delete) all soft-deleted members in the entity version.  
  
8.  In the confirmation dialog box, click **OK**.  
  
## Related content

- [Reactivate a Member or Collection (Master Data Services)](reactivate-a-member-or-collection-master-data-services.md)
- [Members (Master Data Services)](members-master-data-services.md)
- [Collections (Master Data Services)](collections-master-data-services.md)
