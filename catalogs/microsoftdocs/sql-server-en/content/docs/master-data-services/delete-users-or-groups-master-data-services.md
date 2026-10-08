---
title: Delete Users or Groups
description: Delete Users or Groups (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "deleting groups [Master Data Services]"
  - "groups [Master Data Services], deleting"
  - "users [Master Data Services], deleting"
  - "deleting users [Master Data Services]"
---
# Delete Users or Groups (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Delete users or groups when you no longer want them to access  Master Data Manager 
.  
  
 Note the following behavior when deleting users and groups:  
  
-   If you delete a user who is a member of a group that has access to  Master Data Manager 
, then the user can still access  Master Data Manager 
 until you remove the user from the Active Directory or local group.  
  
-   If you delete a group, all users from the group who have accessed  Master Data Manager 
 are displayed in the **Users** list until you delete them.  
  
-   Changes to security are not propagated to the MDS  Add-in for Excel 
 for 20 minutes.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Users and Group Permissions** functional area.  
  
### To delete users or groups  
  
1.  In  Master Data Manager 
, click **User and Group Permissions**.  
  
2.  To delete a user, remain on the **Users** page. To delete a group, from the menu bar, click **ManageGroups.**  
  
3.  In the grid,select the row for the user or group that you want to delete.  
  
4.  Click **Delete selected user** or **Delete selected group**.  
  
5.  On the confirmation dialog box, click **OK**.  
  
## Related content

- [Security (Master Data Services)](security-master-data-services.md)
