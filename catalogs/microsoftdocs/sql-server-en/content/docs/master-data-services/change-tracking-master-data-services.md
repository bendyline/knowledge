---
title: Change Tracking
description: Change Tracking (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "change tracking [SQL Server]"
---
# Change Tracking (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, you can use change tracking groups to take action when an attribute value changes. Use change tracking when you don't know what the new value will be, but instead want to know if any change occurred.  
  
## Configuring Change Tracking  
 To configure change tracking, you add an attribute to a change tracking group. The group can contain one or many attributes. Then, you create a business rule to define the action that is taken when any of the attributes in the group change.  
  
> **Note:**  
>  Change tracking business rules consider staged (imported) data to be changed.  
  
## Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Add attributes to a change tracking group. | [Add Attributes to a Change Tracking Group (Master Data Services)](add-attributes-to-a-change-tracking-group-master-data-services.md) |
| Create a business rule that initiates actions based on attribute changes. | [Initiate Actions Based on Attribute Value Changes (Master Data Services)](initiate-actions-based-on-attribute-value-changes-master-data-services.md) |
  
## Related content

- [Validation (Master Data Services)](validation-master-data-services.md)
- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
- [Attributes (Master Data Services)](attributes-master-data-services.md)
