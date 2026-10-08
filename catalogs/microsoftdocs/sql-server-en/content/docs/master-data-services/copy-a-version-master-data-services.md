---
title: Copy a Version
description: Copy a Version (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "versions [Master Data Services], copying"
  - "copying versions [Master Data Services]"
---
# Copy a Version (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, copy a version of the model to create a new version of it.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Version Management** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   You must have permission to access the Version Management functional area. For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md).  
  
### To copy a version  
  
1.  In  Master Data Manager 
, click **Version Management**.  
  
2.  On the **Manage Versions** page, select the row for the version that you want to copy.  
  
    > **Note:**  
    >  Depending on a setting in  Master Data Services Configuration Manager 
, you might be able to copy versions with the **Committed** status only. For more information, see [System Settings (Master Data Services)](system-settings-master-data-services.md).  
  
3.  Click **Copy**.  
  
4.  In the confirmation dialog box, click **OK**.  
  
## Related content

- [Versions (Master Data Services)](versions-master-data-services.md)
- [Change a Version Name (Master Data Services)](change-a-version-name-master-data-services.md)
