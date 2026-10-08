---
title: Exclude a Business Rule
description: Exclude a Business Rule (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "business rules [Master Data Services], excluding"
---
# Exclude a Business Rule (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, exclude a business rule when you do not want to delete the rule permanently, but you do not want to validate data against it.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To exclude a business rule  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  From the menu bar, point to **Manage** and click **Business Rules**.  
  
3.  On the **Business Rules** page, from the **Model** dropdown list, select a model.  
  
4.  From the **Entity** dropdown list, select an entity.  
  
5.  From the **Member Types** dropdown list, select a type of member.  
  
6.  In the grid, select the row for the business rule you want to exclude and click **Edit**.  
  
7.  Mark the **Excluded** check-box.  
  
8.  Click **Save**.  
  
9. Click **Publish All**.  
  
10. In the confirmation dialog box, click **OK**. The value in the **Business Rule Status** column is **Excluded** and the **Excluded** column is **Yes**.  
  
## Related content

- [Delete a Business Rule (Master Data Services)](delete-a-business-rule-master-data-services.md)
- [Create and Publish a Business Rule (Master Data Services)](create-and-publish-a-business-rule-master-data-services.md)
- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
