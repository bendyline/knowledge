---
title: Delete a Business Rule
description: Delete a Business Rule (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "deleting business rules [Master Data Services]"
  - "business rules [Master Data Services], deleting"
---
# Delete a Business Rule (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, delete a business rule when it is no longer needed.  
  
> **Note:**  
>  You can prevent data from being validated against a business rule by excluding it, rather than deleting it. For more information, see [Exclude a Business Rule (Master Data Services)](exclude-a-business-rule-master-data-services.md).  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To delete a business rule  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  From the menu bar, point to **Manage** and click **Business Rules**.  
  
3.  On the **Business Rules** page, from the **Model** dropdown list, select a model.  
  
4.  From the **Entity** dropdown list, select an entity.  
  
5.  From the **Member Types** dropdown list, select a type of member for the business rule to apply to.  
  
6.  In the grid, click the row for the business rule you want to delete.  
  
7.  Click **Delete**.  
  
8.  In the confirmation dialog box, click **OK**. The value in the **Business Rule State** column is **Deletion pending**.  
  
9. Click **Publish All**.  
  
10. In the confirmation dialog box, click **OK**. The deleted business rule is no longer displayed in the grid.  
  
## Related content

- [Exclude a Business Rule (Master Data Services)](exclude-a-business-rule-master-data-services.md)
- [Create and Publish a Business Rule (Master Data Services)](create-and-publish-a-business-rule-master-data-services.md)
- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
