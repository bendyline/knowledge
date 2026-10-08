---
title: Manage Changesets
description: Manage Changesets (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Manage Changesets (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
 you can manage all changes by model and version.  
  
## Prerequisites  
  
-   You must have permission to access the **Explorer** functional area. For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md).  
  
-   You must have at least read access to the entity or one of its attributes.  
  
-   If you are an Entity Administrator, you can manage the changesets you created or the changesets that are pending for approval.  
  
-   If you are not an Entity Administrator, you can only manage the changesets you created.  
  
## To manage the changesets  
  
1.  In the  Master Data Manager 
, select the model and version and then click **Explorer**.  
  
2.  Click **Changesets**. All the changesets that you can manage for the selected model and version, are displayed.  
  
3.  Click **Apply** to view the changeset details.  
  
4.  Click **Delete** to delete a changeset. You can only delete a changeset that is not in a pending or approved state.  
  
5.  Click **Add** to add a changeset.  
  
6.  Click **Edit** to edit a changeset.
