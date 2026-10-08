---
title: Reserved Words
description: Reserved Words (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "reserved words [Master Data Services]"
  - "Master Data Services, reserved words"
---
# Reserved Words (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, when you create model objects or members, some words cannot be used. Using these words may cause errors.  
  
> **Note:**  
>  You should also limit your use of special characters (symbols, hyphenation, etc.).  
  
- [Models](#models)  
  
- [Entities](#entities)  
  
- [Explicit Hierarchies](#explicit-hierarchies)  
  
- [Attributes](#attributes)  
  
- [Members](#members)  
  
## Models

 If you create a model with the name set to **Name** or **Code**, do not select **Create entity with same name as model** because **Name** or **Code** cannot be used for the name of an entity.  
  
## Entities

 For entity names, you cannot use **Name** or **Code**.  
  
## Explicit hierarchies

 For explicit hierarchy names, you cannot use **Name** or **Code**.  
  
## Attributes
  
-   **ID**  
  
-   **Code**  
  
-   **EnterUserName**  
  
-   **LastChgUserName**  
  
-   **Name**  
  
-   **EnterDTM**  
  
-   **EnterUserID**  
  
-   **EnterUserName**  
  
-   **LastChgDTM**  
  
-   **LastChgUserID**  
  
-   **Status_ID**  
  
-   **ValidationStatus_ID**  
  
-   **Version_ID**  
  
## Members

 For members, you cannot use **MDMMemberStatus**, **MDMUnused**, or **ROOT** for the **Code** attribute value.  
  
## Related content

- [Master Data Services Overview (MDS)](master-data-services-overview-mds.md)
