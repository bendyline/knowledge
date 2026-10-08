---
title: Delete a Derived Hierarchy
description: Delete a Derived Hierarchy (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "deleting derived hierarchies [Master Data Services]"
  - "derived hierarchies, deleting"
---
# Delete a Derived Hierarchy (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, delete a derived hierarchy when you are sure you no longer need it.  
  
> **Note:**  
>  Deleting a derived hierarchy has no effect on the attribute relationships that the hierarchy is based on.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To delete a derived hierarchy  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  From the menu bar, point to **Manage** and click **Derived Hierarchies**.  
  
3.  On the **Derived Hierarchy Maintenance** page, from the **Model** list, select a model.  
  
4.  Select the row for the derived hierarchy that you want to delete.  
  
5.  Click **Delete**.  
  
6.  In the confirmation dialog box, click **OK**.  
  
## Related content

- [Create a Derived Hierarchy (Master Data Services)](create-a-derived-hierarchy-master-data-services.md)
- [Derived Hierarchies (Master Data Services)](derived-hierarchies-master-data-services.md)
