---
title: Attribute Groups
description: Attribute Groups (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "attribute groups [Master Data Services]"
  - "attribute groups [Master Data Services], about attribute groups"
---
# Attribute Groups (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, attribute groups help organize attributes in an entity. When an entity has lots of attributes, attribute groups improve the way an entity is displayed in the  Master Data Manager 
 web application.  
  
## How Attribute Groups Change the Display  
 Attribute groups are displayed as tabs above the grid in the **Explorer** functional area of  Master Data Manager 
.  
  
 When an entity has a large number of attributes and you view that entity in a grid in **Explorer**, you must scroll to the right to view all of the attributes. To prevent this scrolling, you can create attribute groups.  
  
-   Attribute groups always include the Name and Code attributes.  
  
-   Each attribute for an entity can belong to one or more attribute groups.  
  
-   All attributes are automatically included on the **All Attributes** tab in **Explorer**.  
  
-   There is no way to hide the **All Attributes** tab.  
  
 Attribute groups are administered in the **System Administration** functional area of  Master Data Manager 
.  
  
## Show or Hide Attribute Groups  
 When you create an attribute group, it is automatically hidden from all users except the one who created it. For more information about making the group visible, see [Make an Attribute Group Visible to Users (Master Data Services)](make-an-attribute-group-visible-to-users-master-data-services.md).  
  
 If you want to hide a specific attribute within a group, you can assign **Deny** permission to the attribute. For more information, see [Leaf Permissions (Master Data Services)](leaf-permissions-master-data-services.md).  
  
## Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Create a new attribute group and add attributes to it. | [Create an Attribute Group (Master Data Services)](create-an-attribute-group-master-data-services.md) |
| Make an attribute group visible to users. | [Make an Attribute Group Visible to Users (Master Data Services)](make-an-attribute-group-visible-to-users-master-data-services.md) |
| Change the name of an existing attribute group. | [Change an Attribute Group Name (Master Data Services)](change-an-attribute-group-name-master-data-services.md) |
| Delete an existing attribute group. | [Delete an Attribute Group (Master Data Services)](delete-an-attribute-group-master-data-services.md) |
  
## Related content

- [Attributes (Master Data Services)](attributes-master-data-services.md)
