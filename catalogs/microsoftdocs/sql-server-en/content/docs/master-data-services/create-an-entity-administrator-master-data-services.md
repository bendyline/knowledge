---
title: Create an Entity Administrator
description: Create an Entity Administrator (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Create an Entity Administrator (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, create an entity administrator when you want a group or user to have all permissions to all objects in one or more entities, or have the permission to approve pending change sets.  
  
> **Tip:**  
>  To simplify administration, create a Windows or local group and configure it as an entity administrator. You can then add and remove users from the group without accessing  Master Data Services 
.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **User and Group Permissions** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
## To create an Entity Administrator  
  
1.  In  Master Data Manager 
, click **User and Group Permissions**.  
  
2.  Select the row for the user or group that you want to edit, and then click **Edit selected user**.  
  
3.  Click the **Models** tab, optionally select a model from the **Models** list and then click **Edit**.  
  
4.  Click the entity you want to grant permissions to, and then click **Admin** on the menu.  
  
5.  Complete step 4 for each entity that you want the group or user to be an administrator for.  
  
6.  Click **Save**.  
  
## Related content

- [Administrators (Master Data Services)](administrators-master-data-services.md)
- [Assign Model Object Permissions (Master Data Services)](assign-model-object-permissions-master-data-services.md)
- [Assign Hierarchy Member Permissions (Master Data Services)](assign-hierarchy-member-permissions-master-data-services.md)
- [Model Object Permissions (Master Data Services)](model-object-permissions-master-data-services.md)
- [Hierarchy Member Permissions (Master Data Services)](hierarchy-member-permissions-master-data-services.md)
