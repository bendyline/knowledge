---
title: Reactivate a Member or Collection
description: Reactivate a Member or Collection (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "collections [Master Data Services], reactivating"
  - "consolidated members [Master Data Services], reactivating"
  - "reactivating members [Master Data Services]"
  - "members [Master Data Services], reactivating"
  - "reactivating collections [Master Data Services]"
  - "leaf members [Master Data Services], reactivating"
---
# Reactivate a Member or Collection (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, you can reactivate a member that was either:  
  
-   Deactivated by the staging process.  
  
-   Deleted in the MDS  Add-in for Excel 
.  
  
-   Deleted in the  Master Data Manager 
 web application.  
  
 When you reactivate a member, its attributes and its membership in hierarchies and collections are restored.  
  
 You can also reactivate collections. When you do, the collection's attributes and the members that belong to the collection are restored.  
  
 When either a collection or member is reactivated, all previous transactions are restored.  
  
## Prerequisites  
 To perform this procedure:  
  
-   In  Master Data Manager 
, you must have permission to the **Version Management** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To reactivate a member or collection  
  
1.  On the  Master Data Manager 
 home page, click **Version Management**.  
  
2.  On the menu bar, click **Transactions**.  
  
3.  On the **Transactions** page, from the **Model** list, select a model.  
  
4.  From the **Version** list, select a version.  
  
5.  In the **Transactions** pane, click the row for the member or collection you want to reactivate. This row should have **Active** displayed in the **Prior Value** column and **De-Activated** in the **New Value** column.  
  
6.  Click **Reverse Transaction**.  
  
7.  On the confirmation dialog box, click **OK**. A new transaction is added, showing **Active** in the **New Value** column.  
  
## Related content

- [Delete a Member or Collection (Master Data Services)](delete-a-member-or-collection-master-data-services.md)
- [Members (Master Data Services)](members-master-data-services.md)
- [Collections (Master Data Services)](collections-master-data-services.md)
