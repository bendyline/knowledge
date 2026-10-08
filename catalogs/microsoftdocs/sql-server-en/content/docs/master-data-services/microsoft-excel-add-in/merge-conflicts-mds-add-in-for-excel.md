---
title: Merge Conflicts
description: Merge Conflicts (MDS Add-in for Excel)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - microsoft-excel-add-in
  - build-2025
---
# Merge Conflicts (MDS Add-in for Excel)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the  Master Data Services 
 Add-in for Excel, if data has been changed on the server by another user, the publish will fail with a conflict error. To resolve this error, you can perform merge conflicts and republish the changes.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Explorer** functional area.  
  
-   You must have a minimum of Update permission to the leaf model object for the entity you are updating.  
  
-   The active worksheet must have MDS-managed data.  
  
-   The active worksheet must have a conflict error after you tried to publish your changes.  
  
### To merge conflicts  
  
1.  In the worksheet, select the row or cell that has the conflict error.  
  
2.  In the **Publish and Validate** menu group, select **Merge Conflicts** to open the **Merge Conflicts** dialog.  
  
3.  In the **Merge Conflicts** dialog, you can either:  
  
    -   Choose **Latest** and click **Apply** to undo the pending changes and reload the latest version from the server.  
  
    -   Choose **Original** and click **Apply** to apply the original version in the worksheet.  
  
    -   Choose **Yours** and click **Apply** to keep the existing local changes.  
  
4.  After you click **Apply**, you can make additional changes and publish again. Or you can click **Cancel** to cancel the update and reload the latest version from the server.  
  
## Related content

- [Overview: Importing Data from Excel (MDS Add-in for Excel)](overview-importing-data-from-excel-mds-add-in-for-excel.md)
