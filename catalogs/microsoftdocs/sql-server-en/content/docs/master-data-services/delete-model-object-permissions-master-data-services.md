---
title: Delete Model Object Permissions
description: Delete Model Object Permissions (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "deleting model object permissions [Master Data Services]"
  - "permissions [Master Data Services], deleting model object permissions"
  - "models [Master Data Services], deleting object permissions"
---
# Delete Model Object Permissions (Master Data Services)


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
  
### To delete model object permissions  
  
1.  In  Master Data Manager 
, click **User and Group Permissions**.  
  
2.  On the **Users** or **Groups** page, select the row for the user or group that you want to edit.  
  
3.  Click **Edit selected user**.  
  
4.  Click the **Models** tab.  
  
5.  Optionally, select a model from the **Model** list.  
  
6.  Click **Edit**.  
  
7.  In the **Model Permissions Summary** area, select the row for the permission that you want to delete.  
  
     The tree node of the permission is located and highlighted.  
  
8.  Click the tree node, and in the context menu click **Clear Access**.  
  
9. Click **Save**.  
  
## Related content

- [Model Object Permissions (Master Data Services)](model-object-permissions-master-data-services.md)
- [Assign Model Object Permissions (Master Data Services)](assign-model-object-permissions-master-data-services.md)
