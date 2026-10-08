---
title: Edit Model
description: Edit Model (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "models [Master Data Services], changing name"
---
# Edit Model (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, you can change the name and description of a model and indicate how many days you want to retain transaction logs.  
  
 For more information, see [Transactions (Master Data Services)](transactions-master-data-services.md).  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To change a model  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Model View** page, from the menu bar, point to **Manage** and click **Models**.  
  
3.  On the **Manage Models** page, from the grid, select the row for the model with the name or description you want to change.  
  
4.  Click **Edit**.  
  
5.  In the **Name** box, type the updated name of the model.  
  
6.  In the **Description** field, type the updated description of the model.  
  
7.  In the **Log Retention Days** field, select one of the options for retaining log data. The default value is **System Setting**, which indicates that the value is inherited from system settings in the  Master Data Services Configuration Manager 
. For more information, see [System Settings (Master Data Services)](system-settings-master-data-services.md).  
  
     To override the system setting and not remove transaction log data, select **NO**. To retain only today's log data and truncate log data for all previous days, select **YES** and set the **Days** field to 0. To retain log data for a specified number of days, select **YES** and set the **Days** field to the number of days.  
  
8.  Click **Save model**.  
  
 The **Status** column in the grid shows the status of the operation on the model. When you click the **Save model** button, the Updating image is displayed, which indicates that the model is updating. If there are errors when creating or editing a model, the Error image is displayed. Otherwise, the status is OK and the OK image is displayed.  
  
## Related content

- [Create a Model (Master Data Services)](create-a-model-master-data-services.md)
- [Delete a Model (Master Data Services)](delete-a-model-master-data-services.md)
- [Models (Master Data Services)](models-master-data-services.md)
