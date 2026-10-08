---
title: Automatically Generate Code Attribute Values
description: Automatically Generate Code Attribute Values (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Automatically Generate Code Attribute Values (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, automatically generate values for an entity's Code attribute when you want an integer to be automatically assigned to the Code value each time a new member is created.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   The entity must exist. For more information, see [Create an Entity (Master Data Services)](create-an-entity-master-data-services.md).  
  
### To automatically generate Code values  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Manage Model** page, select the row for the model that contains the entity that you want to edit and then click **Entities**.  
  
3.  On the **Manage Entity** page, select the row for the entity that you want to generate codes for and then click **Edit**.  
  
4.  Select the **Create Code values automatically** check box.  
  
5.  In the **Start with** box, type a number to begin incrementing. If members already exist, the Code will be set based on the highest existing value. For example, if the highest existing Code value is 299, the next member's Code value will be set to 300.  
  
6.  Click **Save**.  
  
## Related content

- [Automatic Code Creation (Master Data Services)](automatic-code-creation-master-data-services.md)
- [Automatically Generate Attribute Values Other Than Code (Master Data Services)](automatically-generate-attribute-values-other-than-code-master-data-services.md)
