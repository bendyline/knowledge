---
title: Users and Groups
description: Find out how to grant access to the Master Data Manager web application. A user must have a suitable account.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: best-practice
ms.custom:
  - build-2025
helpviewer_keywords:
  - "users [Master Data Services]"
  - "groups [Master Data Services]"
  - "users [Master Data Services], about users"
  - "groups [Master Data Services], about groups"
---
# Users and Groups (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  To access the  Master Data Manager 
 web application a user must have a Windows domain account or an account on the server computer where  Master Data Services 
 is installed. To grant access to  Master Data Manager 
 you can either:  
  
-   Add the user account to a domain or local group and then add the group to the list of groups in  Master Data Manager 
.  
  
-   Add the user account to the list of users in  Master Data Manager 
.  
  
    > **Note:**  
    >  When a user belongs to a group that has access to  Master Data Manager 
, the user's name is automatically added to the list of users the first time the user accesses  Master Data Manager 
 or the MDS  Add-in for Excel 
.  
  
 To take action within the **Explorer** functional area of the UI, the group or user must be assigned access to the **Explorer** functional area and assigned permission to model objects.  
  
 If a user or group needs access to other functional areas, the user or group must be assigned access to the specific functional area.  
  
## Best Practice  
 To simplify administration, create groups and assign each group permission to functional areas and model objects. You can then add and remove users from the groups without accessing the  Master Data Manager 
 UI.  
  
 Do not assign additional permissions to an individual user, and do not include a user in multiple groups that have access to  Master Data Manager 
. In addition, do not use hierarchy member permissions unless you want a group to have limited access to specific members.  
  
## Related content

- [Add a User (Master Data Services)](add-a-user-master-data-services.md)
- [Add a Group (Master Data Services)](add-a-group-master-data-services.md)
- [Delete Users or Groups (Master Data Services)](delete-users-or-groups-master-data-services.md)
- [Test a User's Permissions (Master Data Services)](test-a-user-s-permissions-master-data-services.md)
