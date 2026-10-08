---
title: Purge Version Members
description: Purge Version Members (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Purge Version Members (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, deleting a member only deactivates, or soft-deletes, it. The  data still resides in the database. This topic describes how to purge (permanently delete) all soft-deleted members in a model version.  
  
## Prerequisites  
 To perform this procedure.  
  
-   You must have permission to access the Version Management functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
## To purge soft-deleted members  
  
1.  In  Master Data Manager 
, click **Version Management**.  
  
2.  On the **Manage Versions** page, select the model that has the version that you want to purge. The list of model versions is displayed.  
  
3.  Select the row for the version that you want to purge.  
  
4.  Click **Purge Members**.  
  
5.  Click "OK" on the confirmation prompt.  
  
## Additional Methods to Purge Members  
 Purging version members permanently delete soft-deleted members in all entities pertaining to the selected version. A more finely grained alternative is to use entity base staging to permanently delete only specific members of an entity. Also, entity administrators with Explorer functional permission may purge an entity version in the entity explorer page.  
  
 For more information, see [Leaf Member Staging Table (Master Data Services)](leaf-member-staging-table-master-data-services.md)
