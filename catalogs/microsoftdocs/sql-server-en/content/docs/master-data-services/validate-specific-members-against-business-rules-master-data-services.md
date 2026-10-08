---
title: Validate Specific Members Against Business Rules
description: Validate Specific Members against Business Rules (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "applying business rules [Master Data Services]"
  - "business rules [Master Data Services], applying to select members"
---
# Validate Specific Members against Business Rules (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, apply business rules selectively when you want to update or validate subsets of members against business rules.  
  
> **Note:**  
>  If you want to apply business rules to all members in a version of a model, see [Validate a Version against Business Rules (Master Data Services)](validate-a-version-against-business-rules-master-data-services.md).  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Explorer** functional area.  
  
-   You must have a minimum of **Update** permission to the model object you are applying business rules to.  
  
### To apply business rules selectively  
  
1.  On the  Master Data Manager 
 home page, from the **Model** dropdown list, select a model.  
  
2.  From the **Version** dropdown list, select a version.  
  
3.  Click **Explorer** tab.  
  
4.  From the menu bar, point to **Entities** and click the name of the entity that contains members you want to apply rules to.  
  
5.  Click **Apply Rules**. Business rules are applied only to the members displayed in the grid.  
  
## Related content

- [Validate a Version against Business Rules (Master Data Services)](validate-a-version-against-business-rules-master-data-services.md)
- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
