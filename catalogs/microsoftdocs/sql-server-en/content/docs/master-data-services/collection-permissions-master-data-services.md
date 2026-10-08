---
title: Collection Permissions
description: Collection Permissions (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "collections [Master Data Services], permissions"
  - "permissions [Master Data Services], collections"
---
# Collection Permissions (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Collection permissions apply to all collections for an entity. You cannot give permission to a specific collection; permissions apply to all collections.  
  
> **Note:**  
>  These permissions apply to the **Explorer** functional area of the user interface only.  
  
| Permission | Description |
| --- | --- |
| **Read** | User can read collection members and the member attributes. |
| **Create** | User can create collection members and assign attribute values. |
| **Update** | User can update collection members, attributes and relationships. |
| **Delete** | User can delete collection members. |
| **Deny** | Deny all access to the collection members. |
  
 The Read, Create, Update, and Delete permissions can be combined. When Create, Update and Delete are assigned, the read permission is assigned automatically.  
  
## Related content

- [Assign Model Object Permissions (Master Data Services)](assign-model-object-permissions-master-data-services.md)
- [Collections (Master Data Services)](collections-master-data-services.md)
- [Model Object Permissions (Master Data Services)](model-object-permissions-master-data-services.md)
