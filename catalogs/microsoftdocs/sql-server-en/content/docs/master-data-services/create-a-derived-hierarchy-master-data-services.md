---
title: Create a Derived Hierarchy
description: Create a Derived Hierarchy (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "derived hierarchies, creating"
  - "creating derived hierarchies [Master Data Services]"
---
# Create a Derived Hierarchy (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, create a derived hierarchy when you want a level-based hierarchy that ensures that members exist at the correct level. Derived hierarchies are based on the domain-based attribute relationships that exist in a model.  
  
> **Note:**  
>  If a domain-based attribute value doesn't exist for a member, the member is not included in the derived hierarchy. See [Require Attribute Values (Master Data Services)](require-attribute-values-master-data-services.md) to require a domain-based attribute value for all members.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To create a derived hierarchy  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  From the menu bar, point to **Manage** and click **Derived Hierarchies**.  
  
3.  On the **Derived Hierarchy Maintenance** page, from the **Model** list, select a model.  
  
4.  Click **Add**.  
  
5.  On the **Add Derived Hierarchy** page, in the **Derived hierarchy name** box, type a name for the hierarchy.  
  
    > **Tip:**  
    >  Use a name that describes the levels in the hierarchy, for example **Product to Subcategory to Category**.  
  
6.  Click **Save derived hierarchy**.  
  
7.  On the **Edit Derived Hierarchy** page, in the **Available Entities and Hierarchies** pane, click an entity or hierarchy and drag it to the **Drop Parent Here** in **Current Levels** pane.  
  
8.  Continue dragging entities or hierarchies until your hierarchy is complete.  
  
9. Click **Back**.  
  
## Related content

- [Derived Hierarchies (Master Data Services)](derived-hierarchies-master-data-services.md)
- [Derived Hierarchies with Explicit Caps (Master Data Services)](derived-hierarchies-with-explicit-caps-master-data-services.md)
- [Domain-Based Attributes (Master Data Services)](domain-based-attributes-master-data-services.md)
