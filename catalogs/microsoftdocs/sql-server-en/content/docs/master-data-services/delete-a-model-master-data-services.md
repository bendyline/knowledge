---
title: Delete a Model
description: Delete a Model (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "deleting models [Master Data Services]"
  - "models [Master Data Services], deleting models"
---
# Delete a Model (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Delete a model to remove the model and all of its data from  Master Data Services 
.  
  
> **Note:**  
>  When you complete this procedure, all objects and all data from all versions of the model will be permanently deleted.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To delete a model  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Model View** page, from the menu bar, point to **Manage** and click **Models**.  
  
3.  On the **Manage Models** page, from the grid, select the row for the model that you want to delete.  
  
4.  Click **Delete**.  
  
5.  In the confirmation dialog box, click **OK**.  
  
6.  In the additional confirmation dialog box, click **OK**.  
  
 The **Status** column in the grid shows the status of the operation on the model. When you click the **Save model** button, the Updating image is displayed, which indicates that the model is updating. If there are errors when creating or editing a model, the Error image is displayed. Otherwise, the status is OK and the OK image is displayed.  
  
## Related content

- [Models (Master Data Services)](models-master-data-services.md)
- [Create a Model (Master Data Services)](create-a-model-master-data-services.md)
