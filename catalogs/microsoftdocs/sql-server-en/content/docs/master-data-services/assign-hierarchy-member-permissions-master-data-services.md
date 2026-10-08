---
title: Assign Hierarchy Member Permissions
description: Assign Hierarchy Member Permissions (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "permissions [Master Data Services], assigning member permissions"
  - "members [Master Data Services], assigning permissions"
---
# Assign Hierarchy Member Permissions (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Assign permissions to hierarchy members to give users or groups access to view data in the **Explorer** functional area of  Master Data Manager 
.  
  
 Hierarchy member permissions are optional. They provide added granularity to model object permissions, which are required.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Users and Group Permissions** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To assign hierarchy member permissions  
  
1.  In  Master Data Manager 
, click **User and Group Permissions**.  
  
2.  On the **Users** or **Groups** page, select the row for the user or group that you want to edit.  
  
3.  Click **Edit selected user**.  
  
4.  Click the **Hierarchy Members** tab.  
  
5.  From the **Model** list, select a model.  
  
6.  From the **Version** list, select a version.  
  
7.  From the **Hierarchy** list, select a hierarchy.  
  
8.  Click **Edit**.  
  
9. Expand the tree, and click the hierarchy node you want to assign permissions to.  
  
10. From the menu, select a combination of **Create**, **Read,Update** and **Delete** permissions, or **Deny** permissions.  
  
11. Click **Save**.  
  
    > **Note:**  
    >  Hierarchy member permissions do not take effect immediately. See [Immediately Apply Member Permissions (Master Data Services)](immediately-apply-member-permissions-master-data-services.md) for more information.  
  
## Related content

- [Delete Hierarchy Member Permissions (Master Data Services)](delete-hierarchy-member-permissions-master-data-services.md)
- [Assign Model Object Permissions (Master Data Services)](assign-model-object-permissions-master-data-services.md)
- [Hierarchy Member Permissions (Master Data Services)](hierarchy-member-permissions-master-data-services.md)
