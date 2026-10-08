---
title: Administrators
description: "Learn about the types of administrators in Master Data Services: model administrators, entity administrators, and super user."
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "administrators [Master Data Services], about administrators"
  - "administrators [Master Data Services]"
  - "models [Master Data Services], administrators"
---
# Administrators (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  This article describes the types of administrators in  Master Data Services 
: model administrators, entity administrators, and super user.  
  
## Model Administrators  
 In  Master Data Services 
, a model administrator is a user who has **Admin** permission assigned to the top-level model object on the **Model Objects** tab. When a user has Admin permission on a particular model, any other permissions on the model's child objects (both model object and member permissions) are trumped by the model **Admin** permission and effectively ignored.  
  
-   If the user has access to the **Explorer** functional area, the user can add, delete, and update all master data in this area.  
  
-   If the user has access to other functional areas, the user can perform all administrative tasks available in the functional area.  
  
 Each model can have multiple administrators. Each user can be a model administrator for one, several, or all models in the  Master Data Services 
 deployment.  
  
 A user can be configured as a model administrator either in  Master Data Manager 
 or programmatically. For more information, see [Create a Model Administrator (Master Data Services)](create-a-model-administrator-master-data-services.md).  
  
## Entity Administrators  
 In  Master Data Services 
, an entity administrator is a user who has administrator permissions assigned to the entity object on the Model Objects tab. When a user has administrator permissions for an entity, any other permissions on the entity's child objects (both model object and member permissions) are superseded by the administrator permissions and are ignored.  
  
-   If the user has access to the **Explorer** functional area, the user can add, delete, and update all master data in this area.  
  
-   If the entity changes require administrator approval, an entity administrator can review and then approve or reject change sets.  
  
 Each entity can have multiple administrators. Each user can be a entity administrator for one, several, or all entities.  
  
 A user can be configured as an entity administrator either in  Master Data Services 
 or programmatically. For more information, see [Create an Entity Administrator (Master Data Services)](create-an-entity-administrator-master-data-services.md).  
  
## Master Data Services Super User  
 In  Master Data Services 
, you can assign a user permissions to the Super User functional area. A user with permissions to the Super User functional area effectively has Admin permission on all models and has permissions for all the other functional areas. For information on the permissions for the functional areas, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md).  
  
 The default super user is specified for the **Administrator Account** when you create the  Master Data Services 
 database by using the [Create Database Wizard (Master Data Services Configuration Manager)](create-database-wizard-master-data-services-configuration-manager.md).  
  
 The super user can do the following:  
  
-   Access all functional areas.  
  
-   Add, delete, and update all master data for all models in the **Explorer** functional area.  
  
 You can assign Super User permissions to multiple users and/or user groups.  
  
## Comparing Administrator Types  
  
| Administrator Type | Description |
| --- | --- |
| Master Data Services |
 | Super User | Permissions assigned in  Master Data Manager |
 | have no effect on the administrator's access.<br /><br /> Can be a super user based on functional area permissions assigned explicitly or permissions inherited from a group.<br /><br /> Automatically has all permissions to all models.<br /><br /> Automatically has access to all functional areas. |
| Model administrator | Can be a model administrator based on admin permissions assigned explicitly or permissions inherited from a group.<br /><br /> Has access only to functional areas that access is granted to.<br /><br /> Automatically has all permissions to all objects and members in the specific model. |
| Entity administrator | Can be an entity administrator based on administrator permissions assigned explicitly or permissions inherited from a group.<br /><br /> Has access only to functional areas that access is granted to.<br /><br /> Automatically has all permissions to all objects and members in the specific entity.<br /><br /> Can approve the pending change sets if the entity changes require approval. |
  
## Related content

- [Security Improvements](https://learn.microsoft.com/archive/blogs/e7/improvements-to-autoplay)
- [Create a Model Administrator (Master Data Services)](create-a-model-administrator-master-data-services.md)
- [Create a Master Data Services Database](install-windows/create-a-master-data-services-database.md)
- [Notifications (Master Data Services)](notifications-master-data-services.md)
