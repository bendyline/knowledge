---
title: Add a Group
description: Add a Group (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "groups [Master Data Services], adding"
  - "adding groups [Master Data Services]"
---
# Add a Group (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Add a group to the **Groups** list in  Master Data Manager 
 to begin the process of assigning permission to the Web application. Before a user in the group can access  Master Data Manager 
, you must give the group permission to one or more functional areas and model objects.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Users and Group Permissions** functional area.  
  
### To add a group  
  
1.  In  Master Data Manager 
, click **User and Group Permissions**.  
  
2.  On the **Users** page, from the menu bar, click **Manage Groups**.  
  
3.  Click **Add groups**.  
  
4.  Type the group's name preceded by the Active Directory domain name or by the server computer's name, as in *domain\group_name* or *computer\group_name*.  
  
5.  Optionally, click **Check names**.  
  
6.  Click **OK**.  
  
    > **Note:**  
    >  When the user first accesses  Master Data Manager 
, the user's name is added to the  Master Data Manager 
 list of users.  
  
## Related content

- [Security (Master Data Services)](security-master-data-services.md)
- [Assign Functional Area Permissions (Master Data Services)](assign-functional-area-permissions-master-data-services.md)
