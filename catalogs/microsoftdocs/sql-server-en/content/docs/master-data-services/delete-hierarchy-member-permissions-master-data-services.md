---
title: Delete Hierarchy Member Permissions
description: Delete Hierarchy Member Permissions (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "deleting member permissions [Master Data Services]"
  - "members [Master Data Services], deleting permissions"
  - "permissions [Master Data Services], deleting member permissions"
---
# Delete Hierarchy Member Permissions (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, delete model object permissions to remove any assignments that have been made.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Users and Group Permissions** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To delete hierarchy member permissions  
  
1.  In  Master Data Manager 
, click **User and Group Permissions**.  
  
2.  On the **Users** or **Groups** page, select the row for the user or group that you want to edit.  
  
3.  Click **Edit selected user**.  
  
4.  Click the **Hierarchy Members** tab.  
  
5.  From the **Model** list, select a model.  
  
6.  From the **Version** list, select a version.  
  
7.  Click **Edit**.  
  
8.  Find the tree node with the permission, in the **Hierarchy Member Permissions** panel.  
  
9. Click the tree node, and click **None** in the context menu.  
  
    > **Note:**  
    >  You cannot remove a permission from a user if the permission is inherited from a group. You must remove the permission from the group instead.  
  
10. Click **Save**.  
  
## Related content

- [Hierarchy Member Permissions (Master Data Services)](hierarchy-member-permissions-master-data-services.md)
- [Assign Hierarchy Member Permissions (Master Data Services)](assign-hierarchy-member-permissions-master-data-services.md)
