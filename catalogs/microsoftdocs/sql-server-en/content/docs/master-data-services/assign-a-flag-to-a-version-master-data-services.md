---
title: Assign a Flag to a Version
description: Assign a Flag to a Version (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "version flags [Master Data Services], assigning flags"
  - "versions [Master Data Services], assigning flags"
---
# Assign a Flag to a Version (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, assign a flag to a version to indicate the version that users or subscribing systems should use.  
  
> **Note:**  
>  Version flags can be assigned to only one version at a time. If you assign a flag that is already assigned to another version, the flag is moved to the version you selected.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Version Management** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   You must have created a version flag to assign. For more information, see [Create a Version Flag (Master Data Services)](create-a-version-flag-master-data-services.md).  
  
-   You must have permission to access the Version Management functional area. For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md).  
  
### To assign a flag to a version  
  
1.  In  Master Data Manager 
, click **Version Management**.  
  
2.  On the **Manage Versions** page, in the row for the version to which you want to assign a flag, double-click the cell in the **Flag** column.  
  
3.  From the list, select the flag you want to assign.  
  
    > **Note:**  
    >  If the flag you want is not available, the flag might be available for **Committed** versions only. To confirm, go to the **Manage Version Flags** page and view the **Committed Versions Only** field for the flag.  
  
4.  Press ENTER to save the change.  
  
## Related content

- [Create a Version Flag (Master Data Services)](create-a-version-flag-master-data-services.md)
- [Versions (Master Data Services)](versions-master-data-services.md)
