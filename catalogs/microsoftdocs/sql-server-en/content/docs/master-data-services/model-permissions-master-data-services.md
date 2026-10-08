---
title: Model Permissions
description: Model Permissions (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "models [Master Data Services], permissions"
  - "permissions [Master Data Services], models"
---
# Model Permissions (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Model permissions apply to all entities, derived hierarchies, explicit hierarchies, and collections that exist within the model. Permissions assigned to the model can be overridden for any individual object.  
  
> **Note:**  
>  If a user is a model administrator, the model is displayed in all functional areas of the user interface. Otherwise, the model is displayed in the **Explorer** functional area only. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
| Permission | Description |
| --- | --- |
| **Read** | User can read members, attributes, hierarchy memberships, or collection memberships. |
| **Create** | User can create members, and assign attribute values during create. |
| **Update** | User can update members, attributes, hierarchy memberships, or collection memberships. |
| **Delete** | User can delete members |
| **Deny** | Deny all access to the model |
| **Admin** | Administrator permission on the model. Admin permission is only available at the model level. |
  
 The Read, Create, Update, and Delete permissions can be combined with each other. When Create, Update and Delete permissions are assigned, the read permission will be assigned automatically.  
  
## Related content

- [Assign Model Object Permissions (Master Data Services)](assign-model-object-permissions-master-data-services.md)
- [Model Object Permissions (Master Data Services)](model-object-permissions-master-data-services.md)
- [Entity Permissions (Master Data Services)](entity-permissions-master-data-services.md)
- [Collection Permissions (Master Data Services)](collection-permissions-master-data-services.md)
