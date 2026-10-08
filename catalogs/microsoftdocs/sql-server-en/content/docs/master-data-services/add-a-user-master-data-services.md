---
title: Add a User
description: Learn how to add a user to the Users list in Master Data Manager. You must add a user to begin the process of assigning permission to the web application.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
helpviewer_keywords:
  - "users [Master Data Services], adding"
  - "adding users [Master Data Services]"
  - "build-2025"
---

# Add a User (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Add a user to the **Users** list in  Master Data Manager 
 to begin the process of assigning permission to the Web application. Before a user in the list can access  Master Data Manager 
, you must give the user permission to one or more functional areas and model objects.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Users and Group Permissions** functional area.  
  
### To add a user  
  
1.  In  Master Data Manager 
, click **User and Group Permissions**.  
  
2.  On the **Users** page, click **Add users**.  
  
3.  Type the user's name preceded by the Active Directory domain name or by the server computer's name, as in *domain*\\*user_name* or *computer\user_name*.  
  
4.  Optionally, click **Check names**.  
  
5.  Click **OK**.  
  
## Related content

- [Security (Master Data Services)](security-master-data-services.md)
- [Assign Functional Area Permissions (Master Data Services)](assign-functional-area-permissions-master-data-services.md)
