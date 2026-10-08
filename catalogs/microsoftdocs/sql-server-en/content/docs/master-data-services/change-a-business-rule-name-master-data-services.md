---
title: Change a Business Rule Name
description: Change a Business Rule Name (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "business rules [Master Data Services], changing name"
---
# Change a Business Rule Name (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, change a business rule name when the name assigned does not meet your business needs.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   A business rule must exist. For more information, see [Create and Publish a Business Rule (Master Data Services)](create-and-publish-a-business-rule-master-data-services.md).  
  
### To change the name of a business rule  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  From the menu bar, point to **Manage** and click **Business Rules**.  
  
3.  On the **Business Rules** page, from the **Model** dropdown list, select a model.  
  
4.  From the **Entity** dropdown list, select an entity.  
  
5.  From the **Member Types** dropdown list, select a type of member.  
  
6.  In the grid, select the row for the business rule you want to change the name and click **Edit**.  
  
7.  Type the new name for the business rule.  
  
8.  Click **Save**.  
  
9. Click **Publish All**.  
  
10. On the confirmation dialog box, click **OK**. The value in the **Business Rule State** column is **Active**.  
  
## Related content

- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
