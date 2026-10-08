---
title: Create a Version Flag
description: Create a Version Flag (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "creating version flags [Master Data Services]"
  - "version flags [Master Data Services], creating"
  - "versions [Master Data Services], creating flags"
---
# Create a Version Flag (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, create a version flag to assign to a version. The flag can indicate the version that users or subscribing systems should use.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Version Management** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   You must have permission to access the Version Management functional area. For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md).  
  
### To create a version flag  
  
1.  In  Master Data Manager 
, click **Version Management**.  
  
2.  On the **Manage Versions** page, from the menu bar, point to **Manage** and then click **Flags**.  
  
3.  On the **Manage Version Flags** page, from the **Model** field, select the model for which you want to create a flag.  
  
4.  Click **Add**.  
  
5.  In the **Name** box, type a name.  
  
6.  In the **Description** box, type a description.  
  
7.  In the **Committed Versions Only** field, select **True** to indicate that the flag can be assigned to versions with a status of **Committed** only. Select **False** to indicate that the flag can be assigned to versions with any status.  
  
8.  Click **Save**.  
  
## Related content

- [Versions (Master Data Services)](versions-master-data-services.md)
- [Change a Version Flag Name (Master Data Services)](change-a-version-flag-name-master-data-services.md)
- [Assign a Flag to a Version (Master Data Services)](assign-a-flag-to-a-version-master-data-services.md)
