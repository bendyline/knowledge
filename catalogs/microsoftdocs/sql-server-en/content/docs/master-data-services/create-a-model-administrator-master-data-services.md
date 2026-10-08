---
title: Create a Model Administrator
description: Create a Model Administrator (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "administrators [Master Data Services], creating"
---
# Create a Model Administrator (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, create a model administrator when you want a group or user to have all permissions to all objects in one or more models.  
  
> **Tip:**  
>  To simplify administration, create a Windows or local group and configure it as a model administrator. You can then add and remove users from the group without accessing  Master Data Manager 
.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **User and Group Permissions** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To create a model administrator  
  
1.  In  Master Data Manager 
, click **User and Group Permissions**.  
  
2.  On the **Users** or **Groups** page, select the row for the user or group that you want to edit.  
  
3.  Click **Edit selected user**.  
  
4.  Click the **Models** tab.  
  
5.  Optionally, select a model from the **Model** list.  
  
6.  Click **Edit**.  
  
7.  Click the model you want to grant permission to.  
  
8.  From the menu, select **Admin**.  
  
9. Complete steps 7 and 8 for each model you want the group or user to be an administrator for.  
  
10. Click **Save**.  
  
## Related content

- [Administrators (Master Data Services)](administrators-master-data-services.md)
- [Assign Model Object Permissions (Master Data Services)](assign-model-object-permissions-master-data-services.md)
- [Assign Hierarchy Member Permissions (Master Data Services)](assign-hierarchy-member-permissions-master-data-services.md)
- [Model Object Permissions (Master Data Services)](model-object-permissions-master-data-services.md)
- [Hierarchy Member Permissions (Master Data Services)](hierarchy-member-permissions-master-data-services.md)
