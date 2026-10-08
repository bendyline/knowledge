---
title: Edit and Delete an Index
description: Edit and Delete an Index (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Edit and Delete an Index (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  You can edit and delete an index that you've created on attributes.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the System Administration functional area. For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md).  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
 **To edit an index**  
  
1.  In Master Data Manager, click **System Administration**.  
  
2.  On the **Manage Model** page, select a model from the grid, and then click **Entities**.  
  
3.  On the **Manage Entity** page, from the grid select the entity that contains the index you want to edit.  
  
4.  Click **Indexes**.  
  
5.  On the **Manage Index** page, select the index you want to edit and then click **Edit**.  
  
6.  In the **Name** box, type the updated name of the index.  
  
7.  Select or clear the **IsUnique** checkbox.  
  
8.  Edit the assigned attributes list by adding and removing attributes from the list.  
  
9. Click **Save**.  
  
 **To delete an index**  
  
1.  On the **Manage Model** page, select a model from the grid and then click **Entities**.  
  
2.  On the **Manage Entity** page, from the grid select the entity that contains the index you want to delete.  
  
3.  Click **Indexes**.  
  
4.  On the **Manage Index** page, select the index that you want to delete and then click **Delete**.  
  
5.  In the confirmation message boxes, click **OK**.  
  
## Related content

- [Create an Index (Master Data Services)](create-an-index-master-data-services.md)
- [Custom Index (Master Data Services)](custom-index-master-data-services.md)
