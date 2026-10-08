---
title: Commit a Version
description: Commit a Version (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "committing versions [Master Data Services]"
  - "versions [Master Data Services], committing"
---
# Commit a Version (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, commit a version of a model to prevent changes to the model's members and their attributes. Committed versions cannot be unlocked.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Version Management** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   The version's status must be **Locked**. For more information, see [Lock a Version (Master Data Services)](lock-a-version-master-data-services.md).  
  
-   All members must have validated successfully.  
  
-   You must have permission to access the Version Management functional area. For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md).  
  
### To commit a version  
  
1.  In  Master Data Manager 
, click **Version Management**.  
  
2.  On the **Manage Versions** page, on the menu bar, click **Validate Version**.  
  
3.  On the **Validate Version** page, select the model and version you want to commit.  
  
4.  Click **Commit**.  
  
5.  In the confirmation dialog box, click **OK**.  
  
## Related content

- [Versions (Master Data Services)](versions-master-data-services.md)
- [Create a Version Flag (Master Data Services)](create-a-version-flag-master-data-services.md)
- [Assign a Flag to a Version (Master Data Services)](assign-a-flag-to-a-version-master-data-services.md)
- [Copy a Version (Master Data Services)](copy-a-version-master-data-services.md)
