---
title: Assign Model Object Permissions
description: Assign Model Object Permissions (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "models [Master Data Services], assigning object permissions"
  - "permissions [Master Data Services], assigning model object permissions"
---
# Assign Model Object Permissions (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, assign permissions to model objects when you need to give a user or group access to data in the **Explorer** functional area of  Master Data Manager 
, or when you need to make a user or group an administrator.  
  
> **Note:**  
>  When you assign permission to a model, permission to all other models is implicitly denied. If you do not assign model object permissions, the user or group cannot access any data in **Explorer**.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Users and Group Permissions** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To assign model object permissions  
  
1.  In  Master Data Manager 
, click **User and Group Permissions**.  
  
2.  On the **Users** or **Groups** page, select the row for the user or group that you want to edit.  
  
3.  Click **Edit selected user**.  
  
4.  Click the **Models** tab.  
  
5.  Optionally, select a model from the **Model** list.  
  
6.  Click **Edit**.  
  
7.  Expand the tree, and click the model object you want to assign permissions to.  
  
8.  From the menu, select a combination of Read, Create, Update and Delete, or Deny.  
  
9. On the top model level, select **Admin** if you need to make a user model administrator.  
  
10. Click **Save**.  
  
## Related content

- [Delete Model Object Permissions (Master Data Services)](delete-model-object-permissions-master-data-services.md)
- [Model Object Permissions (Master Data Services)](model-object-permissions-master-data-services.md)
- [Create a Model Administrator (Master Data Services)](create-a-model-administrator-master-data-services.md)
- [Assign Hierarchy Member Permissions (Master Data Services)](assign-hierarchy-member-permissions-master-data-services.md)
